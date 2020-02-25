import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MotodbService } from '../core/motodb.service';
import { IMoto } from '../share/interfaces';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

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

  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private motodbService: MotodbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.retrieveValues();
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

  editRecord(moto) {
    this.router.navigate(['edit', moto.id])
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
