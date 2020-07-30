module.exports = {
    conf: {
        name: "setlang",
        description: "setlang",
        usage: "<prefix>setlang <en/fr>",
        aliases: ["sl", "lang"],
        cooldown: 2, // (Time in second)
        dir: "lang",
    }, 
    run: async (bot, message, args) => {
        const db = require("quick.db");

        if(!args[0]) return message.channel.send(bot.language.SETLANG_ERR)

        let lang;
        if(args[0] === "en") {
            db.set(`lang_${message.guild.id}`, "en")
            message.channel.send(bot.language.SETLANG_SUCCESS[1])
        }
        
        if(args[0] === "fr") {
            db.set(`lang_${message.guild.id}`, null)
        message.channel.send(bot.language.SETLANG_SUCCESS[0])
        }
    }
}