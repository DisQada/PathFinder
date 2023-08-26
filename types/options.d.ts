/**
 * Used to filter the search logic | Options to control how path saving is performed.
 */
export interface SearchOptions {
    /**
     * - Search subfolders.
     */
    deepSearch?: boolean;
};
/**
 * Options to control how paths search is performed.
 */
export interface FilterOptions {
    /**
     * The exact or a pattern regex.
     */
    name?: string | RegExp;
    /**
     * The exact or a pattern regex.
     */
    extension?: string | RegExp;
    /**
     * The exact or a pattern regex.
     */
    folder?: string | RegExp;
    /**
     * The exact or a pattern regex.
     */
    root?: string | RegExp;
};
