export interface TableColumn {
    name: string;
    prop: string;
    searchable: boolean;
    orderable: boolean;
    hidden: boolean;
    objectProperty: string;
    render: Function|null;
    renderType?:string;
    icon?:string[] //mat-icon name
}
