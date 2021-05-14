const discord = require('discord.js');

const { prefix, token, insults } = require('./config.json');
const client = new discord.Client();

let price = require('crypto-price')

client.on('message', async message => {
		
		if (message.content.toLowerCase() === '!shiba help'){
			message.channel.send("Help: \n !shiba \n !shiba bal \n !shiba bal \n !shiba buy \n !shiba sell")
		}
		if (message.content.toLowerCase() === '!shiba'){
			price.getCryptoPrice("AUD", "SHIB").then(obj => { // Base for ex - USD, Crypto for ex - ETH 
			message.channel.send(obj.price)
			}).catch(err => {
				console.log(err)
			})
			price.getBasePrice("AUD", "SHIB").then(obj => { // Base for ex - USD, Crypto for ex - ETH 
			message.channel.send(obj.price)
			}).catch(err => {
				console.log(err)
			})
		}
		if (message.content.toLowerCase() === '!shiba bal'){
			console.log("Shiba bal")
		}
		if (message.content.toLowerCase() === '!shiba buy'){
			console.log("Shiba buy")
		}
		if (message.content.toLowerCase() === '!shiba sell'){
			console.log("Shiba sell")
		}
});

client.login(token)
