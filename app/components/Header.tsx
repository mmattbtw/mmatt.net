import { Burger, Container, createStyles, Group, Header, Paper, Transition } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { Link } from '@remix-run/react';
import { useEffect, useState } from 'react';
import ToggleTheme from './ToggleTheme';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
    root: {
        position: 'relative',
        zIndex: 1,
    },

    dropdown: {
        position: 'absolute',
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: 'hidden',

        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },

    links: {
        [theme.fn.smallerThan('sm')]: {
            display: 'none',
        },
    },

    burger: {
        [theme.fn.largerThan('sm')]: {
            display: 'none',
        },
    },

    link: {
        display: 'block',
        lineHeight: 1,
        padding: '8px 12px',
        borderRadius: theme.radius.sm,
        textDecoration: 'none',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan('sm')]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },
}));

interface HeaderResponsiveProps {
    links: { link: string; label: string }[];
}

export default function HeaderSimple({ links }: HeaderResponsiveProps) {
    const [opened, toggleOpened] = useBooleanToggle(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const { classes } = useStyles();

    function onScroll() {
        if ((window.pageYOffset || 0) < 20) setIsAtTop(true);
        else if (isAtTop) setIsAtTop(false);
    }

    // Credit: @spacedriveapp 2022
    // https://github.com/spacedriveapp/spacedrive/blob/151920dd6f8f3f663b18531f30a6e9b4599427cb/apps/landing/src/components/NavBar.tsx#L47-L57

    useEffect(() => {
        if (!window) return;
        setTimeout(onScroll, 0);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const items = links.map((link) => (
        <Link key={link.label} to={link.link} className={classes.link} prefetch="intent">
            {link.label}
        </Link>
    ));

    return (
        <Header
            height={HEADER_HEIGHT}
            mb={20}
            className={classes.root}
            style={{
                position: 'fixed',
                backgroundColor: isAtTop ? 'rgba(0, 0, 0, 0.0)' : 'rgba(0, 0, 0, 0.25)',
                transition: 'background-color 0.2s ease-in-out',
                backdropFilter: 'blur(10px)',
            }}
        >
            <Container className={classes.header}>
                <h1>mmatt.net</h1>
                <Group spacing={5} className={classes.links}>
                    {items}
                    <ToggleTheme />
                </Group>

                <Burger opened={opened} onClick={() => toggleOpened()} className={classes.burger} size="sm" />

                <Transition transition="pop-top-right" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {items}
                            <ToggleTheme />
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
}
