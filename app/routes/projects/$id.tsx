import { Container } from "@mantine/core";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import NftPwner from "components/NftPwner";
import { useMoralis } from "react-moralis";

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
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated) { return (
      <Container>
        <h1>{id}</h1>
      </Container>
    );
  } else {
    return <NftPwner />
  }
}
