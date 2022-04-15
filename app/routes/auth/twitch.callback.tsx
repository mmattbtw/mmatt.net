import { LoaderFunction } from '@remix-run/node';
import { authenticator } from '~/services/auth.server';

export let loader: LoaderFunction = ({ request }) => {
	return authenticator.authenticate('oauth2', request, {
		successRedirect: '/',
		failureRedirect: '/login',
	});
};