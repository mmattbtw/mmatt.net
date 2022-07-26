import { Button, Textarea, TextInput } from '@mantine/core';
import { ActionArgs, json, LoaderArgs, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { getProjectViaId, updateProject } from '~/services/projects.server';

export async function action({ params, request }: ActionArgs) {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const slug = formData.get('slug') as string;
    const markdown = formData.get('markdown') as string;
    const status = formData.get('status') as string;

    const id = params.id as string;

    await updateProject(id, {
        category,
        imageUrl,
        markdown,
        slug,
        title,
        id,
        status,
    });

    return redirect('/projects/' + slug);
}

export async function loader({ params }: LoaderArgs) {
    const project = await getProjectViaId(params.id || '');

    return json({ project: project });
}

export default function updatePostPage() {
    const { project: project } = useLoaderData<typeof loader>();

    return (
        <>
            <h2>editing project: {project?.title || ''}</h2>
            <Form method="post">
                <p>
                    <label>
                        Updated Post Title: <TextInput type="text" name="title" defaultValue={project?.title || ''} />
                    </label>
                </p>
                <p>
                    <label>
                        Updated Post Category: <TextInput type="text" name="category" defaultValue={project?.category || ''} />
                    </label>
                </p>
                <p>
                    <label>
                        Updated Post Image: <TextInput type="text" name="imageUrl" defaultValue={project?.imageUrl || ''} />
                    </label>
                </p>
                <p>
                    <label>
                        Updated Post Slug: <TextInput type="text" name="slug" defaultValue={project?.slug || ''} />
                    </label>
                </p>
                <p>
                    <label>
                        Updated Post Status: <TextInput type="text" name="status" defaultValue={project?.status || ''} />
                    </label>
                </p>
                <p>
                    <label htmlFor="markdown">Updated Markdown:</label>
                    <br />
                    <Textarea id="markdown" rows={20} name="markdown" autosize defaultValue={project?.markdown || ''} />
                </p>
                <p className="text-right">
                    <Button type="submit">Update Post</Button>
                </p>
            </Form>
        </>
    );
}
