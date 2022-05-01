import type { ColorScheme } from "@mantine/core";
import { ColorSchemeProvider, Global, MantineProvider } from "@mantine/core";
import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from "@remix-run/react";
import { FooterSocial } from "components/Footer";
import HeaderSimple from "components/Header";
import { useState } from "react";
import { MoralisProvider } from "react-moralis";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "mmatt.net",
  viewport: "width=device-width,initial-scale=1",
  'twitter:creator': '@mmattbtw',
  'twitter:site': '@mmattbtw',
});

const links=[{label: "/home", link: "/"}, {label: "/blog", link: "/blog"}, {label: "/projects", link:"/projects"}, {label: "/devices", link:"/devices"}]


export async function loader() {
  return {
    MORALIS_SERVER_APP_ID: process.env.MORALIS_SERVER_APP_ID as string,
    MORALIS_SERVER_URL: process.env.MORALIS_SERVER_URL as string,
  }
}

export default function App() {
  const { MORALIS_SERVER_APP_ID, MORALIS_SERVER_URL } = useLoaderData();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        
        <MoralisProvider appId={`${MORALIS_SERVER_APP_ID}`} serverUrl={`${MORALIS_SERVER_URL}`}>
          <MantineTheme>
            {}
            <HeaderSimple links={links}  />
            <Outlet />
            <FooterSocial links={links} />
          </MantineTheme>
        </MoralisProvider>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

function MantineTheme({ children }: { children: React.ReactNode }) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (


    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withNormalizeCSS
        withGlobalStyles
      >
        <Global
          styles={(theme) => ({
            a: {
              color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
              textDecoration: "underline",
          
              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                    : theme.colors[theme.primaryColor][0],
                color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
                textDecoration: "none",
              }
            }
          })}
        />
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
