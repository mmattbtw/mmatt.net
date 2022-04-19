import { Container } from "@mantine/core";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NftPwner from "~/components/NftPwner";
import { PostHeader } from "~/components/PostHeader";
import { marked } from "marked";
import { useMoralis } from "react-moralis";
import { authenticator } from "~/services/auth.server";
import { getProject } from "~/services/projects.server";

export const loader: LoaderFunction = async ({ params, request }) => {
  const post = await getProject(params.id || "")

  let session = await authenticator.isAuthenticated(request);

  if (!session) {
    session = null
  }
  
  return {post, session};
};

export default function ProjectPage() {
  const {post, session} = useLoaderData()
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
