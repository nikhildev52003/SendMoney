import { User, Account } from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
  signinBody,
  signupBody,
  updateBody,
  finduserBody,
} from "../zod/zod.js";

export const Signup = async (req, res) => {
  try {
    const { success } = signupBody.safeParse(req.body);

    if (!success) {
      return res.status(400).json({
        message: "Incorrect input / Password must be at least 6 characters",
      });
    }
    console.log(success);

    const userNameExist = await User.findOne({ username: req.body.username });
    if (userNameExist) {
      return res.status(422).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      password: hashedPassword,
    });
    const userId = user._id;

    await Account.create({
      userId,
      balance: Math.floor(Math.random() * (1000 - 100 + 1)) + 100,
    });

    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({ message: "User Created", token });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const Signin = async (req, res) => {
  try {
    const { success } = signinBody.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ error: "Incorrect input field" });
    }

    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error("Signin error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { success } = updateBody.safeParse(req.body);

    if (!success) {
      return res.status(400).json({ error: "Invalid input fields" });
    }

    const updated = await User.updateOne(
      { _id: req.userId },
      { $set: req.body }
    );

    if (updated.modifiedCount === 0) {
      return res
        .status(404)
        .json({ message: "No changes made or user not found" });
    }

    return res.status(200).json({ message: "Update successful" });
  } catch (error) {
    console.error("Update error:", error);
  }
};

export const Finduser = async (req, res) => {
  try {
    const parsed = finduserBody.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ success: false, error: "At least one field is required" });
    }

    const { firstname, lastname, username } = parsed.data;

    if (!firstname && !lastname && !username) {
      return res.status(400).json({
        success: false,
        error: "At least one search field is required",
      });
    }

    const query = [];
    if (firstname)
      query.push({ firstname: { $regex: firstname, $options: "i" } });
    if (lastname) query.push({ lastname: { $regex: lastname, $options: "i" } });
    if (username) query.push({ username: { $regex: username, $options: "i" } });

    const users = await User.find({ $or: query })
      .select("firstname lastname username")
      .limit(10);

    if (users.length === 0) {
      return res.status(404).json({ success: false, error: "No user found" });
    }

    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Find user error:", error);
    return res.status(500).json({ success: false, error: "Server error" });
  }
};
