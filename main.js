const firebase = require("@firebase/testing");

const PROJECT_ID = "rpb";
const RULES = `
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read;
      // allow write: if request.auth.uid != null;
    }
  }
}
`;

async function main() {
  await firebase.loadFirestoreRules({
    projectId: PROJECT_ID,
    rules: RULES
  });
  for (let i = 0; i < 100; i++) {
    console.time(`#${i}`);
    let db = firebase.initializeTestApp({
      projectId: PROJECT_ID,
      auth: null
    }).firestore();
    await firebase.assertFails(
      db.collection("users").doc("alice").set({ birthday: "January 1" })
    );
    console.timeEnd(`#${i}`);
  }
}

main().catch(err => {
  console.error(err);
}).then(() => {
  firebase.apps().forEach(app => app.delete());
});
