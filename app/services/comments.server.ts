import { comments, PrismaClient } from '@prisma/client';
export type { comments };

const prisma = new PrismaClient();

export async function getCommentsViaParentId(parentPostId: string) {
    return prisma.comments.findMany({
        where: {
            parentPostId,
        },
        orderBy: {
            CreatedAt: "desc",
        }
    })
}

export async function getCommentViaId(id: string) {
    return prisma.comments.findFirst({
        where: {
            id,
        },
    });
}

export async function getUserComments(userId: string) {
    return prisma.comments.findMany({
        where: {
            userId,
        },
        orderBy: {
            CreatedAt: "desc",
        }
    })
}

export async function createComment(
    comment: Pick<
        comments,
        "id" | "parentPostId" | "userId" | "content"
    >
) {
    return prisma.comments.create({
        data: {
            ...comment,
        },
    });
}