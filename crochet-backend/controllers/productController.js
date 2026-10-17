import Product from "../models/Product.js";

/**
 * GET /api/products
 * Query: ?category=Bags&status=active&featured=true&search=tote&sort=price-asc&limit=20&page=1
 */
export async function listProducts(req, res, next) {
  try {
    const {
      category,
      status = "active",
      featured,
      search,
      sort = "createdAt-desc",
      limit = 20,
      page = 1,
    } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (featured === "true") filter.featured = true;
    if (search) filter.$text = { $search: search };

    const sortMap = {
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      "createdAt-desc": { createdAt: -1 },
      "createdAt-asc": { createdAt: 1 },
      "name-asc": { name: 1 },
    };
    const sortBy = sortMap[sort] || sortMap["createdAt-desc"];

    const skip = (Number(page) - 1) * Number(limit);

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortBy).skip(skip).limit(Number(limit)),
      Product.countDocuments(filter),
    ]);

    res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/products/:slug
 */
export async function getProductBySlug(req, res, next) {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/products/id/:id
 * (for admin — slug lookups are for public)
 */
export async function getProductById(req, res, next) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json(product);
  } catch (err) {
    next(err);
  }
}