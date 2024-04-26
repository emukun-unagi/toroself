module.exports = {
    name: 'messageCreate',
    execute(message) {
      if (message.author.id === '1187337651146215496) {
        message.react('☺️')
      }
    },
};
