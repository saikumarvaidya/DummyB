/**
 * Created by ajayr on 29-07-2017.
 */
import express from "express";

const router = express.Router();

import * as UsersCtrl from "../controllers/UsersController";

router.route("/")
    .get(UsersCtrl.getUsers)
    .post(UsersCtrl.registerUser);


router
    .route("/:id")
    .get(UsersCtrl.getUser)
    .put(UsersCtrl.updateUser)
    .delete(UsersCtrl.deleteUser);


export default router;
