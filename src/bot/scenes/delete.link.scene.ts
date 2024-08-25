import { Injectable } from "@nestjs/common"
import { Ctx, Message, Scene, SceneEnter, Wizard, WizardStep } from "nestjs-telegraf"
import { SceneContext, WizardContext } from "telegraf/typings/scenes"

import { LinkService } from "../../link/link.service";

@Injectable()
@Wizard('deleteLinkScene')
export class DeleteLinkScene {
    constructor(private readonly linkService: LinkService) { }

    @WizardStep(1)
    async getLinkCode(
        @Ctx() ctx: WizardContext
    ) {
        ctx.reply('Введите код ссылки:');
        ctx.wizard.next()
    }

    @WizardStep(2)
    async getLinkByCode(@Ctx() ctx: SceneContext, @Message() message: TelegramMessage) {
        try {
            const res = await this.linkService.deleteLink(message.text)
            
            if (res.affected) {
                ctx.replyWithMarkdownV2(`Ссылка удалена\\. Давай удалим еще что\\-нибудь 😈`)
            } else {
                ctx.replyWithMarkdownV2(`Ссылки с таким кодом не существует 🤷‍♂️`)
            }

        } catch (e) {
            ctx.replyWithMarkdownV2(`Хм, что\\-то пошло не так при удалении ссылки 🤔 Попробуйте еще разок 🤓`)
        }

        ctx.scene.leave();
    }
}