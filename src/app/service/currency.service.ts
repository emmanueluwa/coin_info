import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  //setting currency based on selected from options
  private selectedCurrency$: BehaviorSubject<string> = new BehaviorSubject<string>("GBP");
  constructor() { }

  getCurrency() {
    return this.selectedCurrency$.asObservable();
  }

  setCurrency(currency: string) {
    this.selectedCurrency$.next(currency);
  }
}
