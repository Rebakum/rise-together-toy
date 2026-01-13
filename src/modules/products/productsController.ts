import { Request, Response } from "express";
import { productService } from "./productsServices";

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
      const products = await productService.getAllProducts();
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
