import {
  QueryFieldFilterConstraint,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  FirestoreDataConverter,
  DocumentData,
  QueryDocumentSnapshot,
  WithFieldValue,
  SnapshotOptions,
} from "firebase/firestore";
import { Coordinate, Property } from "../domain/property";
import { db } from "@/features/core/domain/utils/firebase";
import { storage } from "@/features/core/domain/utils/firebase";
import { UploadResult, ref, uploadBytes } from "firebase/storage";
import { RcFile } from "antd/es/upload";

const propertyConverter: FirestoreDataConverter<Property> = {
  toFirestore(property: WithFieldValue<Property>): DocumentData {
    return {
      id: property.id,

      address: property.address,
      approachRoadWidth: property.approachRoadWidth,
      area: property.area,
      areaUOM: property.areaUOM,
      contactName: property.contactName,
      contactNo: property.contactNo,
      description: property.description,
      dimension: property.dimension,
      listType: property.listType,
      openSides: property.openSides,
      ownership: property.ownership,
      propertyType: property.propertyType,
      title: property.title,
    };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Property {
    const data = snapshot.data(options);
    return {
      id: snapshot.id,

      address: data.address,
      approachRoadWidth: data.approachRoadWidth,
      area: data.area,
      areaUOM: data.areaUOM,
      contactName: data.contactName,
      contactNo: data.contactNo,
      description: data.description,
      dimension: data.dimension,
      listType: data.listType,
      openSides: data.openSides,
      ownership: data.ownership,
      propertyType: data.propertyType,
      title: data.title,
    };
  },
};

const propertyServices = {
  saveProperty: async (data: Property) => {
    if (data.id) {
      const propertyRef = doc(db, "properties", data.id);
      const response = await setDoc(propertyRef, {
        ...data,
      });
      return response;
    }
    const response = await addDoc(collection(db, "properties"), data);
    return response;
  },
  saveAttachments: async (
    files: RcFile[],
    { userId, propertyId }: { userId: string; propertyId: string }
  ) => {
    const uploadedFiles: UploadResult[] = [];

    const uploadPromises = files.map(async (file) => {
      const type = file.type.split("/")[0];
      const fileRef = ref(
        storage,
        `users/${userId}/${propertyId}/${
          type === "image" ? "pictures" : "files"
        }/${file.uid}`
      );
      const response = await uploadBytes(fileRef, file);
      uploadedFiles.push(response);
    });

    await Promise.all(uploadPromises);

    return uploadedFiles;
  },
  getProperty: async (id: string): Promise<Property | undefined> => {
    const propertyRef = doc(db, "properties", id).withConverter(
      propertyConverter
    );
    const propertySnapshot = await getDoc(propertyRef);
    const property = propertySnapshot.data();
    return property;
  },
  getProperties: async (): Promise<Property[]> => {
    const q = query(collection(db, "properties")).withConverter(
      propertyConverter
    );

    const querySnapshot = await getDocs(q);
    const properties: Property[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      properties.push(data);
    });

    return properties;
  },
};

export default propertyServices;
