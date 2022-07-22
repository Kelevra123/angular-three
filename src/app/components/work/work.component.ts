import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { workData } from "./workData";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: '.work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WorkComponent implements OnInit, AfterViewInit {
  public faArrowRight = faCircleRight;

  public workData: Array<workData> = [];
  public work: any;
  public step: number = 0

  constructor() {

  }

  ngOnInit(): void {
    this.workData = workData
    this.work = this.workData[this.step]
  }

  ngAfterViewInit(): void {

  }

  next() {
    this.step++
    if (this.step === this.workData.length) {
      this.step = 0;
    }
    this.work = this.workData[this.step]
  }
}
