import { Button, Textarea, TextInput } from "@mantine/core";
import { ActionFunction, redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { updatePost } from "~/services/post.server";


type ActionData =
  | {
        category: string
        imageUrl: string
        markdown: string
        slug: string
        title: string
        id: string
    }
  | undefined;

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
  
    const title = formData.get("title") as string
    const category = formData.get("category") as string
    const imageUrl = formData.get("imageUrl") as string
    const slug = formData.get("slug") as string
    const markdown = formData.get("markdown") as string
    const id = formData.get("id") as string

    const post: ActionData = {
        category,
        imageUrl,
        markdown,
        slug,
        title,
        id
    }

    await updatePost(id, post)
    
    return redirect("/blog/" + slug);
  };

export default function updatePostPage() {
  return (
    <>
        <Form method="post">
            <p>
                <label>
                ID of post to udpate:{" "}
                <TextInput
                    type="text"
                    name="id"
                />
                </label>
            </p>
            <p>
                <label>
                Updated Post Title:{" "}
                <TextInput
                    type="text"
                    name="title"
                />
                </label>
            </p>
            <p>
                <label>
                Updated Post Category:{" "}
                <TextInput
                    type="text"
                    name="category"
                />
                </label>
            </p>
            <p>
                <label>
                 UpdatedPost Image:{" "}
                <TextInput
                    type="text"
                    name="imageUrl"
                />
                </label>
            </p>
            <p>
                <label>
                Updated Post Slug:{" "}
                <TextInput
                    type="text"
                    name="slug"
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
                Update Post
                </Button>
            </p>
        </Form>
    </>
  );
}
