module.exports = {
    name: 'stop',
    description: 'Stop command',
    execute: async (client, message, args) => {
        const queue = client.queue; // Assuming that 'queue' is a property of the client
        const serverQueue = queue.get('queue');

        if (!serverQueue) {
            return message.channel.send("There is nothing to stop.");
        }

        serverQueue.songs = [];

        try {
            serverQueue.connection._state.subscription.player.stop();
            return message.channel.send("Successfully stopped the player.");
        } catch (error) {
            console.error(`Error stopping the player: ${error}`);
            return message.channel.send("An error occurred while trying to stop the player.");
        }
    }
};
