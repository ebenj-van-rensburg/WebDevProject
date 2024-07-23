import React, { useState } from 'react';
import api from '../axiosConfig';

const PostForm = ({ isHomePage }) => {
  const [postContent, setPostContent] = useState({ text: '', image: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostContent({ ...postContent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = '/posts';
    try {
      const response = await api.post(url, { ...postContent, isHomePage });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post-form">
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          placeholder="What's on your mind?"
          value={postContent.text}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={postContent.image}
          onChange={handleInputChange}
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostForm;