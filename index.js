// Created By Addris 
// Marmalade :3
// V2.5 
// Stable

// Changes //

// ADD CHANGES TO MARMALADE COMMITS IN SERVER.

// V2.6

//Added AFK command! check it out using /afk!
//works Across servers.
//Added 2 new UI graphics to the bot.


// V2.58

// Upgraded the moderator function.
// fixed the role checker function.
// Increased preformance
// Added a new reply method using a new embed graphic.


// V2.5

// Upgraded the UI to include embeds.
// Upgraded the current commands.
// Secured commands.
// Added role requirement "Marmalade Master" to run restricted commands in a specific server (need the role in THAT guild). 
// 4 levels of reply. error, warning, info, success.
// wORKS IN FWIENDZ NOW.
// Added role checker into main moderator function

// V2.4.1 A

// Fixed a bug where special characters in file names / usernames wouldn't let windows save to that file as it cant save w/ special characters
// Added a role coniditon which is called "Exempt From Marmalade Logging" which doesn't moderate users with this role.
// Fixed a bug where YT links would be displayed twice even if they were not edited!!!!
// Fixed a bug where Long character file paths due to long video or attachment names caused the bot to crash.

// V2.4.0 A

// Added the ability to save images and video to a file on this local machine @ C:\Users\Kapi\Desktop\discord_server_backup\All_Chat_Attachments and @ E:\Main\discord_server_backup\ALL_CHAT_FILES
// each file given a unique name and unix timestamp as well for logging purposes ^^ 
// added console logging to all messages as well 

// V.2.3.8 A 


// FIXED issue with bot crashing after people edit links ^
// Added custom embedd creation ^^
// Added slash commands and a slash commands Dir :)
// Added neat slash responses lol
// Fixed issue where the bot would crash if a user had it blocked
// Added only moderates if the user ins't an admin or owner or mod B)


//libraries REQUIRED

