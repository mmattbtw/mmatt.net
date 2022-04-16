import { Button, Textarea, TextInput } from "@mantine/core";
import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { updateProject } from "~/services/projects.server";
import { FormActionDataProjects } from "~/types/typings";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
  
    const title = formData.get("title") as string
    const category = formData.get("category") as string
    const imageUrl = formData.get("imageUrl") as string
    const slug = formData.get("slug") as string
    const markdown = formData.get("markdown") as string
    const id = formData.get("id") as string
    const status = formData.get("status") as string

    const project: FormActionDataProjects = {
        category,
        imageUrl,
        markdown,
        slug,
        title,
        id,
        status
    }

    await updateProject(id, project)
    
    return redirect("/projects/" + slug);
  };

export default function updateProjectPage() {
  return (
    <>
        <Form method="post">
            <p>
                <label>
                ID of project to udpate:{" "}
                <TextInput
                    type="text"
                    name="id"
                />
                </label>
            </p>
            <p>
                <label>
                Updated Project Title:{" "}
                <TextInput
                    type="text"
                    name="title"
                />
                </label>
            </p>
            <p>
                <label>
                Updated Project Category:{" "}
                <TextInput
                    type="text"
                    name="category"
                />
                </label>
            </p>
            <p>
                <label>
                 Updated Project Image:{" "}
                <TextInput
                    type="text"
                    name="imageUrl"
                />
                </label>
            </p>
            <p>
                <label>
                Updated Project Slug:{" "}
                <TextInput
                    type="text"
                    name="slug"
                />
                </label>
            </p>
            <p>
                <label>
                Updated Project Status:{" "}
                <TextInput
                    type="text"
                    name="status"
                />
                </label>
            </p>
            <p>
                <label htmlFor="markdown">Updated Markdown:</label>
                <br />
                <Textarea
                id="markdown"
                rows={20}
                name="markdown"
                autosize
                />
            </p>
            <p className="text-right">
                <Button
                type="submit"
                >
                Update Project
                </Button>
            </p>
        </Form>
    </>
  );
}
