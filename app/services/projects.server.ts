import { PrismaClient, projects } from "@prisma/client";
export type { projects };

const prisma = new PrismaClient();

export async function createProject(
  post: Pick<
    projects,
    "category" | "imageUrl" | "markdown" | "slug" | "title" | "id" | "status"
  >
) {
  return prisma.projects.create({
    data: {
      ...post,
    },
  });
}

export async function deleteProject(id: string) {
  return prisma.projects.delete({
    where: {
      id,
    },
  });
}

export async function getProjects() {
  return prisma.projects.findMany({
    orderBy: {
      CreatedAt: "desc",
    }
  });
}

export async function getProjectViaSlug(slug: string) {
  return prisma.projects.findFirst({
    where: {
      slug,
    },
  });
}

export async function getProjectViaId(id: string) {
  return prisma.projects.findFirst({
    where: {
      id,
    },
  });
}

export async function updateProject(
  id: string,
  data: Pick<
    projects,
    "category" | "imageUrl" | "markdown" | "slug" | "title" | "id" | "status"
  >
) {
  return prisma.projects.update({
    where: {
      id,
    },
    data,
  });
}
