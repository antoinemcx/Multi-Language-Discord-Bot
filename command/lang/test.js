module.exports = {
    conf: {
        name: "test",
        description: "test",
        usage: "<prefix>test",
        aliases: ["t"],
        dir: "lang",
    }, 
    run: async (bot, message, args) => {
        message.channel.send(bot.language.TEST_MESSAGE)
    }
}