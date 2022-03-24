const {Client, Intents, ClientPresence, ReactionUserManager} = require('discord.js');
//const {token} = require('./config.json');
const fetch = require('node-fetch');

const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.once('ready', () => {
    console.log('Ready!');
})

client.on('interactionCreate', async interaction => {

    if (!interaction.isCommand()) return;

    const {commandName} = interaction;

    if (commandName === "floorprice"){
        await interaction.deferReply();
        const collection = interaction.options.getString('collection');
        //const query = new URLSearchParams({collection});
        //console.log(query)
        const data = await fetch(`https://api-mainnet.magiceden.dev/v2/collections/${collection}/stats`)
            .then(response => response.json());
        
        console.log(data.floorPrice);
        
        const floorPriceInSol = data.floorPrice/1000000000;
        if(!data){
            interaction.editReply(`No results found for **${collection}**`)
        }else{
            interaction.editReply(`**${collection}:** ${floorPriceInSol} SOL`)
        }
    }
})

client.login(process.env.DJS_TOKEN)
