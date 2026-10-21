// For local development, it uses Vite's proxy.
// For production (Netlify), it uses your Railway URL.
const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request(path, options = {}) {
  // Merge headers safely so we don't accidentally drop Content-Type or Authorization
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const res = await fetch(`${BASE}${path}`, {
    cache: "no-store",
    ...options,
    headers,
  });

  const contentType = res.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    throw new ApiError(
      data?.message || `Request failed with status ${res.status}`,
      res.status,
      data
    );
  }

  return data;
}

// Base methods
export const api = {
  get: (path, options = {}) => request(path, { method: "GET", ...options }),
  post: (path, body, options = {}) =>
    request(path, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),
  patch: (path, body, options = {}) =>
    request(path, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),
  delete: (path, options = {}) => request(path, { method: "DELETE", ...options }),
};

// Public store API
export const productsApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/products${qs ? `?${qs}` : ""}`);
  },
  bySlug: (slug) => api.get(`/products/${slug}`),
  byId: (id) => api.get(`/products/id/${id}`),
};

export const checkoutApi = {
  createSession: (items, email, token) => {
    // Safe fallback in case items is undefined
    const safeItems = Array.isArray(items) ? items : [];
    
    return api.post(
      "/checkout/session",
      {
        items: safeItems.map((i) => ({
          id: i.id || i._id,
          quantity: i.qty || 1,
        })),
        email: email || null,
      },
      {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );
  },
  verify: (sessionId) => api.get(`/checkout/verify/${sessionId}`),
};

export const authApi = {
  signup: (name, email, password) =>
    api.post("/auth/signup", { name, email, password }),
  login: (email, password) =>
    api.post("/auth/login", { email, password }),
  getMe: (token) =>
    api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getMyOrders: (token) =>
    api.get("/auth/my-orders", {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Admin API
export const adminApi = {
  login: (email, password) => api.post("/admin/login", { email, password }),

  getOrders: (token, status = "") =>
    api.get(`/admin/orders${status ? `?status=${status}` : ""}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateOrder: (token, id, status) =>
    api.patch(
      `/admin/orders/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ),

  getProducts: (token) =>
    api.get("/admin/products", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  createProduct: (token, product) =>
    api.post("/admin/products", product, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateProduct: (token, id, product) =>
    api.patch(`/admin/products/${id}`, product, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  deleteProduct: (token, id) =>
    api.delete(`/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  deleteProductPermanently: (token, id) =>
    api.delete(`/admin/products/${id}/permanent`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  getSettings: (token) =>
    api.get("/admin/settings", {
      headers: { Authorization: `Bearer ${token}` },
    }),

  updateSettings: (token, settings) =>
    api.patch("/admin/settings", settings, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  toggleProductStatus: (token, id) =>
    api.patch(
      `/admin/products/${id}/toggle`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    ),

  // Special method for uploading files (uses FormData, not JSON)
  uploadImage: async (token, file) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${BASE}/admin/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) throw new ApiError(data.message || "Upload failed", res.status, data);
    return data.url;
  },
};