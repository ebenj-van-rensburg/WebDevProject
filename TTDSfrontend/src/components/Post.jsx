import React, { useState, useContext } from 'react';
import api from '../axiosConfig';
import { AuthContext } from '../context/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Post = ({ post }) => {
  const { user } = useContext(AuthContext);
  const [likes, setLikes] = useState(post.likes.length);
  const [comments, setComments] = useState(post.comments);
  const [commentText, setCommentText] = useState('');

  const handleLike = async () => {
    try {
      await api.post(`/posts/${post._id}/like`);
      setLikes(likes + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUnlike = async () => {
    try {
      await api.post(`/posts/${post._id}/unlike`);
      setLikes(likes - 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentChange = (value) => {
    setCommentText(value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/posts/${post._id}/comment`, { text: commentText });
      setComments([...comments, response.data]);
      setCommentText('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="post bg-light-wood dark:bg-dark-wood p-4 shadow-md rounded-lg mb-4 text-dark-wood dark:text-light-wood">
      <p>{post.text}</p>
      {post.image && <img src={`/${post.image}`} alt="Post" className="mt-2 rounded" />}
      <div className="mt-2">
        <button onClick={handleLike} className="mr-2 bg-blue-600 text-white px-2 py-1 rounded">Like</button>
        <button onClick={handleUnlike} className="mr-2 bg-red-600 text-white px-2 py-1 rounded">Unlike</button>
        <span>{likes} Likes</span>
      </div>
      <div className="comments mt-4">
        {comments.map(comment => (
          <div key={comment._id} className="comment bg-gray-100 dark:bg-gray-700 p-2 rounded mb-2">
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={handleCommentSubmit} className="mt-4">
        <ReactQuill value={commentText} onChange={handleCommentChange} placeholder="Add a comment..." />
        <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg">Comment</button>
      </form>
    </div>
  );
};

export default Post;