// love command :3

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("love") //THIS NAME HAS TO BE THE SAME AS THE PARENT FILE NAME!!!
        .setDescription("Show me some affection here! :D"),
    async execute(interaction) {

        await interaction.reply({
            content: "Thankyou so Much **I love you too** ;'3",
            ephemeral: false //only visible to the user who executed the command if true
        });
        await interaction.followUp({ //follow up reply to the bot lol
            content: "Psst! Addris is a silly strawberry x3 (don't tell him i said that)",
            ephemeral: true //only visible to the user who executed the command if true
        });
    }
}