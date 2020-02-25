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

  id: number;
  public moto: IMoto;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private motodbService: MotodbService,
    public toastController: ToastController
  ) { }

  ngOnInit() {
    this.id = parseInt(this.activatedroute.snapshot.params['id']);
    this.motodbService.getMotoById(this.id).subscribe(
      (data: IMoto) => this.moto = data
    );
  }

  editRecord(moto) {
    this.router.navigate(['edit', moto.id])
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.router.navigate(['']);
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
            this.motodbService.deleteMoto(id).subscribe(
              () => this.onSaveComplete(),
            );
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
