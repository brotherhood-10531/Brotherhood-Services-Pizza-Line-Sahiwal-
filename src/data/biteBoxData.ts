export interface MenuItem {
  id: string;
  name: string;
  category: 'BURGERS' | 'WRAPS' | 'LOADED_FRIES' | 'COMBOS' | 'DESSERTS';
  categoryLabel: string;
  description: string;
  price: number;
  image: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  calories: string;
  isChefPick?: boolean;
  story?: string;
}

export interface ComboDeal {
  id: string;
  title: string;
  itemsSummary: string;
  originalPrice: number;
  dealPrice: number;
  discountTag: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  area: string;
  rating: number;
  comment: string;
  date: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Burgers' | 'Sides' | 'Combos' | 'Desserts';
  image: string;
  caption: string;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  extraCheese: boolean;
  extraJalapeno: boolean;
  upgradeMeal: boolean;
  specialInstructions: string;
}

export const BITE_BOX_INFO = {
  name: 'Pizza Line',
  tagline: 'Fresh. Fast. Flavorful.',
  city: 'Sahiwal',
  area: 'Sahiwal',
  fullAddress: 'Main High Street, Sahiwal, Punjab, Pakistan',
  phone: '+923194721430',
  phoneDisplay: '+92 319 4721430',
  whatsappNumber: '923194721430',
  whatsappDisplay: '+92 319 4721430',
  customerCare: '+923194721430',
  email: 'contact@pizzaline.pk',
  hours: '12:00 PM – 12:00 AM (Mon – Sun)',
  googleMapsUrl: 'https://maps.google.com/?q=Sahiwal+Pakistan',
  deliveryFee: 150,
  freeDeliveryThreshold: 2000,
  avgDeliveryTime: '25 – 35 Mins',
};

