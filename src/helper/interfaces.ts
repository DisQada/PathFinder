export interface SearchOptions {
    deepSearch?: boolean;
}

export interface filterOptions {
    name?: string | RegExp;
    extension?: string | RegExp;
    folder?: string | RegExp;
    root?: string | RegExp;
}
