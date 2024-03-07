module.exports = {
    name: 'message',
    execute(message) {
        if (message.attachments.size > 0) {
            const attachment = message.attachments.first();
            const imageUrl = attachment.url;

            const options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                timeZone: 'Asia/Tokyo',
            };

            const timestamp = new Date().toLocaleString('ja-JP', options);

            console.log(chalk.blue('Image Sent:'));
            console.log(`Time: ${timestamp}`);
            console.log(`User: ${message.author.tag}`);
            console.log(`Image URL: ${imageUrl}`);
            console.log(`Server: ${message.guild.name} (ID: ${message.guild.id})`);
            console.log(`Channel: ${message.channel.name} (ID: ${message.channel.id})`);
            console.log('------------------------------');
        }
    },
};
