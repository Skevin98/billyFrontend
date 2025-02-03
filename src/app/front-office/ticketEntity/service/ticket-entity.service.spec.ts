import { TestBed } from '@angular/core/testing';

import { TicketEntityService } from './ticket-entity.service';

describe('TicketEntityService', () => {
  let service: TicketEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
