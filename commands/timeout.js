const { SlashCommandBuilder } = require("@discordjs/builders");
const { PermissionFlagsBits } = require("discord-api-types/v9");
const { MessageEmbed } = require("discord.js");

const durationsForTimeouts = [
    { name: "60 secs", value: 60 * 1000},
    { name: "5 mins",  value: 5 * 60 * 1000},
    { name: "10 mins", value: 10 * 60 * 1000},
    { name: "30 mins", value: 30 * 60 * 1000},
    { name: "1 hour",  value: 60 * 60 * 1000},
    { name: "1 day",   value: 24 * 60 * 60 * 1000},
    { name: "1 week",  value: 7 * 24 * 60 * 60 * 1000},
    { name: "3 weeks", value: 3 * 7 * 24 * 60 *60 * 1000}
]

//const run = async(client, interaction) => {
//    let member  = interaction.options.getMember("User")
//    let duration = interaction.options.getNumber("Length")
//    let reason = interaction.options.getString("Reason") || "No reason was given.."

//    if (!member) return interaction.reply("That User does not exsist anymore")

//    try {
//        await member.timeout(duration , reason)
//        return interaction.reply(`
//        Success! ✅
//        ${member.user.tag} has been Timed out for ${durationsForTimeouts.find(d=> duration === d.value)?.name} !
//        with the reason of ${reason}
//        , Meow :3`)
 


//    }
//    catch(err){
//        console.error(err)
//        return interaction.reply(`
//        Error! ❌
//        Failed to Time out ${member.user.tag}
//        Please report this error to Addris with the following information
//        ////////////////////////////////////////////////////////////////
//        ${err}`)

//    }
//}

module.exports = {
    data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Sets a timeout for a Member :3")
    .addUserOption(option => option.setName("user").setDescription("The user you want to time out").setRequired(true))
    .addNumberOption(option => option.setName("length").setDescription("The duration of the timeout IN SECONDS").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("Reason for the punishment")),
    
   //.setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
    
   // options: [
   //     {
   //         name: "User", description: "The user you want to time out",
   //         type: "USER", required: true
   //     },
   //     {
   //         name: "Length", description: "The duration of the timeout",
   //         type: "NUMBER",
   //         choices: durationsForTimeouts,
   //         required: true

   //     },
   //     {
   //         name: "Reason",
   //        description: "Reason for the punishment",
   //        type: "STRING",
   //        required: false
   //    }

   //],

    async execute(interaction) {

    
    //checks their roles lol

    


    const WarningEmbed = new MessageEmbed()
          .setTitle('⚠️ Interaction has Failed.')
          .setDescription('You do not have the required permissions to run this command.')
          .setImage('attachment://Caution.png')
          .setFooter({text: "Interaction Failed..." })
          .setColor('#fbff00')



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








    if (hasRole() == true) {

    let membernew  = interaction.options.getMember("user")
    let duration = interaction.options.getNumber("length")
    let reason = interaction.options.getString("reason") || "No reason was given.."
    console.log(duration)


    if (!membernew) return interaction.reply("That User does not exsist anymore")

    try {
        NewDuration = duration * 1000

        await membernew.timeout(NewDuration , reason)


        const SucessfulEmbed = new MessageEmbed()
          .setColor('#28d144')
          .setTitle(`✔️ Interaction succeeded. Timed out ${membernew.user.username} for ${duration} seconds!`)
          .setDescription('The interaction has succeeded.')
          .setImage('attachment://Sucessful.png')
          .setFooter({text: "Interaction Successful" })

        return interaction.reply({
            
            embeds: [SucessfulEmbed], files: ['./Assets/Sucessful.png'], 
            ephemeral: false //only visible to the user who executed the command if true
        });
 

       // could try ${durationsForTimeouts.find(d=> duration === d.value)?.name} for specific times defined in table above
    }
    catch(err){
        console.error(err)


        const Failiurembed = new MessageEmbed()
          .setColor('#fc0303')
          .setTitle(`❌ Interaction Failed! Error code: ${err}`)
          .setDescription('The interaction has Failed.')
          .setImage('attachment://Error.png')
          .setFooter({text: "There was an error!" })







        return interaction.reply({
            
            embeds: [Failiurembed], files: ['./Assets/Error.png'], 
            ephemeral: false //only visible to the user who executed the command if true
        });

    }
    } else {
        interaction.reply({
            
            embeds: [WarningEmbed], files: ['./Assets/Caution.png'], 
            ephemeral: true //only visible to the user who executed the command if true
        });
    }
}
}