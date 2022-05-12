import { dbRef as db, storageRef } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import {
  collection,
  addDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

export default async function UploadImageFile(data, selectedFile) {
  // use addDoc to let FB create an ID
  const docRef = await addDoc(collection(db, "posts"), {
    ...data,
    timestamp: serverTimestamp(),
  });

  const imgRef = ref(storageRef, `images/${docRef.id}`);

  if (selectedFile) {
    uploadString(imgRef, selectedFile, "data_url").then(async (snapshot) => {
      console.log("Uploaded a data_url string!", snapshot);

      const downloadURL = await getDownloadURL(imgRef);

      // update doc
      await updateDoc(doc(db, "posts", docRef.id), {
        image: downloadURL,
      });
    });
  }
}
