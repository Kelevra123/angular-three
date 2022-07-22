import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '.card-exp',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CardComponent implements OnInit {
  @Input('title')
  public title: string = '';

  @Input('date')
  public date: string = '';

  @Input('role')
  public role: string = '';

  @Input('technologies')
  public technologies: any = '';

  @Input('achievements')
  public achievements: any = [];

  @Input('challenge')
  public challenge: Array<string> = [];

  @Input('img')
  public img: string = '';


  constructor() { }

  ngOnInit(): void {
  }

}
