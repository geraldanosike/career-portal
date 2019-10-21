import sgMail from "@sendgrid/mail";
import Admin from "../models/admin";
import BaseRepository from "../repositories/baseRepository";
import dotenv from "dotenv";

dotenv.config();
class adminController {
  /**
   * @description creates A new Admin
   * @param  {object} req
   * @param {object} res
   * @returns {object} a newly created Admin
   * @memberof adminController
   */

  static async createAdmin(req, res) {
    try {
      const { email, password, fullname } = req.body;

      const options = {
        email,
        password,
        fullname
      };
      const findEmail = await Admin.findOne({ email });

      if (findEmail) return res.status(400).send("Admin already exists");

      const createAdmin = await Admin.create(options);
      const token = await createAdmin.Token();

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
          to: req.body.email,
          from: "vgg-careers@venturegardengroup.com",
          subject: `Welcome Admin`,
          text: "Enjoy our platform",
          html: `Welcome ${req.body.fullname}, You now have administrative privilege. Good Luck`
        };
        await sgMail.send(msg);
      return res.status(201).send({email: createAdmin.email, fullname: createAdmin.fullname, tokens: createAdmin.tokens});
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

  /**
   * @description Login a new Admin
   * @param  {object} req
   * @param {object} res
   * @returns {object} Logged in Admin
   * @memberof adminController
   */

  static async loginAdmin(req, res) {
    try {
      const { email, password } = req.body;

      const loginAdmins = await Admin.findByCredentials(email, password);
      const token = await loginAdmins.Token();
      if (!loginAdmins) {
        return res.status(404).send({ error: "invalid password or email" });
      }
      if (loginAdmins) {
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

  static async getAllAdmin(req, res) {
    try {
      // set pagination parameters
      const { limit = 10, page = 1 } = req.query;
      const options = { limit: Number(limit), page };
      const user = await Admin.find({});

      if (!user) return res.status(500).send("No user in the database");

      const allUsers = await BaseRepository.findAll(Admin, {}, options);
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

  static async deleteAdmin(req, res) {
    try {
      const { userId } = req.params;

      const user = await Admin.findByIdAndDelete({ _id: userId });

      if (!user) return res.status(500).send("Admin does not exist");

      if (user) return res.status(500).send("Admin deleted");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
  /**
   * @description Gets the current Admin
   * @param  {object} req
   * @param {object} res
   * @returns {object} areturns the current Admin
   * @memberof adminController
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
   * @description Logout Admin from all devices
   * @param  {object} req
   * @param {object} res
   * @returns {object} logout the  Admin
   * @memberof AdminController
   */

  static async LogoutAdmin(req, res) {
    try {
      req.currentUser.tokens = [];

      await req.currentUser.save();
      res.send("Logged out from all devices");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}

export default adminController;
