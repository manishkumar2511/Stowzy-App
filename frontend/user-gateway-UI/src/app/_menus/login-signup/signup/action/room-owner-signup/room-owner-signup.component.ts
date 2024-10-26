import { Component } from '@angular/core';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { StepOneComponent } from '../stepperform/step-one/step-one.component';
import { StepTwoComponent } from '../stepperform/step-two/step-two.component';
import { StepThreeComponent } from '../stepperform/step-three/step-three.component';
import { StepFourComponent } from '../stepperform/step-four/step-four.component';

@Component({
  selector: 'app-room-owner-signup',
  standalone: true,
  imports: [
    CdkStepperModule,
    NgStepperModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent
  ],
  templateUrl: './room-owner-signup.component.html',
  styleUrl: './room-owner-signup.component.css',
})
export class RoomOwnerSignupComponent {}
