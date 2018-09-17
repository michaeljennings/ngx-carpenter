import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpenterCellComponent } from './carpenter-cell.component';

describe('CarpenterCellComponent', () => {
  let component: CarpenterCellComponent;
  let fixture: ComponentFixture<CarpenterCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpenterCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpenterCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
