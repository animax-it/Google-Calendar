const express = require("express");
const router = express.Router();
const calendarRoutes = require("./calender");

router.use("/calendar", calendarRoutes);


module.exports = router;
