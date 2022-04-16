import { Button, Collapse, Container, Grid, Image } from '@mantine/core';
import { Link, useLoaderData } from "@remix-run/react";
import NftPwner from 'components/NftPwner';
import { useState } from "react";
import { useMoralis } from 'react-moralis';

interface discogsReturn {
  collectionValue: {
    minimum: string,
    median: string,
    maximum: string,
  } | null,
  collectionData: any
}


const globalAny: any = global;

let cached: discogsReturn = globalAny.DISCOGS_DATA

export async function loader() {
  if (cached) {
    return cached
  } else {
    const discogsHeaders = {
      "Authorization": `Discogs token=${process.env.DISCOGS_TOKEN}`
    }

    try {
        let [collectionValue, collectionData] = await Promise.all([
          fetch("https://api.discogs.com/users/mmattbtw/collection/value", { headers: discogsHeaders, cache: "force-cache" }),
          fetch("https://api.discogs.com/users/mmattbtw/collection/folders/0/releases?sort=added&sort_order=asc", { headers: discogsHeaders, cache: "force-cache" })
        ])

        const collectionValueData = await collectionValue.json()
        const collectionDataData = await collectionData.json()

        cached = globalAny.DISCOGS_DATA = {
          collectionValue: collectionValueData,
          collectionData: collectionDataData
        }

        return {
          collectionValue: collectionValueData,
          collectionData: collectionDataData
        } as discogsReturn
    }
    catch(FetchError) {
      return {
        collectionValue: null,
        collectionData: null
      } as discogsReturn
    }
  }
}

export default function Index() {
  const { collectionValue, collectionData }: discogsReturn = useLoaderData()
  const [opened, setOpen] = useState(false);
  const { authenticate, isAuthenticated } = useMoralis();

  if (!isAuthenticated) { return (
    <Container>
      <h1>/home</h1>

      <h2>support these links below</h2>
      <ul>
        <li><a href={"https://blacklivesmatters.carrd.co/"}>black lives matter</a></li>
        <li><a href={"https://anti-asianviolenceresources.carrd.co/"}>stop aapi hate</a></li>
      </ul>

      <h2>NFTs</h2>
      <p>
        because i LOVE NFTs, i have decided to make a part of my website locked to the REAL CRYPTO GODS. just click the button below to connect your MetaMask wallet :3
      </p>
      <Button onClick={() => {
                authenticate({ provider: "metamask" });
              }}>
        Connect MetaMask Wallet
      </Button>

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
        i own quite a bit of vinyl records, and i add things to my collection all the time. according to <a href='https://www.discogs.com/user/mmattbtw'>discogs</a> i have a median collection value of {collectionValue ? collectionValue.median : "???"}
      </p>

      {
      collectionData ? 
      <>
        <Button onClick={() => setOpen((o) => !o)} size="xs" variant="light">
          show collection (in order of when i added them to my collection):
        </Button>

        <Collapse in={opened}>
        <a href="https://www.discogs.com/user/mmattbtw/collection?header=1">
          <h4>view all information here!</h4>
        </a>
        <ul>
          {collectionData.releases.map((release: any) => {
            return(
              <li key={release.basic_information.id} style={{listStyleType: "none"}}>
                <Grid align="center">
                  <Grid.Col span={4}>
                    <Image src={release.basic_information.cover_image} height={100} fit={'contain'} alt={`picture of the album cover for ${release.basic_information.title}`} />
                  </Grid.Col>
                  <Grid.Col span={4}>
                    <p key={release.basic_information.id}>{release.basic_information.artists[0].name} - {release.basic_information.title} ({release.basic_information.formats[0].name}{release.basic_information.formats[0].text ? " - " + release.basic_information.formats[0].text : ""})</p>
                  </Grid.Col>
                </Grid>
              </li>
            )
          })}
        </ul>
        </Collapse>
      </>
      : ""}

      <h2>contact</h2>
      <p>
        formal contact can be done over <a href="https://mmatt.link/email">email</a>
      </p>
      <p>
        other contact can be done through <a href="https://discord.com/users/308000668181069824">discord</a> or <a href="https://twitter.com/mmattbtw">twitter</a>
      </p>

      <h2>support me</h2>
      <p>
        if you ever feel giving me massive amounts of money
      </p>
      <ul>
        <p>direct ways:</p>
        <li><a href="https://github.com/sponsors/mmattbtw">github sponsors</a></li>
        <li><a href="https://ko-fi.com/mmatt">ko-fi</a></li>
        <li><a href="https://patreon.com/mmattdonk">patreon subscription</a></li>
        <li><a href="https://twitch.tv/mmattbtw/subscribe">twitch subscription</a></li>
        <hr />
        <p>referal codes:</p>
        <li><a href="https://privacy.com/join/9X6CP">privacy.com - get $10 in privacy.com credit to use on anything</a></li>
        <li><a href="https://www.digitalocean.com/?refcode=3470e3b80f7c&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge">digitalocean - get $100 in digitalocean credit to use on digitalocean servers</a></li>
        <li><a href="https://www.epicgames.com/store/p/fortnite?epic_creator_id=0caf473a446a4837a448dce55f063ebc&epic_game_id=fortnite">epic games store (use code matt) - you can also use code matt in the fortnite item shop #EpicPartner</a></li>
      </ul>
      <p style={{fontStyle: 'italic'}}>All links above are affiliate links that help benefit me, I either get a kickback, or some other perks.</p>

      <h2>info about this site</h2>
      <p>
        this site was made using the wonderful <a href="https://remix.run">remix.js</a> and <a href="https://mantine.dev/">mantine</a>. it's hosted on vercel, and is open sourced here: <a href="https://github.com/mmattbtw/remix-mmatt.net">mmattbtw/remix-mmatt.net</a>.
      </p>
    </Container>
  );
} else {
  return <NftPwner />
}}
