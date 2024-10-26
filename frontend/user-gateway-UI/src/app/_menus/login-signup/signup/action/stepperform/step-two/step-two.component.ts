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

declare function initializeSelectize(selectElementId: string, options: any[], formControl: any): void; // propertyType
declare function initializeMultipleSelectize(selectElementId: string, options: any[], formControl: any): void; //roomSize
declare function initializeSelectize(selectElementId: string, options: any[], formControl: any, onChangeCallback?: (value: string) => void): void; // country

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

  propertyTypeOption = [
    { propertyType: 'Room', value: 'Room', name: "Room" },
    { propertyType: 'Locker', value: 'Locker', name: "Locker" },
    { propertyType: 'Warehouse', value: 'Warehouse', name: "Warehouse" },
  ]

  roomSizeOptions = [
    { id: 1, title: 'Small' },
    { id: 2, title: 'Medium' },
    { id: 3, title: 'Large' },
    { id: 4, title: 'Extra Large' },
  ];

  securityMeasuresOptions = [
    { id: 1, title: 'CCTV Surveillance' },
    { id: 2, title: '24/7 Security Personnel' },
    { id: 3, title: 'Biometric Access' },
    { id: 4, title: 'Fire Safety System' },
    { id: 5, title: 'Secure Digital Locks' },
    { id: 6, title: 'Perimeter Fencing' },
    { id: 7, title: 'Intruder Alarm System' },
    { id: 8, title: 'Security Guard Patrol' },
    { id: 9, title: 'Motion Detection Sensors' },
    { id: 10, title: 'Gated Access' }
  ];

  constructor(private _fb: FormBuilder, private _apiService: ApiService) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadCountry();
    this.loadCountryInfo('IN');
  }

  private initializeForm(): void {
    this.stepTwoForm = this._fb.group({
      propertyName: ['', [Validators.required, Validators.maxLength(40)]],
      propertyType: ['', Validators.required],
      noOfRooms: ['', [Validators.required, Validators.min(1), Validators.max(99)]],
      roomSize: ['', Validators.required],
      securityMeasures: ['', Validators.required],
      streetAddress: ['', Validators.required],
      landmark: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],

      hourlyRentalPrice: ['', [Validators.required, Validators.min(1), Validators.max(99)]]
    });
  }

  stepTwoSubmit() {
    console.log(this.stepTwoForm.value);
  }

  ngAfterViewInit() {
    initializeSelectize('propertyType', this.propertyTypeOption, this.stepTwoForm.controls['propertyType']);
    initializeMultipleSelectize('roomSize', this.roomSizeOptions, this.stepTwoForm.controls['roomSize']);
    initializeMultipleSelectize('securityMeasures', this.securityMeasuresOptions, this.stepTwoForm.controls['securityMeasures']);

  }


  loadCountry() {
    this._apiService.getCountries().subscribe({
      next: (response) => {
        if (response && response.geonames && response.geonames.length > 0) {
          const countryOptions = response.geonames.map((country: any) => ({
            name: country.countryName,
            value: country.countryCode,
          }));
          initializeSelectize('country', countryOptions, this.stepTwoForm.controls['country'], (countryCode) => {
            this.loadCountryInfo(countryCode);
          });
        } else {
          console.error("No countries found in response.");
        }
      },
      error: (error) => console.error("Error fetching countries:", error),
    });
  }

  loadCountryInfo(countryCode: string = "IN") {
    this._apiService.getCountryInfo(countryCode).subscribe({
      next: (response) => {
        if (response.geonames && response.geonames.length > 0) {
          this.countryGeonameId = response.geonames[0].geonameId;
          this.loadStates(this.countryGeonameId);
          this.loadDistricts(countryCode);
        } else {
          console.error("Country information not found.");
        }
      },
      error: (error) => console.error("Error fetching country information:", error)
    });
  }

  loadStates(countryGeonameId: number = this.countryGeonameId) {
    this._apiService.getStates(countryGeonameId).subscribe({
      next: (states) => {
        if (states.length == 0) return
        const stateOptions = states.geonames.map((state: any) => ({
          name: state.name,
          value: state.name,
        }));
        initializeSelectize('state', stateOptions, this.stepTwoForm.controls['state'])
      },
      error: (error) => console.error("Error fetching states:", error)
    });
  }

  loadDistricts(countryCode: string = "IN") {
    this._apiService.getDistricts(countryCode).subscribe({
      next: (cities) => {
        if (cities.length == 0) return
        const cityOptions = cities.geonames.map((city: any) => ({
          name: city.name,
          value: city.name,
        }));
        initializeSelectize('city', cityOptions, this.stepTwoForm.controls['city'])
      },
      error: (error) => console.error("Error fetching districts:", error)
    });
  }
}