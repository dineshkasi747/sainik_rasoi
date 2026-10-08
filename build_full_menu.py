import subprocess
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Load the clean original template from base_template.html
with open('public/menu-02/base_template.html', 'r', encoding='utf-8') as f:
    orig_html = f.read()

CATEGORIES = [
    {
        "id": "starters",
        "title": "Starters",
        "subtitle": "🌶️ Sizzling Tandoori & Crispy Starters",
        "icon": "🌶️",
        "items": [
            {"name": "Paneer Tikka", "desc": "Clay-oven roasted cottage cheese skewers marinated in spiced hung yogurt & aromatic herbs.", "img": "/assets/food/paneer_tikka.jpg"},
            {"name": "Mushroom Tikka", "desc": "Plump button mushrooms marinated in spiced tandoori yogurt and charred to perfection in clay oven.", "img": "/assets/food/mushroom_tikka.jpg"},
            {"name": "Malai Chaap", "desc": "Succulent soya chaap grilled and tossed in rich cashew-cream marinade with delicate spices.", "img": "/assets/food/malai_chaap.jpg"},
            {"name": "Malai Tikka", "desc": "Melt-in-mouth cottage cheese cubes coated in rich cashew-cream glaze, cardamom and roasted.", "img": "/assets/food/malai_tikka.jpg"},
            {"name": "Muska Chaap", "desc": "Tender soya chaap roasted in tandoor and tossed generously with sizzling butter & chaat masala.", "img": "/assets/food/muska_chaap.jpg"},
            {"name": "Hara Bhara Kabab", "desc": "Crispy golden patties of spinach, green peas, paneer and herbs topped with fried cashew nut.", "img": "/assets/food/hara_bhara_kabab.jpg"},
            {"name": "Dahi Ke Sole", "desc": "Crispy golden bread rolls filled with velvety spiced hung curd, bell peppers and mild herbs.", "img": "/assets/food/dahi_ke_sole.jpg"},
            {"name": "Dahi Kabab", "desc": "Delicate melt-in-mouth golden patties made of creamy hung yogurt, cottage cheese and cumin.", "img": "/assets/food/dahi_kabab.jpg"},
            {"name": "Tito Chakhna", "desc": "Crunchy rasoi party mix of masala peanuts, crispy sev, corn, diced onions, chilies & tangy spices.", "img": "/assets/food/tito_chakhna.jpg"},
            {"name": "Paneer 65", "desc": "Crispy and tangy South Indian style batter-fried paneer chunks tempered with curry leaves.", "img": "/assets/food/paneer_65.jpg"},
            {"name": "Chilly Paneer", "desc": "Cottage cheese cubes wok-tossed in spicy Indo-Chinese chili sauce with bell peppers & scallions.", "img": "/assets/food/chilly_paneer.jpg"},
            {"name": "Veg Manchurian Dry", "desc": "Crispy minced vegetable dumplings wok-tossed in garlic, ginger, and savory soy sauce.", "img": "/assets/food/veg_manchurian_dry.jpg"},
            {"name": "Chilly Mushroom", "desc": "Button mushrooms sautéed with bell peppers, green chilies and garlic in spicy soy glaze.", "img": "/assets/food/chilly_mushroom.jpg"},
            {"name": "Crispy Corn", "desc": "Crunchy golden sweet corn kernels tossed with zesty peri-peri spices and fresh lime.", "img": "/assets/food/crispy_corn.jpg"},
            {"name": "Veg Roll", "desc": "Crisp flaky paratha wrap loaded with sautéed spiced vegetables, onions, and mint chutney.", "img": "/assets/food/veg_roll.jpg"},
            {"name": "French Fries", "desc": "Crispy golden potato fingers seasoned with salt and herbs, served piping hot.", "img": "/assets/food/french_fries.jpg"},
            {"name": "Sweet Corn Chaat", "desc": "Tender steamed golden corn tossed with butter, chaat spices, and fresh coriander.", "img": "/assets/food/sweet_corn_chaat.jpg"},
            {"name": "Peanut Masala", "desc": "Crunchy roasted peanuts mixed with diced onions, juicy tomatoes, green chilies & chaat masala.", "img": "/assets/food/peanut_masala.jpg"},
            {"name": "Black Chana Chaat", "desc": "Protein-rich boiled black chickpeas seasoned with lemon juice, onions, tomatoes, and herbs.", "img": "/assets/food/black_chana_chaat.jpg"},
            {"name": "Roasted Papad", "desc": "Crispy fire-roasted spiced lentil wafers served crisp with fresh mint dip & onion salad.", "img": "/assets/food/roasted_papad.jpg"},
            {"name": "Papad", "desc": "Crispy spiced lentil wafers, roasted or fried to golden crispness.", "img": "/assets/food/papad_roasted_fried.jpg"},
        ]
    },
    {
        "id": "snacks",
        "title": "Snacks",
        "subtitle": "🥟 Classic Street Delights & Evening Treats",
        "icon": "🥟",
        "items": [
            {"name": "Samosa", "desc": "Golden flaky pastry shells stuffed with spiced potato mash, green peas, and fragrant herbs.", "img": "/assets/food/samosa_2_pcs.jpg"},
            {"name": "Samosa Chaat", "desc": "Crushed golden samosas layered with spiced chole, sweet tamarind chutney, mint dip & sev.", "img": "/assets/food/samosa_chaat.jpg"},
            {"name": "Chole Bhature", "desc": "Fluffy, golden-fried puffed bhature served with rich Amritsari chickpea curry and pickle.", "img": "/assets/food/chole_bhature.jpg"},
        ]
    },
    {
        "id": "paneer",
        "title": "Paneer",
        "subtitle": "🧀 Signature Royal Cottage Cheese Curries",
        "icon": "🧀",
        "items": [
            {"name": "Paneer Butter Masala", "desc": "Signature rich and creamy tomato-butter curry loaded with soft cottage cheese chunks.", "img": "/assets/food/paneer_butter_masala.jpg"},
            {"name": "Kadhai Paneer", "desc": "Paneer tossed with crunchy bell peppers and onions in freshly ground aromatic kadhai spices.", "img": "/assets/food/kadhai_paneer.jpg"},
            {"name": "Paneer Lababdar", "desc": "Luscious cashew-onion gravy with grated paneer and cottage cheese chunks, finished with cream.", "img": "/assets/food/paneer_lababdar.jpg"},
            {"name": "Paneer Makhani", "desc": "Silky smooth makhani gravy infused with butter, cream, fenugreek and soft paneer cubes.", "img": "/assets/food/paneer_makhani.jpg"},
            {"name": "Shahi Paneer", "desc": "Royal Mughlai specialty cooked in thick, fragrant almond-cashew white gravy with mild spices.", "img": "/assets/food/shahi_paneer.jpg"},
            {"name": "Palak Paneer", "desc": "Fresh garden spinach puree cooked with garlic, mild spices, and soft cottage cheese cubes.", "img": "/assets/food/palak_paneer.jpg"},
            {"name": "Mutter Paneer", "desc": "Tender green peas and cottage cheese simmered in home-style spiced tomato-onion curry.", "img": "/assets/food/mutter_paneer.jpg"},
        ]
    },
    {
        "id": "main-course",
        "title": "Main Course",
        "subtitle": "🍛 Traditional Desi Gravies & Dal Specialties",
        "icon": "🍛",
        "items": [
            {"name": "Dal Makhani", "desc": "Slow-cooked black lentils simmered overnight with butter, dairy cream, and aromatic spices.", "img": "/assets/food/dal_makhani.jpg"},
            {"name": "Dal Tadka", "desc": "Yellow lentils tempered with ghee, cumin seeds, garlic, ginger, and spicy red chilies.", "img": "/assets/food/dal_tadka.jpg"},
            {"name": "Mushroom Do Pyaza", "desc": "Button mushrooms cooked with abundant caramelized onions in a rich, robustly spiced gravy.", "img": "/assets/food/mushroom_do_pyaza.jpg"},
            {"name": "Mix Veg", "desc": "Medley of seasonal farm vegetables sautéed with cumin, ginger, and aromatic garam masala.", "img": "/assets/food/mix_veg.jpg"},
            {"name": "Sev Bhaji", "desc": "Crispy spiced gram flour noodles simmered in zesty, rich Dhaba-style tomato-onion gravy.", "img": "/assets/food/sev_bhaji.jpg"},
            {"name": "Chaap Masala", "desc": "Tender soya chaap chunks marinated and cooked in spicy, thick roasted onion gravy.", "img": "/assets/food/chaap_masala.jpg"},
            {"name": "Aloo Jeera", "desc": "Crisp diced potatoes tempered with cumin seeds, turmeric, green chilies, and fresh coriander.", "img": "/assets/food/aloo_jeera.jpg"},
        ]
    },
    {
        "id": "rice",
        "title": "Rice & Biryani",
        "subtitle": "🍚 Aromatic Dum Biryani, Fragrant Pulao & Basmati Rice",
        "icon": "🍚",
        "is_new": True,
        "items": [
            {"name": "Veg Biryani", "desc": "Fragrant aged basmati rice slow-cooked with fresh garden vegetables, saffron, mint and royal aromatic biryani spices.", "img": "/assets/food/veg_biryani.jpg"},
            {"name": "Veg Pulao", "desc": "Mildly spiced basmati rice sautéed with green peas, diced carrots, beans, whole spices and desi ghee.", "img": "/assets/food/veg_pulao.jpg"},
            {"name": "Jeera Rice", "desc": "Fluffy steamed basmati rice tempered with roasted cumin seeds and fresh coriander in pure ghee.", "img": "/assets/food/jeera_rice.jpg"},
            {"name": "Plain Rice", "desc": "Perfectlys steamed long-grain basmati rice, light and fluffy, ideal accompaniment for dals and curries.", "img": "/assets/food/plain_rice.jpg"},
        ]
    },
    {
        "id": "thali",
        "title": "Special Thali",
        "subtitle": "🍱 Complete Royal Feasts with Curries, Breads & Desserts",
        "icon": "🍱",
        "items": [
            {"name": "Normal Thali", "desc": "Wholesome meal with Dal Tadka, Seasonal Mix Veg, 5 Butter Phulkas, Steamed Rice, Salad & Pickle.", "img": "/assets/food/normal_thali.jpg"},
            {"name": "Paneer Thali", "desc": "Royal vegetarian feast with Paneer Butter Masala, Dal Makhani, 4 Butter Phulkas, Rice, Gulab Jamun & Salad.", "img": "/assets/food/paneer_thali.jpg"},
        ]
    },
    {
        "id": "parathas",
        "title": "Parathas",
        "subtitle": "🫓 Stuffed Tawa Parathas with Amul Butter & Curd",
        "icon": "🫓",
        "items": [
            {"name": "Paneer Paratha", "desc": "Whole wheat flatbread generously stuffed with spiced grated paneer, served with rich Amul butter.", "img": "/assets/food/paneer_paratha.jpg"},
            {"name": "Gobhi Paratha", "desc": "Flaky paratha loaded with freshly grated spiced cauliflower, ginger, and green chilies, served with rich Amul butter.", "img": "/assets/food/gobhi_paratha.jpg"},
            {"name": "Onion Paratha", "desc": "Crispy griddled paratha filled with seasoned crunchy onions, coriander, and carom seeds, served with rich Amul butter.", "img": "/assets/food/onion_paratha.jpg"},
            {"name": "Cheese Sweet Corn Paratha", "desc": "Gooey melted cheese and sweet golden corn kernels stuffed inside flaky golden paratha, served with rich Amul butter.", "img": "/assets/food/cheese_sweet_corn_paratha.jpg"},
        ]
    },
    {
        "id": "breads",
        "title": "Breads",
        "subtitle": "🍞 Hot Tandoori Rotis, Naans & Tawa Phulkas",
        "icon": "🍞",
        "items": [
            {"name": "Tawa Phulka", "desc": "Soft, puffed whole wheat flatbread made fresh on iron tawa.", "img": "/assets/food/tawa_phulka.jpg"},
            {"name": "Butter Tawa Phulka", "desc": "Hot puffed whole wheat phulka brushed generously with melting Amul butter.", "img": "/assets/food/butter_tawa_phulka.jpg"},
            {"name": "Roti", "desc": "Clay-oven baked authentic whole wheat tandoori roti with crisp edges.", "img": "/assets/food/roti_tandoori.jpg"},
            {"name": "Butter Roti", "desc": "Crisp tandoori roti brushed with golden dairy butter.", "img": "/assets/food/butter_roti.jpg"},
            {"name": "Butter Naan", "desc": "Soft, pillowy leavened tandoori bread brushed with melted butter.", "img": "/assets/food/butter_naan.jpg"},
        ]
    },
    {
        "id": "chinese-fast-food",
        "title": "Chinese & Fast Food",
        "subtitle": "🥢 Indo-Chinese Wok Specialties, Momos & Sandwiches",
        "icon": "🥢",
        "items": [
            {"name": "Veg Noodles", "desc": "Wok-tossed noodles with shredded cabbage, carrots, bell peppers in savory soy-garlic sauce.", "img": "/assets/food/veg_noodles.jpg"},
            {"name": "Veg Manchurian", "desc": "Vegetable dumplings simmered in savory, tangy ginger-garlic Chinese gravy.", "img": "/assets/food/veg_manchurian.jpg"},
            {"name": "Veg Momos", "desc": "Steamed Himalayan dumplings packed with minced vegetables, served with fiery spicy red dip.", "img": "/assets/food/veg_momos_6_pcs.jpg"},
            {"name": "Paneer Momos", "desc": "Delicate steamed dumplings stuffed with spiced cottage cheese and herbs, with garlic chutney.", "img": "/assets/food/paneer_momos_6_pcs.jpg"},
            {"name": "Hakka Noodles", "desc": "Classic Kolkata-style Hakka noodles tossed with crunchy vegetables, white pepper & sesame oil.", "img": "/assets/food/hakka_noodles.jpg"},
            {"name": "Fried Rice", "desc": "Fragrant basmati rice stir-fried with diced garden vegetables, scallions, and soy sauce.", "img": "/assets/food/fried_rice.jpg"},
            {"name": "Spicy Paneer Sandwich", "desc": "Grilled multi-layer sandwich packed with seasoned paneer bhurji, mint chutney & cheese.", "img": "/assets/food/spicy_paneer_sandwich.jpg"},
            {"name": "Veg Cheese Grill Sandwich", "desc": "Triple-decker toasted sandwich loaded with sliced vegetables, potato masala, and melted cheese.", "img": "/assets/food/veg_cheese_grill_sandwich.jpg"},
        ]
    },
    {
        "id": "soups",
        "title": "Soups",
        "subtitle": "🥣 Warm & Comforting Chef Special Soups",
        "icon": "🥣",
        "items": [
            {"name": "Sweet Corn Soup", "desc": "Velvety broth loaded with sweet golden corn kernels and tender minced vegetables.", "img": "/assets/food/sweet_corn_soup.jpg"},
            {"name": "Tomato Soup", "desc": "Classic ripe tomato soup with butter, aromatic spices, and crispy golden croutons.", "img": "/assets/food/tomato_soup.jpg"},
            {"name": "Mushroom Soup", "desc": "Rich and creamy button mushroom soup infused with garlic, thyme, and black pepper.", "img": "/assets/food/mushroom_soup.jpg"},
        ]
    },
    {
        "id": "raita-sides",
        "title": "Raita & Sides",
        "subtitle": "🥗 Refreshing Curd Accompaniments & Salads",
        "icon": "🥗",
        "items": [
            {"name": "Veg Raita", "desc": "Chilled whipped yogurt mixed with diced cucumber, tomatoes, onions, roasted cumin & mint.", "img": "/assets/food/veg_raita.jpg"},
            {"name": "Boondi Raita", "desc": "Crispy spiced gram flour droplets soaked in seasoned, creamy chilled curd.", "img": "/assets/food/boondi_raita.jpg"},
            {"name": "Plain Raita", "desc": "Smooth, lightly salted and roasted cumin-seasoned fresh chilled yogurt.", "img": "/assets/food/plain_raita.jpg"},
            {"name": "Dahi (Curd Bowl)", "desc": "Fresh, thick and sweet set natural dairy curd bowl.", "img": "/assets/food/dahi_curd_bowl.jpg"},
        ]
    },
    {
        "id": "beverages",
        "title": "Beverages",
        "subtitle": "🥤 Chilled Refreshments, Punjabi Lassi & Cold Drinks",
        "icon": "🥤",
        "items": [
            {"name": "Lassi (Sweet / Salty)", "desc": "Traditional thick and creamy hand-churned Punjabi yogurt drink, served chilled.", "img": "/assets/food/lassi_sweet_salty.jpg"},
            {"name": "Cold Drinks", "desc": "Chilled aerated soft drinks to complement your spicy rasoi meal.", "img": "/assets/food/cold_drinks_small_big.jpg"},
            {"name": "Packaged Drinking Water", "desc": "Pure, sealed and chilled bottled drinking water.", "img": "/assets/food/packaged_drinking_water_small_1_ltr.jpg"},
        ]
    },
    {
        "id": "desserts",
        "title": "Desserts",
        "subtitle": "🍨 Authentic Mithai & Sweet Delicacies",
        "icon": "🍨",
        "items": [
            {"name": "Ice Cream (2 Scoops)", "desc": "Two rich, creamy scoops of ice cream in choice of vanilla, rich chocolate, or strawberry.", "img": "/assets/food/ice_cream_2_scoops.jpg"},
            {"name": "Gulab Jamun", "desc": "Warm, melt-in-mouth milk solid dumplings dipped in fragrant rose and cardamom sugar syrup.", "img": "/assets/food/gulab_jamun_2_pcs.jpg"},
            {"name": "Rasgulla", "desc": "Soft and spongy fresh cottage cheese balls soaked in light, chilled cardamom syrup.", "img": "/assets/food/rasgulla_2_pcs.jpg"},
            {"name": "Brownie with Ice Cream", "desc": "Decadent warm chocolate fudge brownie served with a scoop of creamy vanilla ice cream.", "img": "/assets/food/brownie_with_ice_cream.jpg"},
        ]
    }
]

