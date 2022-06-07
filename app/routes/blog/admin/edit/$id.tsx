import { Button, Textarea, TextInput } from '@mantine/core';
import { ActionFunction, LoaderFunction, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getPostViaId, posts, updatePost } from '~/services/post.server';
import { FormActionDataBlog } from '~/types/typings';

export const action: ActionFunction = async ({ params, request }) => {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const slug = formData.get('slug') as string;
    const markdown = formData.get('markdown') as string;
    const id = params.id as string;

    const post: FormActionDataBlog = {
        category,
        imageUrl,
        markdown,
        slug,
        title,
        id,
    };

    await updatePost(id, post);

    return redirect('/blog/' + slug);
};

export const loader: LoaderFunction = async ({ params }) => {
    const post = await getPostViaId(params.id || '');

    return { post } as loaderData;
};

type loaderData = {
    post: posts | null;
};

export default function updatePostPage() {
    const { post } = useLoaderData() as loaderData;

    return (
        <>
            <h2>editing post: {post?.title || ''}</h2>
            <Form method="post">
                <p>
                    <label>
                        Updated Post Title: <TextInput type="text" name="title" defaultValue={post?.title || ''} />
                    </label>
                </p>
                <p>
                    <label>
                        Updated Post Category: <TextInput type="text" name="category" defaultValue={post?.category || ''} />
                    </label>
                </p>
                <p>
                    <label>
                        Updated Post Image: <TextInput type="text" name="imageUrl" defaultValue={post?.imageUrl || ''} />
                    </label>
                </p>
                <p>
                    <label>
                        Updated Post Slug: <TextInput type="text" name="slug" defaultValue={post?.slug || ''} />
                    </label>
                </p>
                <p>
                    <label htmlFor="markdown">Updated Markdown:</label>
                    <br />
                    <Textarea id="markdown" rows={20} name="markdown" autosize defaultValue={post?.markdown || ''} />
                </p>
                <p className="text-right">
                    <Button type="submit">Update Post</Button>
                </p>
            </Form>
        </>
    );
}
