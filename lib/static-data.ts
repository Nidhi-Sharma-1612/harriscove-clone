export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Attraction {
  name: string;
  description: string;
  icon: string;
  distance?: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah & Michael",
    location: "New York, NY",
    rating: 5,
    text: "Absolutely breathtaking property. The waterfront views were stunning and the amenities were top-notch. We will definitely be coming back!",
    date: "October 2024",
  },
  {
    id: 2,
    name: "The Johnson Family",
    location: "Washington, DC",
    rating: 5,
    text: "Perfect for our family getaway. The kids loved the kayaks and paddleboards. The property was immaculate and the hosts were incredibly welcoming.",
    date: "August 2024",
  },
  {
    id: 3,
    name: "David & Emma",
    location: "Philadelphia, PA",
    rating: 5,
    text: "We celebrated our anniversary here and it was magical. The private dock and sunset views made it unforgettable. Highly recommend to anyone looking for a luxury escape.",
    date: "September 2024",
  },
  {
    id: 4,
    name: "The Williams Family",
    location: "Boston, MA",
    rating: 5,
    text: "This was our third stay and it keeps getting better. The fully equipped kitchen made cooking family dinners so easy. An unbeatable location.",
    date: "July 2024",
  },
  {
    id: 5,
    name: "Jennifer & Tom",
    location: "Baltimore, MD",
    rating: 5,
    text: "We booked for a long weekend and ended up extending our stay. The peace and quiet, combined with the beautiful surroundings, was exactly what we needed.",
    date: "June 2024",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What time is check-in and check-out?",
    answer:
      "Check-in is at 3:00 PM and check-out is at 11:00 AM. Early check-in or late check-out may be available upon request, subject to availability.",
  },
  {
    question: "Are pets allowed?",
    answer:
      "Some of our properties are pet-friendly. Please check the individual property listing for pet policy details, or contact us to confirm before booking.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, free private parking is available at all of our properties. Each property comes with dedicated parking spaces for guests.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "We offer flexible cancellation with a full refund if cancelled at least 7 days before check-in. Cancellations within 7 days of arrival may be subject to a partial or full charge. Please review the specific property policy at booking.",
  },
  {
    question: "Is WiFi included?",
    answer:
      "Yes, high-speed WiFi is complimentary at all our properties. Connection details are provided in the welcome guide sent after booking.",
  },
  {
    question: "How do I access the property?",
    answer: "All properties use smart keypad entry. You will receive your unique access code 24 hours before check-in via email and SMS.",
  },
  {
    question: "Are linens and towels provided?",
    answer: "Yes, all properties are fully stocked with premium linens, bath towels, pool towels, and beach towels for your stay.",
  },
  {
    question: "Can I host an event or gathering?",
    answer: "Small family gatherings are welcome. For larger events such as weddings or parties, please contact us in advance for event packages and pricing.",
  },
  {
    question: "Is the waterfront area safe for children?",
    answer: "Yes, our waterfront properties are family-friendly. Each dock is equipped with safety railings and life rings. Children should always be supervised near the water, and life jackets are provided on-site for all water activities.",
  },
  {
    question: "What water equipment is available at the property?",
    answer: "Most of our waterfront properties include complimentary kayaks, paddleboards, and fishing rods. Some properties also have crabbing gear. Full details are listed on each property page.",
  },
];

export const AREA_ATTRACTIONS: Attraction[] = [
  {
    name: "Water Activities",
    description:
      "Kayaking, paddleboarding, crabbing, and fishing right from the property dock",
    icon: "Waves",
    distance: "On-site",
  },
  {
    name: "Local Dining",
    description:
      "Award-winning seafood restaurants and waterfront dining just minutes away",
    icon: "UtensilsCrossed",
    distance: "5 min drive",
  },
  {
    name: "Nature Trails",
    description:
      "Scenic hiking and biking trails through coastal forests and marshlands",
    icon: "TreePine",
    distance: "10 min drive",
  },
  {
    name: "Historic Downtown",
    description:
      "Charming boutiques, art galleries, and historic sites to explore",
    icon: "Landmark",
    distance: "15 min drive",
  },
  {
    name: "Maritime Museum",
    description:
      "World-class exhibits celebrating local maritime heritage and history",
    icon: "Anchor",
    distance: "20 min drive",
  },
  {
    name: "Golf Courses",
    description: "Championship golf courses with stunning waterway views",
    icon: "Flag",
    distance: "25 min drive",
  },
];

export const AMENITY_HIGHLIGHTS = [
  { icon: "Wifi", label: "High-Speed WiFi" },
  { icon: "Waves", label: "Waterfront Access" },
  { icon: "ChefHat", label: "Gourmet Kitchen" },
  { icon: "Car", label: "Free Parking" },
  { icon: "Tv", label: "Smart Entertainment" },
  { icon: "Wind", label: "Air Conditioning" },
  { icon: "Flame", label: "BBQ Grill" },
  { icon: "ShowerHead", label: "Premium Linens" },
];
