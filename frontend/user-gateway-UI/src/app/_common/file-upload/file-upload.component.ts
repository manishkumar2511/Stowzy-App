import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {

  @Output() uploadedFiles = new EventEmitter<File[]>();
  @Input() selectionMode: 'single' | 'multiple' = 'multiple';
  @Input() isPreview: boolean = false;

  singleFilePreview: string | null = null;
  multipleFilePreviews: string[] = [];
  uploadedFilesList: File[] = [];

  handleSingleFileUpload(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files?.[0]) {
      const file = fileInput.files[0];
      this.uploadedFilesList = [];
      this.uploadedFilesList.push(file);
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.singleFilePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
      this.uploadedFiles.emit(this.uploadedFilesList);
    }
  }

  handleMultipleFileUpload(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files) {
      const newFiles = Array.from(fileInput.files);
      this.uploadedFilesList = [...this.uploadedFilesList, ...newFiles];
      newFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.multipleFilePreviews.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        this.uploadedFiles.emit(this.uploadedFilesList);
      });
      fileInput.value = '';
    }
  }

  removeFile(index: number): void {
    this.multipleFilePreviews.splice(index, 1);
    this.uploadedFilesList.splice(index, 1);
    this.uploadedFiles.emit(this.uploadedFilesList);
  }

  removeSingleFile(): void {
    this.singleFilePreview = null;
    this.uploadedFilesList = [];
    this.uploadedFiles.emit(this.uploadedFilesList);
  }
}
