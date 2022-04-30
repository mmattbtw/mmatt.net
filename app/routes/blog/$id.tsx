import { Container } from "@mantine/core";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NftPwner from "components/NftPwner";
import { PostHeader } from "components/PostHeader";
import { marked } from "marked";
import { useMoralis } from "react-moralis";
import { authenticator } from "~/services/auth.server";
import { getPost, posts } from "~/services/post.server";

type loaderData = {
  post: posts;
  session: any | null;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const post = await getPost(params.id || "")

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
  };
};

export default function BlogItem() {
  const {post, session} = useLoaderData() as loaderData;
  const { isAuthenticated } = useMoralis();
  
  const html = marked(post?.markdown.trim() ?? "");

  if (!isAuthenticated) { return (
    <Container>
      <PostHeader {...post} />
      
      {
        session?.json.id === "640348450" ?
          <h5>id: {post?.id}</h5>
        :
          ""
      }

      <hr />

      <div dangerouslySetInnerHTML={{ __html: html }} />

    </Container>
  ); } else {
    return <NftPwner />
  }
}
