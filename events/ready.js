const config = require("../config.json");

module.exports = async (client) => {
  console.log(`${client.user.username} is ready.`);
  await client.user.setActivity(config.status.text, {
    type: config.status.type
  });
await client.user.setStatus(config.status.presence);
};
