import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MotodbService } from '../core/motodb.service';
import { Router, ActivatedRoute } from '@angular/router';
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
  errorMessage: string;
  id:number;

  constructor(private router: Router,
    private motodbService: MotodbService,
    private activatedroute: ActivatedRoute,
    public toastController: ToastController) { }

  ngOnInit() {
    this.motoForm = new FormGroup({
      modelo: new FormControl(''),
      tipo: new FormControl(''),
      imagen: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl(''),
    });
    this.id = parseInt(this.activatedroute.snapshot.params['productId']);
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
    if (this.motoForm.valid) {
      if (this.motoForm.dirty) {
        this.moto = this.motoForm.value;
        this.moto.id = this.id;
        
        this.motodbService.createMoto(this.moto)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
        
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    this.motoForm.reset();
    this.router.navigate(['']);
  }

  
}


