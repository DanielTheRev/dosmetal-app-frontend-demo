import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tools-manager-header',
  templateUrl: './tools-manager-header.component.html',
  styleUrls: ['./tools-manager-header.component.scss'],
})
export class ToolsManagerHeaderComponent implements OnInit {
  @Input() public HeaderTitle: string = '';
  @Output() public SearchKey = new EventEmitter<{ keyword: string }>();
  SearchForm: FormGroup;

  constructor(private FormBuilder: FormBuilder, private Router: Router) {
    this.SearchForm = this.FormBuilder.group({
      keyword: ['', [Validators.minLength(1), Validators.required]],
    });
  }

  ngOnInit(): void {
    this.SearchForm.valueChanges.subscribe((values) => {
      if (values.keyword.length > 0) {
        this.SearchKey.emit(values);
      }
    });
  }

  AddNewTool() {
    this.Router.navigate(['stock','Gestionar-Herramientas','agregar-herramienta']);
  }
}
