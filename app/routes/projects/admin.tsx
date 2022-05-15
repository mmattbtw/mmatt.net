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
                <h4>
                    <Link to='createproject' prefetch="intent">
                        create project
                    </Link>{' '}
                    <Link to='updateproject' prefetch="intent">
                        update project
                    </Link>{' '}
                    <Link to='deleteproject' prefetch="intent">
                        delete project
                    </Link>
                </h4>

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
