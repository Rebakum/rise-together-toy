import { Request, Response } from "express";
import { categoryService } from "./categoryServices";

export const categoryController = {
  async create(req: Request, res: Response) {
    try {
      console.log("BODY:", req.body);
      const result = await categoryService.createCategory(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      console.error("CREATE CATEGORY ERROR:", error);
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await categoryService.getAllCategories();
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      const result = await categoryService.getSingleCategory(req.params.id as string);
      res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(404).json({ success: false, message: error.message });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const result = await categoryService.updateCategory(req.params.id as string, req.body);
    res.status(200).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      await categoryService.deleteCategory(req.params.id as string);
      res.status(200).json({ success: true, message: "Category deleted" });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
};
