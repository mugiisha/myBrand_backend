import express from "express";

import { register, login, getUsers, getUser, updateUser, deleteUser} from "../controllers/user.controllers";
import { auth, admin } from "../middleware/auth";
import { createUserValid, logUserValid, userIdValidation } from "../middleware/validations/users.validation";

const router = express.Router();


router.post('/register',createUserValid, register);
router.post('/login',logUserValid, login);
router.get('/users', getUsers);
router.get('/getuser/:id',userIdValidation, getUser);
router.patch('/updateuser/:id',userIdValidation, updateUser);
router.delete('/deleteuser/:id',userIdValidation,admin, deleteUser);

export {router as default}