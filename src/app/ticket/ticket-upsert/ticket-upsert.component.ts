import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-ticket-upsert',
  imports: [],
  templateUrl: './ticket-upsert.component.html',
  styleUrl: './ticket-upsert.component.scss'
})
export class TicketUpsertComponent implements OnInit{
  ngOnInit(): void {
    console.log('On Init')
  }

  ticketTypeFormGroup = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    });
}
