import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

interface params {
    params: {
        id: string;
    };
}

export const loader = async ({ params }: params) => {
    return json({ id: params.id });
  };

export default function BlogItem() {
    const { id } = useLoaderData()

  return (
    <>
      <h1>{id}</h1>
    </>
  );
}
