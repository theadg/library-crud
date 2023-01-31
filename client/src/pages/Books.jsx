import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get('http://localhost:8800/books');
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload();
    } catch (err) {
      throw new err();
    }
  };

  return (
    <div className="App">
      <div className="title">Books</div>
      <div className="books">
        {books.map((book) => (
          <div className="book">
            {book.cover && <img src={book.cover} alt="Book Picture" />}
            <h2>{book.title}</h2>
            <p>{book.description}</p>
            <p>{book.price}</p>
            <button className="delete" onClick={() => handleDelete(book.id)}>
              Delete
            </button>
            <button className="update">
              {' '}
              <Link to={`update/${book.id}`}>Update</Link>{' '}
            </button>
          </div>
        ))}
      </div>
      <button>
        <Link to={'/add'}>Add new Book</Link>
      </button>
    </div>
  );
};

export default Books;