def escape_js(text):
    return text.replace("'", "\\'")

def render_menu_item(item):
    safe_name = escape_js(item['name'])
    safe_img = escape_js(item['img'])
    return f'''<div class="menu-item" data-dish-name="{item['name']}">
  <div class="pxl-item-featured">
    <img loading="lazy" decoding="async" width="70" height="70" src="{item['img']}" class="attachment-full" alt="{item['name']}" />
  </div>
  <div class="pxl-item--inner">
    <div class="wp-title">
      <h4 class="pxl--title" title="{item['name']}">{item['name']}</h4>
      <span class="line-dotted"></span>
      <button type="button" class="pxl--price sainik-theme-add-btn" onclick="window.sainikCart.add('{safe_name}', '{safe_img}')" title="Add {item['name']} to your selection">
        + Add
      </button>
    </div>
    <div class="pxl--excerpt">{item['desc']}</div>
  </div>
</div>'''

def render_category_section(cat):
    items_html = "\n".join(render_menu_item(it) for it in cat['items'])
    
    return f'''<section id="{cat['id']}" class="elementor-section elementor-top-section elementor-element elementor-section-boxed elementor-section-height-default elementor-section-height-default pxl-type-header-none pxl-row-scroll-none pxl-bg-color-none pxl-section-bg-none parallax-none" data-element_type="section" style="scroll-margin-top: 135px; padding-top: 40px; padding-bottom: 20px;">
  <div class="elementor-container elementor-column-gap-default">
    <div class="elementor-column elementor-col-100 elementor-top-column elementor-element pxl-col-none pxl-column-none" data-element_type="column">
      <div class="elementor-widget-wrap elementor-element-populated">
        <div class="elementor-element elementor-widget elementor-widget-image" data-element_type="widget" data-widget_type="image.default">
          <div class="elementor-widget-container">
            <img decoding="async" width="110" height="17" src="../wp-content/uploads/2023/06/title_border.png" class="attachment-large size-large wp-image-925" alt="" />
          </div>
        </div>
        <div class="elementor-element elementor-widget elementor-widget-pxl_heading" data-element_type="widget" data-widget_type="pxl_heading.default">
          <div class="elementor-widget-container">
            <div class="pxl-heading pxl-heading-normal">
              <div class="pxl-heading--inner">
                <div class="pxl-item--sub-title style-default font-normal" style="font-family:var(--font-heading);font-style:italic;color:var(--secondary-color);letter-spacing:1px;margin-bottom:6px;"><span>{cat['subtitle']}</span></div>
                <h2 class="pxl-item--title divider-none style1" data-wow-delay="ms" data-wow-duration="1.2s">{cat['title']}</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="elementor-element elementor-widget elementor-widget-pxl_menu_list" data-element_type="widget" data-widget_type="pxl_menu_list.default">
          <div class="elementor-widget-container">
            <div class="pxl-grid pxl-menu-list pxl-menu-list2 columns-x2">
              <div class="pxl-grid-inner row" data-gutter="15">
{items_html}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>'''

