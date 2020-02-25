import { Component, OnInit } from '@angular/core';
import { IMoto } from '../share/interfaces';
import { MotodbService } from '../core/motodb.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public motos: IMoto[];

  constructor(private motodbService: MotodbService, private route:
    Router) { }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  }

  ngOnInit(): void {
    // If the database is empty set initial values
    this.retrieveValues();
  }
  ionViewDidEnter() {
    // Remove elements if it already has values
    this.retrieveValues();
  }
  retrieveValues() {
    this.motodbService.read_Motos().subscribe(data => {
      this.motos = data.map(e => {
        return {
          id: e.payload.doc.id,
          isEdit: false,
          modelo: e.payload.doc.data()['modelo'],
          descripcion: e.payload.doc.data()['descripcion'],
          tipo: e.payload.doc.data()['tipo'],
          imagen: e.payload.doc.data()['image'],
          precio: e.payload.doc.data()['precio'],
        };
      })
      console.log(this.motos);
    });

  }
  async motoTapped(moto) {
    this.route.navigate(['details', moto.id]);
  }
}


