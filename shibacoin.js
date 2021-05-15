const discord = require('discord.js')
const fs = require('fs');;

const { prefix, token, insults } = require('./config.json');
const client = new discord.Client();

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

var users = {}
var timeoutDelay = 5000
var usersInTimeout = [];

client.on('ready', () => {
	// read JSON object from file
    fs.readFile('users.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    // parse JSON object
    users = JSON.parse(data.toString());
    });
});

client.on('message', async message => {

		// Basic data commands
		if (message.content.toLowerCase() === '!shiba help'){
			message.channel.send("\n!shiba \n !shiba mc \n !shiba ath \n !shiba vol \n !shiba bal \n !shiba buy \n !shiba sell")
			return
		}
		if (message.content.toLowerCase() === '!price help'){
			message.channel.send("\n!shiba \n !ada \n !btc \n !doge")
			return
		}

		if (message.content.toLowerCase() === '!shiba'){
			let data = await CoinGeckoClient.coins.fetch('shiba-inu', {});
			message.channel.send("\nAUD: $" + data["data"]["market_data"]["current_price"]["aud"])
			message.channel.send("\nUSD: $" + data["data"]["market_data"]["current_price"]["usd"])
                        message.channel.send("24 Hour Change: " + data["data"]["market_data"]["price_change_percentage_24h"] +
				"%")
			return
		}
		if (message.content.toLowerCase() === '!ada'){
			let data = await CoinGeckoClient.coins.fetch('cardano', {});
			message.channel.send("\nAUD: $" + data["data"]["market_data"]["current_price"]["aud"])
			message.channel.send("\nUSD: $" + data["data"]["market_data"]["current_price"]["usd"])
												message.channel.send("24 Hour Change: " + data["data"]["market_data"]["price_change_percentage_24h"] +
				"%")
			return
		}
		if (message.content.toLowerCase() === '!btc'){
			let data = await CoinGeckoClient.coins.fetch('bitcoin', {});
			message.channel.send("\nAUD: $" + data["data"]["market_data"]["current_price"]["aud"])
			message.channel.send("\nUSD: $" + data["data"]["market_data"]["current_price"]["usd"])
												message.channel.send("24 Hour Change: " + data["data"]["market_data"]["price_change_percentage_24h"] +
				"%")
			return
		}
    if (message.content.toLowerCase() === '!doge'){
      let data = await CoinGeckoClient.coins.fetch('dogecoin', {});
      message.channel.send("\nAUD: $" + data["data"]["market_data"]["current_price"]["aud"])
      message.channel.send("\nUSD: $" + data["data"]["market_data"]["current_price"]["usd"])
                        message.channel.send("24 Hour Change: " + data["data"]["market_data"]["price_change_percentage_24h"] +
        "%")
      return
    }

    if (message.content.toLowerCase() === '!shiba ath'){
      let data = await CoinGeckoClient.coins.fetch('shiba-inu', {});
			message.channel.send("All Time Highs: ")
      message.channel.send("AUD: $" + data["data"]["market_data"]["ath"]["aud"])
      message.channel.send("USD: $" + data["data"]["market_data"]["ath"]["usd"])
      return
		}
    if (message.content.toLowerCase() === '!shiba vol'){
      let data = await CoinGeckoClient.coins.fetch('shiba-inu', {});
      message.channel.send("Volume 24 Hrs:\n AUD: $" + data["data"]["market_data"]["total_volume"]["aud"])
    	message.channel.send("USD: $" + data["data"]["market_data"]["total_volume"]["usd"])
			return
		}


		// Holding Commands
		if (message.content.toLowerCase() === '!shiba bal'){

	    if(usersInTimeout.some(user => user.userID == message.author.id)){//check if the user is in timeout
	            var userInTimeout = usersInTimeout.find(user => user.userID == message.author.id);
	            return message.reply("On cooldown you monkey.");
	    }

			let data = await CoinGeckoClient.coins.fetch('shiba-inu', {});
                        aud_price = data["data"]["market_data"]["current_price"]["aud"]
                        usd_price = data["data"]["market_data"]["current_price"]["usd"]
			for (var key in users) {
          if (users.hasOwnProperty(message.author.username)) {
						amount = users[key]
						message.reply("\nQuantity: " + (Math.round((amount) * 100) / 100) + " coins\n"
						+ "\n AUD$" + (Math.round((aud_price * amount) * 100) / 100)  +
						"\n USD$" + (Math.round((usd_price * amount) * 100) / 100))
				}
                        }
			usersInTimeout.push({userID: message.author.id, timeoutStart: new Date().getTime()});//add the user to timeout
			setTimeout(() => {//add a timer to remove him from the timeout
          		usersInTimeout.splice(usersInTimeout.indexOf(message.author.id), 1);
        		}, timeoutDelay);
		}
		// Buy tokens
		if (message.content.toLowerCase().startsWith('!shiba buy')){


	    if(usersInTimeout.some(user => user.userID == message.author.id)){//check if the user is in timeout
	            var userInTimeout = usersInTimeout.find(user => user.userID == message.author.id);
	            return message.reply("On cooldown you monkey.");
	    }

			username = ""
			amount = message.content.replace("!shiba buy ", "")

			if (Number(amount) < 1){
				message.reply("Enter a number greater than 1 you fucking idiot")
				return
			}
			if (Number(amount) > 999999999999) {
				message.reply("That's not a number you retarded cunt")
				return
			}

			for (var key in users) {
    		if (users.hasOwnProperty(message.author.username)) {
					username = key
					current_amnt = Number(users[username])
					users[username] = Number(amount) + current_amnt
				}
			}
			if (username === ""){
				username = message.author.username
				users[username] = amount
			}

      // convert JSON object to string
      const  data  = JSON.stringify(users);

      // write JSON string to a file
      fs.writeFile('users.json', data, (err) => {
      if (err) {
      	throw err;
      }
    		console.log("JSON data is saved.");
      });

			message.reply("You bought " + amount + " tokens")
		        usersInTimeout.push({userID: message.author.id, timeoutStart: new Date().getTime()});//add the user to timeout
		       	setTimeout(() => {//add a timer to remove him from the timeout
          		usersInTimeout.splice(usersInTimeout.indexOf(message.author.id), 1);
        		}, timeoutDelay);
		}

		// Sell tokens
		if (message.content.toLowerCase().startsWith('!shiba sell')){

	    if(usersInTimeout.some(user => user.userID == message.author.id)){//check if the user is in timeout
	      var userInTimeout = usersInTimeout.find(user => user.userID == message.author.id);
	      return message.reply("On cooldown you monkey.");
	    }

      username = ""
      amount = message.content.replace("!shiba sell ", "")

      if (Number(amount) < 1){
	      message.reply("Enter a number greater than 1 you fucking idiot")
	      return
      }
      if (Number(amount) > 999999999999) {
	      message.reply("That's not a number you retarded cunt")
	      return
      }

			for (var key in users) {
          if (users.hasOwnProperty(message.author.username)) {
	          username = key
	          current_amnt = Number(users[username])
						new_amnt = current_amnt - Number(amount)

						if (new_amnt < 0){
							new_amnt = 0
						}
            users[username] = new_amnt
		    		const  data  = JSON.stringify(users);

		    		// write JSON string to a file
		    		fs.writeFile('users.json', data, (err) => {
		    		if (err) {
		            		throw err;
		    		}
		            		console.log("JSON data is saved.");
		    		});
					}
                        }
				message.reply("You sold " + amount + " tokens you fucking pussy")
				usersInTimeout.push({userID: message.author.id, timeoutStart: new Date().getTime()});//add the user to timeout
				setTimeout(() => {//add a timer to remove him from the timeout
	          		usersInTimeout.splice(usersInTimeout.indexOf(message.author.id), 1);
	        		}, timeoutDelay);
		}

});

client.login(token)
