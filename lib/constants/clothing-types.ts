export const CLOTHING_TYPES = [
  { id: "tshirt", label: "T-shirt", category: "tops" },
  { id: "shirt", label: "Shirt", category: "tops" },
  { id: "pants", label: "Pants", category: "bottoms" },
  { id: "jeans", label: "Jeans", category: "bottoms" },
  { id: "dress", label: "Dress", category: "full" },
  { id: "sweater", label: "Sweater", category: "tops" },
  { id: "jacket", label: "Jacket", category: "outerwear" },
  { id: "coat", label: "Coat", category: "outerwear" },
  { id: "skirt", label: "Skirt", category: "bottoms" },
  { id: "shorts", label: "Shorts", category: "bottoms" }
] as const;

export type ClothingType = typeof CLOTHING_TYPES[number];