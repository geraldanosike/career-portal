import mongoose, { mongo } from "mongoose";
import mongoosePaginate from "mongoose-paginate";
import mongooseValidate from "mongoose-unique-validator";
import jwt from "jsonwebtoken";
import argon2 from "argon2";
import { isEmail } from "validator";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    fullname: {
      type: String,
      minlength: 4,
      trim: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: [isEmail, "Not a valid email adress"]
    },
    password: {
      type: String,
      minlength: 4,
      trim: true
    },
    tokens: [
      {
        token: {
          type: String,
          required: true
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

// USING ARGON HASHINH
userSchema.pre("save", async function save(next) {
  // hash password if new or modifed
  if (this.password && this.isModified("password")) {
    try {
      this.password = await argon2.hash(this.password);
    } catch (error) {
      return next(error);
    }
  }
  return next();
});

userSchema.statics.findByCredentials = async (email, password) => {
  // eslint-disable-next-line no-use-before-define
  const user = await User.findOne({ email });
  if (user) {
    const valiPassword = await argon2.verify(user.password, password);

    if (valiPassword) return user;
  }
  return null;
};

userSchema.methods.Token = async function() {
  const user = this;
  const payload = {
    _id: this.id,
    password: this.password,
    email: this.email
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRES_IN
  });
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.plugin(mongooseValidate);
userSchema.plugin(mongoosePaginate);

const User = mongoose.model("User", userSchema);

export default User;
