import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { DisplayControllerService } from "../../displayController.service";

@Component({
  selector: '.portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  @ViewChild('cont')
  public container!: ElementRef;
  private children: any;

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

  ngAfterViewInit(): void {
    this.children = [...this.container.nativeElement.children]
  }
}
