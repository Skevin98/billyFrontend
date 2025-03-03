import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {EventUpsertComponent} from './admin/event/event-upsert/event-upsert.component';
import {EventListComponent} from './admin/event/event-list/event-list.component';
import {AdminModule} from './admin/admin.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdminModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Billy';
}
