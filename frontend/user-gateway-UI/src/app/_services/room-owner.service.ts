import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { RoomOwner } from '../_model/RoomOwner/room-owner';
import { Observable } from 'rxjs';
import { RoomOwnerRegistration } from '../_model/RoomOwner/room-details';

@Injectable({
  providedIn: 'root'
})
export class RoomOwnerService {
  baseUrl = environment.apiUrl + 'Account/';
  constructor(private httpClient: HttpClient) { }

  // roomOwnerRegistration1(roomOwnerRegistration: RoomOwnerRegistration): Observable<any> {
  //   debugger
  //   const url = `${this.baseUrl}roomOwnerRegistration`;
  //   return this.httpClient.post<any>(url, roomOwnerRegistration);
  // }

  // roomOwnerRegistration(data: RoomOwnerRegistration): Observable<any> {
  //   debugger
  //   const url = `${this.baseUrl}roomOwnerRegistration`;
  //   return this.httpClient.post(url, data, {
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  // }

  roomOwnerRegistration(data: FormData): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}roomOwnerRegistration`, data);
  }
  
  

}