import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoService } from '../shared/moto.service';
import { ToastController } from '@ionic/angular';
import { Moto } from '../shared/moto';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: number;
  public moto: Moto;
  constructor(
    private activatedrouter: ActivatedRoute,
    private router: Router,
    private MotoService: MotoService,
    public toastController: ToastController
  ) { }
  ngOnInit() {
    this.id = this.activatedrouter.snapshot.params.id;
    this.MotoService.getMotoById(this.id).subscribe(
      (data: Moto) => this.moto = data
    );
  }

  editRecord(id) {
    this.router.navigate(['/edit/', id])

  }
}