// Product Catalog for Allyouneed Flagship Tech & Mobile Store
const PRODUCTS_DATA = [
  {
    id: "iphone-16-pro-max",
    name: "Apple iPhone 16 Pro Max",
    brand: "Apple",
    category: "Smartphones",
    tagline: "Titanium. So strong. So light. So Pro.",
    price: 1199,
    originalPrice: 1299,
    badge: "Flagship 2026",
    badgeType: "gradient",
    rating: 4.9,
    reviewsCount: 384,
    inStock: true,
    isFeatured: true,
    isHotDeal: true,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Natural Titanium", hex: "#9b968f" },
      { name: "Desert Titanium", hex: "#c5ad93" },
      { name: "Black Titanium", hex: "#2b2b2d" },
      { name: "White Titanium", hex: "#edece7" }
    ],
    storageOptions: [
      { size: "256GB", priceOffset: 0 },
      { size: "512GB", priceOffset: 200 },
      { size: "1TB", priceOffset: 400 }
    ],
    specs: {
      display: "6.9\" Super Retina XDR OLED, 120Hz ProMotion",
      chipset: "Apple A18 Pro (3nm)",
      camera: "48MP Fusion + 48MP Ultra-Wide + 12MP 5x Telephoto",
      battery: "4,685 mAh, 33W Fast Charging & MagSafe",
      os: "iOS 18 with Apple Intelligence",
      connectivity: "5G Ultra Wideband, Wi-Fi 7, USB-C 3.2"
    },
    description: "The pinnacle of mobile engineering. Featuring aerospace-grade titanium design, Camera Control sensor, revolutionary A18 Pro silicon, and cutting-edge battery endurance."
  },
  {
    id: "samsung-s24-ultra",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    category: "Smartphones",
    tagline: "Galaxy AI is here. Welcome to the era of mobile AI.",
    price: 1249,
    originalPrice: 1399,
    badge: "Galaxy AI",
    badgeType: "hot",
    rating: 4.9,
    reviewsCount: 412,
    inStock: true,
    isFeatured: true,
    isHotDeal: true,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Titanium Gray", hex: "#7a797e" },
      { name: "Titanium Black", hex: "#222224" },
      { name: "Titanium Violet", hex: "#5b507a" },
      { name: "Titanium Yellow", hex: "#eedaa2" }
    ],
    storageOptions: [
      { size: "256GB", priceOffset: 0 },
      { size: "512GB", priceOffset: 150 },
      { size: "1TB", priceOffset: 350 }
    ],
    specs: {
      display: "6.8\" Dynamic LTPO AMOLED 2X, 120Hz, 2600 nits, Anti-Reflective",
      chipset: "Qualcomm Snapdragon 8 Gen 3 for Galaxy",
      camera: "200MP Main + 50MP 5x Periscope + 10MP 3x Tele + 12MP UW",
      battery: "5,000 mAh, 45W Wired, 15W Wireless",
      os: "One UI 6.1 (Android 14, 7 Years OS Updates)",
      connectivity: "5G, Wi-Fi 7, S-Pen Built-in, UWB"
    },
    description: "Unleash whole new levels of creativity and productivity with built-in S Pen and breakthrough Galaxy AI features like Circle to Search and Live Translate."
  },
  {
    id: "pixel-9-pro-xl",
    name: "Google Pixel 9 Pro XL",
    brand: "Google",
    category: "Smartphones",
    tagline: "Engineered by Google. Built for Gemini AI.",
    price: 1099,
    originalPrice: 1199,
    badge: "Google AI",
    badgeType: "gradient",
    rating: 4.8,
    reviewsCount: 220,
    inStock: true,
    isFeatured: true,
    isHotDeal: false,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Obsidian", hex: "#1f2022" },
      { name: "Porcelain", hex: "#f0eeea" },
      { name: "Hazel", hex: "#606259" },
      { name: "Rose Quartz", hex: "#e7cecb" }
    ],
    storageOptions: [
      { size: "128GB", priceOffset: 0 },
      { size: "256GB", priceOffset: 100 },
      { size: "512GB", priceOffset: 220 }
    ],
    specs: {
      display: "6.8\" Super Actua LTPO OLED, 1-120Hz, 3000 nits peak",
      chipset: "Google Tensor G4 with Titan M2 security",
      camera: "50MP Main + 48MP Quad PD Ultrawide + 48MP 5x Telephoto",
      battery: "5,060 mAh with 37W wired fast charging",
      os: "Android 15 (7 years OS & Feature Drops)",
      connectivity: "Satellite SOS, Wi-Fi 7, Ultra-Wideband"
    },
    description: "The most powerful Pixel yet with an iconic redesigned camera visor, custom Google Tensor G4 architecture, and Gemini Advanced integrated."
  },
  {
    id: "oneplus-12",
    name: "OnePlus 12 5G Flagship",
    brand: "OnePlus",
    category: "Smartphones",
    tagline: "Smooth Beyond Belief. Hasselblad Camera 4th Gen.",
    price: 799,
    originalPrice: 899,
    badge: "Value Beast",
    badgeType: "hot",
    rating: 4.8,
    reviewsCount: 310,
    inStock: true,
    isFeatured: true,
    isHotDeal: true,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Silky Black", hex: "#1c1c1e" },
      { name: "Flowy Emerald", hex: "#2b564a" }
    ],
    storageOptions: [
      { size: "256GB / 12GB RAM", priceOffset: 0 },
      { size: "512GB / 16GB RAM", priceOffset: 100 }
    ],
    specs: {
      display: "6.82\" 2K 120Hz ProXDR with Aqua Touch, 4500 nits",
      chipset: "Qualcomm Snapdragon 8 Gen 3 with Trinity Engine",
      camera: "50MP Sony LYT-808 + 64MP 3X Periscope + 48MP UW",
      battery: "5,400 mAh, 100W SUPERVOOC + 50W AIRVOOC",
      os: "OxygenOS 14 (Android 14)",
      connectivity: "5G, Dual SIM, Wi-Fi 7, IR Blaster"
    },
    description: "Unmatched performance with 100W wired turbo charging that hits 100% in 26 minutes, paired with 4th Gen Hasselblad optical tuning."
  },
  {
    id: "nothing-phone-2",
    name: "Nothing Phone (2)",
    brand: "Nothing",
    category: "Smartphones",
    tagline: "Come to the bright side. Glyph Interface redefined.",
    price: 599,
    originalPrice: 699,
    badge: "Iconic Design",
    badgeType: "gradient",
    rating: 4.7,
    reviewsCount: 195,
    inStock: true,
    isFeatured: false,
    isHotDeal: false,
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Dark Grey", hex: "#32353a" },
      { name: "White", hex: "#f1f3f5" }
    ],
    storageOptions: [
      { size: "128GB / 8GB RAM", priceOffset: 0 },
      { size: "256GB / 12GB RAM", priceOffset: 70 },
      { size: "512GB / 12GB RAM", priceOffset: 150 }
    ],
    specs: {
      display: "6.7\" Flexible LTPO OLED, 120Hz, HDR10+",
      chipset: "Snapdragon 8+ Gen 1 (4nm)",
      camera: "Dual 50MP Sony IMX890 OIS + 50MP Samsung JN1",
      battery: "4,700 mAh, 45W Fast Charging",
      os: "Nothing OS 2.5 (Monochrome aesthetic)",
      connectivity: "Glyph LED sequences, 5G, Wi-Fi 6"
    },
    description: "A triumph of transparent industrial design with customizable Glyph lights that turn smartphone interaction into a distraction-free artform."
  },
  {
    id: "samsung-galaxy-z-fold-6",
    name: "Samsung Galaxy Z Fold 6",
    brand: "Samsung",
    category: "Foldables",
    tagline: "Slimmer, lighter, and powered by ultra-productive AI.",
    price: 1899,
    originalPrice: 1999,
    badge: "Next-Gen Fold",
    badgeType: "gradient",
    rating: 4.9,
    reviewsCount: 165,
    inStock: true,
    isFeatured: true,
    isHotDeal: false,
    image: "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Silver Shadow", hex: "#bcc1c6" },
      { name: "Navy", hex: "#1e2d42" },
      { name: "Pink", hex: "#f3d2d8" }
    ],
    storageOptions: [
      { size: "256GB", priceOffset: 0 },
      { size: "512GB", priceOffset: 180 },
      { size: "1TB", priceOffset: 400 }
    ],
    specs: {
      display: "7.6\" Foldable Dynamic AMOLED 2X + 6.3\" Cover Display",
      chipset: "Snapdragon 8 Gen 3 for Galaxy",
      camera: "50MP Triple Pro-grade Camera with FlexCam",
      battery: "4,400 mAh Dual-cell with 25W charging",
      os: "One UI 6.1.1 (Multi-window Multitasking)",
      connectivity: "Armor Aluminum, IP48, S-Pen Fold Edition"
    },
    description: "A tablet in your pocket. Redesigned with straight, symmetrical edges, dual-rail hinge durability, and full S Pen capability."
  },
  {
    id: "sony-xperia-1-vi",
    name: "Sony Xperia 1 VI Pro",
    brand: "Sony",
    category: "Smartphones",
    tagline: "True Optical Zoom 85-170mm. Powered by BRAVIA.",
    price: 1399,
    originalPrice: 1499,
    badge: "Alpha Cinema",
    badgeType: "hot",
    rating: 4.8,
    reviewsCount: 140,
    inStock: true,
    isFeatured: false,
    isHotDeal: false,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Black", hex: "#191a1c" },
      { name: "Platinum Silver", hex: "#dcdfe4" },
      { name: "Khaki Green", hex: "#4b5346" }
    ],
    storageOptions: [
      { size: "256GB / 12GB RAM", priceOffset: 0 },
      { size: "512GB / 12GB RAM", priceOffset: 160 }
    ],
    specs: {
      display: "6.5\" 19.5:9 FHD+ 1-120Hz LTPO OLED with BRAVIA AI",
      chipset: "Qualcomm Snapdragon 8 Gen 3",
      camera: "Exmor T 48MP Sensor + 85-170mm Optical Telephoto",
      battery: "5,000 mAh with 2-day battery life guarantee",
      os: "Clean Android 14 with Pro Camera Apps",
      connectivity: "3.5mm Hi-Res Audio Jack, MicroSD slot, 5G"
    },
    description: "For photography enthusiasts and audiophiles. Continuous optical zoom up to 170mm, 3.5mm headphone jack with high-fidelity DAC, and 2-day endurance."
  },
  {
    id: "asus-rog-phone-8-pro",
    name: "ASUS ROG Phone 8 Pro Edition",
    brand: "Asus ROG",
    category: "Gaming",
    tagline: "Beyond Gaming. AniMe Vision programmable mini-LEDs.",
    price: 1199,
    originalPrice: 1299,
    badge: "Gaming King",
    badgeType: "hot",
    rating: 4.9,
    reviewsCount: 188,
    inStock: true,
    isFeatured: false,
    isHotDeal: true,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Phantom Black", hex: "#111215" }
    ],
    storageOptions: [
      { size: "512GB / 16GB RAM", priceOffset: 0 },
      { size: "1TB / 24GB RAM", priceOffset: 250 }
    ],
    specs: {
      display: "6.78\" Samsung E6 AMOLED, 165Hz, 2500 nits, 720Hz touch sampling",
      chipset: "Snapdragon 8 Gen 3 with GameCool 8 360° SoC Cooling",
      camera: "50MP Sony IMX890 Gimbal Stabilizer + 32MP 3x OIS Telephoto",
      battery: "5,500 mAh, 65W HyperCharge, 15W Qi Wireless",
      os: "ROG UI (Android 14) with Armoury Crate",
      connectivity: "AirTrigger Ultrasonic buttons, IP68 waterproof, 2x USB-C"
    },
    description: "The supreme gaming weapon reimagined with a sleek everyday profile, 341 programmable mini-LED AniMe Vision rear display, and console-grade ultrasonic triggers."
  },
  {
    id: "xiaomi-14-ultra",
    name: "Xiaomi 14 Ultra Leica Edition",
    brand: "Xiaomi",
    category: "Smartphones",
    tagline: "A new paradigm in mobile imagery. Leica Quad-Camera.",
    price: 1099,
    originalPrice: 1199,
    badge: "Leica Optics",
    badgeType: "gradient",
    rating: 4.8,
    reviewsCount: 204,
    inStock: true,
    isFeatured: false,
    isHotDeal: false,
    image: "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Obsidian Black Vegan Leather", hex: "#1e1e20" },
      { name: "White Ceramic", hex: "#f0f0f2" }
    ],
    storageOptions: [
      { size: "512GB / 16GB RAM", priceOffset: 0 }
    ],
    specs: {
      display: "6.73\" WQHD+ AMOLED 120Hz, 3000 nits, All Around Liquid Display",
      chipset: "Qualcomm Snapdragon 8 Gen 3 with Dual-Channel IceLoop",
      camera: "Quad 50MP Leica Summilux with 1-inch LYT-900 Variable Aperture",
      battery: "5,000 mAh, 90W HyperCharge + 80W Wireless",
      os: "Xiaomi HyperOS (Android 14)",
      connectivity: "5G, Wi-Fi 7, Two-way Satellite, USB-C 3.2 Gen 2"
    },
    description: "Equipped with a true 1-inch Sony LYT-900 sensor and stepless f/1.63-f/4.0 variable aperture for professional DSLR-grade portraits and night scenes."
  },
  {
    id: "macbook-pro-m3-max",
    name: "Apple MacBook Pro 16\" M3 Max",
    brand: "Apple",
    category: "Laptops",
    tagline: "Mind-blowing. Head-turning. Extreme Pro power.",
    price: 2499,
    originalPrice: 2699,
    badge: "M3 Max Superchip",
    badgeType: "gradient",
    rating: 5.0,
    reviewsCount: 520,
    inStock: true,
    isFeatured: true,
    isHotDeal: false,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Space Black", hex: "#1f2024" },
      { name: "Silver", hex: "#e2e4e6" }
    ],
    storageOptions: [
      { size: "36GB RAM / 1TB SSD", priceOffset: 0 },
      { size: "48GB RAM / 1TB SSD", priceOffset: 300 },
      { size: "128GB RAM / 2TB SSD", priceOffset: 1200 }
    ],
    specs: {
      display: "16.2\" Liquid Retina XDR, 120Hz ProMotion, 1600 nits peak HDR",
      chipset: "Apple M3 Max (16-core CPU, 40-core GPU, Hardware Ray Tracing)",
      camera: "1080p FaceTime HD with studio-quality triple mic array",
      battery: "Up to 22 hours playback with 140W MagSafe 3 power adapter",
      os: "macOS Sonoma / Sequoia",
      connectivity: "3x Thunderbolt 4, HDMI 2.1, SDXC slot, Wi-Fi 6E"
    },
    description: "Engineered for 3D renderers, deep learning engineers, and 8K video colorists. Unrivaled performance on battery power with zero thermal throttling."
  },
  {
    id: "razer-blade-16",
    name: "Razer Blade 16 Gaming Laptop",
    brand: "Razer",
    category: "Laptops",
    tagline: "World's First Dual-Mode Mini-LED Display. RTX 4090.",
    price: 2999,
    originalPrice: 3299,
    badge: "RTX 4090",
    badgeType: "hot",
    rating: 4.8,
    reviewsCount: 118,
    inStock: true,
    isFeatured: false,
    isHotDeal: true,
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Anodized Black CNC", hex: "#121315" },
      { name: "Mercury White", hex: "#ebebeb" }
    ],
    storageOptions: [
      { size: "32GB RAM / 1TB NVMe", priceOffset: 0 },
      { size: "64GB RAM / 2TB NVMe", priceOffset: 450 }
    ],
    specs: {
      display: "16\" Dual-Mode Mini-LED: UHD+ 120Hz or FHD+ 240Hz",
      chipset: "Intel Core i9-14900HX + NVIDIA GeForce RTX 4090 (175W TGP)",
      camera: "FHD Windows Hello IR webcam with privacy shutter",
      battery: "95.2 Wh battery, 330W GaN power adapter",
      os: "Windows 11 Pro with Razer Synapse 4",
      connectivity: "Thunderbolt 4, HDMI 2.1, Wi-Fi 7, Per-key Chroma RGB"
    },
    description: "Pure desktop-class performance packed into a precision-milled aerospace aluminum chassis with dual-mode Mini-LED display technology."
  },
  {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 Wireless ANC",
    brand: "Sony",
    category: "Audio",
    tagline: "Your world. Nothing else. Industry-leading Noise Cancellation.",
    price: 349,
    originalPrice: 399,
    badge: "Editor's Choice",
    badgeType: "gradient",
    rating: 4.9,
    reviewsCount: 940,
    inStock: true,
    isFeatured: true,
    isHotDeal: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Silver Stone", hex: "#d8d4cd" },
      { name: "Midnight Black", hex: "#1d1e22" },
      { name: "Smoky Pink", hex: "#d7b4b3" }
    ],
    storageOptions: [
      { size: "Standard Edition", priceOffset: 0 }
    ],
    specs: {
      display: "Touch Sensor gesture controls on ear cup",
      chipset: "Integrated Processor V1 + HD Noise Cancelling Processor QN1",
      camera: "N/A",
      battery: "30 Hours playback with ANC on (3 min charge = 3 hours)",
      os: "Sony Headphones Connect App (iOS & Android)",
      connectivity: "Bluetooth 5.2, Multipoint Connection, LDAC Hi-Res Audio"
    },
    description: "Two processors controlling 8 microphones for unparalleled noise canceling. Specially engineered 30mm carbon-fiber driver units for pure acoustic bliss."
  },
  {
    id: "bose-quietcomfort-ultra",
    name: "Bose QuietComfort Ultra Headphones",
    brand: "Bose",
    category: "Audio",
    tagline: "World-class quiet. Spatialized audio. Elevated luxury.",
    price: 379,
    originalPrice: 429,
    badge: "Spatial Audio",
    badgeType: "hot",
    rating: 4.8,
    reviewsCount: 460,
    inStock: true,
    isFeatured: false,
    isHotDeal: false,
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Black", hex: "#161719" },
      { name: "White Smoke", hex: "#e5e6e8" },
      { name: "Sandstone", hex: "#cbbeab" }
    ],
    storageOptions: [
      { size: "Standard Edition", priceOffset: 0 }
    ],
    specs: {
      display: "Capacitive touch volume strip & tactile switches",
      chipset: "Custom Bose Digital Signal Processor with CustomTune tech",
      camera: "N/A",
      battery: "Up to 24 hours (18 hours with Immersive Audio)",
      os: "Bose Music App (iOS / Android)",
      connectivity: "Snapdragon Sound, aptX Adaptive, Bluetooth 5.3"
    },
    description: "Groundbreaking spatialized audio meets Bose legendary noise cancellation with CustomTune calibration that personalizes the sound to the shape of your ear."
  },
  {
    id: "apple-watch-ultra-2",
    name: "Apple Watch Ultra 2 (GPS + Cellular)",
    brand: "Apple",
    category: "Wearables",
    tagline: "Next level adventure. 3000 nits. Double Tap gesture.",
    price: 799,
    originalPrice: 849,
    badge: "Extreme Durability",
    badgeType: "gradient",
    rating: 4.9,
    reviewsCount: 320,
    inStock: true,
    isFeatured: true,
    isHotDeal: false,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Natural Titanium with Trail Loop", hex: "#a49f96" },
      { name: "Black Titanium with Ocean Band", hex: "#262729" }
    ],
    storageOptions: [
      { size: "64GB / 49mm Case", priceOffset: 0 }
    ],
    specs: {
      display: "49mm Always-On Retina OLED, 3000 nits brightest display",
      chipset: "S9 SiP with 4-core Neural Engine & precision U2 chip",
      camera: "N/A",
      battery: "36 hours normal use (up to 72 hours in Low Power Mode)",
      os: "watchOS 11 with Vitals app & Training Load",
      connectivity: "Cellular 4G LTE, Dual-frequency GPS (L1 & L5), 100m Water Resistant"
    },
    description: "The most rugged and capable Apple Watch ever built. 49mm aerospace titanium case, customizable Action button, and certified depth gauge for scuba diving up to 40m."
  },
  {
    id: "galaxy-watch-ultra",
    name: "Samsung Galaxy Watch Ultra",
    brand: "Samsung",
    category: "Wearables",
    tagline: "Built to push boundaries. 100-hour battery. Titanium cushion.",
    price: 649,
    originalPrice: 699,
    badge: "BioActive Sensor",
    badgeType: "hot",
    rating: 4.8,
    reviewsCount: 175,
    inStock: true,
    isFeatured: false,
    isHotDeal: true,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Titanium Gray with Orange Marine Band", hex: "#77797e" },
      { name: "Titanium White", hex: "#edeef1" },
      { name: "Titanium Silver", hex: "#323336" }
    ],
    storageOptions: [
      { size: "32GB / 47mm Case", priceOffset: 0 }
    ],
    specs: {
      display: "1.5\" Super AMOLED 3000 nits with Sapphire Crystal",
      chipset: "Exynos W1000 (3nm 5-Core CPU)",
      camera: "N/A",
      battery: "590 mAh (Up to 100 hours in Power Saving mode)",
      os: "Wear OS Powered by Samsung (One UI 6 Watch)",
      connectivity: "Dual GPS (L1+L5), 10ATM / IP68, LTE, Quick Button"
    },
    description: "Conquer altitudes and depths with cushion titanium casing, Emergency Siren, AI-powered Energy Score, and Dual GPS tracking."
  },
  {
    id: "meta-quest-3",
    name: "Meta Quest 3 Mixed Reality Headset",
    brand: "Meta",
    category: "Gaming",
    tagline: "Expand your world. Breakthrough high-res Passthrough.",
    price: 499,
    originalPrice: 549,
    badge: "Spatial 3D",
    badgeType: "gradient",
    rating: 4.8,
    reviewsCount: 380,
    inStock: true,
    isFeatured: false,
    isHotDeal: false,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?auto=format&fit=crop&w=800&q=80"
    ],
    colors: [
      { name: "Clean White", hex: "#ededf0" }
    ],
    storageOptions: [
      { size: "128GB", priceOffset: 0 },
      { size: "512GB", priceOffset: 150 }
    ],
    specs: {
      display: "4K+ Infinite Display (2064x2208 per eye) with Pancake lenses",
      chipset: "Snapdragon XR2 Gen 2 (2x GPU graphical performance)",
      camera: "Dual RGB color cameras for full-color stereoscopic Passthrough",
      battery: "2.2 to 2.9 hours active use with fast USB-C dock",
      os: "Meta Horizon OS with Direct Touch hand tracking",
      connectivity: "Wi-Fi 6E, Bluetooth 5.2, Touch Plus haptic controllers"
    },
    description: "Transform your living room into an IMAX theater or interactive virtual workspace with full-color mixed reality passthrough and precision spatial audio."
  }
];

