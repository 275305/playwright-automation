import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const ENV = {
  BASE_URL: process.env.BASE_URL || 'https://www.saucedemo.com'
};