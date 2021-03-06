
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import { newToken } from "../utils/middlewares/verifyToken.js";
import { welcomeMailFirst } from "../utils/middlewares/welcomeMail.js";
import { recoveryPassword } from "../utils/middlewares/password_recovery.js";
const jwt = require("jsonwebtoken");

export async function signUp(req, res) {
  try {
    //register for the new users
    const { email, name, password } = req.body;
    //first verify if there is a user with that email
    const user0 = await User.findOne({ email: email });
    if (user0) {
      return res.status(404).json({
        message:
          "No puedes usar este correo porque ya está en uso, prueba con otro",
      });
    }
    //second step
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
    console.log("AQUI CREATED")
    await welcomeMailFirst(user);
    res
      .status(201)
      .cookie("SECURE_ACCESS", token, {
        httpOnly: true,
        path: "/",
        secure: true,
      })
      .json({ name, email });
  } catch (e) {
    console.log(e)
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
        .json({ message: "No ingresó email y/o contraseña" });
    }
    const user = await User.findOne({ email });
    //validated user
    if (!user) return res.status(400).json({ message: "El usuario no existe" });
    //validated with bcrypt
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res
        .status(401)
        .json({ message: "Usuario o contraseña incorrecta" });
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
      .json({ name: user.name, email: user.email }); // here also return the user body
  } catch (e) {
    res.status(404).json({ message: "User couldn't be login, NO AUTH" });
  }
}

export async function logout(req, res) {
  try {
    res
      .status(201)
      .clearCookie("SECURE_ACCESS")
      .json({ message: "User logout complete" });
  } catch (e) {
    res.status(404).json({ message: "User couldn't be logout" });
  }
}

//auth with google
export async function loginGoogle(req, res) {
  try {
    const { token } = req.body;
    const client = new OAuth2Client(process.env.GOOGLE_KEY_ID);
    //we don't store CLIENT_ID is the 3rd party application
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    //the json to ticket.getPayload is:

    /* iss: 'accounts.google.com',
      azp: '810139574456-5o6qassgd0ko3pn57lfrawfrwaffaf7m1.apps.googleusercontent.com',
      aud: '81139574456-5o6qafrawfatgryhryl43slsfp2ssf7m1.apps.googleusercontent.com',
      sub: '117319928916955291616',
      email: 'email_user',
      email_verified: true,
      at_hash: 'fYB4sBNfrQ7LVlgvB7wIzA',
      name: 'Complete name with last name',
      picture: 'URL_image_profile',
      given_name: 'Nombre',
      family_name: 'Apellidos separados',
      locale: 'es',
      iat: 1647232408,
      exp: 1647236008,
      jti: '78c55824479ef33c3545db436f4c3df98bae4fc2'
    } */
    const { email } = ticket.getPayload();
    //emails are unique for each user
    const user = await User.findOne({ email });
    //what if there's not user in the db
    if (!user) {
      return res.status(400).json({
        message: "El usuario no existe, por favor, regístrese en la aplicación",
      });
    }
    //create a token
    const tokenJWT = newToken(user);
    res
      .status(201)
      .cookie("SECURE_ACCESS", tokenJWT, {
        httpOnly: true,
        path: "/",
        secure: true,
      })
      .json({ name: user.name, email: user.email });
  } catch (e) {
    res.status(400).json({ message: "No se pudo iniciar sesión con google" });
  }
}
//register with google
export async function registerGoogle(req, res) {
  try {
    const { token } = req.body;
    const client = new OAuth2Client(process.env.GOOGLE_KEY_ID);
    //we don't store CLIENT_ID is the 3rd party application
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    //the json to ticket.getPayload is:

    /* iss: 'accounts.google.com',
      azp: '810139574456-5o6qassgd0ko3pn57lfrawfrwaffaf7m1.apps.googleusercontent.com',
      aud: '81139574456-5o6qafrawfatgryhryl43slsfp2ssf7m1.apps.googleusercontent.com',
      sub: '117319928916955291616',
      email: 'email_user',
      email_verified: true,
      at_hash: 'fYB4sBNfrQ7LVlgvB7wIzA',
      name: 'Complete name with last name',
      picture: 'URL_image_profile',
      given_name: 'Nombre',
      family_name: 'Apellidos separados',
      locale: 'es',
      iat: 1647232408,
      exp: 1647236008,
      jti: '78c55824479ef33c3545db436f4c3df98bae4fc2'
    } */
    const { email, given_name } = ticket.getPayload();
    //emails are unique for each user
    let user = await User.findOne({ email });
    //what if there's not user in the db
    if (user) {
      return res.status(400).json({
        message:
          "El usuario ya existe, inicie sesión con esa cuenta o elija otro email para crear una nueva cuenta",
      });
    }
    //create a token
    user = await User.create({ email, name: given_name });
    const tokenJWT = newToken(user);
    res
      .status(201)
      .cookie("SECURE_ACCESS", tokenJWT, {
        httpOnly: true,
        path: "/",
        secure: true,
      })
      .json({ name: user.name, email: user.email });
  } catch (e) {
    res.status(400).json({ message: "No se pudo crear el usuario con google" });
  }
}


export async function recoveryPasswordController(req,res) {
  try {
    const {email} = req.body
    const user = await User.findOne({email});

    if(!user) {
      throw new Error("User not found");
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "15m",
    });

    await recoveryPassword(email, token);

    res.status(201).json({ message: "Email sent" });
  } catch (err) {
    //console.log(err)
    res.status(400).json({ message: "Error sending recovery page" });
  }
}

export async function resetPassword(req, res) {
  try {
    const { passwordAgain, email } = req.body;
    const user = await User.findOne({ email });
    const encryptPassword = await bcrypt.hash(passwordAgain, 8);

    await User.findByIdAndUpdate(
      user._id,
      { password: encryptPassword },
      {
        new: true,
        userFindAndModify: false,
      }
    );
    res.status(200).json({ message: "task complete" });
  } catch (err) {
    //console.log(err)
    res.status(400).json({ message: "Password could not be update" });
  }
}
