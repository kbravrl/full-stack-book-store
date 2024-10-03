import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Add = () => {
  const [book, setBook] = useState({
    title:"",
    desc:"",
    price: null,
    cover: null
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    if (e.target.name === "cover") {
      setBook((prev) => ({ ...prev, [e.target.name]: e.target.files[0] }));
    } else {
      setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData(); // Create a FormData object

    formData.append("title", book.title);
    formData.append("desc", book.desc);
    formData.append("price", book.price);
    formData.append("cover", book.cover);

    try {
      await axios.post("http://localhost:3000/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data" // Set the correct header
        }
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  console.log(book)

  return (
    <div className='form'>
      <h1>Add New Book</h1>
      <input type="text" placeholder='title' onChange={handleChange} name='title'/>
      <input type="text" placeholder='desc' onChange={handleChange} name='desc'/>
      <input type="number" placeholder='price' onChange={handleChange} name='price'/>
      <input type="file" onChange={handleChange} name='cover' />
    <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add