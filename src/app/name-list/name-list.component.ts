import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from './../service/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CurrencyService } from '../service/currency.service';


@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.scss']
})
export class NameListComponent implements OnInit {

  cryptoBannerData: any = [];
  currency: string = "GBP";
  //initialised later
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['symbol', 'current_price', 'price_change_percentage_24h', 'market_cap']

  //! since initialised in future
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private api: ApiService, private router: Router, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.getAllCryptoData();
    this.getCyrptoBannerData();
    this.currencyService.getCurrency()
      .subscribe(val => {
        this.currency = val;
        this.getAllCryptoData();
        this.cryptoBannerData();
      })
  }

  //retrieving data for banner from api
  getCyrptoBannerData() {
    this.api.getTrendingCryptocurrency(this.currency)
      .subscribe(res => {
        console.log(res);
        this.cryptoBannerData = res;
      })
  }

  getAllCryptoData() {
    this.api.getCryptocurrencyData(this.currency)
      .subscribe(res => {
        console.log(res);
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  cryptocurrencyDetails(row: any) {
    this.router.navigate(['name-detail', row.id])
  }

}
