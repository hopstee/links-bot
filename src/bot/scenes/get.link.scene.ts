import { Injectable } from "@nestjs/common"
import { Ctx, Message, Scene, SceneEnter, Wizard, WizardStep } from "nestjs-telegraf"
import { SceneContext, WizardContext } from "telegraf/typings/scenes"

import { LinkService } from "../../link/link.service";

@Injectable()
@Wizard('getLinkScene')
export class GetLinkScene {
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
        const link = await this.linkService.getLink(message.text)

        if (!link) {
            ctx.reply('Ссылки с данным кодом не существует 🙁');
        } else {
            ctx.replyWithMarkdownV2(`Вот твоя ссылка 👉 \`${link.link}\``)
        }

        ctx.scene.leave();
    }
}