import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';

import { MotoService } from '../shared/moto.service';
import { Moto } from '../shared/moto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  pageTitle = 'moto Edit';
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
    this.prodId = parseInt(this.activatedroute.snapshot.params['id']);
    this.getmoto(this.prodId);
  }

  getmoto(id: number): void {
    this.motoService.getMotoById(id)
      .subscribe(
        (moto: Moto) => this.displaymoto(moto),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displaymoto(moto: Moto): void {
    if (this.motoForm) {
      this.motoForm.reset();
    }
    this.moto = moto;
    this.pageTitle = `Edit moto: ${this.moto.model}`;

    // Update the data on the form
    this.motoForm.patchValue({
      model: this.moto.model,
      price: this.moto.price,
      rating: this.moto.rating,
      description: this.moto.description,
      shortDescription: this.moto.shortDescription,
      type: this.moto.type,
      image: this.moto.image
    });
  }

  deleteMoto(): void {
    if (this.moto.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the moto: ${this.moto.model}?`)) {
        this.motoService.deleteMoto(this.moto.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }


  savemoto(): void {
    if (this.motoForm.valid) {
      if (this.motoForm.dirty) {
        this.moto = this.motoForm.value;
        this.moto.id = this.prodId;
        
        this.motoService.updateMoto(this.moto)
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
