const discord = require('discord.js')

module.exports={
    name:"h",
    aliases: ['help'],
    async run(bot, message, args){
        var help = new discord.MessageEmbed()
        .addFields(
            {name: "basic commands", value:"`v!h` `v!invite` `v!vote`"},
            {name: "genshin commands", value:"`v!archonquests` ~~`v!builds`~~ the builds command is currently unavailable due to we need to find better builds for the characters!"},
            {name: "levelling commands", value:"`v!rank` ~~`v!leaderboard`~~ leaderboard command is currently disabled"},
            {name: "currency/economy commands", value:"`v!balance` `v!beg` `v!visionhunt`"}
        )
        .setColor('#bcebcf')
        .setFooter(`requested by ${message.author.username} (${message.author.id})`)
        .setAuthor("venti help panel", message.author.displayAvatarURL({ dynamic: true }))

        message.lineReply(help)
    }
}
