const discord = require('discord.js');
// Get values from config
const { prefix, token, commands, insults } = require('./config.json');
const client = new discord.Client();

isReady = true;

client.on('message', async message => {
    if (message.content === '!commands'){
        full_cms = ""
        commands.forEach(function (cmd, index) {
            full_cms = full_cms + "\n" + cmd[0]
        });
        message.reply(full_cms)
    }

   commands.forEach(function (cmd, index) {
        if (message.content === cmd[0]) {
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
});

client.login(token)
