import { Button, Textarea, TextInput } from '@mantine/core';
import { ActionFunction, redirect } from '@remix-run/node';
import { Form } from '@remix-run/react';
import { createProject } from '~/services/projects.server';
import { FormActionDataProjects } from '~/types/typings';

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const imageUrl = formData.get('imageUrl') as string;
    const slug = formData.get('slug') as string;
    const markdown = formData.get('markdown') as string;
    const status = formData.get('status') as string;

    const project: FormActionDataProjects = {
        category,
        imageUrl,
        markdown,
        slug,
        title,
        status,
    };

    await createProject(project);

    return redirect('/projects/' + slug);
};

export default function createProjectPage() {
    return (
        <>
            <Form method="post">
                <p>
                    <label>
                        Project Title: <TextInput type="text" name="title" />
                    </label>
                </p>
                <p>
                    <label>
                        Project Category: <TextInput type="text" name="category" />
                    </label>
                </p>
                <p>
                    <label>
                        Project Image: <TextInput type="text" name="imageUrl" />
                    </label>
                </p>
                <p>
                    <label>
                        Project Slug: <TextInput type="text" name="slug" />
                    </label>
                </p>
                <p>
                    <label>
                        Project Status: <TextInput type="text" name="status" />
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
