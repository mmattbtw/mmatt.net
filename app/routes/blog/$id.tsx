import { Container } from "@mantine/core";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { PostHeader } from "components/PostHeader";
import { marked } from "marked";
import { authenticator } from "~/services/auth.server";
import { getPostViaSlug, posts } from "~/services/post.server";

type loaderData = {
  post: posts;
  session: any | null;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const post = await getPostViaSlug(params.id || "")

  let session = await authenticator.isAuthenticated(request);

  if (!session) {
    session = null
  }
  
  return { post, session } as loaderData;
};

export const meta: MetaFunction = ({ data, params }) => {
  if (!data) {
    return {
      title: "Unknown Post - mmatt.net",
      description: `There is no post with the ID of ${params.id}.`,
    };
  }

  const { post } = data as loaderData;
  return {
    description: `${post.title} - ${post.CreatedAt}`,
    title: `${post.title} - mmatt.net`,
    'twitter:title': `${post.title} - mmatt.net`,
    'twitter:image': post.imageUrl,
    'twitter:description': `${post.title} - ${post.CreatedAt}`,
    'og:image': post.imageUrl,
  };
};

export default function BlogItem() {
  const {post, session} = useLoaderData() as loaderData;
  
  const html = marked(post?.markdown.trim() ?? "");

  return (
    <Container>
      <PostHeader {...post} />
      
      {
        session?.json.id === "640348450" ?
          <h5>id: {post?.id} |{' '}
          <Link 
            to={"/blog/admin/edit/" + post.id} 
            prefetch='intent'
          >edit post</Link></h5>
        :
          ""
      }

      <hr />

      <div dangerouslySetInnerHTML={{ __html: html }} />

    </Container>
  )
}