const {Client, Intents, Collection, Interaction } = require('discord.js');
const perspective = require('./perspective.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
const { MessageEmbed } = require("discord.js");
const http = require('https')
const { afk } = require('./Collection');
const { request } = require('http');
const moment = require('moment');
//const { Configuration , OpenAIApi } = require('openai');
require('dotenv').config();
 
// Setup OPENAI parameters

//const Ai_configuration = new Configuration ({
//  organization: process.env.OPEN_AI_ORG,
//  apiKey: process.env.OPEN_AI_API_KEY,

//});


//const openai = new OpenAIApi(Ai_configuration);


 // Set your emoji "awards" here
 const emojiMap = {
   'TOXICITY': '🧨',
 };

 
// EVALUATE MESSAGE FUNCTION //

 /**
  * Analyzes a user's message for attribues
  * and reacts to it.
  * @param {string} message - message the user sent
  * @return {bool} shouldKick - whether or not we should
  * kick the users
  */
async function evaluateMessage(message,exemptL) {
   let scores;
   try {
     if (message.content == "") {

      //dont moderate as there is no content.

     } else {

      // if the message actually has any content. moderate.
      
     scores = await perspective.analyzeText(message.content);

     // MAIN MODERATEOR FUNCTION //

     const userid = message.author.id;
     const channelforlogs = client.channels.cache.find(channel => channel.id === "886581031073898496"); 
     const channelforlogs_SNOWY_FWIENDZ = client.channels.cache.find(channel => channel.id === "1090238265254228008");
     //const channelforNOMODERATION = client.channels.cache.find(channel => channel.id === "899397237694681118");


     for (const attribute in emojiMap) {
       if (scores[attribute]) {
        if (exemptL == false) {

           
           //message.react(emojiMap[attribute]);
           //const channelBack = await client.channels.fetch(message.channel.id)

           //message.reply({
            // content: `*Meow* Hey! ${message.author} , Please Be Kind :3`
             //ephemeral doesn't work for some reason lol, possibly need to reply to the author lol
           // });

           //try to DM the user saying they should control their language
           const membertoRemind = message.author
           const CurrentDateUniversal = new Date();

           membertoRemind.send(`Hey you!, Please Remember to control your behaviour and always be Kind :3 (This action has been logged) Your Message was // ${message} // @ ${CurrentDateUniversal} //`).catch(e => console.log(`Couldn't send a DM to the user ${message.author.username} They Probably blocked the Bot :P`))

           const FlaggedEmbed = new MessageEmbed()
             .setTitle('Comment Flagged.')
             .setDescription(`Your message of ${message} was flagged.  ${message.author.username}. remember to be kind.`)
             .setImage('attachment://Flagged.png')
             .setFooter({text: "Please be kind and respectful at all times." })
             .setColor('#ff6600')

           message.reply({
             embeds: [FlaggedEmbed], files: ['./Assets/Flagged.png']
           });

           //all one line of code B)
           console.log(`Hey Moderators and Devs, i found a harmful message! it was by ${message.author.username} , and it was [${message}] in the channel {${message.channel.name}}  you can take further action to prevent toxicity, *Meow Meow :3*`);
           //UNIVERSAL LOGS // 

           channelforlogs.send(`Hey Moderators and Devs, i found a harmful message! it was by ${message.author.username} , and it was [${message}] in the channel {${message.channel.name}}  you can take further action to prevent toxicity, *Meow Meow :3*`);
      
           //SNOWY'S SERVER / FWIENDZ

           if(message.guild == "927289112908668938") {
             channelforlogs_SNOWY_FWIENDZ.send(`Oi Snowy. i found ${message.author.username} sendin this garbage ---> [${message}] in the channel {${message.channel.name}}  you can take further action to prevent toxicity, *meow..*`);

            }


          } else if (exemptL == true)  {
            //if the user is exempt

            //const InfoEmbed2 = new MessageEmbed()
           //  .setTitle('You were moderated but you are Exempt.')
            // .setDescription(`remeber even as an exempt user. you should be kind.`)
            // .setImage('attachment://Event.png')
            // .setFooter({text: "Info!" })
            // .setColor('#00aeff')

           //message.reply({
           //  embeds: [InfoEmbed2], files: ['./Assets/Event.png'],
           //  ephemeral: true
           //});



          }
        }
    }


  }
   } catch (err) {

    const Failiurembed = new MessageEmbed()
      .setColor('#fc0303')
      .setTitle(`❌ Moderator failed!`)
      .setDescription(`Failed to moderate the message ${message}!! the error message is ${err}`)
      .setImage('attachment://Error.png')
      .setFooter({text: "There was an error!" })

      message.reply({
        embeds: [Failiurembed], files: ['./Assets/Error.png']
       });

     
     console.log(err);
     return false;
}
} 

 
 // Creates an instance of a Discord client //

 const client = new Client({
  intents: [
     Intents.FLAGS.GUILDS,     //What info to pass to marmalade from discord
     Intents.FLAGS.GUILD_MESSAGES

  ]
 })
 

// SLASH COMMAND HANDLER //


const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js")); //gets command files

const commands = [];

client.commands = new Collection();


for (const file of commandFiles) {
   const command = require(`./commands/${file}`);
   commands.push(command.data.toJSON());
   client.commands.set(command.data.name, command);

}

client.once("ready", () => {
  console.log("Marmalade has started Up :3");
  const CLIENT_ID = client.user.id;
  
  const rest = new REST({
    version: "9"
  }).setToken(process.env.DISCORD_TOKEN);

  (async () => {
    try {
      //if (process.env.ENV === "production") {
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
          body: commands
        });
        console.log('Sucessfully Registered Commands Globally');
      //} //else {
        //await rest.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.GUILD_ID), {  //ENABLE THIS IF YOU ARE TESTING NEW COMMANDS!!!!
        //  body: commands
        //});
        //console.log('Sucessfully Registered Commands Locally');
      

    //  }
    } catch (err) {
      if (err) console.error(err);
    
    }
  })();

});


