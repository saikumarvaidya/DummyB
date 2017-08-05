import express from "express";

const router = express.Router();

import * as PingCtrl from "../controllers/PingController";

router.route("/")
    .get(PingCtrl.getPings)
    .post(PingCtrl.addPing);

router
    .route("/:id")
    .get(PingCtrl.getPing)
    .put(PingCtrl.updatePing)
    .delete(PingCtrl.deletePing);

export default router;
