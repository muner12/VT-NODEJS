const Chat = require("../model/chat");
const Message = require("../model/message");
const User = require("../model/user");

const allMessage = async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.query.chatId })
      .populate("sender", "name email pic")
      .populate("chat");

    return res.status(200).json({
      STATUS: "SUCCESS",
      DB_DATA: messages,
    });
  } catch (error) {
    return res.status(500).json({
      STATUS: "FAILED",
      ERROR: "INTERNAL_SERVER_ERROR",
      ERROR_MESSAGE: error,
    });
  }
};

const sendedMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({
      STATUS: "FAILED",
      MESSAGE: "ALL FIELDS ARE REQUIRED",
    });
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    console.log("message cont");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    return res.json(message);
  } catch (error) {
    return res.status(500).json({
      STATUS: "FAILED",
      ERROR: "INTERNAL_SERVER_ERROR",
      ERROR_MESSAGE: error,
    });
  }
};

module.exports = { allMessage, sendedMessage };
