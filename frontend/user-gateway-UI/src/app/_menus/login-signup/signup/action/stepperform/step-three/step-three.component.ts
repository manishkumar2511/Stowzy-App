import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FileUploadComponent } from "../../../../../../_common/file-upload/file-upload.component";
import { StowzyDocuments } from '../../../../../../_model/RoomOwner/business-documents';
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
  @Output() stepThreeSubmitted = new EventEmitter<StowzyDocuments>();

  public stepThreeForm!: FormGroup;
  state: string = '';
  StowzyImages: File[] = [];
  IdentityProofDocument: File[] = [];

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
      IdentityProofType: ['', Validators.required],
      IdentityProofDocument: ['', Validators.required],
      StowzyImages: ['', Validators.required],
    })
  }

  uploadDocumentProof(files: File[]): void {
    this.IdentityProofDocument = files;
    if (this.IdentityProofDocument.length > 0) {
      this.stepThreeForm.controls['IdentityProofDocument'].setValue(files);
      this.stepThreeForm.controls['IdentityProofDocument'].setErrors(null);
    } else {
      this.stepThreeForm.controls['IdentityProofDocument'].setErrors({ required: true });
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
    if (this.stepThreeForm.valid) {
      this.state = 'done';
      const formData = this.stepThreeForm.value;
      this.stepThreeSubmitted.emit(formData);
    }
  }
}
