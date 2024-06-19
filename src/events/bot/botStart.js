const { default: chalk } = require("chalk");
const { ActivityType } = require("discord.js");
const { botStatus } = require("../../config/status.json");
const { Routes } = require("discord-api-types/v10");
const { REST } = require("@discordjs/rest");

module.exports = {
    name: "ready",
    /**
     * @param {import("discord.js").Client} client
     */
    run: async (client) => {
        
        const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
        
        try {
            await rest.put(Routes.applicationCommands(client.user.id), {
                body: client.commands,
            });
        } catch (e) {
            console.error(e);
        };
        
        console.log(chalk.green("[START]"), chalk.white(`${client?.user?.tag} isimli bot çalıştırıldı!`));

        setInterval(() => {
            const random = botStatus[Math.floor(Math.random() * botStatus.length)];

            client.user.setPresence({
                activities: [{ name: `${random}`, tpye: ActivityType.Listening }],
                status: "idle"
            });
        }, 10000);
    }
};
