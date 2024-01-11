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
  deleteDoc,
} from "firebase/firestore";
import { Coordinate, Property } from "../domain/property";
import { db } from "@/features/core/domain/utils/firebase";
import { storage } from "@/features/core/domain/utils/firebase";
import {
  UploadResult,
  listAll,
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { RcFile, UploadFile } from "antd/es/upload";
import { Dispatch, SetStateAction } from "react";

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

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
      const propertyRef = doc(db, "properties", data.id).withConverter(
        propertyConverter
      );
      await setDoc(propertyRef, {
        ...data,
      });
      return { id: data.id };
    }

    const response = (
      await addDoc(collection(db, "properties"), data)
    ).withConverter(propertyConverter);
    return { id: response.id };
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
  uploadAttachment: async (
    {
      localFile,
      fileList,
      setFileList,
    }: {
      localFile: RcFile;
      fileList: UploadFile[];
      setFileList: Dispatch<SetStateAction<UploadFile[]>>;
    },
    { userId, propertyId }: { userId: string; propertyId: string }
  ) => {
    const type = localFile.type.split("/")[0];
    const base64 = await getBase64(localFile);

    const fileRef = ref(
      storage,
      `users/${userId}/${propertyId}/${
        type === "image" ? "pictures" : "files"
      }/${localFile.uid}`
    );

    uploadBytesResumable(fileRef, localFile).on(
      "state_changed",
      async (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFileList(() => [
          ...fileList,
          {
            uid: localFile.uid,
            name: "image.png",
            status: "uploading",
            percent: progress,

            url: base64,
          },
        ]);
      },
      () => {},
      async () => {
        setFileList([
          {
            uid: localFile.uid,
            name: "image.png",
            status: "done",

            url: base64,
          },
        ]);
      }
    );
  },
  listAllFiles: async ({
    userId,
    propertyId,
  }: {
    userId: string;
    propertyId: string;
  }) => {
    const url = `users/${userId}/${propertyId}/pictures`;
    const listRef = ref(storage, url);
    const response = await listAll(listRef);

    const files: UploadFile[] = [];
    const promises = response.items.map(async (item) => {
      const imageUrl = await getDownloadURL(ref(storage, item.fullPath));
      files.push({
        uid: item.name,
        url: imageUrl,
        name: item.name,
        status: "done",
      });
    });
    await Promise.all(promises);
    return files;
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
  deleteProperty: async (propertyId: string) => {
    await deleteDoc(doc(db, "properties", propertyId));
    return propertyId;
  },
};

export default propertyServices;
