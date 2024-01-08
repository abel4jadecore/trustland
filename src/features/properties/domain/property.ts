export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Property {
  id: string;
  area: number;
  areaUOM: "acre" | "kilometre";
  dimension: string;
  ownership: string;
  openSides: number;
  approachRoadWidth: number;
  address: string;
  saleStatus: number;
  coordinate: Coordinate;
  description: string;
  ownerId: string;
  docs: unknown;
  propertyType: "farm" | "residential" | "commercial";
  listType: "sale" | "auction";
  listedAt: Date;
  updatedAt: Date;
  pictures: unknown;
  valuation: unknown;
  contact: unknown;
}
