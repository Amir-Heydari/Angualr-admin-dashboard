import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { BehaviorSubject } from 'rxjs';

export type ChartType = 'line' | 'bar';

export interface ChartData {
  name: string;
  series: {
    name: string;
    value: number;
  }[];
}

@Component({
  selector: 'app-chart-component',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() data: ChartData[] = [];
  @Input() chartType: ChartType = 'line';
  @Input() xAxisLabel: string = 'X Axis';
  @Input() yAxisLabel: string = 'Y Axis';
  @Input() showLegend: boolean = true;
  @Input() showXAxisLabel: boolean = true;
  @Input() showYAxisLabel: boolean = true;
  @Input() colorScheme: string = 'vivid';

  private dataSubject = new BehaviorSubject<ChartData[]>([]);
  chartData$ = this.dataSubject.asObservable();

  // Mock data for preview
  mockData: ChartData[] = [
    {
      name: 'Series A',
      series: [
        { name: 'Jan', value: 42 },
        { name: 'Feb', value: 75 },
        { name: 'Mar', value: 38 },
        { name: 'Apr', value: 90 },
        { name: 'May', value: 65 }
      ]
    },
    {
      name: 'Series B',
      series: [
        { name: 'Jan', value: 52 },
        { name: 'Feb', value: 65 },
        { name: 'Mar', value: 48 },
        { name: 'Apr', value: 78 },
        { name: 'May', value: 82 }
      ]
    }
  ];

  chartDimensions: [number, number] = [0, 0];
  private container!: HTMLElement;

  LegendPosition = LegendPosition;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    // Use mock data if no data is provided
    if (!this.data || this.data.length === 0) {
      this.dataSubject.next(this.mockData);
    } else {
      this.dataSubject.next(this.data);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.dataSubject.next(changes['data'].currentValue?.length ? changes['data'].currentValue : this.mockData);
    }
  }

  ngAfterViewInit() {
    this.container = this.elementRef.nativeElement.querySelector('.chart-container');
    this.updateChartDimensions();
  }

  onResize() {
    this.updateChartDimensions();
  }

  private updateChartDimensions() {
    if (this.container) {
      // Get the container's dimensions
      const width = this.container.clientWidth;
      const height = this.container.clientHeight;
      
      // Update the chart dimensions
      this.chartDimensions = [width, height];
    }
  }

  // Format y-axis ticks
  formatYAxisTick(val: any): string {
    if (val >= 1000) {
      return (val / 1000).toFixed(1) + 'k';
    }
    return val.toString();
  }

  // An empty function to handle clicks which could be extended
  onSelect(event: any): void {
    console.log('Item clicked', event);
  }
}
