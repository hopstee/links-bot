import { Module } from '@nestjs/common'

import { BotService } from './bot.service'
import { UserModule } from '../user/user.module'
import { LinkModule } from '../link/link.module'
import { TelegrafModule } from 'nestjs-telegraf'
import { options } from './bot-config.factory'
import { GetLinkScene } from './scenes/get.link.scene'
import { AddLinkScene } from './scenes/add.link.scene'
import { DeleteLinkScene } from './scenes/delete.link.scene'
import { BotController } from './controllers/bot.controller'

@Module({
    imports: [
        TelegrafModule.forRootAsync(options()),
        UserModule,
        LinkModule,
    ],
    providers: [
        BotService,
        GetLinkScene,
        AddLinkScene,
        DeleteLinkScene,
    ],
    controllers: [BotController],
    exports: [BotService, TelegrafModule],
})
export class BotModule {}
