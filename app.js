// ==========================================================================
// ALLYOUNEED — Storefront Core Engine & State Management
// ==========================================================================

class AllyouneedStore {
  constructor() {
    this.products = PRODUCTS_DATA;
    this.brands = BRANDS_LIST;
    this.categories = CATEGORIES_LIST;

    // State
    this.cart = this.loadCart();
    this.wishlist = this.loadWishlist();
    this.compareList = [];
    this.activeBrand = "all";
    this.activeCategory = "all";
    this.searchQuery = "";
    this.maxPrice = 3500;
    this.sortBy = "featured";
    this.activeCoupon = null;
    this.discountPercent = 0;

    // Modal state
    this.currentQuickViewProduct = null;
    this.selectedColor = null;
    this.selectedStorage = null;

    this.init();
  }

  init() {
    this.applyInitialTheme();
    this.renderBrandRail();
    this.renderCategoryFilters();
    this.renderProducts();
    this.updateCartUI();
    this.updateWishlistCount();
    this.initSearch();
    this.initEventListeners();
    this.startFlashSaleCountdown();
  }

  // --- Persistence ---
  loadCart() {
    try {
      return JSON.parse(localStorage.getItem("allyouneed_cart")) || [];
    } catch {
      return [];
    }
  }

  saveCart() {
    localStorage.setItem("allyouneed_cart", JSON.stringify(this.cart));
    this.updateCartUI();
  }

  loadWishlist() {
    try {
      return JSON.parse(localStorage.getItem("allyouneed_wishlist")) || [];
    } catch {
      return [];
    }
  }

  saveWishlist() {
    localStorage.setItem("allyouneed_wishlist", JSON.stringify(this.wishlist));
    this.updateWishlistCount();
  }

