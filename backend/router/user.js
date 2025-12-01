import express from "express";
import { Signin, Signup, Finduser, UpdateUser } from "../controller/user.js";
import { authMiddleware } from "../middlewere/middleware.js";

export const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", Signin);
router.put("/update", authMiddleware, UpdateUser);
router.get("/find", Finduser);
