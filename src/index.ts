import { Telegraf, session } from 'telegraf'
import { ConfigService, IConfigService } from './config/config'
import { IBotContext } from './context/context.interface'
import { Command, StartCommand } from './commands/command'
import LocalSession from 'telegraf-session-local'

class Bot {
  bot: Telegraf<IBotContext>
  commands: Command[] = []

  constructor(private readonly configService: IConfigService) {
    this.bot = new Telegraf<IBotContext>(this.configService.get('BOT_TOKEN'))
    this.bot.use(new LocalSession({ database: 'sessions.json' }).middleware())
  }

  start() {
    this.commands = [new StartCommand(this.bot)]
    for (const command of this.commands) {
      command.handle()
    }
    this.bot.launch()
  }
}

const bot = new Bot(new ConfigService())
bot.start()
