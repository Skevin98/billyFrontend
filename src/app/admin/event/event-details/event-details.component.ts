import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Event, TicketEntity, TicketStatus, TicketType, UserEntity} from "../../../models/models";
import {gql} from '@apollo/client/core';
import {EventService} from '../service/event.service';
import {checkGraphQLError} from '../../../utils/functions';
import {DatePipe} from '@angular/common';
import {Title} from '@angular/platform-browser';
import {environment} from '../../../../environments/environment';
import {TicketEntityService} from '../../../front-office/ticketEntity/service/ticket-entity.service';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
@Component({
  selector: 'app-event-details',
  imports: [
    DatePipe
  ],
  templateUrl: './event-details.component.html',
  styleUrl: './event-details.component.scss'
})
export class EventDetailsComponent implements OnInit{
  event: Event;
  private userTicketsByEventIdQuery = gql`
    query userTicketsByEventId($eventId : String!){
      usersTicketsByEventId(eventId: $eventId){
        id
        ticketsPurchased{
          eventId
          id
          order
          ticketTypeId
          status
          createdDate
          lastModifiedDate
        }
      }
    }
  `;

  private updateTicketEntityQuery = gql`
  mutation updateTicketEntity($input : TicketEntityInput!, $userId : String!, $ticketId : String!){
    updateTicketEntity(input: $input,userId: $userId, ticketId: $ticketId){
      eventId
      id
      order
      ticketTypeId
      status
      createdDate
      lastModifiedDate
    }
  }`
  tickets: any[] = [];


  constructor(private router : Router, private activatedRoute : ActivatedRoute,
              private eventService : EventService, private ticketEntityService : TicketEntityService,
              private titleService : Title) {
    this.event = history.state.event;
    if (!this.event)
      this.router.navigate([".."], {relativeTo : this.activatedRoute });
    this.titleService.setTitle(`${this.event.name} - ${environment.title}`)
  }

  ngOnInit(): void {

    this.getUsersByEventId(this.event.id);
  }

  private getUsersByEventId(id: string) {
    this.eventService.query(this.userTicketsByEventIdQuery,{eventId : id})
      .subscribe({
        next : value => {
          checkGraphQLError(value);
          this.tickets = value.data.usersTicketsByEventId;
          this.mapTicketTypeTitleToUserTickets(this.tickets, this.event.ticketTypes);
          this.configureTicketsOptions(this.tickets);
        },
        error : err => {
          console.log(err);
        }
        }
      )
  }

  private mapTicketTypeTitleToUserTickets(tickets: any[], ticketTypes: TicketType[] | undefined) {
    console.log(ticketTypes);
    tickets.forEach(value => {
      console.log(value);
      const ticketType = ticketTypes?.find(t=> t.id == value.ticketsPurchased[0].ticketTypeId);
      if (ticketType)
        value.ticketTypeTitle = ticketType.title
    })

  }

  protected readonly TicketStatus = TicketStatus;

  updateTicket(userTicket: any, newStatus: TicketStatus) {
    const payload = {
      ...userTicket.ticketsPurchased[0],
      userId : userTicket.id,
      status : newStatus};
    delete payload.options;
    this.ticketEntityService.mutate(this.updateTicketEntityQuery,{
      input : payload,
      userId : payload.userId,
      ticketId : payload.id
    }).subscribe({
      next : value => {
        checkGraphQLError(value);
        const res = value.data.updateTicketEntity;
        console.log(res)
        userTicket.ticketsPurchased[0] = res;
        this.configureTicketsOptions([userTicket]);
      },
      error : err => console.error(err)
    });
  }


  configureTicketsOptions(tickets : any[]){
    tickets.forEach(value => {
      let options : { status : TicketStatus, label : string, class : string }[] = [];
      switch (value.ticketsPurchased[0].status){
        case TicketStatus.CREATED:
          break;
        case TicketStatus.CANCELED:
          break;
        case TicketStatus.REFUNDED:
          break;
        case TicketStatus.SOLD:
          options.push(
            {status : TicketStatus.REFUNDED, label : 'Rembourser', class : 'button button--primary'},
            {status : TicketStatus.CHECKED, label : 'Contrôler', class : 'button button--secondary'},
            {status : TicketStatus.CANCELED, label : 'Annuler', class : 'button'});
          break;
        case TicketStatus.CHECKED:
          options.push(
            {status : TicketStatus.REFUNDED, label : 'Rembourser',class : 'button button--primary'},
            {status : TicketStatus.CHECKED, label : 'Contrôler', class : 'button button--secondary'},
            {status : TicketStatus.CANCELED, label : 'Annuler', class : 'button'},
          )
          break;
      }
      value.options = options;
    })
  }
}
