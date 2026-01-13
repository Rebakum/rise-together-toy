import { Request, Response } from "express";
import { productService } from "./productsServices";
import { IGetProductsQuery } from "../../types/product";
import { CategoryType, ProductStatus } from "@prisma/client";

export const productsController = {
  createProduct: async (req: Request, res: Response) => {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json({ success: true, data: product });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  getAllProducts: async (req: Request, res: Response) => {
  try {
    // Query parameters from search, filter, sort, pagination grouped into 'query' object
    const query: IGetProductsQuery = {
  search: (req.query.search as string) || "",
  status: (req.query.status as ProductStatus ) || "active",
  page: (req.query.page as string) || "1",
  limit: (req.query.limit as string) || "10",
  sortBy: (req.query.sortBy as string) || "createdAt",
  sortOrder: (req.query.sortOrder as "asc" | "desc") || "desc",
  type: (req.query.type as CategoryType )|| undefined
};

    const products = await productService.getAllProducts(query);
    res.json({ success: true, data: products });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
 },

  getProductById: async (req: Request, res: Response) => {
    try {
      const product = await productService.getProductById(req.params.id as string);
      res.json({ success: true, data: product });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  },

  updateProduct: async (req: Request, res: Response) => {
    try {
      const product = await productService.updateProduct(req.params.id as string, req.body);
      res.json({ success: true, data: product });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
  try {
    await productService.deleteProduct(req.params.id as string) ;
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }}};
