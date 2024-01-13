import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class HeadService {
  constructor(private Title: Title) {}

  setTitle(newTitle: string) {
    this.Title.setTitle(newTitle);
  }
}
