import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '.port-card',
  templateUrl: './port-card.component.html',
  styleUrls: ['./port-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PortCardComponent implements OnInit {
  @Input('title')
  public title: string = '';

  @Input('img')
  public img: string = '';

  @Input('about')
  public about: string = '';

  constructor() { }

  ngOnInit(): void {
  }

}
