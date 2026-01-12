import { Router } from "express";
import userRouter from "../modules/users/usersRoute";

const router = Router();

router.use("/users", userRouter);

export default router;
