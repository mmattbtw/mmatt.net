import { Button, createStyles, Paper, Text, Title } from '@mantine/core';
import { Link } from '@remix-run/react';
import React from 'react';

const useStyles = createStyles((theme) => ({
  card: {
    height: 200,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },

  title: {
    fontFamily: `Greycliff CF ${theme.fontFamily}`,
    fontWeight: 900,
    color: theme.white,
    lineHeight: 1.2,
    fontSize: 32,
    marginTop: theme.spacing.xs,
  },

  category: {
    color: theme.white,
    opacity: 0.7,
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));

export interface ArticleCardImageProps {
  id: string,
  category: string,
  imageUrl: string,
  markdown: string,
  slug: string,
  title: string,
  status: string,
  CreatedAt: string,
  UpdatedAt: string
}

export function ProjectCardImage({ imageUrl, title, category, slug, status, CreatedAt }: ArticleCardImageProps) {
  const { classes } = useStyles();

  return (
    <Link to={slug} prefetch={'intent'} style={{textDecoration: 'none'}}>
        <Paper
        shadow="md"
        p="xl"
        radius="md"
        sx={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.81), rgba(0, 0, 0, 0.25)),url(${imageUrl})` }}
        className={classes.card}
        >
        <div>
            <Text className={classes.category} size="xs">
              {category} - {status} | created: {CreatedAt}
            </Text>
            <Title order={3} className={classes.title}>
              {title}
            </Title>
        </div>
        <Button variant="white" color="dark">
            Read post
        </Button>
        </Paper>
    </Link>
  );
}