import React, { useState, useContext } from 'react';
import api from '../axiosConfig';
import { AuthContext } from '../context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const PostForm = ({ isHomePage }) => {
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);

  const handleTextChange = (value) => {
    setText(value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('text', text);
    formData.append('image', image);
    formData.append('isHomePage', isHomePage);

    try {
      const response = await api.post('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setText('');
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post-form bg-white p-4 shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <ReactQuill value={text} onChange={handleTextChange} placeholder="What's on your mind?" />
        <input type="file" onChange={handleImageChange} className="mt-2" />
        <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg">Post</button>
      </form>
    </div>
  );
};

export default PostForm;