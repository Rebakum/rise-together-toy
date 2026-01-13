import { Request, Response } from "express";
import { brandService } from "./brandServices";


export const brandController = {
  async create(req: Request, res: Response) {
    try {
      const result = await brandService.create(req.body);
      res.status(201).json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false, message: "Brand create failed" });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await brandService.getAll();
      res.json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false });
    }
  },

  async getOne(req: Request, res: Response) {
    try {
      console.log(req.params.id)
      const result = await brandService.getById(req.params.id as string);
      res.json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false });
    }
  },

  async update(req: Request, res: Response) {
    try {
      const result = await brandService.update(req.params.id as string, req.body);
      res.json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const result = await brandService.delete(req.params.id as string);
      res.json({ success: true, data: result });
    } catch {
      res.status(500).json({ success: false });
    }
  },
};
