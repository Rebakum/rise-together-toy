import { prisma } from "../../lib/prisma";

export const variantService = {
  create(data: any) {
    try {
      return prisma.productVariant.create({
        data,
        include: { inventory: true },
      });
    } catch (error) {
      throw error;
    }
  },

  getAll() {
    try {
      return prisma.productVariant.findMany({
        include: { inventory: true },
      });
    } catch (error) {
      throw error;
    }
  },

  update(id: string, data: any) {
    try {
      return prisma.productVariant.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw error;
    }
  },

  delete(id: string) {
    try {
      return prisma.productVariant.delete({ where: { id } });
    } catch (error) {
      throw error;
    }
  },
};
