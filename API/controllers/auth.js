import pool from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const lookupUserByEmail = async (req, res) => {
  const { email } = req.body;
  console.log(`Looking for existing email: ${email}`);

  const client = await pool.connect();

  try {
    console.log("connected to postgres Pool");

    const { rows } = await client.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    console.log(`query result: ${rows}`);

    res.json(rows);
  } catch (err) {
    console.log(`Failed to get user: `, "\n", err);
    res.status(400).json({ msg: "Please review user request query" });
  } finally {
    await client.release();
  }
};

export const register = async (req, res) => {
  const { firstName, lastName, phone, email, password, userAuth, photo } =
    req.body;

  const client = await pool.connect();

  try {
    //Look if user already exists
    const user = await client.query("SELECT id FROM users WHERE email = $1", [
      email,
    ]);

    if (user.rows.length !== 0) {
      return res.status(401).send("User already exists");
    }

    //password encryption before adding to DB
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(password, salt);

    //Add new user to DB
    const newUser = await client.query(
      "INSERT INTO users (first_name, last_name, phone, email, password_hash, user_authority, profile_picture) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [firstName, lastName, phone, email, hash, userAuth, photo]
    );

    //Generate Token
    const token = jwt.sign(
      { user: newUser.rows[0].id },
      process.env.JWT_SECRET
      // { expiresIn: "1hr" }
    );

    res.json({ token });
  } catch (err) {
    console.log(
      `Failed to add ${firstName} ${lastName} to the database: `,
      "\n",
      err
    );
    res.status(400).json({ msg: "Please review user add query" });
  } finally {
    await client.release();
  }
};

export const login = async (req, res) => {
  const client = await pool.connect();

  try {
    //1. destructure req.body
    const { email, password } = req.body;

    //2. check if user doesn't exist (throw error if not)
    const user = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).send("Email or password is incorrect");
    }

    //3. check if incoming password is correct
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password_hash
    );
    if (!validPassword) {
      return res.status(401).send("Email or password is incorrect");
    }

    //4. give jwt token
    const token = jwt.sign(
      { user: user.rows[0].id },
      process.env.JWT_SECRET,
      { expiresIn: "15h" }
    );

    res.json({
      token,
      auth: user.rows[0].user_authority,
    });
  } catch (err) {
    console.error(err.message);
  } finally {
    client.release();
  }
};
