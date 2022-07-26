import { Button, TextInput } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ActionArgs, json, redirect } from '@remix-run/node';
import { Form, useLoaderData } from '@remix-run/react';
import { deleteProject, getProjects } from '~/services/projects.server';

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();

    const id = formData.get('id') as string;
    await deleteProject(id);

    return redirect('/projects');
}

export async function loader() {
    const projects = await getProjects();

    return json({ projects });
}

export default function deleteProjectPage() {
    const { projects } = useLoaderData<typeof loader>();

    return (
        <>
            {projects.map((project) => (
                <div key={project.id}>
                    <a
                        onClick={() => {
                            navigator.clipboard.writeText(project.id);
                            showNotification({
                                title: 'Copied!',
                                message: 'Copied post ID: `' + project.id + '` to your clipboard.',
                            });
                        }}
                        style={{
                            textDecoration: 'none',
                        }}
                    >
                        (id: {project.id}) {project.title}
                    </a>
                </div>
            ))}
            <Form method="post">
                <p>
                    <label>
                        Project ID: <TextInput type="text" name="id" />
                    </label>
                </p>
                <p className="text-right">
                    <Button type="submit">Delete Project</Button>
                </p>
            </Form>
        </>
    );
}