# Generate Sticky Category Pills Bar (Top of Menu)
pills_html = [
    '<div class="sainik-sticky-cat-bar">',
    '  <div class="sainik-cat-pills-scroll">',
    '    <button type="button" class="sainik-cat-pill-browse-all" onclick="window.sainikMenuNav.open()" title="Browse all categories">',
    '      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="margin-right:2px;"><path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>',
    '      All',
    '    </button>'
]

for cat in CATEGORIES:
    cat_id = cat['id']
    title = cat['title']
    count = len(cat['items'])
    active_cls = ' active' if cat_id == 'starters' else ''
    pills_html.append(f'''    <a href="#{cat_id}" class="sainik-cat-pill-item{active_cls}" data-cat-id="{cat_id}" onclick="event.preventDefault(); window.sainikMenuNav.scrollToCategory('{cat_id}')">
      <span>{title}</span>
      <span class="cat-pill-count">{count}</span>
    </a>''')

pills_html.append('  </div>')
pills_html.append('</div>')
sticky_cat_bar_html = "\n".join(pills_html)

# Generate all category sections
body_sections = [sticky_cat_bar_html]
for cat in CATEGORIES:
    body_sections.append(render_category_section(cat))

# Add Takeout / Delivery Banner
takeout_section = '''<section class="elementor-section elementor-top-section elementor-element elementor-element-649df1e elementor-section-boxed elementor-section-height-default elementor-section-height-default pxl-type-header-none pxl-row-scroll-none pxl-bg-color-none pxl-section-bg-none parallax-none" data-id="649df1e" data-element_type="section" data-settings="{&quot;background_background&quot;:&quot;classic&quot;}" style="margin-top: 40px; margin-bottom: 40px;">
  <div class="elementor-container elementor-column-gap-extended">
    <div class="elementor-column elementor-col-50 elementor-top-column elementor-element elementor-element-1f8cb15 pxl-col-none pxl-column-none" data-id="1f8cb15" data-element_type="column">
      <div class="elementor-widget-wrap elementor-element-populated">
        <div class="elementor-element elementor-element-59d4db0 elementor-widget elementor-widget-pxl_heading" data-id="59d4db0" data-element_type="widget" data-widget_type="pxl_heading.default">
          <div class="elementor-widget-container">
            <div class="pxl-heading pxl-heading-normal">
              <div class="pxl-heading--inner">
                <div class="pxl-item--sub-title style-default font-normal" data-wow-delay="ms" data-wow-duration="1.2s">
                  <span>Fast Pure Veg Delivery (within 7 km)</span>
                </div>
                <h2 class="pxl-item--title divider-none style1" data-wow-delay="ms" data-wow-duration="1.2s">Fresh Desi Flavors Delivered to Your Doorstep</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="elementor-element elementor-element-eeb9f6c elementor-widget elementor-widget-text-editor" data-id="eeb9f6c" data-element_type="widget" data-widget_type="text-editor.default">
          <div class="elementor-widget-container">
            <div class="pxl-text-editor" data-wow-delay="ms" data-wow-duration="1.2s">
              <div class="pxl-item--inner">
                <p>Select your favorite pure vegetarian dishes, add them to cart and order via WhatsApp. Freshly prepared, hygienic packaging and fast delivery within 7 km radius of Sainik Rasoi.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="elementor-element elementor-widget__width-auto elementor-widget-mobile__width-inherit elementor-widget elementor-widget-pxl_contact_info" data-element_type="widget" data-widget_type="pxl_contact_info.default">
          <div class="elementor-widget-container">
            <div class="pxl-contact-info pxl-contact-info2" data-wow-delay="ms" data-wow-duration="1.2s">
              <div class="pxl-item--inner">
                <span class="pxl-item--icon">
                  <i aria-hidden="true" class="ion-android-call"></i>
                </span>
                <div class="pxl-item--content">
                  <span class="pxl-item--title">CALL US TO ORDER</span>
                  <a class="pxl-item--description" href="tel:+919876543210">+91 98765 43210</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="elementor-column elementor-col-50 elementor-top-column elementor-element pxl-col-none pxl-column-none" data-element_type="column">
      <div class="elementor-widget-wrap elementor-element-populated">
        <div class="elementor-element elementor-widget__width-auto elementor-widget-tablet__width-inherit elementor-widget elementor-widget-pxl_image_dark_light" data-element_type="widget" data-widget_type="pxl_image_dark_light.default">
          <div class="elementor-widget-container">
            <div class="pxl-image-dark-light pxl-image-dark-light1" data-wow-delay="ms" data-wow-duration="1.2s">
              <div class="pxl-item--inner-light">
                <img loading="lazy" decoding="async" width="750" height="500" src="/assets/food/cat_thali.jpg" class="no-lazyload attachment-full" alt="Sainik Rasoi Special Thali" style="border-radius:6px;object-fit:cover;" />
              </div>
              <div class="pxl-item--inner-dark">
                <img loading="lazy" decoding="async" width="750" height="500" src="/assets/food/cat_thali.jpg" class="no-lazyload attachment-full" alt="Sainik Rasoi Special Thali" style="border-radius:6px;object-fit:cover;" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>'''

