import { Button, Textarea, TextInput } from '@mantine/core';
import { ActionFunction, redirect } from '@remix-run/cloudflare';
import { Form } from '@remix-run/react';
import { createPost } from '~/services/post.server';

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const slug = formData.get('slug') as string;
    const markdown = formData.get('markdown') as string;

    await createPost({
        category,
        imageUrl,
        markdown,
        slug,
        title,
    });

    return redirect('/blog/' + slug);
};

export default function createPostPage() {
    return (
        <>
            <Form method="post">
                <p>
                    <label>
                        Post Title: <TextInput type="text" name="title" />
                    </label>
                </p>
                <p>
                    <label>
                        Post Category: <TextInput type="text" name="category" />
                    </label>
                </p>
                <p>
                    <label>
                        Post Image: <TextInput type="text" name="imageUrl" />
                    </label>
                </p>
                <p>
                    <label>
                        Post Slug: <TextInput type="text" name="slug" />
                    </label>
                </p>
                <p>
                    <label htmlFor="markdown">Markdown:</label>
                    <br />
                    <Textarea id="markdown" rows={20} name="markdown" autosize />
                </p>
                <p className="text-right">
                    <Button type="submit">Create Post</Button>
                </p>
            </Form>
        </>
    );
}
