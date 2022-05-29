import { Avatar, createStyles, Group, Text } from '@mantine/core';
import { User } from '@prisma/client';
import React from 'react';

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
}));

type CommentProps = {
  CreatedAt: Date
  content: string
  user?: User
}

export default function Comment({ CreatedAt, content, user }: CommentProps) {
  const { classes } = useStyles();
  const createdAtDateString = new Date(CreatedAt).toLocaleDateString();
  const createdAtTimeString = new Date(CreatedAt).toLocaleTimeString();

  return (
    <div>
      <Group>
        <Avatar src={user?.profilePicture} alt={user?.displayName} radius="xl" />
        <div>
          <Text size="sm">{user?.displayName}</Text>
          {/* @ts-ignore */}
          <Text size="xs" color="dimmed">
            {createdAtDateString} - {createdAtTimeString}
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {content.trim()}
      </Text>
    </div>
  );
}