// Help/Info command

const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const EmbedToSend = new MessageEmbed()
     .setTitle("Hi! Im Marmalade! :3")
     .setDescription("I'm Marmalade! A bot created by Feliciana (Addris helped alot too :3) I Track the amount of messages you send and the amount of hours you are active on this server Please Don't Feel Alarmed! I don't cause any harm. I Hope to be useful to the server! and give Moderators useful insights on the server. I use slash commands! press '/' to see my commands :3, And i would appreciate it if you gave me a cookie :3")
     .setColor('#fcb603') //orange lol
     .setTimestamp()
     .setFooter({ text: 'Give my developer (Addris) A little support [even if its just a hug!]'});


module.exports = {
    data: new SlashCommandBuilder()
        .setName("info") //THIS NAME HAS TO BE THE SAME AS THE PARENT FILE NAME!!! ALSO NO CAPITAL LETTER FOR SOME REASON??
        .setDescription("Tells you what i do!"),
    async execute(interaction) {

        await interaction.reply({
            

            embeds: [EmbedToSend],
            ephemeral: true //only visible to the user who executed the command if true
        });
    }
}