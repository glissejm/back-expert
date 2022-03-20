import { User } from '../models/user.model';

export async function getUser(req, res) {
  try {
    const currentUser = await User.findById(req.params.user_id);
    res.status(201).json(currentUser);
    
  } catch (e) {
    res.status(404).json({ message: 'We cannot get this user, ERROR' });
  }
}

export async function getUserEmail(req, res) {
  const email = req.params.email;
  const userEmail = await User.findOne({ email: email });
  res.json(userEmail);
}

export async function updateUser(req, res) {
  try {
    const { name, email, password } = req.body;
    await User.findOneAndUpdate(
      { _id: req.params.user_id },
      {
        name: name,
        email: email,
        password: password,
      }
    );
    res.status(201).json({ message: 'User updated' });
  } catch (e) {
    res.status(404).json({ message: 'We cannot update this user, ERROR' });
  }
}

export async function deleteUser(req, res) {
  try {
    await User.findByIdAndDelete(req.params.user_id);
    res.status(201).json({ message: 'User Deleted' });
  } catch (e) {
    res.status(404).json({ message: 'We cannot delete this user, ERROR' });
  }
}
