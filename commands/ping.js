module.exports = {
    name: 'ping',
    description: 'ping command',
    execute(message, args) {
        message.reply('Pinging...').then(sentMessage => {
            const ping = sentMessage.createdTimestamp - message.createdTimestamp;
            sentMessage.edit(`Pong! Latency is ${ping}ms.`);
        });
    },
};
