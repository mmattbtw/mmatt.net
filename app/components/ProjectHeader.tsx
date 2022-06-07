import { createStyles, Paper, Text, Title } from '@mantine/core';
import React from 'react';
import PrettyDate from './DateFunction';

const useStyles = createStyles((theme) => ({
    card: {
        height: 180,
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
    id: string;
    category: string;
    imageUrl: string;
    markdown: string;
    slug: string;
    title: string;
    status: string;
    CreatedAt: Date;
    UpdatedAt: Date;
}

export function ProjectHeader({ imageUrl, title, category, status, CreatedAt, UpdatedAt }: ArticleCardImageProps) {
    const { classes } = useStyles();
    const aboveTitleText = `${category} - ${status} | created: ${PrettyDate(CreatedAt)} | updated: ${PrettyDate(UpdatedAt)}`;

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
        </Paper>
    );
}
