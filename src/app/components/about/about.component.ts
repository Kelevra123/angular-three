import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as THREE from 'three'
import { LoadingService } from "../../loading.service";
import { SceneService } from "../../scene.service";
import { TextureEnum } from "../helper.enum";

@Component({
  selector: '.about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AboutComponent implements AfterViewInit{
  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  @ViewChild('laptopVideo')
  private laptopVideo!: ElementRef;

  @ViewChild('pcVideo')
  private pcVideo!: ElementRef;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement
  }


  constructor(
    private _loadingService: LoadingService,
    private _sceneService: SceneService
  ) {

  }

  ngAfterViewInit(): void {
    this._loadingService.canvas(this.canvas)
    this._loadingService.encodeVideoToTexture(this.laptopVideo, TextureEnum.LAPTOP_VIDEO);
    this._loadingService.encodeVideoToTexture(this.pcVideo, TextureEnum.PC_VIDEO);

    this._sceneService.setVideoToScene(this.laptopVideo, TextureEnum.LAPTOP_VIDEO);
    this._sceneService.setVideoToScene(this.pcVideo, TextureEnum.PC_VIDEO);
  }

  onMouseMove($event: MouseEvent) {
    this._sceneService.onMouseMove($event);
  }

  onClick($event: MouseEvent) {
    this._sceneService.onClick($event)
  }
}
