import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { BotModule } from './bot/bot.module'
import { sqliteConfig } from './database/sqlite.config'
import { LinkModule } from './link/link.module'
import { UserModule } from './user/user.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot(sqliteConfig),

        BotModule,
        UserModule,
        LinkModule,
    ],
})
export class AppModule {}
