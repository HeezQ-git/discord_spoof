import express from "express";
import * as path from 'path';
const app = express();
import mongoose from "mongoose";
import config from "./server/config/config.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import discordApi from "./server/backend/discord/discord.route.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'build')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
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
