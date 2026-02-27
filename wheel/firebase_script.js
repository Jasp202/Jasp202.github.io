/* ============================================================
   SAFE DEFAULTS — THESE ALWAYS EXIST
   ============================================================ */

window.firebase_dare = "";
window.firebase_flag = false;

window.setFirebaseDare = async function () {
  // no-op when Firebase is unavailable
};

window.initFirebaseLabels = async function () {
  // no-op when Firebase is unavailable
};

window.resetFirebaseFlag = async function () {
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
    const flagDocRef = doc(db, "games", "pokerNightFlag");

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

      await setDoc(
        flagDocRef,
        {
        isActive: false
        },
        { merge: true }
    );
    };

    window.resetFirebaseFlag = async function () {
        try {
            await setDoc(
            flagDocRef,
            { isActive: false },
            { merge: true }
            );
            console.log("firebase_flag reset to false");
        } catch (err) {
            console.error("Failed to reset firebase_flag", err);
        }
        };

    onSnapshot(docRef, (snapshot) => {
      if (!snapshot.exists()) return;
      window.firebase_dare = snapshot.data().status;
      console.log("firebase_dare updated:", window.firebase_dare);
    });

    onSnapshot(flagDocRef, (snapshot) => {
    if (!snapshot.exists()) {
        window.firebase_flag = false;
        return;
    }

    const data = snapshot.data();
    const newValue = !!data.isActive;
    const oldValue = window.firebase_flag;

    window.firebase_flag = newValue;

    console.log("firebase_flag updated:", newValue);

    // 🔔 Only fire event if it changed
    if (newValue !== oldValue) {
        window.dispatchEvent(
        new CustomEvent("firebaseFlagChanged", {
            detail: { value: newValue }
        })
        );
    }
});

    console.log("✅ Firebase loaded");

  } catch (err) {
    console.warn("⚠️ Firebase failed to load — running offline mode", err);
  }
})();
