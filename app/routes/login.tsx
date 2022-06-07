import { Button, Container } from '@mantine/core';
import { ActionFunction, json, LoaderFunction } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';
import { sessionStorage } from '~/services/session.server';

export const action: ActionFunction = async ({ request, context }) => {
    await authenticator.authenticate('oauth2', request, {
        successRedirect: '/',
        failureRedirect: '/login',
        throwOnError: true,
        context,
    });
};

export const loader: LoaderFunction = async ({ request }) => {
    await authenticator.isAuthenticated(request, {
        successRedirect: '/',
    });

    const session = await sessionStorage.getSession(request.headers.get('Cookie'));

    const error = session.get('sessionErrorKey');
    return json<any>({ error });
};

export default function Login() {
    const loaderData = useLoaderData();

    return (
        <Container>
            <Form method="post">
                <Button type="submit" sx={{ backgroundColor: '#6441a5', color: 'white', ':hover': { backgroundColor: '#593A93' } }} fullWidth>
                    Sign in with Twitch
                </Button>
            </Form>
        </Container>
    );
}
