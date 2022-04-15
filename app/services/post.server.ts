import { posts, PrismaClient } from "@prisma/client";
export type { posts };

const prisma = new PrismaClient();

export async function createPost(
  post: Pick<
    posts,
    "category" | "imageUrl" | "markdown" | "slug" | "title" | "id"
  >
) {
  return prisma.posts.create({
    data: {
      ...post,
    },
  });
}

export async function deletePost(id: string) {
  return prisma.posts.delete({
    where: {
      id,
    },
  });
}

export async function getPosts() {
  return prisma.posts.findMany();
}

export async function getPost(slug: string) {
  return prisma.posts.findFirst({
    where: {
      slug,
    },
  });
}

export async function updatePost(
  id: string,
  data: Pick<
    posts,
    "category" | "imageUrl" | "markdown" | "slug" | "title" | "id"
  >
) {
  return prisma.posts.update({
    where: {
      id,
    },
    data,
  });
}