// Major Mobile & Tech Brands List with styling metadata
const BRANDS_LIST = [
  { name: "All Brands", slug: "all", count: 16 },
  { name: "Apple", slug: "apple", count: 3, logoText: " Apple", color: "#a2aaad" },
  { name: "Samsung", slug: "samsung", count: 3, logoText: "SAMSUNG", color: "#1428a0" },
  { name: "Google", slug: "google", count: 1, logoText: "Google", color: "#4285f4" },
  { name: "OnePlus", slug: "oneplus", count: 1, logoText: "ONEPLUS", color: "#eb0028" },
  { name: "Nothing", slug: "nothing", count: 1, logoText: "(NOTHING)", color: "#e6e6e6" },
  { name: "Sony", slug: "sony", count: 2, logoText: "SONY", color: "#ffffff" },
  { name: "Asus ROG", slug: "asus rog", count: 1, logoText: "ROG", color: "#ff003c" },
  { name: "Xiaomi", slug: "xiaomi", count: 1, logoText: "XIAOMI", color: "#ff6900" },
  { name: "Bose", slug: "bose", count: 1, logoText: "BOSE", color: "#0080ff" },
  { name: "Razer", slug: "razer", count: 1, logoText: "RAZER", color: "#00ff00" }
];

// Tech Categories
const CATEGORIES_LIST = [
  { name: "All Categories", slug: "all", icon: "grid" },
  { name: "Smartphones", slug: "smartphones", icon: "smartphone" },
  { name: "Foldables", slug: "foldables", icon: "tablet" },
  { name: "Laptops", slug: "laptops", icon: "laptop" },
  { name: "Audio", slug: "audio", icon: "headphones" },
  { name: "Wearables", slug: "wearables", icon: "watch" },
  { name: "Gaming", slug: "gaming", icon: "gamepad" }
];