  // --- Theme Toggle ---
  applyInitialTheme() {
    const savedTheme = localStorage.getItem("allyouneed_theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    this.updateThemeIcon(savedTheme);
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("allyouneed_theme", next);
    this.updateThemeIcon(next);
    this.showToast(`Switched to ${next === 'dark' ? 'Obsidian Dark' : 'Pearl Light'} mode`, "info");
  }

  updateThemeIcon(theme) {
    const themeBtn = document.getElementById("themeToggleBtn");
    if (!themeBtn) return;
    themeBtn.innerHTML = theme === "dark" 
      ? `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
      : `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  }

  // --- Rendering UI Components ---
  renderBrandRail() {
    const rail = document.getElementById("brandScrollTrack");
    if (!rail) return;

    rail.innerHTML = this.brands.map(brand => {
      const isActive = (this.activeBrand.toLowerCase() === brand.name.toLowerCase()) || 
                       (this.activeBrand === "all" && brand.slug === "all");
      return `
        <button class="brand-pill-btn ${isActive ? 'active' : ''}" data-brand="${brand.name}">
          <span>${brand.logoText || brand.name}</span>
          <span class="brand-pill-count">${brand.count}</span>
        </button>
      `;
    }).join("");
  }

  renderCategoryFilters() {
    const container = document.getElementById("categoryPillsRow");
    if (!container) return;

    container.innerHTML = this.categories.map(cat => {
      const isActive = this.activeCategory.toLowerCase() === cat.name.toLowerCase() || 
                       (this.activeCategory === "all" && cat.slug === "all");
      return `
        <button class="category-filter-btn ${isActive ? 'active' : ''}" data-category="${cat.name}">
          <span>${cat.name}</span>
        </button>
      `;
    }).join("");
  }

  getFilteredProducts() {
    return this.products.filter(item => {
      // Brand filter
      if (this.activeBrand !== "all" && item.brand.toLowerCase() !== this.activeBrand.toLowerCase()) {
        return false;
      }
      // Category filter
      if (this.activeCategory !== "all" && item.category.toLowerCase() !== this.activeCategory.toLowerCase()) {
        return false;
      }
      // Price filter
      if (item.price > this.maxPrice) {
        return false;
      }
      // Search query
      if (this.searchQuery.trim() !== "") {
        const q = this.searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesBrand = item.brand.toLowerCase().includes(q);
        const matchesTagline = item.tagline.toLowerCase().includes(q);
        const matchesChip = item.specs.chipset.toLowerCase().includes(q);
        if (!matchesName && !matchesBrand && !matchesTagline && !matchesChip) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (this.sortBy === "price-low") return a.price - b.price;
      if (this.sortBy === "price-high") return b.price - a.price;
      if (this.sortBy === "rating") return b.rating - a.rating;
      return 0; // default featured
    });
  }

  renderProducts() {
    const grid = document.getElementById("productsGrid");
    const countDisplay = document.getElementById("resultsCountDisplay");
    if (!grid) return;

    const filtered = this.getFilteredProducts();

    if (countDisplay) {
      countDisplay.innerHTML = `Showing <strong>${filtered.length}</strong> premium devices`;
    }

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="empty-catalog-state">
          <div class="empty-catalog-icon">🔍</div>
          <h3>No matching technology found</h3>
          <p style="color: var(--text-tertiary); margin: 0.5rem 0 1.5rem;">Try adjusting your search criteria or resetting filters to explore all brands.</p>
          <button class="btn-primary" id="resetCatalogFiltersBtn">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById("resetCatalogFiltersBtn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => this.resetFilters());
      }
      return;
    }

    grid.innerHTML = filtered.map(item => {
      const isWishlisted = this.wishlist.includes(item.id);
      const isCompared = this.compareList.includes(item.id);

      return `
        <article class="product-card" data-id="${item.id}">
          <div class="card-top">
            ${item.badge ? `<span class="badge-pill ${item.badgeType}">${item.badge}</span>` : ''}
            
            <div class="card-actions-top">
              <button class="card-action-icon-btn ${isWishlisted ? 'active' : ''}" 
                      title="Wishlist" 
                      onclick="window.storeApp.toggleWishlist('${item.id}')">
                <svg width="16" height="16" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </button>
              <button class="card-action-icon-btn ${isCompared ? 'active' : ''}" 
                      title="Compare specs" 
                      onclick="window.storeApp.toggleCompare('${item.id}')">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
              </button>
            </div>

            <img class="product-img" src="${item.image}" alt="${item.name}" loading="lazy" />

            <div class="quick-view-trigger-overlay">
              <button class="quick-view-btn" onclick="window.storeApp.openQuickView('${item.id}')">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/></svg>
                Quick View
              </button>
            </div>
          </div>

          <div class="card-body">
            <div class="card-meta-row">
              <span class="card-brand">${item.brand}</span>
              <span class="card-rating">★ ${item.rating} <span style="color: var(--text-tertiary); font-weight: 400;">(${item.reviewsCount})</span></span>
            </div>

            <h3 class="card-title" title="${item.name}">${item.name}</h3>
            <p class="card-specs-line">${item.specs.chipset} • ${item.specs.display.split(',')[0]}</p>

            <div class="card-swatches">
              ${item.colors.slice(0, 4).map(c => `
                <span class="swatch-dot" style="background-color: ${c.hex}" title="${c.name}"></span>
              `).join('')}
              ${item.colors.length > 4 ? `<span style="font-size: 0.72rem; color: var(--text-tertiary);">+${item.colors.length - 4}</span>` : ''}
            </div>

            <div class="card-bottom-row">
              <div class="card-price-group">
                <span class="card-price">$${item.price.toLocaleString()}</span>
                ${item.originalPrice ? `<span class="card-original-price">$${item.originalPrice.toLocaleString()}</span>` : ''}
              </div>

              <button class="add-to-cart-btn" onclick="window.storeApp.addToCart('${item.id}')">
                <svg width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Add
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // --- Cart Drawer Management ---
  addToCart(productId, customColor = null, customStorage = null) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    const color = customColor || product.colors[0].name;
    const storageOption = customStorage || product.storageOptions[0];
    const finalPrice = product.price + (storageOption ? storageOption.priceOffset : 0);

    const existingIndex = this.cart.findIndex(
      item => item.id === productId && item.color === color && item.storage === storageOption.size
    );

    if (existingIndex > -1) {
      this.cart[existingIndex].quantity += 1;
    } else {
      this.cart.push({
        id: productId,
        name: product.name,
        brand: product.brand,
        image: product.image,
        color: color,
        storage: storageOption ? storageOption.size : "Standard",
        price: finalPrice,
        quantity: 1
      });
    }

    this.saveCart();
    this.openCartDrawer();
    this.showToast(`Added ${product.name} to your bag!`, "success");
  }

  updateQuantity(index, delta) {
    if (!this.cart[index]) return;
    this.cart[index].quantity += delta;
    if (this.cart[index].quantity <= 0) {
      this.cart.splice(index, 1);
    }
    this.saveCart();
  }

  removeFromCart(index) {
    if (!this.cart[index]) return;
    const removed = this.cart.splice(index, 1);
    this.saveCart();
    this.showToast(`Removed ${removed[0].name}`, "info");
  }

  updateCartUI() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update Badges
    const badgeEls = document.querySelectorAll(".cart-count-badge");
    badgeEls.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? "grid" : "none";
    });

    // Update Drawer Elements
    const container = document.getElementById("cartItemsContainer");
    const subtotalEl = document.getElementById("cartSubtotalDisplay");
    const discountEl = document.getElementById("cartDiscountDisplay");
    const totalEl = document.getElementById("cartTotalDisplay");
    const shippingProgress = document.getElementById("shippingProgressFill");
    const shippingText = document.getElementById("shippingGoalText");

    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-message">
          <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;">🛒</div>
          <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">Your bag is empty</h4>
          <p style="font-size: 0.85rem;">Explore top flagship tech & mobiles to get started.</p>
        </div>
      `;
    } else {
      container.innerHTML = this.cart.map((item, idx) => `
        <div class="cart-item-card">
          <img class="cart-item-img" src="${item.image}" alt="${item.name}" />
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-variant">${item.color} • ${item.storage}</p>
            <div class="cart-item-controls">
              <div class="quantity-stepper">
                <button class="stepper-btn" onclick="window.storeApp.updateQuantity(${idx}, -1)">−</button>
                <span class="stepper-value">${item.quantity}</span>
                <button class="stepper-btn" onclick="window.storeApp.updateQuantity(${idx}, 1)">+</button>
              </div>
              <span class="cart-item-price">$${(item.price * item.quantity).toLocaleString()}</span>
              <button class="cart-item-remove-btn" onclick="window.storeApp.removeFromCart(${idx})" title="Remove item">
                <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      `).join("");
    }

    // Calculations
    const discountAmount = subtotal * this.discountPercent;
    const finalTotal = Math.max(0, subtotal - discountAmount);

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toLocaleString()}`;
    if (discountEl) discountEl.textContent = `-$${discountAmount.toLocaleString()}`;
    if (totalEl) totalEl.textContent = `$${finalTotal.toLocaleString()}`;

    // Free shipping threshold ($1,000)
    const threshold = 1000;
    if (shippingProgress && shippingText) {
      const pct = Math.min(100, Math.round((subtotal / threshold) * 100));
      shippingProgress.style.width = `${pct}%`;
      if (subtotal >= threshold) {
        shippingText.innerHTML = `🎉 <strong>Congratulations!</strong> You unlocked Free 2-Hour Express Delivery!`;
      } else {
        shippingText.innerHTML = `Add <strong>$${(threshold - subtotal).toLocaleString()}</strong> more for <strong>Free 2-Hour Express Delivery</strong>`;
      }
    }
  }

  applyCoupon(code) {
    const clean = code.trim().toUpperCase();
    if (clean === "ALLYOUNEED10" || clean === "TECHVIP") {
      this.activeCoupon = clean;
      this.discountPercent = 0.10;
      this.updateCartUI();
      this.showToast("Coupon applied! 10% instant discount", "success");
    } else {
      this.showToast("Invalid code. Try 'ALLYOUNEED10'", "fire");
    }
  }

  openCartDrawer() {
    const backdrop = document.getElementById("cartBackdrop");
    const drawer = document.getElementById("cartDrawer");
    if (backdrop && drawer) {
      backdrop.classList.add("active");
      drawer.classList.add("active");
      document.body.style.overflow = "hidden";
    }
  }

  closeCartDrawer() {
    const backdrop = document.getElementById("cartBackdrop");
    const drawer = document.getElementById("cartDrawer");
    if (backdrop && drawer) {
      backdrop.classList.remove("active");
      drawer.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // --- Quick View Modal ---
  openQuickView(productId) {
    const product = this.products.find(p => p.id === productId);
    if (!product) return;

    this.currentQuickViewProduct = product;
    this.selectedColor = product.colors[0];
    this.selectedStorage = product.storageOptions[0];

    const modal = document.getElementById("quickViewModal");
    if (!modal) return;

    // Populate data
    document.getElementById("qvBrand").textContent = product.brand;
    document.getElementById("qvTitle").textContent = product.name;
    document.getElementById("qvTagline").textContent = product.tagline;
    document.getElementById("qvDescription").textContent = product.description;
    document.getElementById("qvMainImage").src = product.image;
    document.getElementById("qvSelectedColorName").textContent = this.selectedColor.name;

    this.updateQuickViewPrice();

    // Thumbs
    const thumbsContainer = document.getElementById("qvThumbsRow");
    if (thumbsContainer) {
      thumbsContainer.innerHTML = product.gallery.map((img, i) => `
        <img class="quickview-thumb ${i === 0 ? 'active' : ''}" 
             src="${img}" 
             onclick="window.storeApp.switchQuickViewImage('${img}', this)" />
      `).join("");
    }

    // Color Swatches
    const colorsContainer = document.getElementById("qvColorsRow");
    if (colorsContainer) {
      colorsContainer.innerHTML = product.colors.map((c, i) => `
        <button class="color-option-btn ${i === 0 ? 'active' : ''}" 
                style="background-color: ${c.hex};" 
                title="${c.name}"
                onclick="window.storeApp.selectQuickViewColor('${c.name}', this)">
        </button>
      `).join("");
    }

    // Storage Options
    const storageContainer = document.getElementById("qvStorageRow");
    if (storageContainer) {
      storageContainer.innerHTML = product.storageOptions.map((s, i) => `
        <button class="storage-btn ${i === 0 ? 'active' : ''}" 
                onclick="window.storeApp.selectQuickViewStorage('${s.size}', this)">
          ${s.size} ${s.priceOffset > 0 ? `(+$${s.priceOffset})` : ''}
        </button>
      `).join("");
    }

    // Tech Specs mini table
    const specsContainer = document.getElementById("qvSpecsMini");
    if (specsContainer) {
      specsContainer.innerHTML = `
        <div class="specs-mini-row"><span class="specs-mini-key">Display</span><span class="specs-mini-val">${product.specs.display}</span></div>
        <div class="specs-mini-row"><span class="specs-mini-key">Chipset</span><span class="specs-mini-val">${product.specs.chipset}</span></div>
        <div class="specs-mini-row"><span class="specs-mini-key">Camera</span><span class="specs-mini-val">${product.specs.camera}</span></div>
        <div class="specs-mini-row"><span class="specs-mini-key">Battery</span><span class="specs-mini-val">${product.specs.battery}</span></div>
        <div class="specs-mini-row"><span class="specs-mini-key">OS</span><span class="specs-mini-val">${product.specs.os}</span></div>
      `;
    }

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  updateQuickViewPrice() {
    const product = this.currentQuickViewProduct;
    if (!product) return;
    const finalPrice = product.price + (this.selectedStorage ? this.selectedStorage.priceOffset : 0);
    const priceEl = document.getElementById("qvPrice");
    const origPriceEl = document.getElementById("qvOrigPrice");

    if (priceEl) priceEl.textContent = `$${finalPrice.toLocaleString()}`;
    if (origPriceEl) {
      origPriceEl.textContent = product.originalPrice 
        ? `$${(product.originalPrice + (this.selectedStorage ? this.selectedStorage.priceOffset : 0)).toLocaleString()}` 
        : '';
    }
  }

  switchQuickViewImage(src, thumbEl) {
    const mainImg = document.getElementById("qvMainImage");
    if (mainImg) mainImg.src = src;
    document.querySelectorAll(".quickview-thumb").forEach(t => t.classList.remove("active"));
    if (thumbEl) thumbEl.classList.add("active");
  }

  selectQuickViewColor(colorName, btnEl) {
    if (!this.currentQuickViewProduct) return;
    this.selectedColor = this.currentQuickViewProduct.colors.find(c => c.name === colorName);
    document.getElementById("qvSelectedColorName").textContent = colorName;
    document.querySelectorAll(".color-option-btn").forEach(b => b.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");
  }

  selectQuickViewStorage(storageSize, btnEl) {
    if (!this.currentQuickViewProduct) return;
    this.selectedStorage = this.currentQuickViewProduct.storageOptions.find(s => s.size === storageSize);
    document.querySelectorAll(".storage-btn").forEach(b => b.classList.remove("active"));
    if (btnEl) btnEl.classList.add("active");
    this.updateQuickViewPrice();
  }

  addCurrentQuickViewToCart() {
    if (!this.currentQuickViewProduct) return;
    this.addToCart(
      this.currentQuickViewProduct.id, 
      this.selectedColor ? this.selectedColor.name : null, 
      this.selectedStorage
    );
    this.closeQuickView();
  }

  closeQuickView() {
    const modal = document.getElementById("quickViewModal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  // --- Wishlist Management ---
  toggleWishlist(productId) {
    const index = this.wishlist.indexOf(productId);
    const product = this.products.find(p => p.id === productId);
    if (index > -1) {
      this.wishlist.splice(index, 1);
      this.showToast(`Removed from Wishlist`, "info");
    } else {
      this.wishlist.push(productId);
      this.showToast(`Saved ${product ? product.name : 'Item'} to Wishlist`, "success");
    }
    this.saveWishlist();
    this.renderProducts();
  }

  updateWishlistCount() {
    const badge = document.getElementById("wishlistCountBadge");
    if (badge) {
      badge.textContent = this.wishlist.length;
      badge.style.display = this.wishlist.length > 0 ? "grid" : "none";
    }
  }

  // --- Comparison Dock Management ---
  toggleCompare(productId) {
    const idx = this.compareList.indexOf(productId);
    const product = this.products.find(p => p.id === productId);

    if (idx > -1) {
      this.compareList.splice(idx, 1);
      this.showToast(`Removed from comparison`, "info");
    } else {
      if (this.compareList.length >= 3) {
        this.showToast(`You can compare up to 3 devices maximum`, "fire");
        return;
      }
      this.compareList.push(productId);
      this.showToast(`Added ${product.name} to comparison`, "success");
    }

    this.updateCompareDock();
    this.renderProducts();
  }

  updateCompareDock() {
    const dock = document.getElementById("compareDock");
    const thumbsContainer = document.getElementById("compareDockThumbs");
    const countDisplay = document.getElementById("compareCountDisplay");

    if (!dock) return;

    if (this.compareList.length === 0) {
      dock.classList.remove("active");
      return;
    }

    dock.classList.add("active");
    if (countDisplay) {
      countDisplay.textContent = `${this.compareList.length}/3`;
    }

    if (thumbsContainer) {
      thumbsContainer.innerHTML = this.compareList.map(id => {
        const p = this.products.find(item => item.id === id);
        return p ? `
          <div class="compare-slot" title="${p.name}">
            <img src="${p.image}" alt="${p.name}" />
          </div>
        ` : '';
      }).join("");
    }
  }

  openCompareModal() {
    if (this.compareList.length === 0) return;
    const modal = document.getElementById("compareModal");
    const content = document.getElementById("compareModalContent");
    if (!modal || !content) return;

    const items = this.compareList.map(id => this.products.find(p => p.id === id)).filter(Boolean);

    content.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
        <h2 style="font-size: 1.5rem; font-weight: 800;">Flagship Side-by-Side Comparison</h2>
        <button class="btn-secondary" style="padding: 0.4rem 1rem; font-size: 0.82rem;" onclick="window.storeApp.clearCompare()">Clear All</button>
      </div>

      <div style="overflow-x: auto;">
        <table class="compare-table">
          <thead>
            <tr>
              <th>Feature</th>
              ${items.map(p => `
                <th style="color: var(--text-primary); text-align: center;">
                  <img src="${p.image}" style="max-height: 120px; margin: 0 auto 0.75rem; object-fit: contain;" />
                  <div style="font-weight: 800; font-size: 1rem;">${p.name}</div>
                  <div style="color: var(--accent-cyan-light); font-size: 1.1rem; margin-top: 0.25rem;">$${p.price.toLocaleString()}</div>
                  <button class="add-to-cart-btn" style="margin-top: 0.75rem;" onclick="window.storeApp.addToCart('${p.id}')">Add to Bag</button>
                </th>
              `).join("")}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Brand</th>
              ${items.map(p => `<td style="text-align: center;">${p.brand}</td>`).join("")}
            </tr>
            <tr>
              <th>Category</th>
              ${items.map(p => `<td style="text-align: center;">${p.category}</td>`).join("")}
            </tr>
            <tr>
              <th>Display</th>
              ${items.map(p => `<td style="text-align: center;">${p.specs.display}</td>`).join("")}
            </tr>
            <tr>
              <th>Chipset / Processor</th>
              ${items.map(p => `<td style="text-align: center; color: var(--accent-cyan-light); font-weight: 700;">${p.specs.chipset}</td>`).join("")}
            </tr>
            <tr>
              <th>Camera Optics</th>
              ${items.map(p => `<td style="text-align: center;">${p.specs.camera}</td>`).join("")}
            </tr>
            <tr>
              <th>Battery & Power</th>
              ${items.map(p => `<td style="text-align: center;">${p.specs.battery}</td>`).join("")}
            </tr>
            <tr>
              <th>Operating System</th>
              ${items.map(p => `<td style="text-align: center;">${p.specs.os}</td>`).join("")}
            </tr>
            <tr>
              <th>Connectivity</th>
              ${items.map(p => `<td style="text-align: center;">${p.specs.connectivity}</td>`).join("")}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  closeCompareModal() {
    const modal = document.getElementById("compareModal");
    if (modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    }
  }

  clearCompare() {
    this.compareList = [];
    this.updateCompareDock();
    this.closeCompareModal();
    this.renderProducts();
    this.showToast("Comparison cleared", "info");
  }

  // --- Instant Search Autocomplete ---
  initSearch() {
    const searchInput = document.getElementById("mainSearchInput");
    const dropdown = document.getElementById("searchResultsDropdown");
    const clearBtn = document.getElementById("searchClearBtn");

    if (!searchInput || !dropdown) return;

    searchInput.addEventListener("input", (e) => {
      const q = e.target.value.trim();
      this.searchQuery = q;

      if (clearBtn) {
        clearBtn.classList.toggle("active", q.length > 0);
      }

      if (q.length < 2) {
        dropdown.classList.remove("active");
        this.renderProducts();
        return;
      }

      const matches = this.products.filter(p => 
        p.name.toLowerCase().includes(q.toLowerCase()) || 
        p.brand.toLowerCase().includes(q.toLowerCase()) ||
        p.specs.chipset.toLowerCase().includes(q.toLowerCase())
      ).slice(0, 5);

      if (matches.length > 0) {
        dropdown.innerHTML = matches.map(m => `
          <div class="search-result-item" onclick="window.storeApp.handleSearchSelect('${m.id}')">
            <img class="search-result-img" src="${m.image}" alt="${m.name}" />
            <div class="search-result-info">
              <div class="search-result-title">${m.name}</div>
              <div class="search-result-brand">${m.brand} • ${m.category}</div>
            </div>
            <div class="search-result-price">$${m.price.toLocaleString()}</div>
          </div>
        `).join("");
        dropdown.classList.add("active");
      } else {
        dropdown.innerHTML = `
          <div style="padding: 1rem; text-align: center; color: var(--text-tertiary); font-size: 0.85rem;">
            No tech matches for "${q}"
          </div>
        `;
        dropdown.classList.add("active");
      }

      this.renderProducts();
    });

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        this.searchQuery = "";
        clearBtn.classList.remove("active");
        dropdown.classList.remove("active");
        this.renderProducts();
      });
    }

    // Close search dropdown on click outside
    document.addEventListener("click", (e) => {
      if (!searchInput.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove("active");
      }
    });
  }

  handleSearchSelect(productId) {
    const dropdown = document.getElementById("searchResultsDropdown");
    if (dropdown) dropdown.classList.remove("active");
    this.openQuickView(productId);
  }

  // --- Event Listeners ---
  initEventListeners() {
    // Theme toggle
    const themeBtn = document.getElementById("themeToggleBtn");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => this.toggleTheme());
    }

    // Brand pills click
    document.getElementById("brandScrollTrack")?.addEventListener("click", (e) => {
      const btn = e.target.closest(".brand-pill-btn");
      if (!btn) return;
      const brand = btn.dataset.brand;
      this.activeBrand = (this.activeBrand.toLowerCase() === brand.toLowerCase()) ? "all" : brand;
      this.renderBrandRail();
      this.renderProducts();
    });

    // Category pills click
    document.getElementById("categoryPillsRow")?.addEventListener("click", (e) => {
      const btn = e.target.closest(".category-filter-btn");
      if (!btn) return;
      const category = btn.dataset.category;
      this.activeCategory = (this.activeCategory.toLowerCase() === category.toLowerCase()) ? "all" : category;
      this.renderCategoryFilters();
      this.renderProducts();
    });

    // Price range slider
    const priceSlider = document.getElementById("priceRangeSlider");
    const priceDisplay = document.getElementById("currentPriceMaxDisplay");
    if (priceSlider && priceDisplay) {
      priceSlider.addEventListener("input", (e) => {
        this.maxPrice = Number(e.target.value);
        priceDisplay.textContent = `$${this.maxPrice.toLocaleString()}`;
        this.renderProducts();
      });
    }

    // Sort select
    const sortSelect = document.getElementById("sortProductsSelect");
    if (sortSelect) {
      sortSelect.addEventListener("change", (e) => {
        this.sortBy = e.target.value;
        this.renderProducts();
      });
    }

    // Cart Drawer triggers
    document.getElementById("openCartBtn")?.addEventListener("click", () => this.openCartDrawer());
    document.getElementById("closeCartBtn")?.addEventListener("click", () => this.closeCartDrawer());
    document.getElementById("cartBackdrop")?.addEventListener("click", () => this.closeCartDrawer());

    // Coupon Apply
    document.getElementById("applyCouponBtn")?.addEventListener("click", () => {
      const input = document.getElementById("couponInput");
      if (input) this.applyCoupon(input.value);
    });

    // Checkout simulate
    document.getElementById("checkoutBtn")?.addEventListener("click", () => {
      if (this.cart.length === 0) {
        this.showToast("Your bag is empty! Add products first.", "fire");
        return;
      }
      this.showToast("Processing secure order with Allyouneed Guarantee...", "success");
      setTimeout(() => {
        this.cart = [];
        this.saveCart();
        this.closeCartDrawer();
        this.showToast("🎉 Order placed successfully! Order ID: #AYN-2026-X8", "success");
      }, 1500);
    });

    // Newsletter subscribe
    document.getElementById("newsletterForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("newsletterEmail");
      if (input && input.value) {
        this.showToast(`Welcome! Use code 'ALLYOUNEED10' for 10% off your order!`, "success");
        input.value = "";
      }
    });

    // Modal Close Triggers
    document.getElementById("closeQuickViewBtn")?.addEventListener("click", () => this.closeQuickView());
    document.getElementById("quickViewModal")?.addEventListener("click", (e) => {
      if (e.target.id === "quickViewModal") this.closeQuickView();
    });

    document.getElementById("closeCompareBtn")?.addEventListener("click", () => this.closeCompareModal());
    document.getElementById("compareModal")?.addEventListener("click", (e) => {
      if (e.target.id === "compareModal") this.closeCompareModal();
    });

    document.getElementById("openCompareModalBtn")?.addEventListener("click", () => this.openCompareModal());

    // Reset filters link in sidebar
    document.getElementById("resetFiltersSidebarBtn")?.addEventListener("click", () => this.resetFilters());

    // Header scroll background toggle
    window.addEventListener("scroll", () => {
      const header = document.querySelector(".site-header");
      if (header) {
        header.classList.toggle("scrolled", window.scrollY > 40);
      }
    });
  }

  resetFilters() {
    this.activeBrand = "all";
    this.activeCategory = "all";
    this.searchQuery = "";
    this.maxPrice = 3500;
    this.sortBy = "featured";

    const searchInput = document.getElementById("mainSearchInput");
    if (searchInput) searchInput.value = "";

    const priceSlider = document.getElementById("priceRangeSlider");
    const priceDisplay = document.getElementById("currentPriceMaxDisplay");
    if (priceSlider) priceSlider.value = 3500;
    if (priceDisplay) priceDisplay.textContent = "$3,500";

    const sortSelect = document.getElementById("sortProductsSelect");
    if (sortSelect) sortSelect.value = "featured";

    this.renderBrandRail();
    this.renderCategoryFilters();
    this.renderProducts();
    this.showToast("All filters have been reset", "info");
  }

  // --- Flash Sale Countdown Timer ---
  startFlashSaleCountdown() {
    const hoursEl = document.getElementById("flashHours");
    const minsEl = document.getElementById("flashMins");
    const secsEl = document.getElementById("flashSecs");

    if (!hoursEl || !minsEl || !secsEl) return;

    let totalSeconds = (14 * 3600) + (32 * 60) + 45;

    setInterval(() => {
      if (totalSeconds <= 0) {
        totalSeconds = 24 * 3600;
      }
      totalSeconds -= 1;

      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      hoursEl.textContent = String(h).padStart(2, "0");
      minsEl.textContent = String(m).padStart(2, "0");
      secsEl.textContent = String(s).padStart(2, "0");
    }, 1000);
  }

  // --- Toast System ---
  showToast(message, type = "info") {
    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;

    let icon = "✓";
    if (type === "fire") icon = "🔥";
    if (type === "info") icon = "ℹ";

    toast.innerHTML = `
      <span style="font-size: 1.1rem;">${icon}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  window.storeApp = new AllyouneedStore();
});
