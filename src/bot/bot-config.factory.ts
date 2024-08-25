import { ConfigService } from '@nestjs/config';
import { TelegrafModuleAsyncOptions } from 'nestjs-telegraf';
import { session } from 'telegraf';

export const options = (): TelegrafModuleAsyncOptions => {
    return {
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
            token: config.get('TELEGRAM_BOT_API_TOKEN'),
            middlewares: [session()],
        }),
    };
};