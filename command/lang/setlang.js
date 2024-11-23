const { QuickDB } = require("quick.db");

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
        const db = new QuickDB();
        await db.init();

        let messageToSend;

        if(!args[0]) {
            messageToSend = bot.language.SETLANG_ERR;
        } else if(args[0] === "en") {
            await db.set(`lang_${message.guild.id}`, { lang: "en" })
            messageToSend = bot.language.SETLANG_SUCCESS[1];
        } else if(args[0] === "fr") {
            await db.set(`lang_${message.guild.id}`, { lang: "fr" });
            messageToSend = bot.language.SETLANG_SUCCESS[0];
        } else {
            messageToSend = bot.language.SETLANG_ERR;
        }

        message.channel.send(messageToSend);
    }
}