// INTERACTION EVENT // 


client.on("interactionCreate", async interaction => {    //checking the clients interactions
  if (!interaction.isCommand()) return; //if the interaction isn't a command then return

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);  //if an error executing the selected command
    //throw new Error("Command Cannot be implimented");
  } catch(err) {
    if (err) console.error(err);

    const Failiurembed = new MessageEmbed()
      .setColor('#fc0303')
      .setTitle(`❌ Interaction Failed! Error code: ${err}`)
      .setDescription('The interaction has Failed.')
      .setImage('attachment://Error.png')
      .setFooter({text: "There was an error!" })

    await interaction.reply({         // reply with an error if thrown one to the user
      
      embeds: [Failiurembed], files: ['./Assets/Error.png'], 
      ephemeral: false //only visible to the user who executed the command if true
    });
 
  }

});

// CLIENT STATUS // 

client.on('ready', () => {
   console.log('I am ready!');
   //client.user.setStatus('idle');
   client.user.setActivity('For Negetivity :3' ,{type: "WATCHING"})

   //let TOTAL_GUILDS = client.guilds.cache.map(guild => guild.id);

   //module.exports = { TOTAL_GUILDS };
 })
 


// FUNCTION TO HANDLE MESSAGES WITH ATTACHMENTS OR FILES // 

