import mongoose from "mongoose";

const discordSchema = new mongoose.Schema(
    {
        login: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        token: {
            type: String,
            required: true,
        },
    },
    { collection: "discord" }
);

const discord = mongoose.model("discord", discordSchema);

export default discord;
