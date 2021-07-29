const Discord = require('discord.js');
require('discord-reply');
const bot = new Discord.Client();
const mongoose = require('mongoose');
const config = require('./config.json');
bot.config = config;
mongoose.connect(config.mongokey, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(console.log('Connected to mongo!'))
const { token } = require('./config.json');
const { readdirSync, read } = require('fs');
const ms = require('ms');
const { join } = require('path');
const Levels = require('discord-xp');
Levels.setURL(config.mongokey)
bot.commands = new Discord.Collection();
const commandFolders = readdirSync('./commands');
const Timeout = new Discord.Collection();
const prefix = 'v!';

const status = ['v!h for help', 'luv u!', 'made by michal#1336'];

const mongoCurrency = require('discord-mongo-currency');
 
mongoCurrency.connect(config.mongokey);


for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        bot.commands.set(command.name, command);
    }
}
bot.on("error", console.error);



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


    const updateDelay = 5;
    let currentIndex = 0;


    setInterval(() => {
        const activity = status[currentIndex];
        bot.user.setActivity(activity);

        currentIndex = currentIndex >= status.length - 1
            ? 0
            : currentIndex + 1;
    }, updateDelay * 1000);
})