var download = function(OrigMsg, url, attachmentname, originalusr, cb) {

  var currentunixtimestamp = String(Math.floor(Date.now() / 1000))


  if (url.includes('https://cdn.discordapp.com/')) { //only download discord urls obviously e.e

 // remove special characters from the attachment name and usernames bruh -w-
 // only in ohio

  var attachmentnameTwo = attachmentname.replace(/[^a-zA-Z0-9.]/g, '_'); // allow also a "." for the file container name
  var originalusrTwo = originalusr.replace(/[^a-zA-Z0-9]/g, '_');

 

  var finaldest = String.raw`C:\Users\Kapi\Desktop\discord_server_backup\All_Chat_Attachments\ITEM_` + " sent by " + originalusrTwo + " at unix " + currentunixtimestamp + " and is called " + attachmentnameTwo; //include a "\" in the file name -w-
  var finaldest2 = String.raw`E:\Main\discord_server_backup\ALL_CHAT_FILES\ITEM_` + " sent by " + originalusrTwo + " at unix " + currentunixtimestamp + " and is called " + attachmentnameTwo; //include a "\" in the file name -w-
 
 // make the string length less than a certain number of characters because it can cause errors -w-
 // only in ohio 


 if (finaldest.length >= 200 ) {
  // Keep original containerBrah, saves characters after the last "."

  var containerposition = finaldest.lastIndexOf(".");
  var LongString = "[....]";
  var containers = finaldest.substring(containerposition, finaldest.length)
 
  finaldest = finaldest.substring(0,195) + LongString + containers;
  finaldest2 = finaldest2.substring(0,195) + LongString + containers;

 }






  var file = fs.createWriteStream(finaldest); // always will work as its the C: DRIVE



  // try catch this one

  try {

  var file2 = fs.createWriteStream(finaldest2)

  } catch (err) {

    console.log(err)
    channelforsending.send(`⚠️⚠️ THERE WAS AN ERROR SAVING A DOWNLOAD. PLEASE CHECK AND RESOLVE ISSUES!! ⚠️⚠️ ERROR: ${err}`)

  }


  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function () {
      const channelforsending = client.channels.cache.find(channel => channel.id === "910193792630542369");
      const channelforlogs_Fwiendz = client.channels.cache.find(channel => channel.id === "1090543538804101221");
      const channelforlogs_Kais_corner = client.channels.cache.find(channel => channel.id === "1090543749978931220");


      const InfoEmbed = new MessageEmbed()
        .setTitle('🔽 Item has been downloaded.')
        .setDescription(`The sent attachment by ${originalusr} has been downloaded and lives at ${finaldest}`)
        .setImage('attachment://Event.png')
        .setFooter({text: "Info" })
        .setColor('#00aeff')



      console.log(`Sucessfully downloaded a attachment file sent by ${originalusr}! @ ''${finaldest}''`)
      //GLOBAL_LOGGING//
      channelforsending.send({embeds: [InfoEmbed], files: ['./Assets/Event.png']})
      //SERVER SPECIFIC//
      if (OrigMsg.guild == "927289112908668938") {
        channelforlogs_Fwiendz.send({embeds: [InfoEmbed], files: ['./Assets/Event.png']})
  
      } else if (OrigMsg.guild == "777134851471704075") {
        channelforlogs_Kais_corner.send({embeds: [InfoEmbed], files: ['./Assets/Event.png']})
  
      }
      
      file.close(cb);

    });
  }).on('error', function(err) {
    fs.unlink(finaldest, () => {});   //DELETES THE FAILED FILE THAT DIDNT DOWNLOAD PROPERLY
    if (cb) {
      const Failiurembed = new MessageEmbed()
       .setColor('#fc0303')
       .setTitle(`❌ Failed to download a File! Error code: ${err.message}`)
       .setDescription(`The Routine has Failed. could not download attachment sent by ${originalusr}.`)
       .setImage('attachment://Error.png')
       .setFooter({text: "There was an error!" })

      cb(err.message);
      console.log(err.message);
      channelforsending.send({embeds: [Failiurembed],  files: ['./Assets/Error.png']})

    }

  })



  var request2 = http.get(url, function(response) {
    response.pipe(file2);
    file2.on('finish', function () {
      const channelforsending = client.channels.cache.find(channel => channel.id === "910193792630542369");
      const channelforlogs_Fwiendz = client.channels.cache.find(channel => channel.id === "1090543538804101221");
      const channelforlogs_Kais_corner = client.channels.cache.find(channel => channel.id === "1090543749978931220");


      
      const BackedupEmbed = new MessageEmbed()
        .setTitle('✔️ Item has been Backed up')
        .setDescription(`The sent attachment by ${originalusr} has been backed up in ${finaldest2}`)
        .setImage('attachment://Sucessful.png')
        .setFooter({text: "Sucesss!" })
        .setColor('#28d144')



      //GLOBAL LOGGING// 
      console.log(`Attachment sent by ${originalusr} was also saved in @ ''${finaldest2}''`)
      //channelforsending.send({embeds: [BackedupEmbed], files: ['./Assets/Sucessful.png']})
      
      //SERVER SPECIFIC// 
      if (OrigMsg.guild == "927289112908668938") {

        //channelforlogs_Fwiendz.send({embeds: [BackedupEmbed],  files: ['./Assets/Sucessful.png']})
  
      } else if (OrigMsg.guild == "777134851471704075") {
        //channelforlogs_Kais_corner.send({embeds: [BackedupEmbed],  files: ['./Assets/Sucessful.png']})
  
      }

     




      file2.close(cb);

    });
  }).on('error', function(err) {
    fs.unlink(finaldest2, () => {});   //DELETES THE FAILED FILE THAT DIDNT DOWNLOAD PROPERLY
    if (cb) {

      const Failiurembed = new MessageEmbed()
       .setColor('#fc0303')
       .setTitle(`❌ Failed to download a File! Error code: ${err.message}`)
       .setDescription(`The Routine has Failed. could not download attachment sent by ${originalusr}.`)
       .setImage('attachment://Error.png')
       .setFooter({text: "There was an error!" })

     cb(err.message);
     console.log(err.message);
     channelforsending.send({embeds: [Failiurembed] , files: ['./Assets/Error.png']})

    }

  })
}
}

