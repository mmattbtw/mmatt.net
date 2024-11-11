import Project from "@/components/Project";
import { getPosts } from "@/lib/api";
import Image from "next/image";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main>
      <div className="max-w-xl ml-auto mr-auto mt-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">matt morris</h1>
            <h2 className="text-lg font-semibold underline">
              <a href="https://bsky.app/profile/did:plc:tas6hj2xjrqben5653v5kohk">
                @mmatt.net
              </a>
            </h2>
            <div className="flex flex-row gap-2">
              <a className="underline scroll-smooth" href="#projects">
                projects
              </a>{" "}
              -{" "}
              <a className="underline scroll-smooth" href="#posts">
                posts
              </a>
            </div>
          </div>

          <Image
            src="/matt.jpg"
            alt="stan from south park in a low quality picture from an xbox gamerpic"
            width={96}
            height={96}
            className="rounded-full w-24 h-24"
          />
        </div>

        <p>
          technologist trying to make{" "}
          <a className="underline" href="https://songish.app">
            📀 the best place for music.
          </a>
        </p>
        <br />
        <p>
          you can find my open source programming efforts at{" "}
          <a className="underline" href="https://github.com/mmattbtw">
            🧑‍💻 GitHub
          </a>
          , and everywhere else on the internet at my{" "}
          <a href="https://matt.omg.lol" className="underline">
            🩷 omg.lol profile page
          </a>
        </p>
        <br />
        <p>
          you can contact me at{" "}
          <a href="mailto:matt@mmatt.net" className="underline">
            ✉️ matt at mmatt.net
          </a>
          . don&apos;t try to contact me on instant messaging platforms (e.g.
          discord or bluesky) if I don&apos;t know you. cold emails are great!
        </p>
        <hr className="mt-5 mb-5" />

        <h2 className="font-bold text-2xl" id="projects">
          projects
        </h2>
        <p>
          various projects i&apos;ve started or contributed to on the{" "}
          <span title="not like the .NET framework, i just meant the internet">
            .net
          </span>
        </p>

        <br />

        <div className="flex flex-col gap-4">
          <Project
            {...{
              name: "Songish",
              byline:
                "🛠️ work in progress - ⚙️ next.js, typescript, t3 stack - 🧑‍💻 head technologist",
              date: "📅 Feb 2023 - Present",
              description: (
                <>
                  <p>
                    practically my life&apos;s work... in progress. its the best
                    place for music. music discussion, music discoverability,
                    music events, music purchasing, music listening. it is what
                    I want to do for the rest of my life, for real. every time I
                    get to &quot;work&quot; a Songish event, when it comes to
                    organizing and promoting, it is some of the most fun I have.
                    and also seeing my ideas go from visions to products that I
                    have implemented is incredible.
                  </p>
                  <br />
                  <p>
                    rant aside, this is all still{" "}
                    <a
                      href="https://song.link/i/1484224395"
                      className="underline"
                    >
                      🎵 coming soon, coming soon
                    </a>
                  </p>
                </>
              ),
              link: "https://songish.app?via=mmatt.net",
            }}
          />

          <Project
            {...{
              name: "AI TTS Donations (Solrock)",
              byline:
                "🗃️ archived - ⚙️ next.js, typescript, python, open source - 🧑‍💻 maintainer",
              date: "📅 Oct 2021 - Oct 2023",
              description: (
                <>
                  <p>
                    AI TTS Donations (Solrock) was the first free and open
                    source AI TTS (text to speach) program for Twitch donations.
                    This was made because other solutions were private or were
                    very pricy. AI TTS Donations included sound effects, voice
                    effects, and thousands of voices using the Uberduck and
                    FakeYou APIs.
                  </p>
                  <br />
                  <p>
                    Project shutdown in October of 2023 due to rising costs with
                    limited budget. Sold redirection rights of the subdomain
                    &quot;solrock.mmattdonk.com&quot; to TTS.Monster, another
                    Twitch TTS service.
                  </p>
                </>
              ),
              link: "https://github.com/mmattdonk/ai-tts-donations?via=mmatt.net",
            }}
          />
        </div>
        <hr className="mt-5 mb-5" />

        <h2 className="font-bold text-2xl" id="posts">
          posts
        </h2>
        <p>
          these are the blog posts on my website hosted on the ATProtocol, an
          open protocol for building social apps.
        </p>
        <br />
        <p>
          you can learn more about the ATProtocol on their{" "}
          <a href="https://atproto.com" className="underline">
            🧑‍💻 website
          </a>
          , and you can view the blog posts on my ATProto profile with{" "}
          <a
            href="https://pdsls.dev/at/did:plc:tas6hj2xjrqben5653v5kohk"
            className="underline"
          >
            📃 PDSls
          </a>{" "}
          under{" "}
          <span className="font-mono bg-gray-100 dark:bg-gray-900 p-1 rounded-md outline outline-[0.5px]">
            net.mmatt.blog.post
          </span>
        </p>
        <br />
        {posts.flatMap((post) => (
          <div key={post.uri}>{post.value.text}</div>
        ))}
      </div>
    </main>
  );
}
