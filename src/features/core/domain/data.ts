import {
  FiHome,
  FiBriefcase,
  FiKey,
  CgTrees,
  BiShieldAlt2,
  GoRocket,
} from "@/assets/icons/vander";
import Property1 from "@/assets/images/property/1.jpg";
import Property2 from "@/assets/images/property/2.jpg";
import Property3 from "@/assets/images/property/3.jpg";
import Property4 from "@/assets/images/property/4.jpg";
import Property5 from "@/assets/images/property/5.jpg";
import Property6 from "@/assets/images/property/6.jpg";

import SubProperty1 from "@/assets/images/property/single/1.jpg";
import SubProperty2 from "@/assets/images/property/single/2.jpg";
import SubProperty3 from "@/assets/images/property/single/3.jpg";
import SubProperty4 from "@/assets/images/property/single/4.jpg";
import SubProperty5 from "@/assets/images/property/single/5.jpg";

import client1 from "@/assets/images/client/01.jpg";
import client2 from "@/assets/images/client/02.jpg";
import client3 from "@/assets/images/client/03.jpg";
import client4 from "@/assets/images/client/04.jpg";
import client5 from "@/assets/images/client/05.jpg";
import client6 from "@/assets/images/client/06.jpg";
import client7 from "@/assets/images/client/07.jpg";

import cate1 from "@/assets/images/property/residential.jpg";
import cate2 from "@/assets/images/property/land.jpg";
import cate3 from "@/assets/images/property/commercial.jpg";
import cate4 from "@/assets/images/property/investment.jpg";
import cate5 from "@/assets/images/property/industrial.jpg";

export const properties = [
  {
    id: 1,
    image: Property1,
    name: "10765 Hillshire Ave, Baton Rouge, LA 70810, USA",
    square: 8000,
    beds: 4,
    baths: 4,
    price: 5000,
    rating: 5.0,
    detail: [
      SubProperty1,
      SubProperty2,
      SubProperty3,
      SubProperty4,
      SubProperty5,
    ],
  },
  {
    id: 2,
    image: Property2,
    name: "59345 STONEWALL DR, Plaquemine, LA 70764, USA",
    square: 8000,
    beds: 4,
    baths: 4,
    price: 5000,
    rating: 5.0,
    detail: [
      SubProperty1,
      SubProperty2,
      SubProperty3,
      SubProperty4,
      SubProperty5,
    ],
  },
  {
    id: 3,
    image: Property3,
    name: "3723 SANDBAR DR, Addis, LA 70710, USA",
    square: 8000,
    beds: 4,
    baths: 4,
    price: 5000,
    rating: 5.0,
    detail: [
      SubProperty1,
      SubProperty2,
      SubProperty3,
      SubProperty4,
      SubProperty5,
    ],
  },
  {
    id: 4,
    image: Property4,
    name: "Lot 21 ROYAL OAK DR, Prairieville, LA 70769, USA",
    square: 8000,
    beds: 4,
    baths: 4,
    price: 5000,
    rating: 5.0,
    detail: [
      SubProperty1,
      SubProperty2,
      SubProperty3,
      SubProperty4,
      SubProperty5,
    ],
  },
  {
    id: 5,
    image: Property5,
    name: "710 BOYD DR, Unit #1102, Baton Rouge, LA 70808, USA",
    square: 8000,
    beds: 4,
    baths: 4,
    price: 5000,
    rating: 5.0,
    detail: [
      SubProperty1,
      SubProperty2,
      SubProperty3,
      SubProperty4,
      SubProperty5,
    ],
  },
  {
    id: 6,
    image: Property6,
    name: "5133 MCLAIN WAY, Baton Rouge, LA 70809, USA",
    square: 8000,
    beds: 4,
    baths: 4,
    price: 5000,
    rating: 5.0,
    detail: [
      SubProperty1,
      SubProperty2,
      SubProperty3,
      SubProperty4,
      SubProperty5,
    ],
  },
];

