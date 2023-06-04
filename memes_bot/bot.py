import os

from telebot.async_telebot import AsyncTeleBot

import random

import requests

from dotenv import load_dotenv

load_dotenv()

#
# BOT
#

BOT_TOKEN = os.getenv('BOT_TOKEN')

bot = AsyncTeleBot(BOT_TOKEN)

#
# Constants
#

REDDII_BASE_URL = 'https://www.reddit.com/r/memes/'
NEW_MEME_LIMIT = 1
HOT_MEME_LIMIT = 5
TOP_MEME_LIMIT = 5

#
# Utils
#


async def error_handler(message):
    await bot.reply_to(message, f'Haven\'t found any memes, sorry Pal :/')


def getMemes(res):
    return res.json()['data']['children']


def getMemeImage(meme):
    return meme['data']['url']

#
# Handlers
#


@bot.message_handler(['start', 'hello'])
async def welcome_handler(message):
    initialMessages = [
        'Welcome to MemeBot good fella! wanna try some spicy memes?',
        'Welcome to MemeBot, really? a meme bot? wow such fantasy...',
        'Welcome to MemeBot, the rules are simple: if you laugh you lose',
        'Welcome to Memebot, see some memes before PewdiePie kill them',
        'Welcome to Memebot, memes are still legal in Europe? Let\'s find out'
    ]
    await bot.reply_to(message, random.choice(initialMessages))


@bot.message_handler(['new'])
async def new_memes_handler(message):
    res = requests.get(f'{REDDII_BASE_URL}new/.json?limit={NEW_MEME_LIMIT}',
                       headers={'User-Agent': 'MemeBot0.1'})

    status = res.status_code
    if status != 200:
        await error_handler(message)
        return
    await bot.reply_to(message, getMemes(res)[0]['data']['url'])


@bot.message_handler(['hot'])
async def hot_memes_handler(message):
    res = requests.get(f'{REDDII_BASE_URL}hot/.json?limit={HOT_MEME_LIMIT}',
                       headers={'User-Agent': 'MemeBot0.1'})

    status = res.status_code

    if status != 200:
        await error_handler(message)
        return

    memes = getMemes(res)
    for meme in memes:
        await bot.reply_to(message, getMemeImage(meme))


@bot.message_handler(['top'])
async def top_memes_handler(message):
    res = requests.get(f'{REDDII_BASE_URL}top/.json?limit={TOP_MEME_LIMIT}',
                       headers={'User-Agent': 'MemeBot0.1'})

    status = res.status_code

    if status != 200:
        await error_handler(message)
        return

    memes = getMemes(res)
    for meme in memes:
        await bot.reply_to(message, getMemeImage(meme))


def main():
    import asyncio
    asyncio.run(bot.polling())
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
