import { Router } from "express";
import { brandController } from "./brandController";


const brandRouter = Router();

brandRouter.post("/", brandController.create);
brandRouter.get("/", brandController.getAll);
brandRouter.get("/:id", brandController.getOne);
brandRouter.put("/:id", brandController.update);
brandRouter.delete("/:id", brandController.delete);

export default brandRouter;
