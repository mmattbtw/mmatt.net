import { Grid } from '@mantine/core';
import { LoaderFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ArticleCardImageAdminPage } from '~/components/BlogPreview';
import { getPosts, posts } from '~/services/post.server';

type loaderData = {
    posts: posts[];
};

export const loader: LoaderFunction = async () => {
    const posts = await getPosts();

    return { posts } as loaderData;
};

export default function updatePostPage() {
    const { posts } = useLoaderData() as loaderData;

    return (
        <>
            <Grid>
                {posts.map((post) => {
                    return (
                        <Link
                            to={'/blog/admin/edit/' + post.id}
                            prefetch="intent"
                            style={{
                                textDecoration: 'none',
                            }}
                        >
                            <Grid.Col key={post.id}>
                                <ArticleCardImageAdminPage key={post.slug} {...post} />
                            </Grid.Col>
                        </Link>
                    );
                })}
            </Grid>
        </>
    );
}
