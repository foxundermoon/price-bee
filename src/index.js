const { BigNumber, utils } = require('ethers');
const { Client } = require('discord.js');
const dotenv = require('dotenv');
// const { getTokenPrice, getTokenSymbol } = require('./fetchData')
// const { getCoingeckoCircSupply } = require('./fetchCirculatingSupply')
const fetch = require('node-fetch')
const retry = require('async-retry')

const { numberWithCommas } = require('./utils')

dotenv.config()

const client = new Client()

// eslint-disable-next-line
client.on('ready', () => console.log(`Bot successfully started as ${client.user.tag} 🐝`))

// Updates token price on bot's nickname every X amount of time
client.setInterval(async () => {
	// const price = await getTokenPrice()
	// const symbol = await getTokenSymbol()
	// const circSupply = await getCoingeckoCircSupply(symbol)

	try {

		const price = await fetch('https://api-apollo.vercel.app/api/chain/apolloinfo?chainId=1088&name=Apollo&func=getCurrentPrice&dt=object').then(x => x.json());

		const pb = BigNumber.from(price.price);
		console.log(price);

		// client.guilds.cache.forEach(async (guild) => {
		//   const botMember = guild.me
		//   await botMember.setNickname(`${symbol}: $${numberWithCommas(price)}`)
		// })


		await client.user.setActivity(
			`Apollo Price`
			,
			{ type: 'WATCHING' },
		)
		await client.user.setUsername(`$${parseFloat(utils.formatEther(pb)).toFixed(5)}`)

	} catch (e) {
		console.error(e)
	}

}, 1 * 60 * 1000)

client.login(process.env.DISCORD_API_TOKEN)
