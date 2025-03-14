import { Component, OnInit } from '@angular/core';
import { ChartComponent } from "../../shared/components/chart-component/chart.component";
import { ChartData } from "../../shared/components/chart-component/chart.component";
@Component({
  selector: 'app-reports',
  imports: [ChartComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  userActivityData: ChartData[] = [];
  userRoleDistribution: any[] = [];
  userGrowthData: any[] = [];
  userStatusData: any[] = [];
  userRoleDistributionFormatted: ChartData[] = [];
  userGrowthDataFormatted: ChartData[] = [];
  userStatusDataFormatted: ChartData[] = [];

  view: [number, number] = [700, 300];
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  showYAxisLabel = true;
  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  summaryMetrics = {
    totalUsers: 547,
    activeUsers: 423,
    newUsersThisMonth: 45,
    averageSessionTime: '24min'
  };

  constructor() { }

  ngOnInit(): void {
    this.initChartData();
  }

  initChartData(): void {
    // User Activity Data (Line Chart)
    this.userActivityData = [
      {
        "name": "Daily Active Users",
        "series": [
          { "name": "Jan", "value": 310 },
          { "name": "Feb", "value": 340 },
          { "name": "Mar", "value": 370 },
          { "name": "Apr", "value": 350 },
          { "name": "May", "value": 390 },
          { "name": "Jun", "value": 420 }
        ]
      },
      {
        "name": "New Registrations",
        "series": [
          { "name": "Jan", "value": 45 },
          { "name": "Feb", "value": 37 },
          { "name": "Mar", "value": 58 },
          { "name": "Apr", "value": 42 },
          { "name": "May", "value": 53 },
          { "name": "Jun", "value": 61 }
        ]
      }
    ];

    // User Role Distribution (Pie Chart)
    this.userRoleDistribution = [
      { "name": "Admin", "value": 15 },
      { "name": "Editor", "value": 47 },
      { "name": "Moderator", "value": 53 },
      { "name": "User", "value": 432 }
    ];

    // User Growth Data (Bar Chart)
    this.userGrowthData = [
      { "name": "Q1 2024", "value": 125 },
      { "name": "Q2 2024", "value": 152 },
      { "name": "Q3 2024", "value": 178 },
      { "name": "Q4 2024", "value": 92 }
    ];

    // User Status Data (Pie Chart)
    this.userStatusData = [
      { "name": "Active", "value": 423 },
      { "name": "Inactive", "value": 124 }
    ];
  }

  onSelect(event: any): void {
    console.log('Item clicked', event);
  }

}
