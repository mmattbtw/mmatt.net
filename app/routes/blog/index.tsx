import { Container, Grid } from "@mantine/core";
import { PrismaClient } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ArticleCardImage, ArticleCardImageProps } from "components/BlogPreview";
import { authenticator } from "~/services/auth.server";


export let loader: LoaderFunction = async ({ request }) => {
  const prisma = new PrismaClient()
  
  let session = await authenticator.isAuthenticated(request);

  if (!session) {
    session = null
  }

  const allPosts = await prisma.posts.findMany()

  return {allPosts, session}
}

export default function BlogPage() {
  const {allPosts, session} = useLoaderData()

  return (
    <Container>
      <h1>/blog</h1>
      {session?.json.id === "640348450" ? 
        <Link to={"admin"} prefetch="intent">
          <h4>
            Admin Page
          </h4>
        </Link>
      :
        ""
      }
      <Grid>
      {
        allPosts.map((post: ArticleCardImageProps) => (
          <Grid.Col key={post.id}>
            <ArticleCardImage key={post.slug} {...post} />
          </Grid.Col>
        ))
      }
      </Grid>
    </Container>
  );
}
