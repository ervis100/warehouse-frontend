import { TableColumn } from "./table-column";

export interface TableResponse<T> {
  columns: TableColumn[];
  content: T[];
  first: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  pageNo: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: number;
}