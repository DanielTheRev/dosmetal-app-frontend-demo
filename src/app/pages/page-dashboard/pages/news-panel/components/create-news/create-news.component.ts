import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.scss'],
})
export class CreateNewsComponent implements OnInit {
  @Output('title') NewsTitle = new EventEmitter<string>();
  @Output('description') NewsDescription = new EventEmitter<string>();
  constructor() {}

  ngOnInit(): void {}

  onTitle(ev: any, target: string) {
    if (target === 'title') {
      this.NewsTitle.emit(ev);
      return;
    }
    this.NewsDescription.emit(ev);
    return;
    // console.log(ev.target.textContent);
  }
}
