import mongoose, { mongo } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseValidate from "mongoose-unique-validator";

const { Schema } = mongoose;
const blogSchema = new Schema(
  {
    BlogDescription: {
      type: String,
      minlength: 4,
      trim: true
    },
    BlogTitle: {
      type: String,
      minlength: 4,
      trim: true
    },
    datePosted: {
      type: String,
    //   default: new Date().toString()
      default: new Date().toLocaleDateString()
    },
    timePosted: {
      type: String,
      default: new Date().toLocaleTimeString()
    }
  },
  {
    timestamps: true
  }
);
blogSchema.virtual("comments", {
  ref: "comment",
  localField: "_id",
  foreignField: "commentsUnderBlogPost"
});

blogSchema.plugin(mongooseValidate);
blogSchema.plugin(mongoosePaginate);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
