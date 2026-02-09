// upload-phrases.js
// RUN WITH: node upload-phrases.js

const admin = require("firebase-admin");

const serviceAccount = require("./service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const phraseData = {
  saludos: [
    { phrase: "Buenos Dias", translation: "Good morning", phonetic: "bwen-dohs dee-ahs" },
    { phrase: "¿Cómo andás?", translation: "How are you?", phonetic: "koh-moh ahn-dahs" },
    { phrase: "¡Che, qué hacés?", translation: "Hey, what are you up to?", phonetic: "cheh, keh ah-ses" },
    { phrase: "¿Todo bien?", translation: "Everything good?", phonetic: "toh-doh byen" },
    { phrase: "¡Buen día, loco!", translation: "Good morning, dude!", phonetic: "bwen dee-ah, loh-koh" },
    { phrase: "¿Qué onda?", translation: "What's up?", phonetic: "keh ohn-dah" },
  ],
  comida: [
    { phrase: "Tengo hambre", translation: "I'm hungry", phonetic: "toh-goh ahm-breh" },
    {
      phrase: "¿Dónde está el restaurante?",
      translation: "Where is the restaurant?",
      phonetic: "dohn-deh es-tah el re-stoh-rahn-teh",
    },
    { phrase: "¿Querés un asado?", translation: "Do you want an asado?", phonetic: "keh-res oon ah-sah-doh" },
    { phrase: "¡Qué rico está esto!", translation: "This is so delicious!", phonetic: "keh ree-koh es-tah es-toh" },
    {
      phrase: "Pasame la sal, porfa",
      translation: "Pass me the salt, please",
      phonetic: "pah-sah-meh lah sahl, por-fah",
    },
    {
      phrase: "Me muero de ganas de una milanesa",
      translation: "I'm dying for a milanesa",
      phonetic: "meh mweh-roh deh gah-nahs deh oo-nah mee-lah-neh-sah",
    },
  ],
  lunfardo: [
    { phrase: "Che", translation: "Hey (informal address)", phonetic: "chay" },
    { phrase: "Laburar", translation: "To work", phonetic: "lah-boo-rar" },
    { phrase: "Fiaca", translation: "Laziness / no motivation", phonetic: "fee-ah-kah" },
    { phrase: "Birra", translation: "Beer", phonetic: "bee-rrah" },
    { phrase: "Chamuyar", translation: "To sweet-talk / chat up", phonetic: "chah-moo-yar" },
    { phrase: "Pibe / Piba", translation: "Guy / Girl (young person)", phonetic: "pee-beh / pee-bah" },
  ],
  viaje: [
    {
      phrase: "¿Dónde está la estación de tren?",
      translation: "Where is the train station?",
      phonetic: "dohn-deh es-tah lah es-tah-syon deh tren",
    },
    { phrase: "Necesito un taxi", translation: "I need a taxi", phonetic: "neh-seh-see-toh oon tahk-see" },
    {
      phrase: "¿Cuánto sale el boleto?",
      translation: "How much is the ticket?",
      phonetic: "kwahn-toh sah-leh el boh-leh-toh",
    },
    {
      phrase: "¿A qué hora sale el colectivo?",
      translation: "What time does the bus leave?",
      phonetic: "ah keh oh-rah sah-leh el koh-lehk-tee-voh",
    },
    {
      phrase: "Me perdí, ¿me indicás?",
      translation: "I'm lost, can you direct me?",
      phonetic: "meh pehr-dee, meh een-dee-kahs",
    },
    {
      phrase: "¡Qué lindo paisaje!",
      translation: "What a beautiful landscape!",
      phonetic: "keh leen-doh pah-ee-sah-heh",
    },
  ],
  vidaDiaria: [
    { phrase: "¿Qué hora es?", translation: "What time is it?", phonetic: "keh oh-rah es" },
    { phrase: "Estoy cansado", translation: "I'm tired", phonetic: "es-toy kahn-sah-doh" },
    { phrase: "Me voy a duchar", translation: "I'm going to shower", phonetic: "meh voy ah doo-char" },
    { phrase: "No doy más", translation: "I can't take it anymore / I'm exhausted", phonetic: "noh doy mahs" },
    { phrase: "¿Querés mate?", translation: "Do you want mate?", phonetic: "keh-res mah-teh" },
    { phrase: "¡Qué calor de locos!", translation: "What crazy heat!", phonetic: "keh kah-lor deh loh-kohs" },
  ],
  expresiones: [
    { phrase: "¡Qué quilombo!", translation: "What a mess!", phonetic: "keh kee-lohm-boh" },
    { phrase: "Estar al horno", translation: "To be in trouble / screwed", phonetic: "es-tar ahl or-noh" },
    { phrase: "No da", translation: "It doesn't work / it's not possible", phonetic: "noh dah" },
    { phrase: "¡Qué bajón!", translation: "What a downer!", phonetic: "keh bah-hohn" },
    { phrase: "La puta madre", translation: "Damn it! (strong exclamation)", phonetic: "lah poo-tah mah-dreh" },
    { phrase: "Todo piola", translation: "Everything's cool / fine", phonetic: "toh-doh pee-oh-lah" },
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
