import { Avatar, createStyles, Group, Text } from '@mantine/core';
import { User } from '@prisma/client/edge';
import PrettyDate from './DateFunction';

const useStyles = createStyles((theme) => ({
    body: {
        paddingLeft: 54,
        paddingTop: theme.spacing.sm,
    },
}));

type CommentProps = {
    CreatedAt: Date;
    content: string;
    user?: User;
};

export default function Comment({ CreatedAt, content, user }: CommentProps) {
    const { classes } = useStyles();

    return (
        <div>
            <Group>
                <Avatar src={user?.profilePicture} alt={user?.displayName + "'s profile image."} radius="xl" />
                <div>
                    <Text size="sm">{user?.displayName}</Text>
                    <Text size="xs" color="dimmed">
                        {PrettyDate(CreatedAt)}
                    </Text>
                </div>
            </Group>
            <Text className={classes.body} size="sm">
                {content.trim()}
            </Text>
        </div>
    );
}