// ROLE CHECKER FUNCTION //

function hasRole(message) { //checks if they have the role in the specific guild.
  // Get second guild
  const guild = message.guild; //guild message ran in
 

  // Get member in that guild, by ID
  const member = guild.members.cache.get(message.author.id);
 
 
  // If member is in that guild,
   if (member) {
     // return whether they have this role
      if (member.roles.cache.some(r => r.name === `Exempt From Marmalade Logging`)) {
         //console.log(`${member.user.username} is exempt`)
         return true;
         
      } else if (member.roles.cache.some(r => r.name === `Marmalade Master`)) {
        //console.log(`${member.user.username} is exempt`)
        return true;


      } else {
         //console.log(`${member.user.username} is NOT exempt`)
         return false; 
      }
    }
}






// MESSAGE EVENT //

client.on('messageCreate', async (message) => {
   // send every message to the backup server with details on the message date & time 
   const currentDate = new Date();
   const channelforsending = await client.channels.fetch("910193792630542369");
   const channelforlogs_Fwiendz = await client.channels.fetch("1090543538804101221");
   const channelforlogs_Kais_corner = await client.channels.fetch("1090543749978931220");

   // Ignore messages that aren't from a guild
   // or are from a bot
   // or are over 2k+ characters long :p
   if (message.content.length > 1000) {
    message.reply({
      content: `*Meow* Hey! ${message.author} , Don't Spam :<`
    });
 } else if (message.content.length < 1000) {

  if (!message.guild || !message.author.bot) {

    //check if it mentions a user and uses the AFK array to reply back.//

    const Mentioned_Member = message.mentions.members.first();

    if (Mentioned_Member) {

      let Key__ = (message.guild.id * 1) + (Mentioned_Member.id * 1)

      const AFK_Data = afk.get(Key__);


      if(AFK_Data) {

        const[ timestamp, reason, old_username, guild_ID ] = AFK_Data;

       if (message.guild.id == guild_ID) { //if the mention is in the same guild where the afk was set.

        const Time_Ago = moment(timestamp).fromNow();

        


        const AFK_EMBED = new MessageEmbed()
         .setColor('#0911ab')
         .setTitle(`💤 ${old_username} is currently AFK Since, ${Time_Ago}`)
         .setDescription(`Here's a Note: ${reason}`)
         .setImage('attachment://AFK.png')
         .setFooter({text: "snorrrrrr mimimimi 💤💤💤" })

        message.reply({
          embeds: [AFK_EMBED] , files: ['./Assets/AFK.png']
        });


       }
      };






    }


    let Key___ = (message.guild.id * 1) + (message.author.id * 1); 

    const Get_AFK_Data = afk.get(Key___);
    

    if (Get_AFK_Data) {
      
      const[ timestamp, reason, old_username, guild_ID ] = Get_AFK_Data;

      if (message.guild.id == guild_ID) { //if the user came online is in the same guild where the afk was set.

      


      const Time_Ago = moment(timestamp).fromNow();
      //console.log(`comparing ${message.guild.id} and ${guild_ID}`)
     
      const AWAKE_EMBED = new MessageEmbed()
       .setColor('#dafc3f')
       .setTitle(`⛅ Rise and Shine! ${old_username}`)
       .setDescription(`Welcome Back! I removed your AFK :3`)
       .setImage('attachment://BACK_AFK.png')
       .setFooter({text: `AFK Since ${Time_Ago}` })

      try {


        await message.member.setNickname(old_username);


      } catch(error) {


        const slightFailiurembed = new MessageEmbed()
         .setColor('#fbff00')
         .setTitle(`⚠️ Failed to Change Username. AFK removed`)
         .setDescription(`The Process has failed. The Bot is Missing Permissions. However your AFK was removed.`)
         .setImage('attachment://Caution.png')
         .setFooter({text: "There was a slight issue!" })


        message.channel.send({
          embeds: [slightFailiurembed], files: ['./Assets/Caution.png']
        });
      }

      message.reply({
        embeds: [AWAKE_EMBED] , files: ['./Assets/BACK_AFK.png']
      });

      console.log(`AFK removed from AFK array, `)

      console.log(afk.get(Key___))


      
      afk.delete(Key___); //remove the entry from the array
      

      


    }
    }


    // END OF AFK LOGIC // 



  //try and download content if any
  if (message.attachments.size > 0) {

    message.attachments.forEach(attachment => {
      var OrigMsg = message
      var curURL = attachment.url
      var attachmentName = attachment.name
      var originaluser = message.author.username


      //console.log(curURL)
      

      try{

       

       download(OrigMsg, curURL, attachmentName, originaluser)

      }

      catch(errors) {

        const Failiurembed = new MessageEmbed()
       .setColor('#fc0303')
       .setTitle(`❌ Failed to download a File! Error code: ${err.message}`)
       .setDescription(`The Routine has Failed. could not download attachment sent by ${originalusr}.`)
       .setImage('attachment://Error.png')
       .setFooter({text: "There was an error!" })

       channelforsending.send({embeds: [Failiurembed], files: ['./Assets/Error.png']})

       if (message.guild.id == "927289112908668938") {
        channelforlogs_Fwiendz.send({embeds: [Failiurembed], files: ['./Assets/Error.png']})


       } else if (message.guild.id == "777134851471704075") {
        channelforlogs_Kais_corner.send({embeds: [Failiurembed], files: ['./Assets/Error.png']})
       }

      }

    }); 
  } else {
    //if not reguarly log the message 
    //GLOBAL LOGS//
    channelforsending.send(`Message Sent by ${message.author.username} , it was [${message}] in the channel {${message.channel.name}} @ {${currentDate}}`)
    
    
    
    
    // see if they want to use OPENai.
    // Will be added once i like get around to it... ;-;

    //var Filtered_Content = message.content.toLowerCase();
    //var Should_Get_Response = false;

    //const Triggers_ = [
    //  "marm",
    //  "marmalade",
    //  "orange kiki",
   //   "orange kitty",
   // ];

    //for (var i = 0; i < Triggers_.length; i++) {
    //  if (Filtered_Content.includes(Triggers_[i])) {

     //   console.log(`${message.author.username} Triggered The AI function`);
     //   Should_Get_Response = true;

        //ai data here, var GPT_RESPONSE = await openai.createCompletion ({
          //model: "davinci",
          //prompt: `ChatGPT is a smart kitty cat called marmalade. \n\
          //ChatGPT: Hello how are you? \n\
          //${message.author.username}: ${Filtered_Content} \n\
          //ChatGPT:`,
          //temperature: 0.6,
          //max_tokens: 100,
          //stop: ["stop marmalade","marmalade stop"],


        //})

        //message.reply(`${GPT_RESPONSE.data.choices[0].text}`);

    //    break;

    //  } else {
    //    Should_Get_Response = false;
    //  }
    //} 

   // console.log(Should_Get_Response)

    //if (Should_Get_Response == true) {

    //  try {
    //    // try the response.

        

     
      
   // } catch(err) {
   //   console.log(err)
   // }
   // }

   //END OF AI LOGIC//


   
    //SERVER INDIVIDUAL LOGS //
    if (message.guild == "927289112908668938") {
      channelforlogs_Fwiendz.send(`hey Snowy!, i found ${message.author.username} , sending [${message}] in the channel {${message.channel.name}} @ {${currentDate}}`)

    } else if (message.guild == "777134851471704075") {
      channelforlogs_Kais_corner.send(`hey Kai!, i found ${message.author.username} , sending [${message}] in the channel {${message.channel.name}} @ {${currentDate}}`)

    }

    console.log(`Message Sent by ${message.author.username} , it was [${message}] in the channel {${message.channel.name}} @ {${currentDate}}`);
  }
  

  }
 }
   if (!message.guild || message.author.bot) return;
   if (message.channel.id === "960108974911410236") return; //doesnt moderate the sus among mature channel
   if (message.channel.id === "899397237694681118") return; //doesnt moderate the sus vent channel
  

   //Doesn't moderate a exempt user
if (hasRole(message) == true) {
  
    //let exempt = true;

    //try {
    //  shouldKick = await evaluateMessage(message,exempt);
    //} catch (err) {
    //  console.log(err);
    //}

} else if (hasRole(message) == false) {
     
  
     //Evaluate the new message
     let exempt = false;
     let shouldKick = false;
     try {
       shouldKick = await evaluateMessage(message,exempt);
     } catch (err) {
       console.log(err);
     }
    };
});

