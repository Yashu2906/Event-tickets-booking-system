const pool = require("../config/db");

// CREATE EVENT
exports.createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      city,
      venue,
      event_date,
      price,
      total_seats,
      image_url,
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO events 
      (title, description, category, city, venue, event_date, price, total_seats, available_seats, image_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        description,
        category,
        city,
        venue,
        event_date,
        price,
        total_seats,
        total_seats,
        image_url,
      ],
    );

    res.status(201).json({
      message: "Event created successfully",
      eventId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// GET ALL EVENTS
exports.getEvents = async (req, res) => {
  try {
    const { search, city, category, page = 1 } = req.query;

    const limit = 5;
    const offset = (page - 1) * limit;

    let query = "SELECT * FROM events WHERE 1=1";
    let params = [];

    if (search) {
      query += " AND title LIKE ?";
      params.push(`%${search}%`);
    }

    if (city) {
      query += " AND city = ?";
      params.push(city);
    }

    if (category) {
      query += " AND category = ?";
      params.push(category);
    }

    query += " ORDER BY event_date ASC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [events] = await pool.query(query, params);

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET EVENT BY ID
exports.getEventById = async (req, res) => {
  try {
    const [event] = await pool.query("SELECT * FROM events WHERE id = ?", [
      req.params.id,
    ]);

    if (event.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// UPDATE EVENT
exports.updateEvent = async (req, res) => {
  try {
    const { title, description, category, city, venue, event_date, price } =
      req.body;

    await pool.query(
      `UPDATE events SET
      title=?,
      description=?,
      category=?,
      city=?,
      venue=?,
      event_date=?,
      price=?
      WHERE id=?`,
      [
        title,
        description,
        category,
        city,
        venue,
        event_date,
        price,
        req.params.id,
      ],
    );

    res.json({ message: "Event updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// DELETE EVENT
exports.deleteEvent = async (req, res) => {
  try {
    await pool.query("DELETE FROM events WHERE id=?", [req.params.id]);

    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getSeatAvailability = async (req, res) => {
  try {
    const [event] = await pool.query(
      "SELECT title, total_seats, available_seats FROM events WHERE id=?",
      [req.params.id],
    );

    if (event.length === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event[0]);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
