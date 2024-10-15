import dotenv from 'dotenv';

// Load environment variables from a .env file into process.env
dotenv.config();

/**
 * The shop domain from the environment variables.
 * @type {string | undefined}
 */
export const shop = process.env.SHOP;

/**
 * The access token for the Shopify API from the environment variables.
 * @type {string | undefined}
 */
export const accessToken = process.env.ADMIN_TOKEN;
