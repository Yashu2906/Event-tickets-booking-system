const express = require("express");
const router = express.Router();

const {
  bookEvent,
  getMyBookings,
  cancelBooking,
  getAllBookings,
} = require("../controllers/bookingController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

router.post("/:eventId", protect, bookEvent);
router.get("/my", protect, getMyBookings);
router.delete("/:bookingId", protect, cancelBooking);
router.get("/admin/all", protect, adminOnly, getAllBookings);

module.exports = router;
