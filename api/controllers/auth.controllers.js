import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "user created succesfully" });
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "user not found"));
    // comparing the password coming from the frontend (password) with the password in the database (validUser.password)
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "wrong credentials"));

    // here is how to add a token to the cookie of the browser
    //a token is a hashed value of unique things from the user it can be any of this three (email, id, ,username)
    // we use it for later verification of a user
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    // trying to remove the password and hashed password from being sent to the client side
    const { password: hashedPassword, ...rest } = validUser._doc;

    // for the expiring date of the logged in user
    //user will b logged out after one hour
    const expiryDate = new Date(Date.now() + 3600000);

    // passing the token into the browser cookies
    // passing this (validUser) inside the json because we want to sent it back to the client side
    // this [ age: 36000000 ] is there so that we can keep the user logged in for a longer time and not the one that when they leave d website now and they have to log in back
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

//this will out put undefined in the console with out us using [ app.use(express.json()) ]
// console.log(req.body);