body_sections.append(takeout_section)
all_sections_html = "\n".join(body_sections)

# In orig_html, replace the inner content of <article ...> ... </article>
article_pattern = r'(<article[^>]*>).*?(</article>)'
new_article_content = r'\1<div class="pxl-entry-content clearfix"><div data-elementor-type="wp-page" data-elementor-id="80" class="elementor elementor-80">' + all_sections_html + r'</div></div>\2'

final_html = re.sub(article_pattern, new_article_content, orig_html, flags=re.DOTALL)

# Update page title & header banner title
final_html = final_html.replace('<title>Menu 02 &#8211; HungryBuzz</title>', '<title>100% Pure Vegetarian Menu &#8211; Sainik Rasoi</title>')
final_html = final_html.replace('<h1 class="pxl-item--title divider-none   style2" data-wow-delay="ms" data-wow-duration="1.2s"> Menu 02</h1>', '<h1 class="pxl-item--title divider-none   style2" data-wow-delay="ms" data-wow-duration="1.2s">100% Pure Veg Menu</h1>')

# Update branding strings in footer & header
final_html = final_html.replace('Welcome to hungrybuzz, where culinary excellence meets warm hospitality.', 'Welcome to Sainik Rasoi, where authentic 100% pure vegetarian culinary excellence meets warm hospitality.')
final_html = final_html.replace('+0888 . 1234 . 5699', '+91 98765 43210')
final_html = final_html.replace('tel:088812345699', 'tel:+919876543210')
final_html = final_html.replace('Hungrybuzz', 'Sainik Rasoi')
final_html = final_html.replace('HungryBuzz', 'Sainik Rasoi')

