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
        if (deliveryContainer) {
          deliveryContainer.style.display = 'flex';
          deliveryContainer.classList.remove('sainik-hidden');
        }
        if (takeawayContainer) {
          takeawayContainer.style.display = 'none';
          takeawayContainer.classList.add('sainik-hidden');
        }
      } else {
        tabTakeaway && tabTakeaway.classList.add('active');
        tabDelivery && tabDelivery.classList.remove('active');
        if (takeawayContainer) {
          takeawayContainer.style.display = 'flex';
          takeawayContainer.classList.remove('sainik-hidden');
        }
        if (deliveryContainer) {
          deliveryContainer.style.display = 'none';
          deliveryContainer.classList.add('sainik-hidden');
        }
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

    toggleTheme() {
      const isDark = document.body.classList.toggle('dark-mode');
      try {
        localStorage.setItem('mode', isDark ? 'dark' : 'light');
      } catch(e) {}
      this.syncThemeUI();
    }

    syncThemeUI() {
      let isDark = document.body.classList.contains('dark-mode');
      try {
        const saved = localStorage.getItem('mode');
        if (saved === 'dark' && !isDark) {
          document.body.classList.add('dark-mode');
          isDark = true;
        } else if (saved === 'light' && isDark) {
          document.body.classList.remove('dark-mode');
          isDark = false;
        }
      } catch(e) {}

      const sunIcon = document.querySelector('.sainik-theme-sun');
      const moonIcon = document.querySelector('.sainik-theme-moon');
      if (sunIcon && moonIcon) {
        if (isDark) {
          moonIcon.classList.add('active');
          sunIcon.classList.remove('active');
        } else {
          sunIcon.classList.add('active');
          moonIcon.classList.remove('active');
        }
      }
    }

    updateUI() {
      const total = this.getTotalCount();

      // Update floating cart bar
      const floatBar = document.getElementById('sainik-floating-cart-bar');
      const floatCount = document.getElementById('sainik-float-count');
      if (floatBar && floatCount) {
        floatCount.innerText = (total === 0 ? '1' : total) + ((total === 0 || total === 1) ? ' Item' : ' Items');
        floatBar.style.display = 'inline-flex';
      }

      // Add helper class to body
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
      this.syncThemeUI();
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

        const phone = document.getElementById('sainik-order-phone')?.value.trim() || '';
        const address = document.getElementById('sainik-order-address')?.value.trim() || '';
        const notes = document.getElementById('sainik-order-notes')?.value.trim() || '';

        let text = '*🛵 NEW HOME DELIVERY ORDER — SAINIK RASOI*\n';
        text += '================================\n';
        text += '*Customer Information:*\n';
        if (phone) text += '• Phone: ' + phone + '\n';
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
        const phone = document.getElementById('sainik-takeaway-phone')?.value.trim() || '';
        const notes = document.getElementById('sainik-takeaway-notes')?.value.trim() || '';

        let text = '*🍽️ NEW TAKEAWAY / DINE-IN ORDER — SAINIK RASOI*\n';
        text += '================================\n';
        text += '*Customer Information:*\n';
        if (phone) text += '• Phone: ' + phone + '\n';
        text += '• Order Type: Takeaway / Pickup at Sainik Rasoi\n';
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
      this.syncThemeUI();
    }
  }

  // ==========================================================================
  // SWIGGY/ZOMATO STYLE CATEGORY SELECTOR & BOTTOM SHEET NAVIGATION
  // ==========================================================================
  class SainikMenuNav {
    constructor() {
      this.categories = [
        { id: "starters", name: "Starters", shortName: "Starters", count: 21, icon: "🌶️" },
        { id: "snacks", name: "Snacks", shortName: "Snacks", count: 3, icon: "🥟" },
        { id: "paneer", name: "Paneer", shortName: "Paneer", count: 7, icon: "🧀" },
        { id: "main-course", name: "Main Course", shortName: "Main Course", count: 7, icon: "🍛" },
        { id: "rice", name: "Rice & Biryani", shortName: "Rice", count: 4, isNew: true, icon: "🍚" },
        { id: "thali", name: "Special Thali", shortName: "Thali", count: 2, icon: "🍱" },
        { id: "parathas", name: "Parathas", shortName: "Parathas", count: 4, icon: "🫓" },
        { id: "breads", name: "Breads", shortName: "Breads", count: 5, icon: "🍞" },
        { id: "chinese-fast-food", name: "Chinese & Fast Food", shortName: "Chinese", count: 8, icon: "🥢" },
        { id: "soups", name: "Soups", shortName: "Soups", count: 3, icon: "🥣" },
        { id: "raita-sides", name: "Raita & Sides", shortName: "Raita & Sides", count: 4, icon: "🥗" },
        { id: "beverages", name: "Beverages", shortName: "Beverages", count: 3, icon: "🥤" },
        { id: "desserts", name: "Desserts", shortName: "Desserts", count: 4, icon: "🍨" }
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
      this.bindPillsClick();
      this.bindScrollSpy();
      this.updateActivePills();
    }

    bindPillsClick() {
      const scrollContainer = document.querySelector('.sainik-cat-pills-scroll');
      if (scrollContainer) {
        scrollContainer.addEventListener('click', (e) => {
          const pill = e.target.closest('.sainik-cat-pill-item');
          if (pill) {
            e.preventDefault();
            e.stopPropagation();
            const catId = pill.getAttribute('data-cat-id');
            if (catId) {
              this.scrollToCategory(catId);
            }
          }
        });
      }
    }

    open() {
      const overlay = document.getElementById('sainik-cat-overlay');
      const sheet = document.getElementById('sainik-cat-sheet');
      if (overlay) overlay.classList.add('open');
      if (sheet) sheet.classList.add('open');
      this.updateActiveRow();
    }

    close() {
      const overlay = document.getElementById('sainik-cat-overlay');
      const sheet = document.getElementById('sainik-cat-sheet');
      if (overlay) overlay.classList.remove('open');
      if (sheet) sheet.classList.remove('open');
    }

    toggle() {
      const sheet = document.getElementById('sainik-cat-sheet');
      if (sheet && sheet.classList.contains('open')) {
        this.close();
      } else {
        this.open();
      }
    }

    getHeaderOffset() {
      const isHeaderFixed = !!document.querySelector('.pxl-header-elementor-sticky.pxl-header-fixed');
      const stickyBar = document.querySelector('.sainik-sticky-cat-bar');
      const barHeight = stickyBar ? stickyBar.offsetHeight : 58;
      // Fixed desktop header is 70px. Leave 15px clean spacing below sticky category bar
      return isHeaderFixed ? (70 + barHeight + 15) : (barHeight + 15);
    }

    scrollToCategory(catId) {
      this.close();

      this.activeId = catId;
      this.updateActivePills();
      this.updateActiveRow();

      // Lock scrollspy during programmatic smooth scrolling so it doesn't fight or reverse
      this.isProgrammaticScroll = true;
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        this.isProgrammaticScroll = false;
      }, 1600);

      const headerOffset = this.getHeaderOffset();

      if (catId === 'all') {
        const firstSection = document.getElementById(this.categories[0]?.id) || document.querySelector('.sainik-sticky-cat-bar');
        if (firstSection) {
          const targetRect = firstSection.getBoundingClientRect();
          const currentScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
          const offsetPosition = Math.max(0, Math.round(currentScroll + targetRect.top - headerOffset));
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
        return;
      }

      const target = document.getElementById(catId);
      if (!target) {
        console.warn('Target category section not found:', catId);
        return;
      }

      // Smoothly scroll to the target section with fixed navbar header offset
      const targetRect = target.getBoundingClientRect();
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop || 0;
      const offsetPosition = Math.max(0, Math.round(currentScroll + targetRect.top - headerOffset));

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    renderSheetItems() {
      const container = document.getElementById('sainik-cat-list-items');
      if (!container) return;

      container.innerHTML = this.categories.map(cat => {
        const newBadge = cat.isNew ? '<span class="sainik-cat-new-badge">NEW</span>' : '';
        const isActive = this.activeId === cat.id ? ' active' : '';
        return `
          <div class="sainik-cat-row${isActive}" data-cat-id="${cat.id}" role="button" tabindex="0">
            <div class="sainik-cat-row-left">
              <span class="sainik-cat-row-name">${cat.name}</span>
              ${newBadge}
            </div>
            <span class="sainik-cat-row-count">${cat.count}</span>
          </div>
        `;
      }).join('');

      // Add direct touch/click listeners
      container.querySelectorAll('.sainik-cat-row').forEach(row => {
        row.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const catId = row.getAttribute('data-cat-id');
          if (catId) {
            this.scrollToCategory(catId);
          }
        });
      });
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
      const allBtn = document.querySelector('.sainik-cat-pill-all');
      const pillsContainer = document.querySelector('.sainik-cat-pills-scroll');
      let activePillEl = null;

      document.querySelectorAll('.sainik-cat-pill-item').forEach(pill => {
        const id = pill.getAttribute('data-cat-id');
        if (id === this.activeId) {
          pill.classList.add('active');
          activePillEl = pill;
        } else {
          pill.classList.remove('active');
        }
      });

      if (allBtn) {
        if (!this.activeId || this.activeId === 'all') {
          allBtn.classList.add('active');
          if (pillsContainer) {
            pillsContainer.scrollTo({ left: 0, behavior: 'smooth' });
          }
        } else {
          allBtn.classList.remove('active');
        }
      }

      if (activePillEl && pillsContainer) {
        // Horizontally center active pill in container ONLY - NO vertical window scroll!
        const pillLeft = activePillEl.offsetLeft;
        const pillWidth = activePillEl.offsetWidth;
        const containerWidth = pillsContainer.clientWidth;
        const targetScrollLeft = pillLeft - (containerWidth / 2) + (pillWidth / 2);
        pillsContainer.scrollTo({
          left: Math.max(0, Math.round(targetScrollLeft)),
          behavior: 'smooth'
        });
      }
    }

    bindScrollSpy() {
      const getSections = () => this.categories.map(c => document.getElementById(c.id)).filter(Boolean);
      let ticking = false;

      // Unlock programmatic scroll lock ONLY on real user gesture (mouse wheel or finger touch-drag)
      const unlock = () => {
        if (this.isProgrammaticScroll) {
          this.isProgrammaticScroll = false;
          clearTimeout(this.scrollTimeout);
        }
      };
      window.addEventListener('wheel', unlock, { passive: true });
      window.addEventListener('touchmove', unlock, { passive: true });

      window.addEventListener('scroll', () => {
        if (this.isProgrammaticScroll) return;

        if (!ticking) {
          window.requestAnimationFrame(() => {
            if (this.isProgrammaticScroll) {
              ticking = false;
              return;
            }

            const sections = getSections();
            if (!sections.length) {
              ticking = false;
              return;
            }

            // Sync sticky bar top position if sticky desktop header is active
            const isHeaderFixed = !!document.querySelector('.pxl-header-elementor-sticky.pxl-header-fixed');
            document.body.classList.toggle('has-sticky-header-active', isHeaderFixed);
            const stickyBar = document.querySelector('.sainik-sticky-cat-bar');
            if (stickyBar) {
              const expectedTop = isHeaderFixed ? '70px' : '0px';
              if (stickyBar.style.top !== expectedTop) {
                stickyBar.style.top = expectedTop;
              }
            }

            const headerOffset = this.getHeaderOffset();
            const threshold = headerOffset + 35;

            // Check if user is scrolled near the bottom of the page
            const scrollBottom = window.innerHeight + (window.pageYOffset || document.documentElement.scrollTop || 0);
            const docHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            const isBottom = scrollBottom >= (docHeight - 60);

            let current = 'all';
            if (isBottom) {
              current = sections[sections.length - 1].id;
            } else {
              for (let i = 0; i < sections.length; i++) {
                const rect = sections[i].getBoundingClientRect();
                if (rect.top <= threshold) {
                  current = sections[i].id;
                }
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
