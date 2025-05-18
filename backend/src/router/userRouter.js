const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const { ConnectionRequest } = require("../models/connectionRequest.modal");
const {
  sanitizeFilter,
  ConnectionStates,
  isObjectIdOrHexString,
} = require("mongoose");
const { User } = require("../models/user.model");
const userRouter = express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

userRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.json({
        message: "User data fetched successfully",
        status: 200,
        data: user,
      });
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

userRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const isEditAllowed = validateEditProfileData(req);

    if (!isEditAllowed) {
      throw new Error("Invalid edit request");
    }

    const loggedInUser = req.user;
    const allowedEditFields = [
      "firstName",
      "userName",
      "lastName",
      "phoneNumber",
      "countryCode",
      "gender",
      "about",
      "skills",
      "email",
    ];

    // Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    const updatedFields = Object.fromEntries(
      Object.entries(req.body).filter(([key]) =>
        allowedEditFields.includes(key)
      )
    );

    // await loggedInUser.save();

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        $set: updatedFields,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
      status: 200,
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

userRouter.get("/profile/connections/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequest = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId");
    res.json({
      message: "Connection request data fetched successfully",
      data: connectionRequest,
    });
  } catch (error) {
    res.status(400).send("Error " + error);
  }
});

userRouter.get("/profile/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    //   get the mutual connection  the people that I have send connection request
    const connectionRequest = await ConnectionRequest.find({
      $or: [
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (loggedInUser._id.toString() === row.fromUserId._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });
    res.json({
      message: "Data fetched successfully",
      data: data,
    });
  } catch (error) {
    res.status(400).send({ message: err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = userRouter;
