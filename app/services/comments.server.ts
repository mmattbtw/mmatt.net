import { comments, PrismaClient } from '@prisma/client';
export type { comments };

const prisma = new PrismaClient();

export async function getCommentsViaParentId(parentPostId: string) {
    return prisma.comments.findMany({
        where: {
            parentPostId,
        },
        include: {
            user: true,
        },
        orderBy: {
            CreatedAt: 'desc',
        },
    });
}

export async function getCommentViaId(id: string) {
    return prisma.comments.findFirst({
        where: {
            id,
        },
        include: {
            user: true,
        },
    });
}

export async function getUserComments(userId: string) {
    return prisma.comments.findMany({
        where: {
            userId,
        },
        include: {
            user: true,
        },
        orderBy: {
            CreatedAt: 'desc',
        },
    });
}

export async function createComment(comment: Pick<comments, 'parentPostId' | 'userId' | 'content'>) {
    return prisma.comments.create({
        data: {
            ...comment,
        },
    });
}
