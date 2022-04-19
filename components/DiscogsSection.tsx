import { Button, Collapse, Grid, Image } from "@mantine/core";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";


interface discogsReturn {
    collectionValue: {
      minimum: string,
      median: string,
      maximum: string,
    } | null,
    collectionData: any
}

// const globalAny: any = global;

// let cached: discogsReturn = globalAny.DISCOGS_DATA

export async function loader() {
// if (cached) {
//     return cached
// } else {
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

      console.log(collectionValueData)
      console.log(collectionDataData)

      // cached = globalAny.DISCOGS_DATA = {
      //   collectionValue: collectionValueData,
      //   collectionData: collectionDataData
      // }

      return {
        collectionValue: collectionValueData,
        collectionData: collectionDataData
      } as discogsReturn
  } catch(FetchError) {
      return {
        collectionValue: null,
        collectionData: null
      } as discogsReturn
    }
  }
// }

export default function DisocgsSection() {
  const { collectionValue, collectionData} : discogsReturn = useLoaderData()
  const [opened, setOpen] = useState(false);

	return (
    <>
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
    </>
	)
}
