const { Collection } = require('discord.js')


const afk = new Collection(); // key = guildid + userid; value = timestamp,reason, old username, guild.id.

module.exports = { afk };