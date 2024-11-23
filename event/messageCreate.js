const { Collection } = require("discord.js");
require('dotenv').config()
const prefix = process.env.PREFIX;
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = async (bot, message) => { 
    if (message.author.bot) { return }

    //LANGUAGE
    await db.init();

    default_lang = "en"
    lang_query = await db.get(`lang_${message.guild.id}`);
    bot.language = require(`../language/${lang_query === null ? default_lang : lang_query.lang}.js`);

    if(message.content.match(new RegExp(`^<@!?${bot.user.id}>( |)$`))) { // bot mentionned in the message
        message.channel.send(bot.language.MENTION_BOT.replace(/<name>/g, bot.user.username)
                                                     .replace(/<prefix>/g, prefix));

    } else if (message.content.startsWith(prefix)) { // bot prefix used
        const command = message.content.split(' ')[0].slice(prefix.length).toLowerCase();
        const args = message.content.split(' ').slice(1);
        let cmd;

        if (bot.commandes.has(command)) {
            cmd = bot.commandes.get(command);
        } else if (bot.aliases.has(command)) {
            cmd = bot.commandes.get(bot.aliases.get(command));
        }
        if(!cmd) return;
        
        const props = require(`../command/${cmd.conf.dir}/${cmd.conf.name}`);
        
        // COOLDOWNS
        if (!cooldowns.has(props.conf.name)) {
            cooldowns.set(props.conf.name, new Collection()); // cooldown creation
        }
        
        const now = Date.now();
        const timestamps = cooldowns.get(props.conf.name);
        const cooldownAmount = (props.conf.cooldown || 1) * 1000;
        
        if (timestamps.has(message.author.id)) {
            let expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.channel.send(bot.language.COOLDOWN_ERR.replace(/<time>/g, timeLeft.toFixed(1))
                                                                     .replace(/<cmd>/g, props.conf.name));
            }
        } else {
            timestamps.set(message.author.id, now); // addition of the cooldown to the user
        }
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

        // LOADING COMMANDS
        try {
            cmd.run(bot, message, args);
        } catch (e) {
            bot.emit("error", e, message);
        }
    }
};