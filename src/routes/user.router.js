import express from "express";

//import controllers
import {
  verifyPassword,
  getInfoUser,
  updateUser,
<<<<<<< HEAD
  upload,
  uploadImage
=======
  addQuestion,
>>>>>>> progress
} from "../controllers/user.controller";
import { authVerify } from "../utils/middlewares/verifyToken";
const router = express.Router();


router
  .route("/password")
  .post(authVerify, verifyPassword)
  .get(authVerify, getInfoUser)
  .put(authVerify, updateUser);

<<<<<<< HEAD

router.put('/imageUpload', uploadImage, upload);
//router.route("/imageUpload").post(changeImage,upload.single('profileImg'))
=======
router.route("/addquestion").post(authVerify, addQuestion);
>>>>>>> progress
//routers protected
//model of routers protected
//router.route("/user").get(authVerify, protect);
export default router;
