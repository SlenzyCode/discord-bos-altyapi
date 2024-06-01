const { default: chalk } = require("chalk");
const { Client } = require("discord.js");
const fs = require("fs");
require("dotenv").config();

const client = new Client({
    intents: 3276543,
    partials: ["User", "GuildMember", "Message"]
});

global.client = client;
client.commands = (global.commands = []);

fs.readdirSync("./src/commands").forEach((categeory) => {
    fs.readdirSync(`./src/commands/${categeory}`).forEach(async (file) => {
        if (!file.endsWith(".js")) return;
        const command = require(`./commands/${categeory}/${file}`);
        client?.commands?.push({
            name: command?.name?.toLowerCase(),
            description: command?.description,
            options: command?.options || [],
            type: command?.type || 1,
            dm_permissions: command?.dm_permissions || false,
        });

        console.log(chalk?.red("[COMMANDS]"), chalk?.white(`${command?.name} adlı komut yüklendi!`))
    });
});

fs.readdirSync("./src/events").forEach((category) => {
    fs.readdirSync(`./src/events/${category}`).forEach(async (file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${category}/${file}`);
        const eventName = event?.name || file.split(".")[0];

        client?.on(eventName, (...args) => event.run(client, ...args));

        console.log(chalk.blue("[EVENTS]"), chalk.white(`${eventName} adlı event yüklendi!`));
    });
});

client.login(process?.env?.TOKEN);