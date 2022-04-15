import { Container } from "@mantine/core";
import { PrismaClient } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { PostHeader } from "components/PostHeader";
import { marked } from "marked";


interface params {
  params: {
    id: string;
  };
}

export const loader = async ({ params }: params) => {
  const prisma = new PrismaClient();

  const post = await prisma.posts.findFirst({
    where: {
      slug: params.id
    }
  });


  const html = marked(post?.markdown.trim() ?? "");

  return {post, html};
};

export default function BlogItem() {
  const { post, html } = useLoaderData()
  
  return (
    <Container>
      <PostHeader {...post} />
      
      <hr />

      <div dangerouslySetInnerHTML={{ __html: html }} />

    </Container>
  );
}
