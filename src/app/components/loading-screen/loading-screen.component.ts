import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoadingService } from "../../loading.service";

@Component({
  selector: '.loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrls: ['./loading-screen.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoadingScreenComponent implements OnInit {
  public loaded: number = 0;
  public total: number = 0;

  constructor(
    private readonly _loadingService: LoadingService
  ) {
    this._loadingService.setLoadingListener(this);
  }

  ngOnInit(): void {
  }

  public setView(loaded: number, total: number): void {
    this.loaded = loaded;
    this.total = total;
  }

}
