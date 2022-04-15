import { Container, Image } from "@mantine/core";
import { LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

interface sessionType {
    provider: string,
    json: {
        id: string,
        login: string,
        display_name: string,
        type: string,
        broadcaster_type: string,
        description: string,
        profile_image_url: string,
        offline_image_url: string,
        view_count: number,
        created_at: number
    }
}

export let loader: LoaderFunction = async ({ request }) => {
	const session: sessionType = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	});

    return session
};

export default function BlogItem() {
  const session  = useLoaderData()

  if (!session) {
      redirect('/login')
  }
    
  return (
    <Container>
        {session.json.id === "640348450" ? 

            <div>
                <h1>{session.json.display_name}</h1>
            </div> 
   
        : 
        
            <div>
                <h1>nooo i don't think so {session.json.display_name}</h1>
                <Image src='https://cdn.7tv.app/emote/61e0ca344f44b95f34661d5d/4x' />
            </div>
        }

    </Container>
  );
}
