// Импорт необходимых модулей и библиотек
const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const ExcelJS = require('exceljs');
const { Document, Packer, Paragraph, TextRun } = require('docx');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Инициализация приложения Express
const app = express();
const port = 5000;

// Подключение к базе данных PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'CoworkingDB',
    password: '249472',
    port: 5432,
});

// Проверка соединения с базой данных при запуске сервера
pool.connect((err, client, release) => {
    if (err) {
        console.error('Database connection error:', err.stack);
    } else {
        console.log('Successfully connected to the database');
        release();
    }
});

app.use(cors());
app.use(bodyParser.json());

app.post('/api/procedure', async (req, res) => {
    const { procedure, params } = req.body;

    if (!procedure) {
        return res.status(400).send('Procedure name is required.');
    }

    try {
        const client = await pool.connect();
        let query = `SELECT * FROM ${procedure}(`;
        let values = [];
        let placeholders = [];

        if (params) {
            Object.keys(params).forEach((param, index) => {
                placeholders.push(`$${index + 1}`);
                values.push(params[param]);
            });
            query += placeholders.join(', ');
        }

        query += ')';

        console.log(`Executing query: ${query} with values: ${values}`);

        const result = await client.query(query, values);
        client.release();

        res.json(result.rows);
    } catch (err) {
        console.error('Database error:', err);
        res.status(500).send('Internal Server Error');
    }
});


// Маршрут для обновления информации о мероприятии
app.put('/api/events/:eventId', (req, res) => {
    const eventId = req.params.eventId;
    const eventData = req.body;

    // Обновление информации о мероприятии в базе данных
    db.updateEvent(eventId, eventData)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

// Маршрут для добавления нового мероприятия
app.post('/api/events', (req, res) => {
    const eventData = req.body;

    // Добавление нового мероприятия в базу данных
    db.createEvent(eventData)
        .then(() => {
            res.sendStatus(201);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

// Поиск доступных слотов времени
app.get('/api/availableSlots', async (req, res) => {
    const { roomType, date } = req.query;
    
    try {
      const hallResult = await pool.query('SELECT HallID FROM Hall WHERE Name = $1', [roomType]);
      if (hallResult.rows.length === 0) {
        return res.status(404).json({ error: 'Hall not found' });
      }
  
      const hallId = hallResult.rows[0].hallid;
  
      const query = `
        WITH HallPlaces AS (
          SELECT PlaceID
          FROM Place
          WHERE HallID = $1
        ),
        OccupiedSlots AS (
          SELECT ts.SlotID
          FROM Booking b
          JOIN BookingTimeSlot bts ON b.BookingID = bts.BookingID
          JOIN TimeSlot ts ON bts.SlotID = ts.SlotID
          WHERE b.BookingDate = $2
            AND b.PlaceID IN (SELECT PlaceID FROM HallPlaces)
        )
        SELECT SlotID, StartTime, EndTime
        FROM TimeSlot
        WHERE SlotID NOT IN (SELECT SlotID FROM OccupiedSlots);
      `;
      
      const result = await pool.query(query, [hallId, date]);
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching available slots:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});