const express = require("express");
const { User } = require("../models/user.model");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const authRouter = express.Router();

// signup   
authRouter.post("/signup", async (req, res) => {
  try {
    // validate
    validateSignUpData(req);
    const { firstName, lastName, email, password } = req.body;
    console.log(req.body);
    //  Encrypt the Password
    const passwordHash = await bcrypt.hash(password, 10);

    //
    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    console.log("New user",user)

    await user.save();

    res.status(200).json("User added Successfully");
  } catch (error) {
    res.send("ERROR : " + error.message);
    console.log(error)
  }
});
// login
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)

  //  Find user to get hashed password

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    //  TODO:Validate EmailID

    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      //  Create JWT Token
      const token = await user.getJWT();
      //  Add the token and send the response back to the user
      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // set to true in production (HTTPS)
        sameSite: 'lax' // or 'none' if you're using cross-site cookies (and must use secure: true)
      });
      res.status(200).json({
        message:"Login Successfully",
        status:200,
        data:user
      });
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send("Error :" + error.message);
  }
});
//  logout
authRouter.post("/logout", async (req, res) => {

  //  TODO : 
  res.cookie("token", null),
    {
      expires: new Date(Date.now()),
    };

  res.send({message :"user Logout successfully"});
});
module.exports = authRouter;
