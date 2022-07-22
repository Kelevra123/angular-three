import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: '.arrows-navigation',
  templateUrl: './arrows-navigation.component.html',
  styleUrls: ['./arrows-navigation.component.scss']
})
export class ArrowsNavigationComponent implements OnInit {
  @Input('nextMove')
  public nextMove: any;

  @Input('defaultMove')
  public defaultMove: any;

  @Input('prevMove')
  public prevMove: any;
  constructor() { }

  ngOnInit(): void {
  }

  public next() {
    this.nextMove();
  }

  public default() {
    this.defaultMove()
  }

  public prev() {
    this.prevMove();
  }

}
