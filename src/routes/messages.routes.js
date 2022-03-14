import express from "express";
import { auth , admin} from "../middleware/auth";
import {send, getmessages, deletemessage} from "../controllers/messages.controller"
import { idValidation } from "../middleware/id.valid";

const messagesRoute = express.Router()

messagesRoute.post('/send',auth, send);
messagesRoute.get('/getmessages',admin, getmessages);
messagesRoute.delete('/deletemessage/:id',idValidation, admin, deletemessage)

export {messagesRoute as default}