// MESSAGE UPDATE/EDIT CHECKER (CHECKS TO SEE IF THEY DIDN'T EDIT IN SOMETHING BAD) //

client.on('messageUpdate', async (OldMessage, NewMessage) => {

if (!OldMessage.content === NewMessage.content) { //check to see if the content actually did change lol (YT LINK PATCH)
  return; //do nothing
} else {
  
  const currentDate = new Date();
  const channelforsending = await client.channels.fetch("910193792630542369");
  const channelforlogs_Fwiendz = await client.channels.fetch("1090543538804101221");
  const channelforlogs_Kais_corner = await client.channels.fetch("1090543749978931220");

  if (NewMessage.content.length > 1000) {
    NewMessage.reply({
      content: `*Meow* Hey! ${NewMessage.author} , Don't Spam :<`
    });
 } else {

  if (!NewMessage.guild || !NewMessage.author.bot) { //dont log bot messages/edits AND users cant add attachments into edited messages soo..
    //GLOBAL LOGGING//
    channelforsending.send(`Message Edited by ${OldMessage.author.username} , it was [${NewMessage}] in the channel {${OldMessage.channel.name}} @ {${currentDate}}, the old message was [${OldMessage}]`)
    //SERVER SPECIFIC LOGGING//

    if (NewMessage.guild == "927289112908668938") {
      channelforlogs_Fwiendz.send(`Hey Snowy! A Message Edited by ${OldMessage.author.username} , was found! it was [${NewMessage}] in the channel {${OldMessage.channel.name}} @ {${currentDate}}, the old message was [${OldMessage}]`)

    } else if (NewMessage.guild == "777134851471704075") {
      channelforlogs_Kais_corner.send(`Hey Kai! A Message Edited by ${OldMessage.author.username} , was found! it was [${NewMessage}] in the channel {${OldMessage.channel.name}} @ {${currentDate}}, the old message was [${OldMessage}]`)

    }

    console.log(`Message Edited by ${OldMessage.author.username} , it was [${NewMessage}] in the channel {${OldMessage.channel.name}} @ {${currentDate}}, the old message was [${OldMessage}]`);
  }
 }
  if (!NewMessage.guild || NewMessage.author.bot) return;
  if (NewMessage.channel.id === "960108974911410236") return; //doesnt moderate the sus among mature channel
  if (NewMessage.channel.id === "899397237694681118") return; //doesnt moderate the sus vent channel
  if (NewMessage.content.length > 1000) return; //if the message is too long then dont moderate.

 // do nothing if the user is an ADMIN or mod or owner B)

if (hasRole(NewMessage) == true) {
  
    //let exempt = true;

    //try {
    //  shouldKick = await evaluateMessage(message,exempt);
    //} catch (err) {
    //  console.log(err);
    //}
} else if (hasRole(NewMessage) == false) {
     //Evaluate the new message
     let exempt = false;
     let shouldKick = false;
     try {
       shouldKick = await evaluateMessage(NewMessage,exempt);
     } catch (err) {
       console.log(err);
     }
    };
  };
});





// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login(process.env.DISCORD_TOKEN);
 