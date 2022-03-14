import express from "express";
import { idValidation } from "../middleware/id.valid";

import { register, login, getUsers, getUser, updateUser, deleteUser} from "../controllers/user.controllers";
import { auth, admin } from "../middleware/auth";

const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.get('/users',admin, getUsers);
router.get('/getuser/:id',idValidation, getUser);
router.patch('/updateuser/:id',idValidation, updateUser);
router.delete('/deleteuser/:id',idValidation, deleteUser);

export {router as default}