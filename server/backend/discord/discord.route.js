import express from "express";
const router = express.Router();
import discordService from "./service/discord.js";

router.post("/api/connectToDiscord", discordService.connectToDiscord);
router.post("/api/getDatabase", discordService.getDatabase);

// module.exports = router;
export default router;
