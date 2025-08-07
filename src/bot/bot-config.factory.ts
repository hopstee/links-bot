import { ConfigService } from '@nestjs/config';
import { TelegrafModuleAsyncOptions } from 'nestjs-telegraf';
import { session } from 'telegraf';

export const options = (): TelegrafModuleAsyncOptions => {
    return {
        inject: [ConfigService],
        useFactory: async (config: ConfigService) => {
            const isProd = config.get('NODE_ENV') === 'production';
            const token = config.get<string>('TELEGRAM_BOT_API_TOKEN');
            const domain = config.get<string>('WEBHOOK_DOMAIN');
            const hookPath = `/bot${token}`;
            const fullWebhookUrl = `${domain}${hookPath}`;

            const baseConfig = {
                token,
                middlewares: [session()],
            }

            if (isProd) {
                try {
                    const infoRes = await fetch(`https://api.telegram.org/bot${token}/getWebhookInfo`);
                    const infoData = await infoRes.json();

                    if (infoData.result?.url !== fullWebhookUrl) {
                        console.log(`[Webhook] Setting webhook: ${fullWebhookUrl}`);
                        const setRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ url: fullWebhookUrl }),
                        });
                        const setData = await setRes.json();
                        console.log('[Webhook setWebhook]', setData);
                    } else {
                        console.log(`[Webhook] Webhook already set: ${infoData.result.url}`);
                    }
                } catch (error) {
                    console.error('[Webhook Error]', error);
                }

                return {
                    ...baseConfig,
                    launchOptions: {
                        webhook: {
                            domain,
                            hookPath,
                        },
                    },
                    telegram: {
                        webhookReply: true,
                    },
                };
            }

            return baseConfig;
        },
    };
};