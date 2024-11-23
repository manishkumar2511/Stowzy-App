import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-four',
  standalone: true,
  imports: [ReactiveFormsModule, CdkStepperModule],
  templateUrl: './step-four.component.html',
  styleUrl: './step-four.component.css',
})
export class StepFourComponent {
  public stepFourForm: FormGroup;
  state: string = '';

  constructor(private fb: FormBuilder) {
    this.stepFourForm = this.fb.group({
      phoneNumber: this.fb.control(''),
      email: this.fb.control(''),
    });
  }

  ngOnInit(): void {}

  stepFourSubmit() {
    this.state = 'done';
  }
}
