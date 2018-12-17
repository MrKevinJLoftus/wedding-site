import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-couple-section',
  templateUrl: './couple-section.component.html',
  styleUrls: ['./couple-section.component.css'],
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
export class CoupleSectionComponent implements OnInit {

  state = 'hide';

  constructor(public el: ElementRef) { }

  @HostListener('window:scroll', ['$event'])
      checkScroll() {
        const componentPosition = this.el.nativeElement.offsetTop;
        const scrollPosition = window.pageYOffset;
        if (scrollPosition >= componentPosition + 475) {
          this.state = 'show';
        } else {
          // this.state = 'hide';
        }
      }

  ngOnInit() {
  }

}
