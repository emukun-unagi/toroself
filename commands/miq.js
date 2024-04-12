const fs = require('fs');
const Discord = require('discord.js-selfbot-v13');
const fetch = require('node-fetch');
const path = require('path');
const config = require('../config.json');

module.exports = {
    name: 'miq',
    description: 'miq command',
    async execute(message, args) {
        const userID = message.author.id;

        const whitelistPath = path.join(__dirname, '../whitelist.json');

        const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));

        if (!whitelist.allowedUsers.includes(userID) && userID !== config.owner) {
            return;
        }

        if (message.author.bot) return;

        if (args.length < 2) {
            return message.reply('ユーザーのメンション、ID、タグ、およびメッセージの内容を入力してください。');
        }

        const userIdentifier = args[0];
        const content = args.slice(1).join(' ');

        let user;

        if (userIdentifier.startsWith('<@') && userIdentifier.endsWith('>')) {
            user = message.mentions.users.first() || await message.client.users.fetch(userIdentifier.slice(2, -1)).catch(() => null);
        } else if (/^\d+$/.test(userIdentifier)) {
            user = await message.client.users.fetch(userIdentifier).catch(() => null);
        } else if (message.guild) {
            const member = message.guild.members.cache.find((m) => m.user.tag === userIdentifier);
            user = member ? member.user : null;
        }

        if (!user) {
            return message.reply('指定されたユーザーが見つかりません。');
        }

        const name = user.displayName;
        const avatarURL = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=1024`;

        const displayName = user.displayName;
      const name = user.username;
      const content = text;
      const option = color;
      const icon = user.displayAvatarURL();
      const brand = "Make it a Quote#6660";

      fetch("https://api.voids.top/fakequote", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: content,
          avatar: icon,
          username: name,
          display_name: displayName,
          color: option === "true" ? true : false,
          watermark: brand,
        })
      })
      .then(response => response.json())
      .then(data => {
        const imageUrl = data.url
        message.reply(imageUrl);
      })
    },
};
