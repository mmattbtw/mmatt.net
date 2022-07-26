import { LoaderArgs } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';

export async function loader({ request }: LoaderArgs) {
    return authenticator.authenticate('oauth2', request, {
        successRedirect: '/',
        failureRedirect: '/login',
    });
}
