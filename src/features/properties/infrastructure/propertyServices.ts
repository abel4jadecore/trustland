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
  getProperties: async (where: QueryFieldFilterConstraint) => {
    const q = query(collection(db, "properties"), where);

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  },
};

export default propertyServices;
