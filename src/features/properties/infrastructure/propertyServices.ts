import { db, storage } from "@/features/core/domain/utils/firebase";
import { RcFile, UploadFile } from "antd/es/upload";
import Compressor from "compressorjs";
import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
  getDocs,
  query,
  setDoc,
  arrayUnion,
} from "firebase/firestore";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Dispatch, SetStateAction } from "react";
import { Property } from "../domain/property";
import moment from "moment";

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
      ownerId: property.ownerId,
      ownership: property.ownership,
      propertyType: property.propertyType,
      title: property.title,

      documents: property.documents,
      pictures: property.pictures,
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
      ownerId: data.ownerId,
      ownership: data.ownership,
      propertyType: data.propertyType,
      title: data.title,
      documents: data.documents,
      pictures: data.pictures,
    };
  },
};

const propertyServices = {
  saveProperty: async (data: Property) => {
    if (data.id) {
      const propertyRef = doc(db, "properties", data.id).withConverter(
        propertyConverter
      );
      await updateDoc(propertyRef, {
        ...data,
      });
      return { id: data.id };
    }

    const response = (
      await addDoc(collection(db, "properties"), data)
    ).withConverter(propertyConverter);
    return { id: response.id };
  },
  uploadAttachment: async (
    {
      localFile,
      setFileList,
    }: {
      localFile: RcFile;
      setFileList: Dispatch<SetStateAction<UploadFile[]>>;
    },
    { userId, propertyId }: { userId: string; propertyId: string }
  ) => {
    const type = localFile.type.split("/")[0];
    const extension = localFile.type.split("/")[1];

    switch (type) {
      case "image":
        new Compressor(localFile, {
          quality: 0.2,
          maxWidth: 1200,
          success: async (result) => {
            const fileRef = ref(
              storage,
              `users/${userId}/properties/${propertyId}/pictures/${localFile.uid}.${extension}`
            );

            const uploadTask = uploadBytesResumable(fileRef, result);

            uploadTask.on(
              "state_changed",
              async (snapshot) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setFileList((prevFileList) => {
                  const filteredFileList = prevFileList.filter(
                    (file) => localFile.uid !== file.uid
                  );

                  return [
                    ...filteredFileList,
                    {
                      uid: localFile.uid,
                      name: localFile.name,
                      status: "uploading",
                      percent: progress,
                    },
                  ];
                });
              },
              () => {},
              async () => {
                const imageUrl = await getDownloadURL(uploadTask.snapshot.ref);
                const fullPath = (await uploadTask).metadata.fullPath;

                const propertyRef = doc(db, "properties", propertyId);

                const updatedata = {
                  pictures: {
                    [moment().format("DD-MM-YYYY")]: {
                      description: "",
                      fullPaths: arrayUnion(fullPath),
                    },
                  },
                };

                await setDoc(propertyRef, updatedata, { merge: true });

                setFileList((prevFileList) => {
                  const filteredFileList = prevFileList.filter(
                    (file) => localFile.uid !== file.uid
                  );

                  return [
                    ...filteredFileList,
                    {
                      uid: localFile.uid,
                      name: localFile.name,
                      status: "done",
                      url: imageUrl,
                    },
                  ];
                });
              }
            );
          },
        });
        break;
      case "application": {
        const documentRef = ref(
          storage,
          `users/${userId}/properties/${propertyId}/documents/${localFile.uid}.${extension}`
        );

        const uploadTask = uploadBytesResumable(documentRef, localFile);

        uploadTask.on(
          "state_changed",
          async (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setFileList((prevFileList) => {
              const filteredFileList = prevFileList.filter(
                (file) => localFile.uid !== file.uid
              );

              return [
                ...filteredFileList,
                {
                  uid: localFile.uid,
                  name: localFile.name,
                  status: "uploading",
                  percent: progress,
                },
              ];
            });
          },
          () => {},
          async () => {
            const documentUrl = await getDownloadURL(uploadTask.snapshot.ref);
            const fullPath = (await uploadTask).metadata.fullPath;

            const propertyRef = doc(db, "properties", propertyId).withConverter(
              propertyConverter
            );
            await updateDoc(propertyRef, {
              documents: arrayUnion({ title: "", fullPath: fullPath }),
            });

            setFileList((prevFileList) => {
              const filteredFileList = prevFileList.filter(
                (file) => localFile.uid !== file.uid
              );

              return [
                ...filteredFileList,
                {
                  uid: localFile.uid,
                  name: localFile.name,
                  status: "done",
                  url: documentUrl,
                },
              ];
            });
          }
        );
        break;
      }
    }
  },
  listAllFiles: async ({
    userId,
    propertyId,
  }: {
    userId: string;
    propertyId: string;
  }) => {
    const url = `users/${userId}/properties/${propertyId}/pictures`;
    // const url = `users/${userId}/properties/${propertyId}/pictures`;
    // const url = `users/${userId}/properties/${propertyId}/pictures/thumbs`;
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
  deleteAttachment: async () => {
    // await
  },
};

export default propertyServices;
