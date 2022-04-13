import { Button, Collapse, Container } from '@mantine/core';
import { fetch } from '@remix-run/node';
import { Link, useLoaderData } from "@remix-run/react";
import { useState } from "react";

interface discogsReturn {
  collectionValue: {
    minimum: string,
    median: string,
    maximum: string,
  },
  collectionData: any
}

const discogsHeaders = {
  "Authorization": `Discogs token=${process.env.DISCOGS_TOKEN}`
}

export async function loader() {
  let [collectionValue, collectionData] = await Promise.all([
    fetch("https://api.discogs.com/users/mmattbtw/collection/value", { headers: discogsHeaders }),
    fetch("https://api.discogs.com/users/mmattbtw/collection/folders/0/releases", { headers: discogsHeaders })
  ])  

  const collectionValueData = await collectionValue.json()
  const collectionDataData = await collectionData.json()
  return {
    collectionValue: collectionValueData,
    collectionData: collectionDataData
  } as discogsReturn
}

export default function Index() {
  const { collectionValue, collectionData }: discogsReturn = useLoaderData()
  const [opened, setOpen] = useState(false);

  return (
    <>
      <Container>
        <h1>/home</h1>

        <h2>support these links below</h2>
        <ul>
          <li><a href={"https://blacklivesmatters.carrd.co/"}>black lives matter</a></li>
          <li><a href={"https://anti-asianviolenceresources.carrd.co/"}>stop aapi hate</a></li>
        </ul>

        <h2>about me</h2>
        <p>
          i sometimes stream video games (and programming) on my <a href="https://twitch.tv/mmattbtw">twitch</a>.
        </p>
        <p>
          my main programming project right now is <a href='https://github.com/mmattDonk/ai-tts-donations'>AI TTS Donations</a>
        </p>
        <p>
          you can learn more about my other projects over at <Link to={"/projects"} prefetch={"intent"}>/projects</Link>
        </p>
        
        <p>
          i enjoy collecting vinyl records, and i enjoy listening to music, in the next section, you will see some of the artists i like to listen to!
        </p>

        <h2>music</h2>
        <h3>
          i like to listen to:
        </h3>

        <ul>
          <li>tyler, the creator</li>
          <li>porter robinson / virtual self</li>
          <li>madeon</li>
          <li>kanye west</li>
          <li>100 gecs</li>
          <li>food hosue</li>
          <li>kero kero bonito</li>
          <li>fraxiom</li>
          <li>kid cudi</li>
          <li>charli xcx</li>
          <li>daft punk</li>
          <li>magdalena bay</li>
          <li>baby keem</li>
          <li>death grips</li>
          <li><a href="https://last.fm/user/mmattbtw">and way way more</a></li>
        </ul>
        <p>i like to regularly expand my music taste, so if you have any suggestions, let me know!</p>

        <h3>
          required listening
        </h3>
        <p>
          these songs are too good to pass up on.
        </p>

        <ul>
          <li><a href="https://www.youtube.com/watch?v=ZG6zsHUCum4">lil b - im god</a> <a href='https://www.youtube.com/watch?v=yTC8ECjQBp8'>(the live version goes too)</a></li>
          <li><a href='https://www.youtube.com/watch?v=WunyRgaA_ws'>virtual self- god rays</a> (required watching too, the visuals/lights on this track is insane and i want to see it live one day)</li>
          <li><a href='https://open.spotify.com/track/432hUIl3ISDeytYW5XBQ5h?si=525a126aee36406d'>kanye west - wolves</a> (this song made me buy better headphones after listening to this song for the first time on some good headphones)</li>
          <li><a href='https://www.youtube.com/watch?v=DlSIznmujYM'>sweet trip - pro: lov: ad</a></li>
          <li><a href='https://www.youtube.com/watch?v=AC8h4HnWyys'>SOPHIE - OIL OF EVERY PEARL'S UN-INSIDES</a> (i know this is an album, but its worth it, listen to it <a href='https://cdn.7tv.app/emote/61e14854950a8915e1708862/4x'>NOW</a>)</li>
          <li><a href='https://www.youtube.com/watch?v=FQPXX_eZZAk'>magdalena bay - you lose!</a></li>
          <li><a href='https://www.youtube.com/watch?v=TbJE-KVZvTA'>charli xcx - forever</a></li>
          <li><a href='https://www.youtube.com/playlist?list=PLzoqV_VvWIwGzYTcm3r1JwqgQOBXTvKyd'>frank ocean - blonde</a></li>
          <li><a href='https://www.youtube.com/watch?v=LcSZURoLbis'>a$ap rocky - lvl</a></li>
        </ul>

        <h3>
          my vinyl record collection
        </h3>
        <p>
          i own quite a bit of vinyl records, and i add things to my collection all the time. according to <a href='https://www.discogs.com/user/mmattbtw'>discogs</a> i have a median collection value of {collectionValue.median}
        </p>

        <Button onClick={() => setOpen((o) => !o)} size="xs" variant="light">
          Show Collection:
        </Button>

        <Collapse in={opened}>
        <ul>
        {collectionData.releases.map((release: any) => {
          return(
            <li key={release.basic_information.id}>
                <p key={release.basic_information.id}>{release.basic_information.artists[0].name} - {release.basic_information.title}</p>
            </li>
          )
        })}
        </ul>
        </Collapse>

      </Container>
    </>
  );
}
