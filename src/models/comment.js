import mongoose, { mongo } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseValidate from "mongoose-unique-validator";

const { Schema } = mongoose;
const commentSchema = new Schema(
  {
    comment: {
      type: String,
      minlength: 4,
      trim: true
    },
    // commentsUnderBlogPost: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true
    // },
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

commentSchema.plugin(mongooseValidate);
commentSchema.plugin(mongoosePaginate);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
