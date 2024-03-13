const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.apikey,
});

const openai = new OpenAIApi(configuration);

module.exports = {
  name: "image",
  description: "Creates AI Image Using Open AI Api!",
  cooldown: 5,
  args: true,
  usage: "<prompt>",
  async execute(message, args) {
    try {
      const prompt = args.join(" ");

      const response = await openai.createImage({
        prompt: prompt,
        n: 1,
        response_format: "url",
      });

      const image_url = response.data.data[0].url;

      const download_link = `[Download](${image_url})`;

      await message.reply(`Image Generated!\nPrompt: ${prompt}\n${download_link}`);
    } catch (err) {
      await message.reply(
        `Image with that prompt can't be generated because of the safety system.`
      );
      console.log(err);
    }
  },
};
