const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const outputFile = path.join(__dirname, `../src/environments/environment.prod.ts`);

const content = `
export const environment = {
  production: true,
  firebaseConfig: {
    apiKey: "${process.env["API_KEY"]}",
    authDomain: "${process.env["AUTH_DOMAIN"]}",
    projectId: "${process.env["PROJECT_ID"]}",
    storageBucket: "${process.env["STORAGE_BUCKET"]}",
    messagingSenderId: "${process.env["MESSAGING_SENDER_ID"]}",
    appId: "${process.env["APP_ID"]}"
  }
};
`;

fs.writeFileSync(outputFile, content.trim(), 'utf8');
console.log(`✅ Archivo generado: ${outputFile}`);
