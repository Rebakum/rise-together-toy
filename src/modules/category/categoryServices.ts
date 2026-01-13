import { prisma } from "../../lib/prisma";

export const categoryService = {
  async createCategory(payload: any) {
    if (!payload.name || !payload.slug || !payload.type) {
      throw new Error("name, slug, এবং type required");
    }

    try {
      return await prisma.category.create({
        data: {
          name: payload.name,
          slug: payload.slug,
          type: payload.type,
          parentId: payload.parentId ?? null,
          isActive: payload.isActive ?? true,
        },
      });
    } catch (error: any) {
      console.error("CATEGORY CREATE ERROR:", error);
      throw new Error(error.message || "Category create failed");
    }
  },

  async getAllCategories() {
    try {
      return await prisma.category.findMany({
        where: { isActive: true, parentId: null }, // only top-level
        include: { children: true },
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || "Failed to fetch categories");
    }
  },

  async getSingleCategory(id: string) {
    try {
      const category = await prisma.category.findUnique({
        where: { id },
        include: { children: true, products: true },
      });
      if (!category) throw new Error("Category not found");
      return category;
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || "Category fetch failed");
    }
  },

  async updateCategory(id: string, payload: any) {
    try {
     return await prisma.category.update({
      where: { id },
      data: payload,
      include: { children: true, products: true }, 
    });

    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || "Category update failed");
    }
  },

  async deleteCategory(id: string) {
    try {
      return await prisma.category.update({
        where: { id },
        data: { isActive: false }, 
      });
    } catch (error: any) {
      console.error(error);
      throw new Error(error.message || "Category delete failed");
    }
  },
};
