/**
 * Interface for pagination information.
 */
export interface PageInfo {
    /**
     * Indicates if there is a next page.
     * @type {boolean}
     */
    hasNextPage: boolean;

    /**
     * The cursor for the end of the current page.
     * @type {string | null}
     */
    endCursor: string | null;
}

/**
 * Interface for a product variant.
 */
export interface Variant {
    /**
     * The unique identifier for the variant.
     * @type {string}
     */
    id: string;

    /**
     * The title of the variant.
     * @type {string}
     */
    title: string;

    /**
     * The price of the variant.
     * @type {string}
     */
    price: string;
}

/**
     * Interface for a product.
     */
export interface Product {
    /**
     * The unique identifier for the product.
     * @type {string}
     */
    id: string;

    /**
     * The title of the product.
     * @type {string}
     */
    title: string;

    /**
     * The variants of the product.
     * @type {{ edges: { node: Variant }[]; pageInfo: PageInfo }}
     */
    variants: {
        edges: { node: Variant }[];
        pageInfo: PageInfo;
    };
}

/**
 * Interface for the response from the products query.
 */
export interface ProductsResponse {
    /**
     * The products returned by the query.
     * @type {{ edges: { node: Product }[]; pageInfo: PageInfo }}
     */
    products: {
        edges: { node: Product }[];
        pageInfo: PageInfo;
    };
}