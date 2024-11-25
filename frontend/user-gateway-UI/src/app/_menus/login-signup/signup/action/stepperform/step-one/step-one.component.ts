import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../../_services/api.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CdkStepperModule],
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
})
export class StepOneComponent implements OnInit {
  public stepOneForm!: FormGroup;
  public countries: any[] = [];
  public states: any[] = [];
  public cities: any[] = [];

  constructor(private _fb: FormBuilder, private _apiService: ApiService) {
    this.initializeForm();
  }

  ngOnInit() {
  }

  private initializeForm(): void {
    this.stepOneForm = this._fb.group({
      Title: ['', Validators.required],
      FirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]*$/)]],
      LastName: [''],
      DateOfBirth: ['', Validators.required],
      Gender: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]],
      SecondryNumber: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]],
      Email: ['', [Validators.required, Validators.email, this._apiService.emailValidator()]],

    });
  }

  stepOneSubmit(): void {
    if (this.stepOneForm.valid) {
      console.log(this.stepOneForm.value);
    }
  }
}
