// import { db } from "./firebase";
// import { getDatabase, ref, set, onValue, push } from "firebase/database";
// const usersRef = ref(db, "/"); // 'users' düğümüne referans
// const specificUserRef = ref(db, "users/userID123"); // Belirli bir kullanıcıya referans

// const doctorData = ref(db, "/");
// const unsubscribe = onValue(doctorData, (snapshot) => {
//   const data = snapshot.val(); // Verinin JSON halini alın
//   // Veriyi UI'da gösterin veya işleyin
//   console.log(data);
// });

//get() : Belirtilen konumdaki veriyi bir kez okur. Geleceğe (Promise) döner. Yalnızca mevcut veriye ihtiyacınız olduğunda kullanışlıdır.
// get(ref(database, 'users/' + userId)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//   } else {
//     console.log("No data available");
//   }
// }).catch((error) => {
//   console.error(error);
// });

// set() : Belirtilen yoldaki veriyi tamamen üzerine yazar.
// set(ref(database, 'users/' + userId), {
//   username: name,
//   email: email
// });
// push() : Belirtilen liste referansına otomatik olarak benzersiz bir ID ile yeni bir veri ekler (genellikle listeler için kullanılır, örneğin mesajlar listesi).
// push(ref(database, 'messages'), {
//   sender: userId,
//   text: messageText,
//   timestamp: Date.now()
// });
// update() : Belirtilen yoldaki verinin belirli alanlarını günceller, diğer alanları etkilemez.
// update(ref(database, 'users/' + userId), {
//   username: newName
// });

// Firebase RTDB SDK'sını projenize ekleyin ve başlatın.
// Kullanmak istediğiniz veri konumu için bir veritabanı referansı alın.
// set , push , update ile veri yazın.
// onValue (gerçek zamanlı) veya get (bir kereye mahsus) ile veri okuyun.
// En önemlisi , kimlik doğrulama durumunuza göre Realtime Database Güvenlik Kurallarınızı güncelleyin ki uygulamanız veritabanına erişebilsin ve bu erişim güvende olsun.
