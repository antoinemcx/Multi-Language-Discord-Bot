require('dotenv').config()
const prefix = process.env.PREFIX;

module.exports = async (bot) => {  
      bot.logger.info("-----------------------------------------")
      bot.logger.info(`[!] Successfully connected on ${bot.user.username} !`)
      bot.logger.info("-----------------------------------------")

      setInterval(() => {
            bot.user.setActivity(`${process.env.NAME} | ${prefix} | github.com/antoinemcx`, { type: "PLAYING" });
      });
};
