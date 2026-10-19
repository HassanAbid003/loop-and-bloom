import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Settings from "../models/Settings.js"; 

// ==========================================
// ORDERS
// ==========================================

export async function listAllOrders(req, res, next) {
  try {
    const { status, limit = 50, page = 1 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Order.countDocuments(filter),
    ]);

    res.json({ orders, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    next(err);
  }
}

export async function updateOrderStatus(req, res, next) {
  try {
    const { status } = req.body;
    if (!status) {
      res.status(400);
      throw new Error("Status is required");
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
}

// ==========================================
// PRODUCTS
// ==========================================

export async function listAllProducts(req, res, next) {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json({ products });
  } catch (err) {
    next(err);
  }
}

export async function createProduct(req, res, next) {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json(product);
  } catch (err) {
    next(err);
  }
}

export async function archiveProduct(req, res, next) {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { status: "archived" },
      { new: true }
    );

    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }

    res.json({ message: "Product archived", product });
  } catch (err) {
    next(err);
  }
}

// Add this to the bottom of adminController.js
export async function deleteProductPermanently(req, res, next) {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
}
// ==========================================
// SETTINGS (Added this section)
// ==========================================

export async function getSettings(req, res, next) {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (err) {
    next(err);
  }
}

export async function updateSettings(req, res, next) {
  try {
    let settings = await Settings.findOne();
    if (!settings) settings = new Settings();

    // Update only the fields provided
    Object.assign(settings, req.body);
    await settings.save();

    res.json(settings);
  } catch (err) {
    next(err);
  }
}