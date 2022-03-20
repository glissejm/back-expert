import express from 'express';
//import controllers
import {
  getUser,
  updateUser,
  deleteUser,
  getUserEmail,
} from '../controllers/user.controller';
import { authVerify } from '../utils/middlewares/verifyToken';
const router = express.Router();

//get questions default

router.route('/user/:user_id').get(getUser).put(updateUser).delete(deleteUser);

router.route('/email/:email').get(getUserEmail);
//routers protected
//model of routers protected
//router.route("/user").get(authVerify, protect);
export default router;
