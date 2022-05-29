import { TextInput } from "@mantine/core";
import { ActionFunction } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { createComment } from "~/services/comments.server";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
  
    const content = formData.get("content") as string

    const project: any = {
        content
    }

    const comment = await createComment(project)

    console.log(comment)
};

export default function createCommentTestPage() {
  return (
    <>
        <Form method="post">
            <p>
                <label>
                Content:{" "}
                <TextInput
                    type="text"
                    name="title"
                />
                </label>
            </p>
        </Form>
    </>
  );
}
