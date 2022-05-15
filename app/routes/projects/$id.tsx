import { Container } from "@mantine/core";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PostHeader } from "components/PostHeader";
import { ProjectHeader } from "components/ProjectHeader";
import { marked } from "marked";
import { authenticator } from "~/services/auth.server";
import { getProject, projects } from "~/services/projects.server";

type loaderData = {
  project: projects;
  session: any | null;
}

export const loader: LoaderFunction = async ({ params, request }) => {
  const project = await getProject(params.id || "")

  let session = await authenticator.isAuthenticated(request);

  if (!session) {
    session = null
  }
  
  return { project, session } as unknown as loaderData;
};

export const meta: MetaFunction = ({ data, params }) => {
  if (!data) {
    return {
      title: "Unknown Project - mmatt.net",
      description: `There is no project with the ID of ${params.id}.`,
    };
  }

  const { project } = data as loaderData;
  return {
    description: `${project.title} - ${project.CreatedAt}`,
    title: `${project.title} - mmatt.net`,
    'twitter:title': `${project.title} - mmatt.net`,
    'twitter:image': project.imageUrl,
    'twitter:description': `${project.title} - ${project.CreatedAt}`,
    'og:image': project.imageUrl,
  };
};


export default function ProjectPage() {
  const { project, session } = useLoaderData() as loaderData
  
  const html = marked(project?.markdown.trim() ?? "");

  return (
    <Container>
      <ProjectHeader {...project} />
      
      {
        session?.json.id === "640348450" ?
          <h5>id: {project?.id}</h5>
        :
          ""
      }

      <hr />

      <div dangerouslySetInnerHTML={{ __html: html }} />

    </Container>
  )
}
