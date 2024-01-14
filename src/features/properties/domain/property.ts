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
  pincode: string;
}

export interface Property {
  id: string;

  address: Address;
  approachRoadWidth: number;
  area: number;
  areaUOM: "acre" | "kilometre";
  contactName: string;
  contactNo: string;
  description: string;
  dimension: string;
  listType: "sale" | "auction";
  openSides: number;
  ownerId: string;
  ownership: string;
  propertyType: "farm" | "residential" | "commercial";
  title: string;
  documents: {
    title: string;
    fullPath: string;
  }[];
  pictures: {
    [date: string]: { fullPaths: string[]; description: string };
  };
}

// const pictures: {
//   [date: string]: { fullPaths: string[]; description: string };
// } = {
//   "2022/08/15": {
//     description: "",
//     fullPaths: ["url"],
//   },
// };
