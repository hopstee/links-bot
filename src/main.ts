import { NestFactory } from '@nestjs/core'
import { TelegrafModule } from 'nestjs-telegraf'

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const bot = TelegrafModule.getBot();

    const hookPath = '/bot-webhook';

    app.use(hookPath, bot.webhookCallback(hookPath));

    await app.listen(3000);
}
bootstrap()
