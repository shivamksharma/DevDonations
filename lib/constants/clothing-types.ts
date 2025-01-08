export const CLOTHING_TYPES = [
  { id: "tshirt", label: "T-shirt", category: "tops" },
  { id: "shirt", label: "Shirt", category: "tops" },
  { id: "sweater", label: "Sweater", category: "tops" },
  { id: "blouse", label: "Blouse", category: "tops" },
  { id: "pants", label: "Pants", category: "bottoms" },
  { id: "jeans", label: "Jeans", category: "bottoms" },
  { id: "shorts", label: "Shorts", category: "bottoms" },
  { id: "skirt", label: "Skirt", category: "bottoms" },
  { id: "dress", label: "Dress", category: "full" },
  { id: "jumpsuit", label: "Jumpsuit", category: "full" },
  { id: "gown", label: "Gown", category: "full" },
  { id: "romper", label: "Romper", category: "full" },
  { id: "jacket", label: "Jacket", category: "outerwear" },
  { id: "coat", label: "Coat", category: "outerwear" },
  { id: "cardigan", label: "Cardigan", category: "outerwear" },
  { id: "vest", label: "Vest", category: "outerwear" },
] as const;

export type ClothingType = typeof CLOTHING_TYPES[number];