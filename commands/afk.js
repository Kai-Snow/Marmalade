const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, Message, MessageEmbed } = require("discord.js");
const { PermissionFlagsBits } = require("discord-api-types/v9");
const { afk } = require("../Collection");
//const { execute } = require("./timeout");


module.exports = {
    data: new SlashCommandBuilder()
     .setName("afk")
     .setDescription("Sets an AFK message for your account.")
     .addStringOption(option => option.setName("reason").setDescription("Reason for the AFK, you can leave blank.")),


    async execute(interaction) {

       await interaction.deferReply(); // ALLOWS 15 MINS FOR MARM TO RESPOND

        

          let guild = interaction.guild;

          let member = guild.members.cache.get(interaction.member.id);

          let AFK_Reason = interaction.options.getString("reason") || "They Vanished mysteriously...";

          let username_old = member.nickname


          if (username_old === null) { // if no nickname, use discord user.

            username_old = member.user.username
            console.log("Null server nickname, using discord username..")

          }

        

          //console.log(member)

          //let Other_old_user = interaction.member.nickname

          //console.log(`other old user = ${Other_old_user} #, username old = ${username_old}`)

          let guild_ID = interaction.guild.id

          let Key_ = (guild_ID * 1) + (interaction.member.id * 1)


          let new_username = "{AFK} " + username_old

          const SucessfulEmbed = new MessageEmbed()
             .setColor('#28d144')
             .setTitle(`✔️ Interaction succeeded. you are now AFK!`)
             .setDescription(`AFK REASON: ${AFK_Reason}`)
             .setImage('attachment://Sucessful.png')
             .setFooter({text: "Interaction Successful" })

        

          try {

          

            //console.log(guild_ID)

           


            // check to see wether the same key exists already. only in ohio bruh 

            let Dupe_Key_Data = afk.get(Key_);



            if(Dupe_Key_Data) {

              const Failiurembed = new MessageEmbed()
             .setColor('#fc0303')
             .setTitle(`❌ AFK Not set. AFK already exists`)
             .setDescription(`You have already set an AFK in this Server!`)
             .setImage('attachment://Error.png')
             .setFooter({text: "Error. Dupe Entry in AFK array requested." })


             interaction.editReply ({ //Change to channel.send
              embeds: [Failiurembed], files: ['./Assets/Error.png']
             });




            } else {

             await interaction.member.setNickname(new_username);

             afk.set(Key_ , [Date.now(), AFK_Reason, username_old, guild_ID]); //add the user to the AFK array



             interaction.editReply({
               embeds: [SucessfulEmbed], files: ['./Assets/Sucessful.png'], 
               ephemeral: false //only visible to the user who executed the command if true
             });
            }

          } catch(error) {

         


           afk.set(Key_, [Date.now(), AFK_Reason, username_old, guild_ID]); //still add the user to the AFK array anyway

        
           const slightFailiurembed = new MessageEmbed()
             .setColor('#fbff00')
             .setTitle(`⚠️ Failed to Change Username. AFK Still Set`)
             .setDescription(`The Process has failed. The Bot is Missing Permissions. However your AFK is still Set.`)
             .setImage('attachment://Caution.png')
             .setFooter({text: "There was a slight issue!" })


          interaction.editReply ({ //Change to channel.send
             embeds: [slightFailiurembed], files: ['./Assets/Caution.png']
           });
         }


      console.log(`Added to AFK Array,`)
      console.log(afk.get(Key_));

      console.log("////////////////////////////////////////")


      console.log(`CURRENT AFK ARRAY: `)
      console.log(afk);
       
    }


   



}