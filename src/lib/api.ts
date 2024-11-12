import { XRPCResponse } from "@atcute/client";
import {
  AppBskyFeedPost,
  type ComAtprotoRepoListRecords,
} from "@atcute/client/lexicons";

import { atproto } from "./atproto";
import { MY_DID } from "./config";

export async function getPosts() {
  let allPosts: ComAtprotoRepoListRecords.Record[] = [];
  let cursor;

  do {
    const page: XRPCResponse<ComAtprotoRepoListRecords.Output> =
      await atproto.get("com.atproto.repo.listRecords", {
        params: {
          repo: MY_DID,
          collection: "app.bsky.feed.post",
          cursor,
          limit: 10,
        },
      });

    allPosts = [...allPosts, ...page.data.records];
    cursor = page.data.cursor;
  } while (cursor);

  return allPosts as (ComAtprotoRepoListRecords.Record & {
    value: AppBskyFeedPost.Record;
  })[];
}
