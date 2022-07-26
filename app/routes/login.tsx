import { Button, Container } from '@mantine/core';
import { ActionArgs, json, LoaderArgs } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { authenticator } from '~/services/auth.server';
import { sessionStorage } from '~/services/session.server';

export async function action({ request, context }: ActionArgs) {
    await authenticator.authenticate('oauth2', request, {
        successRedirect: '/',
        failureRedirect: '/login',
        throwOnError: true,
        context,
    });
}

export async function loader({ request }: LoaderArgs) {
    let [_, session] = await Promise.all([
        authenticator.isAuthenticated(request, {
            successRedirect: '/',
        }),
        sessionStorage.getSession(request.headers.get('Cookie')),
    ]);

    const error = session.get('sessionErrorKey');
    return json<any>({ error });
}

export default function Login() {
    const loaderData = useLoaderData<typeof loader>();

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
