import axios from "axios";

const discordService = {
    connectToDiscord: (data) => {
        return axios.post("/api/connectToDiscord", data);
    },
    getDatabase: () => {
        return axios.post("/api/getDatabase");
    },
};

export { discordService };
