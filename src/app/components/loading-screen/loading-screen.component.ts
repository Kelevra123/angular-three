import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: '.loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingScreenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
