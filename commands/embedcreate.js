// Custom Embedd Creation Marmalade style ^^

const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { PermissionFlagsBits } = require("discord-api-types/v9");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("embedcreate") //THIS NAME HAS TO BE THE SAME AS THE PARENT FILE NAME!!! ALSO NO CAPITAL LETTER FOR SOME REASON??
    .setDescription("Create a Custom Embedd :3")
    .addStringOption(option => option.setName("titlecontent").setDescription("Title of embed").setRequired(true))
    .addStringOption(option => option.setName("maincontent").setDescription("Body of embed").setRequired(true))
    .addStringOption(option => option.setName("footercontent").setDescription("Footer content of embed").setRequired(true))
    .addBooleanOption(option => option.setName("includesuccess").setDescription("include success embed or not?").setRequired(true)),


    async execute(interaction) {


        function hasRole() { //checks if they have the role in the specific guild.
        // Get second guild
        const guild = interaction.guild; //guild interaction ran in
       

        // Get member in that guild, by ID
        const member = guild.members.cache.get(interaction.member.id);

        // If member is in that guild,
         if (member) {
           // return whether they have this role
            return member.roles.cache.some(r => r.name === `Marmalade Master`);
          }
        }

        ///////RESTRICTED COMMAND, REQUIRES A ROLE NAMED "Marmalade Master" TO RUN///////////

        


      if(hasRole() == true) {

        //construct the embed.

        let BodyOfEmbed = interaction.options.getString("maincontent")
        let FooterOfEmbed = interaction.options.getString("footercontent")
        let WantSucess_Embed = interaction.options.getBoolean("Include_Success_embed")
        let ColorOfEmbed = '#fcb603' //Signature Orange Color uwu
        let TitleOfEmbed = interaction.options.getString("titlecontent")

        const SucessfulEmbed = new MessageEmbed()
          .setColor('#28d144')
          .setTitle('✔️ Interaction succeeded.')
          .setDescription('The interaction has succeeded.')
          .setImage('attachment://Sucessful.png')
          .setFooter({text: "Interaction Successful" })



        const EmbedToSend = new MessageEmbed()
          .setTitle(TitleOfEmbed)
          .setDescription(BodyOfEmbed)
          .setColor(ColorOfEmbed) //orange lol
          .setTimestamp()
          .setFooter({ text: FooterOfEmbed});

          if(WantSucess_Embed == true) {

            await interaction.reply({
              embeds: [EmbedToSend,SucessfulEmbed], files: ['./Assets/Sucessful.png'], 

              ephemeral: false //only visible to the user who executed the command if true
            });


          } else {

            await interaction.reply({
              embeds: [EmbedToSend], 
              ephemeral: false //only visible to the user who executed the command if true
            });

          };

      } else {
            // if they do not have the role in the specific guild. spit this error //
            const ErrorEmbed = new MessageEmbed()
              .setTitle('⚠️ Interaction has Failed.')
              .setDescription('You do not have the required permissions to run this command.')
              .setImage('attachment://Caution.png')
              .setFooter({text: "Interaction Failed..." })
              .setColor('#fbff00')







        await interaction.reply({
            embeds: [ErrorEmbed], files: ['./Assets/Caution.png'],

            ephemeral: true //only visible to the user who executed the command if true

        });
    }
    
    }
    
}