import { Request, Response } from "express";
import { variantService } from "./variantServices";


export const variantController = {
  async create(req: Request, res: Response) {
    try {
      const result = await variantService.create(req.body);
      res.status(201).json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await variantService.getAll();
      res.json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const result = await variantService.update(req.params.id as string, req.body);
      res.json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const result = await variantService.delete(req.params.id as string);
      res.json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false });
    }
  },
};
