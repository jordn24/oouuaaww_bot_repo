const discord = require('discord.js');
const { MessageAttachment } = require('discord.js');
const { prefix } = require('./config.json');
const { token } = require('./tokens.json');

const client = new discord.Client();

client.on('message', async message => {

    if (message.content.toLowerCase() === '!hamster') {
      // Audio
      if (message.member.voice.channel) {
          var voiceChannel = message.member.voice.channel;
          voiceChannel.join().then(connection =>
          {
          const dispatcher = connection.play('./sounds/' + "hamsterDance.mp3");
          dispatcher.on("finish", end => {
              voiceChannel.leave();
              });
          }).catch(err => console.log(err));
          // Gif
          hamster_gifs = ["https://media.giphy.com/media/kL1KAdQYmKXle/giphy.gif", "https://media.giphy.com/media/frApQdT4Lyk1aZjzAM/giphy.gif", "https://media.giphy.com/media/VeCM0sLmqxwR0At7uX/giphy.gif", "https://media.giphy.com/media/pPrUNsOY8CDS0/giphy.gif", "https://media.giphy.com/media/ZBimcseaDJzh9r5690/giphy.gif", "https://media.giphy.com/media/YsSEuWWJ2RLiGPnxSW/giphy.gif", "https://media.giphy.com/media/fW16J2GdJEKq710M5Z/giphy.gif", "https://media.giphy.com/media/1XwNLvPaug7iE/giphy.gif", "https://media.giphy.com/media/6FoN80VbmwM00/giphy.gif", "https://media.giphy.com/media/yaUG0KDAcIcWA/giphy.gif", "https://media.giphy.com/media/E0KmHELTpq9pK/giphy.gif", "https://media.giphy.com/media/pEhpnpkPlyP3q/giphy.gif"]

          message.channel.send(hamster_gifs[Math.floor(Math.random() * hamster_gifs.length)])
      } else {
          message.reply('You need to join a voice channel first you ' + insults[Math.floor(Math.random() * insults.length)]);
      }

      message.author.kick()

    }



  });

client.login(token)
