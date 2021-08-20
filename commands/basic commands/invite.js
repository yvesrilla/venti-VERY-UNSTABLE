const discord = require('discord.js')

module.exports={
	name:"invite",
	async run(bot, message, args){
		message.lineReply("https://discord.com/oauth2/authorize?bot_id=819519754778705970&scope=bott&permissions=379904")
	}
}