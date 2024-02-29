import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface, SortingInterface } from '../types';

@Injectable()
export class UsersService {
  constructor(private http: HttpClient) {}

  getUsers(
    sorting: SortingInterface,
    searchValue: string
  ): Observable<UserInterface[]> {
    const url = `https://jsonplaceholder.typicode.com/posts`;
    return this.http.get<UserInterface[]>(url);
  }
}