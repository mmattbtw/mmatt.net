import { Container } from "@mantine/core";
import { PrismaClient } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import md from 'markdown-it';

const prisma = new PrismaClient();

interface params {
    params: {
        id: string;
    };
}

export const loader = async ({ params }: params) => {
  await prisma.$connect();

  const post = await prisma.posts.findFirst({
    where: {
      slug: params.id
    }
  });

  await prisma.$disconnect();

  return post  
};

export default function BlogItem() {
    const { title, markdown, category } = useLoaderData()

  return (
    <Container>
      <h1>{title}</h1>
      <h3>{category}</h3>
      
      <hr />

      <div dangerouslySetInnerHTML={{ __html: md().render(markdown) }} />

    </Container>
  );
}
