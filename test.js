const discord = require('discord.js');
// Get values from config
const { prefix, token } = require('./config.json');
const client = new discord.Client();

isReady = true;

commands = ['!oouuaaww', '!georgewow', '!fuckgaypeople', '!protein', '!school', '!choke']

client.on('message', async message => {
  if(message.content === '!commands'){
    full_cms = ""
    commands.forEach(function (cmd, index) {
        full_cms = full_cms + "\n" + cmd
      });
      message.reply(full_cms)
    }

  if (message.content === '!oouuaaww') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voice.channel) {
        if (isReady) {
        isReady = false;
        var voiceChannel = message.member.voice.channel;
        voiceChannel.join().then(connection =>
        {
        const dispatcher = connection.play('./sounds/George_moan.mp3');
        dispatcher.on("finish", end => {
            console.log('leaving...')
            voiceChannel.leave();
            });
        }).catch(err => console.log(err));

        isReady = true;
        }
    } else {
        message.reply('You need to join a voice channel first you fucking degenerate');
  }
    }

    if (message.content === '!georgewow') {    
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            if (isReady) {
                isReady = false;
                var voiceChannel = message.member.voice.channel;
                voiceChannel.join().then(connection =>
            {
                const dispatcher = connection.play('./sounds/George_wow.mp3');
                dispatcher.on("finish", end => {
                    console.log('leaving...')
                    voiceChannel.leave();
                    });
            }).catch(err => console.log(err));
        
           isReady = true;
            }
            } else {
                message.reply('You need to join a voice channel first you fucking degenerate');
          }
        }
            

    if (message.content === '!protein') {    
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            if (isReady) {
                isReady = false;
                var voiceChannel = message.member.voice.channel;
                voiceChannel.join().then(connection =>
            {
                const dispatcher = connection.play('./sounds/George_making_protein_shake.mp3');
                dispatcher.on("finish", end => {
                    console.log('leaving...')
                    voiceChannel.leave();
                    });
            }).catch(err => console.log(err));
        
           isReady = true;
            }
            } else {
                message.reply('You need to join a voice channel first you fucking degenerate');
          }
        }
    

    if (message.content === '!fuckgaypeople') {    
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            if (isReady) {
                isReady = false;
                var voiceChannel = message.member.voice.channel;
                voiceChannel.join().then(connection =>
            {
                const dispatcher = connection.play('./sounds/George_says_Fuck_Gay_People.mp3');
                dispatcher.on("finish", end => {
                    console.log('leaving...')
                    voiceChannel.leave();
                    });
            }).catch(err => console.log(err));
        
           isReady = true;
            }
            } else {
                message.reply('You need to join a voice channel first you fucking degenerate');
          }
        }

    if (message.content === '!school') {    
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            if (isReady) {
                isReady = false;
                var voiceChannel = message.member.voice.channel;
                voiceChannel.join().then(connection =>
            {
                const dispatcher = connection.play('./sounds/letsd_shoot_up_the_school.mp3');
                dispatcher.on("finish", end => {
                    console.log('leaving...')
                    voiceChannel.leave();
                    });
            }).catch(err => console.log(err));
        
           isReady = true;
            }
            } else {
                message.reply('You need to join a voice channel first you fucking degenerate');
          }
            }


    if (message.content === '!choke') {    
        // Only try to join the sender's voice channel if they are in one themselves
        if (message.member.voice.channel) {
            if (isReady) {
                isReady = false;
                var voiceChannel = message.member.voice.channel;
                voiceChannel.join().then(connection =>
            {
                const dispatcher = connection.play('./sounds/Ivan_choke.mp3');
                dispatcher.on("finish", end => {
                    console.log('leaving...')
                    voiceChannel.leave();
                    });
            }).catch(err => console.log(err));
        
           isReady = true;
            }
            } else {
                message.reply('You need to join a voice channel first you fucking degenerate');
          }
        }
        

});


client.login(token)
