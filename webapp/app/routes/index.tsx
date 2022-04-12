import { Container } from "@mantine/core";
import { Link } from "@remix-run/react";

export default function Index() {
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
        </ul>
      </Container>
    </>
  );
}
