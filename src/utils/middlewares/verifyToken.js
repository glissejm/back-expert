import jwt from "jsonwebtoken";
import { User } from "../../models/user.model";
import config from "../../config";

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

export async function authVerify(req, res, next) {
  try {
    //verify the token
    const token = req.cookies.SECURE_ACCESS;
    //const queries = req.query;
    if (!token) {
      return res.status(404).json({ message: "You have to send the token" });
    }
    //if token has expired then ?
    const payload = await verifyToken(token);
    //this function is not complete yet
    //we can use payload.id === _id for mongo
    // the body of payload is:
    //{ id: '6213dd7d59305e3f14a64b15', iat: 1645469053, exp: 1645469063 }
    //then we can do the things that we need to do
    //access to the database and other things
    if (payload) {
      req.body.id = payload.id;
      //req.query = queries;
      next();
    } else {
      return res.status(404).json({ message: "Your token is empty" });
    }
  } catch (e) {
    res.status(404).json({ message: "Your token is not verified" });
  }
}

export async function firstVerify(req, res) {
  try {
    const token = req.cookies.SECURE_ACCESS;
    if (!token) {
      return res.status(400).json({ message: "No token" });
    }
    const payload = await verifyToken(token);
    if (payload) {
      const user_id = payload.id;
      const user = await User.findOne({ _id: user_id });
      if (!user) {
        return res.status(400).json({ message: "No user" });
      }
      return res
        .status(200)
        .json({ message: "continue", name: user.name, email: user.email });
    } else {
      return res.status(400).json({ message: "No autenticado" });
    }
  } catch (e) {
    res.status(404).json({ message: "El token no está verificado" });
  }
}
