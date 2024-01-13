import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { InventoryNotificationService } from '../../services/inventoryNotification.service';
import { ITool } from '../../pages/tools-manager-page/interfaces/tool.interface';
import { ToolStoreService } from '../../services/tools.store.service';
import { ActivatedRoute } from '@angular/router';
import { HeadService } from '../../../../shared/services/Head.service';

@Component({
  selector: 'app-add-tool',
  templateUrl: './add-tool.component.html',
  styleUrls: ['./add-tool.component.scss'],
})
export class AddToolComponent implements OnInit {
  Form: FormGroup;

  FileImg: File | undefined;
  haveImg = {
    exist: false,
    link: '',
  };
  isNewTool: boolean = true;
  isSubmitting = false;
  @ViewChild('img') ImgElement!: ElementRef<HTMLImageElement>;
  @ViewChild('inputImg') inputImg!: ElementRef<HTMLInputElement>;
  constructor(
    private FormBuilder: FormBuilder,
    private Location: Location,
    private ToolStore: ToolStoreService,
    private InventoryNotifications: InventoryNotificationService,
    private ActivatedRoute: ActivatedRoute,
    private HeadServide: HeadService
  ) {
    this.HeadServide.setTitle('Nueva Herramienta');
    this.Form = this.FormBuilder.group({
      Nombre: ['', Validators.required],
      Marca: [''],
      Stock: this.FormBuilder.array(
        [],
        [Validators.minLength(1), Validators.required]
      ),
    });
  }

  ngOnInit(): void {
    const id = this.ActivatedRoute.snapshot.params['_id'];
    if (id) {
      this.isNewTool = false;
      this.HeadServide.setTitle('Editar Herramienta');
      this.ToolStore.getTool(id).subscribe({
        next: (tool) => {
          this.haveImg = {
            exist: true,
            link: tool.imgRef.secure_url,
          };
          this.Form.reset({
            Nombre: tool.Nombre,
            Marca: tool.Marca,
          });
          tool.Stock.forEach((stock) => {
            this.getStock().push(
              this.FormBuilder.group({
                Fecha_Compra: stock.Fecha_Compra,
                Cantidad: stock.Cantidad,
                Estado: stock.Estado,
                Ubicacion: stock.Ubicacion,
              })
            );
          });
        },
      });
      return;
    }
    this.getStock().push(
      this.FormBuilder.group({
        Fecha_Compra: [''],
        Cantidad: [, Validators.required],
        Estado: [, Validators.required],
        Ubicacion: [, Validators.required],
      })
    );
    return;
  }

  getStock() {
    return this.Form.controls['Stock'] as FormArray;
  }

  addStock() {
    this.getStock().push(
      this.FormBuilder.group({
        Fecha_Compra: [''],
        Cantidad: [, Validators.required],
        Estado: [, Validators.required],
        Ubicacion: [, Validators.required],
      })
    );
    return;
  }

  RemoveStock(idx: number) {
    this.getStock().removeAt(idx);

    return;
  }

  loadImage(event: ClipboardEvent) {
    try {
      if (!event.clipboardData) return;

      const file = event.clipboardData.files[0];
      if (!file.type.startsWith('image'))
        return console.log('No es una imagen valida');

      const blobURL = window.URL.createObjectURL(event.clipboardData.files[0]);
      this.ImgElement.nativeElement.setAttribute('src', blobURL);
      this.FileImg = event.clipboardData.files[0];
      this.inputImg.nativeElement.files = event.clipboardData.files;
      this.InventoryNotifications.toastNotification(
        'info',
        'Imagen cargada correctamente'
      );
    } catch (error) {}
  }

  handleInputImg(ev: any) {
    const files = ev.target.files as FileList;
    if (!files[0].type.startsWith('image'))
      return console.log('No es una imagen valida');

    const blobURL = window.URL.createObjectURL(files[0]);
    this.ImgElement.nativeElement.setAttribute('src', blobURL);
    this.FileImg = files[0];
    this.InventoryNotifications.toastNotification(
      'info',
      'Imagen cargada correctamente'
    );
  }

  goBack() {
    this.Location.back();
    return;
  }

  getFormValues() {
    if (this.Form.invalid) return;
    let data: { Data: ITool; imgFile: File | undefined } = {
      Data: this.Form.value,
      imgFile: this.FileImg,
    };
    this.isSubmitting = true;

    if (this.isNewTool) {
      this.ToolStore.addNewTool(data)
        .then((res) => {
          this.goBack();
          this.isSubmitting = false;
        })
        .catch((err) => {
          this.isSubmitting = false;
        });
      return;
    }

    const id = this.ActivatedRoute.snapshot.params['_id'];
    data.Data._id = id;
    this.ToolStore.updateTool(data)
      .then((res) => {
        this.goBack();
        this.isSubmitting = false;
      })
      .catch((err) => {
        this.isSubmitting = false;
      });
  }
}
