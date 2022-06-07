import { Button, createStyles, Paper, Text, Title } from '@mantine/core';
import { Link } from '@remix-run/react';
import React from 'react';
import PrettyDate from './DateFunction';

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

    a: {
        textDecoration: 'none',
    },
}));

export interface ArticleCardImageProps {
    id: string;
    category: string;
    imageUrl: string;
    markdown: string;
    slug: string;
    title: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export function ArticleCardImage({ imageUrl, title, category, slug, CreatedAt }: ArticleCardImageProps) {
    const { classes } = useStyles();
    const aboveTitleText = `${category} | created: ${PrettyDate(CreatedAt)}`;

    return (
        <Link to={slug} prefetch={'intent'} style={{ textDecoration: 'none' }}>
            <Paper
                shadow="md"
                p="xl"
                radius="md"
                sx={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.81), rgba(0, 0, 0, 0.25)),url(${imageUrl})` }}
                className={classes.card}
            >
                <div>
                    <Text className={classes.category} size="xs">
                        {aboveTitleText}
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
export function ArticleCardImageAdminPage({ imageUrl, title, category, slug, CreatedAt }: ArticleCardImageProps) {
    const { classes } = useStyles();
    const aboveTitleText = `${category} | created: ${PrettyDate(CreatedAt)}`;

    return (
        <Paper
            shadow="md"
            p="xl"
            radius="md"
            sx={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.81), rgba(0, 0, 0, 0.25)),url(${imageUrl})` }}
            className={classes.card}
        >
            <div>
                <Text className={classes.category} size="xs">
                    {aboveTitleText}
                </Text>
                <Title order={3} className={classes.title}>
                    {title}
                </Title>
            </div>
            <Button variant="white" color="dark">
                Edit post
            </Button>
        </Paper>
    );
}
