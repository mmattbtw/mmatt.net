import { Burger, Container, createStyles, Group, Header } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { Link } from '@remix-run/react';
import React from 'react';
import { SegmentedToggle } from './ToggleThemeButton';

const useStyles = createStyles((theme) => ({
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
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
  },
}));

interface HeaderSimpleProps {
  links: { link: string; label: string }[];
}

export default function HeaderSimple({ links }: HeaderSimpleProps) {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes } = useStyles();

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={classes.link}
      prefetch={"intent"}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      <Header height={60}>
        <Container className={classes.header}>
          <h1>mmatt.net</h1>
          <Group spacing={5} className={classes.links}>
            {items}
            <SegmentedToggle />
          </Group>

          <Burger
            opened={opened}
            onClick={() => toggleOpened()}
            className={classes.burger}
            size="sm"
          />
        </Container>
      </Header>
    </>
  );
}