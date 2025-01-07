export interface EventInput {
  id? : string;
  name: string;
  description? : string;
  startDate : string;
  endDate? : string;
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
  eventStatus?: EventStatus;
  ticketTypes? : TicketType[]
}

export interface TicketType {
  id : string;
  price : number;
  title: string;
  description? : string;
  createdDate : string;
  lastModifieddate? : string;
}

export interface TicketTypeInput {
  id? : string;
  price : number;
  title: string;
  description? : string;
}



export enum EventStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  TERMINATED = 'TERMINATED',
  CANCELLED = 'CANCELLED',
}
