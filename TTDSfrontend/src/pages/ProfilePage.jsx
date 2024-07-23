import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../axiosConfig';
import PostForm from '../components/PostForm';

const ProfilePage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null); // Initialize user as null
  const [posts, setPosts] = useState([]); // Initialize posts as an empty array
  const [loading, setLoading] = useState(true); // Initialize loading state
  const [error, setError] = useState(null); // Initialize error state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await api.get(`/users/${id}`);
        setUser(userResponse.data);

        const postsResponse = await api.get(`/posts/${id}`);
        setPosts(postsResponse.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Set loading to false after fetch completes
      }
    };

    fetchUserData();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-page">
      <h1>{user.username}</h1>
      <p>{user.bio}</p>
      <PostForm isHomePage={false} />
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

export default ProfilePage;