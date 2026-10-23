// import User from "../models/User.js";
// import Order from "../models/Order.js"; // Added Order
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
// const TOKEN_TTL = "30d";

// // Helper function to set the cookie
// const sendTokenCookie = (res, token) => {
//   res.cookie("token", token, {
//     httpOnly: true, // Prevents JavaScript access (XSS protection)
//     secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
//     sameSite: "none", // Required for cross-origin cookies (Netlify -> Railway)
//     maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//   });
// };

// export async function signup(req, res, next) {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password) {
//       res.status(400);
//       throw new Error("Please provide name, email, and password");
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       res.status(400);
//       throw new Error("An account with this email already exists");
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     const user = await User.create({ name, email, password: hashedPassword });

//     const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET, {
//       expiresIn: TOKEN_TTL,
//     });

//     sendTokenCookie(res, token); // <-- Set cookie

//     res.status(201).json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// export async function login(req, res, next) {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       res.status(400);
//       throw new Error("Please provide email and password");
//     }

//     const user = await User.findOne({ email }).select("+password");
//     if (!user) {
//       res.status(401);
//       throw new Error("Invalid email or password");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       res.status(401);
//       throw new Error("Invalid email or password");
//     }

//     const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET, {
//       expiresIn: TOKEN_TTL,
//     });

//     sendTokenCookie(res, token); // <-- Set cookie

//     res.json({
//       token,
//       user: { id: user._id, name: user.name, email: user.email },
//     });
//   } catch (err) {
//     next(err);
//   }
// }

// export async function logout(req, res) {
//   res.clearCookie("token", {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "none",
//   });
//   res.json({ message: "Logged out successfully" });
// }

// export async function getMe(req, res, next) {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       res.status(404);
//       throw new Error("User not found");
//     }
//     res.json({ user: { id: user._id, name: user.name, email: user.email } });
//   } catch (err) {
//     next(err);
//   }
// }

// // Added this new function to fetch user orders
// export async function getMyOrders(req, res, next) {
//   try {
//     const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
//     res.json({ orders });
//   } catch (err) {
//     next(err);
//   }
// }







import User from "../models/User.js";
import Order from "../models/Order.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";
const TOKEN_TTL = "30d";

// Helper function to set the cookie
const sendTokenCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === "production";
  
  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,                 // true in prod (HTTPS), false in local
    sameSite: isProduction ? "none" : "lax", // "lax" allows localhost cookies
    maxAge: 30 * 24 * 60 * 60 * 1000,     // 30 days
    path: "/",
  });
};

export async function signup(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please provide name, email, and password");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400);
      throw new Error("An account with this email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET, {
      expiresIn: TOKEN_TTL,
    });

    sendTokenCookie(res, token);

    // Return user data only (no token in body!)
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("Please provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET, {
      expiresIn: TOKEN_TTL,
    });

    sendTokenCookie(res, token);

    // Return user data only (no token in body!)
    res.json({
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    next(err);
  }
}

export async function logout(req, res) {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  res.json({ message: "Logged out successfully" });
}

export async function getMe(req, res, next) {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }
    res.json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
}

export async function getMyOrders(req, res, next) {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
}