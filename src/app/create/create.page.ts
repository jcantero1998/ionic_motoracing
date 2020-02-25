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
  constructor(
    private router: Router,
    private MotodbService: MotodbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.motoForm = new FormGroup({
      model: new FormControl(''),
      type: new FormControl(''),
      price: new FormControl(''),
      cover: new FormControl(''),
      description: new FormControl(''),
    });
  }
  async onSubmit() {
    const toast = await this.toastController.create({
      header: 'Guardar película',
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
    let nextKey = this.moto.model.trim();
    this.moto.id = nextKey;
    this.MotodbService.setItem(nextKey, this.moto);
    console.warn(this.motoForm.value);
  }
}