# Clean out any old cart injection if re-running
clean_marker = '<!-- SAINIK RASOI LUXURY THEME-HARMONIOUS WHATSAPP CART SYSTEM -->'
if clean_marker in final_html:
    final_html = final_html[:final_html.index(clean_marker)] + '</body></html>'

# Add stylesheet link into <head>
css_link = '<link rel="stylesheet" href="/assets/css/sainik-cart.css" />\n</head>'
if '</head>' in final_html and '/assets/css/sainik-cart.css' not in final_html:
    final_html = final_html.replace('</head>', css_link, 1)

# Add Cart Drawer HTML, Floating Menu Button & Category Bottom Sheet Modal
cart_system_code = '''
<!-- FLOATING MENU CATEGORY LAUNCHER BUTTON -->
<div id="sainik-floating-menu-btn" class="sainik-floating-menu-btn" onclick="window.sainikMenuNav.toggle()" role="button" aria-label="Browse Menu Categories">
  <div class="sainik-menu-pill">
    <svg class="sainik-menu-icon" width="18" height="18" viewBox="0 0 24 24">
      <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/>
    </svg>
    <span class="sainik-menu-pill-text">MENU</span>
    <span class="sainik-menu-pill-count">13</span>
  </div>
</div>

<!-- CATEGORY SELECTOR POPUP CARD (MATCHING USER SCREENSHOT) -->
<div id="sainik-cat-overlay" class="sainik-cat-overlay" onclick="window.sainikMenuNav.close()"></div>
<div id="sainik-cat-sheet" class="sainik-cat-sheet" role="dialog" aria-modal="true" aria-label="Select Menu Category">
  <div class="sainik-cat-list" id="sainik-cat-list-items">
    <!-- Populated dynamically by SainikMenuNav -->
  </div>
</div>

<!-- SAINIK RASOI LUXURY THEME-HARMONIOUS WHATSAPP CART SYSTEM -->
<div id="sainik-floating-cart-bar" class="sainik-floating-bar" onclick="window.sainikCart.open()" role="button" aria-label="View Order Selection">
  <div class="sainik-float-pill">
    <div class="sainik-float-info">
      <span class="sainik-float-icon">🛒</span>
      <span class="sainik-float-count-badge" id="sainik-float-count">1 Item</span>
    </div>
    <div class="sainik-float-sep"></div>
    <div class="sainik-float-cta">
      <span>Order on WhatsApp</span>
      <span class="sainik-float-arrow">→</span>
    </div>
  </div>
</div>

<!-- Cart Drawer Overlay & Panel -->
<div id="sainik-cart-overlay" class="sainik-cart-overlay" onclick="window.sainikCart.close()"></div>
<div id="sainik-cart-drawer" class="sainik-cart-drawer">
  <div class="sainik-cart-header">
    <div class="sainik-cart-header-left">
      <h3 class="sainik-cart-title">Your Selection</h3>
      <span class="sainik-cart-badge-count" id="sainik-drawer-badge">0 items</span>
    </div>
    <button type="button" class="sainik-cart-close-btn" onclick="window.sainikCart.close()" aria-label="Close Selection">✕</button>
  </div>

  <div class="sainik-cart-body" id="sainik-cart-items-container">
    <!-- Items rendered by JS -->
  </div>

  <div class="sainik-cart-footer" id="sainik-cart-footer">
    <!-- Order Type Selector (Delivery vs Takeaway) -->
    <div class="sainik-order-type-tabs">
      <button type="button" class="sainik-type-tab active" id="sainik-tab-delivery" onclick="window.sainikCart.setOrderType('delivery')">
        🛵 Delivery <span class="sainik-radius-pill">≤ 7 km</span>
      </button>
      <button type="button" class="sainik-type-tab" id="sainik-tab-takeaway" onclick="window.sainikCart.setOrderType('takeaway')">
        🍽️ Takeaway / Dine-in
      </button>
    </div>

    <!-- Home Delivery Container -->
    <div id="sainik-delivery-inputs-container" class="sainik-cart-inputs">
      <div class="sainik-input-group">
        <label for="sainik-order-name">Your Name</label>
        <input type="text" id="sainik-order-name" placeholder="e.g. Vikram Sharma" autocomplete="name" />
      </div>

      <div class="sainik-input-group">
        <label for="sainik-order-address">Delivery Address & Area</label>
        <input type="text" id="sainik-order-address" placeholder="e.g. Flat 302, Green Valley Apartments" />
      </div>

      <!-- Distance Verification Tool (7 km Limit) -->
      <div class="sainik-distance-checker-box">
        <div class="sainik-distance-header">
          <span class="sainik-distance-label">Distance from Sainik Rasoi:</span>
          <button type="button" class="sainik-gps-btn" onclick="window.sainikCart.detectGPSLocation()" id="sainik-gps-btn" title="Detect distance using GPS">
            📍 Detect GPS
          </button>
        </div>
        <div class="sainik-distance-slider-wrap">
          <input type="range" id="sainik-distance-range" min="0.5" max="15.0" step="0.5" value="3.0" oninput="window.sainikCart.setDistance(parseFloat(this.value))" />
          <div class="sainik-distance-val-box">
            <span id="sainik-distance-display">3.0</span> <small>km</small>
          </div>
        </div>
      </div>

      <!-- Real-time Delivery Status Banner -->
      <div id="sainik-delivery-status-banner" class="sainik-status-banner success">
        <div class="sainik-status-icon" id="sainik-status-icon">✓</div>
        <div class="sainik-status-text" id="sainik-status-text">
          <strong>Delivery Available!</strong> (~3.0 km from Sainik Rasoi)
        </div>
      </div>

      <div class="sainik-input-group">
        <label for="sainik-order-notes">Cooking Instructions / Notes</label>
        <input type="text" id="sainik-order-notes" placeholder="e.g. Medium spicy, extra chutney" />
      </div>
    </div>

    <!-- Takeaway / Dine-in Container -->
    <div id="sainik-takeaway-inputs-container" class="sainik-cart-inputs" style="display:none;">
      <div class="sainik-input-group">
        <label for="sainik-takeaway-name">Your Name</label>
        <input type="text" id="sainik-takeaway-name" placeholder="e.g. Vikram Sharma" autocomplete="name" />
      </div>
      <div class="sainik-input-group">
        <label for="sainik-takeaway-table">Table No. or Pickup Time</label>
        <input type="text" id="sainik-takeaway-table" placeholder="e.g. Table 4 / Pickup in 20 mins" />
      </div>
      <div class="sainik-status-banner info">
        <div class="sainik-status-icon">🍽️</div>
        <div class="sainik-status-text">
          <strong>Takeaway / Dine-In:</strong> Prepared fresh and packed for quick pickup at Sainik Rasoi.
        </div>
      </div>
      <div class="sainik-input-group">
        <label for="sainik-takeaway-notes">Cooking Instructions / Notes</label>
        <input type="text" id="sainik-takeaway-notes" placeholder="e.g. Medium spicy, extra chutney" />
      </div>
    </div>

    <button type="button" class="sainik-whatsapp-checkout-btn" id="sainik-whatsapp-btn" onclick="window.sainikCart.checkoutWhatsApp()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right:8px;flex-shrink:0;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.892.812 2.796.812 3.179 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.07-1.107-.063-.267-.086-.599-.214-1.028-.399-1.815-.783-3.003-2.617-3.094-2.739-.091-.122-.741-.986-.741-1.881 0-.895.469-1.334.636-1.517.167-.183.365-.228.487-.228.122 0 .243.002.349.007.113.005.263-.043.411.312.153.365.518 1.263.563 1.355.045.091.076.198.015.32-.061.122-.091.198-.183.305-.091.107-.193.239-.275.32-.092.091-.188.19-.081.373.107.183.475.783 1.019 1.268.701.625 1.291.819 1.474.91.183.091.29.076.396-.046.107-.122.457-.533.579-.716.122-.183.244-.152.411-.091.167.061 1.065.502 1.248.594.183.091.305.137.35.213.046.076.046.442-.098.847zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.662 1.442 5.177L2 22l4.981-1.307A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.154c-1.636 0-3.151-.487-4.423-1.326l-.317-.208-2.955.775.789-2.88-.228-.363A8.118 8.118 0 013.846 12c0-4.496 3.658-8.154 8.154-8.154s8.154 3.658 8.154 8.154-3.658 8.154-8.154 8.154z"/></svg>
      <span id="sainik-whatsapp-btn-text">Send Order via WhatsApp</span>
    </button>
    <button type="button" class="sainik-clear-cart-btn" onclick="window.sainikCart.clear()">Clear Selection</button>
  </div>
</div>

<!-- Toast Notification -->
<div id="sainik-toast" class="sainik-toast"></div>

<!-- External Cart Script -->
<script src="/assets/js/sainik-cart.js"></script>
'''

final_html = final_html.replace('</body>', cart_system_code + '\n</body>')

with open('public/menu-02/index.html', 'w', encoding='utf-8') as f:
    f.write(final_html)

total_dishes = sum(len(c['items']) for c in CATEGORIES)
print(f"Successfully generated public/menu-02/index.html with Category Selector & WhatsApp Cart! Total dishes: {total_dishes}")
