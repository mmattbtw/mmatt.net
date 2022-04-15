import { Container, Grid } from "@mantine/core";
import { PrismaClient } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { ArticleCardImage, ArticleCardImageProps } from "components/BlogPreview";

const prisma = new PrismaClient()

export async function loader() {
  await prisma.$connect()

  const allPosts = await prisma.posts.findMany()
  prisma.$disconnect()

  return allPosts
}

export default function BlogPage() {
  const blogPosts = useLoaderData()

  return (
    <Container>
      <h1>/blog</h1>
      <Grid>
      {
        blogPosts.map((post: ArticleCardImageProps) => (
          <Grid.Col key={post.id}>
            <ArticleCardImage key={post.slug} {...post} />
          </Grid.Col>
        ))
      }
      </Grid>
    </Container>
  );
}
