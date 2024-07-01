import { SortDir } from "../../enums/table/sort-dir.enum";

export interface TableSort {
    sortBy: string;
    sortDir: SortDir;
}