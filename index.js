require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, VoiceConnectionStatus, entersState } = require('@discordjs/voice');
const googleTTS = require('google-tts-api');
const { createReadStream, writeFileSync } = require('fs');
const { get } = require('https');
const path = require('path');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent
  ]
});

let connection = null;
let player = null;

client.once('ready', () => {
  console.log('Bot đã sẵn sàng!');
});

client.on('messageCreate', async message => {
  if (message.author.bot) return;

  const voiceChannel = message.member?.voice?.channel;

  //join command
  if (message.content === 'wjoin') {
    if (!voiceChannel) return message.reply('⚠️ Bạn phải vào voice trước.');

    //if bot already in voice
    if (connection && connection.joinConfig.channelId === voiceChannel.id) {
      return message.reply('✅ Bot đã có mặt trong voice channel.');
    }

    connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: voiceChannel.guild.id,
      adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });

    try {
      await entersState(connection, VoiceConnectionStatus.Ready, 30_000);
      player = createAudioPlayer();
      connection.subscribe(player);
      message.reply('<:evil_smile:1364924959088054323> Bot đã vào voice channel.');
    } catch (err) {
      console.error('❌ Không thể vào voice:', err);
      message.reply('❌ Không thể kết nối voice.');
    }

    return;
  }

  //if user and bot in one voice
  if (voiceChannel && connection && connection.joinConfig.channelId === voiceChannel.id) {
    const text = message.content;
    const url = googleTTS.getAudioUrl(text, {
      lang: 'vi',
      slow: false,
      host: 'https://translate.google.com',
    });

    const filepath = path.join(__dirname, 'tts.mp3');

    get(url, res => {
      const data = [];
      res.on('data', chunk => data.push(chunk));
      res.on('end', () => {
        writeFileSync(filepath, Buffer.concat(data));
        const resource = createAudioResource(createReadStream(filepath));
        player.play(resource);
      });
    });
  }
});

//message when user type wlc
client.on('messageCreate', message => {
  if (message.content === 'wlc') {
    message.channel.send('<:saygex1:1348950856564871188>  Whale Cum Rengu Official  <:saygex2:1348950859140038666>');
  } else if (message.content === 'wlc2') {
    message.channel.send('# <:meowing:1348647375144747078>  CHÀO MỪNG TỚI SERVER THẰNG BÚ WIN ĐỈNH NHẤT VIỆT NAM  <:meowing:1348647375144747078>');
  } else if (message.content === 'wlc36') {
    message.channel.send('<:mat_tim_khoc:1360691938667532521>  Server không luật lệ!  <:mat_tim_khoc:1360691938667532521>\n<:emotion_bastard:1367755419723890690>  Var khắp Đông Tây Nam Bắc  <:emotion_bastard:1367755419723890690>\n<:evil_smile:1364924959088054323>  Đảm bảo không có **BÔNG TUYẾT**  <:evil_smile:1364924959088054323>');
  }
});

client.login(process.env.DISCORD_TOKEN);
