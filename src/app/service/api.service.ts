import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: httpClient) { }

  //collecting data from api
  getCryptocurrencyData() {

  }
}
