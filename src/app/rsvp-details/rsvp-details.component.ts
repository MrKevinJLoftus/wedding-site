import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rsvp-details',
  templateUrl: './rsvp-details.component.html',
  styleUrls: ['./rsvp-details.component.css']
})
export class RsvpDetailsComponent implements OnInit {

  // want to grab the guests added for the user and list them
  // guests will then be assigned 'attending' or 'not attending'

  constructor() { }

  ngOnInit() {
  }

}
