'use strict'

const express = require('express');
const cors = require('cors');
const pg = require('pg');

const app = express();
const PORT = process.env.PORT;

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

app.use(cors());

app.get('/', (req, res) => res.send('Testing 1, 2, 3'));
app.get('/test', (req,res) => res.send('Hello, world!'));
app.get('/books', (request, response) => {
  let SQL = `SELECT * FROM books`;
  client.query( SQL )
    .then(result => response.send(result.rows))
  });
app.get('*', (req,res) => res.status(403).send('This route does not exist.'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));