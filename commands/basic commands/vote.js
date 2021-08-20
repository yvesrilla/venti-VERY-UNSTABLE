const { MessageEmbed } = require("discord.js");

module.exports = {
    name:"vote",
    async run(bot, message, args){

        var vote = new MessageEmbed()
        .setDescription("voting for venti is an easy way to boost venti's audience to the Discord Community!"
        +"\n"
        +"\n voting perks are in progress"
        +"\n"
        +"\n you can vote for venti [here](https://top.gg/bot/819519754778705970/vote)")
        
        message.lineReplyNoMention(vote); 
    }

}