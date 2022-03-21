import { User } from "../models/user.model";
import bcrypt from "bcrypt";

export async function getUser(req, res) {
  try {
    const currentUser = await User.findById(req.params.user_id);
    res.status(201).json(currentUser);
  } catch (e) {
    res.status(404).json({ message: "We cannot get this user, ERROR" });
  }
}

export async function getUserEmail(req, res) {
  try {
    const email = req.params.email;
    const userEmail = await User.findOne({ email: email });
    res.status(201).json(userEmail);
  } catch (e) {
    res.status(404).json({ message: "We cannot get this email, ERROR" });
  }
}

export async function updateUser(req, res) {
  try {
    const { name, email, password } = req.body;
    //first verify if there is a user with that email
    const user = await User.findOne({ email: email });
    if (user) {
      return res.status(404).json({
        message:
          "You cannot use this email beacause is already used, try another",
      });
    }
    //second, if pass the first test then encrypt the password
    const encryptPassword = await bcrypt.hash(password, 8);
    await User.findOneAndUpdate(
      { _id: req.params.user_id },
      {
        name: name,
        email: email,
        password: encryptPassword,
      }
    );
    res.status(201).json({ message: "User updated" });
  } catch (e) {
    res.status(404).json({ message: "We cannot update this user, ERROR" });
  }
}

export async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.user_id);
    res.status(201).json({ message: "User Deleted" });
  } catch (e) {
    res.status(404).json({ message: "We cannot delete this user, ERROR" });
  }
}
