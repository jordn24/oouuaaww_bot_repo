const discord = require('discord.js');
const fs = require('fs');
const { MessageAttachment } = require('discord.js');

const { prefix, token, giphyToken, Vcommands, Gifcommands, Imgcommands, insults } = require('./config.json');
const client = new discord.Client();

client.on('ready', () => {
    const imgFolder = 'images/' + Imgcommands[Math.floor((Math.random() * Imgcommands.length))][1]

    fs.readdir(imgFolder, (err, files) => {
        filePath = imgFolder + "/" + files[Math.floor((Math.random() * files.length))]

        const attachment = new MessageAttachment(filePath)
        client.channels.cache.find(channel => channel.id === '342609340500410368').send("Look at this " + insults[Math.floor((Math.random() * insults.length))], attachment)
    });
});


client.login(token)
