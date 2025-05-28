import dotenv from 'dotenv';

dotenv.config();

export const config = {
    username: process.env.USERNAME!,
    password: process.env.PASSWORD!
};