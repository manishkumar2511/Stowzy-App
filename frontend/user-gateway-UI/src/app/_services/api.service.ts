import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'http://api.geonames.org';
  private username = 'stowzy';

  constructor(private httpClient: HttpClient) { }

  emailValidator() {
    return (control: AbstractControl) => {
      const email = control.value;
      const allowedDomains = ['gmail.com', 'outlook.com', 'yopmail.com', 'yahoo.com'];
      if (email && email.includes('@')) {
        const domain = email.substring(email.lastIndexOf('@') + 1);
        const validDomain = allowedDomains.some(allowedDomain => {
          const regex = new RegExp(`^[a-zA-Z0-9]*${allowedDomain}$`);
          return regex.test(domain);
        });

        if (!validDomain) {
          return { restrictedDomain: true };
        }
      } else {
        return { restrictedDomain: true };
      }

      return null;
    };
  }

  dateOfBirthValidator() {
    return (control: AbstractControl) => {
      if (control.value) {
        const seledtedDate = new Date(control.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0)
        if (seledtedDate > today) {
          return { invalidDateOfBirth: true }
        }
        return false
      }
      return null;
    }
  }

  getCountries(): Observable<any> {
    const url = `${this.baseUrl}/countryInfoJSON?username=${this.username}`;
    return this.httpClient.get(url);
  }

  getCountryInfo(countryCode: string): Observable<any> {
    const url = `${this.baseUrl}/countryInfoJSON?country=${countryCode}&username=${this.username}`;
    return this.httpClient.get(url);
  }

  getStates(countryGeonameId: number): Observable<any> {
    const url = `${this.baseUrl}/childrenJSON?geonameId=${countryGeonameId}&username=${this.username}`;
    return this.httpClient.get(url);
  }

  getCities(countryCode: string): Observable<any> {
    const url = `${this.baseUrl}/searchJSON?country=${countryCode}&featureCode=PPL&maxRows=1000&username=${this.username}`;
    return this.httpClient.get(url);
  }

  getDistricts(stateGeonameId: number): Observable<any> {
    const url = `${this.baseUrl}/childrenJSON?geonameId=${stateGeonameId}&username=${this.username}`;
    return this.httpClient.get(url);
  }
}