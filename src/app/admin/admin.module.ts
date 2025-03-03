import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventListComponent} from './event/event-list/event-list.component';
import {EventUpsertComponent} from './event/event-upsert/event-upsert.component';
import {RouterModule} from '@angular/router';
import {eventRoutes} from './event/event.routes';
import {adminRoutes} from './admin.routes';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EventListComponent,
    EventUpsertComponent,
    RouterModule.forChild(adminRoutes),
  ],
  exports: [
    EventListComponent,
    EventUpsertComponent
  ]
})
export class AdminModule { }
