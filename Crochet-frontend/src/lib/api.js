// Central API client. All backend calls go through this file so we can
// change the base URL, add auth headers, or swap fetch for axios in one place.

// const BASE = import.meta.env.VITE_API_URL || "/api";
const BASE = "https://YOUR-RAILWAY-URL.up.railway.app/api"; // Hardcoded temporarily


class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

async function request(path, options = {}) {
const res = await fetch(`${BASE}${path}`, {
  cache: "no-store",
  headers: {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  },
  ...options,
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

export const api = {
  get: (path) => request(path),
  post: (path, body) =>
    request(path, { method: "POST", body: JSON.stringify(body) }),
  patch: (path, body) =>
    request(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" }),
};

export const productsApi = {
  list: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return api.get(`/products${qs ? `?${qs}` : ""}`);
  },
  bySlug: (slug) => api.get(`/products/${slug}`),
  byId: (id) => api.get(`/products/id/${id}`),
};

export const checkoutApi = {
  createSession: (items, email) =>
    api.post("/checkout/session", {
      items: items.map((i) => ({ id: i.id, quantity: i.qty || 1 })),
      email,
    }),
  getOrder: (sessionId) => api.get(`/checkout/order/${sessionId}`),
};
