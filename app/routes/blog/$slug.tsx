import { Avatar, Button, Container, Textarea } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { ActionArgs, json, LoaderArgs, MetaFunction, redirect } from '@remix-run/node';
import { Form, Link, useLoaderData } from '@remix-run/react';
import { marked } from 'marked';
import Comment from '~/components/Comment';
import PrettyDate from '~/components/DateFunction';
import { PostHeader } from '~/components/PostHeader';
import { authenticator } from '~/services/auth.server';
import { comments, createComment, getCommentsViaParentId } from '~/services/comments.server';
import { getPostViaSlug, posts } from '~/services/post.server';

type loaderData = {
    post: posts;
    session: any | null;
    comments: comments[];
};

export async function loader({ params, request }: LoaderArgs) {
    let [post, session] = await Promise.all([getPostViaSlug(params.slug || ''), authenticator.isAuthenticated(request)]);
    const comments = await getCommentsViaParentId(post?.id || '');

    if (!session) {
        session = null;
    }

    return json({ post, session, comments });
}

export async function action({ request, params }: ActionArgs) {
    const formData = await request.formData();

    const content = formData.get('comment') as string;
    if (content === '' || content === null) {
        return redirect('/blog/' + params.slug);
    }

    const session = await authenticator.isAuthenticated(request);
    if (!session) {
        return redirect('/login');
    }

    const parentPost = await getPostViaSlug(params.slug || '');

    const parentPostId = parentPost?.id || '';
    const userId = session.json.id || '';

    const commentData = {
        parentPostId,
        userId,
        content,
    };

    await createComment(commentData);

    return null;
}

export const meta: MetaFunction = ({ data, params }) => {
    if (!data) {
        return {
            title: 'Unknown Post - mmatt.net',
            description: `There is no post with the slug of ${params.slug}.`,
        };
    }

    const { post } = data as loaderData;
    return {
        description: `${post.title} - ${PrettyDate(post.CreatedAt)}`,
        title: `${post.title} - mmatt.net`,
        'twitter:title': `${post.title} - mmatt.net`,
        'twitter:image': post.imageUrl,
        'twitter:description': `${post.title} - ${PrettyDate(post.CreatedAt)}`,
        'og:image': post.imageUrl,
        'og:title': `${post.title} - mmatt.net`,
        'og:description': `${post.title} - ${PrettyDate(post.CreatedAt)}`,
        'og:url': `https://mmatt.net/blog/${params.slug}`,
    };
};

export default function BlogItem() {
    const { post, session, comments } = useLoaderData<typeof loader>();

    const html = marked(post?.markdown.trim() ?? '');

    if (!post) {
        return (
            <Container>
                <h1>Unknown Post</h1>
            </Container>
        );
    }

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
                        {/* @ts-ignore user createdat posts are 1000% Date types. */}
                        <Comment key={comment.id} {...comment} />
                    </>
                ))
            ) : (
                <p>No comments yet.</p>
            )}
        </Container>
    );
}
