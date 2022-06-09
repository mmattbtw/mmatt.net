import type { ColorScheme } from '@mantine/core';
import { ColorSchemeProvider, Global, MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import type { MetaFunction } from '@remix-run/node';
import { Links, LiveReload, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react';
import { FooterSocial } from '~/components/Footer';
import HeaderSimple from '~/components/Header';
import { useState } from 'react';
import { motion } from 'framer-motion';

export const meta: MetaFunction = () => ({
    charset: 'utf-8',
    title: 'mmatt.net',
    viewport: 'width=device-width,initial-scale=1',
    'twitter:creator': '@mmattbtw',
    'twitter:site': '@mmattbtw',
    'twitter:card': 'summary',
});

const links = [
    { label: '/home', link: '/' },
    { label: '/blog', link: '/blog' },
    { label: '/projects', link: '/projects' },
    { label: '/devices', link: '/devices' },
];

export default function App() {
    return (
        <html lang="en">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <MantineTheme>
                    {}
                    <NotificationsProvider>
                        <HeaderSimple links={links} />
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{
                                type: 'spring',
                                delay: 0.1,
                            }}
                        >
                            <Outlet />
                        </motion.div>
                        <FooterSocial links={links} />
                        <canvas
                            id="canvas"
                            style={{
                                width: '100%',
                                height: '100%',
                                display: 'absolute',
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                zIndex: -9999,
                            }}
                        ></canvas>

                        <script src="bg.js"></script>
                    </NotificationsProvider>
                </MantineTheme>

                <ScrollRestoration />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    );
}

function MantineTheme({ children }: { children: React.ReactNode }) {
    const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
    const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    return (
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider theme={{ colorScheme }} withNormalizeCSS withGlobalStyles>
                <Global
                    styles={(theme) => ({
                        a: {
                            color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
                            textDecoration: 'underline',

                            '&:hover': {
                                backgroundColor:
                                    theme.colorScheme === 'dark'
                                        ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
                                        : theme.colors[theme.primaryColor][0],
                                color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
                                textDecoration: 'none',
                                border: 'none',
                            },
                        },
                    })}
                />
                {children}
            </MantineProvider>
        </ColorSchemeProvider>
    );
}
