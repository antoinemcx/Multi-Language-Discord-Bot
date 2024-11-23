const fs = require('fs');

module.exports = async (bot) => {
    const commandDirectory = `${__dirname}/../../command`;
    fs.readdir(commandDirectory + '/', (err, files) => {
        if (err) bot.logger.error(err);
        // Command category loading
        files.forEach(dir => {
            fs.readdir(`${commandDirectory}/${dir}/`, (err, file) => {
                if (err) bot.logger.error(err);
                bot.logger.loader(`${bot.color.chalkcolor.magenta('[CATEGORY] ')} ${bot.color.chalkcolor.blue(`${dir}`)} loading...`);

                // Command loading
                file.forEach(f => {
                    const props = require(`${commandDirectory}/${dir}/${f}`);
                    bot.logger.loader(`[COMMANDE] ${bot.color.chalkcolor.cyanBright(`${f}`)} is loaded`);
                    bot.commandes.set(props.conf.name, props);
                    props.conf.aliases.forEach(alias => {
                        bot.aliases.set(alias, props.conf.name);
                    });
                });

                bot.logger.loader(`${bot.color.chalkcolor.magenta('[CATEGORY]')} ${bot.color.chalkcolor.red('[FINISH]')} ${bot.color.chalkcolor.blue(`${dir}`)} is loaded`)
            });
        });
    });
};