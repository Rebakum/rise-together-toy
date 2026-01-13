import { Router } from "express";
import userRouter from "../modules/users/usersRoute";
import productRouter from "../modules/products/productsRoute";
import categoryRouter from "../modules/category/categoryRoute";
import brandRouter from "../modules/brand/brandRoute";
import variantRouter from "../modules/variant/variantRoute";
import orderRoute from "../modules/order/orderRoute";

const router = Router();

router.use("/users", userRouter);
router.use("/products", productRouter)
router.use("/categories", categoryRouter)
router.use("/brands", brandRouter)
router.use("/variants", variantRouter)
router.use("/orders", orderRoute)

export default router;
