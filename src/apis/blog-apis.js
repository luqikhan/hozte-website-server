import { Blog } from "../models/index.js";
import SlugGenerator from "../functions/slug-generator.js";

// CREATE
export const createBlog = async (req, res) => {
  try {
    // Create a new Post
    let { body, file } = req;

    let filename = file.path;

    let post = new Blog({
      ...body,
      postImage: filename,
      slug: SlugGenerator(body.title),
    });
    await post.save();
    return res.status(201).json({
      post,
      success: true,
      message: "Your post is published.",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Unable to create the post.",
    });
  }
};

// Update
export const updateBlog = async (req, res) => {
  try {
    let { id } = req.params;
    let { user, body, file } = req;
    let filename = DOMAIN + "uploads/" + file.filename;
    // Chcek if the post with the id is in the database or not?
    let post = await Blog.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }
    if (post.author.toString() !== user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: "Post doesn't belong to you.",
      });
    }
    post = await Blog.findOneAndUpdate(
      { _id: id },
      {
        ...body,
        postImage: filename,
        slug: SlugGenerator(body.title),
      },
      { new: true }
    );
    return res.status(200).json({
      post,
      success: true,
      message: "Post updated successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Unable to update the post.",
    });
  }
};

// GET All
export const fetchBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({}).lean().exec();

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};

// GET All
export const recentBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(4)
      .lean()
      .exec();

    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};

// GET By Id
export const fetchBlogById = async (req, res) => {
  try {
    let { id } = req.params;
    const blog = await Blog.findById(id).lean().exec();

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};

// Delete
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete({
      _id: req.params.id,
    });
    return res.status(200).json({
      success: true,
      message: "Post deleted successfully!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "An error occurred.",
    });
  }
};

// Comment
export const commentOnBlog = async (req, res) => {
  try {
    let { name, email, profession, content } = req.body;
    let { id } = req.params;
    const comment = { name, profession, email, content };
    // Chcek if the post with the id is in the database or not?
    let post = await Blog.findById(id);
    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    console.log("comment ", comment);

    post = await Blog.findOneAndUpdate(
      { _id: id },
      {
        $push: { comments: comment },
      },
      { new: true }
    );
    return res.status(200).json({
      post,
      success: true,
      message: "Comment posted successfully.",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Unable to commment on the post.",
    });
  }
};
