import { Router } from "express";
import { usersController } from "./usersController";

const userRouter = Router();

userRouter.post("/", usersController.register);
userRouter.get("/", usersController.getAllUsers)
userRouter.get("/:id", usersController.getUserById)
userRouter.put("/:id", usersController.upDateUser);
userRouter.delete("/:id", usersController.deleteUser);
userRouter.get("/test", (req, res) => {
  res.send("User route working");
});

export default userRouter;
