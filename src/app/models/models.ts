export interface EventInput {
  id? : string;
  name: string;
  description? : string;
  startDate : string;
  endDate? : string;
  createdDate? : string;
  lastModifieddate? : string;
  eventStatus?: EventStatus
}

export interface Event {
  id : string;
  name: string;
  description? : string;
  startDate : string;
  endDate? : string;
  createdDate : string;
  lastModifieddate? : string;
  eventStatus?: EventStatus
}


export enum EventStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  TERMINATED = 'TERMINATED',
  CANCELLED = 'CANCELLED',
}
