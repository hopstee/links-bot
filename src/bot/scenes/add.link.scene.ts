import { Injectable } from "@nestjs/common"
import { Ctx, Message, Scene, SceneEnter, Wizard, WizardStep } from "nestjs-telegraf"
import { SceneContext, WizardContext } from "telegraf/typings/scenes"

import { LinkService } from "../../link/link.service";
import { isValidUrl } from "utils/url";
import { maskChars } from "utils/mask";

@Injectable()
@Wizard('addLinkScene')
export class AddLinkScene {
    constructor(private readonly linkService: LinkService) { }

    @WizardStep(1)
    async getLinkCode(
        @Ctx() ctx: WizardContext
    ) {
        ctx.reply('Введите ссылку:');
        ctx.wizard.next()
    }

    @WizardStep(2)
    async getLinkByCode(@Ctx() ctx: SceneContext, @Message() message: TelegramMessage) {
        try {
            if (!isValidUrl(message.text)) {
                ctx.replyWithMarkdownV2(`Вы ввели не ссылку 🤓`)
                return
            }

            const code = crypto.randomUUID()

            const res = await this.linkService.createLink({
                link: maskChars(message.text),
                linkCode: code,
                userId: ctx.from.id
            })

            ctx.replyWithMarkdownV2(`Ваша ссылка сохранена 🫡\nВот ее код: \`${code}\``)
        } catch (e) {
            ctx.replyWithMarkdownV2(`Хм, что\\-то пошло не так при сохранении ссылки 🤔 Попробуйте еще разок 🤓`)
        }

        ctx.scene.leave();
    }
}