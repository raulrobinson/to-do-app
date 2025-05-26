const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');

const envFile = process.env["ENV"] === 'prod' ? '.env.prod' : '.env';
dotenv.config({ path: envFile });

const isProd = process.env["ENV"] === 'prod';

const outputFile = path.join(__dirname, `../src/environments/environment${isProd ? '.prod' : ''}.ts`);

const content = `
export const environment = {
  production: ${isProd},
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
