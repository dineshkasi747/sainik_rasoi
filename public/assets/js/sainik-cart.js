/**
 * Sainik Rasoi - Luxury WhatsApp Cart & 7km Delivery Validation System
 * + Swiggy/Zomato Style Category Selector & ScrollSpy Navigation
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'sainik_veg_cart_v2';
  const WHATSAPP_NUMBER = '919876543210';
  const MAX_DELIVERY_RADIUS_KM = 7.0;
  // Restaurant coordinates (Sainik Rasoi)
  const RESTAURANT_COORDS = { lat: 28.6139, lng: 77.2090 };

  class SainikCart {
    constructor() {
      this.items = this.loadCart();
      this.orderType = 'delivery'; // 'delivery' | 'takeaway'
      this.distanceKm = 3.0; // default estimated distance
      
      // Auto-bind on DOM ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.init());
      } else {
        this.init();
      }
    }

    loadCart() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
      } catch (e) {
        console.error('Error loading cart:', e);
        return {};
      }
    }

    saveCart() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      } catch (e) {
        console.error('Error saving cart:', e);
      }
    }

    getTotalCount() {
      return Object.values(this.items).reduce((sum, it) => sum + (it.qty || 0), 0);
    }

    add(name, img) {
      if (!name) return;
      if (!this.items[name]) {
        this.items[name] = { qty: 1, img: img || '/assets/food/cat_paneer.jpg' };
      } else {
        this.items[name].qty += 1;
      }
      this.saveCart();
      this.updateUI();
      this.showToast('Added ' + name + ' to your selection');
    }

    updateQty(name, delta) {
      if (!this.items[name]) return;
      this.items[name].qty += delta;
      if (this.items[name].qty <= 0) {
        delete this.items[name];
      }
      this.saveCart();
      this.updateUI();
    }

    deleteItem(name) {
      if (this.items[name]) {
        delete this.items[name];
        this.saveCart();
        this.updateUI();
      }
    }

    clear() {
      this.items = {};
      this.saveCart();
      this.updateUI();
      this.showToast('Selection cleared');
    }

    setOrderType(type) {
      this.orderType = type;
      const tabDelivery = document.getElementById('sainik-tab-delivery');
      const tabTakeaway = document.getElementById('sainik-tab-takeaway');
      const deliveryContainer = document.getElementById('sainik-delivery-inputs-container');
      const takeawayContainer = document.getElementById('sainik-takeaway-inputs-container');

      if (type === 'delivery') {
        tabDelivery && tabDelivery.classList.add('active');
        tabTakeaway && tabTakeaway.classList.remove('active');
        if (deliveryContainer) deliveryContainer.style.display = 'flex';
        if (takeawayContainer) takeawayContainer.style.display = 'none';
      } else {
        tabTakeaway && tabTakeaway.classList.add('active');
        tabDelivery && tabDelivery.classList.remove('active');
        if (takeawayContainer) takeawayContainer.style.display = 'flex';
        if (deliveryContainer) deliveryContainer.style.display = 'none';
      }

      this.updateDeliveryStatus();
    }

    setDistance(km) {
      this.distanceKm = Math.round(km * 10) / 10;
      const display = document.getElementById('sainik-distance-display');
      const slider = document.getElementById('sainik-distance-range');
      if (display) display.innerText = this.distanceKm.toFixed(1);
      if (slider) slider.value = this.distanceKm;
      this.updateDeliveryStatus();
    }

    onAddressInput(val) {
      // reactive input handler
    }

    detectGPSLocation() {
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser. Please adjust distance manually using the slider.');
        return;
      }

      const gpsBtn = document.getElementById('sainik-gps-btn');
      if (gpsBtn) gpsBtn.innerText = '⏳ Locating...';

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          if (gpsBtn) gpsBtn.innerText = '📍 Detect GPS';
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;
          
          // Haversine distance in km
          const R = 6371;
          const dLat = (userLat - RESTAURANT_COORDS.lat) * Math.PI / 180;
          const dLng = (userLng - RESTAURANT_COORDS.lng) * Math.PI / 180;
          const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(RESTAURANT_COORDS.lat * Math.PI / 180) * Math.cos(userLat * Math.PI / 180) *
                    Math.sin(dLng / 2) * Math.sin(dLng / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          const calculatedKm = Math.max(0.5, Math.min(15.0, Math.round((R * c) * 10) / 10));

          this.setDistance(calculatedKm);
          this.showToast('GPS Distance detected: ' + calculatedKm + ' km');
        },
        (err) => {
          if (gpsBtn) gpsBtn.innerText = '📍 Detect GPS';
          alert('Could not access GPS location (' + err.message + '). You can set distance manually using the slider.');
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    }

    updateDeliveryStatus() {
      const banner = document.getElementById('sainik-delivery-status-banner');
      const icon = document.getElementById('sainik-status-icon');
      const text = document.getElementById('sainik-status-text');
      const checkoutBtn = document.getElementById('sainik-whatsapp-btn');
      const checkoutText = document.getElementById('sainik-whatsapp-btn-text');

      if (this.orderType === 'takeaway') {
        if (checkoutBtn) checkoutBtn.classList.remove('disabled');
        if (checkoutText) checkoutText.innerText = 'Send Takeaway Order via WhatsApp';
        return;
      }

      // In Delivery Mode
      if (this.distanceKm <= MAX_DELIVERY_RADIUS_KM) {
        if (banner) banner.className = 'sainik-status-banner success';
        if (icon) icon.innerText = '✓';
        if (text) {
          text.innerHTML = '<strong>Delivery Available!</strong> (~' + this.distanceKm.toFixed(1) + ' km from Sainik Rasoi)';
        }
        if (checkoutBtn) checkoutBtn.classList.remove('disabled');
        if (checkoutText) checkoutText.innerText = 'Send Order via WhatsApp';
      } else {
        if (banner) banner.className = 'sainik-status-banner error';
        if (icon) icon.innerText = '⚠️';
        if (text) {
          text.innerHTML = '<strong>Delivery Unavailable:</strong> Selected distance (~' + this.distanceKm.toFixed(1) + ' km) exceeds our <strong>7.0 km fresh-delivery zone</strong>.';
        }
        if (checkoutBtn) checkoutBtn.classList.add('disabled');
        if (checkoutText) checkoutText.innerText = 'Delivery Not Available (> 7 km)';
      }
    }

    open() {
      const overlay = document.getElementById('sainik-cart-overlay');
      const drawer = document.getElementById('sainik-cart-drawer');
      if (overlay) overlay.classList.add('active');
      if (drawer) drawer.classList.add('active');
      document.body.classList.add('sainik-cart-open');
      document.body.style.overflow = 'hidden';
      this.renderDrawerItems();
      this.updateDeliveryStatus();
    }

    close() {
      const overlay = document.getElementById('sainik-cart-overlay');
      const drawer = document.getElementById('sainik-cart-drawer');
      if (overlay) overlay.classList.remove('active');
      if (drawer) drawer.classList.remove('active');
      document.body.classList.remove('sainik-cart-open');
      document.body.style.overflow = '';
    }

    showToast(msg) {
      const toast = document.getElementById('sainik-toast');
      if (!toast) return;
      toast.innerText = '✓ ' + msg;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2200);
    }

    renderDrawerItems() {
      const container = document.getElementById('sainik-cart-items-container');
      const footer = document.getElementById('sainik-cart-footer');
      if (!container) return;

      const keys = Object.keys(this.items);
      if (keys.length === 0) {
        container.innerHTML = `
          <div class="sainik-cart-empty">
            <div class="sainik-cart-empty-icon">🍲</div>
            <h4>Your selection is empty</h4>
            <p>Explore our pure vegetarian menu and tap + Add on any dish.</p>
          </div>
        `;
        if (footer) footer.style.display = 'none';
        return;
      }

      if (footer) footer.style.display = 'block';

      let html = '';
      keys.forEach((name) => {
        const item = this.items[name];
        const safeName = name.replace(/'/g, "\\'");
        html += `
          <div class="sainik-cart-item">
            <img src="${item.img}" alt="${name}" class="sainik-cart-thumb" />
            <div class="sainik-cart-item-info">
              <div class="sainik-cart-item-name">${name}</div>
              <div class="sainik-cart-qty-ctrl">
                <button type="button" class="sainik-qty-btn" onclick="window.sainikCart.updateQty('${safeName}', -1)">−</button>
                <span class="sainik-qty-num">${item.qty}</span>
                <button type="button" class="sainik-qty-btn" onclick="window.sainikCart.updateQty('${safeName}', 1)">+</button>
              </div>
            </div>
            <button type="button" class="sainik-item-delete-btn" onclick="window.sainikCart.deleteItem('${safeName}')" title="Remove">✕</button>
          </div>
        `;
      });
      container.innerHTML = html;
    }

    updateUI() {
      const total = this.getTotalCount();

      // Update floating cart bar
      const floatBar = document.getElementById('sainik-floating-cart-bar');
      const floatCount = document.getElementById('sainik-float-count');
      if (floatBar && floatCount) {
        floatCount.innerText = total + (total === 1 ? ' Item' : ' Items');
        floatBar.style.display = total > 0 ? 'inline-flex' : 'none';
      }

      // Add helper class to body for dual button positioning
      if (total > 0) {
        document.body.classList.add('sainik-has-cart');
      } else {
        document.body.classList.remove('sainik-has-cart');
      }

      // Update native header counters
      document.querySelectorAll('.pxl-cart-counters').forEach((el) => {
        el.innerText = total;
      });

      // Update drawer badge
      const drawerBadge = document.getElementById('sainik-drawer-badge');
      if (drawerBadge) {
        drawerBadge.innerText = total + (total === 1 ? ' item' : ' items');
      }

      this.renderDrawerItems();
    }

    checkoutWhatsApp() {
      const keys = Object.keys(this.items);
      if (keys.length === 0) {
        alert('Your selection is empty! Please add some dishes first.');
        return;
      }

      if (this.orderType === 'delivery') {
        if (this.distanceKm > MAX_DELIVERY_RADIUS_KM) {
          alert('Currently deliveries are not available for your area.\n\nDeliveries are available only within 7 km radius of Sainik Rasoi (~' + this.distanceKm.toFixed(1) + ' km detected).\n\nPlease switch to Takeaway / Dine-in or call us directly at +91 98765 43210.');
          return;
        }

        const custName = document.getElementById('sainik-order-name')?.value.trim() || '';
        const address = document.getElementById('sainik-order-address')?.value.trim() || '';
        const notes = document.getElementById('sainik-order-notes')?.value.trim() || '';

        let text = '*🛵 NEW HOME DELIVERY ORDER — SAINIK RASOI*\n';
        text += '================================\n';
        text += '*Customer Information:*\n';
        if (custName) text += '• Name: ' + custName + '\n';
        if (address) text += '• Address: ' + address + '\n';
        text += '• Distance: ~' + this.distanceKm.toFixed(1) + ' km (within 7 km zone)\n';
        text += '--------------------------------\n';

        text += '*Items Ordered:*\n';
        let totalItems = 0;
        keys.forEach((name, idx) => {
          const qty = this.items[name].qty;
          totalItems += qty;
          text += (idx + 1) + '. ' + name + ' — Qty: ' + qty + '\n';
        });

        text += '--------------------------------\n';
        text += '*Total Items:* ' + totalItems + '\n';

        if (notes) {
          text += '*Special Instructions:* ' + notes + '\n';
        }

        text += '================================\n';
        text += 'Please confirm my delivery order and estimated arrival time. Thank you! 🙏';

        const url = 'https://api.whatsapp.com/send?phone=' + WHATSAPP_NUMBER + '&text=' + encodeURIComponent(text);
        window.open(url, '_blank');
      } else {
        // Takeaway / Dine-in
        const custName = document.getElementById('sainik-takeaway-name')?.value.trim() || '';
        const table = document.getElementById('sainik-takeaway-table')?.value.trim() || '';
        const notes = document.getElementById('sainik-takeaway-notes')?.value.trim() || '';

        let text = '*🍽️ NEW TAKEAWAY / DINE-IN ORDER — SAINIK RASOI*\n';
        text += '================================\n';
        text += '*Customer Information:*\n';
        if (custName) text += '• Name: ' + custName + '\n';
        if (table) text += '• Table / Pickup Time: ' + table + '\n';
        text += '--------------------------------\n';

        text += '*Items Ordered:*\n';
        let totalItems = 0;
        keys.forEach((name, idx) => {
          const qty = this.items[name].qty;
          totalItems += qty;
          text += (idx + 1) + '. ' + name + ' — Qty: ' + qty + '\n';
        });

        text += '--------------------------------\n';
        text += '*Total Items:* ' + totalItems + '\n';

        if (notes) {
          text += '*Special Instructions:* ' + notes + '\n';
        }

        text += '================================\n';
        text += 'Please confirm my order preparation. Thank you! 🙏';

        const url = 'https://api.whatsapp.com/send?phone=' + WHATSAPP_NUMBER + '&text=' + encodeURIComponent(text);
        window.open(url, '_blank');
      }
    }

    init() {
      // Connect to native header shopping basket buttons
      document.querySelectorAll('.pxl-cart-sidebar-button, .pxl-side-panel-cart').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      });

      this.updateUI();
    }
  }

  // ==========================================================================
  // SWIGGY/ZOMATO STYLE CATEGORY SELECTOR & BOTTOM SHEET NAVIGATION
  // ==========================================================================
  class SainikMenuNav {
    constructor() {
      this.categories = [
        { id: "starters", name: "Starters & Appetizers", shortName: "Starters", count: 21, icon: "🌶️" },
        { id: "snacks", name: "Snacks & Chaat", shortName: "Snacks", count: 3, icon: "🥟" },
        { id: "paneer", name: "Paneer Delicacies", shortName: "Paneer", count: 7, icon: "🧀" },
        { id: "main-course", name: "Main Course & Dals", shortName: "Main Course", count: 7, icon: "🍛" },
        { id: "rice", name: "Rice & Biryani", shortName: "Rice & Biryani", count: 4, icon: "🍚", isNew: true },
        { id: "thali", name: "Rasoi Special Thali", shortName: "Special Thali", count: 2, icon: "🍱" },
        { id: "parathas", name: "Stuffed Parathas", shortName: "Parathas", count: 4, icon: "🫓" },
        { id: "breads", name: "Breads & Phulkas", shortName: "Breads", count: 5, icon: "🍞" },
        { id: "chinese-fast-food", name: "Chinese & Fast Food", shortName: "Chinese", count: 8, icon: "🥢" },
        { id: "soups", name: "Soups", shortName: "Soups", count: 3, icon: "🥣" },
        { id: "raita-sides", name: "Raita & Sides", shortName: "Raita & Sides", count: 4, icon: "🥗" },
        { id: "beverages", name: "Fluids & Beverages", shortName: "Beverages", count: 3, icon: "🥤" },
        { id: "desserts", name: "Desserts & Mithai", shortName: "Desserts", count: 4, icon: "🍨" }
      ];
      this.activeId = "starters";

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.init());
      } else {
        this.init();
      }
    }

    init() {
      this.renderSheetItems();
      this.bindScrollSpy();
    }

    open() {
      const overlay = document.getElementById('sainik-cat-overlay');
      const sheet = document.getElementById('sainik-cat-sheet');
      if (overlay) overlay.classList.add('open');
      if (sheet) sheet.classList.add('open');
      document.body.style.overflow = 'hidden';
      this.updateActiveRow();
    }

    close() {
      const overlay = document.getElementById('sainik-cat-overlay');
      const sheet = document.getElementById('sainik-cat-sheet');
      if (overlay) overlay.classList.remove('open');
      if (sheet) sheet.classList.remove('open');
      document.body.style.overflow = '';
    }

    toggle() {
      const sheet = document.getElementById('sainik-cat-sheet');
      if (sheet && sheet.classList.contains('open')) {
        this.close();
      } else {
        this.open();
      }
    }

    scrollToCategory(catId) {
      this.close();
      this.activeId = catId;
      this.updateActivePills();
      this.updateActiveRow();

      setTimeout(() => {
        const target = document.getElementById(catId);
        if (!target) {
          console.warn('Target category not found:', catId);
          return;
        }

        const headerOffset = 130;
        const targetRect = target.getBoundingClientRect();
        const absoluteTop = window.pageYOffset + targetRect.top;
        const offsetPosition = Math.max(0, absoluteTop - headerOffset);

        try {
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        } catch (e) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 60);
    }

    renderSheetItems() {
      const container = document.getElementById('sainik-cat-list-items');
      if (!container) return;

      container.innerHTML = this.categories.map(cat => {
        const newBadge = cat.isNew ? '<span class="sainik-cat-new-badge">NEW</span>' : '';
        const isActive = this.activeId === cat.id ? ' active' : '';
        return `
          <div class="sainik-cat-row${isActive}" data-cat-id="${cat.id}" onclick="window.sainikMenuNav.scrollToCategory('${cat.id}')">
            <div class="sainik-cat-row-left">
              <span class="sainik-cat-row-name">${cat.name}</span>
              ${newBadge}
            </div>
            <span class="sainik-cat-row-count">${cat.count}</span>
          </div>
        `;
      }).join('');
    }

    updateActiveRow() {
      document.querySelectorAll('.sainik-cat-row').forEach(row => {
        const id = row.getAttribute('data-cat-id');
        if (id === this.activeId) {
          row.classList.add('active');
        } else {
          row.classList.remove('active');
        }
      });
    }

    updateActivePills() {
      document.querySelectorAll('.sainik-cat-pill-item').forEach(pill => {
        const id = pill.getAttribute('data-cat-id');
        if (id === this.activeId) {
          pill.classList.add('active');
          try {
            pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          } catch(e) {}
        } else {
          pill.classList.remove('active');
        }
      });
    }

    bindScrollSpy() {
      const sections = this.categories.map(c => document.getElementById(c.id)).filter(Boolean);
      if (!sections.length) return;

      let ticking = false;
      window.addEventListener('scroll', () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            const scrollPos = window.scrollY + 140;
            let current = sections[0].id;
            for (let i = 0; i < sections.length; i++) {
              if (sections[i].offsetTop <= scrollPos) {
                current = sections[i].id;
              }
            }
            if (this.activeId !== current) {
              this.activeId = current;
              this.updateActivePills();
              this.updateActiveRow();
            }
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  }

  // Expose globally
  window.sainikCart = new SainikCart();
  window.sainikMenuNav = new SainikMenuNav();
})();
