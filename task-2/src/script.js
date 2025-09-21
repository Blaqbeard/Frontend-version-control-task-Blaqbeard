// FlexiSaf Tech Store - JavaScript Application
// Task 2 Intermediate Deliverable - ES6 Features and Array Methods Implementation
// Built with modern JavaScript practices and comprehensive array method usage

const products = [
  {
    id: "p001",
    name: "FlexiSaf Ultrabook 14",
    brand: "FlexiSaf",
    category: "Laptops",
    price: 650000,
    rating: 4.6,
    stock: 12,
    image: "images/ultrabook14.jpeg",
    description: "14-inch ultrabook with Intel i7, 16GB RAM, 512GB SSD.",
  },
  {
    id: "p002",
    name: "FlexiSaf Pro 15",
    brand: "FlexiSaf",
    category: "Laptops",
    price: 890000,
    rating: 4.8,
    stock: 7,
    image: "images/laptop15.jpeg",
    description: "15-inch powerhouse for creators, 32GB RAM, 1TB SSD.",
  },
  {
    id: "p003",
    name: "FlexiTab 11",
    brand: "FlexiSaf",
    category: "Tablets",
    price: 280000,
    rating: 4.3,
    stock: 20,
    image: "images/tab11.jpeg",
    description: "11-inch tablet with stylus support and LTE.",
  },
  {
    id: "p004",
    name: "FlexiTab Mini 8",
    brand: "FlexiSaf",
    category: "Tablets",
    price: 165000,
    rating: 4.1,
    stock: 30,
    image: "images/tabmini8.jpeg",
    description: "Compact 8-inch tablet, perfect for reading and notes.",
  },
  {
    id: "p005",
    name: "FlexiBuds Pro",
    brand: "FlexiSaf",
    category: "Audio",
    price: 85000,
    rating: 4.5,
    stock: 50,
    image: "images/budspro.jpeg",
    description: "Active noise-cancelling earbuds with 24h battery.",
  },
  {
    id: "p006",
    name: "FlexiSound Bar 2.1",
    brand: "FlexiSaf",
    category: "Audio",
    price: 140000,
    rating: 4.2,
    stock: 18,
    image: "images/soundbar2.1.jpeg",
    description: "Immersive sound bar with wireless subwoofer.",
  },
  {
    id: "p007",
    name: "FlexiWatch S",
    brand: "FlexiSaf",
    category: "Wearables",
    price: 120000,
    rating: 4.0,
    stock: 35,
    image: "images/watchS.jpeg",
    description: "Smartwatch with AMOLED display and GPS.",
  },
  {
    id: "p008",
    name: "FlexiWatch X",
    brand: "FlexiSaf",
    category: "Wearables",
    price: 185000,
    rating: 4.7,
    stock: 15,
    image: "images/watchX.jpeg",
    description: "Premium smartwatch with ECG and LTE.",
  },
  {
    id: "p009",
    name: "FlexiCharge 65W GaN",
    brand: "FlexiSaf",
    category: "Accessories",
    price: 35000,
    rating: 4.4,
    stock: 60,
    image: "images/charge65.jpeg",
    description: "Compact fast charger with dual USB-C ports.",
  },
  {
    id: "p010",
    name: "FlexiType Mechanical Keyboard",
    brand: "FlexiSaf",
    category: "Accessories",
    price: 90000,
    rating: 4.6,
    stock: 22,
    image: "images/mechanicalkeyboard.jpeg",
    description: "Hot-swappable mechanical keyboard with RGB.",
  },
  {
    id: "p011",
    name: "FlexiCam 4K",
    brand: "FlexiSaf",
    category: "Cameras",
    price: 320000,
    rating: 4.4,
    stock: 9,
    image: "images/cam4k.jpeg",
    description: "Compact 4K mirrorless camera with dual AF.",
  },
  {
    id: "p012",
    name: "FlexiLens 50mm f/1.8",
    brand: "FlexiSaf",
    category: "Cameras",
    price: 110000,
    rating: 4.3,
    stock: 14,
    image: "images/lens50.jpeg",
    description: "Fast prime lens for portraits and low light.",
  },
];

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================
// Helper functions that demonstrate various ES6 features and array methods

