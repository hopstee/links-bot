import { Action, Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { UserService } from '../user/user.service';
import { Context, Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { LinkService } from '../link/link.service';
import { SceneContext } from 'telegraf/typings/scenes';

@Update()
export class BotService extends Telegraf {
    private bot: Telegraf<Context>

    constructor(
        private readonly configService: ConfigService,
        private userService: UserService,
        private linkService: LinkService,
    ) {
        super(configService.get('TELEGRAM_BOT_TOKEN'))
    }

    @Start()
    async onStart(@Ctx() ctx: Context) {
        try {
            this.userService.checkUser(ctx.from.id, {
                telegramId: ctx.from.id,
                username: ctx.from.username,
                firstName: ctx.from.first_name,
                lastName: ctx.from.last_name,
            })
            await ctx.reply(`Привет ${ctx.from.username ?? `${ctx.from.first_name} ${ctx.from.last_name}`}`);
        } catch (error) {
            console.error(error)
        }
    }

    @Command('alllinks')
    async allLinks(@Ctx() ctx: Context) {
        try {
            const { data, count } = await this.linkService.getUserLinks(ctx.from.id)

            if (data.length === 0) {
                await ctx.replyWithMarkdownV2("У вас нет сохраненных ссылок 🧐");
            } else {
                const replyMarkup = data.length < count
                    ? {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: '👉', callback_data: 'page-1' },
                                ]
                            ],
                        }
                    }
                    : {}

                await ctx.replyWithMarkdownV2(
                    data.map(link => `${link.link} \\(__\`${link.linkCode}\`__\\)`).join('\n\n'),
                    replyMarkup
                );
            }
        } catch (error) {
            console.error(error)
        }
    }

    @Action(/^page-(\d+)$/)
    async getLinksNextPage(@Ctx() ctx) {
        try {
            const page = Number(ctx.match[1])
            const { data, currentPage } = await this.linkService.getUserLinks(ctx.from.id, page)
            const buttons = []

            if (page !== 0) {
                buttons.push({ text: '👈', callback_data: `page-${page - 1}` })
            }

            if (page !== currentPage) {
                buttons.push({ text: '👉', callback_data: `page-${page + 1}` })
            }

            await ctx.editMessageText(
                data.map(link => `${link.link} \\(__\`${link.linkCode}\`__\\)`).join('\n\n'),
                {
                    parse_mode: 'MarkdownV2',
                    reply_markup: {
                        inline_keyboard: [buttons],
                    }
                }
            );
        } catch (error) {
            console.error(error)
        }
    }

    @Command('getlink')
    async getLinks(@Ctx() ctx: SceneContext) {
        try {
            ctx.scene.enter('getLinkScene')
        } catch (error) {
            console.error(error)
        }
    }

    @Command('addlink')
    async addLinks(@Ctx() ctx: SceneContext) {
        try {
            ctx.scene.enter('addLinkScene')
        } catch (error) {
            console.error(error)
        }
    }

    @Command('deletelink')
    async deleteLinks(@Ctx() ctx: SceneContext) {
        try {
            ctx.scene.enter('deleteLinkScene')
        } catch (error) {
            console.error(error)
        }
    }
}
