import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
  })
  export class PaginationComponent {
    @Input() currentPage: number = 1;

    @Input() total: number = 0;

    @Input() limit: number = 10;

    @Output() changePage = new EventEmitter<number>();

    pages: number[] = [];

    constructor() {
        console.log(this.currentPage);
    }
    ngOnInit(): void {
        const pagesCount = Math.ceil(this.total / this.limit);
        console.log(pagesCount)
        this.pages = [...Array(pagesCount).keys()].map((i) => i+1);
      }
  }