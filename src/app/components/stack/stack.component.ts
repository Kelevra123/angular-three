import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DisplayControllerService } from "../../displayController.service";

@Component({
  selector: '.stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StackComponent implements OnInit {

  public isThree: boolean = false;

  constructor(
    private _displayController: DisplayControllerService
  ) {
    this._displayController.addListener(this)
  }

  ngOnInit(): void {
  }

  public onThreeStart(isThree: boolean): void {
    this.isThree = isThree;
  }

}
