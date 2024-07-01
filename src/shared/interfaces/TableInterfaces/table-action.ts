export interface TableAction {
    title: string;
    action: string;
    icon?: string;
    show?: Function;
}

export interface TableActionChoose {
    action: string;
    row: any;
}
