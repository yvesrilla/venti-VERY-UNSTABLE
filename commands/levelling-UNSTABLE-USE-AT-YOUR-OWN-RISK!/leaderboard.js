const discord = require('discord.js')
const mongoCurrency = require('discord-mongo-currency')

module.exports={
    name:"leaderboard",
    aliases: ['lb'],
    cooldown: 3000 * 5,
    async run(bot, message, args){
        

        const leaderboard = await mongoCurrency.generateLeaderboard(message.guild.id, 10);
    
        if (leaderboard.length < 1) return message.channel.send("Nobody's on the leaderboard.");
        
        const mappedLeaderboard = leaderboard.map(i => `${bot.users.cache.get(i.userId).tag ? client.users.cache.get(userId).tag : "Nobody"} - ${i.coinsInWallet}`);
        
        const embed = new discord.MessageEmbed()
        .setTitle(`${message.guild.name}\'s Leaderboard`)
        .setDescription(`${mappedLeaderboard.join('\n')}`)
        
        
        message.lineReplynoMention(embed);
    }
}
