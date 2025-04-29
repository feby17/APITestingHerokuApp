import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();
export default defineConfig({
  env: {
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    BASE_URL: process.env.BASE_URL,
  },
  e2e: {
    baseUrl: process.env.BASE_URL,
    setupNodeEvents(on, config) {
      return config;
    },
  },
  reporter: 'cypress-mochawesome-reporter'
});
