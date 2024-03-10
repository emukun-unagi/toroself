module.exports = {
    name: 'loop',
    description: 'Toggle loop command',
    execute: async (client, message, args) => {
        const queue = client.queue; // Assuming that 'queue' is a property of the client
        const serverQueue = queue.get('queue');

        if (!serverQueue) {
            return message.channel.send("There is no song to loop.");
        }

        serverQueue.loop = !serverQueue.loop;

        const loopStatus = serverQueue.loop ? 'Started' : 'Stopped';
        message.channel.send(`${loopStatus} looping: ${serverQueue.songs[0].title}`);
    }
};
