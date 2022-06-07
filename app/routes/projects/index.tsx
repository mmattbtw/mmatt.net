import { Container, Grid } from '@mantine/core';
import { LoaderFunction, MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ArticleCardImageProps, ProjectCardImage } from '~/components/ProjectPreview';
import { authenticator } from '~/services/auth.server';
import { getProjects } from '~/services/projects.server';

const globalAny: any = global;
let cached: any = globalAny.PROJECTS_DATA;

export let loader: LoaderFunction = async ({ request }) => {
    let session = await authenticator.isAuthenticated(request);

    if (!session) {
        session = null;
    }

    if (cached) {
        return {
            allProjects: cached,
            session,
        };
    } else {
        const allProjects = await getProjects();

        return { allProjects, session };
    }
};

export const meta: MetaFunction = () => {
    return {
        title: '/projects - mmatt.net',
        description: 'mmatt.net/projects - information about all my projects.',
    };
};

export default function ProjectsPage() {
    const { allProjects, session } = useLoaderData();

    const projectsExist = allProjects.length > 0;

    return (
        <Container>
            <h1>/projects</h1>
            {session?.json.id === '640348450' ? (
                <Link to={'admin'} prefetch="intent">
                    <h4>admin page</h4>
                </Link>
            ) : (
                ''
            )}

            {projectsExist ? (
                <Grid>
                    {allProjects.map((post: ArticleCardImageProps) => (
                        <Grid.Col key={post.id}>
                            <ProjectCardImage key={post.slug} {...post} />
                        </Grid.Col>
                    ))}
                </Grid>
            ) : (
                <h2>no projects found!</h2>
            )}
        </Container>
    );
}
