/* ============================================================
   SAFE DEFAULTS — THESE ALWAYS EXIST
   ============================================================ */

window.firebase_dare = "";

window.setFirebaseDare = async function () {
  // no-op when Firebase is unavailable
};

window.initFirebaseLabels = async function () {
  // no-op when Firebase is unavailable
};

/* ============================================================
   TRY TO LOAD FIREBASE (DYNAMIC + SAFE)
   ============================================================ */

(async () => {
  try {
    const { initializeApp } = await import(
      "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js"
    );

    const {
      getFirestore,
      doc,
      setDoc,
      updateDoc,
      onSnapshot,
      arrayUnion
    } = await import(
      "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js"
    );

    /* ---------- FIREBASE INIT ---------- */

    const firebaseConfig = {
      apiKey: "AIzaSyDPZauivTgjQRsF1_CIPgVYVjj4EuYa3Ko",
      authDomain: "pokernightwheel.firebaseapp.com",
      projectId: "pokernightwheel",
      storageBucket: "pokernightwheel.firebasestorage.app",
      messagingSenderId: "223478613296",
      appId: "1:223478613296:web:132b696fb0eeb9e01534f5"
    };

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const docRef = doc(db, "games", "pokerNight");

    /* ---------- REAL IMPLEMENTATIONS ---------- */

    window.setFirebaseDare = async function (newState) {
      await updateDoc(docRef, { status: newState });
    };

    window.initFirebaseLabels = async function (labels) {
      await setDoc(
        docRef,
        {
          labels: [],
          status: ""
        },
        { merge: true }
      );

      await updateDoc(docRef, {
        labels: arrayUnion(...labels)
      });
    };

    onSnapshot(docRef, (snapshot) => {
      if (!snapshot.exists()) return;
      window.firebase_dare = snapshot.data().status;
      console.log("firebase_dare updated:", window.firebase_dare);
    });

    console.log("✅ Firebase loaded");

  } catch (err) {
    console.warn("⚠️ Firebase failed to load — running offline mode", err);
  }
})();
