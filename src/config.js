/**
 * HOMERS EMERTON - CONFIGURATION & STORE DATA
 * All shop data, menu items, prices, and hours are defined here.
 * Items marked as [PLACEHOLDER] can be replaced or extended as needed.
 */

export const SHOP_INFO = {
  name: "Homers Emerton",
  shortName: "Homers",
  tagline: "Hot, fresh and made to order",
  subTagline: "Burgers · Fish & Chips · Curries · Hot Roasts",
  lunchSpecialAnchor: "Lunch specials from $12.90",
  address: "Shop 2, 135-137 Popondetta Rd, Emerton NSW 2770, Australia",
  displayAddress: "135-137 Popondetta Rd, Emerton NSW",
  phone: "(02) 9677 1188",
  phoneRaw: "+61296771188",
  whatsapp: "+61412345678", // [PLACEHOLDER: Replace with your actual WhatsApp business number]
  whatsappDisplay: "+61 412 345 678",
  coordinates: {
    lat: -33.7445922,
    lng: 150.8102518,
  },
  googleMapsUrl: "https://maps.app.goo.gl/pNvYCUGrTkYLeegz6",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3317.6218908762944!2d150.8102518!3d-33.7445922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b129b01be573cbf%3A0x49e099161b3d7178!2sHomers%20Emerton!5e0!3m2!1sen!2sau!4v1701389670196!5m2!1sen!2sau",
  uberEatsUrl: "https://www.ubereats.com/au/store/homers-emerton/PRuaVD1CQkiuOPbaFMDu4Q",
  doorDashUrl: "https://www.doordash.com/store/homers-emerton-849709/?utm_campaign=gpa",
  facebookUrl: "https://www.facebook.com/homersemerton/",
  instagramUrl: "https://www.instagram.com/homersemerton/",
  currency: "AUD",
  currencySymbol: "$",
  logo: "/logo.png",
  badgeLogo: "/badge-logo.jpg",
  heroBanner: "/homeslide.jpg",
  chickenDealImg: "/chicken-deal.jpg",
  payments: ["Visa", "Mastercard", "EFTPOS", "Apple Pay", "Google Pay"],
};

// Official Physical In-Store Wall Menu Boards from homersemerton.com.au
export const STORE_MENU_BOARDS = [
  { id: 1, title: "Wall Menu 1 · Flame-Grilled Burgers & Rolls", image: "/menu-boards/menu-board-1.jpg" },
  { id: 2, title: "Wall Menu 2 · Hot Roasts & Carvery Dinners", image: "/menu-boards/menu-board-2.jpg" },
  { id: 3, title: "Wall Menu 3 · Seafood Sensations & Fish", image: "/menu-boards/menu-board-3.jpg" },
  { id: 4, title: "Wall Menu 4 · Salads, Snacks & Meal Combos", image: "/menu-boards/menu-board-4.jpg" },
];

// Operating Hours in Sydney Time (Australia/Sydney)
export const OPERATING_HOURS = {
  timezone: "Australia/Sydney",
  schedule: [
    { day: "Sunday", opens: "10:00", closes: "20:00", label: "10:00 AM – 8:00 PM" },
    { day: "Monday", opens: "10:00", closes: "20:00", label: "10:00 AM – 8:00 PM" },
    { day: "Tuesday", opens: "10:00", closes: "20:00", label: "10:00 AM – 8:00 PM" },
    { day: "Wednesday", opens: "10:00", closes: "20:00", label: "10:00 AM – 8:00 PM" },
    { day: "Thursday", opens: "10:00", closes: "20:30", label: "10:00 AM – 8:30 PM" },
    { day: "Friday", opens: "10:00", closes: "20:30", label: "10:00 AM – 8:30 PM" },
    { day: "Saturday", opens: "10:00", closes: "20:30", label: "10:00 AM – 8:30 PM" },
  ],
};

