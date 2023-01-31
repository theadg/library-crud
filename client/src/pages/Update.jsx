import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState({
    title: '',
    description: '',
    price: null,
    cover: '',
  });

  useEffect(() => {
    const getCurrentBook = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/books/${id}`);
        setBook(res.data[0]);
      } catch (err) {
        throw new err();
      }
    };

    getCurrentBook();
  }, []);

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //   console.log(id);
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      console.log('ID HERE: ', id);
      await axios.put('http://localhost:8800/books/' + id, book);
      console.log('BOOK HERE: ', book);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  //   console.log(book);
  return (
    <div className="form">
      <h1>Update Book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
        value={book.title}
      />
      <input
        type="text"
        placeholder="desc"
        onChange={handleChange}
        name="description"
        value={book.description}
      />
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="price"
        value={book.price}
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
        value={book.cover}
      />

      <button onClick={handleClick}>Update</button>
    </div>
  );
};

export default Update;
