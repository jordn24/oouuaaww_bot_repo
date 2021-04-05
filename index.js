const discord = require('discord.js');
// Get values from config
const { prefix, token, giphyToken, Vcommands, Gifcommands, insults } = require('./config.json');
const client = new discord.Client();
var GphApiClient = require('giphy-js-sdk-core')

isReady = true;

client.on('message', async message => {

    if (message.content.toLowerCase() === '!commands'){
        message.reply("!Vcommands, !Gifcommands")
    }

    if (message.content.toLowerCase() === '!Gifcommands'){
        full_cms = ""
        Gifcommands.forEach(function (cmd, index) {
            full_cms = full_cms + "\n" + cmd[0]
        });
        message.reply(full_cms)
    }
    if (message.content.toLowerCase() === '!Vcommands'){
        full_cms = ""
        Vcommands.forEach(function (cmd, index) {
            full_cms = full_cms + "\n" + cmd[0]
        });
        message.reply(full_cms)
    }

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
});

client.login(token)
