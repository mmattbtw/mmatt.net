import type { TwitchSession } from '~/services/oauth.strategy';

export interface sessionType {
    provider: string;
    json: TwitchSession;
}
