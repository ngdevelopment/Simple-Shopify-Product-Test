import { ShopifyClient } from './shopifyClient.js';
import { Logger } from './logger.js';
import { ArgumentParser } from './argumentParser.js';
import { shop, accessToken } from './config.js';

/**
 * Class representing the main application.
 */
class App {
    private readonly logger: Logger;
    private readonly argParser: ArgumentParser;
    private readonly apiClient: ShopifyClient;

    /**
     * Creates an instance of App.
     * @param {string[]} args - The command-line arguments.
     * @param {string} shop - The shop domain.
     * @param {string} accessToken - The access token for the Shopify API.
     */
    constructor(args: string[], shop: string, accessToken: string) {
        this.logger = new Logger();
        this.argParser = new ArgumentParser(args, this.logger);
        this.apiClient = new ShopifyClient(shop, accessToken);
    }

    /**
     * Runs the application.
     * @returns {Promise<void>}
     * @private
     */
    private async run(): Promise<void> {
        const nameArg = this.argParser.getArgValue('--name');

        if (nameArg) {
            await this.callApi(nameArg);
        } else {
            this.logger.log('Name parameter not provided', 'error');
        }
    }

    /**
     * Calls the Shopify API and fetches products.
     * @param {string} name - The name to search for in products.
     * @returns {Promise<void>}
     * @private
     */
    private async callApi(name: string): Promise<void> {
        const query = `
            query ($first: Int, $after: String, $name: String) {
                products(first: $first, after: $after, query: $name) {
                    edges {
                        node {
                            id
                            title
                            variants(first: $first) {
                                edges {
                                    node {
                                        id
                                        title
                                        price
                                    }
                                }
                                pageInfo {
                                    hasNextPage
                                    endCursor
                                }
                            }
                        }
                    }
                    pageInfo {
                        hasNextPage
                        endCursor
                    }
                }
            }
        `;

        const formattedName = `title:*${name}*`;

        try {
            const data = await this.apiClient.fetchPaginatedData(query, { name: formattedName });

            console.log('Output: ');
            data.forEach(product => {
                product.variants.edges.forEach(variantEdge => {
                    const variant = variantEdge.node;
                    console.log(`${product.title} - ${variant.title} - price $${variant.price}`);
                });
            });
        } catch (error) {
            this.logger.log(`Error fetching data: ${(error as Error).message}`, 'error');
        }
    }

    /**
     * Static method to start the application.
     * @param {string[]} args - The command-line arguments.
     * @param {string | undefined} shop - The shop domain.
     * @param {string | undefined} accessToken - The access token for the Shopify API.
     * @returns {Promise<void>}
     */
    public static async main(args: string[], shop: string | undefined, accessToken: string | undefined): Promise<void> {
        if (!shop) {
            throw new Error('Environment variable SHOP is required');
        }

        if (!accessToken) {
            throw new Error('Environment variable ADMIN_TOKEN is required');
        }

        try {
            const app = new App(args, shop, accessToken);
            await app.run();
        } catch (error) {
            console.error(`Error in main: ${(error as Error).message}`);
        }
    }
}

// Start the application
const args = process.argv.slice(2);
App.main(args, shop, accessToken).catch(error => console.error(`Error in main: ${(error as Error).message}`));