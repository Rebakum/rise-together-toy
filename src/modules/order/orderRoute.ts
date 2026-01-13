import { Router } from "express";
import { orderController } from "./orderController";



const router = Router();

router.post("/", orderController.create);
router.get("/", orderController.getAll);
router.patch("/:id/status", orderController.updateStatus);

export default router;