// CHEF'S PICKS (Signature highlight dishes)
export const CHEFS_PICKS = [
  {
    id: "cp-1",
    name: "Bacon Double Cheese Burger",
    subtitle: "Flame-Grilled Angus Masterpiece",
    description: "Two 150g grass-fed flame-grilled patties layered with melted aged cheddar, smoky woodfired bacon, house burger glaze, and crisp pickles on a toasted milk bun.",
    price: 18.90,
    comboPrice: 24.90,
    tags: ["Flame-Grilled", "Customer Favorite", "100% Angus"],
    image: "/menu/bacon-double-burger.jpg",
    emojiFallback: "🍔",
    accentColor: "#e8700a",
  },
  {
    id: "cp-2",
    name: "Crumbed Fish & Chips",
    subtitle: "Crispy Golden Ocean Catch",
    description: "Locally sourced flake fillet hand-crumbed in seasoned panko crumbs, served with a mountain of crunchy hot chips, house-made creamy tartare sauce, and fresh lemon wedge.",
    price: 19.50,
    comboPrice: 25.50,
    tags: ["Wild Caught", "Panko Crumbed", "Chef's Pride"],
    image: "/menu/fish-and-chips.jpg",
    emojiFallback: "🐟",
    accentColor: "#f59e0b",
  },
  {
    id: "cp-3",
    name: "Butter Chicken Curry",
    subtitle: "Rich, Velvety & Slow-Simmered",
    description: "Tender tandoori-spiced chicken breast cooked in a creamy spiced tomato, butter, and cashew gravy. Served with aromatic basmati rice and warm garlic butter naan bread.",
    price: 19.90,
    comboPrice: 23.90,
    tags: ["Slow Simmered", "Comfort Classic", "Rich Gravy"],
    image: "/menu/butter-chicken-curry.jpg",
    emojiFallback: "🍛",
    accentColor: "#c7341c",
  },
];

// BURGER BUILDER LAYERS & ADD-ONS
export const BURGER_BUILDER_CONFIG = {
  basePrice: 14.50,
  defaultLayers: [
    { id: "bottom-bun", name: "Toasted Brioche Base", type: "bun", color: "#e3a857", height: 18, emoji: "🍞" },
    { id: "sauce", name: "Homer's Secret Relish", type: "sauce", color: "#c7341c", height: 6, emoji: "🥫" },
    { id: "patty", name: "Flame-Grilled Beef Patty", type: "meat", color: "#542b14", height: 22, emoji: "🥩" },
    { id: "cheese", name: "Melted American Cheddar", type: "cheese", color: "#ffb703", height: 8, emoji: "🧀" },
    { id: "bacon", name: "Crispy Smoked Bacon", type: "meat", color: "#9e2a2b", height: 10, emoji: "🥓" },
    { id: "tomato", name: "Ripe Field Tomato", type: "veg", color: "#e63946", height: 12, emoji: "🍅" },
    { id: "lettuce", name: "Crisp Green Lettuce", type: "veg", color: "#588157", height: 14, emoji: "🥬" },
    { id: "top-bun", name: "Sesame Brioche Crown", type: "bun", color: "#e3a857", height: 26, emoji: "🥯" },
  ],
  availableAddons: [
    { id: "extra-patty", name: "Extra Beef Patty (150g)", price: 4.50, emoji: "🥩" },
    { id: "extra-bacon", name: "Double Smoked Bacon", price: 3.00, emoji: "🥓" },
    { id: "extra-cheese", name: "Double Melted Cheese", price: 2.00, emoji: "🧀" },
    { id: "fried-egg", name: "Sunny-Side Fried Egg", price: 2.50, emoji: "🍳" },
    { id: "jalapenos", name: "Fire-Roasted Jalapeños", price: 1.50, emoji: "🌶️" },
    { id: "truffle-mayo", name: "Gourmet Truffle Mayo", price: 1.80, emoji: "✨" },
  ],
};

// CATEGORIZED FULL MENU (AUD realistic placeholders)
export const MENU_CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "burgers", label: "Burgers & Rolls", emoji: "🍔" },
  { id: "fish-chips", label: "Fish & Chips", emoji: "🐟" },
  { id: "curries", label: "Aromatic Curries", emoji: "🍛" },
  { id: "hot-roasts", label: "Hot Roasts & Carvery", emoji: "🍗" },
  { id: "sides", label: "Sides & Snacks", emoji: "🍟" },
  { id: "drinks", label: "Cold Drinks & Shakes", emoji: "🥤" },
];

