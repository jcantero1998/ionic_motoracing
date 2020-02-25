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

  id: number;
  public moto: IMoto;
  motoForm: FormGroup;
  errorMessage: string;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private motodbService: MotodbService,
    public toastController: ToastController) { }

  ngOnInit() {
    this.motoForm = new FormGroup({
      modelo: new FormControl(''),
      tipo: new FormControl(''),
      imagen: new FormControl(''),
      descripcion: new FormControl(''),
      precio: new FormControl(''),
    });
    this.id = parseInt(this.activatedroute.snapshot.params['id']);
    this.getMoto(this.id);

  }

  getMoto(id: number): void {
    this.motodbService.getMotoById(id)
      .subscribe(
        (moto: IMoto) => this.displayMoto(moto),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayMoto(moto: IMoto): void {
    if (this.motoForm) {
      this.motoForm.reset();
    }
    this.moto = moto;

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
    if (this.motoForm.valid) {
      if (this.motoForm.dirty) {
        this.moto = this.motoForm.value;
        this.moto.id = this.id;

        this.motodbService.updateMoto(this.moto)
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
    // Reset the form to clear the flags
    this.motoForm.reset();
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
              (error: any) => this.errorMessage = <any>error
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
