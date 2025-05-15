
export type Destination = {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string; // We'll use placeholder images for now
  tags: string[];
  rating: number;
};

export const destinations: Destination[] = [
  {
    id: "borobudur",
    name: "Borobudur Temple",
    location: "Magelang, Central Java",
    description: "The world's largest Buddhist temple, a UNESCO World Heritage site built in the 9th century. Featuring over 2,600 relief panels and 504 Buddha statues.",
    image: "https://images.unsplash.com/photo-1555098730-2f8af152d7c1?ixlib=rb-4.0.3",
    tags: ["Temple", "Culture", "UNESCO", "History"],
    rating: 4.9
  },
  {
    id: "raja-ampat",
    name: "Raja Ampat Islands",
    location: "West Papua",
    description: "A tropical paradise with the richest marine biodiversity on earth. Perfect for diving, snorkeling, and experiencing pristine nature.",
    image: "https://images.unsplash.com/photo-1516748957061-f5ed80023bde?ixlib=rb-4.0.3",
    tags: ["Beach", "Nature", "Diving", "Remote"],
    rating: 4.8
  },
  {
    id: "komodo",
    name: "Komodo National Park",
    location: "East Nusa Tenggara",
    description: "Home to the legendary Komodo dragon, this national park offers unique wildlife, beautiful pink beaches, and excellent diving opportunities.",
    image: "https://images.unsplash.com/photo-1544867692-26595a48843d?ixlib=rb-4.0.3",
    tags: ["Wildlife", "National Park", "UNESCO", "Adventure"],
    rating: 4.7
  },
  {
    id: "bali",
    name: "Bali",
    location: "Bali Province",
    description: "The Island of Gods offers stunning landscapes, from volcanic mountains to pristine beaches, along with a vibrant culture and spiritual experiences.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3",
    tags: ["Beach", "Culture", "Spirituality", "Nightlife"],
    rating: 4.6
  },
  {
    id: "prambanan",
    name: "Prambanan Temple",
    location: "Yogyakarta",
    description: "A magnificent 9th-century Hindu temple compound, known for its tall and pointed architecture dedicated to the Trimurti (Brahma, Vishnu, and Shiva).",
    image: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?ixlib=rb-4.0.3",
    tags: ["Temple", "Culture", "UNESCO", "History"],
    rating: 4.7
  },
  {
    id: "tana-toraja",
    name: "Tana Toraja",
    location: "South Sulawesi",
    description: "Famous for its elaborate funeral rituals, traditional houses (tongkonan), and stunning landscapes of terraced rice fields.",
    image: "https://images.unsplash.com/photo-1559628129-67cf63b72248?ixlib=rb-4.0.3",
    tags: ["Culture", "Traditional", "Mountains", "Remote"],
    rating: 4.5
  }
];