// Format currency for Nigerian Naira display
const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

// Extract unique categories from product list
const uniqueCategories = (items) =>
  Array.from(new Set(items.map((p) => p.category))).sort();

// Search through products by name, brand, category, or description
const searchProducts = (items, query) => {
  const q = query.trim().toLowerCase();
  if (!q) return items;
  return items.filter(({ name, brand, category, description }) => {
    const searchText =
      `${name} ${brand} ${category} ${description}`.toLowerCase();
    return searchText.includes(q);
  });
};

// Filter products by specific category
const filterByCategory = (items, category) =>
  category && category !== "all"
    ? items.filter((p) => p.category === category)
    : items;

// Sort products based on different criteria
const sortProducts = (items, mode) => {
  const list = [...items]; // Create a copy to avoid mutating original
  switch (mode) {
    case "price-asc":
      return list.sort((a, b) => a.price - b.price);
    case "price-desc":
      return list.sort((a, b) => b.price - a.price);
    case "rating-desc":
      return list.sort((a, b) => b.rating - a.rating);
    case "name-asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "relevance":
    default:
      return list;
  }
};

// Chain all filter operations together
const applyAllFilters = (items, { query, category, sort }) => {
  return sortProducts(
    filterByCategory(searchProducts(items, query), category),
    sort
  );
};

// Product management utilities demonstrating splice() method
const productManager = {
  // Add product at specific position
  addProduct: (productList, newProduct, position = 0) => {
    const updatedList = [...productList]; // Create copy to avoid mutation
    updatedList.splice(position, 0, newProduct); // Insert at position
    return updatedList;
  },

  // Remove product by ID
  removeProduct: (productList, productId) => {
    const updatedList = [...productList];
    const index = updatedList.findIndex((p) => p.id === productId);
    if (index !== -1) {
      updatedList.splice(index, 1); // Remove item at index
    }
    return updatedList;
  },

  // Move product from one position to another
  reorderProducts: (productList, fromIndex, toIndex) => {
    const updatedList = [...productList];
    const [movedItem] = updatedList.splice(fromIndex, 1); // Remove item
    updatedList.splice(toIndex, 0, movedItem); // Insert at new position
    return updatedList;
  },
};

// Local storage helper functions
const storage = {
  get: (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      // ignore storage errors
    }
  },
};

// ============================================================================
// CART CLASS
// ============================================================================
// Shopping cart implementation using ES6 class syntax

const STORAGE_KEY = "flexisaf-tech-store/cart";

class Cart {
  constructor() {
    // Load cart data from localStorage
    const saved = storage.get(STORAGE_KEY, { items: {} });
    // Convert to Map for efficient lookups
    this.items = new Map(
      Object.entries(saved.items).map(([id, qty]) => [id, qty])
    );
  }

  // Persist cart to localStorage
  save() {
    const plain = Object.fromEntries(this.items);
    storage.set(STORAGE_KEY, { items: plain });
  }

  // Add product to cart
  add(productId, quantity = 1) {
    const existing = this.items.get(productId) || 0;
    this.items.set(productId, existing + quantity);
    this.save();
  }

  // Update product quantity
  update(productId, quantity) {
    if (quantity <= 0) {
      this.items.delete(productId);
    } else {
      this.items.set(productId, quantity);
    }
    this.save();
  }

  // Remove product from cart
  remove(productId) {
    this.items.delete(productId);
    this.save();
  }

  // Clear all items from cart
  clear() {
    this.items.clear();
    this.save();
  }

  // Get cart items with product details
  lineItems(products) {
    return [...this.items.entries()]
      .map(([id, qty]) => {
        const product = products.find((p) => p.id === id);
        if (!product) return null;
        const lineTotal = qty * product.price;
        return { id, quantity: qty, product, lineTotal };
      })
      .filter(Boolean); // Remove null values
  }

