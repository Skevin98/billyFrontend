import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventUpsertComponent } from './event-upsert.component';

describe('EventUpsertComponent', () => {
  let component: EventUpsertComponent;
  let fixture: ComponentFixture<EventUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
