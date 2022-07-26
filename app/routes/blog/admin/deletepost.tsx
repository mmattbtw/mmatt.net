import { Button, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ActionArgs, json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { deletePost, getPosts } from '~/services/post.server';

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();

    const id = formData.get('id') as string;
    await deletePost(id);

    return redirect('/blog');
}

export async function loader() {
    const posts = await getPosts();

    return json({ posts });
}

export default function deletePostPage() {
    const { posts } = useLoaderData<typeof loader>();

    return (
        <>
            {posts.map((post) => (
                <div key={post.id}>
                    <a
                        onClick={() => {
                            navigator.clipboard.writeText(post.id);
                            showNotification({
                                title: 'Copied!',
                                message: 'Copied post ID: `' + post.id + '` to your clipboard.',
                            });
                        }}
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        (id: {post.id}) {post.title}
                    </a>
                </div>
            ))}
            <Form method="post">
                <p>
                    <label>
                        Post ID: <TextInput type="text" name="id" />
                    </label>
                </p>
                <p className="text-right">
                    <Button type="submit">Delete Post</Button>
                </p>
            </Form>
        </>
    );
}
