import type { APIRoute } from "astro";

export const get: APIRoute = async function get() {
  return {
    body: JSON.stringify({
      subject: "acct:matt@social.lol",
      aliases: ["https://social.lol/@matt", "https://social.lol/users/matt"],
      links: [
        {
          rel: "http://webfinger.net/rel/profile-page",
          type: "text/html",
          href: "https://social.lol/@matt",
        },
        {
          rel: "self",
          type: "application/activity+json",
          href: "https://social.lol/users/matt",
        },
        {
          rel: "http://ostatus.org/schema/1.0/subscribe",
          template: "https://social.lol/authorize_interaction?uri={uri}",
        },
      ],
    }),
  };
};
