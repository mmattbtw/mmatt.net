import { Container, Grid } from "@mantine/core";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ArticleCardImage, ArticleCardImageProps } from "~/components/BlogPreview";
import { authenticator } from "~/services/auth.server";
import { getPosts } from "~/services/post.server";

const globalAny: any = global;
let cached: any = globalAny.POSTS_DATA

export let loader: LoaderFunction = async ({ request }) => {  
  let session = await authenticator.isAuthenticated(request);

  if (!session) {
    session = null
  }

  if (cached) {
    return {
      allPosts: cached,
      session
    }
  } else {
    const allPosts = await getPosts();

    return {allPosts, session}
  }
}

export const meta: MetaFunction = () => {
  return {
    title: "/blog - mmatt.net",
    description: "mmatt.net/blog - posts about all sorts of things.",
  };
}

export default function BlogPage() {
  const {allPosts, session} = useLoaderData()

  const postsExist = allPosts.length > 0

  return (
    <Container>
      <h1>/blog</h1>
      {session?.json.id === "640348450" ? 
        <Link to={"admin"} prefetch="intent">
          <h4>
            admin page
          </h4>
        </Link>
      :
        ""
      }
      {
        postsExist ? 
        <Grid>
          {
            allPosts.map((post: ArticleCardImageProps) => (
              <Grid.Col key={post.id}>
                <ArticleCardImage key={post.slug} {...post} />
              </Grid.Col>
            ))
          }
        </Grid>
        :
        <>
          <h2>no posts found!</h2>
        </>
      }

   </Container>
  )
}
