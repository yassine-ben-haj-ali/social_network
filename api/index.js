const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require('path');
const AuthRoute = require("./Routes/AuthRoute");
const UserRoute = require("./Routes/UserRoute");
const PostRoute = require("./Routes/PostRoute");
const MessageRoute = require("./Routes/MessageRoute");
const ConversationRoute = require("./Routes/ConversationRoute");
const UploadRoute=require('./Routes/UploadRoute');
const cors=require('cors');


const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use("/images", express.static(path.join(__dirname, "public/images")));


app.use("/api/upload",UploadRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/user", UserRoute);
app.use("/api/post", PostRoute);
app.use("/api/messages", MessageRoute);
app.use("/api/conversation", ConversationRoute);

app.listen(8800, () => {
  console.log("backend running in port 8800");
});
