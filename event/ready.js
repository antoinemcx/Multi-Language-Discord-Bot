require('dotenv').config()
const prefix = process.env.PREFIX;

module.exports = async (bot) => {  
      bot.logger.info("-----------------------------------------")
      bot.logger.info(`[!] Connexion effectuée sur ${bot.user.username} (${process.env.NAME}) !`)
      bot.logger.info("-----------------------------------------")

      setInterval(() =>
      bot.user.setActivity(`${process.env.NAME} | ${prefix}`, { type: "PLAYING" }))
};
