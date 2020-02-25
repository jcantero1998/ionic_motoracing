import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MotodbService } from '../core/motodb.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IMoto } from '../share/interfaces';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  id: string;
  public motos: IMoto[];
  moto: IMoto = {
    id: undefined,
    modelo: undefined,
    tipo: undefined,
    descripcion: undefined,
    precio: undefined,
    imagen: undefined
  }
  motoForm: FormGroup;

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private motodbService: MotodbService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.retrieveValues();
    this.motoForm = new FormGroup({
      modelo: new FormControl(''),
      tipo: new FormControl(''),
      imagen: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl(''),
    });

  }

  ionViewDidEnter() {
    // Remove elements if it already has values
    this.retrieveValues();
  }

  retrieveValues() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.motodbService.read_Motos().subscribe(data => {
      this.motos = data.map(e => {
        if (this.id == e.payload.doc.id) {
          this.id = e.payload.doc.id;
          this.moto.id = e.payload.doc.id;
          this.moto.modelo = e.payload.doc.data()['modelo'];
          this.moto.descripcion = e.payload.doc.data()['descripcion'];
          this.moto.tipo = e.payload.doc.data()['tipo'];
          this.moto.imagen= e.payload.doc.data()['image'];
          this.moto.precio = e.payload.doc.data()['precio'];
          this.displayProduct(this.moto);
          return {
            id: e.payload.doc.id,
            isEdit: false,
            modelo: e.payload.doc.data()['modelo'],
            descripcion: e.payload.doc.data()['descripcion'],
            tipo: e.payload.doc.data()['tipo'],
            imagen: e.payload.doc.data()['image'],
            precio: e.payload.doc.data()['precio'],
          };
        }

      })
      console.log(this.moto);
    });
  }

  displayProduct(moto: IMoto): void {
    if (this.motoForm) {
      this.motoForm.reset();
    }

    // Update the data on the form
    this.motoForm.patchValue({
      modelo: this.moto.modelo,
      tipo: this.moto.tipo,
      imagen: this.moto.imagen,
      descripcion: this.moto.descripcion,
      precio: this.moto.precio
    });
  }

  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Editar Moto',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'create',
          text: 'ACEPTAR',
          handler: () => {
            this.editMoto();
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }


  editMoto() {
    this.moto = this.motoForm.value;
    let record = {};
    record['modelo'] = this.moto.modelo;
    record['descripcion'] = this.moto.descripcion;
    record['tipo'] = this.moto.tipo;
    record['image'] = this.moto.imagen;
    record['precio'] = this.moto.precio;
    this.motodbService.update_Moto(this.id, this.moto);
  }
  async removeRecord(id) {
    const toast = await this.toastController.create({
      header: 'Elimiar moto',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'delete',
          text: 'ACEPTAR',
          handler: () => {
            this.motodbService.delete_Moto(id);
            this.router.navigate(['home']);
          }
        }, {
          text: 'CANCELAR',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }
}