  // Calculate cart totals
  totals(products) {
    const subtotal = this.lineItems(products).reduce(
      (acc, li) => acc + li.lineTotal,
      0
    );
    const tax = Math.round(subtotal * 0.075);
    const total = subtotal + tax;
    return {
      subtotal,
      tax,
      total,
      formatted: {
        subtotal: formatCurrency(subtotal),
        tax: formatCurrency(tax),
        total: formatCurrency(total),
      },
    };
  }
}

// ============================================================================
// APPLICATION STATE AND INITIALIZATION
// ============================================================================
// Application state management and DOM element references

const state = {
  query: "",
  category: "all",
  sort: "relevance",
};

// Create cart instance
const cart = new Cart();

// DOM element references
const productGrid = document.getElementById("productGrid");
const categorySelect = document.getElementById("categorySelect");
const sortSelect = document.getElementById("sortSelect");
const searchInput = document.getElementById("searchInput");
const cartItemsEl = document.getElementById("cartItems");
const subtotalEl = document.getElementById("subtotal");
const taxEl = document.getElementById("tax");
const totalEl = document.getElementById("total");
const clearCartBtn = document.getElementById("clearCartBtn");
const featuredGrid = document.getElementById("featuredGrid");
const reorderFeaturedBtn = document.getElementById("reorderFeatured");

// Mobile cart toggle elements
const cartToggleBtn = document.getElementById("cartToggleBtn");
const closeCartBtn = document.getElementById("closeCartBtn");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartCount = document.getElementById("cartCount");
const cartAside = document.querySelector("aside");

// ============================================================================
// RENDERING FUNCTIONS
// ============================================================================
// Functions to render products, featured products, and cart

// Populate categories dropdown
const categories = uniqueCategories(products);
categories.forEach((cat) => {
  const opt = document.createElement("option");
  opt.value = cat;
  opt.textContent = cat;
  categorySelect.appendChild(opt);
});

// Featured products - high-rated items for showcase
let featuredProducts = products
  .filter((p) => p.rating >= 4.5) // Get high-rated products
  .slice(0, 4); // Take first 4 products

// Render featured products grid
const renderFeaturedProducts = () => {
  featuredGrid.innerHTML = featuredProducts
    .map(
      (p, index) => `
      <article class="product-card" data-index="${index}">
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}" loading="lazy" />
        </div>
        <div class="product-info">
          <h4 class="product-title">${p.name}</h4>
          <div class="product-rating">
            <span class="stars">★ ${p.rating.toFixed(1)}</span>
          </div>
          <div class="product-price">${formatCurrency(p.price)}</div>
        </div>
      </article>
    `
    )
    .join("");
};

// Render main products grid
const renderProducts = () => {
  const list = applyAllFilters(products, state);
  productGrid.innerHTML = list
    .map(
      (p) => `
    <article class="product-card">
      <div class="product-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-info">
        <h3 class="product-title">${p.name}</h3>
        <p class="product-category">${p.category}</p>
        <div class="product-rating">
          <span class="stars">★ ${p.rating.toFixed(1)}</span>
        </div>
        <div class="product-price">${formatCurrency(p.price)}</div>
        <button data-add="${p.id}" class="add-to-cart">Add to Cart</button>
      </div>
    </article>
  `
    )
    .join("");
};

// Render shopping cart
const renderCart = () => {
  const lineItems = cart.lineItems(products);

  // Update cart count
  const totalItems = [...cart.items.values()].reduce(
    (sum, qty) => sum + qty,
    0
  );
  cartCount.textContent = totalItems;

  if (lineItems.length === 0) {
    cartItemsEl.innerHTML = `<div class="cart-empty">Your cart is empty.</div>`;
  } else {
    cartItemsEl.innerHTML = lineItems
      .map(
        ({ id, quantity, product, lineTotal }) => `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div class="cart-item-info">
          <p class="cart-item-title">${product.name}</p>
          <p class="cart-item-price">${formatCurrency(product.price)} each</p>
        </div>
        <div class="cart-item-controls">
          <div class="quantity-controls">
            <button data-dec="${id}" class="quantity-btn">-</button>
            <span class="quantity">${quantity}</span>
            <button data-inc="${id}" class="quantity-btn">+</button>
          </div>
          <button data-remove="${id}" class="remove-item">×</button>
          </div>
      </div>
    `
      )
      .join("");
  }

  // Update totals display
  const totals = cart.totals(products);
  subtotalEl.textContent = totals.formatted.subtotal;
  taxEl.textContent = totals.formatted.tax;
  totalEl.textContent = totals.formatted.total;
};

