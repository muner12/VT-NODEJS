const User = require("../model/user");
const Chat = require("../model/chat");
const Message = require("../model/message");

//@description  create or fetch one-to-one chat

const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(400).json({
      MESSAGE: "USER ID IS REQUIRED",
      STATUS_CODE: 400,
      STATUS: "FAILED",
    });
  }

  try {
    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name email pic",
    });

    if (isChat.length > 0) {
      return res.status(200).json({ data: isChat[0] });
    } else {
      let chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user, userId],
      };
      const createdChat = await Chat.create(chatData);
      const fullChat = await Chat.findOne({
        _id: createdChat._id,
      }).populate("users", "-password");

      return res.status(200).json({ data: fullChat });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

  res.status(200).json({ data: "all chat data" });
};

//@description  get all the chat for one user

const fetchChats = async (req, res) => {
  try {
    Chat.find({
      users: { $elemMatch: { $ne: req.user } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        console.log(req.user);
        let data = await User.populate(result, {
          path: "latestMessage.sender",
          select: "name pic email",
        });

        res.status(200).json({ data });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createGroup = async (req, res, next) => {
  let name = req.body.name;

  if (!name || !req.body.users) {
    return res.status(400).json({
      MESSAGE: "NAME AND USERS ARE REQUIRED",
      STATUS_CODE: 400,
      STATUS: "FAILED",
    });
  }
  let users = JSON.parse(req.body.users);

  if (users.length < 1) {
    return res.status(400).json({
      MESSAGE: "More than 1 users are required to form a group",
      STATUS_CODE: 400,
      STATUS: "FAILED",
    });
  }
  users.push(req.user);

  try {
    const groupChat = await Chat.create({
      chatName: name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    let fullChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json({ data: fullChat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const renameGroup = async (req, res, next) => {
  const { chatId, chatName } = req.body;
  if (!chatId || !chatName) {
    return res.status(400).json({
      MESSAGE: "CHAT_ID AND NAME ARE REQUIRED",
      STATUS_CODE: 400,
      STATUS: "FAILED",
    });
  }

  try {
    let updateChat = await Chat.findByIdAndUpdate(
      chatId,
      {
        chatName: chatName,
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!updateChat) {
      return res.status(400).json({
        MESSAGE: "CHAT NOT FOUND",
        STATUS_CODE: 400,
        STATUS: "FAILED",
      });
    }

    return res.status(200).json({ data: updateChat });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromGroup = async (req, res, next) => {
  const { chatId, userId } = req.body;

  try {
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $pull: {
          users: userId,
        },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      return res.status(400).json({
        STATUS: "FAILED",
        MESSAGE: "USER NOT REMVED FROM GROUP",
      });
    }

    return res.status(200).json({
      STATUS: "SUCCESS",
      MESSAGE: "USER REMOVED FROM GROUP",

      DB_DATA: removed,
    });
  } catch (error) {
    return res.status(500).json({
      STATUS: "FAILED",
      MESSAGE: "SOMETHING WENT WRONG WHIEL REMOVING FROM GROUP",
      ERROR: error,
    });
  }
};

const addToGroup = async (req, res, next) => {
  const { chatId, userId } = req.body;

  if (!chatId || !userId) {
    return res.status(400).json({
      STATUS: "FAILED",
      MESSAGE: "ALL FEILEDS ARE REQUIRED",
    });
  }

  try {
    const added = await Chat.findOne({
      isGroupChat: true,
      users: userId,
    });
    if (added && added.users.includes(userId)) {
      return res.status(400).json({
        STATUS: "FAILED",
        MESSAGE: "USER ALREADY IN GROUP",
      });
    }
  } catch (error) {
    return res.status(500).json({
      STATUS: "FAILED",
      ERROR: "INTERNAL_SERVER_ERROR",
      ERROR_MESSAGE: error,
    });
  }

  try {
    const removed = await Chat.findByIdAndUpdate(
      chatId,
      {
        $push: {
          users: userId,
        },
      },
      {
        new: true,
      }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    if (!removed) {
      return res.status(400).json({
        STATUS: "FAILED",
        MESSAGE: "USER NOT ADD TO GROUP",
      });
    }

    return res.status(201).json({
      STATUS: "SUCCESS",
      DB_DATA: removed,
    });
  } catch (error) {
    return res.status(500).json({
      STATUS: "FAILED",
      MESSAGE: "SOMETHING WENT WRONG WHIEL REMOVING FROM GROUP",
      ERROR: error,
    });
  }
};

module.exports = {
  accessChat,
  fetchChats,
  createGroup,
  renameGroup,
  removeFromGroup,
  addToGroup,
};
