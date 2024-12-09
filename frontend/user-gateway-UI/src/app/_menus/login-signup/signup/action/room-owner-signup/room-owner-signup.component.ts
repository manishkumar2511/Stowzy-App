import { Component } from '@angular/core';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { NgStepperModule } from 'angular-ng-stepper';
import { StepOneComponent } from '../stepperform/step-one/step-one.component';
import { StepTwoComponent } from '../stepperform/step-two/step-two.component';
import { StepThreeComponent } from '../stepperform/step-three/step-three.component';
import { RoomOwner } from '../../../../../_model/RoomOwner/room-owner';
import { Room } from '../../../../../_model/RoomOwner/room';
import { StowzyDocuments } from '../../../../../_model/RoomOwner/business-documents';
import { RoomOwnerService } from '../../../../../_services/room-owner.service';
import { RoomOwnerRegistration } from '../../../../../_model/RoomOwner/room-details';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-room-owner-signup',
  standalone: true,
  imports: [
    CdkStepperModule,
    NgStepperModule,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent
  ],
  templateUrl: './room-owner-signup.component.html',
  styleUrl: './room-owner-signup.component.css',
})
export class RoomOwnerSignupComponent {
  private roomOwnerRegistration: RoomOwnerRegistration = {
    roomOwner: {} as RoomOwner,
    room: {} as Room,
    stowzyDocuments: {} as StowzyDocuments
  };

  constructor(private http: HttpClient, private _roomOwnerService: RoomOwnerService) { }

  onStepOneSubmit(stepOneData: RoomOwner): void {
    this.roomOwnerRegistration.roomOwner = stepOneData;
  }

  onStepTwoSubmit(stepTwoData: Room): void {
    this.roomOwnerRegistration.room = stepTwoData;
  }

  onStepThreeSubmit(stepThreeData: StowzyDocuments): void {
    this.roomOwnerRegistration.stowzyDocuments = stepThreeData;
    this.onFinalSubmit();
  }

  // onFinalSubmit(): void {
  //   debugger
  //   this._roomOwnerService.roomOwnerRegistration(this.roomOwnerRegistration).subscribe({
  //     next: (response) => {
  //       console.log('Registration successful:', response);
  //     },
  //     error: (error) => {
  //       console.error('Registration failed:', error);
  //     }
  //   });
  // }

  onFinalSubmit(): void {
    const formData = new FormData();
  
    // Append RoomOwner details
    Object.keys(this.roomOwnerRegistration.roomOwner).forEach((key) => {
      formData.append(`roomOwner.${key}`, (this.roomOwnerRegistration.roomOwner as any)[key]);
    });
  
    // Append Room details
    Object.keys(this.roomOwnerRegistration.room).forEach((key) => {
      formData.append(`room.${key}`, (this.roomOwnerRegistration.room as any)[key]);
    });
  
    // Append StowzyDocuments details
    Object.keys(this.roomOwnerRegistration.stowzyDocuments).forEach((key) => {
      const value = (this.roomOwnerRegistration.stowzyDocuments as any)[key];
      if (key === 'StowzyImages' && Array.isArray(value)) {
        value.forEach((file: File, index: number) => {
          formData.append(`stowzyDocuments.StowzyImages[${index}]`, file);
        });
      } else if (key === 'IdentityProofDocument' && value instanceof File) {
        formData.append(`stowzyDocuments.IdentityProofDocument`, value);
      } else {
        formData.append(`stowzyDocuments.${key}`, value);
      }
    });
  
    this._roomOwnerService.roomOwnerRegistration(formData).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
      },
      error: (error) => {
        console.error('Registration failed:', error);
      },
    });
  }
  
}