import express from "express";
import { auth , admin} from "../middleware/auth";
import { messageIdValidation, validmessage } from "../middleware/validations/messages.validation";
import {send, getmessages, deletemessage} from "../controllers/messages.controller"

const messagesRoute = express.Router()

messagesRoute.post('/send',auth,validmessage, send);
messagesRoute.get('/getmessages',admin, getmessages);
messagesRoute.delete('/deletemessage/:id',messageIdValidation, admin, deletemessage)

export {messagesRoute as default}