const discord = require('discord.js');
const { MessageAttachment } = require('discord.js');
const fs = require('fs');
var GphApiClient = require('giphy-js-sdk-core')

// Get values from config
const { prefix, Vcommands, Gifcommands, Imgcommands, Textcommands, insults } = require('./config.json');
const { token, giphyToken } = require('./tokens.json');
const client = new discord.Client();
giphy = GphApiClient(giphyToken)

isReady = true;

function helpEmbed(command_string, title){
    const embedMsg = new discord.MessageEmbed()
        .setTitle(title)
        .setDescription(command_string)
        .setFooter("Use ! before every command you dumb dog")
    return embedMsg
}

client.on('message', async message => {

    if (message.content.toLowerCase() === '!commands'){
        message.channel.send(helpEmbed("`gifcommands`, `vcommands`, `imgcommands`, `tcommands`", "Help Commands"))
    }

    if (message.content.toLowerCase() === '!gifcommands'){
        full_cms = "`" + Gifcommands[0][0].replace('!','') + "`"
        Gifcommands.forEach(function (cmd, index) {
            if (cmd[0] !== Gifcommands[0][0]){
                full_cms = full_cms + ", `" + cmd[0].replace('!','') + "`"
            }
        });
        message.channel.send(helpEmbed(full_cms, "Gif Commands"))
    }
    if (message.content.toLowerCase() === '!vcommands'){
        full_cms = "`" + Vcommands[0][0].replace('!','') + "`"
        Vcommands.forEach(function (cmd, index) {
            if (cmd[0] !== Vcommands[0][0]){
                full_cms = full_cms + ", `" + cmd[0].replace('!','') + "`"
            }        });

        message.channel.send(helpEmbed(full_cms, "Voice Commands"))
        }
    if (message.content.toLowerCase() === '!imgcommands'){
        full_cms = "`" + Imgcommands[0][0].replace('!','') + "`"
        Imgcommands.forEach(function (cmd, index) {
            if (cmd[0] !== Imgcommands[0][0]){
                full_cms = full_cms + ", `" + cmd[0].replace('!','') + "`"
            }        });
            message.channel.send(helpEmbed(full_cms, "Image Commands"))
        }
    if (message.content.toLowerCase() === '!tcommands'){
        full_cms = "`" + Textcommands[0][0].replace('!','') + "`"
        Textcommands.forEach(function (cmd, index) {
            if (cmd[0] !== Textcommands[0][0]){
                full_cms = full_cms + ", `" + cmd[0].replace('!','') + "`"
            }        });
            message.channel.send(helpEmbed(full_cms, "Text Commands"))
        }

    Imgcommands.forEach(function (cmd, index) {
        if (message.content.toLowerCase() === cmd[0]) {
            const imgFolder = 'images/' + cmd[1];

            fs.readdir(imgFolder, (err, files) => {
                filePath = "images/" + cmd[1] + "/" + files[Math.floor((Math.random() * files.length))]

                const attachment = new MessageAttachment(filePath)
                message.reply(attachment)

            })
        }
    });

   Vcommands.forEach(function (cmd, index) {
        if (message.content.toLowerCase() === cmd[0]) {
            if (message.member.voice.channel) {
                if (isReady) {
                    isReady = false;
                    var voiceChannel = message.member.voice.channel;
                    voiceChannel.join().then(connection =>
                    {
                    const dispatcher = connection.play('./sounds/' + cmd[1]);
                    dispatcher.on("finish", end => {
                        voiceChannel.leave();
                        });
                    }).catch(err => console.log(err));

                    isReady = true;
                }
            } else {
                message.reply('You need to join a voice channel first you ' + insults[Math.floor(Math.random() * insults.length)]);
          }
        }
   });

    Gifcommands.forEach(function (cmd, index) {
        if (message.content.toLowerCase() === cmd[0]) {
            giphy.search('gifs', {"q": cmd[1]})
            .then((response) => {
                var totalResponses = response.data.length;
                var responseIndex = Math.floor((Math.random() * 7) + 1) % totalResponses;
                var responseFinal = response.data[responseIndex];

                message.channel.send({
                    files: [responseFinal.images.fixed_height.url]
                })
            }).catch(() => {
                message.channel.send("Whoops something went wrong...");
            })

        }
    });

    Textcommands.forEach(function (cmd, index) {
        if (message.content.toLowerCase() === cmd[0]) {
            message.reply(cmd[1]);
        }
    });
});

client.login(token)
