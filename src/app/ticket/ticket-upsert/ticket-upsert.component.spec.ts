import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketUpsertComponent } from './ticket-upsert.component';

describe('TicketUpsertComponent', () => {
  let component: TicketUpsertComponent;
  let fixture: ComponentFixture<TicketUpsertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketUpsertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketUpsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