// Check if store is open based on Pakistan Standard Time (UTC+5)
export function isStoreOpen(): { open: boolean; message: string } {
  try {
    const now = new Date();
    // Pakistan is UTC+5
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const pktHours = (utcHours + 5) % 24;
    const pktMinutes = utcMinutes;
    const currentDecimalHour = pktHours + pktMinutes / 60;

    // Open from 12:00 PM (12.0) to 12:00 AM midnight (24.0 or 0.0)
    const isOpen = currentDecimalHour >= 12.0 && currentDecimalHour < 24.0;
    return {
      open: isOpen,
      message: isOpen ? 'Open Now (12 PM – 12 AM)' : 'Opens at 12:00 PM PKT',
    };
  } catch {
    return { open: true, message: 'Open (12 PM – 12 AM)' };
  }
}

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${BITE_BOX_INFO.whatsappNumber}?text=${encoded}`;
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'm1',
    name: 'Crispy Zinger Burger',
    category: 'BURGERS',
    categoryLabel: 'Burgers',
    description: 'Crispy golden spiced fried chicken breast filet, garlic mayonnaise, fresh iceberg lettuce, toasted butter brioche bun.',
    price: 690,
    image: '/images/img_crispy_zinger.jpg',
    badge: 'Bestseller',
    rating: 4.9,
    reviewCount: 342,
    calories: '620 kcal',
    isChefPick: true,
    story: 'Marinated for 14 hours in our secret blend of 11 herbs & spices, coated with hand-flaked batter and flash-fried to juicy perfection.',
  },
  {
    id: 'm2',
    name: 'Beef Cheese Burger',
    category: 'BURGERS',
    categoryLabel: 'Burgers',
    description: 'Double smashed 100% prime beef patties, molten cheddar slice, caramelized onions, dill pickles, signature Pizza Line red relish.',
    price: 850,
    image: '/images/img_hero_burger.jpg',
    badge: "Chef's Special",
    rating: 4.95,
    reviewCount: 289,
    calories: '740 kcal',
    isChefPick: true,
    story: 'Crafted from daily fresh minced beef grilled over high heat on a custom flat top to seal in every drop of rich natural savoriness.',
  },
  {
    id: 'm3',
    name: 'Signature Loaded Fries',
    category: 'LOADED_FRIES',
    categoryLabel: 'Loaded Fries',
    description: 'Jumbo golden crinkle fries smothered in cheddar cheese lava, spicy jalapeno coins, crispy bits, and secret spicy sauce.',
    price: 550,
    image: '/images/img_loaded_fries.jpg',
    badge: 'Must Try',
    rating: 4.85,
    reviewCount: 410,
    calories: '590 kcal',
    isChefPick: true,
    story: 'The crowd favorite of Sahiwal foodies. Double-fried for maximum crunch, crowned with our house-blended molten cheese sauce.',
  },
  {
    id: 'm4',
    name: 'Shawarma Wrap Royale',
    category: 'WRAPS',
    categoryLabel: 'Wraps',
    description: 'Thinly shaved marinated chicken breast, authentic Lebanese toum garlic cream, pickled gherkins, wrapped in warm pita.',
    price: 590,
    image: '/images/img_crispy_zinger.jpg',
    badge: 'Popular',
    rating: 4.75,
    reviewCount: 195,
    calories: '480 kcal',
  },
  {
    id: 'm5',
    name: 'Double Trouble Smash',
    category: 'BURGERS',
    categoryLabel: 'Burgers',
    description: 'Two beef patties with crispy grilled edges, double sharp American cheese, crispy fried onion straws, BBQ aioli.',
    price: 980,
    image: '/images/img_hero_burger.jpg',
    badge: 'Heavy Hitter',
    rating: 4.9,
    reviewCount: 152,
    calories: '830 kcal',
  },
  {
    id: 'm6',
    name: 'Fiery Buffalo Chicken Wrap',
    category: 'WRAPS',
    categoryLabel: 'Wraps',
    description: 'Crispy chicken tenders tossed in tangy cayenne buffalo glaze with buttermilk ranch slaw in a toasted tortilla.',
    price: 620,
    image: '/images/img_crispy_zinger.jpg',
    badge: 'Hot & Spicy',
    rating: 4.8,
    reviewCount: 114,
    calories: '510 kcal',
  },
  {
    id: 'm7',
    name: 'Chili Cheesy Curly Fries',
    category: 'LOADED_FRIES',
    categoryLabel: 'Loaded Fries',
    description: 'Seasoned spiral curly fries loaded with melted pepper jack cheese, chopped green chilies, and tangy ranch drizzle.',
    price: 580,
    image: '/images/img_loaded_fries.jpg',
    badge: 'Spicy',
    rating: 4.7,
    reviewCount: 98,
    calories: '520 kcal',
  },
  {
    id: 'm8',
    name: 'Choco Lava Cake',
    category: 'DESSERTS',
    categoryLabel: 'Desserts & Drinks',
    description: 'Warm Belgian chocolate molten cake with a decadent flowing chocolate center, dusted with powdered sugar.',
    price: 450,
    image: '/images/img_combo_deal.jpg',
    badge: 'Sweet Tooth',
    rating: 4.9,
    reviewCount: 168,
    calories: '410 kcal',
  },
  {
    id: 'm9',
    name: 'Lotus Biscoff Thickshake',
    category: 'DESSERTS',
    categoryLabel: 'Desserts & Drinks',
    description: 'Creamy handcrafted milkshake blended with Belgian speculoos cookie butter, whipped topping, and crushed biscuits.',
    price: 490,
    image: '/images/img_combo_deal.jpg',
    badge: 'Top Rated',
    rating: 4.92,
    reviewCount: 205,
    calories: '460 kcal',
  },
  {
    id: 'm10',
    name: 'Pizza Line Crispy Strips (5 pcs)',
    category: 'BURGERS',
    categoryLabel: 'Burgers',
    description: 'Tender whole chicken tenderloins battered in crisp golden breading, served with signature honey-mustard dip.',
    price: 520,
    image: '/images/img_crispy_zinger.jpg',
    badge: 'Snack Favorite',
    rating: 4.8,
    reviewCount: 135,
    calories: '450 kcal',
  },
  {
    id: 'm11',
    name: 'Truffle Mushroom Swiss Burger',
    category: 'BURGERS',
    categoryLabel: 'Burgers',
    description: 'Prime beef patty topped with sautéed wild button mushrooms, rich Swiss cheese slice, and garlic truffle mayo.',
    price: 920,
    image: '/images/img_hero_burger.jpg',
    badge: 'Gourmet',
    rating: 4.88,
    reviewCount: 89,
    calories: '710 kcal',
  },
  {
    id: 'm12',
    name: 'Peri-Peri Masala Fries',
    category: 'LOADED_FRIES',
    categoryLabel: 'Loaded Fries',
    description: "Classic skin-on french fries tossed in zesty crushed African bird's eye chili and Himalayan pink salt.",
    price: 350,
    image: '/images/img_loaded_fries.jpg',
    badge: 'Crispy',
    rating: 4.65,
    reviewCount: 176,
    calories: '340 kcal',
  },
];

export const COMBO_DEALS: ComboDeal[] = [
  {
    id: 'c1',
    title: 'Duo Crunch Feast',
    itemsSummary: '2x Crispy Zingers + 1x Large Loaded Fries + 2x Drinks',
    originalPrice: 2150,
    dealPrice: 1650,
    discountTag: 'SAVE 25%',
    image: '/images/img_combo_deal.jpg',
    description: 'The ultimate pair feast! Two crunchy zinger burgers with full-loaded cheese fries and two ice-cold sodas.',
  },
  {
    id: 'c2',
    title: 'Pizza Line Mega Squad (4 Pax)',
    itemsSummary: '2x Beef Burgers + 2x Zingers + 2x Loaded Fries + 4x Drinks',
    originalPrice: 4200,
    dealPrice: 3250,
    discountTag: 'FAMILY SAVER',
    image: '/images/img_hero_burger.jpg',
    description: 'Ideal for friends & families in Sahiwal or ordering late-night movie boxes to their doorstep.',
  },
  {
    id: 'c3',
    title: 'Solo Power Box',
    itemsSummary: '1x Beef Smash Burger + Crinkle Fries + Choco Lava Cake + Drink',
    originalPrice: 1650,
    dealPrice: 1290,
    discountTag: 'BESTSELLER',
    image: '/images/img_loaded_fries.jpg',
    description: 'Complete gourmet meal for one! Prime smash beef patty with golden crispy fries, cold drink, and warm flowing Belgian lava cake.',
  },
  {
    id: 'c4',
    title: 'Late Night Munchies',
    itemsSummary: '1x Shawarma Wrap + 1x Loaded Fries + Lotus Biscoff Shake',
    originalPrice: 1630,
    dealPrice: 1299,
    discountTag: 'NIGHT SPECIAL',
    image: '/images/img_crispy_zinger.jpg',
    description: 'Available until 12 AM midnight. Savor our tender shawarma wrap, loaded cheese fries, and artisanal biscoff shake.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Hamza Farooq',
    area: 'Farid Town, Sahiwal',
    rating: 5.0,
    comment: 'Easily the best food in Sahiwal! Smashed crust is unbelievable and the loaded fries stay crispy even for home delivery.',
    date: '2 days ago',
  },
  {
    id: 't2',
    name: 'Ayesha Malik',
    area: 'Civil Lines, Sahiwal',
    rating: 5.0,
    comment: 'Ordered via WhatsApp for our office team lunch. Hot food arrived in 25 mins sharp, packaging is top notch and the zinger is huge!',
    date: 'Last week',
  },
  {
    id: 't3',
    name: 'Saad Qureshi',
    area: 'Fateh Sher Colony, Sahiwal',
    rating: 5.0,
    comment: 'Pizza Line is our regular weekend spot now. Their secret spicy sauce is unlike anything else in the city. 10/10 recommended!',
    date: '3 weeks ago',
  },
  {
    id: 't4',
    name: 'Mahnoor Khan',
    area: 'Tariq Bin Ziyad Colony, Sahiwal',
    rating: 5.0,
    comment: 'The brioche buns are so soft and fresh. Plus ordering over WhatsApp is super seamless—no app download required. Loved the Lotus Biscoff shake!',
    date: '1 month ago',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Signature Gourmet Smash',
    category: 'Burgers',
    image: '/images/img_hero_burger.jpg',
    caption: 'Double beef smashed patty with molten cheddar and caramelized onions fresh off the grill.',
  },
  {
    id: 'g2',
    title: 'Molten Cheddar Loaded Fries',
    category: 'Sides',
    image: '/images/img_loaded_fries.jpg',
    caption: 'Crinkle-cut potatoes soaked in cheddar sauce with jalapeño peppers and spicy drizzle.',
  },
  {
    id: 'g3',
    title: 'Weekend Mega Combo Spread',
    category: 'Combos',
    image: '/images/img_combo_deal.jpg',
    caption: 'Full feast setup ready for dine-in, takeaway, and delivery across Sahiwal.',
  },
  {
    id: 'g4',
    title: 'Triple-Dredged Golden Zinger',
    category: 'Burgers',
    image: '/images/img_crispy_zinger.jpg',
    caption: 'Fried golden crispy chicken breast filet served in toasted sesame brioche.',
  },
  {
    id: 'g5',
    title: 'Choco Lava Cake & Thickshakes',
    category: 'Desserts',
    image: '/images/img_combo_deal.jpg',
    caption: 'Sweet tooth cravings satisfied with Belgian molten chocolate and artisanal shakes.',
  },
  {
    id: 'g6',
    title: 'Party Box Catering Orders',
    category: 'Combos',
    image: '/images/img_hero_burger.jpg',
    caption: 'Custom packed event meals for birthdays, college gatherings, and corporate events.',
  },
];

export const CATERING_PACKAGES = [
  {
    id: 'pkg-1',
    name: 'Classic Crunch Box',
    pricePerPerson: 850,
    description: 'Crispy chicken sliders, crinkle loaded fries, dips & chilled beverages.',
    minPax: 15,
  },
  {
    id: 'pkg-2',
    name: 'Smash & Loaded Deluxe',
    pricePerPerson: 1150,
    description: 'Full beef smash burgers, loaded crinkle & curly fries, signature sauces & sodas.',
    minPax: 15,
    popular: true,
  },
  {
    id: 'pkg-3',
    name: 'VIP Pizza Line Feast',
    pricePerPerson: 1550,
    description: 'Gourmet burgers, crispy strips, loaded fries bar, Belgian lava cakes & artisan milkshakes.',
    minPax: 20,
  },
];
