import { Router } from "express";
import { userAuth } from "../middlewares/auth-guard.js";
import uploader from "../middlewares/uploader.js";

import {
  createBlog,
  updateBlog,
  deleteBlog,
  fetchBlogById,
  fetchBlogs,
  commentOnBlog,
  recentBlogs,
} from "../apis/blog-apis.js";

const router = Router();

/**
 * @description To create a new post by the authenticated User
 * @api /posts/api/create-post
 * @access private
 * @type POST
 */
router.post("/create-post", uploader.single("postImage"), async (req, res) => {
  await createBlog(req, res);
});

/**
 * @description To update a post by the authenticated User
 * @api /posts/api/upadte-post
 * @access private
 * @type PUT
 */
router.put("/:id", uploader.single("image"), userAuth, async (req, res) => {
  await updateBlog(req, res);
});

/**
 * @description To post comment on blog
 * @api /posts/api/comment
 * @access private
 * @type PUT
 */
router.put("/comment/:id", async (req, res) => {
  await commentOnBlog(req, res);
});

/**
 * @description TO Delete Blog By Id
 * @api /post/api/:id
 * @access Public
 * @type GET
 */
router.delete("/:id", async (req, res) => {
  await deleteBlog(req, res);
});

/**
 * @description TO GET All blogs
 * @api /post/api
 * @access Private
 * @type GET
 */
router.get("/", async (req, res) => {
  await fetchBlogs(req, res);
});

/**
 * @description TO GET recent blogs
 * @api /post/api
 * @access Private
 * @type GET
 */
router.get("/recent", async (req, res) => {
  await recentBlogs(req, res);
});

/**
 * @description TO GET Blog By Id
 * @api /post/api/:id
 * @access Public
 * @type GET
 */
router.get("/:id", async (req, res) => {
  await fetchBlogById(req, res);
});

export default router;
