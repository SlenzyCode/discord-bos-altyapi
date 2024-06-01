const { ProEmbed } = require("speste-djs");

module.exports = {
    name: "ping",
    description: "Botun gecikme hızını saptar!",
    /**
     * 
     * @param {import("discord.js").ChatInputCommandInteraction} interaction 
     * @param {import("discord.js").Client} client
     */
    run: async (client, interaction) => {
        const embed = new ProEmbed()
            .setInteraction(interaction)
            .setDescription(`${client?.user?.username} botun WebSocket gecikme hızı **${client?.ws?.ping}**ms!`)
            .setStatus("success")

        interaction.reply({ embeds: [embed.getEmbed()] });
    }
};