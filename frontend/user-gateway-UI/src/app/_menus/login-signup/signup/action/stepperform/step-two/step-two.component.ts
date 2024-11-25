import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../../../../../_services/api.service';


@Component({
  selector: 'app-step-two',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CdkStepperModule],
  templateUrl: './step-two.component.html',
  styleUrl: './step-two.component.css'
})
export class StepTwoComponent implements OnInit {
  public stepTwoForm!: FormGroup;
  public countryGeonameId: number = 1269750
  public countries: any[] = [];
  public states: any[] = [];
  public cities: any[] = [];
  selectedRoomSizes: string[] = [];
  selectedSecurityMeasures: string[] = [];


  roomSizeOptions = [
    { id: 1, value: 'Small', label: "Small" },
    { id: 2, value: 'Medium', label: "Medium" },
    { id: 3, value: 'Large', label: "Large" },
    { id: 4, value: 'Extra Large', label: "Extra Large" },
  ];

  securityMeasuresOptions = [
    { id: 1, value: 'CCTV Surveillance', label: 'CCTV Surveillance' },
    { id: 2, value: '24/7 Security Personnel', label: '24/7 Security Personnel' },
    { id: 3, value: 'Biometric Access', label: 'Biometric Access' },
    { id: 4, value: 'Fire Safety System', label: 'Fire Safety System' },
    { id: 5, value: 'Secure Digital Locks', label: 'Secure Digital Locks' },
    { id: 6, value: 'Perimeter Fencing', label: 'Perimeter Fencing' },
    { id: 7, value: 'Intruder Alarm System', label: 'Intruder Alarm System' },
    { id: 8, value: 'Security Guard Patrol', label: 'Security Guard Patrol' },
    { id: 9, value: 'Motion Detection Sensors', label: 'Motion Detection Sensors' },
    { id: 10, value: 'Gated Access', label: 'Gated Access' }
  ];


  constructor(private _fb: FormBuilder, private _apiService: ApiService) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  private initializeForm(): void {
    this.stepTwoForm = this._fb.group({
      BusinessName: ['', [Validators.required, Validators.maxLength(40)]],
      BusinessType: ['', Validators.required],
      NoOfRooms: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      RoomSize: ['', Validators.required],
      SecurityMeasures: ['', Validators.required],
      HourlyRentalPrice: ['', [Validators.required, Validators.min(1)]],
      StreetAddress: ['', Validators.required],
      Landmark: [''],
      Country: ['', Validators.required],
      State: ['', Validators.required],
      City: ['', Validators.required],
      PostalCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern(/^[0-9]*$/)]],
      CurrentLocation: ['', Validators.required]
    });
  }

  onRoomSizeChange(event: Event, option: { id: number; value: string; label: string }): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedRoomSizes.push(option.value);
    } else {
      this.selectedRoomSizes = this.selectedRoomSizes.filter(value => value !== option.value);
    }
    this.stepTwoForm.controls['RoomSize'].setValue(this.selectedRoomSizes.length > 0 ? this.selectedRoomSizes.join(', ') : null);
  }

  onSecurityMeasuresChange(event: Event, option: { id: number; value: string; label: string }): void {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedSecurityMeasures.push(option.value);
    } else {
      this.selectedSecurityMeasures = this.selectedSecurityMeasures.filter((value) => value !== option.value);
    }
    this.stepTwoForm.controls['SecurityMeasures'].setValue(this.selectedSecurityMeasures.length > 0 ? this.selectedSecurityMeasures.join(', ') : null);
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

  uploadCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.stepTwoForm.controls['CurrentLocation'].setValue(`${latitude},${longitude}`);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert('Permission denied for accessing location. Please enable it in your browser settings.');
              break;
            case error.POSITION_UNAVAILABLE:
              alert('Location information is unavailable. Try again later.');
              break;
            case error.TIMEOUT:
              alert('Request to get location timed out. Please try again.');
              break;
            default:
              alert('An unknown error occurred while retrieving location.');
          }
        }
      );
    } else {
      alert('Geolocation is not supported by your browser. Please use a supported browser.');
    }
  }

  stepTwoSubmit() {
    console.log(this.stepTwoForm.value);
  }
}