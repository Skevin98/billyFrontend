import {Component, OnInit} from '@angular/core';
import {UserService} from '../service/user.service';
import {gql} from '@apollo/client/core';
import {DisplayedTicketEntity, TicketEntity, UserEntity} from '../../../models/models';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-account',
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit{

  private userId : String = "6787f20c9a1a3e6163533ff3";
  private UserByIdQuery = gql`
    query userById($id: String!){
      userById(id: $id){
        id
        ticketsPurchased {
          ticketTypeId
          eventId
          order
        }
      }
    }
  `;
  private ticketDetailsQuery = gql`
    query ticketDetailsQuery($eventIds: [String!]!, $ticketTypeIds : [String!]!){
      allEvents(where: {id: {in: $eventIds}}){
        id
        name
        ticketTypes(where: {id: {in: $ticketTypeIds}}){
          id
          title
          price
        }
      }
    }
  `;
  public user?: UserEntity;
  ticketsToDisplay: DisplayedTicketEntity[] | undefined;


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
        this.getCurrentUser();
    }


  private getCurrentUser() {
    this.userService.query(this.UserByIdQuery,{id : this.userId})
      .pipe(
        switchMap(event => {
          if (event.errors && event.errors.length > 0) {
            console.log(event.errors[0].message);
            throw new Error(event.errors[0].message);
          }
          this.userService.currentUser = event.data.userById;
          this.user = event.data.userById;
          console.log(this.user);
          return this.userService.query(this.ticketDetailsQuery,
            {
              eventIds : this.user?.ticketsPurchased.map(v=>v.eventId),
              ticketTypeIds : this.user?.ticketsPurchased.map(v=>v.ticketTypeId)
            });
        })
      )
      .subscribe({
        next: event => {
          if (event.errors && event.errors.length > 0) {
            console.log(event.errors[0].message);
            throw new Error(event.errors[0].message);
          }
          const ticketsDetails : any[] = event.data.allEvents;
          this.ticketsToDisplay = this.mapTicketEntitiesToDetails(this.user?.ticketsPurchased, ticketsDetails);
          console.log(this.ticketsToDisplay);
        },
        error: err => console.error(err)
      })
  }

  private mapTicketEntitiesToDetails(ticketsPurchased: TicketEntity[] | undefined, ticketsDetails: any[]) {
    const fetchedTicketTypes = ticketsDetails.flatMap(details => details?.ticketTypes);
    return ticketsPurchased?.map(
      value => {
        const eventName = ticketsDetails.find(t => t.id == value.eventId)?.name;
        const ticketType = fetchedTicketTypes.find(t => t.id == value.ticketTypeId);
        const ticketToDisplay: DisplayedTicketEntity = {
          ...value,
          eventName: eventName,
          ticketTypeTitle: ticketType?.title,
          price: ticketType?.price
        };
        return ticketToDisplay;
      }
    );
  }
}
