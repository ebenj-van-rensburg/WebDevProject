import User from '../models/User.js';

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updates = req.body;
    Object.assign(user, updates);

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const followUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const targetUser = await User.findById(req.params.id);

    if (!user || !targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.following.includes(targetUser._id)) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    user.following.push(targetUser._id);
    targetUser.followers.push(user._id);

    await user.save();
    await targetUser.save();

    res.json({ message: 'User followed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const targetUser = await User.findById(req.params.id);

    if (!user || !targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.following = user.following.filter(id => id.toString() !== targetUser._id.toString());
    targetUser.followers = targetUser.followers.filter(id => id.toString() !== user._id.toString());

    await user.save();
    await targetUser.save();

    res.json({ message: 'User unfollowed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const searchUsers = async (req, res) => {
  const query = req.query.q;
  console.log('Search query:', query);  // Log the search query
  try {
    const users = await User.find({ 
      username: { $regex: query, $options: 'i' } 
    }).select('username _id');
    console.log('Search results:', users);  // Log the search results
    res.status(200).json(users); // Always return an array
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ message: 'Server error', data: [] });
  }
};