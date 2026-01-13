import { Router } from "express";
import { variantController } from "./variantController";


const variantRouter = Router();

variantRouter.post("/", variantController.create);
variantRouter.get("/", variantController.getAll);
variantRouter.patch("/:id", variantController.update);
variantRouter.delete("/:id", variantController.delete);

export default variantRouter;
