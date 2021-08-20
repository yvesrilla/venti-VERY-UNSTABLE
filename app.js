const Discord = require('discord.js');
require('discord-reply');
const bot = new Discord.Client();
const mongoose = require('mongoose');
const config = require('../../../../../venti-main/config.json');
const { token, statcordkey, mongokey, topkey, dbleukey } = require('../../../../../venti-main/config.json')
mongoose.connect(config.mongokey, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(console.log('Connected to mongo!'))
const { readdirSync, read } = require('fs');
const ms = require('ms');
const { join } = require('path');
const Levels = require('discord-xp');
Levels.setURL(config.mongokey)
bot.commands = new Discord.Collection();
const commandFolders = readdirSync('./commands');
const Timeout = new Discord.Collection();
const prefix = 'v!';


const mongoCurrency = require('discord-mongo-currency');
 
mongoCurrency.connect(config.mongokey);

const dbeu = require('discord-botlist-api')
const dbapi = new dbeu.Client();

dbapi.on("ready", () => {
    console.log("[LOG] API logged in!")
    setInterval(() => {
        dbapi.postData(SERVER_COUNT, SHARD_COUNT)
    }, 30000);
})
dbapi.login(config.dbleukey)


for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        bot.commands.set(command.name, command);
    }
}
bot.on("error", console.error);

const { AutoPoster } = require('topgg-autoposter')

const ap = AutoPoster(config.topkey, bot)

ap.on('posted', () => {
  console.log('Posted stats to Top.gg!')
})



bot.on("message", async (message) => {

    if (message.author.bot) return;
    if (message.channel.type === 'dm') return; //optional#

    //Levels
    const randomAmountOfXp = Math.floor(Math.random() * 10) + 1; // Min 1, Max 30
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
    if (hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**!`);
    }



    if (message.content.startsWith(prefix)) {
        const args = message.content.slice(prefix.length).trim().split(/ +/);

        const commandName = args.shift().toLowerCase();

        const command = bot.commands.get(commandName) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;

        if (command) {
            if (command.cooldown) {
                if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`Please Wait \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), { long: true })}\` Before using this command again!`);
                command.run(bot, message, args)
                Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    Timeout.delete(`${command.name}${message.author.id}`)
                }, command.cooldown)
            } else command.run(bot, message, args);
			
			
        }
    }
})


bot.login(config.token).then(() => {
    console.log(`${bot.user.tag} logged in.`)
    console.log("bot is online!")
	bot.user.setActivity(`v!h for help!`);
})
