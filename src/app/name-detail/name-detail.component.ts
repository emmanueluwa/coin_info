import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../service/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { CurrencyService } from '../service/currency.service';

@Component({
  selector: 'app-name-detail',
  templateUrl: './name-detail.component.html',
  styleUrls: ['./name-detail.component.scss']
})
export class NameDetailComponent implements OnInit {

  coinData: any;
  coinID!: string;
  days: number = 30;
  currency: string = "GBP";

  //data for graph
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Price Trends',
        backgroundColor: 'rgba(148, 159, 177, 0.2)',
        borderColor: '#009688',
        pointBackgroundColor: '#009688',
        pointBorderColor: '#009688',
        pointHoverBackgroundColor: '#009688',
        pointHoverBorderColor: '#009688',
      }
    ],
    labels: []
  };
  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      point: {
        radius: 1
      }
    },

    plugins: {
      legend: { display: true },
    }
  };
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) lineChart!: BaseChartDirective;

  // get access to the id from the router using activatedRoute
  constructor(private api: ApiService, private activatedRoute: ActivatedRoute, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    // access id using route
    this.activatedRoute.params.subscribe(val => {
      this.coinID = val['id'];
    })
    this.getCryptocurrencyData();
    this.getGraphData(this.days);
    this.currencyService.getCurrency()
      .subscribe(val => {
        this.currency = val;
        this.getGraphData(this.days);
        this.getCryptocurrencyData();
      })
  }

  getCryptocurrencyData() {
    this.api.getCryptocurrencyByID(this.coinID)
      .subscribe(res => {
        this.coinData = res;
        console.log(this.coinData);
        if(this.currency === "USD") {
          res.market_data.current_price.gbp = res.market_data.current_price.usd;
          res.market_data.market_cap.gbp = res.market_data.market_cap.usd;
        }
        res.market_data.current_price.gbp = res.market_data.current_price.gbp;
        res.market_data.market_cap.gbp = res.market_data.market_cap.gbp;
        this.coinData = res;
      })
  }

  getGraphData(days: number) {
    this.days = days;
    this.api.getGraphData(this.coinID, this.currency, this.days)
      .subscribe(res => {
        //async
        setTimeout(() => {
          this.lineChart.chart?.update();
        }, 200);
        this.lineChartData.datasets[0].data = res.prices.map((a: any) => {
          return a[1];
        });
        this.lineChartData.labels = res.prices.map((a: any) => {
          //trasform api value to correct date that can be understood
          let date = new Date(a[0]);
          let time = date.getHours() > 12 ?
            `${date.getHours() - 12}: ${date.getMinutes()} PM` :
            `${date.getHours()}: ${date.getMinutes()} AM`
          return days === 1 ? time : date.toLocaleDateString();
        })
      })
  }
}
