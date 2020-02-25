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
  public moto: IMoto;
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private MotodbService: MotodbService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.MotodbService.getItem(this.id).then(
      (data: IMoto) => this.moto = data
    );
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
            this.MotodbService.remove(id);
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