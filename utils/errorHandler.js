module.exports = async (client) => {

 process.on('unhandledRejection', err =>{
     if(err) {
         if (err.stack.includes('An invalid token was provided.')) {
             return client.logger.error('Invalid token, check the .env file')
         } else if (err.stack.includes('Missing permissions')) {
             return client.logger.error('Permission error')
         } else {
             return client.logger.error(err.stack)
         }
     }
 });

 process.on('uncaughtException', err =>{
    if (err.stack.includes('Promise { <pending> }')) return;
   return client.logger.error(err.stack)
 });

 process.on('warning', (err) => {
   client.logger.error(err.stack)
 })
};
