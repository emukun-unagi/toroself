const Discord = require('discord.js-selfbot-v13');
const fetch = require('node-fetch');
const chalk = require('chalk');
const fs = require('fs');
const config = require('./config.json');
require('dotenv').config();
const express = require(`express`)
const app = express();

const client = new Discord.Client({
    checkUpdate: false,
});

const http = require('http');
http.createServer(function(request, response)
{
      response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Bot is online!');
}).listen(3000);

client.on('message', async (message) => {
  if(message.author.bot)return;
  if(message.content.includes(client.user.id)) {

    let lol = new MessageEmbed()
    .setColor("#00FFFF")
    .setAuthor(client.user.username, message.author.displayAvatarURL({dynamic: true}))
    .setDescription(`My prefix is **+** To get started type \`+help\``)
    message.channel.send(1214791259147862057)
  } 
});

fs.readdir(__dirname + "/events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    const event = require(__dirname + `/events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => event(client, ...args));

    console.log("Loading Event: "+eventName)
  });
});

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands = new Map();
    console.log("Loading Command: "+commandName)
  });
});

client.login(process.env.token);
