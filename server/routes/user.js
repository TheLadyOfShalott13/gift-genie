import express from "express";
import { login, register } from "../controllers/user.js";

const router = express.Router();

//=========For routes accepting raw json================//
router.post("/register", register)
router.post("/login", login)

export default router;