const { createCanvas, loadImage } = require('canvas');
const { prefix } = require('../config.json');

module.exports = {
    name: 'frame1',
    description: 'frame1 command',
    async execute(message, args) {
        if (args.length !== 1) {
            return message.reply(`ユーザーのメンション、ID、タグのどれかを入力してください。`);
        }

        const userIdentifier = args[0];
        let user;

        if (userIdentifier.startsWith('<@') && userIdentifier.endsWith('>')) {
            user = message.mentions.users.first();
        } else if (/^\d+$/.test(userIdentifier)) {
            user = await message.client.users.fetch(userIdentifier).catch(() => null);
        } else {
            return message.reply('無効なユーザーです。 有効なユーザー ID、メンション、またはタグを入力してください。');
        }

        if (!user) {
            return message.reply('ユーザーが見つかりません。');
        }

        const avatarURL = user.displayAvatarURL({ format: 'png', size: 512 });

        const canvas = createCanvas(512, 512);
        const ctx = canvas.getContext('2d');

        const [avatar, frame] = await Promise.all([
            loadImage(avatarURL),
            loadImage('../images/frame1.png'),
        ]);

        canvas.width = avatar.width;
        canvas.height = avatar.height;

        ctx.drawImage(avatar, 0, 0, avatar.width, avatar.height);
        ctx.drawImage(frame, 0, 0, avatar.width, avatar.height);

        const attachment = canvas.toDataURL('image/png');
        message.reply({ files: [attachment] });
    },
};
