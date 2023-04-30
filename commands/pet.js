//pet command

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pet") //THIS NAME HAS TO BE THE SAME AS THE PARENT FILE NAME!!!
        .setDescription("Pet me UwU"),
    async execute(interaction) {

        interaction.reply({
            content: "Thankyou For petting me! *Nuzzles :3*",
            ephemeral: false //only visible to the user who executed the command if true
        });
    }
}