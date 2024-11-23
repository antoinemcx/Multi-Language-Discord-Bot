const { Client, Collection, GatewayIntentBits } = require("discord.js");
const bot = new Client({
  allowedMentions: { parse: ['users', 'roles'] },
  fetchAllMembers: false,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});
require('dotenv').config()

// SET COLLECTION & MAP
bot.commandes = new Collection();
bot.aliases = new Collection();
cooldowns = new Collection();

// SET UTILS
bot.logger = require('./utils/logger');
bot.color = require('./utils/color');

// LOAD THE HANDLERS
["error", "command", "event"].forEach(file => require(`./utils/handlers/${file}`)(bot));

bot.login(process.env.TOKEN); 