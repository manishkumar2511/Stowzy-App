import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FileUploadComponent } from "../../../../../../_common/file-upload/file-upload.component";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-step-three',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CdkStepperModule, FileUploadComponent],
  templateUrl: './step-three.component.html',
  styleUrl: './step-three.component.css',
})
export class StepThreeComponent {
  public stepThreeForm!: FormGroup;
  state: string = '';
  
  StowzyImages: File[] = [];
  DocumentIdProof: File[] = [];

  proofOfIdentityOptions = [
    { id: 1, value: 'Aadhaar Card (India-specific)', label: "Aadhaar Card (India-specific)" },
    { id: 2, value: 'Passport', label: "Passport" },
    { id: 3, value: "Driver's License", label: "Driver's License" },
    { id: 4, value: 'National ID Card', label: "National ID Card" },
  ];

  constructor(private fb: FormBuilder) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.stepThreeForm = this.fb.group({
      ProofOfIdentity: ['', Validators.required],
      DocumentIdProof: ['', Validators.required],
      StowzyImages: ['', Validators.required],
    })
  }

  uploadDocumentProof(files: File[]): void {
    this.DocumentIdProof = files;
    if (this.DocumentIdProof.length > 0) {
      this.stepThreeForm.controls['DocumentIdProof'].setValue(files);
      this.stepThreeForm.controls['DocumentIdProof'].setErrors(null);
    } else {
      this.stepThreeForm.controls['DocumentIdProof'].setErrors({ required: true });
    }
  }

  handleStowzyImages(files: File[]): void {
    this.StowzyImages = files;
    if (this.StowzyImages.length > 0) {
      this.stepThreeForm.controls['StowzyImages'].setValue(files);
      this.stepThreeForm.controls['StowzyImages'].setErrors(null);
    } else {
      this.stepThreeForm.controls['StowzyImages'].setErrors({ required: true });
    }
  }

  stepThreeSubmit() {
    this.state = 'done';
    console.log(this.stepThreeForm.value);
  }
}
