import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Moto } from '../shared/moto';
import { ActivatedRoute, Router } from '@angular/router';
import { MotoService } from '../shared/moto.service';

@Component({
  selector: 'app-moto-new',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  pageTitle = 'Moto New';
  errorMessage: string;
  motoForm: FormGroup;

  prodId:number;
  moto: Moto;

  constructor(private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private motoService: MotoService) {  }

  ngOnInit(): void {
    this.motoForm = this.fb.group({
      model: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      type: '',
      rating: '',
      price: '',
      description: '',
      shortDescription: '',
      image: ''
    });

    // Read the moto Id from the route parameter
    this.prodId = parseInt(this.activatedroute.snapshot.params['motoId']);
  }

  saveMoto(): void {
    if (this.motoForm.valid) {
      if (this.motoForm.dirty) {
        this.moto = this.motoForm.value;
        this.moto.id = this.prodId;
        
        this.motoService.createMoto(this.moto)
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
  
}