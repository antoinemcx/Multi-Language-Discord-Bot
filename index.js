const { Client, Collection, GatewayIntentBits } = require("discord.js");
const bot = new Client({
  allowedMentions: { parse: ['users', 'roles'] },
  fetchAllMembers: false,
  intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ],
});
const fs = require('fs');
require('dotenv').config()

//SET COLLECTION & MAP
bot.commandes = new Collection();
bot.aliases = new Collection();
cooldowns = new Collection();

//SET UTILS
bot.logger = require('./utils/logger');
bot.color = require('./utils/color');

require('./utils/errorHandler')(bot);

//LOADER ALL FILE AND COMMANDS
fs.readdir("./command/", (err, files) => {
    if (err) bot.logger.error(err);
    files.forEach(dir => {
      fs.readdir('./command/'+ dir +'/', (err, file) => {
        if (err) bot.logger.error(err);
        bot.logger.loader(`${bot.color.chalkcolor.magenta('[CATEGORY] ')} ${bot.color.chalkcolor.blue(`${dir}`)} chargement...`);
        file.forEach(f => {
          const props = require(`./command/${dir}/${f}`);
          bot.logger.loader(`[COMMANDE] ${bot.color.chalkcolor.cyanBright(`${f}`)} est chargé`);
          bot.commandes.set(props.conf.name, props);
          props.conf.aliases.forEach(alias => {
            bot.aliases.set(alias, props.conf.name);
          });
        });

        bot.logger.loader(`${bot.color.chalkcolor.magenta('[CATEGORY]')} ${bot.color.chalkcolor.red('[FINISH]')} ${bot.color.chalkcolor.blue(`${dir}`)} est chargé`)
    });
  });
})

  //LOADER ALL EVENT
 fs.readdir("./event/", (err, files) => {
    if (err) bot.logger.error(err);
    files.forEach(file => {
      const event = require(`./event/${file}`);
      let eventName = file.split(".")[0];
      bot.logger.loader(`[EVENT] ${bot.color.chalkcolor.green(`${eventName}.js`)} est chargé`);
      bot.on(eventName, event.bind(null, bot));
    });
    bot.logger.loader(`[EVENT] ${bot.color.chalkcolor.red('[FINISH]')} ${files.length} events chargés`)
  });
 
 //LOADER ALL UTILS FILES
  fs.readdir('./utils/', (err, files) => {
    if (err) bot.logger.error(err);
    files.forEach((f) => {
        bot.logger.loader(`[UTILS] ${bot.color.chalkcolor.green(f)} est chargé`);
        bot[f.split('.')[0]] = require(`./utils/${f}`);
    });
    bot.logger.loader(`[UTILS] ${bot.color.chalkcolor.red('[FINISH]')} ${files.length} utilitaires chargés`);
  });

   //LOADER ALL LANGUAGUES FILES
   fs.readdir('./language/', (err, files) => {
    if (err) bot.logger.error(err);
    files.forEach((f) => {
        bot.logger.loader(`[LANGUAGE] ${bot.color.chalkcolor.green(f)} est chargé`);
        bot[f.split('.')[0]] = require(`./language/${f}`);
    });
    bot.logger.loader(`[LANGUAGE] ${bot.color.chalkcolor.red('[FINISH]')} ${files.length} langages chargés`);
  });

bot.login(process.env.TOKEN); 