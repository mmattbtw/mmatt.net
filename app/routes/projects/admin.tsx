import { Container, Image } from "@mantine/core";
import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { sessionType } from "~/types/typings";

export let loader: LoaderFunction = async ({ request }) => {
	const session: sessionType = await authenticator.isAuthenticated(request, {
		failureRedirect: '/login',
	});

    if (!session) {
        redirect('/login')
    }

    return session
};

export default function AdminPageProject() {
  const session  = useLoaderData()

  return (
    <Container>
        {session.json.id === "640348450" ? 

            <div>
                <h1>admin page:</h1>
                <Link to='createproject' prefetch="intent">
                    <h4>create project</h4>
                </Link>
                <Link to='updateproject' prefetch="intent">
                    <h4>update project</h4>
                </Link>
                <Link to='deleteproject' prefetch="intent">
                    <h4>delete project</h4>
                </Link>

                <Outlet />
            </div> 
   
        : 
        
            <div>
                <h1>nooo i don't think so {session.json.display_name}</h1>
                <Image src='https://cdn.7tv.app/emote/61e0ca344f44b95f34661d5d/4x' />
            </div>
        }
    </Container>
  )
}
