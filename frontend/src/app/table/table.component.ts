import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from './../services/user.service';
import { UserInterface, SortingInterface } from '../types';
import { debounce, timer } from 'rxjs';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  columns: Array<keyof UserInterface> = ['id', 'userId', 'title', 'body'];

  readonly Limit = 10;

  sorting: SortingInterface = {
    column: 'id',
    order: 'asc',
  };

  users: UserInterface[] = [];

  totalUsers: UserInterface[] = [];

  searchValue: string = '';

  searchForm = new FormGroup({
    searchValue: new FormControl(''),
  });

  currentPage = 1;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.fetchData();

    this.searchForm.get('searchValue')?.valueChanges.pipe(
      debounce(() => timer(500)),
    ).subscribe((value) => this.handleSearch(value));
  }

  fetchData(): void {
    this.usersService.getUsers(this.sorting, this.searchValue).subscribe((users) => {
      this.totalUsers = users;
      this.handlePageChange(1);
    });
  }

  isDescSorting(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'desc';
  }

  isAscSorting(column: string): boolean {
    return this.sorting.column === column && this.sorting.order === 'asc';
  }

  sortTable(column: keyof UserInterface): void {
    const futureSortingOrder = this.isDescSorting(column) ? 'asc' : 'desc';
    this.sorting = {
      column,
      order: futureSortingOrder,
    };
    this.users = this.totalUsers.sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return (valueA - valueB) * (futureSortingOrder === 'asc' ? 1 : -1);
      } else {
        const stringValueA = String(valueA).toLowerCase();
        const stringValueB = String(valueB).toLowerCase();
        return stringValueA.localeCompare(stringValueB) * (futureSortingOrder === 'asc' ? 1 : -1);
      }
    });
    this.handlePageChange(1);
  }

  handleSearch(searchString: string): void {
    this.users = this.totalUsers.filter((user) => user.title.includes(searchString));
  }

  handlePageChange(pageNumber: number) {
    this.currentPage = pageNumber;
    const startIndex = (pageNumber - 1) * 10;
    const endIndex = pageNumber * this.Limit;
    this.users = this.totalUsers.slice(startIndex, endIndex);
  }
}