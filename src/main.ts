import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config';
import { Telegraf } from 'telegraf';

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const bot = app.get(Telegraf);

    const hookPath = '/bot-webhook';

    app.use(hookPath, bot.webhookCallback(hookPath));

    await app.listen(3000);
}
bootstrap()
