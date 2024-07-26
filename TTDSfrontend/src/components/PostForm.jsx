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
    if (image) {
      formData.append('image', image);
    }
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
    <div className="post-form bg-white dark:bg-gray-800 p-4 shadow-md rounded-lg">
      <form onSubmit={handleSubmit}>
        <label htmlFor="text" className="block text-gray-700 dark:text-gray-300 mb-2">Text</label>
        <ReactQuill value={text} onChange={handleTextChange} placeholder="What's on your mind?" className="mb-4" />
        <label htmlFor="image" className="block text-gray-700 dark:text-gray-300 mb-2">Image</label>
        <input type="file" onChange={handleImageChange} className="mb-4 p-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Post</button>
      </form>
    </div>
  );
};

export default PostForm;