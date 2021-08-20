const { MessageEmbed } = require('discord.js');

module.exports = {

    name:"archonquests",
    async run(bot, message, args){

        var archon = new MessageEmbed()
        .setDescription("**Current Archon Quests which are Available right now!**"
        +"\n"
        +"\n Prolouge - Mondstadt "
        +"\n Act I: The Outlander Who Caught the Wind, Act II: For a Tomorrow Without Tears, Act III: Song of the Dragon and Freedom"
        +"\n"
        +"\n Chapter 2 - Liyue"
        +"\n Act I: Of the Land Amidst Monoliths, Act II: Farewell, Archaic Lord, Act III: A New Star Approaches"
        +"\n"
        +"\n Part 2 - Traveler"
        +"\n IV Prelude : Bough Keeper: Dainsleif, IV: We Will Be Reunited"
        +"\n"
        +"\n Chapter 2 - Inazuma"
        +"\n Prolouge: Autumn Winds, Scarlet Leaves, Act I: The Immovable God and the Eternal Euthymia, Act II: Stillness, the Sublimation of Shadow")
        .setThumbnail('https://i.imgur.com/RpwwnDX.png')

        message.lineReplyNoMention(archon)
    }

}