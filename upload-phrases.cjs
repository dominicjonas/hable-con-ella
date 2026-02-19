// upload-phrases.js
// RUN WITH: node upload-phrases.cjs

const admin = require("firebase-admin");

const serviceAccount = require("./service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const phraseData = {
  "talking-to-dogs": [
    { phrase: "Sentate", translation: "Sit", phonetic: "sen-tah-teh" },
    { phrase: "Salí de ahí", translation: "Get out of there", phonetic: "sah-lee deh ah-ee" },
    { phrase: "Vení", translation: "Come here", phonetic: "veh-nee" },
    { phrase: "Toma", translation: "Take it", phonetic: "toh-mah" },
    { phrase: "Vamos", translation: "Let's go", phonetic: "vah-mohs" },
    { phrase: "Dame la patita", translation: "Give me your paw", phonetic: "dah-meh lah pah-tee-tah" },
  ],
};

async function uploadPhrases() {
  console.log("Starting phrase upload to Firestore...");

  for (const categoryId in phraseData) {
    const categoryPhrases = phraseData[categoryId];

    for (let i = 0; i < categoryPhrases.length; i++) {
      const phrase = categoryPhrases[i];
      const docId = `${categoryId}-${i}`;

      await db
        .collection("phrases")
        .doc(docId)
        .set({
          categoryId,
          spanish: phrase.phrase || phrase.spanish,
          english: phrase.translation || phrase.english,
          phonetic: phrase.phonetic || "",
          createdAt: new Date().toISOString(),
        });

      console.log(`Uploaded: ${docId}`);
    }
  }

  console.log("Upload complete! Check Firestore.");
}

uploadPhrases().catch((err) => {
  console.error("Upload failed:", err);
});
