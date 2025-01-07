import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventListComponent} from './event-list/event-list.component';
import {EventUpsertComponent} from './event-upsert/event-upsert.component';
import {RouterModule} from '@angular/router';
import {eventRoutes} from './event.routes';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventListComponent,
    EventUpsertComponent,
    RouterModule.forChild(eventRoutes),
  ],
  exports: [
    EventListComponent,
    EventUpsertComponent
  ]
})
export class EventModule { }
