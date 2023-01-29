const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home_controller");

router.get("/", homeController.home);

router.post("/add-habit", homeController.addHabit);

router.get("/update-status", homeController.updateHabitStatus);

router.delete("/delete-habit/:id", homeController.deleteHabit);

router.post("/change-view", homeController.changeView);

router.get("/update-status-weekly", homeController.updateHabitStatusWeekly);

module.exports = router;