import { Container } from "@mantine/core";
import NftPwner from "components/NftPwner";
import { useMoralis } from "react-moralis";

export default function DevicesPage() {
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated) { return (
      <Container>
        <h1>/projects</h1>
      </Container>
    );
  } else {
      return <NftPwner />
    }
  }
  