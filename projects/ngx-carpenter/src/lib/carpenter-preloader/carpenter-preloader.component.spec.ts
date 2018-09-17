import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarpenterPreloaderComponent } from './carpenter-preloader.component';

describe('CarpenterPreloaderComponent', () => {
  let component: CarpenterPreloaderComponent;
  let fixture: ComponentFixture<CarpenterPreloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarpenterPreloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarpenterPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
