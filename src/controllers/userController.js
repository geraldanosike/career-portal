import * as argon2 from "argon2";
import sgMail from "@sendgrid/mail";
import User from "../models/users";
import BaseRepository from "../repositories/baseRepository";
import dotenv from "dotenv";

dotenv.config();
class userController {
  /**
   * @description creates a new User
   * @param  {object} req
   * @param {object} res
   * @returns {object} a newly created User
   * @memberof userController
   */

  static async createUser(req, res) {
    try {
      const { email, password, fullname } = req.body;

      const options = {
        email,
        password,
        fullname
      };
      const findEmail = await User.findOne({ email });

      if (findEmail) return res.status(400).send("User already exists");

      const createUser = await User.create(options);
      const token = await createUser.Token();

      sgMail.setApiKey(process.env.SENDGRID_API_KEY);
      const msg = {
        to: req.body.email,
        from: "vgg-careers@venturegardengroup.com",
        subject: `Welcome ${req.body.fullname}`,
        text: "Enjoy our platform",
        html: `Welcome ${req.body.fullname}, we are glad to have you on our platform. Login , browse and apply for your dream job`
      };
      await sgMail.send(msg);
      return res.status(201).send({
        email: createUser.email,
        fullname: createUser.fullname,
        tokens: createUser.tokens
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Login a new User
   * @param  {object} req
   * @param {object} res
   * @returns {object} Logged in user
   * @memberof userController
   */

  static async loginUser(req, res) {
    try {
      const { email, password } = req.body;

      const loginUsers = await User.findByCredentials(email, password);
      const token = await loginUsers.Token();
      if (!loginUsers) {
        return res.status(404).send({ error: "invalid password or email" });
      }
      if (loginUsers) {
        return res
          .status(200)
          .send({ message: "Logged in successfully", token });
      }
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Get all User
   * @param  {object} req
   * @param {object} res
   * @returns {object}All user
   * @memberof userController
   */

  static async getAllUser(req, res) {
    try {
      // set pagination parameters
      const { limit = 10, page = 1 } = req.query;
      const options = { limit: Number(limit), page };
      const user = await User.find({});

      if (!user) return res.status(500).send("No user in the database");

      const allUsers = await BaseRepository.findAll(User, {}, options);
      return res.status(200).send(allUsers);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Delete User
   * @param  {object} req
   * @param {object} res
   * @returns {object}Delete user
   * @memberof userController
   */

  static async deleteUser(req, res) {
    try {
      const { userId } = req.params;

      const user = await User.findByIdAndDelete({ _id: userId });

      if (!user) return res.status(500).send("User does not exist");

      if (user) return res.status(500).send("User deleted");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Gets the current user
   * @param  {object} req
   * @param {object} res
   * @returns {object} areturns the current user
   * @memberof userController
   */

  static async current(req, res) {
    try {
      const { currentUser } = req;
      res.send(currentUser);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description change user password
   * @param  {object} req
   * @param {object} res
   * @returns {object} a user's password
   * @memberof userController
   */

  static async changeUserPassword(req, res) {
    try {
      const { userId } = req.params;
      const { password } = req.body;

      const hashpassword = await argon2.hash(password);

      const updatePassword = await User.findByIdAndUpdate(
        { _id: userId },
        {
          $set: {
            password: hashpassword
          }
        },
        {
          new: true
        }
      );
      if (!updatePassword) {
        return res.status(400).json({ error: "User does not exist" });
      }
      return res
        .status(201)
        .json({
          message: "Password updated successfully",
          email: updatePassword.email,
          fullname: updatePassword.fullname,
          tokens: updatePassword.tokens
        });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Logout user from all devices
   * @param  {object} req
   * @param {object} res
   * @returns {object} logout the  user
   * @memberof AdminController
   */

  static async LogoutUser(req, res) {
    try {
      req.currentUser.tokens = [];

      await req.currentUser.save();
      res.send("Logged out from all devices");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export default userController;
