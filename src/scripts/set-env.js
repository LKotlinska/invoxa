import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const envContent = `
export const environment = {
  production: false,
  supabaseUrl: '${process.env['SUPABASE_URL']}',
  supabaseKey: '${process.env['SUPABASE_KEY']}'
};
`;

fs.mkdirSync('./src/environments', { recursive: true });
fs.writeFileSync('./src/environments/environment.ts', envContent);
console.log('✅ environment.ts generated');
