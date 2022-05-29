import { Button, Container, TextInput } from "@mantine/core";
import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { createComment } from "~/services/comments.server";
import { sessionType } from "~/types/typings";

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const session: sessionType = await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    })

    if (!session) {
        redirect("/login")
    }

    console.log(session.json.id)
  
    const content = formData.get("content") as string

    const project: any = {
        content,
        parentPostId: "1",
        userId: session.json.id
    }

    const comment = await createComment(project)

    console.log(comment)
};

export default function createCommentTestPage() {
  return (
    <Container>
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
            <p className="text-right">
                <Button
                type="submit"
                >
                Create Post
                </Button>
            </p>
        </Form>
    </Container>
  );
}
