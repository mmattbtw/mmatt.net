import { PrismaClient, User } from '@prisma/client';
export type { User };

const prisma = new PrismaClient();

export async function getUsers() {
    return prisma.user.findMany({
        orderBy: {
            CreatedAt: "desc",
        }
    })
}

export async function getUserViaId(id: string) {
    return prisma.user.findFirst({
        where: {
            id,
        },
    });
}

export async function getUserViaUsername(username: string) {
    return prisma.user.findFirst({
        where: {
            username,
        },
    });
}

export async function createUser(
    user: Pick<
        User,
        "id" | "username" | "displayName" | "profilePicture"
    >
) {
    return prisma.user.create({
        data: {
            ...user,
        },
    });
}