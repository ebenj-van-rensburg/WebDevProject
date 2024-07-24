import Post from '../models/Post.js';
import User from '../models/User.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

export const uploadImage = upload.single('image');

// Create new post
export const createPost = async (req, res) => {
  try {
    const { text, isHomePage } = req.body;
    const image = req.file ? req.file.path : null;

    const post = new Post({
      user: req.user.id,
      text,
      image,
      isHomePage,
    });

    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isHomePage: true }).populate('user', 'username profilePicture');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user-specific posts
export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId, isHomePage: false }).populate('user', 'username profilePicture');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Like a post
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!post || !user) {
      return res.status(404).json({ message: 'Post or user not found' });
    }

    if (post.likes.includes(user._id)) {
      return res.status(400).json({ message: 'You have already liked this post' });
    }

    post.likes.push(user._id);
    await post.save();

    res.json({ message: 'Post liked' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Unlike a post
export const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!post || !user) {
      return res.status(404).json({ message: 'Post or user not found' });
    }

    post.likes = post.likes.filter(id => id.toString() !== user._id.toString());
    await post.save();

    res.json({ message: 'Post unliked' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Comment on a post
export const commentOnPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!post || !user) {
      return res.status(404).json({ message: 'Post or user not found' });
    }

    const comment = {
      user: req.user.id,
      text: req.body.text,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    res.json({ message: 'Comment added' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get comments for a post
export const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('comments.user', 'username profilePicture');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.json(post.comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};