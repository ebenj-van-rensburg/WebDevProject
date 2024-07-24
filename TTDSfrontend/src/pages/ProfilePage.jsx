import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import api from '../axiosConfig';
import PostForm from '../components/PostForm';
import Post from '../components/Post';
import { AuthContext } from '../context/AuthContext';

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = id || user?.id;
        const userResponse = await api.get(`/users/${userId}`);
        setProfile(userResponse.data);

        const postsResponse = await api.get(`/posts/${userId}`);
        setPosts(postsResponse.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [id, user]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-page p-6 ml-64">
      <h1 className="text-2xl font-bold mb-4">{profile.username}</h1>
      <p className="mb-6">{profile.bio}</p>
      <PostForm isHomePage={false} />
      <div className="posts mt-6 space-y-4">
        {posts.map(post => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;