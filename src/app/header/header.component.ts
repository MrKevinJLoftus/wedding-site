import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translate3d(0, 50px, 0)'
      })),
      transition('show => hide', animate('500ms ease-out')),
      transition('hide => show', animate('500ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements OnInit, AfterViewInit {

  state = 'hide';

  constructor() { }

  ngOnInit() {
    this.state = 'hide';
  }

  ngAfterViewInit() {
    // https://github.com/angular/angular/issues/6005
    window.setTimeout(() =>
    this.state = 'show'
  );
  }

}
