import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Page } from 'src/app/interfaces/page';

@Component({
  selector: 'app-paginate-nav',
  templateUrl: './paginate-nav.component.html',
  styleUrls: ['./paginate-nav.component.scss'],
})
export class PaginateNavComponent implements OnInit {
  @Input('Pages') Pages: Page<any>[] = [];
  @Input('CurrentPage') CurrentPage: Page<any> = this.Pages[0];
  @Output('previousPage') PreviousPage = new EventEmitter();
  @Output('nextPage') NextPage = new EventEmitter();
  @Output('setPage') SetPage = new EventEmitter<{ pageNumber: number }>();
  constructor() {}

  ngOnInit(): void {}
}
