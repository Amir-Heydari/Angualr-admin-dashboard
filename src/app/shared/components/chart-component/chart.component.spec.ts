import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartComponentComponent } from './chart.component';

describe('ChartComponentComponent', () => {
  let component: ChartComponentComponent;
  let fixture: ComponentFixture<ChartComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
