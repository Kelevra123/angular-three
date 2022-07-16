import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as THREE from 'three'
import { LoadingService } from "../../loading.service";

@Component({
  selector: '.about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements AfterViewInit{
  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement
  }


  constructor(private _loadingService: LoadingService) {

  }

  ngAfterViewInit(): void {
    this._loadingService.canvas(this.canvas)
  }

}
