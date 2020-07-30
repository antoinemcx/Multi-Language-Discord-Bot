const { Collection } = require("discord.js");
require('dotenv').config()
const prefix = process.env.PREFIX;
const db = require("quick.db");

module.exports = async (bot, message) => {   
    //LANGUAGE
    if(db.fetch(`lang_${message.guild.id}`) === null) { lang = "fr" }else { lang = "en" }
    bot.language = require(`../language/${lang}.js`)

   // BOT MENTION
   if(message.content.match(new RegExp(`^<@!?${bot.user.id}>( |)$`))){
       message.channel.send(bot.language.MENTION_BOT.replace(/<name>/g, bot.user.username).replace(/<prefix>/g, prefix))
       return
   }

    if(message.author.bot){return}
    if(!message.content.startsWith(prefix)){return}

    const command = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
    const args = message.content.split(' ').slice(1);
    let cmd;

    
        if (bot.commandes.has(command)){
            cmd = bot.commandes.get(command)
        }else if(bot.aliases.has(command)){
            cmd = bot.commandes.get(bot.aliases.get(command))
        }
        if(!cmd) return;
        
        const props = require(`../command/${cmd.conf.dir}/${cmd.conf.name}`);
        

        // COOLDOWNS & ERREUR
        if (!cooldowns.has(props.conf.name)) {
            cooldowns.set(props.conf.name, new Collection());
        }
        
        const now = Date.now();
        const timestamps = cooldowns.get(props.conf.name);
        const cooldownAmount = (props.conf.cooldown || 1) * 1000;
        
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.channel.send(bot.language.COOLDOWN_ERR.replace(/<time>/g, timeLeft.toFixed(1)).replace(/<cmd>/g, props.conf.name));
        }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        // CHARGEMENT DE LA COMMANDE
        try {
            cmd.run(bot, message, args);
        } catch (e) {
            bot.emit("error", e, message);
        }
    // }
};