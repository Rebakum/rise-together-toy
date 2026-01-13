import { prisma } from "../../lib/prisma";
import { OrderStatus } from "@prisma/client";

export const orderService = {
  async create(payload: any) {
    const { items, ...orderData } = payload;

    return await prisma.$transaction(async (tx) => {
      let totalAmount = 0;

      // 1 Check inventory + calculate price
      const orderItemsData = [];

      for (const item of items) {
        const variant = await tx.productVariant.findUnique({
          where: { id: item.variantId },
          include: { inventory: true },
        });

        if (!variant || !variant.inventory) {
          throw new Error("Variant not found");
        }

        if (variant.inventory.stockQuantity < item.quantity) {
          throw new Error("Insufficient stock");
        }

        const itemTotal = Number(variant.price) * item.quantity;
        totalAmount += itemTotal;

        orderItemsData.push({
          variantId: item.variantId,
          quantity: item.quantity,
          price: variant.price, // ✅ REQUIRED
        });
      }

      // 2 Create order
      const order = await tx.order.create({
        data: {
          ...orderData,
          totalAmount, 
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: {
            include: {
              variant: true,
            },
          },
        },
      });

      // 3 Reduce stock
      for (const item of items) {
        await tx.inventory.update({
          where: { variantId: item.variantId },
          data: {
            stockQuantity: {
              decrement: item.quantity,
            },
          },
        });
      }

      return order;
    });
  },

  async getAll() {
    return await prisma.order.findMany({
      include: {
        items: {
          include: {
            variant: {
              include: {
                product: true,
              },
            },
          },
        },
        user: true,
      },
    });
  },

  async updateStatus(id: string, status: OrderStatus) {
    return await prisma.order.update({
      where: { id },
      data: { status },
    });
  },
};
