import React, {useState, useEffect} from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import {app} from '../components/firebase/db.js';
import {getFirestore, onSnapshot, collection} from 'firebase/firestore';

const db = getFirestore(app);
const EventBeacon = ({route}) => {
  //const uid = "route.params.uid"
  const uid = 'test';
  const [data, setData] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    onSnapshot(
      collection(db, 'room', route.params.chatid, 'chat'),
      docSnapshot => {
        let documents = [];
        docSnapshot.forEach(document => {
          const type = uid == document.data().name ? true : false;
          documents.push({
            id: document.id,
            ...document.data(),
            isMine: type,
          });
        });
        documents = documents.sort((a, b) => a.date - b.date);
        setData(documents);
      },
    );
    onSnapshot(
      collection(db, 'room', route.params.chatid, 'user'),
      docSnapshot => {
        console.log('유저내역');
        let documents = [];
        docSnapshot.forEach(document => {
          const type = uid == document.data().name ? true : false;
          documents.push({
            id: document.id,
            ...document.data(),
            isMine: type,
          });
        });
        setUser(documents);
      },
    );
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://www.monthlypeople.com/news/photo/202302/458922_457483_3552.jpg',
          }} // Replace with your image URL
          style={styles.imageStyle}
        />
        <Text style={styles.textStyle}>
          김창재의 마법세계에 오신 것을 환영합니다.
        </Text>
        <Text>술은 조금 드시나요?</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // Adjust as needed
  },
  imageStyle: {
    width: '100%', // Adjust width as needed
    height: 400, // Adjust height as needed
    //resizeMode: 'contain', // Adjust as per your requirement
  },
  textStyle: {
    marginTop: 20, // Adjust as needed
    textAlign: 'center',
    // Add additional styling for text as needed
  },
  // ... other styles remain the same ...
});

export default EventBeacon;
