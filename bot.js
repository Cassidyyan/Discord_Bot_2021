require('dotenv').config();

const Discord = require('discord.js');

const {Client, message} = require('discord.js');
const bot_client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const PREFIX = "++";

// reading in the command file
const fs = require('fs');
bot_client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    bot_client.commands.set(command.name, command);
    console.log(command.name);
}

// ready event
bot_client.on('ready', ()=>{
    console.log(`${bot_client.user.tag} has logged in`);
});

// message events
bot_client.on('message', (message) =>{
    if(!message.author.bot){ // checks to see if the sender is a bot or not
        console.log(`[${message.author.tag}]: ${message.content}`); // logs the author and message onto console

        // commands
        if(message.content.startsWith(PREFIX)){
            // gets the content of the command
            const [command, ...args] = message.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/); // regular expression to remove spaces

            // basic commands w/ no arguments
            if(command == 'among_us'){
                bot_client.commands.get('among_us').execute(message);
            }

            else if(command == 'sauce'){
                bot_client.commands.get('sauce').execute(message, args);
            }
        }
    }
});



bot_client.login(process.env.DISCORD_BOT_TOKEN);