const { default: chalk } = require("chalk");

module.exports = {
    name: "ready",
    /**
     * @param {import("discord.js").Client} client
     */
    run: async (client) => {
        console.log(chalk.green("[START]"), chalk.white(`${client?.user?.tag} isimli bot çalıştırıldı!`));
    }
};