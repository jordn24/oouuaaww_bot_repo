const discord = require('discord.js');
const { MessageAttachment } = require('discord.js');
const { prefix } = require('./config.json');
const { token } = require('./tokens.json');

const client = new discord.Client();



client.on('message', async message => {

    if (message.channel.id == "864067619854090260") {
        if (!message.content.toLowerCase().includes("http") && !!message.content.toLowerCase().includes("lowkey")
        && !message.content.toLowerCase().includes("gg")) {
            clipsMessages = ["This channel is for clips you FUCKING DUMB CUNT", "Do that again and i'll eat your fucking ass", "Imagine being as fucking autistic as your bloodline", "Send clips or go fuck yourself", "You're a dirty n word", "You have 2 IQ retard, that channel is for clips"]
            message.delete()
            message.author.send(clipsMessages[Math.floor(Math.random() * clipsMessages.length)])
        }
    }

});

client.login(token)
