const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");
const {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvents,
  getEventById,
  getSeatAvailability,
} = require("../controllers/eventConroller");

router.get("/", getEvents);
router.get("/:id", getEventById);

router.post("/", protect, adminOnly, createEvent);
router.put("/:id", protect, adminOnly, updateEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);
router.get("/:id/seats", getSeatAvailability);

module.exports = router;
