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
  haveValues: boolean = false;

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

  ionViewDidEnter(){
    if(this.motos !== undefined){
      this.motos.splice(0);
    }
    this.retrieveValues();
  }

  retrieveValues(){
    this.motodbService.getMotos().subscribe(
      (data: IMoto[]) => {
        this.haveValues = false;
        this.motos = data;
        this.haveValues = true;
      });
  }

  async motoTapped(moto) {
    this.route.navigate(['details', moto.id]);
  }
}


