const mongoCurrency = require('discord-mongo-currency');
const discord = require('discord.js');

module.exports={
    name:"bal",
    aliases: ['balance'],
    cooldown: 200 * 5,
    async run(client, message, args){
        const member = message.mentions.members.first() || message.member;
     
        const user = await mongoCurrency.findUser(member.id, message.guild.id); 
     
        const embed = new discord.MessageEmbed()
        .setTitle(`${member.user.username}'s Balance`)
        .setDescription(`Wallet: <:Ameno_Sigil:869222710557933639> ${user.coinsInWallet}`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setColor('#f0fccf')
        
        message.lineReply(embed);
    }
}