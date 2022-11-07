import { Component, OnInit } from '@angular/core';
import { ApiService } from './../service/api.service';

@Component({
  selector: 'app-name-list',
  templateUrl: './name-list.component.html',
  styleUrls: ['./name-list.component.scss']
})
export class NameListComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  //retrieving data for banner from api
  getBannerData() {
    this.api.getTrendingCryptocurrency('GBP')
      .subscribe(res => {
        console.log(res);
        this.bannerData = res;
      })
  }

}
