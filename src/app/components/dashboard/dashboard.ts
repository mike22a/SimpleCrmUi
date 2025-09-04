import { Component, OnInit } from '@angular/core';
import { Api, DealDto } from '../../services/api'; // NOTE: Path to DealService is assumed
import { Color, ScaleType, NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard',
   imports: [
    NgxChartsModule // 2. Add the module to the imports array
  ],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard implements OnInit {
  // chartData: { name: string; value: number; }[] = [];
  stats: any = null;

  // ngx-charts options
  view: [number, number] = [700, 400];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = true;
  xAxisLabel = 'Deal Stage';
  showYAxisLabel = true;
  yAxisLabel = 'Number of Deals';

  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#3b5998', '#1da1f2']
  };

  constructor(private api: Api) { }

  ngOnInit(): void {
    // NOTE: This assumes you have a DealService that returns an Observable of deals.
    // this.api.getDeals().subscribe((deals: DealDto[]) => {
    //   this.chartData = this.processDealsForChart(deals);
    // });

    this.api.getDashboardStats().subscribe(data => {
      this.stats = data; // We just assign the whole object here
    });
  }

  private processDealsForChart(deals: DealDto[]): { name: string, value: number }[] {
    if (!deals || deals.length === 0) {
      return [];
    }

    const stageCounts = deals.reduce((acc, deal) => {
      const stage = deal.stage || 'No Stage';
      acc[stage] = (acc[stage] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.keys(stageCounts).map(stage => ({
      name: stage,
      value: stageCounts[stage]
    }));
  }
}