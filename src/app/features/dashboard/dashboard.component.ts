import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent, ChartData, ChartType } from '../../shared/components/chart-component/chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  selectedChartType: ChartType = 'line';
  selectedChartTwoType: ChartType = 'bar';


  chartData: ChartData[] = [
    {
      name: '2023',
      series: [
        { name: 'Jan', value: 5400 },
        { name: 'Feb', value: 6200 },
        { name: 'Mar', value: 7800 },
        { name: 'Apr', value: 8200 },
        { name: 'May', value: 9100 },
        { name: 'Jun', value: 8900 }
      ]
    },
    {
      name: '2024',
      series: [
        { name: 'Jan', value: 7300 },
        { name: 'Feb', value: 8000 },
        { name: 'Mar', value: 9200 },
        { name: 'Apr', value: 10500 },
        { name: 'May', value: 11900 },
        { name: 'Jun', value: 12400 }
      ]
    }
  ];
}
