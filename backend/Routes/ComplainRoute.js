const express = require("express");
const router = express.Router();

//Insert Employee Model
const Complain = require("../Models/ComplainModel");

//Insert Employee Comtroller
const ComplainController = require("../Controllers/ComplainController");

router.get("/",ComplainController.getAllComplains);
router.post("/",ComplainController.addComplain);
router.get("/getcomplain",ComplainController.getComplain);
router.get("/unviewed-count", ComplainController.unviewedCount); // For unviewed complaints count
router.post("/mark-as-viewed", ComplainController.markAsViewed); // Mark all as viewed
router.get("/:comp_id",ComplainController.getComplainById);
router.put("/:comp_id",ComplainController.updateComplain);
router.delete("/:comp_id",ComplainController.deleteComplain);

module.exports = router
