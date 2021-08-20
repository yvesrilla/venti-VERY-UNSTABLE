const discord = require('discord.js')
const mongoCurrency = require('discord-mongo-currency')

module.exports={
    name:"beg",
    aliases:['need money'],
    async run(bot, message, args){
        const randomMoney = Math.floor(Math.random() * 600) + 1;
        await mongoCurrency.giveCoins(message.member.id, message.guild.id, randomMoney);

        message.lineReplyNoMention(`You begged and a person gave you <:Ameno_Sigil:869222710557933639> ${randomMoney}'s!`
        +'\nYou said "tysm for the Ameno Sigils" to the person who gave you the sigils')
    }
}