import { Container, Grid } from "@mantine/core";
import { LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { ArticleCardImage, ArticleCardImageProps } from "components/BlogPreview";
import NftPwner from "components/NftPwner";
import { useMoralis } from "react-moralis";
import { authenticator } from "~/services/auth.server";
import { getProjects } from "~/services/projects.server";

const globalAny: any = global;
let cached: any = globalAny.PROJECTS_DATA

export let loader: LoaderFunction = async ({ request }) => {  
  let session = await authenticator.isAuthenticated(request);

  if (!session) {
    session = null
  }

  if (cached) {
    return {
      allProjects: cached,
      session
    }
  } else {
    const allProjects = await getProjects();

    return {allProjects, session}
  }
}

export default function ProjectsPage() {
  const {allProjects, session} = useLoaderData()
	const { isAuthenticated } = useMoralis();

  const projectsExist = allProjects.length > 0

  if (!isAuthenticated) { return (
    <Container>
      <h1>/projects</h1>
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
        projectsExist ?
        <Grid>
          {
            allProjects.map((post: ArticleCardImageProps) => (
              <Grid.Col key={post.id}>
                <ArticleCardImage key={post.slug} {...post} />
              </Grid.Col>
            ))
          }
        </Grid>
        :
        <h2>no projects found!</h2>
      }

    </Container>
  );} else {
    return <NftPwner />
  }
}
