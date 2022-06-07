import { Avatar, Button, Container, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ActionFunction, LoaderFunction, MetaFunction, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { marked } from 'marked';
import Comment from '~/components/Comment';
import DateFunction from '~/components/DateFunction';
import { PostHeader } from '~/components/PostHeader';
import { authenticator } from '~/services/auth.server';
import { comments, createComment, getCommentsViaParentId } from '~/services/comments.server';
import { getPostViaSlug, posts } from '~/services/post.server';

type loaderData = {
    post: posts;
    session: any | null;
    comments: comments[];
};

export const loader: LoaderFunction = async ({ params, request }) => {
    const post = await getPostViaSlug(params.slug || '');
    const comments = await getCommentsViaParentId(post?.id || '');

    let session = await authenticator.isAuthenticated(request);

    if (!session) {
        session = null;
    }

    return { post, session, comments } as loaderData;
};

export const action: ActionFunction = async ({ request, params }) => {
    const formData = await request.formData();

    const content = formData.get('comment') as string;
    if (content === '' || content === null) {
        return redirect('/blog/' + params.slug);
    }

    const parentPost = await getPostViaSlug(params.slug || '');
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
            title: 'Unknown Post - mmatt.net',
            description: `There is no post with the slug of ${params.slug}.`,
        };
    }

    const { post } = data as loaderData;
    return {
        description: `${post.title} - ${DateFunction({ date: post.CreatedAt })}`,
        title: `${post.title} - mmatt.net`,
        'twitter:title': `${post.title} - mmatt.net`,
        'twitter:image': post.imageUrl,
        'twitter:description': `${post.title} - ${DateFunction({ date: post.CreatedAt })}`,
        'og:image': post.imageUrl,
    };
};

export default function BlogItem() {
    const { post, session, comments } = useLoaderData() as loaderData;

    const html = marked(post?.markdown.trim() ?? '');

    return (
        <Container>
            <PostHeader {...post} />

            {session?.json.id === '640348450' ? (
                <h5>
                    id: {post?.id} |{' '}
                    <Link to={'/blog/admin/edit/' + post.id} prefetch="intent">
                        edit post
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
