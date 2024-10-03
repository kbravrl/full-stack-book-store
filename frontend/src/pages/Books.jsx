import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/books");
        setBooks(res.data);
      } catch (error) {
        console.error(error); 
      }
    };

    fetchAllBooks(); 
  }, []);

  const handleDelete = async (id) =>{
    try {
      await axios.delete("http://localhost:3000/books/"+id)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }

  }

  return (
    <>
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={`http://localhost:3000/uploads/${book.cover}`} alt={book.title} />}
            <p>{book.title}</p>
            <p>{book.desc}</p>
            <span>{book.price}$</span>
            <button className='delete' onClick={() => handleDelete(book.id)}>Delete</button>
          </div>
        ))}
      </div>
      <button className='btn-add'>
        <Link to="/add">Add New Book</Link>
      </button>
    </>
  );
}


export default Books;