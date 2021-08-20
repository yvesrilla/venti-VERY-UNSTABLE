const Discord = require('discord.js');
const Levels = require('discord-xp');

module.exports = {
    name: "rank",
    aliases: ['level', 'lvl'],
    description: "..",

    async run(bot, message, args) {
        const target = message.mentions.users.first() || message.author;

        const user = await Levels.fetch(target.id, message.guild.id); 

        if (!user) return message.channel.send("Seems like the user/you has not earned any xp so far."); 

        message.lineReply(`> **${target.tag}** is currently on level ${user.level}
        || rank card currently disabled due to issues ||`)



    }
}