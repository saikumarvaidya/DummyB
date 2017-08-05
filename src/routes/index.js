import express from "express";

import PingRotes from "./PingRoutes";
import UserRoutes from "./UsersRouters"
import userauth from "./userauth"

const router = express.Router();

router.use("/pings", PingRotes);
router.use("/users",UserRoutes);
router.use("/auth",userauth);
export default router;
