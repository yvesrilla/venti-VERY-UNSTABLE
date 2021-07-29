const Discord = require('discord.js');
const Levels = require('discord-xp');
const canvacord = require('canvacord');

module.exports = {
    name: "rank",
    aliases: ['level', 'lvl'],
    description: "..",

    async run(bot, message, args) {
        const target = message.mentions.users.first() || message.author;

        const user = await Levels.fetch(target.id, message.guild.id); 

        if (!user) return message.channel.send("Seems like the user/you has not earned any xp so far."); 

        const neededXp = Levels.xpFor(parseInt(user.level) + 1)

        const img = "https://i.postimg.cc/T2jJ8gVj/Untitled-8.png"; 

        const rank = new canvacord.Rank()
            .setAvatar(target.displayAvatarURL({ dynamic: false, format: 'png' }))
            .setBackground("IMAGE", img)
            .setRank(1, 'RANK', false)
            .setLevel(user.level)
            .setCurrentXP(user.xp)
            .setRequiredXP(neededXp)
            .setStatus(target.presence.status)
            .setProgressBar("#FFFFFF", "COLOR")
            .setUsername(target.username)
            .setDiscriminator(target.discriminator);

        rank.build()
            .then(data => {
                const attachment = new Discord.MessageAttachment(data, "RankCard.png");
                message.lineReply(attachment);
            });
    }
}