import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// import Comment from '../models/comment';
import User from "../models/users";
import Admin from "../models/admin";


dotenv.config();


const auth = {
  verifyUserToken: async (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      return res.status(403).json({ error: " Auth Headers Missing" });
    }
    const token = bearerHeader.split(" ")[1];
    try {
      const data = await jwt.verify(token, process.env.JWT_SECRET);

      const currentUser = await User.findOne({
        _id: data._id,
        "tokens.token": token
      });

      if (!currentUser) throw new Error();

      req.currentUser = currentUser;
      req.token = token;
      next();
    } catch (error) {
      res.status(403).send(error.name);
    }
  },
  verifyAdminToken: async (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (!bearerHeader) {
      return res.status(403).json({ error: " Auth Headers Missing" });
    }
    const token = bearerHeader.split(" ")[1];
    try {
      const data = await jwt.verify(token, process.env.JWT_SECRET);

      const currentUser = await Admin.findOne({
        _id: data._id,
        "tokens.token": token
      });

      if (!currentUser) throw new Error();

      req.currentUser = currentUser;
      req.token = token;
      next();
    } catch (error) {
      res.status(403).send(error.name);
    }
  }
};

export default auth;