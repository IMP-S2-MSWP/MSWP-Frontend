import {app} from '';
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
const db = getFirestore(app);

const insertUserInfo = (number, idList, nameList) => {
  for (let i = 0; i < userList.length; i++) {
    addDoc(collection(db, 'room', number, 'user'), {
      nickname: nameList[i],
      id: idList[i],
      date: Timestamp.now(),
    });
  }
};
export {insertUserInfo};
