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

const bscClient = new Client();

// eslint-disable-next-line
client.on('ready', () => console.log(`Bot successfully started as ${client.user.tag} 🐝`))

bscClient.on('ready', () => console.log(`Bot successfully started as ${bscClient.user.tag} 🐝`))


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
			`Metis Apollo Price`
			,
			{ type: 'WATCHING' },
		)
		await client.user.setUsername(`$${parseFloat(utils.formatEther(pb)).toFixed(5)}`)

	} catch (e) {
		console.error(e)
	}

	try {

		const price = await fetch('https://api-apollo.vercel.app/api/chain/apolloinfo?chainId=56&name=Apollo&func=getCurrentPrice&dt=object&contract=0x087244b18FdCa438248655D443ea58bFd4253b53').then(x => x.json());

		const pb = BigNumber.from(price.price);
		console.log(price);

		// client.guilds.cache.forEach(async (guild) => {
		//   const botMember = guild.me
		//   await botMember.setNickname(`${symbol}: $${numberWithCommas(price)}`)
		// })


		await bscClient.user.setActivity(
			`BSC Apollo Price`
			,
			{ type: 'WATCHING' },
		)
		await bscClient.user.setUsername(`$${parseFloat(utils.formatEther(pb)).toFixed(5)}`)
	} catch (e) {
		console.error(e)
	}

}, 31 * 60 * 1000)

client.login(process.env.DISCORD_API_TOKEN);

bscClient.login(process.env.DISCORD_API_TOKEN_BSC);
