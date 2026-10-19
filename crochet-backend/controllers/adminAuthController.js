import jwt from "jsonwebtoken";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;
const TOKEN_TTL = "7d"; // token valid for 7 days

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !JWT_SECRET) {
      res.status(500);
      throw new Error("Admin credentials not configured on server");
    }

    const emailMatches = email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const passwordMatches = password === ADMIN_PASSWORD;

    if (!emailMatches || !passwordMatches) {
      res.status(401);
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { email: ADMIN_EMAIL, role: "admin" },
      JWT_SECRET,
      { expiresIn: TOKEN_TTL }
    );

    res.json({
      token,
      admin: { email: ADMIN_EMAIL },
    });
  } catch (err) {
    next(err);
  }
}

export function me(req, res) {
  res.json({ admin: req.admin });
}