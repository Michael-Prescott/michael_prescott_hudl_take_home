/**
 * Loads environment variables from a .env file into a config object for securly storing sensitive information like usernames and passwords
 */
import dotenv from 'dotenv';

dotenv.config();

/**
 * Configuration object containing sensitive login information
 */
export const config = {
    username: process.env.USERNAME!,
    password: process.env.PASSWORD!
};

// Environment constants for different operating systems
export const MACOS = 'darwin';