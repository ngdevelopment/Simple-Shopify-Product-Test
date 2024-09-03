import fetch from 'node-fetch';
import { ProductsResponse, Product } from './interfaces.js';

/**
 * ShopifyClient class to interact with Shopify's GraphQL API.
 */
export class ShopifyClient {
    private readonly shop: string;
    private readonly accessToken: string;

    /**
     * Creates an instance of ShopifyClient.
     * @param {string} shop - The shop domain.
     * @param {string} accessToken - The access token for the Shopify API.
     */
    constructor(shop: string, accessToken: string) {
        this.shop = shop;
        this.accessToken = accessToken;
    }

    /**
     * Makes a GraphQL request to the Shopify API.
     * @template T
     * @param {string} query - The GraphQL query string.
     * @param {Record<string, any>} [variables={}] - The variables for the GraphQL query.
     * @returns {Promise<T>} - The response data.
     * @throws {Error} - Throws an error if the request fails or if there are GraphQL errors.
     * @private
     */
    private async request<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
        const response = await fetch(`https://${this.shop}/admin/api/2023-10/graphql.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': this.accessToken,
            },
            body: JSON.stringify({
                query,
                variables,
            }),
        });

        if (!response.ok) {
            throw new Error(`GraphQL request failed: ${response.statusText}`);
        }

        const responseBody: any = await response.json();
        
        if (responseBody.errors) {
            throw new Error(`GraphQL error: ${responseBody.errors.map((e: any) => e.message).join(', ')}`);
        }

        return responseBody.data;
    }

    /**
     * Fetches paginated data from the Shopify API.
     * @param {string} query - The GraphQL query string.
     * @param {Record<string, any>} [variables={}] - The variables for the GraphQL query.
     * @param {number} [first=5] - The number of items to fetch per page.
     * @returns {Promise<Product[]>} - The list of products.
     * @throws {Error} - Throws an error if the request fails or if there are GraphQL errors.
     */
    async fetchPaginatedData(query: string, variables: Record<string, any> = {}, first: number = 5): Promise<Product[]> {
        let hasNextPage = true;
        let after: string | null = null;
        let allData: Product[] = [];

        while (hasNextPage) {
            const response: ProductsResponse = await this.request<ProductsResponse>(query, {
                ...variables,
                first,
                after,
            });

            const products = response.products.edges.map((edge) => edge.node);
            allData = allData.concat(products);

            hasNextPage = response.products.pageInfo.hasNextPage;
            after = response.products.pageInfo.endCursor;
        }

        return allData;
    }
}