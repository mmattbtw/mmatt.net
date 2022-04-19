import { Container, Image } from "@mantine/core";
import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import NftPwner from "~/components/NftPwner";
import { useMoralis } from "react-moralis";
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

export default function AdminPageBlog() {
  const session  = useLoaderData()
  const { isAuthenticated } = useMoralis();

  if (!isAuthenticated) { return (
    <Container>
        {session.json.id === "640348450" ? 

            <div>
                <h1>admin page:</h1>
                <Link to='createpost' prefetch="intent">
                    <h4>create post</h4>
                </Link>
                <Link to='updatepost' prefetch="intent">
                    <h4>update post</h4>
                </Link>
                <Link to='deletepost' prefetch="intent">
                    <h4>delete post</h4>
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
  );} else {
    return <NftPwner />
  }
}
