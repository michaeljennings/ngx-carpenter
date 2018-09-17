import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpenterPaginationControlsComponent } from './carpenter-pagination-controls.component';

describe('CarpenterPaginationControlsComponent', () => {
  let component: CarpenterPaginationControlsComponent;
  let fixture: ComponentFixture<CarpenterPaginationControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpenterPaginationControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpenterPaginationControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
