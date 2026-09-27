import subprocess
import re
import sys

sys.stdout.reconfigure(encoding='utf-8')

# Load the original template from HEAD
orig_html = subprocess.check_output(['git', 'show', 'HEAD:public/menu-02/index.html'], text=True, encoding='utf-8')

CATEGORIES = [
    {
        "id": "starters",
        "title": "Starters",
        "subtitle": "🌶️ Sizzling Tandoori & Crispy Starters",
        "items": [
            {"name": "Paneer Tikka", "desc": "Clay-oven roasted cottage cheese skewers marinated in spiced hung yogurt & aromatic herbs.", "img": "/assets/food/paneer_tikka.jpg"},
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
            {"name": "Papad", "desc": "Crispy spiced lentil wafers, roasted or fried to golden crispness.", "img": "/assets/food/papad_roasted_fried.jpg"},
        ]
    },
    {
        "id": "snacks",
        "title": "Snacks",
        "subtitle": "🥟 Classic Street Delights & Evening Treats",
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
        "items": [
            {"name": "Paneer Butter Masala", "desc": "Signature rich and creamy tomato-butter curry loaded with soft cottage cheese chunks.", "img": "/assets/food/paneer_butter_masala.jpg"},
            {"name": "Kadhai Paneer", "desc": "Paneer tossed with crunchy bell peppers and onions in freshly ground aromatic kadhai spices.", "img": "/assets/food/kadhai_paneer.jpg"},
            {"name": "Paneer Lababdar", "desc": "Luscious cashew-onion gravy with grated paneer and cottage cheese chunks, finished with cream.", "img": "/assets/food/paneer_lababdar.jpg"},
            {"name": "Paneer Makhani", "desc": "Silky smooth makhani gravy infused with butter, cream, fenugreek and soft paneer cubes.", "img": "/assets/food/paneer_makhani.jpg"},
            {"name": "Shahi Paneer", "desc": "Royal Mughlai specialty cooked in thick, fragrant almond-cashew white gravy with mild spices.", "img": "/assets/food/shahi_paneer.jpg"},
            {"name": "Palak Paneer", "desc": "Fresh garden spinach puree cooked with garlic, mild spices, and soft cottage cheese cubes.", "img": "/assets/food/palak_paneer.jpg"},
            {"name": "Mutter Paneer", "desc": "Soft cottage cheese cubes and tender green peas cooked in a spiced onion-tomato gravy.", "img": "/assets/food/mutter_paneer.jpg"},
        ]
    },
    {
        "id": "main-course",
        "title": "Main Course",
        "subtitle": "🍲 Homestyle Regional Curries & Simmered Dals",
        "items": [
            {"name": "Dal Makhani", "desc": "Slow-simmered whole black lentils and kidney beans cooked overnight with butter and fresh cream.", "img": "/assets/food/dal_makhani.jpg"},
            {"name": "Dal Tadka", "desc": "Yellow toor dal tempered with desi ghee, garlic, cumin seeds, mustard seeds & whole red chilies.", "img": "/assets/food/dal_tadka.jpg"},
            {"name": "Mushroom Do Pyaza", "desc": "Button mushrooms cooked with abundant caramelized onions and whole spices in semi-dry gravy.", "img": "/assets/food/mushroom_do_pyaza.jpg"},
            {"name": "Mix Veg", "desc": "Medley of garden-fresh seasonal vegetables slow-cooked with aromatic Indian spices.", "img": "/assets/food/mix_veg.jpg"},
            {"name": "Sev Bhaji", "desc": "Dhaba-style spicy garlic-tomato curry topped with crispy gram flour sev noodles.", "img": "/assets/food/sev_bhaji.jpg"},
            {"name": "Chaap Masala", "desc": "Tender soya chaap roasted and simmered in a robust, spicy onion-tomato masala gravy.", "img": "/assets/food/chaap_masala.jpg"},
            {"name": "Aloo Jeera", "desc": "Diced potatoes tempered with cumin seeds, turmeric, green chilies and fresh coriander.", "img": "/assets/food/aloo_jeera.jpg"},
        ]
    },
    {
        "id": "thali",
        "title": "Rasoi Special Thali",
        "subtitle": "🍱 Wholesome Grand Vegetarian Feasts",
        "items": [
            {"name": "Normal Thali", "desc": "Dal Tadka, Mix Veg, 4 Tawa Phulkas, Steamed Basmati Rice, Veg Raita, Salad, Papad & Gulab Jamun.", "img": "/assets/food/normal_thali.jpg"},
            {"name": "Paneer Thali", "desc": "Paneer Butter Masala, Dal Makhani, 4 Butter Phulkas, Jeera Rice, Boondi Raita, Salad, Papad & Sweet.", "img": "/assets/food/paneer_thali.jpg"},
        ]
    },
    {
        "id": "parathas",
        "title": "Parathas",
        "subtitle": "🫓 Golden Tawa Flatbreads Served with Butter",
        "items": [
            {"name": "Paneer Paratha", "desc": "Crispy golden paratha stuffed with spiced grated cottage cheese, fresh coriander and butter.", "img": "/assets/food/paneer_paratha.jpg"},
            {"name": "Gobhi Paratha", "desc": "Whole wheat paratha filled with finely grated spiced cauliflower and roasted cumin.", "img": "/assets/food/gobhi_paratha.jpg"},
            {"name": "Onion Paratha", "desc": "Flaky layered paratha packed with finely chopped spiced onions and green herbs.", "img": "/assets/food/onion_paratha.jpg"},
            {"name": "Cheese Sweet Corn Paratha", "desc": "Delicious fusion paratha stuffed with sweet golden corn kernels and molten mozzarella cheese.", "img": "/assets/food/cheese_sweet_corn_paratha.jpg"},
        ]
    },
    {
        "id": "bread",
        "title": "Bread",
        "subtitle": "🫓 Tandoor Baked Rotis & Soft Tawa Phulkas",
        "items": [
            {"name": "Tawa Phulka", "desc": "Light, soft, 100% whole wheat phulka puffed over open flame without oil.", "img": "/assets/food/tawa_phulka.jpg"},
            {"name": "Butter Tawa Phulka", "desc": "Puffy whole wheat phulka brushed generously with rich desi butter.", "img": "/assets/food/butter_tawa_phulka.jpg"},
            {"name": "Roti", "desc": "Traditional crisp clay-oven whole wheat flatbread baked on the tandoor walls.", "img": "/assets/food/roti_tandoori.jpg"},
            {"name": "Butter Roti", "desc": "Tandoori whole wheat roti topped with a generous dollop of melting butter.", "img": "/assets/food/butter_roti.jpg"},
            {"name": "Butter Naan", "desc": "Soft and fluffy refined flour leavened flatbread baked in tandoor and brushed with butter.", "img": "/assets/food/butter_naan.jpg"},
        ]
    },
    {
        "id": "chinese",
        "title": "Chinese",
        "subtitle": "🥢 Wok Noodles, Steamed Momos & Grilled Sandwiches",
        "items": [
            {"name": "Veg Noodles", "desc": "Stir-fried noodles tossed with cabbage, carrots, capsicum and savory dark soy sauce.", "img": "/assets/food/veg_noodles.jpg"},
            {"name": "Veg Manchurian", "desc": "Crispy veggie balls in a luscious, tangy garlic-soy gravy with spring onions.", "img": "/assets/food/veg_manchurian.jpg"},
            {"name": "Veg Momos", "desc": "Steamed dumplings filled with seasoned shredded vegetables, served with spicy red dip.", "img": "/assets/food/veg_momos_6_pcs.jpg"},
            {"name": "Paneer Momos", "desc": "Delicate steamed dumplings stuffed with spiced cottage cheese mash and fresh herbs.", "img": "/assets/food/paneer_momos_6_pcs.jpg"},
            {"name": "Hakka Noodles", "desc": "Authentic Indo-Chinese wok noodles stir-fried with crunchy bell peppers and scallions.", "img": "/assets/food/hakka_noodles.jpg"},
            {"name": "Fried Rice", "desc": "Fragrant basmati rice tossed with fresh garden vegetables, garlic and soy in a blazing wok.", "img": "/assets/food/fried_rice.jpg"},
            {"name": "Spicy Paneer Sandwich", "desc": "Toasted bread loaded with spicy tandoori paneer filling, onions, and tangy mint chutney.", "img": "/assets/food/spicy_paneer_sandwich.jpg"},
            {"name": "Veg Cheese Grill Sandwich", "desc": "Crispy grilled sandwich packed with fresh veggies, green chutney and molten cheese.", "img": "/assets/food/veg_cheese_grill_sandwich.jpg"},
        ]
    },
    {
        "id": "soup",
        "title": "Soup",
        "subtitle": "🍲 Warm, Soothing & Wholesome Broths",
        "items": [
            {"name": "Sweet Corn Soup", "desc": "Creamy and comforting corn broth packed with crushed golden sweet corn and tender veggies.", "img": "/assets/food/sweet_corn_soup.jpg"},
            {"name": "Tomato Soup", "desc": "Silky ripe tomato soup with mild herbs and black pepper, served with crunchy bread croutons.", "img": "/assets/food/tomato_soup.jpg"},
            {"name": "Mushroom Soup", "desc": "Rich, earthy button mushroom broth seasoned with garlic, butter and fresh herbs.", "img": "/assets/food/mushroom_soup.jpg"},
        ]
    },
    {
        "id": "raita",
        "title": "Raita",
        "subtitle": "🥗 Cooling Savory Curds & Accompaniments",
        "items": [
            {"name": "Veg Raita", "desc": "Chilled whipped yogurt blended with diced cucumber, tomatoes, onions, mint and roasted cumin.", "img": "/assets/food/veg_raita.jpg"},
            {"name": "Boondi Raita", "desc": "Creamy spiced yogurt mixed with crispy salted gram-flour pearls and fresh coriander.", "img": "/assets/food/boondi_raita.jpg"},
            {"name": "Plain Raita", "desc": "Smooth, lightly seasoned yogurt with a hint of black salt and roasted cumin powder.", "img": "/assets/food/plain_raita.jpg"},
            {"name": "Dahi", "desc": "Fresh, thick, home-style set sweet-and-sour curd bowl.", "img": "/assets/food/dahi_curd_bowl.jpg"},
        ]
    },
    {
        "id": "fluids",
        "title": "Fluids",
        "subtitle": "🥤 Traditional Churned Lassis & Refreshers",
        "items": [
            {"name": "Lassi (Sweet / Salty)", "desc": "Thick, traditional hand-churned yogurt drink served chilled with a layer of fresh malai.", "img": "/assets/food/lassi_sweet_salty.jpg"},
            {"name": "Packaged Drinking Water — Small / 1 Ltr", "desc": "Sealed, purified and mineral-rich packaged drinking water bottle.", "img": "/assets/food/packaged_drinking_water_small_1_ltr.jpg"},
            {"name": "Cold Drinks — Small / Big", "desc": "Assorted chilled carbonated soft drinks, sodas and refreshing beverages.", "img": "/assets/food/cold_drinks_small_big.jpg"},
        ]
    },
    {
        "id": "dessert",
        "title": "Dessert",
        "subtitle": "🍨 Royal Indian Mithai & Luscious Sweets",
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
    # Notice: We use the exact template class 'pxl--price' so it inherits the theme's native font, alignment and hover styling seamlessly!
    return f'''<div class="menu-item" data-dish-name="{item['name']}">
  <div class="pxl-item-featured">
    <img loading="lazy" decoding="async" width="68" height="68" src="{item['img']}" class="attachment-full" alt="{item['name']}" />
  </div>
  <div class="pxl-item--inner">
    <div class="wp-title">
      <h4 class="pxl--title">{item['name']}</h4>
      <span class="line-dotted"></span>
      <button type="button" class="pxl--price sainik-theme-add-btn" onclick="sainikCart.add('{safe_name}', '{safe_img}')" title="Add {item['name']} to your selection">
        + Add
      </button>
    </div>
    <div class="pxl--excerpt">{item['desc']}</div>
  </div>
</div>'''

def render_category_section(cat):
    items_html = "\n".join(render_menu_item(it) for it in cat['items'])
    
    return f'''<section id="{cat['id']}" class="elementor-section elementor-top-section elementor-element elementor-section-boxed elementor-section-height-default elementor-section-height-default pxl-type-header-none pxl-row-scroll-none pxl-bg-color-none pxl-section-bg-none parallax-none" data-element_type="section" style="scroll-margin-top: 90px; padding-top: 40px; padding-bottom: 20px;">
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

def render_parallax_divider():
    return '''<section class="elementor-section elementor-top-section elementor-element elementor-section-full_width elementor-section-height-min-height elementor-section-stretched parallax-1 elementor-section-height-default elementor-section-items-middle pxl-type-header-none pxl-section-padding-none pxl-section-offset-none pxl-row-scroll-none pxl-bg-color-none pxl-section-bg-none" data-element_type="section" data-settings="{&quot;stretch_section&quot;:&quot;section-stretched&quot;}">
  <div class="pxl-section-bg-parallax"></div>
  <div class="pxl-section-bg-parallax-dark"></div>
  <div class="elementor-container elementor-column-gap-extended">
    <div class="elementor-column elementor-col-100 elementor-top-column elementor-element pxl-col-none pxl-column-none" data-element_type="column">
      <div class="elementor-widget-wrap"></div>
    </div>
  </div>
</section>'''

# Category Navigation Bar
def render_category_nav():
    links = []
    for cat in CATEGORIES:
        links.append(f'<a href="#{cat["id"]}" class="sainik-cat-link">{cat["title"]}</a>')
    
    links_html = " &nbsp;•&nbsp; ".join(links)
    
    return f'''<section class="elementor-section elementor-top-section elementor-element elementor-section-boxed elementor-section-height-default pxl-type-header-none pxl-row-scroll-none pxl-bg-color-none" style="padding: 24px 0 10px;">
  <div class="elementor-container elementor-column-gap-default">
    <div class="elementor-column elementor-col-100 elementor-top-column elementor-element">
      <div class="elementor-widget-wrap">
        <div class="sainik-cat-nav" style="display:flex; flex-wrap:wrap; justify-content:center; gap:8px 14px; text-align:center; font-family:var(--font-heading); font-size:1.05rem; letter-spacing:0.5px;">
          {links_html}
        </div>
      </div>
    </div>
  </div>
</section>'''

body_sections = [render_category_nav()]

# Group 1: Starters & Snacks
body_sections.append(render_category_section(CATEGORIES[0]))
body_sections.append(render_category_section(CATEGORIES[1]))
body_sections.append(render_parallax_divider())

# Group 2: Paneer & Main Course
body_sections.append(render_category_section(CATEGORIES[2]))
body_sections.append(render_category_section(CATEGORIES[3]))
body_sections.append(render_parallax_divider())

# Group 3: Rasoi Special Thali, Parathas & Bread
body_sections.append(render_category_section(CATEGORIES[4]))
body_sections.append(render_category_section(CATEGORIES[5]))
body_sections.append(render_category_section(CATEGORIES[6]))
body_sections.append(render_parallax_divider())

# Group 4: Chinese & Soup
body_sections.append(render_category_section(CATEGORIES[7]))
body_sections.append(render_category_section(CATEGORIES[8]))
body_sections.append(render_parallax_divider())

# Group 5: Raita, Fluids & Dessert
body_sections.append(render_category_section(CATEGORIES[9]))
body_sections.append(render_category_section(CATEGORIES[10]))
body_sections.append(render_category_section(CATEGORIES[11]))

# Safe Food Take Out & Delivery Section
takeout_section = '''<section class="elementor-section elementor-top-section elementor-element elementor-section-boxed elementor-section-height-default elementor-section-height-default pxl-type-header-none pxl-row-scroll-none pxl-bg-color-none pxl-section-bg-none parallax-none" data-element_type="section" style="padding-top:40px;">
  <div class="elementor-container elementor-column-gap-default">
    <div class="elementor-column elementor-col-50 elementor-top-column elementor-element pxl-col-none pxl-column-none" data-element_type="column">
      <div class="elementor-widget-wrap elementor-element-populated">
        <div class="elementor-element elementor-widget elementor-widget-pxl_heading" data-element_type="widget" data-widget_type="pxl_heading.default">
          <div class="elementor-widget-container">
            <div class="pxl-heading pxl-heading-normal">
              <div class="pxl-heading--inner">
                <h2 class="pxl-item--title divider-none style1" data-wow-delay="ms" data-wow-duration="1.2s">Safe Food Take Out &amp; Delivery</h2>
              </div>
            </div>
          </div>
        </div>
        <div class="elementor-element elementor-widget elementor-widget-pxl_text_editor" data-element_type="widget" data-widget_type="pxl_text_editor.default">
          <div class="elementor-widget-container">
            <div class="pxl-text-editor" data-wow-delay="ms" data-wow-duration="1.2s">
              <div class="pxl-item--inner">100% Pure Vegetarian Fresh Dining at Home</div>
            </div>
          </div>
        </div>
        <div class="elementor-element elementor-widget elementor-widget-pxl_text_editor" data-element_type="widget" data-widget_type="pxl_text_editor.default">
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

# Add the luxury theme-harmonious WhatsApp Cart System
cart_system_code = '''
<!-- SAINIK RASOI LUXURY THEME-HARMONIOUS WHATSAPP CART SYSTEM -->
<div id="sainik-floating-cart-bar" class="sainik-floating-bar" onclick="sainikCart.open()" role="button" aria-label="View Order Selection">
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
<div id="sainik-cart-overlay" class="sainik-cart-overlay" onclick="sainikCart.close()"></div>
<div id="sainik-cart-drawer" class="sainik-cart-drawer">
  <div class="sainik-cart-header">
    <div class="sainik-cart-header-left">
      <h3 class="sainik-cart-title">Your Selection</h3>
      <span class="sainik-cart-badge-count" id="sainik-drawer-badge">0 items</span>
    </div>
    <button type="button" class="sainik-cart-close-btn" onclick="sainikCart.close()" aria-label="Close Selection">✕</button>
  </div>

  <div class="sainik-cart-body" id="sainik-cart-items-container">
    <!-- Items rendered by JS -->
  </div>

  <div class="sainik-cart-footer" id="sainik-cart-footer">
    <!-- Order Type Selector (Delivery vs Takeaway) -->
    <div class="sainik-order-type-tabs">
      <button type="button" class="sainik-type-tab active" id="sainik-tab-delivery" onclick="sainikCart.setOrderType('delivery')">
        🛵 Delivery <span class="sainik-radius-pill">≤ 7 km</span>
      </button>
      <button type="button" class="sainik-type-tab" id="sainik-tab-takeaway" onclick="sainikCart.setOrderType('takeaway')">
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
          <button type="button" class="sainik-gps-btn" onclick="sainikCart.detectGPSLocation()" id="sainik-gps-btn" title="Detect distance using GPS">
            📍 Detect GPS
          </button>
        </div>
        <div class="sainik-distance-slider-wrap">
          <input type="range" id="sainik-distance-range" min="0.5" max="15.0" step="0.5" value="3.0" oninput="sainikCart.setDistance(parseFloat(this.value))" />
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

    <button type="button" class="sainik-whatsapp-checkout-btn" id="sainik-whatsapp-btn" onclick="sainikCart.checkoutWhatsApp()">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="margin-right:8px;flex-shrink:0;"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.892.812 2.796.812 3.179 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.07-1.107-.063-.267-.086-.599-.214-1.028-.399-1.815-.783-3.003-2.617-3.094-2.739-.091-.122-.741-.986-.741-1.881 0-.895.469-1.334.636-1.517.167-.183.365-.228.487-.228.122 0 .243.002.349.007.113.005.263-.043.411.312.153.365.518 1.263.563 1.355.045.091.076.198.015.32-.061.122-.091.198-.183.305-.091.107-.193.239-.275.32-.092.091-.188.19-.081.373.107.183.475.783 1.019 1.268.701.625 1.291.819 1.474.91.183.091.29.076.396-.046.107-.122.457-.533.579-.716.122-.183.244-.152.411-.091.167.061 1.065.502 1.248.594.183.091.305.137.35.213.046.076.046.442-.098.847zM12 2C6.477 2 2 6.477 2 12c0 1.891.526 3.662 1.442 5.177L2 22l4.981-1.307A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.154c-1.636 0-3.151-.487-4.423-1.326l-.317-.208-2.955.775.789-2.88-.228-.363A8.118 8.118 0 013.846 12c0-4.496 3.658-8.154 8.154-8.154s8.154 3.658 8.154 8.154-3.658 8.154-8.154 8.154z"/></svg>
      <span id="sainik-whatsapp-btn-text">Send Order via WhatsApp</span>
    </button>
    <button type="button" class="sainik-clear-cart-btn" onclick="sainikCart.clear()">Clear Selection</button>
  </div>
</div>

<!-- Toast Notification -->
<div id="sainik-toast" class="sainik-toast"></div>

<style>
  /* ==========================================================================
     UNIFORM 68x68 ROUND FOOD THUMBNAILS & CRISP TYPOGRAPHY ALIGNMENT
     ========================================================================== */
  .pxl-grid.pxl-menu-list .menu-item {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 16px !important;
    margin-bottom: 22px !important;
  }
  .pxl-grid.pxl-menu-list .menu-item .pxl-item-featured {
    width: 68px !important;
    height: 68px !important;
    min-width: 68px !important;
    max-width: 68px !important;
    min-height: 68px !important;
    max-height: 68px !important;
    border-radius: 50% !important;
    overflow: hidden !important;
    flex-shrink: 0 !important;
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15) !important;
    border: 2px solid rgba(200, 105, 58, 0.4) !important;
    background: #2a2423 !important;
    display: block !important;
    margin: 0 !important;
  }
  .pxl-grid.pxl-menu-list .menu-item .pxl-item-featured img {
    width: 100% !important;
    height: 100% !important;
    min-width: 100% !important;
    max-width: 100% !important;
    min-height: 100% !important;
    max-height: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
    border-radius: 50% !important;
    display: block !important;
    transition: transform 0.35s ease !important;
  }
  .pxl-grid.pxl-menu-list .menu-item:hover .pxl-item-featured img {
    transform: scale(1.08) !important;
  }
  .pxl-grid.pxl-menu-list .menu-item .pxl-item--holder {
    flex: 1 !important;
    min-width: 0 !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: center !important;
    text-align: left !important;
  }
  .pxl-grid.pxl-menu-list .menu-item .pxl-item--head {
    display: flex !important;
    align-items: baseline !important;
    justify-content: space-between !important;
    width: 100% !important;
    margin-bottom: 4px !important;
    position: relative !important;
  }
  .pxl-grid.pxl-menu-list .menu-item .pxl-item--title {
    margin: 0 !important;
    padding: 0 !important;
    font-family: var(--font-heading, "Cormorant", serif) !important;
    font-size: 1.28rem !important;
    font-weight: 700 !important;
    color: var(--primary-color, #2a2423) !important;
    letter-spacing: 0.3px !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    flex-shrink: 0 !important;
    max-width: 65% !important;
  }
  .dark-mode .pxl-grid.pxl-menu-list .menu-item .pxl-item--title {
    color: #f4e6dc !important;
  }
  .pxl-grid.pxl-menu-list .menu-item .pxl-item--divider {
    flex: 1 !important;
    margin: 0 10px !important;
    border-bottom: 1px dotted rgba(42, 36, 35, 0.25) !important;
    height: 1px !important;
    align-self: center !important;
  }
  .dark-mode .pxl-grid.pxl-menu-list .menu-item .pxl-item--divider {
    border-bottom-color: rgba(244, 230, 220, 0.2) !important;
  }
  .pxl-grid.pxl-menu-list .menu-item .pxl--excerpt {
    font-size: 0.88rem !important;
    line-height: 1.45 !important;
    color: rgba(42, 36, 35, 0.72) !important;
    margin: 0 !important;
  }
  .dark-mode .pxl-grid.pxl-menu-list .menu-item .pxl--excerpt {
    color: rgba(244, 230, 220, 0.65) !important;
  }

  /* + Add Button */
  .sainik-theme-add-btn {
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 4px !important;
    padding: 4px 12px !important;
    background: var(--secondary-color, #c8693a) !important;
    color: #ffffff !important;
    border: none !important;
    border-radius: 20px !important;
    font-family: var(--font-heading, "Cormorant", serif) !important;
    font-size: 0.95rem !important;
    font-weight: 600 !important;
    letter-spacing: 0.5px !important;
    cursor: pointer !important;
    transition: all 0.25s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
    box-shadow: 0 3px 10px rgba(200, 105, 58, 0.3) !important;
    flex-shrink: 0 !important;
    margin: 0 !important;
  }
  .sainik-theme-add-btn:hover {
    background: #b0562b !important;
    transform: translateY(-2px) scale(1.05) !important;
    box-shadow: 0 6px 16px rgba(200, 105, 58, 0.45) !important;
  }
  .sainik-theme-add-btn:active {
    transform: translateY(0) scale(0.98) !important;
  }

  /* Floating Bar */
  .sainik-floating-bar {
    position: fixed;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1040;
    display: none;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    -webkit-tap-highlight-color: transparent;
    white-space: nowrap !important;
  }
  .sainik-float-pill {
    background: rgba(42, 36, 35, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1.5px solid var(--secondary-color, #c8693a);
    border-radius: 35px;
    padding: 7px 10px 7px 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45), 0 0 18px rgba(200, 105, 58, 0.25);
    transition: all 0.3s ease;
    white-space: nowrap !important;
  }
  .sainik-floating-bar:hover .sainik-float-pill {
    transform: translateY(-2px);
    box-shadow: 0 14px 36px rgba(0, 0, 0, 0.55), 0 0 24px rgba(200, 105, 58, 0.4);
    background: rgba(31, 25, 23, 0.98);
  }
  .sainik-float-info {
    display: flex;
    align-items: center;
    gap: 6px;
    color: #ffffff;
    font-family: var(--font-heading, "Cormorant", serif);
    white-space: nowrap !important;
  }
  .sainik-float-icon {
    font-size: 1.15rem;
  }
  .sainik-float-count-badge {
    font-size: 1.12rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: 0.5px;
    white-space: nowrap !important;
  }
  .sainik-float-sep {
    width: 1px;
    height: 18px;
    background: rgba(200, 105, 58, 0.4);
    flex-shrink: 0;
  }
  .sainik-float-cta {
    background: var(--secondary-color, #c8693a);
    color: #ffffff;
    padding: 6px 14px;
    border-radius: 20px;
    font-family: var(--font-heading, "Cormorant", serif);
    font-size: 1.02rem;
    font-weight: 600;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
    gap: 6px;
    transition: all 0.2s ease;
    white-space: nowrap !important;
    flex-shrink: 0;
  }
  .sainik-floating-bar:hover .sainik-float-cta {
    background: #b0562b;
  }
  .sainik-float-arrow {
    font-size: 1.1rem;
    transition: transform 0.2s ease;
  }
  .sainik-floating-bar:hover .sainik-float-arrow {
    transform: translateX(3px);
  }

  /* Cart Drawer & Overlay */
  .sainik-cart-overlay {
    position: fixed !important;
    inset: 0 !important;
    background: rgba(0, 0, 0, 0.65) !important;
    backdrop-filter: blur(4px) !important;
    -webkit-backdrop-filter: blur(4px) !important;
    z-index: 999990 !important;
    opacity: 0 !important;
    visibility: hidden !important;
    transition: opacity 0.35s ease, visibility 0.35s ease !important;
  }
  .sainik-cart-overlay.active {
    opacity: 1 !important;
    visibility: visible !important;
  }
  .sainik-cart-drawer {
    position: fixed !important;
    top: 0 !important;
    right: 0 !important;
    width: 430px !important;
    max-width: 100vw !important;
    height: 100vh !important;
    height: 100dvh !important;
    background: #faf5ef !important;
    color: #2a2423 !important;
    z-index: 999999 !important;
    transform: translateX(100%) !important;
    transition: transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1) !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
    box-shadow: -10px 0 40px rgba(0, 0, 0, 0.3) !important;
    font-family: 'Spectral', serif, sans-serif !important;
    box-sizing: border-box !important;
  }
  .sainik-cart-drawer * {
    box-sizing: border-box !important;
  }
  .sainik-cart-drawer.active {
    transform: translateX(0) !important;
  }

  /* Hide floating dark-mode button when cart drawer is active */
  body.sainik-cart-open .pxl-switch-button,
  .sainik-cart-drawer.active ~ .pxl-switch-button,
  .sainik-cart-overlay.active ~ .pxl-switch-button {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  /* Drawer Header */
  .sainik-cart-header {
    flex-shrink: 0 !important;
    padding: 15px 20px !important;
    border-bottom: 1px solid rgba(42, 36, 35, 0.1) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    background: #f3ebe0 !important;
  }
  .sainik-cart-header-left {
    display: flex !important;
    align-items: center !important;
    gap: 10px !important;
  }
  .sainik-cart-title {
    margin: 0 !important;
    padding: 0 !important;
    font-family: 'Cormorant', serif !important;
    font-size: 1.45rem !important;
    font-weight: 700 !important;
    color: #2a2423 !important;
    line-height: 1.2 !important;
    letter-spacing: 0.5px !important;
    border: none !important;
    background: none !important;
    white-space: nowrap !important;
  }
  .sainik-cart-title::before,
  .sainik-cart-title::after {
    display: none !important;
  }
  .sainik-cart-badge-count {
    background: #c8693a !important;
    color: #ffffff !important;
    font-family: 'Spectral', sans-serif !important;
    font-size: 0.74rem !important;
    font-weight: 700 !important;
    padding: 3px 9px !important;
    border-radius: 12px !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
    line-height: 1 !important;
    display: inline-block !important;
    white-space: nowrap !important;
  }
  .sainik-cart-close-btn {
    background: #ffffff !important;
    border: 1px solid rgba(42, 36, 35, 0.2) !important;
    width: 34px !important;
    height: 34px !important;
    min-width: 34px !important;
    min-height: 34px !important;
    border-radius: 50% !important;
    cursor: pointer !important;
    color: #2a2423 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
    margin: 0 !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    box-shadow: 0 2px 6px rgba(0,0,0,0.06) !important;
    transition: all 0.2s ease !important;
  }
  .sainik-cart-close-btn:hover {
    background: #c8693a !important;
    border-color: #c8693a !important;
    color: #ffffff !important;
    transform: rotate(90deg) !important;
  }

  /* Drawer Body */
  .sainik-cart-body {
    flex: 1 1 auto !important;
    min-height: 0 !important;
    overflow-y: auto !important;
    padding: 12px 18px !important;
    -webkit-overflow-scrolling: touch !important;
  }
  .sainik-cart-empty {
    text-align: center !important;
    padding: 40px 15px !important;
  }
  .sainik-cart-empty-icon {
    font-size: 2.6rem !important;
    margin-bottom: 10px !important;
    opacity: 0.7 !important;
  }
  .sainik-cart-empty h4 {
    font-family: 'Cormorant', serif !important;
    font-size: 1.35rem !important;
    font-weight: 700 !important;
    color: #2a2423 !important;
    margin: 0 0 6px 0 !important;
    border: none !important;
  }
  .sainik-cart-empty p {
    font-size: 0.88rem !important;
    color: #7a6e6a !important;
    line-height: 1.5 !important;
    margin: 0 !important;
  }

  /* Cart Item Row */
  .sainik-cart-item {
    display: flex !important;
    align-items: center !important;
    gap: 12px !important;
    padding: 9px 12px !important;
    background: #ffffff !important;
    border: 1px solid rgba(42, 36, 35, 0.08) !important;
    border-radius: 8px !important;
    margin-bottom: 9px !important;
    box-shadow: 0 2px 6px rgba(0,0,0,0.03) !important;
  }
  .sainik-cart-thumb {
    width: 48px !important;
    height: 48px !important;
    min-width: 48px !important;
    min-height: 48px !important;
    border-radius: 50% !important;
    object-fit: cover !important;
    border: 1.5px solid #c8693a !important;
    flex-shrink: 0 !important;
  }
  .sainik-cart-item-info {
    flex: 1 1 auto !important;
    min-width: 0 !important;
    text-align: left !important;
  }
  .sainik-cart-item-name {
    font-family: 'Cormorant', serif !important;
    font-size: 1.12rem !important;
    font-weight: 700 !important;
    color: #2a2423 !important;
    margin: 0 0 4px 0 !important;
    line-height: 1.2 !important;
    white-space: nowrap !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
  }
  .sainik-cart-qty-ctrl {
    display: inline-flex !important;
    align-items: center !important;
    border: 1px solid rgba(200, 105, 58, 0.35) !important;
    border-radius: 20px !important;
    background: #faf5ef !important;
    overflow: hidden !important;
  }
  .sainik-qty-btn {
    background: transparent !important;
    border: none !important;
    width: 26px !important;
    height: 24px !important;
    cursor: pointer !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    color: #c8693a !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    padding: 0 !important;
    line-height: 1 !important;
    transition: background 0.2s !important;
  }
  .sainik-qty-btn:hover {
    background: rgba(200, 105, 58, 0.15) !important;
  }
  .sainik-qty-num {
    padding: 0 6px !important;
    font-size: 0.85rem !important;
    font-weight: 700 !important;
    color: #2a2423 !important;
    min-width: 20px !important;
    text-align: center !important;
  }
  .sainik-item-delete-btn {
    background: transparent !important;
    border: none !important;
    color: #a89a95 !important;
    cursor: pointer !important;
    font-size: 15px !important;
    padding: 6px !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-shrink: 0 !important;
    transition: color 0.2s !important;
  }
  .sainik-item-delete-btn:hover {
    color: #e53935 !important;
  }

  /* Drawer Footer */
  .sainik-cart-footer {
    flex-shrink: 0 !important;
    padding: 12px 18px 16px !important;
    border-top: 1px solid rgba(42, 36, 35, 0.1) !important;
    background: #f3ebe0 !important;
    overflow-y: auto !important;
    max-height: 60vh !important;
  }

  /* Order Type Tabs */
  .sainik-order-type-tabs {
    display: flex !important;
    background: #e6dcce !important;
    border-radius: 8px !important;
    padding: 3px !important;
    margin-bottom: 10px !important;
    gap: 4px !important;
  }
  .sainik-type-tab {
    flex: 1 !important;
    background: transparent !important;
    border: none !important;
    padding: 7px 8px !important;
    border-radius: 6px !important;
    font-family: 'Spectral', sans-serif !important;
    font-size: 0.82rem !important;
    font-weight: 600 !important;
    color: #5c4e4a !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 4px !important;
    transition: all 0.2s ease !important;
    margin: 0 !important;
  }
  .sainik-type-tab.active {
    background: #c8693a !important;
    color: #ffffff !important;
    font-weight: 700 !important;
    box-shadow: 0 2px 6px rgba(200, 105, 58, 0.3) !important;
  }
  .sainik-radius-pill {
    background: rgba(255, 255, 255, 0.28) !important;
    font-size: 0.68rem !important;
    padding: 1px 5px !important;
    border-radius: 10px !important;
    line-height: 1.2 !important;
  }
  .sainik-type-tab:not(.active) .sainik-radius-pill {
    background: rgba(42, 36, 35, 0.1) !important;
    color: #70625e !important;
  }

  .sainik-cart-inputs {
    display: flex !important;
    flex-direction: column !important;
    gap: 8px !important;
    margin-bottom: 10px !important;
  }
  .sainik-input-group {
    display: flex !important;
    flex-direction: column !important;
    gap: 3px !important;
    text-align: left !important;
  }
  .sainik-input-group label {
    font-family: 'Spectral', sans-serif !important;
    font-size: 0.72rem !important;
    font-weight: 700 !important;
    text-transform: uppercase !important;
    letter-spacing: 0.8px !important;
    color: #6e605c !important;
    margin: 0 !important;
    padding: 0 !important;
  }
  .sainik-input-group input {
    width: 100% !important;
    height: 35px !important;
    padding: 5px 10px !important;
    border: 1px solid rgba(42, 36, 35, 0.2) !important;
    border-radius: 6px !important;
    font-family: 'Spectral', sans-serif !important;
    font-size: 0.86rem !important;
    outline: none !important;
    background: #ffffff !important;
    color: #2a2423 !important;
    box-shadow: none !important;
    margin: 0 !important;
    transition: border-color 0.2s !important;
  }
  .sainik-input-group input:focus {
    border-color: #c8693a !important;
    box-shadow: 0 0 0 2px rgba(200, 105, 58, 0.2) !important;
  }
  .sainik-input-group input::placeholder {
    color: #999 !important;
  }

  /* Distance Checker Box */
  .sainik-distance-checker-box {
    background: #ffffff !important;
    border: 1px solid rgba(200, 105, 58, 0.3) !important;
    border-radius: 6px !important;
    padding: 8px 10px !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 6px !important;
  }
  .sainik-distance-header {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
  }
  .sainik-distance-label {
    font-family: 'Spectral', sans-serif !important;
    font-size: 0.73rem !important;
    font-weight: 700 !important;
    color: #5c4e4a !important;
    text-transform: uppercase !important;
    letter-spacing: 0.5px !important;
  }
  .sainik-gps-btn {
    background: #2a2423 !important;
    color: #ffffff !important;
    border: none !important;
    border-radius: 12px !important;
    font-family: 'Spectral', sans-serif !important;
    font-size: 0.7rem !important;
    font-weight: 700 !important;
    padding: 3px 8px !important;
    cursor: pointer !important;
    transition: background 0.2s !important;
    display: inline-flex !important;
    align-items: center !important;
    gap: 3px !important;
  }
  .sainik-gps-btn:hover {
    background: #c8693a !important;
  }
  .sainik-distance-slider-wrap {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
  }
  .sainik-distance-slider-wrap input[type="range"] {
    flex: 1 !important;
    accent-color: #c8693a !important;
    cursor: pointer !important;
    height: 5px !important;
    margin: 0 !important;
  }
  .sainik-distance-val-box {
    font-family: 'Spectral', sans-serif !important;
    font-size: 0.92rem !important;
    font-weight: 700 !important;
    color: #c8693a !important;
    min-width: 46px !important;
    text-align: right !important;
  }
  .sainik-distance-val-box small {
    font-size: 0.72rem !important;
    color: #7a6e6a !important;
  }

  /* Status Banner */
  .sainik-status-banner {
    display: flex !important;
    align-items: flex-start !important;
    gap: 8px !important;
    padding: 8px 10px !important;
    border-radius: 6px !important;
    font-size: 0.78rem !important;
    line-height: 1.35 !important;
    transition: all 0.25s ease !important;
  }
  .sainik-status-banner.success {
    background: #e8f5e9 !important;
    border: 1px solid #a5d6a7 !important;
    color: #1b5e20 !important;
  }
  .sainik-status-banner.error {
    background: #ffebee !important;
    border: 1px solid #ef9a9a !important;
    color: #b71c1c !important;
  }
  .sainik-status-banner.info {
    background: #e3f2fd !important;
    border: 1px solid #90caf9 !important;
    color: #0d47a1 !important;
  }
  .sainik-status-icon {
    font-weight: 700 !important;
    font-size: 0.95rem !important;
    line-height: 1 !important;
    flex-shrink: 0 !important;
    margin-top: 1px !important;
  }
  .sainik-status-text {
    flex: 1 !important;
    text-align: left !important;
  }

  /* Action Buttons */
  .sainik-whatsapp-checkout-btn {
    width: 100% !important;
    background: #25D366 !important;
    color: #ffffff !important;
    border: none !important;
    border-radius: 6px !important;
    padding: 11px 16px !important;
    font-family: 'Spectral', sans-serif !important;
    font-size: 0.98rem !important;
    font-weight: 700 !important;
    letter-spacing: 0.5px !important;
    cursor: pointer !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35) !important;
    transition: all 0.2s ease !important;
    margin: 0 !important;
  }
  .sainik-whatsapp-checkout-btn:hover:not(.disabled) {
    background: #1ebc59 !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 6px 18px rgba(37, 211, 102, 0.45) !important;
  }
  .sainik-whatsapp-checkout-btn.disabled {
    background: #a49e9b !important;
    box-shadow: none !important;
    cursor: not-allowed !important;
    opacity: 0.8 !important;
  }

  .sainik-clear-cart-btn {
    width: 100% !important;
    background: transparent !important;
    border: none !important;
    color: #8c7e7a !important;
    font-family: 'Spectral', sans-serif !important;
    font-size: 0.75rem !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    letter-spacing: 1px !important;
    margin-top: 7px !important;
    padding: 3px 0 !important;
    cursor: pointer !important;
    display: block !important;
    text-align: center !important;
    transition: color 0.2s !important;
  }
  .sainik-clear-cart-btn:hover {
    color: #e53935 !important;
  }

  /* Dark mode overrides */
  .dark-mode #sainik-cart-drawer {
    background: #1f1917 !important;
    color: #f4e6dc !important;
    border-left: 1px solid rgba(200, 105, 58, 0.25) !important;
  }
  .dark-mode .sainik-cart-header {
    background: #27201e !important;
    border-color: rgba(255, 255, 255, 0.08) !important;
  }
  .dark-mode .sainik-cart-title {
    color: #f4e6dc !important;
  }
  .dark-mode .sainik-cart-close-btn {
    background: #2a2220 !important;
    border-color: rgba(255, 255, 255, 0.15) !important;
    color: #f4e6dc !important;
  }
  .dark-mode .sainik-cart-item {
    background: #28201e !important;
    border-color: rgba(255, 255, 255, 0.06) !important;
  }
  .dark-mode .sainik-cart-item-name {
    color: #f4e6dc !important;
  }
  .dark-mode .sainik-cart-qty-ctrl {
    background: #1f1917 !important;
    border-color: rgba(200, 105, 58, 0.4) !important;
  }
  .dark-mode .sainik-qty-num {
    color: #f4e6dc !important;
  }
  .dark-mode .sainik-cart-footer {
    background: #27201e !important;
    border-color: rgba(255, 255, 255, 0.08) !important;
  }
  .dark-mode .sainik-order-type-tabs {
    background: #1a1413 !important;
  }
  .dark-mode .sainik-type-tab {
    color: #a89a95 !important;
  }
  .dark-mode .sainik-distance-checker-box {
    background: #1f1917 !important;
    border-color: rgba(200, 105, 58, 0.3) !important;
  }
  .dark-mode .sainik-distance-label {
    color: #d4c5c0 !important;
  }
  .dark-mode .sainik-gps-btn {
    background: #3b302c !important;
    color: #f4e6dc !important;
  }
  .dark-mode .sainik-input-group label {
    color: #bfaea9 !important;
  }
  .dark-mode .sainik-input-group input {
    background: #1f1917 !important;
    color: #f4e6dc !important;
    border-color: rgba(255, 255, 255, 0.15) !important;
  }
  .dark-mode .sainik-clear-cart-btn {
    color: #a89a95 !important;
  }

  /* Toast Notification */
  .sainik-toast {
    position: fixed;
    bottom: 85px;
    left: 50%;
    transform: translateX(-50%) translateY(8px);
    z-index: 999999;
    background: var(--primary-color, #2a2423);
    color: #fff;
    padding: 9px 18px;
    border-radius: 6px;
    font-family: var(--font-heading, "Cormorant", serif);
    font-size: 0.95rem;
    font-style: italic;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    border-left: 3px solid var(--secondary-color, #c8693a);
    opacity: 0;
    pointer-events: none;
    transition: all 0.3s ease;
    white-space: nowrap !important;
  }
  .sainik-toast.show {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
</style>

<script>
(function() {
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
      this.init();
    }

    loadCart() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : {};
      } catch (e) {
        return {};
      }
    }

    saveCart() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.items));
      } catch (e) {}
    }

    getTotalCount() {
      return Object.values(this.items).reduce((sum, it) => sum + (it.qty || 0), 0);
    }

    add(name, img) {
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
        tabDelivery?.classList.add('active');
        tabTakeaway?.classList.remove('active');
        if (deliveryContainer) deliveryContainer.style.display = 'flex';
        if (takeawayContainer) takeawayContainer.style.display = 'none';
      } else {
        tabTakeaway?.classList.add('active');
        tabDelivery?.classList.remove('active');
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
      // Keep state reactive
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
          const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(RESTAURANT_COORDS.lat * Math.PI / 180) * Math.cos(userLat * Math.PI / 180) *
                    Math.sin(dLng/2) * Math.sin(dLng/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          const calculatedKm = Math.max(0.5, Math.min(15.0, Math.round((R * c) * 10) / 10));

          this.setDistance(calculatedKm);
          this.showToast('GPS Distance detected: ' + calculatedKm + ' km');
        },
        (err) => {
          if (gpsBtn) gpsBtn.innerText = '📍 Detect GPS';
          alert('Could not access GPS location (' + err.message + '). You can set distance using the slider.');
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
        if (banner) {
          banner.className = 'sainik-status-banner success';
        }
        if (icon) icon.innerText = '✓';
        if (text) {
          text.innerHTML = '<strong>Delivery Available!</strong> (~' + this.distanceKm.toFixed(1) + ' km from Sainik Rasoi)';
        }
        if (checkoutBtn) checkoutBtn.classList.remove('disabled');
        if (checkoutText) checkoutText.innerText = 'Send Order via WhatsApp';
      } else {
        if (banner) {
          banner.className = 'sainik-status-banner error';
        }
        if (icon) icon.innerText = '⚠️';
        if (text) {
          text.innerHTML = '<strong>Currently deliveries are not available for your area.</strong><br/><span style="font-size:0.75rem;opacity:0.9;">Deliveries are available only within 7 km radius of Sainik Rasoi. You can switch to Takeaway / Dine-in above!</span>';
        }
        if (checkoutBtn) checkoutBtn.classList.add('disabled');
        if (checkoutText) checkoutText.innerText = 'Delivery Unavailable (> 7 km)';
      }
    }

    open() {
      document.getElementById('sainik-cart-overlay')?.classList.add('active');
      document.getElementById('sainik-cart-drawer')?.classList.add('active');
      document.body.classList.add('sainik-cart-open');
      document.body.style.overflow = 'hidden';
      this.renderDrawerItems();
      this.updateDeliveryStatus();
    }

    close() {
      document.getElementById('sainik-cart-overlay')?.classList.remove('active');
      document.getElementById('sainik-cart-drawer')?.classList.remove('active');
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
        const safeName = name.replace(/'/g, "\'");
        html += `
          <div class="sainik-cart-item">
            <img src="${item.img}" alt="${name}" class="sainik-cart-thumb" />
            <div class="sainik-cart-item-info">
              <div class="sainik-cart-item-name">${name}</div>
              <div class="sainik-cart-qty-ctrl">
                <button type="button" class="sainik-qty-btn" onclick="sainikCart.updateQty('${safeName}', -1)">−</button>
                <span class="sainik-qty-num">${item.qty}</span>
                <button type="button" class="sainik-qty-btn" onclick="sainikCart.updateQty('${safeName}', 1)">+</button>
              </div>
            </div>
            <button type="button" class="sainik-item-delete-btn" onclick="sainikCart.deleteItem('${safeName}')" title="Remove">✕</button>
          </div>
        `;
      });
      container.innerHTML = html;
    }

    updateUI() {
      const total = this.getTotalCount();
      
      // Update floating bar on bottom-center
      const floatBar = document.getElementById('sainik-floating-cart-bar');
      const floatCount = document.getElementById('sainik-float-count');
      if (floatBar && floatCount) {
        floatCount.innerText = total + (total === 1 ? ' Item' : ' Items');
        floatBar.style.display = total > 0 ? 'inline-flex' : 'none';
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

        if (!address) {
          alert('Please enter your delivery address.');
          document.getElementById('sainik-order-address')?.focus();
          return;
        }

        let text = '*🛵 NEW HOME DELIVERY ORDER — SAINIK RASOI*\n';
        text += '================================\n';
        text += '*Customer Information:*\n';
        if (custName) text += '• Name: ' + custName + '\n';
        text += '• Address: ' + address + '\n';
        text += '• Delivery Distance: ~' + this.distanceKm.toFixed(1) + ' km (Within 7km zone ✓)\n';
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
      // Connect to native header shopping basket button
      document.querySelectorAll('.pxl-cart-sidebar-button, .pxl-side-panel-cart').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.open();
        });
      });

      this.updateUI();
    }
  }

  window.sainikCart = new SainikCart();
})();
</script>
'''

final_html = final_html.replace('</body>', cart_system_code + '\n</body>')

with open('public/menu-02/index.html', 'w', encoding='utf-8') as f:
    f.write(final_html)

total_dishes = sum(len(c['items']) for c in CATEGORIES)
print(f"Successfully generated public/menu-02/index.html with perfect 68x68 circular thumbnails and non-colliding floating cart! Total dishes: {total_dishes}")
