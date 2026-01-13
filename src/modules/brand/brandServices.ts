import { prisma } from "../../lib/prisma";

export const brandService = {
  create(data: any) {
    try {
      return prisma.brand.create({ data });
    } catch (error) {
      throw error;
    }
  },

  getAll() {
    try {
      return prisma.brand.findMany();
    } catch (error) {
      throw error;
    }
  },

  getById(id: string) {
    try {
      return prisma.brand.findUnique({ where: { id } });
    } catch (error) {
      throw error;
    }
  },

  update(id: string, data: any) {
    try {
      return prisma.brand.update({ where: { id }, data });
    } catch (error) {
      throw error;
    }
  },

  delete(id: string) {
    try {
      return prisma.brand.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  },
};
