import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config";

//not complete yet
export const newToken = (user) => {
  return jwt.sign({ id: user._id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp,
  });
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export async function signUp(req, res) {
  try {
    //register for the new users
    const { email, name, password } = req.body;
    const encryptPassword = await bcrypt.hash(password, 8);
    const user = await User.create({
      name,
      email,
      password: encryptPassword,
    });
    //token is generated
    const token = newToken(user);
    // response the token for the user, this is the payload in this case
    res.status(201).json({ token });
  } catch (e) {
    res.status(404).json({ message: "User couldn't be created" });
  }
}

export async function signIn(req, res) {
  try {
    // login for the users
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    //validated with bcrypt
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send({ message: "NOT AUTH" });
    }
    // response the token for the user
    const token = newToken(user);
    res.status(201).json({ token });
  } catch (e) {
    res.status(404).json({ message: "User couldn't be login, NO AUTH" });
  }
}
