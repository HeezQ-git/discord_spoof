import express from "express";
const app = express();
import mongoose from "mongoose";
import config from "./server/config/config.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import discordApi from "./server/backend/discord/discord.route.js";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cookieParser());
app.use(discordApi);

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server up and running on port ${process.env.PORT || 8080}`);
});

mongoose.connect(config.hostDB);

mongoose.connection.on("connected", () => {
    console.log("Connected with database");
});