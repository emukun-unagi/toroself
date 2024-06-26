const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs');
const path = require('path');
const config = require('../config.json');

const configuration = new Configuration({
  apiKey: process.env.apikey,
});

const openai = new OpenAIApi(configuration);

module.exports = {
  name: "image",
  description: "image command",
  cooldown: 5,
  args: true,
  async execute(message, args) {
    const userID = message.author.id;

    const whitelistPath = path.join(__dirname, '../whitelist.json');

    const whitelist = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));

    if (!whitelist.allowedUsers.includes(userID) && userID !== config.owner) {
      return;
    }

    try {
      const prompt = args.join(" ");

      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        response_format: "url",
      });

      const image_url = response.data.data[0].url;

      const download_link = `[Download](${image_url})`;

      await message.reply(`画像を生成しました\n${prompt}\n${download_link}`);
    } catch (err) {
      await message.reply(
        `安全システムのため、そのプロンプトを含む画像は生成できません。`
      );
      console.log(err);
    }
  },
};
