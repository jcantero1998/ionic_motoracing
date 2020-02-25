import { Component, OnInit } from '@angular/core';
import { MotoService } from '../shared/moto.service';
import { Moto } from '../shared/moto';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  moto: Moto;

  motos: Moto[]=[];
  constructor(
    private motoService: MotoService,
    private router: Router
    ) { }

  ngOnInit() {
   this.motoService.getMotos().subscribe(
    (data: Moto[]) => this.motos = data
   );
  }

  motoTapped(moto){
    //this.router.navigate(['/products', this.moto.id, 'edit']);
    this.router.navigate(['/details/', moto.id])
  }
}