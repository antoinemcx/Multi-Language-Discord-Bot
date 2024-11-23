const fs = require('fs');

module.exports = async (bot) => {
    const eventDirectory = `${__dirname}/../../event`;
    
    fs.readdir(eventDirectory + '/', (err, files) => {
        if (err) bot.logger.error(err);
        files.forEach(file => {
            const event = require(`${eventDirectory}/${file}`);
            let eventName = file.split(".")[0];
            bot.logger.loader(`[EVENT] ${bot.color.chalkcolor.green(`${eventName}.js`)} is loaded`);
            bot.on(eventName, event.bind(null, bot));
        });
        bot.logger.loader(`[EVENT] ${bot.color.chalkcolor.red('[FINISH]')} ${files.length} events loaded`)
    });
};