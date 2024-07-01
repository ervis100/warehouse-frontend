export interface TablePage {
    page: number;
    perPage: number;
}

export interface PageParams {
    page: number;
    size: number;
    sortBy: string;
    sortDir: string;
    searchKeyword: string;
}
