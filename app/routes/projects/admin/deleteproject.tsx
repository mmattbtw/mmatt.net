import { Button, TextInput } from "@mantine/core";
import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { deleteProject } from "~/services/projects.server";


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    const id = formData.get("id") as string
    await deleteProject(id)
    
    return redirect("/projects");
  };

export default function deleteProjectPage() {
  return (
    <>
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