// ============================================================================
// MOBILE CART TOGGLE FUNCTIONS
// ============================================================================
// Functions to handle mobile cart toggle functionality

// Open cart on mobile
const openCart = () => {
  cartAside.classList.add("cart-open");
  cartBackdrop.classList.add("show");
  document.body.style.overflow = "hidden"; // Prevent background scrolling
};

// Close cart on mobile
const closeCart = () => {
  cartAside.classList.remove("cart-open");
  cartBackdrop.classList.remove("show");
  document.body.style.overflow = ""; // Restore scrolling
};

// Check if we're on mobile
const isMobile = () => window.innerWidth <= 768;

// ============================================================================
// EVENT HANDLERS
// ============================================================================
// Event listeners for user interactions

// Search input handler
searchInput.addEventListener("input", (e) => {
  state.query = e.target.value;
  renderProducts();
});

// Category filter handler
categorySelect.addEventListener("change", (e) => {
  state.category = e.target.value;
  renderProducts();
});

// Sort handler
sortSelect.addEventListener("change", (e) => {
  state.sort = e.target.value;
  renderProducts();
});

// Product grid click handler for add to cart
productGrid.addEventListener("click", (e) => {
  const id = e.target?.dataset?.add;
  if (!id) return;
  cart.add(id, 1);
  renderCart();
});

// Cart items click handler using destructuring
cartItemsEl.addEventListener("click", (e) => {
  const { inc, dec, remove } = e.target.dataset;
  if (inc) {
    const current = cart.items.get(inc) || 0;
    cart.update(inc, current + 1);
    renderCart();
  } else if (dec) {
    const current = cart.items.get(dec) || 0;
    cart.update(dec, Math.max(0, current - 1));
    renderCart();
  } else if (remove) {
    cart.remove(remove);
    renderCart();
  }
});

// Note: Quantity input change handler removed since we're using span elements instead of input elements

// Clear cart handler
clearCartBtn.addEventListener("click", () => {
  cart.clear();
  renderCart();
});

// Mobile cart toggle handlers
cartToggleBtn.addEventListener("click", () => {
  openCart();
});

closeCartBtn.addEventListener("click", () => {
  closeCart();
});

cartBackdrop.addEventListener("click", () => {
  closeCart();
});

// Handle window resize to close cart if switching to desktop
window.addEventListener("resize", () => {
  if (!isMobile() && cartAside.classList.contains("cart-open")) {
    closeCart();
  }
});

// Reorder featured products - demonstrates splice() method
reorderFeaturedBtn.addEventListener("click", () => {
  // Randomly reorder featured products using splice()
  const randomIndex1 = Math.floor(Math.random() * featuredProducts.length);
  const randomIndex2 = Math.floor(Math.random() * featuredProducts.length);

  if (randomIndex1 !== randomIndex2) {
    // Use splice() to reorder products
    featuredProducts = productManager.reorderProducts(
      featuredProducts,
      randomIndex1,
      randomIndex2
    );
    renderFeaturedProducts();

    // Log the reordering for demonstration
    const product1 = featuredProducts[randomIndex2].name;
    const product2 = featuredProducts[randomIndex1].name;
    console.log(
      `Moved "${product1}" to position ${
        randomIndex2 + 1
      }, "${product2}" to position ${randomIndex1 + 1}`
    );
  }
});

// ============================================================================
// APPLICATION INITIALIZATION
// ============================================================================
// Initialize the application

// Initial render of all components
renderProducts();
renderFeaturedProducts();
renderCart();
