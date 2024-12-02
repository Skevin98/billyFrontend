import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EventUpsertComponent} from './event/event-upsert/event-upsert.component';
import {EventListComponent} from './event/event-list/event-list.component';
import {EventModule} from './event/event.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, EventModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Billy';
}
