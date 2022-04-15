import { Button, TextInput } from "@mantine/core";
import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { deletePost } from "~/services/post.server";


export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();

    const id = formData.get("id") as string
    await deletePost(id)
    
    return redirect("/blog");
  };

export default function BlogItem() {
  return (
    <>
        <Form method="post">
            <p>
                <label>
                Post ID:{" "}
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
                Create Post
                </Button>
            </p>
        </Form>
    </>
  );
}
