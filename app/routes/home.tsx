import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

export const loader: LoaderFunction = async () => {
    return redirect('/');
};

export async function home() {
    useLoaderData();
}
