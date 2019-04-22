const Telegraf = require('telegraf');
const axios = require('axios');
const bot = new Telegraf('657298331:AAFgoORDb2-oXcOubk7AmncCGyq-BoNA0Mk');

const initialMessages = [
  'Welcome to MemeBot good fella! wanna try some spicy memes?',
  'Welcome to MemeBot, really? a meme bot? wow such fantasy...',
  'Welcome to MemeBot, the rules are simple: if you laugh you lose',
  'Welcome to Memebot, see some memes before PewdiePie kill them',
  'Welcome to Memebot, memes are still legal in Europe? Let\'s find out'
];

const helpMessage = 'Hey there! List of commands: /new - Take the newest meme /top ' +
    '- take the top memes /hot - take the hottest memes at the moment ';


// GENERAL


bot.start((message) => {
    console.log('started:', message.from.id);
    return message.reply(initialMessages[Math.floor(Math.random() * initialMessages.length)]);
});
bot.catch((err) => {
    console.log('Something is wrong!', err)
});

// COMMANDS
bot.command('new', (message) => {
    axios
        .get(`https://www.reddit.com/r/memes/new/.json`)
        .then(res => {

            return message.reply(res.data.data.children[0].data.url);

        })
        .catch(err => {
            console.log(err);
            return message.reply('we haven\'t found any top memes :(');
        });
});


bot.command('top', (message) => {

    axios
        .get(`https://www.reddit.com/r/memes/top/.json`)
        .then(res => {
            const topMemes = [
                message.reply(res.data.data.children[0].data.url),
                message.reply(res.data.data.children[1].data.url),
                message.reply(res.data.data.children[2].data.url),
                message.reply(res.data.data.children[3].data.url),
                message.reply(res.data.data.children[4].data.url),

            ];

            return topMemes;


        })
        .catch(err => {
            console.log(err);
            return message.reply('we haven\'t found any top memes :(');
        });
});

bot.command('hot', (message) => {

    axios
        .get(`https://www.reddit.com/r/memes/hot/.json`)
        .then(res => {
            const topMemes = [
                message.reply(res.data.data.children[0].data.url),
                message.reply(res.data.data.children[1].data.url),
                message.reply(res.data.data.children[2].data.url),
                message.reply(res.data.data.children[3].data.url),
                message.reply(res.data.data.children[4].data.url),

            ];

            return topMemes;


        })
        .catch(err => {
            console.log(err);
            return message.reply('we haven\'t found any hot memes :(');
        });
});


bot.command('help', (message) => {
   return message.reply(helpMessage);
}).catch((err) => {
    console.log('Something is wrong!', err);
});

bot.on('text', (message) => {
    return message.reply('sorry dude! you have to use a command! type /help to see the commands ;)');
}).catch((err) => {
    console.log('Something is wrong!', err);
});

// INITIALIZATION

bot.startPolling();

