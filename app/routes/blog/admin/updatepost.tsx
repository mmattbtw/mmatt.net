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
            {posts.map((post) => {
                return (
                    <Link
                        to={'/blog/admin/edit/' + post.id}
                        prefetch="intent"
                        style={{
                            textDecoration: 'none',
                        }}
                        key={post.id}
                    >
                        <br />
                        <ArticleCardImageAdminPage key={post.slug} {...post} />
                    </Link>
                );
            })}
        </>
    );
}
