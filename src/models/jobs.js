import mongoose, { mongo } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseValidate from "mongoose-unique-validator";

const { Schema } = mongoose;
const jobSchema = new Schema(
  {
    JobDescription: {
      type: String,
      minlength: 4,
      trim: true
    },
    JobTitle: {
      type: String,
      minlength: 4,
      trim: true
    },
    jobResponsibilities: {
      type: String,
      minlength: 4,
      trim: true
    },
    companyInformation: {
      type: String,
      minlength: 4,
      trim: true
    },
    JobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Remote"]
    },
    salary: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);

jobSchema.plugin(mongooseValidate);
jobSchema.plugin(mongoosePaginate);

const Job = mongoose.model("Job", jobSchema);

export default Job;
