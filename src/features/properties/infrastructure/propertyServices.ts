import {
  QueryFieldFilterConstraint,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import { Property } from "../domain/property";
import { db } from "@/features/core/domain/utils/firebase";

const propertyServices = {
  saveProperty: async (data: Property) => {
    await addDoc(collection(db, "properties"), data);
  },
  getProperty: async (id: string): Promise<Property | undefined> => {
    const propertyRef = doc(db, "properties", id);
    const propertySnapshot = await getDoc(propertyRef);
    const property = propertySnapshot.data() as Property | undefined;
    return property;
  },
  getProperties: async (): Promise<Property[]> => {
    const q = query(collection(db, "properties"));

    const querySnapshot = await getDocs(q);
    const properties: Property[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      properties.push({ ...data, id: doc.id } as Property);
    });

    return properties;
  },
};

export default propertyServices;
