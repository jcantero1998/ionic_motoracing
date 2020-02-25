import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MotodbService } from '../core/motodb.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { IMoto } from '../share/interfaces';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  moto: IMoto;
  motoForm: FormGroup;
  motoNombre: string;
  motoCiudad: string;
  motoImage:string;
  motoCapacidad:number;
  motoEstrellas:number;
  motoPrecio:number;

  constructor(private router: Router,
    private motodb: MotodbService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.motoForm = new FormGroup({
      modelo: new FormControl(''),
      tipo: new FormControl(''),
      imagen: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar Moto',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'save',
          text: 'ACEPTAR',
          handler: () => {
            this.saveMoto();
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
  saveMoto() {
    this.moto = this.motoForm.value;
    let record = {};
    record['modelo'] = this.moto.modelo;
    record['tipo'] = this.moto.tipo;
    record['descripcion'] = this.moto.descripcion;
    record['image'] = this.moto.imagen;
    record['precio'] = this.moto.precio;
    this.motodb.create_Moto(record).then(resp => {
      console.log(resp);
    })
      .catch(error => {
        console.log(error);
      });
  }
}


