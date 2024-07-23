import React, { useEffect, useState } from 'react';
import api from '../axiosConfig';
import PostForm from '../components/PostForm';

const HomePage = () => {
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [error, setError] = useState(null); // Initialize error state

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
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="home-page">
      <h1>Home</h1>
      <PostForm isHomePage={true} />
      <div className="posts">
        {posts.map(post => (
          <div key={post._id} className="post">
            <p>{post.text}</p>
            {post.image && <img src={post.image} alt="Post" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;