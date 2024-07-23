import Post from '../models/Post.js';
import User from '../models/User.js';

export const createPost = async (req, res) => {
  try {
    const { text, image, isHomePage } = req.body;

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

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username profilePicture');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.userId }).populate('user', 'username profilePicture');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

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