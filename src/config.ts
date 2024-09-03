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

// Check if the shop environment variable is set
if (!shop) {
    throw new Error('Environment variable SHOP is required');
}

// Check if the access token environment variable is set
if (!accessToken) {
    throw new Error('Environment variable ADMIN_TOKEN is required');
}