export const featureData = [
  {
    icon: FiHome,
    title: "Evaluate Property",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
  },
  {
    icon: FiBriefcase,
    title: "Meeting with Agent",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
  },
  {
    icon: FiKey,
    title: "Close the Deal",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
  },
];
export const review = [
  {
    id: "1",
    profile: client1,
    name: "Calvin Carlo",
    designation: "Manager",
    description:
      "Hously made the processes so easy. Hously instantly increased the amount of interest and ultimately saved us over $10,000.",
  },
  {
    id: "2",
    profile: client2,
    name: "Christa Smith",
    designation: "Manager",
    description:
      'I highly recommend Hously as the new way to sell your home "by owner". My home sold in 24 hours for the asking price. Best $400 you could spend to sell your home.',
  },
  {
    id: "3",
    profile: client3,
    name: "Christa Smith",
    designation: "Manager",
    description:
      "My favorite part about selling my home myself was that we got to meet and get to know the people personally. This made it so much more enjoyable!",
  },
  {
    id: "4",
    profile: client4,
    name: "Christa Smith",
    designation: "Manager",
    description: "Great experience all around! Easy to use and efficient.",
  },
];
export const teamdata = [
  {
    image: client4,
    name: "Jack John",
    title: "Designer",
  },
  {
    image: client5,
    name: "Krista John",
    title: "Designer",
  },
  {
    image: client6,
    name: "Roger Jackson",
    title: "Designer",
  },
  {
    image: client7,
    name: "Johnny English",
    title: "Designer",
  },
];

export const counterData = [
  {
    target: "1548",
    title: "Properties Sell",
  },
  {
    target: "25",
    title: "Award Gained",
  },
  {
    target: "9",
    title: "Years Experience",
  },
];
export const categoriesData = [
  {
    image: cate1,
    name: "Residential",
    title: "46 Listings",
  },
  {
    image: cate2,
    name: "Land",
    title: "124 Listings",
  },
  {
    image: cate3,
    name: "Commercial",
    title: "265 Listings",
  },
  {
    image: cate4,
    name: "Industrial",
    title: "452 Listings",
  },
  {
    image: cate5,
    name: "Investment",
    title: "12 Listings",
  },
];
export const featureTwo = [
  {
    icon: "mdi mdi-cards-heart",
    title: "Comfortable",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
  },
  {
    icon: "mdi mdi-shield-sun",
    title: "Extra Security",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
  },
  {
    icon: "mdi mdi-star",
    title: "Luxury",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
  },
  {
    icon: "mdi mdi-currency-usd",
    title: "Best Price",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
  },
  {
    icon: "mdi mdi-map-marker",
    title: "Stratagic Location",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
  },
  {
    icon: "mdi mdi-chart-arc",
    title: "Efficient",
    desc: "If the distribution of letters and words is random, the reader will not be distracted from making.",
  },
];

export const pricing = [
  {
    icon: CgTrees,
    title: "Basic",
    amount: "19",
    features: [
      "Full Access",
      "Source Files",
      "Free Appointments",
      "Enhanced Security",
    ],
  },
  {
    icon: BiShieldAlt2,
    title: "Premium",
    amount: "39",
    features: [
      "Full Access",
      "Source Files",
      "Free Appointments",
      "Enhanced Security",
    ],
  },
  {
    icon: GoRocket,
    title: "Business",
    amount: "99",
    features: [
      "Full Access",
      "Source Files",
      "Free Appointments",
      "Enhanced Security",
    ],
  },
];
export const accordionData = [
  {
    title: "How does it work ?",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
  },
  {
    title: "Do I need a designer to use Hously ?",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
  },
  {
    title: "What do I need to do to start selling ?",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
  },
  {
    title: "What happens when I receive an order ?",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.",
  },
];
export const blogList = [
  {
    id: 1,
    title: "Skills That You Can Learn In The Real Estate Market",
    date: "13th March, 2023",
    type: "Industrial",
    image: Property1,
  },
  {
    id: 2,
    title: "Learn The Truth About Real Estate Industry",
    date: "5th May, 2023",
    type: "Industrial",
    image: Property2,
  },
  {
    id: 3,
    title: "10 Quick Tips About Business Development",
    date: "19th June, 2023",
    type: "Industrial",
    image: Property3,
  },
  {
    id: 4,
    title: "14 Common Misconceptions About Business Development",
    date: "20th June, 2023",
    type: "Industrial",
    image: Property4,
  },
  {
    id: 5,
    title: "10 Things Your Competitors Can Teach You About Real Estate",
    date: "31st Aug, 2023",
    type: "Industrial",
    image: Property5,
  },
  {
    id: 6,
    title: "Why We Love Real Estate",
    date: "1st Sep, 2023",
    type: "Industrial",
    image: Property6,
  },
];
