import { Button, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { deleteProject, getProjects, projects } from "~/services/projects.server";


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    const id = formData.get("id") as string
    await deleteProject(id)
    
    return redirect("/projects");
};

type loaderType = {
    projects: projects[]
}

export const loader: LoaderFunction = async () => {
    const projects = await getProjects();

    return { projects } as loaderType
}

export default function deleteProjectPage() {
  const { projects } = useLoaderData() as loaderType;

  return (
    <>
      {
        projects.map(project => (
          <div key={project.id}>
            <a
              onClick={
                () => {
                  navigator.clipboard.writeText(project.id)
                  showNotification({
                    title: "Copied!",
                    message: "Copied post ID: `" + project.id + "` to your clipboard.",
                  })
                }
              }
              style={{
                textDecoration: 'none',
              }}
            >(id: {project.id}) {project.title}</a>
          </div>
        ))
      }
        <Form method="post">
            <p>
                <label>
                Project ID:{" "}
                <TextInput
                    type="text"
                    name="id"
                />
                </label>
            </p>
            <p className="text-right">
                <Button
                type="submit"
                >
                Delete Project
                </Button>
            </p>
        </Form>
    </>
  );
}
