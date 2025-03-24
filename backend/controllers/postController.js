import asyncHandler from "express-async-handler";
import Post from "../models/Post.js";

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const {
    description,
    cost,
    pickupLocation,
    itemLocation,
    phoneNumber,
    urgency,
    expiryTime,
    category,
  } = req.body;

  console.log(req.body);
  
  // Create a new post using the authenticated user's id
  const post = await Post.create({
    description,
    cost,
    pickupLocation,
    itemLocation,
    phoneNumber,
    urgency,
    expiryTime,
    category,
    userId: req.user._id,
  });

  res.status(201).json(post);
});

// @desc    Get posts for the authenticated user
// @route   GET /api/posts
// @access  Private
export const getPosts = asyncHandler(async (req, res) => {
  // Retrieve posts that belong to the user (or you can modify this to fetch all posts)
  console.log(req.user._id);
  const posts = await Post.find();
  res.status(200).json(posts);
});

// @desc    Get a post by ID
// @route   GET /api/posts/:id
// @access  Private
export const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res) => {
  const {
    description,
    cost,
    pickupLocation,
    itemLocation,
    phoneNumber,
    urgency,
    expiryTime,
    category,
  } = req.body;
  const post = await Post.findById(req.params.id);

  if (post) {
    post.description = description || post.description;
    post.cost = cost || post.cost;
    post.pickupLocation = pickupLocation || post.pickupLocation;
    post.itemLocation = itemLocation || post.itemLocation;
    post.phoneNumber = phoneNumber || post.phoneNumber;
    post.urgency = urgency || post.urgency;
    post.expiryTime = expiryTime || post.expiryTime;
    post.category = category || post.category;

    const updatedPost = await post.save();
    res.status(200).json(updatedPost);
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.remove();
    res.status(200).json({ message: "Post removed" });
  } else {
    res.status(404);
    throw new Error("Post not found");
  }
});
