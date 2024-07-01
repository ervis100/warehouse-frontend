import {Component, ViewChild, Output, EventEmitter, Input, ElementRef, OnInit, ViewContainerRef} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort, SortDirection} from '@angular/material/sort';
import {FormControl} from '@angular/forms';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {TableColumn} from "../../../shared/interfaces/TableInterfaces/table-column";
import {TableSort} from "../../../shared/interfaces/TableInterfaces/table-sort";
import {TablePage} from "../../../shared/interfaces/TableInterfaces/table-page";
import {TableButton} from "../../../shared/interfaces/TableInterfaces/table-button";
import {SortDir} from "../../../shared/enums/table/sort-dir.enum";
import {TableAction, TableActionChoose} from "../../../shared/interfaces/TableInterfaces/table-action";

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class DatatableComponent implements OnInit {
  constructor() {
  }

  private _dataSource: MatTableDataSource<any>;
  lastRow: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('search') searchVar: ElementRef;

  searchControl = new FormControl();

  @Output() onSearch = new EventEmitter<string>();
  private keyword?:string;

  private _searchDelay = 400;
  private _searchTimeout;

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe((val) => {
      this.keyword = val;
      let timeout = this._searchTimeout;
      let onSearch = this.onSearch;
      if (!timeout) {
        this._searchTimeout = setTimeout(function () {
          clearTimeout(timeout);
          onSearch.emit(val);
        }, this._searchDelay);
      } else {
        clearTimeout(this._searchTimeout);
        this._searchTimeout = setTimeout(function () {
          clearTimeout(timeout);
          onSearch.emit(val);
        }, this._searchDelay);
      }
    });
  }

  /**
   * Fetching state needed for spinner
   */
  @Input() fetching: boolean;

  /**
   * rows
   */
  private _rows: any[] = [];
  @Input() set rows(rows: any[]) {
    this._rows = rows;
    this._dataSource = new MatTableDataSource<any>(this.rows);
  }

  get rows(): any[] {
    return this._rows;
  }

  get dataSource(): MatTableDataSource<any> {
    return this._dataSource;
  }

  /**
   * page params
   */
  private _totalElements;
  @Input() set totalElements(totalElements: number) {
    this._totalElements = totalElements;
  }

  get totalElements() {
    return this._totalElements;
  }

  private _totalPages;

  @Input() set totalPages(totalPages: number) {
    this._totalPages = totalPages;
  }

  get totalPages() {
    return this._totalPages;
  }

  get totalPagesArr() {
    let arr = [];
    for (let i = 0; i < this.totalPages; i++) {
      arr.push(i);
    }
    return arr;
  }

  private _pageIndex;
  @Input() set pageIndex(pageIndex: number) {
    this._pageIndex = pageIndex;
  }

  get pageIndex() {
    return this._pageIndex;
  }

  private _setKeywordValue: boolean = false;

  @Input() set searchKeyword(searchKeyword: string) {
    if (!this._setKeywordValue) {
      this._setKeywordValue = true;
      this.searchControl.setValue(searchKeyword);
    } else {
      this._setKeywordValue = false;
    }
  }

  /**
   * menu actions for each row
   */
  private _actions!: TableAction[];
  @Input() set actions(actions: TableAction[]) {
    this._actions = actions;
  }

  get actions(): TableAction[] {
    return this._actions;
  }

  /**
   * columns
   */
  expandedElement;

  @Input() hasDetails: boolean = false;
  @Input() hasTotalFooter: boolean = false;
  @Input() totalFooterColumns: object;
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;
  @Input() detailsComponent;

  detailsControl(event) {
    this.expandedElement = this.expandedElement === event ? null : event;
    // this.expandedElement = event;
  }

  private _columns!: TableColumn[];
  @Input() set columns(columns: TableColumn[]) {
    this._columns = columns;
  }

  get columns(): TableColumn[] {
    if (this._columns) {
      return this._columns.filter((c) => !c.hidden);
    }
    return [];
  }

  private _sortDefault: TableSort;
  @Input() set sortDefault(sortDefault: TableSort) {
    this._sortDefault = sortDefault;
  }

  get sortDefault(): TableSort {
    return this._sortDefault;
  }

  private _sortBy: string;
  @Input() set sortBy(sortBy: string) {
    this._sortBy = sortBy;
  }

  get sortBy(): string {
    return this._sortBy;
  }

  private _sortDir: string;
  @Input() set sortDir(sortDir: string) {
    this._sortDir = sortDir;
  }

  get sortDir(): SortDirection {
    return this._sortDir == 'desc' ? 'desc' : 'asc';
  }

  /**
   * Displayed columns
   */
  private _columnsNames!: string[];
  get columnsNames() {
    this._columnsNames = [];
    if (this.hasDetails) {
      this._columnsNames.push('expand')
    }
    if (this.actions) {
      this._columnsNames.push('actions');
    }
    this.columns.forEach((col) => {
      this._columnsNames.push(col.prop);
    });
    return this._columnsNames;
  }

  /**
   * Display search
   */

  @Input() displaySearch: boolean = true;

  /**
   *********************** Datatable Events
   */

  /**
   * Get row data on click
   */
  @Output() onRowClicked = new EventEmitter<any>();

  onRowClick(row: any) {
    this.lastRow = row;
    this.onRowClicked.emit(row);
  }

  /**
   *  Page Change
   */
  @Output() onPageChange = new EventEmitter<TablePage>();

  onPage(event: any, type) {
    if (type == 'paginator') {
      this.onPageChange.emit({
        page: event.pageIndex,
        perPage: event.pageSize,
      });
    } else if (type == 'select') {
      this.onPageChange.emit({
        page: event.value,
        perPage: 10,
      });
    }
  }

  /**
   * Sort Change
   */
  @Output() onSortChange = new EventEmitter<TableSort>();

  announceSortChange(sortState: Sort) {
    if (sortState.direction != '') {
      this.onSortChange.emit({
        sortBy: sortState.active,
        sortDir: sortState.direction == 'asc' ? SortDir.ASC : SortDir.DESC,
      });
    } else {
      this.onSortChange.emit({
        sortBy: this._sortDefault.sortBy,
        sortDir: this._sortDefault.sortDir,
      });
    }
  }

  /**
   * Click on menu options
   */
  @Output() onActionChoose = new EventEmitter<TableActionChoose>();

  onAction(action: any) {
    this.onActionChoose.emit({
      action: action,
      row: this.lastRow,
    });
  }

  @Input() buttons: TableButton[];

  @Output() onButtonClicked = new EventEmitter<string>();

  buttonClicked(event) {
    this.onButtonClicked.emit(event);
  }

  isTypeOfArray(param: any): boolean {
    return param instanceof Array;
  }

  /**
   * Click on cell (added companies)
   */
  @Output() onCellClick = new EventEmitter<{ property: string, row: string }>();

  cellClick(element, property) {
    this.onCellClick.emit({
      property: property,
      row: element,
    });
  }
}
