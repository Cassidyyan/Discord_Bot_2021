module.exports = {
    name: 'sauce',
    description: 'Where you get all the 6 digit codes',
    execute(message, args){
        if(args.length == 0)
            message.channel.send("You did not add any tags");

        else
            message.channel.send(`These tags...${args} have been selected`);
    }
}