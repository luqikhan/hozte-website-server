import mongoose from "mongoose";

const { Schema, model } = mongoose;

const BlogSchema = new Schema(
  {
    postImage: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },

    comments: [
      {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
        profession: {
          type: String,
          default: "",
        },
      },
    ],
  },
  { timestamps: true }
);

const Blog = model("blogs", BlogSchema);
export default Blog;
