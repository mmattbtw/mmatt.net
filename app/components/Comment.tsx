import { Avatar, createStyles, Group, Text } from '@mantine/core';
import React from 'react';

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: 54,
    paddingTop: theme.spacing.sm,
  },
}));

export default function Comment({ CreatedAt, content, user }: any) {
  const { classes } = useStyles();
  return (
    <div>
      <Group>
        <Avatar src={user.profilePicture} alt={user.username} radius="xl" />
        <div>
          <Text size="sm">{user.username}</Text>
          <Text size="xs" color="dimmed">
            {CreatedAt}
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {content.trim()}
      </Text>
    </div>
  );
}