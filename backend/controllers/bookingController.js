const pool = require("../config/db");

// BOOK EVENT
exports.bookEvent = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const { tickets } = req.body;
    const eventId = req.params.eventId;
    const userId = req.user.id;

    // ── Input validation ───────────────────────────────────────────────
    if (tickets == null) {
      return res.status(400).json({ message: "Number of tickets is required" });
    }

    const ticketCount = Number(tickets);
    if (Number.isNaN(ticketCount) || !Number.isInteger(ticketCount)) {
      return res.status(400).json({
        message: "Tickets must be a valid integer",
      });
    }

    if (ticketCount <= 0) {
      return res.status(400).json({
        message: "You must book at least 1 ticket",
      });
    }

    // Optional: prevent abuse (adjust limit as needed)
    if (ticketCount > 20) {
      return res.status(400).json({
        message: "Maximum 20 tickets allowed per booking",
      });
    }

    await connection.beginTransaction();

    // Lock the event row
    const [events] = await connection.query(
      "SELECT available_seats, price FROM events WHERE id = ? FOR UPDATE",
      [eventId],
    );

    if (events.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "Event not found" });
    }

    const { available_seats, price } = events[0];

    if (available_seats < ticketCount) {
      await connection.rollback();
      return res.status(400).json({
        message: `Only ${available_seats} seat(s) available`,
      });
    }

    const totalAmount = ticketCount * price;

    // Final safety check (very unlikely after validation, but good practice)
    if (
      Number.isNaN(totalAmount) ||
      totalAmount < 0 ||
      !Number.isFinite(totalAmount)
    ) {
      await connection.rollback();
      return res.status(500).json({ message: "Price calculation error" });
    }

    // Update available seats
    await connection.query(
      "UPDATE events SET available_seats = available_seats - ? WHERE id = ?",
      [ticketCount, eventId],
    );

    // Create booking record
    const [result] = await connection.query(
      `INSERT INTO bookings (user_id, event_id, tickets, total_amount)
       VALUES (?, ?, ?, ?)`,
      [userId, eventId, ticketCount, totalAmount],
    );

    await connection.commit();

    res.status(201).json({
      message: "Booking successful",
      bookingId: result.insertId,
      tickets: ticketCount,
      totalAmount,
    });
  } catch (error) {
    if (connection) await connection.rollback();

    console.error("Booking failed:", {
      userId: req.user?.id,
      eventId: req.params?.eventId,
      tickets: req.body?.tickets,
      error: error.message,
      stack: error.stack?.substring(0, 300), // truncate for logs
    });

    res.status(500).json({
      message: "Failed to complete booking",
      error: "Internal server error", // never expose full error to client
    });
  } finally {
    if (connection) connection.release();
  }
};

// GET USER BOOKINGS (unchanged — already looks good)
exports.getMyBookings = async (req, res) => {
  try {
    const userId = req.user.id;

    const [bookings] = await pool.query(
      `SELECT 
        bookings.id,
        events.title,
        events.venue,
        events.event_date,
        bookings.tickets,
        bookings.total_amount,
        bookings.booking_date
      FROM bookings
      JOIN events ON bookings.event_id = events.id
      WHERE bookings.user_id = ?`,
      [userId],
    );

    res.json(bookings);
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.cancelBooking = async (req, res) => {
  const connection = await pool.getConnection();

  try {
    const bookingId = req.params.bookingId;

    await connection.beginTransaction();

    // get booking
    const [booking] = await connection.query(
      "SELECT * FROM bookings WHERE id=?",
      [bookingId],
    );

    if (booking.length === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "Booking not found" });
    }

    const eventId = booking[0].event_id;
    const tickets = booking[0].tickets;

    // restore seats
    await connection.query(
      "UPDATE events SET available_seats = available_seats + ? WHERE id=?",
      [tickets, eventId],
    );

    // delete booking
    await connection.query("DELETE FROM bookings WHERE id=?", [bookingId]);

    await connection.commit();

    res.json({
      message: "Booking cancelled successfully",
    });
  } catch (error) {
    await connection.rollback();

    res.status(500).json({ message: "Cancellation failed" });
  } finally {
    connection.release();
  }
};
exports.getAllBookings = async (req, res) => {
  try {
    const [bookings] = await pool.query(
      `SELECT 
        bookings.id,
        users.name,
        users.email,
        events.title,
        bookings.tickets,
        bookings.total_amount,
        bookings.booking_date
      FROM bookings
      JOIN users ON bookings.user_id = users.id
      JOIN events ON bookings.event_id = events.id
      ORDER BY bookings.booking_date DESC`,
    );

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
