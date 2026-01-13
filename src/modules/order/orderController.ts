import { Request, Response } from "express";
import { orderService } from "./orderServices";

export const orderController = {
  async create(req: Request, res: Response) {
    try {
      const result = await orderService.create(req.body);
      res.status(201).json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const result = await orderService.getAll();
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  async updateStatus(req: Request, res: Response) {
    try {
      const result = await orderService.updateStatus(
        req.params.id as string,
        req.body.status
      );
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