export const MENU_ITEMS = [
  // --- BURGERS & ROLLS ---
  {
    id: "bg-1",
    name: "The Famous Tower Burger",
    category: "burgers",
    price: 19.90,
    description: "Double flame-grilled beef, double bacon, egg, pineapple, beetroot, melted cheese, and smoky BBQ glaze.",
    image: "/menu/tower-burger.jpg",
    emoji: "🍔",
    badge: "Bestseller",
    popular: true,
  },
  {
    id: "bg-2",
    name: "Bacon Double Cheese Burger",
    category: "burgers",
    price: 18.90,
    description: "Two seasoned beef patties, crispy bacon rashers, double American cheddar, pickles, and Homer's burger sauce.",
    image: "/menu/bacon-double-burger.jpg",
    emoji: "🍔",
    badge: "Fan Favourite",
    popular: true,
  },
  {
    id: "bg-3",
    name: "Crispy Schnitzel Roll Combo",
    category: "burgers",
    price: 16.90,
    description: "Hand-crumbed chicken breast schnitzel with crisp lettuce, creamy mayonnaise on a freshly baked long roll.",
    image: "/menu/schnitzel-roll.jpg",
    emoji: "🥪",
    badge: "Popular",
  },
  {
    id: "bg-4",
    name: "Tender Roast Beef Roll",
    category: "burgers",
    price: 15.90,
    description: "Slow-roasted tender beef shaved hot, soaked in rich pan gravy and stuffed in a warm crusty roll.",
    image: "/menu/roast-beef-roll.jpg",
    emoji: "🥖",
  },
  {
    id: "bg-5",
    name: "Classic Steak Burger",
    category: "burgers",
    price: 17.50,
    description: "Minute scotch fillet steak, caramelised onions, beetroot, tomato, lettuce, and rich BBQ sauce.",
    image: "/menu/steak-burger.jpg",
    emoji: "🥩",
  },
  {
    id: "bg-6",
    name: "Bacon & Egg Breakfast Roll",
    category: "burgers",
    price: 9.90,
    description: "Crispy grilled bacon and two fried eggs with your choice of BBQ, tomato or sweet chilli relish.",
    image: "/menu/bacon-egg-roll.jpg",
    emoji: "🍳",
  },

  // --- FISH & CHIPS ---
  {
    id: "fc-1",
    name: "Crumbed Fish & Chips Pack",
    category: "fish-chips",
    price: 19.50,
    description: "Crispy crumbed fish fillet, generous scoop of hot salted chips, tartare sauce, and lemon wedge.",
    image: "/menu/fish-and-chips.jpg",
    emoji: "🐟",
    badge: "Classic",
    popular: true,
  },
  {
    id: "fc-2",
    name: "Battered Fish, Chips & Salad",
    category: "fish-chips",
    price: 22.90,
    description: "Golden battered flake, crunchy chips, house garden salad with vinaigrette, and fresh tartare.",
    image: "/menu/battered-fish-salad.jpg",
    emoji: "🥗",
  },
  {
    id: "fc-3",
    name: "Salt & Pepper Calamari Pack",
    category: "fish-chips",
    price: 18.50,
    description: "Tender flash-fried calamari rings dusted in citrus pepper spice, served with chips and lemon aioli.",
    image: "/menu/calamari-chips.jpg",
    emoji: "🦑",
    badge: "Chef's Special",
  },
  {
    id: "fc-4",
    name: "Seafood Lover's Basket",
    category: "fish-chips",
    price: 26.90,
    description: "Battered fish fillet, prawn cutlets, calamari rings, seafood stick, sea scallops, chips & tartare.",
    image: "/menu/seafood-basket.jpg",
    emoji: "🦐",
    badge: "Feast",
    popular: true,
  },

  // --- AROMATIC CURRIES ---
  {
    id: "cr-1",
    name: "Butter Chicken Curry with Naan",
    category: "curries",
    price: 19.90,
    description: "Creamy tandoori chicken simmered in rich buttery tomato gravy, served with fluffy basmati rice and garlic naan.",
    image: "/menu/butter-chicken-curry.jpg",
    emoji: "🍛",
    badge: "Chef's Pride",
    popular: true,
  },
  {
    id: "cr-2",
    name: "Slow-Cooked Beef Rogan Josh",
    category: "curries",
    price: 20.90,
    description: "Tender chunks of slow-braised beef cooked with Kashmiri spices, fragrant cloves, cardamom, and basmati rice.",
    image: "/menu/beef-curry.jpg",
    emoji: "🍲",
  },
  {
    id: "cr-3",
    name: "Coconut Chicken Madras Curry",
    category: "curries",
    price: 19.50,
    description: "South-Indian inspired curry with mustard seeds, curry leaves, tender chicken, and velvety coconut cream.",
    image: "/menu/coconut-curry.jpg",
    emoji: "🥥",
  },

  // --- HOT ROASTS & CARVERY ---
  {
    id: "hr-1",
    name: "Whole Roast Chicken Dinner Deal",
    category: "hot-roasts",
    price: 28.90,
    description: "Whole seasoned rotisserie chicken, large hot chips, creamy coleslaw, and rich hot poultry gravy.",
    image: "/chicken-deal.jpg",
    emoji: "🍗",
    badge: "Official Photo",
    popular: true,
  },
  {
    id: "hr-2",
    name: "Half Roast Chicken & Chips Pack",
    category: "hot-roasts",
    price: 16.90,
    description: "Half succulent rotisserie roast chicken served with piping hot chips and homemade pan gravy.",
    image: "/chicken-deal.jpg",
    emoji: "🍗",
  },
  {
    id: "hr-3",
    name: "Slow Roast Pork Dinner with Crackling",
    category: "hot-roasts",
    price: 24.50,
    description: "Succulent roast pork slices with crispy bubbly crackling, roasted pumpkin, potatoes, peas & rich apple gravy.",
    image: "/menu/roast-pork.jpg",
    emoji: "🥩",
    badge: "Sunday Favourite",
    popular: true,
  },

  // --- SIDES & SNACKS ---
  {
    id: "sd-1",
    name: "Famous Seasoned Hot Chips (Large)",
    category: "sides",
    price: 8.50,
    description: "Crispy golden beer-battered potato chips dusted with Homer's secret chicken salt blend.",
    image: "/menu/hot-chips.jpg",
    emoji: "🍟",
    popular: true,
  },
  {
    id: "sd-2",
    name: "Loaded Cheese & Bacon Fries",
    category: "sides",
    price: 12.90,
    description: "Hot chips drenched in melted liquid cheddar, crispy smoky bacon pieces, and chopped spring onions.",
    image: "/menu/loaded-fries.jpg",
    emoji: "🧀",
    badge: "Cheesy",
  },
  {
    id: "sd-3",
    name: "Golden Potato Scallops (Pack of 4)",
    category: "sides",
    price: 7.20,
    description: "Fresh sliced potato dipped in crunchy batter and fried golden, seasoned with savoury chicken salt.",
    image: "/menu/potato-scallop.jpg",
    emoji: "🥔",
  },
  {
    id: "sd-4",
    name: "Battered Sav on a Stick (2 pcs)",
    category: "sides",
    price: 8.90,
    description: "Classic Australian saveloy battered and deep fried on a stick, served with tomato sauce.",
    image: "/menu/battered-sav.jpg",
    emoji: "🌭",
  },
  {
    id: "sd-5",
    name: "Fresh Chicken Caesar Salad",
    category: "sides",
    price: 12.90,
    description: "Crisp cos lettuce, grilled seasoned chicken, bacon bits, parmesan cheese, herb croutons & Caesar dressing.",
    image: "/menu/chicken-caesar.jpg",
    emoji: "🥗",
  },

  // --- DRINKS & SHAKES ---
  {
    id: "dr-1",
    name: "Thick Handspun Shake (Vanilla / Choc)",
    category: "drinks",
    price: 7.50,
    description: "Old-school thick shake made with three scoops of dairy ice cream and chilled milk.",
    image: "/menu/thick-shake.jpg",
    emoji: "🥤",
  },
  {
    id: "dr-2",
    name: "Chilled Soft Drink Can (375ml)",
    category: "drinks",
    price: 3.50,
    description: "Coke, Coke Zero, Solo, Fanta, Sprite, or Kirks Pasito.",
    image: "/menu/coke-can.jpg",
    emoji: "🥫",
  },
  {
    id: "dr-3",
    name: "Family 1.25L Soft Drink Bottle",
    category: "drinks",
    price: 6.50,
    description: "Ideal for family meals and gatherings. Coke, Sprite, Lift or Fanta.",
    image: "/menu/125-drink.jpg",
    emoji: "🍾",
  },
];

// REVIEWS (Google verified testimonials)
export const CUSTOMER_REVIEWS = [
  {
    name: "Tanielu Pula",
    rating: 5,
    date: "Local Guide",
    comment: "Good service, staff are always friendly and patient. The burgers are always hot, fresh and huge!",
  },
  {
    name: "Kylie Seaton",
    rating: 5,
    date: "Verified Customer",
    comment: "The crumbed fish is our absolute favourite, tender and fresh. Chicken Caesar Salad has heaps of chicken and the chips are delish!",
  },
  {
    name: "Madie Black",
    rating: 5,
    date: "Local Regular",
    comment: "The team is lovely, very patient whilst we ordered. Great customer service and consistently amazing food every single time.",
  },
  {
    name: "Vicki Lala",
    rating: 5,
    date: "10-Year Customer",
    comment: "Been eating at Homers for easily 10 years. Only place in western Sydney I trust for top quality seafood and roasts!",
  },
];
