import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

// ALLOWS us to send json files using client
app.use(express.json());

// allow cors
app.use(cors());

// endpoint, callback
app.get('/', (req, res) => {
  res.json('hello this is the backend');
});

// endpoint, callback
app.get('/books', (req, res) => {
  const query = 'SELECT * FROM books';
  db.query(query, (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

// SENDING USING BACKEND
// app.post('/books', (req, res) => {
//   const query = 'INSERT INTO BOOKS(`title`, `description`, `cover`) VALUES (?)';
//   const values = [
//     'title from backend',
//     'desc from backend',
//     'cover from backend',
//   ];

//   db.query(query, [values], (err, data) => {
//     if (err) return res.json(err);

//     return res.json('Book has been created successfully');
//   });
// });

// SENDING USING CLIENT
app.post('/books', (req, res) => {
  const query =
    'INSERT INTO BOOKS(`title`, `description`,`price`, `cover`) VALUES (?)';
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(query, [values], (err, data) => {
    if (err) return res.json(err);

    return res.json('Book has been created successfully');
  });
});

// deleting book
app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const query = 'DELETE FROM books WHERE id =?';
  db.query(query, [bookId], (err, data) => {
    if (err) return res.json(err);

    return res.json('Book has been deleted successfully');
  });
});

// loading data
app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const query = 'SELECT * FROM books WHERE id = ?';

  db.query(query, [bookId], (err, data) => {
    if (err) return res.json(err);

    console.log(bookId);
    return res.json(data);
  });
});

// updating data
app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const query =
    'UPDATE books SET `title` = ?, `description` = ? , `cover` =  ?, `price` = ? WHERE id = ?';

  const values = [
    req.body.title,
    req.body.description,
    req.body.cover,
    req.body.price,
  ];

  db.query(query, [...values, bookId], (err, data) => {
    if (err) return res.json(err);

    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log('andrew the backend developer here');
});
