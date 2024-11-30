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
import { RoomOwnerService } from '../../../../../../_services/room-owner.service';

@Component({
  selector: 'app-step-one',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CdkStepperModule],
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.css'],
})
export class StepOneComponent implements OnInit {
  ProfileImage: string = '/assets/images/login-user/login-user-1.jpg';
  public stepOneForm!: FormGroup;
  public countries: any[] = [];
  public states: any[] = [];
  public cities: any[] = [];
  private formData = new FormData();

  constructor(
    private _fb: FormBuilder,
    private _apiService: ApiService,
    private _roomOwnerService: RoomOwnerService) {
    this.initializeForm();
  }

  ngOnInit() {
    this.loadCountries();
  }

  private initializeForm(): void {
    this.stepOneForm = this._fb.group({
      Title: ['', Validators.required],
      FirstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern(/^[a-zA-Z]*$/)]],
      LastName: [''],
      DateOfBirth: ['', [Validators.required, this._apiService.dateOfBirthValidator()]],
      Gender: ['', Validators.required],
      PhoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]],
      SecondryNumber: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[0-9]*$/)]],
      Email: ['', [Validators.required, Validators.email, this._apiService.emailValidator()]],
      StreetAddress: ['', Validators.required],
      Landmark: [''],
      Country: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required],
      PostalCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/^[0-9]*$/)]],
      //UploadedFile: [null],
      ProfileImage: ['']
    });
  }

  getFormData() {
    if(this.stepOneForm.valid){
      Object.keys(this.stepOneForm.controls).forEach((key) => {
        const value = this.stepOneForm.get(key)?.value;
        if (value !== null && value !== undefined) {
          this.formData.append(key, value);
        }
      });
    }
  }

  loadCountries() {
    this._apiService.getCountries().subscribe({
      next: (country) => {
        if (country.length == 0) return
        this.countries = country.geonames
      }
    });
  }

  loadStates(event: Event) {
    const countryCode = (event.target as HTMLSelectElement).value;
    const country = this.countries.find(x => x.countryCode === countryCode);
    if (country.length == 0) return
    this._apiService.getStates(country.geonameId).subscribe({
      next: (states) => {
        if (states && states.geonames) {
          this.states = states.geonames;
          this.cities = [];
        }
      },
      error: (error) => console.error("Error fetching states:", error)
    });
  }

  loadCities(event: Event) {
    const name = (event.target as HTMLSelectElement).value;
    const state = this.states.find(x => x.name === name);
    this._apiService.getDistricts(state.geonameId).subscribe({
      next: (districts) => {
        if (districts && districts.geonames) {
          this.cities = districts.geonames;
        }
      },
      error: (error) => console.error("Error fetching districts:", error)
    });
  }

  triggerFileInput(event: Event): void {
    event.preventDefault();
    const fileInput = document.querySelector('input[type="file"]') as HTMLElement;
    fileInput?.click();
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      debugger
      const file = input.files[0];
      this.stepOneForm.controls['ProfileImage'].setValue(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = () => {
          this.ProfileImage = reader.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Please select a valid image file (jpg/png).');
      }
    }
  }

  onDeleteClick(event: Event): void {
    this.ProfileImage = '';
    this.stepOneForm.controls['ProfileImage'].setValue(null);
  }

  stepOneSubmit(): void {
    if (this.stepOneForm.valid) {
      debugger
      const formData = this.stepOneForm.value;
      this._roomOwnerService.roomOwnerRegistration(formData).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
        },
        error: (error) => {
          console.error('Registration failed:', error);
        }
      });

      debugger;
    } else {
      console.warn('Form is invalid. Please check the fields.');
    }
  }
}
