import { Container } from "@mantine/core";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PostHeader } from "components/PostHeader";
import { marked } from "marked";
import { authenticator } from "~/services/auth.server";
import { getPost } from "~/services/post.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  const post = await getPost(params.id || "")

  let session = await authenticator.isAuthenticated(request);

  if (!session) {
    session = null
  }
  
  return {post, session};
};

export default function BlogItem() {
  const {post, session} = useLoaderData()
  
  const html = marked(post?.markdown.trim() ?? "");

  return (
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
  );
}
