import { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ArticleCardImageAdminPage } from '~/components/BlogPreview';
import { getProjects, projects } from '~/services/projects.server';

type loaderData = {
    projects: projects[];
};

export const loader: LoaderFunction = async () => {
    const projects = await getProjects();

    return { projects: projects } as loaderData;
};

export default function updatePostPage() {
    const { projects } = useLoaderData() as loaderData;

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
