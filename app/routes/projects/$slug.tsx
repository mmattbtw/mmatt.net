import { Avatar, Button, Container, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ActionFunction, LoaderFunction, MetaFunction, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { marked } from 'marked';
import Comment from '~/components/Comment';
import { ProjectHeader } from '~/components/ProjectHeader';
import { authenticator } from '~/services/auth.server';
import { comments, createComment, getCommentsViaParentId } from '~/services/comments.server';
import { getProjectViaSlug, projects } from '~/services/projects.server';

type loaderData = {
    project: projects;
    session: any | null;
    comments: comments[];
};

export const loader: LoaderFunction = async ({ params, request }) => {
    const project = await getProjectViaSlug(params.slug || '');
    const comments = await getCommentsViaParentId(project?.id || '');

    let session = await authenticator.isAuthenticated(request);

    if (!session) {
        session = null;
    }

    return { project, session, comments } as unknown as loaderData;
};

export const action: ActionFunction = async ({ request, params }) => {
    const formData = await request.formData();

    const content = formData.get('comment') as string;
    if (content === '' || content === null) {
        return redirect('/projects/' + params.slug);
    }

    const parentPost = await getProjectViaSlug(params.slug || '');
    const parentPostId = parentPost?.id || '';
    const session = await authenticator.isAuthenticated(request);
    if (!session) {
        return redirect('/login');
    }
    const userId = session.json.id || '';

    const commentData = {
        parentPostId,
        userId,
        content,
    };

    await createComment(commentData);

    return null;
};

export const meta: MetaFunction = ({ data, params }) => {
    if (!data) {
        return {
            title: 'Unknown Project - mmatt.net',
            description: `There is no project with the slug of ${params.slug}.`,
        };
    }

    const { project } = data as loaderData;
    return {
        description: `${project.title} - ${project.CreatedAt}`,
        title: `${project.title} - mmatt.net`,
        'twitter:title': `${project.title} - mmatt.net`,
        'twitter:image': project.imageUrl,
        'twitter:description': `${project.title} - ${project.CreatedAt}`,
        'og:image': project.imageUrl,
    };
};

export default function ProjectPage() {
    const { project, session, comments } = useLoaderData() as loaderData;

    const html = marked(project?.markdown.trim() ?? '');

    return (
        <Container>
            <ProjectHeader {...project} />

            {session?.json.id === '640348450' ? (
                <h5>
                    id: {project?.id} |{' '}
                    <Link to={'/projects/admin/edit/' + project.id} prefetch="intent">
                        edit project
                    </Link>
                </h5>
            ) : (
                ''
            )}

            <hr />

            <div dangerouslySetInnerHTML={{ __html: html }} />

            <hr />

            <h4>{comments.length} Comments</h4>

            {session ? (
                <Form method="post" reloadDocument>
                    <p>
                        <label>
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <Avatar
                                    radius={'xl'}
                                    style={{ marginRight: '1rem' }}
                                    alt={session?.json.display_name + "'s profile image."}
                                    src={session?.json.profile_image_url}
                                />
                                <Textarea name="comment" id="comment" placeholder="Leave a comment..." cols={100} autosize />
                            </div>
                        </label>
                    </p>
                    <p>
                        <Button
                            type="submit"
                            size="xs"
                            onClick={() => {
                                showNotification({
                                    title: 'Commenting...',
                                    message: 'Your comment is being posted.',
                                    loading: true,
                                });
                            }}
                        >
                            Comment
                        </Button>
                    </p>
                </Form>
            ) : (
                <>
                    {' '}
                    <Link to="/login" prefetch="intent">
                        You must be logged in to comment.
                    </Link>{' '}
                    <br />{' '}
                </>
            )}

            {comments.length >= 1 ? (
                comments.map((comment) => (
                    <>
                        <br />
                        <Comment key={comment.id} {...comment} />
                    </>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </Container>
    );
}
