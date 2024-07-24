import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import PostForm from '../components/PostForm';
import Post from '../components/Post';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        const data = response.data;
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          setError('Unexpected response format');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home-page p-6 ml-64">
      <h1 className="text-2xl font-bold mb-6">Home</h1>
      <PostForm isHomePage={true} />
      <div className="posts mt-6 space-y-4">
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;