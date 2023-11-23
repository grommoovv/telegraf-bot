import { Context } from 'telegraf'

interface ISession {
	isLiked: boolean
}

interface IBotContext extends Context {
	session: ISession
}

export type { IBotContext }
