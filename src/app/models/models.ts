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

export interface TicketEntity{
  id: string,
  eventId: string,
  ticketTypeId: string,
  order: string,
  lastModifiedDate: string,
  createdDate: string,
  status: TicketStatus
}

export interface TicketEntityInput{
  id?: string,
  eventId: string,
  ticketTypeId: string,
  order : string,
  status?: TicketStatus
}

export interface UserEntity{
  id?: String,
  ticketsPurchased : TicketEntity[],
  createdDate : string;
  lastModifieddate? : string;


}



export enum EventStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  TERMINATED = 'TERMINATED',
  CANCELLED = 'CANCELLED',
}

export enum TicketStatus{
  CREATED = "CREATED",
  CANCELED = "CANCELED",
  REFUNDED = "REFUNDED",
  SOLD = "SOLD"
}
