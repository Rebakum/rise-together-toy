import { Router } from "express";
import { productsController } from "./productsController";


const productRouter = Router();

productRouter.post("/", productsController.createProduct);     
productRouter.get("/", productsController.getAllProducts);     
productRouter.get("/:id", productsController.getProductById);  
productRouter.put("/:id", productsController.updateProduct);   
productRouter.delete("/:id", productsController.deleteProduct); 
export default productRouter;
