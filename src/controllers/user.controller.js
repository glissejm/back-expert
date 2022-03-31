import { User } from "../models/user.model";
import bcrypt from "bcrypt";

export async function getInfoUser(req, res) {
  try {
    const { id } = req.body;
    const currentUser = await User.findById({ _id: id });
    if (!currentUser) {
      return res.status(404).json({
        message: "El usuario no existe",
      });
    }
    if (currentUser.password !== "") {
      return res.status(201).json({ message: "noGoogle" });
    }
    res.status(201).json({ message: "Google" });
  } catch (e) {
    res.status(404).json({ message: "Ocurrió un error" });
  }
}

export async function updateUser(req, res) {
  try {
    const { id, name, email, password } = req.body;
    //id is the user with the previous data

    const currentUser = await User.findOne({ _id: id });
    //si cambio el email debemos veirifcar que ese email no pertenece a ningun usuario
    if (email !== currentUser.email) {
      //first verify if there is a user with that email
      const user = await User.findOne({ email });
      //out if there is a user with the new email
      if (user) {
        return res.status(404).json({
          message: "No puedes usar ese email porque ya está en uso",
        });
      }
    }
    //second, if pass the first test then encrypt the password
    const encryptPassword = await bcrypt.hash(password, 8);
    await User.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        email: email,
        password: encryptPassword,
      }
    );
    res.status(201).json({ name, email });
  } catch (e) {
    res.status(404).json({ message: "No se pudo actualizar el usuario!" });
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

export async function verifyPassword(req, res) {
  try {
    const { password, id } = req.body;
    const user = await User.findOne({ id });
    if (!user) {
      return res.status(400).json({
        message: "Hubo un problema con este usuario",
      });
    }
    //compare with bcrypt
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "La contraseña es incorrecta" });
    }
    res.status(201).json({ message: "Puede cambiar su contraseña" });
  } catch (e) {
    res
      .status(404)
      .json({ message: "La contraseña que ingresaste es incorrecta" });
  }
}
