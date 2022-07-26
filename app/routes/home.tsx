import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export async function loader() {
    return redirect('/');
}

export async function home() {
    useLoaderData();
}
