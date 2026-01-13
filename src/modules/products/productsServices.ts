import { Prisma } from "@prisma/client";
import paginationSortingHelper from "../../helpers/paginationSortingHelper";
import { prisma } from "../../lib/prisma";
import { IGetProductsQuery, IPaginatedResult } from "../../types/product";

const createProduct = async (payload: any) => {
  const { variants, images, ...productData } = payload;

  return await prisma.product.create({
    data: {
      ...productData,
      variants: variants?.length
        ? {
            create: variants.map((v: any) => ({
              sku: v.sku,
              variantName: v.variantName,
              price: v.price,
              inventory: v.stockQuantity
                ? { create: { stockQuantity: v.stockQuantity } }
                : undefined
            }))
          }
        : undefined,
      images: images?.length
        ? { create: images.map((img: any) => ({ imageUrl: img.imageUrl, isPrimary: img.isPrimary })) }
        : undefined
    },
    include: {
      variants: { include: { inventory: true } },
      images: true,
      brand: true,
      category: true
    }
  });
};

const getAllProducts = async (
  query: IGetProductsQuery
): Promise<IPaginatedResult<any>> => {

  const { page, limit, skip, sortBy, sortOrder } =
    paginationSortingHelper(query);

  // Allowed sorting fields
  const allowedSortFields = ["createdAt", "price", "name"];
  const finalSortBy = allowedSortFields.includes(sortBy)
    ? sortBy
    : "createdAt";

  // WHERE condition
  const where: Prisma.ProductWhereInput = {};

  //  SEARCH
  if (query.search) {
    where.OR = [
      { name: { contains: query.search, mode: "insensitive" } },
      { description: { contains: query.search, mode: "insensitive" } },
      { brand: { name: { contains: query.search, mode: "insensitive" } } },
      { category: { name: { contains: query.search, mode: "insensitive" } } },
      
    ];
  }

  // STATUS FILTER
  if (query.status ) {
    where.status = query.status;
  }

  // TYPE FILTER (indoor / outdoor) 
  if (query.type) {
    where.category = {type:query.type};
  }

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      include: {
        variants: { include: { inventory: true } },
        images: true,
        brand: true,
        category: true,
      },
      orderBy: {
        [finalSortBy]: sortOrder,
      },
      skip,
      take: limit,
    }),

    prisma.product.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return {
    data: products,
    pagination: {
      total,
      page,
      limit,
      totalPages,
    },
  };
};


const getProductById = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      variants: { include: { inventory: true } },
      images: true,
      brand: true,
      category: true
    }
  });
  if (!product) throw new Error("Product not found");
  return product;
};

const updateProduct = async (id: string, payload: any) => {
  const { variants, images, ...productData } = payload;

  return await prisma.product.update({
    where: { id },
    data: {
      ...productData,
      variants: variants?.length
        ? {
            upsert: variants.map((v: any) => ({
              where: { sku: v.sku },
              update: {
                variantName: v.variantName,
                price: v.price,
                inventory: v.stockQuantity
                  ? { upsert: { create: { stockQuantity: v.stockQuantity }, update: { stockQuantity: v.stockQuantity } } }
                  : undefined
              },
              create: {
                sku: v.sku,
                variantName: v.variantName,
                price: v.price,
                inventory: v.stockQuantity
                  ? { create: { stockQuantity: v.stockQuantity } }
                  : undefined
              }
            }))
          }
        : undefined,
      images: images?.length
        ? {
            upsert: images.map((img: any) => ({
              where: { id: img.id || "" },
              update: { imageUrl: img.imageUrl, isPrimary: img.isPrimary },
              create: { imageUrl: img.imageUrl, isPrimary: img.isPrimary }
            }))
          }
        : undefined
    },
    include: {
      variants: { include: { inventory: true } },
      images: true,
      brand: true,
      category: true
    }
  });
};

const deleteProduct = async (id: string) => {
  // 1 find all variants of product
  const variants = await prisma.productVariant.findMany({
    where: { productId: id },
    select: { id: true },
  });

  const variantIds = variants.map(v => v.id);

  // 2 delete inventory first
  await prisma.inventory.deleteMany({
    where: {
      variantId: { in: variantIds },
    },
  });

  // 3 delete variants
  await prisma.productVariant.deleteMany({
    where: { productId: id },
  });

  // 4 delete images
  await prisma.productImage.deleteMany({
    where: { productId: id },
  });

  // 5 delete product
  return await prisma.product.delete({
    where: { id },
  });
};

export const productService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
};
