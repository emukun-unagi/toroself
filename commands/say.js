module.exports = {
    info: {
      name: "say",
      description: "To say something drom bot",
      usage: "<message>",
      aliases: ["dd", 'echo'],
    },
  
    run: async function (client, message, args) {
  
      if(args.includes('@everyone')) return message.channel.send('NOOOOO!!');
      if(args.includes('@here')) return message.channel.send('NOOOOO!!');
      message.delete();
      message.channel.send(args.join(' '));
  
    }
  }
