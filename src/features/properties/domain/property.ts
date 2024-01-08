export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Address {
  plotNo: string;
  addressOne: string;
  addressTwo: string;
  state: string;
  district: string;
  country: string;
  pincode: string;
}

export interface Property {
  id: string;
  title: string;
  area: number;
  areaUOM: "acre" | "kilometre";
  dimension: string;
  ownership: string;
  openSides: number;
  approachRoadWidth: number;
  address: Address;
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
  contactName: string;
  contactNo: string;
}
