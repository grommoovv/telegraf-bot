import { Telegraf, Markup } from 'telegraf'
import { IBotContext } from '../context/context.interface'

export abstract class Command {
  constructor(public bot: Telegraf<IBotContext>) {}

  abstract handle(): void
}

export class StartCommand extends Command {
  constructor(bot: Telegraf<IBotContext>) {
    super(bot)
  }

  handle(): void {
    this.bot.start((ctx) => {
      console.log(ctx.session)
      ctx.reply(
        'Привет! Как тебе курс, понравился ?',
        Markup.inlineKeyboard([
          Markup.button.callback('Да', 'like'),
          Markup.button.callback('Нет', 'dislike'),
        ])
      )
    })

    this.bot.action('like', (ctx) => {
      ctx.session.isLiked = true
      ctx.editMessageText('Здорово :)')
    })
    this.bot.action('dislike', (ctx) => {
      ctx.session.isLiked = false
      ctx.editMessageText('Жаль :(')
    })
  }
}
