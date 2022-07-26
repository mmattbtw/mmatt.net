import { json } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { ArticleCardImageAdminPage } from '~/components/BlogPreview';
import { getPosts } from '~/services/post.server';

export async function loader() {
    const posts = await getPosts();
    return json({ posts });
}

export default function updatePostPage() {
    const { posts } = useLoaderData<typeof loader>();

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
