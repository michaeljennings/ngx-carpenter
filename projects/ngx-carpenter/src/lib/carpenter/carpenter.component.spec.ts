import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpenterComponent } from './carpenter.component';

describe('CarpenterComponent', () => {
  let component: CarpenterComponent;
  let fixture: ComponentFixture<CarpenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
