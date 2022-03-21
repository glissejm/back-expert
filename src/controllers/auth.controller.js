import { User } from '../models/user.model';
import bcrypt from 'bcrypt';
import { newToken } from '../utils/middlewares/verifyToken';
import { sendMail } from '../utils/middlewares/mailer';

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
    await sendMail(user);
    res
      .status(201)
      .cookie('SECURE_ACCESS', token, {
        httpOnly: true,
        path: '/',
        secure: true,
      })
      .json({ name, email });
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
        .send({ message: 'Email and password are required' });
    }
    const user = await User.findOne({ email });
    //validated user
    if (!user)
      return res.status(400).send({ message: 'User does not register' });
    //validated with bcrypt
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).send({ message: 'NOT AUTH' });
    }
    // response the token for the user
    const token = newToken(user);

    res
      .status(201)
      .cookie('SECURE_ACCESS', token, {
        httpOnly: true,
        path: '/',
        secure: true,
      })
      .json({ name: user.name, email: user.email }); // here also return the user body
  } catch (e) {
    res.status(404).json({ message: "User couldn't be login, NO AUTH" });
  }
}
/* //function to protect route, example
export async function protect(req, res) {
  try {
    const _id = req.id;

    //this code is for tests only
    const user = await User.findOne({ _id: _id });
    const { name, email } = user;
    res.status(201).json({ email, name });

    //res.status(201).json({ message: "You can view this information" });
  } catch (e) {
    res.status(404).json({ message: "You cannot access to this route" });
  }
} */
