import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { RoomOwner } from '../_model/RoomOwner/room-owner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomOwnerService {
  baseUrl = environment.apiUrl + 'RoomOwner/';
  constructor(private httpClient: HttpClient) { }

  roomOwnerRegistration(model: RoomOwner): Observable<RoomOwner> {
    const url = `${this.baseUrl}RoomOwnerRegistration`;
    return this.httpClient.post<RoomOwner>(url, model);
  }

}