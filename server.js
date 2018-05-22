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
app.get('/api/v1/books', (request, response) => {
  console.log('In api v1 books');
  let SQL = `SELECT * FROM books`;
  client.query( SQL )
    .then(result => {
      console.log('Results from get all books', result.rows);
      response.send(result.rows)
      
    })
      

  });
app.get('*', (req,res) => res.status(403).send('This route does not exist.'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));