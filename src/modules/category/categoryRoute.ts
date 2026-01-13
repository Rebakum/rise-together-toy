
import { Router } from "express";
import { categoryController } from "./categoryController";


const categoryRouter = Router();


categoryRouter.post("/", categoryController.create);
categoryRouter.get("/", categoryController.getAll);
categoryRouter.get("/:id", categoryController.getOne);
categoryRouter.put("/:id", categoryController.update);
categoryRouter.delete("/:id", categoryController.delete);

export default categoryRouter;
