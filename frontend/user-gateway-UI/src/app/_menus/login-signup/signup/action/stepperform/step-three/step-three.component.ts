import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, CdkStepperModule],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.css',
})
export class StepThreeComponent implements OnInit {
  public stepThreeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.stepThreeForm = this.fb.group({
      cardNumber: this.fb.control('', Validators.required)
    });
  }

  ngOnInit(): void {
  }

  stepThreeSubmit() {
  }
}
