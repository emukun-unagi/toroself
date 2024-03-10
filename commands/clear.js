module.exports = {
    name: 'clear',
    description: 'Clear the queue command',
    execute: async (client, message, args) => {
        const queue = client.queue; // Assuming that 'queue' is a property of the client

        const serverQueue = queue.get('queue');

        if (serverQueue && serverQueue.songs) {
            serverQueue.songs = [serverQueue.songs[0]];
            message.channel.send("The queue has been cleared");
        } else {
            message.channel.send("There is no queue to clear");
        }
    }
};
