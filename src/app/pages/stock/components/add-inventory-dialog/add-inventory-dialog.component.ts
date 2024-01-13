import { Location } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { InventoryStoreService } from '../../services/inventory.state.service';
import { InventoryNotificationService } from '../../services/inventoryNotification.service';
import { environment } from '../../../../../environments/environment';
import { IInventoryItem } from '../../interfaces/stock.interface';

@Component({
  selector: 'app-add-inventory-dialog',
  templateUrl: './add-inventory-dialog.component.html',
  styleUrls: ['./add-inventory-dialog.component.scss'],
})
export class AddInventoryDialogComponent implements OnInit {
  Stock: IInventoryItem[] = [];

  form: FormGroup;
  imgFile: File | undefined = undefined;
  isNewInventory: boolean = true;
  title: string = 'Nuevo inventario';
  @ViewChild('ImgElement') ImgElement!: ElementRef<HTMLImageElement>;
  availableCategories: { rubro: string; letra: string }[] = [
    { rubro: 'Construccion', letra: 'A' },
    { rubro: 'Herramienta', letra: 'B' },
    { rubro: 'Selladores', letra: 'C' },
    { rubro: 'Pintureria', letra: 'D' },
    { rubro: 'Seguridad', letra: 'E' },
    { rubro: 'Iluminacion', letra: 'F' },
    { rubro: 'Libreria', letra: 'G' },
    { rubro: 'Electricidad', letra: 'H' },
    { rubro: 'Sanitario', letra: 'I' },
    { rubro: 'Vestuario', letra: 'J' },
    { rubro: 'Ferreteria', letra: 'K' },
    { rubro: 'Silicona', letra: 'L' },
    { rubro: 'Sin categoria', letra: 'M' },
  ];
  Environment = environment;
  haveImg = {
    exist: false,
    link: '',
  };

  loading = false;
  constructor(
    private FormBuilder: FormBuilder,
    private InventoryService: InventoryService,
    private InventoryStore: InventoryStoreService,
    private InventoryNotifications: InventoryNotificationService,
    public ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private Location: Location
  ) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
    this.loading = true;
    const itemID = this.ActivatedRoute.snapshot.params['_id'];
    if (itemID) {
      this.InventoryStore.getIventoryItem(itemID).subscribe({
        next: (item) => {
          if (item) {
            this.form.reset({
              Categoria: item.Categoria,
              Nombre: item.Nombre,
              Ubicacion: item.Ubicacion,
              ImgRef: item.ImgRef ? item.ImgRef : '',
              Inventario: item.Inventario,
              Cant_poco_stock: item.Cant_poco_stock,
            });
            this.isNewInventory = false;
            this.title = 'Modificar inventario';
            this.Stock = [...item.Inventario];
            this.haveImg = {
              exist: true,
              link: item.ImgRef ? item.ImgRef.secure_url : '',
            };
            this.loading = false;
          }
        },
      });
      return;
    }
    this.loading = false;
  }

  loadItems(data: { newStock: IInventoryItem[] }) {
    this.Stock = data.newStock;
  }

  loadImg(e: ClipboardEvent) {
    try {
      if (!e.clipboardData) return;

      const file = e.clipboardData.files[0];
      if(!file) return;
      if (!file.type.startsWith('image'))
        return console.log('No es una imagen valida');

      const blobURL = window.URL.createObjectURL(e.clipboardData.files[0]);
      this.ImgElement.nativeElement.setAttribute('src', blobURL);
      this.imgFile = e.clipboardData.files[0];
      this.InventoryNotifications.toastNotification(
        'info',
        'Imagen cargada correctamente'
      );
    } catch (error) {
      console.log(error);
    }
  }

  handleInputImg(ev: any) {
    const files = ev.target.files as FileList;
    if (!files[0].type.startsWith('image'))
      return console.log('No es una imagen valida');

    const blobURL = window.URL.createObjectURL(files[0]);
    this.ImgElement.nativeElement.setAttribute('src', blobURL);
    this.imgFile = files[0];
    this.InventoryNotifications.toastNotification(
      'info',
      'Imagen cargada correctamente'
    );
  }

  createForm(): FormGroup {
    return this.FormBuilder.group({
      Categoria: ['', Validators.required],
      Nombre: ['', Validators.required],
      Ubicacion: ['', Validators.required],
      ImgRef: [''],
      Cant_poco_stock: [0, [Validators.required, Validators.min(1)]],
    });
  }

  goBack() {
    this.Router.navigate(['stock', 'GestionInventario']);
    return;
  }

  submitData() {
    if (this.form.invalid) return console.log('Formulario no valido');
    let TotalInventario = 0;
    const formValues = this.form.value;
    let InventoryState = '';
    formValues.Inventario = this.Stock;

    formValues.Inventario.forEach((inventory: any) => {
      if (inventory.tipo_contenedor === 'Unidades sueltas') {
        TotalInventario += inventory.unidades_en_contenedor;
      } else {
        const cuenta =
          inventory.unidades_en_contenedor * inventory.cantidad_de_contenedor;
        TotalInventario += cuenta;
      }
    });

    switch (true) {
      case TotalInventario <= formValues.Cant_poco_stock && TotalInventario > 0:
        InventoryState = 'Poco Stock';
        break;
      case TotalInventario === 0:
        InventoryState = 'Sin Stock';
        break;
      default:
        InventoryState = 'Stock Suficiente';
        break;
    }
    //* No es un nuevo item
    if (!this.isNewInventory) {
      const updatedItem = {
        _id: this.ActivatedRoute.snapshot.params['_id'],

        ...formValues,
      };

      this.InventoryService.editInventory(
        { TotalInventario, InventoryState, ...updatedItem },
        this.imgFile!
      ).subscribe({
        next: (res) => {
          console.log(res);
          this.InventoryStore.addStockToInventoryOrEdit(
            res.item._id!,
            res.item
          ).then((e) => {
            this.InventoryNotifications.toastNotification(
              'success',
              res.message
            );
            this.goBack();
          });
        },
        error: (err) => {
          this.InventoryNotifications.toastNotification(
            'error',
            err.error.message
          );
        },
      });
      return;
    }
    //* Es un nuevo item
    this.InventoryService.addNewInventory(
      { TotalInventario, InventoryState, ...formValues },
      this.imgFile!
    ).subscribe((res) => {
      this.InventoryStore.addInventory(res.item);
      this.InventoryNotifications.toastNotification('success', res.message);
      this.goBack();
    });
  }
}
