import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { LoadingService } from "../../loading.service";
import { DeviceDetectorService } from "ngx-device-detector";

@Component({
  selector: '.site-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default
})
export class WrapperComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('loading')
  public loading!: ElementRef;

  @ViewChild('view')
  public view!: ElementRef;

  public load: boolean = false;
  public isDesktop: boolean = false;

  constructor(
    private _loadingService: LoadingService,
    private _deviceDetector: DeviceDetectorService
  ) {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this._loadingService.setLoadingScreen(this.loading);
    this._loadingService.setViewScreen(this.view);
    setTimeout(() => {
      this.isDesktop = this._deviceDetector.isDesktop();
      this._loadingService.start(this.isDesktop);
    }, 1000)
  }

  ngAfterViewChecked(): void {

  }

  public onSceneLoad(isDesktop: boolean): void {
    this.load = true;
  }

}
