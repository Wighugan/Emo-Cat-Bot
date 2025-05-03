require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

const TOKEN = process.env.DISCORD_TOKEN;

client.once('ready', () => {
  console.log(`Bot đã sẵn sàng!`);
});

client.on('messageCreate', message => {
  if (message.content === 'wlc') {
    message.channel.send('<:saygex1:1348950856564871188>  Whale Cum Rengu Official  <:saygex2:1348950859140038666>');
  } else if (message.content === 'wlc2') {
    message.channel.send('# <:meowing:1348647375144747078>  CHÀO MỪNG TỚI SERVER THẰNG BÚ WIN ĐỈNH NHẤT VIỆT NAM  <:meowing:1348647375144747078>');
  } else if (message.content === 'wlc36') {
    message.channel.send('<:mat_tim_khoc:1360691938667532521>  Server không luật lệ!  <:mat_tim_khoc:1360691938667532521>\n<:emotion_bastard:1367755419723890690>  Var khắp Đông Tây Nam Bắc  <:emotion_bastard:1367755419723890690>\n<:evil_smile:1364924959088054323>  Đảm bảo không có **BÔNG TUYẾT**  <:evil_smile:1364924959088054323>');
  }
});

client.login(TOKEN);
