import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

@Controller()
export class BotController {
    constructor(@InjectBot() private readonly bot: Telegraf) { }

    @Post('/bot-webhook')
    async webhook(@Req() req: Request, @Res() res: Response) {
        try {
            await this.bot.handleUpdate(req.body, res);
        } catch (e) {
            console.error('Webhook error:', e);
            res.status(500).send('Error');
        }
    }
}
