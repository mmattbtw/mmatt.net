import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ArticleCardImageAdminPage } from '~/components/BlogPreview';
import { getProjects } from '~/services/projects.server';

export async function loader() {
    const projects = await getProjects();

    return json({ projects: projects });
}

export default function updatePostPage() {
    const { projects } = useLoaderData<typeof loader>();

    return (
        <>
            {projects.map((project) => {
                return (
                    <Link
                        to={'/projects/admin/edit/' + project.id}
                        prefetch="intent"
                        style={{
                            textDecoration: 'none',
                        }}
                        key={project.id}
                    >
                        <br />
                        <ArticleCardImageAdminPage key={project.slug} {...project} />
                    </Link>
                );
            })}
        </>
    );
}
