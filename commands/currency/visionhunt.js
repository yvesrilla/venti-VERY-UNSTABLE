const mongoCurrency = require('discord-mongo-currency');
const discord = require('discord.js');

module.exports={
    name:"vision",
    async run(bot, message, args){
        if (args[0] === 'hunt'){
            const randomMoney = Math.floor(Math.random() * 10000) + 1;
            await mongoCurrency.giveCoins(message.member.id, message.guild.id, randomMoney);

            // embeds


            const geo = new discord.MessageEmbed()
                .setColor("YELLOW")
                .setDescription("**Vision Hunting**"
                    +"\n"
                    +"\n You went on a vision hunt and you stole someones **geo** vision"
                    +`\n **Raiden Shogun payed you <:Ameno_Sigil:869222710557933639>${randomMoney}**`)
                .setThumbnail("https://i.imgur.com/mBZG9sI.png")


            const cryo = new discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription("**Vision Hunting**"
                    +"\n"
                    +"\n You went on a vision hunt and you stole someones **cryo** vision"
                    +`\n **Raiden Shogun payed you <:Ameno_Sigil:869222710557933639>${randomMoney}**`)
                .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/8/88/Element_Cryo.png/revision/latest/top-crop/width/360/height/360?cb=20201116063123")

            const hydro = new discord.MessageEmbed()
                .setColor("DARK_AQUA")
                .setDescription("**Vision Hunting**"
                +"\n"
                +"\n You went on a vision hunt and you stole someones **hydro** vision"
                +`\n **Raiden Shogun payed you <:Ameno_Sigil:869222710557933639>${randomMoney}**`)
                .setThumbnail("https://static.wikia.nocookie.net/gensin-impact/images/3/35/Element_Hydro.png/revision/latest/top-crop/width/360/height/360?cb=20201116063105")

            const pyro = new discord.MessageEmbed()
                .setColor("RED")
                .setDescription("**Vision Hunting**"
                +"\n"
                +"\n You  went on a vision hunt and you stole someones **pyro** vision"
                +`\n **Raiden Shogun payed you <:Ameno_Sigil:869222710557933639>${randomMoney}**`)
                .setThumbnail("https://img.game8.co/3290050/73211100242437cc2e00927d07e90e79.png/show")

            var messages = [pyro, hydro, cryo, geo]
            var rnd = Math.floor(Math.random() * messages.length);

            message.channel.send(messages[rnd])


        }
    }
}