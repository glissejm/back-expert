import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config";

export const newToken = (user) => {
  //used the id of the new user fot the protect routes
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
    //res.status(201).json({ token });
    res
      .status(201)
      .cookie("SECURE_ACCESS", token, {
        httpOnly: true,
        path: "/",
        secure: true,
      })
      .json({ message: "User was created successfully" });
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

    res
      .status(201)
      .cookie("SECURE_ACCESS", token, {
        httpOnly: true,
        path: "/",
        secure: true,
      })
      .json({ message: "User was login successfully" }); // here also return the user body
  } catch (e) {
    res.status(404).json({ message: "User couldn't be login, NO AUTH" });
  }
}

//function to protect route
export async function protect(req, res) {
  try {
    //verify the token
    const token = req.cookies.SECURE_ACCESS;
    if (!token) {
      res.status(404).json({ message: "You have to send the token" });
    }
    const payload = await verifyToken(token);
    //this function is not complete yet
    //we can use payload.id === _id for mongo
    // the body of payload is:
    //{ id: '6213dd7d59305e3f14a64b15', iat: 1645469053, exp: 1645469063 }
    //then we can do the things that we need to do
    //access to the database and other things

    /*
    //this code is for tests only
    //const user = await User.findOne({ _id: payload.id });
    //const { name, email } = user;
    //res.status(201).json({ email, name });
    */
    res.status(201).json({ message: "You can view this information" });
  } catch (e) {
    res.status(404).json({ message: "You cannot access to this route" });
  }
}
