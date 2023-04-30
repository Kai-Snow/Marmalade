//cookie command

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("cookie") //THIS NAME HAS TO BE THE SAME AS THE PARENT FILE NAME!!! and also there cant be a capital letter?? huh lol
        .setDescription("Give me a treat :3"),
    async execute(interaction) {
        
        const messages = [
            "Psst! Did you know that Addris likes cookies over biscuits x3", 
            "Psst! Addris LOVES chocolate biscuits, why not give him some :3 ", 
            "Psst! Did you know that the only diffrence between a cookie and a biscuit is that a biscuit is baked more, comes from the Latin word 'double baked' :D", 
            "Psst! Did you know that biscuits bought from the store can take up to 2 weeks to be made!",
            "Psst! Did you know that Biscuits are bought by 27 million households and eaten on 6 billion occasions a year!",
            "Psst! Addris is quite reserved with eating Biscuits especially infront of others (He just wants to make sure there is enough for everyone else :'3), however when alone he guzzles them down!",
            "Psst! Did you know Addris has a private Biscuit tin! I still can't find it.. maybe you will have better luck than me!",
            "Psst! Make sure to get me the plain ones next time :3"
        ]
        
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]; //gets a random message lol
        
        await interaction.reply({
            content: "Meow, Thankyou so much :D **Nom Nom Nom**, i appreciate it ;3",
            ephemeral: false //only visible to the user who executed the command if true
        });
        await interaction.followUp({ //follow up reply to the bot lol
            
            content: randomMessage,
            ephemeral: true //only visible to the user who executed the command if true
        });
    }
}