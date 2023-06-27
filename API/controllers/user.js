import pool from "../connect.js";
import jwt from "jsonwebtoken";

export const getAll = async (req, res) => {
  const client = await pool.connect();

  try {
    const { rows } = await client.query(
      "SELECT id, first_name, last_name, phone, email, user_authority FROM users"
    );

    res.json(rows);
  } catch (err) {
    console.log("Error getting users from database: ", err);
    res.status(500).json({ msg: "Unable to get users from database" });
  } finally {
    await client.release();
  }
};

export const getUser = async (req, res) => {
  const client = await pool.connect();

  const token = req.headers.token;

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    try {
      const { rows } = await client.query(
        "SELECT first_name, last_name, phone, email, user_authority, profile_picture FROM users WHERE id = $1",
        [userInfo.user]
      );

      res.json(rows[0]);
    } catch (err) {
      console.log(`Failed to get user ${userInfo.user}: `, "\n", err);
      res.status(400).json({ msg: "Please review user request query" });
    } finally {
      await client.release();
    }
  });
};

export const updatePic = async (req, res) => {
  const token = req.headers.token;
  const { pic } = req.body;
  const client = await pool.connect();

  jwt.verify(token, process.env.JWT_SECRET, async (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    try {
      await client.query(
        "UPDATE users SET profile_picture = $1 WHERE id = $2",
        [pic, userInfo.user]
      );

      res.json(`profile picture was updated successfully`);
    } catch (err) {
      console.log(`Failed to get user ${userInfo.user}: `, "\n", err);
      res.status(400).json({ msg: "Please review user request query" });
    } finally {
      await client.release();
    }
  });
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, phone, email, user_authority } = req.body;
  const client = await pool.connect();

  try {
    const updateUser = await client.query(
      "UPDATE users SET (first_name, last_name, phone, email, user_authority) = ($1, $2, $3, $4, $5) WHERE id = $6",
      [first_name, last_name, phone, email, user_authority, id]
    );

    res.json(`${first_name} ${last_name} profile: updated successfully`);
  } catch (err) {
    console.log(`Failed to update user ${id}: `, "\n", err);
    res.status(400).json({ msg: "Please review user update query" });
  } finally {
    await client.release();
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();

  try {
    const deleteUser = await client.query("DELETE FROM users WHERE id = $1", [
      id,
    ]);

    res.status(200).json({ msg: `User ${id} succesfully deleted` });
  } catch (err) {
    console.log(`Failed to delete user ${id}: `, "\n", err);
    res.status(500).json({ msg: `Project deletion of ${id} failed` });
  } finally {
    await client.release();
  }
};
