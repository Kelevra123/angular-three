import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as THREE from 'three'
import { LoadingService } from "../../loading.service";
import { SceneService } from "../../scene.service";
import { TextureEnum } from "../helper.enum";
import { ResizeService } from "../../resize.service";
import { CameraControllerService } from "../../cameraController.service";
import { DisplayControllerService } from "../../displayController.service";

@Component({
  selector: '.about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements AfterViewInit, OnInit{
  @Input('isDesktop')
  public isDesktop: boolean = true;

  @ViewChild('canvas')
  private canvasRef!: ElementRef;

  @ViewChild('laptopVideo')
  private laptopVideo!: ElementRef;

  @ViewChild('pcVideo')
  private pcVideo!: ElementRef;

  @ViewChild('exit')
  private exit!: ElementRef;

  @ViewChild('nav')
  private nav!: ElementRef;

  @ViewChild('bottomTop')
  private bottomTop!: ElementRef;

  @ViewChild('explore')
  private explore!: ElementRef;

  @ViewChild('exitSite')
  private exitSite!: ElementRef;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private resizeSubscription: any;
  public nextStep: any;
  public prevStep: any;
  public defaultPosition: any
  public size: any

  public isThree: boolean = false

  constructor(
    private _loadingService: LoadingService,
    private _sceneService: SceneService,
    private _resizeService: ResizeService,
    private _cameraController: CameraControllerService,
    private _displayController: DisplayControllerService
  ) { }

  ngOnInit(): void {
    this.resizeSubscription = this._resizeService.onResize$
      .subscribe(size =>  {
        if (this.canvasRef)
        {
          this.onResize(size);
          this.size = size;
        }
      })
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loadingService.canvas(this.canvas);
      this._loadingService.encodeVideoToTexture(this.laptopVideo, TextureEnum.LAPTOP_VIDEO);
      this._loadingService.encodeVideoToTexture(this.pcVideo, TextureEnum.PC_VIDEO);

      this._sceneService.setVideoToScene(this.laptopVideo, TextureEnum.LAPTOP_VIDEO);
      this._sceneService.setVideoToScene(this.pcVideo, TextureEnum.PC_VIDEO);
      this._sceneService.setExitButton(this.exit);
      this._sceneService.setExploreButton(this.explore);
      this._sceneService.setExitToSiteButton(this.exitSite);

      this.nextStep = this.stepToNextPhoto.bind(this);
      this.prevStep = this.stepToPrevPhoto.bind(this);
      this.defaultPosition = this.defaultPositionInPhotoMode.bind(this);

      this._cameraController.setControlsForPhotoMode(this.nav);
      this._cameraController.setControlsForBookshelfMode(this.bottomTop);
    }, 300)
  }

  public onMouseMove($event: MouseEvent): void {
    this._sceneService.onMouseMove($event);
  }

  public onClick($event: MouseEvent): void {
    if (this.canvasRef.nativeElement.classList.contains('fullScreen'))
    {
      if (this.exit.nativeElement.classList.contains('dn'))
      {
        this._sceneService.onClick($event);
      }
    }
    else
    {
      this.toFullScreen();
      this.onResize();
    }
  }

  public toFullScreen(): void {
    this._sceneService.setStatus(true);
    this.isThree = true;
    this.canvasRef.nativeElement.style.display = 'block';
    this.canvasRef.nativeElement.style.position = 'fixed';
    this.canvasRef.nativeElement.style.top = '0';
    this.canvasRef.nativeElement.style.left = '0';
    this.canvasRef.nativeElement.style.width = '100%';
    this.canvasRef.nativeElement.style.height = '100%';
    this.canvasRef.nativeElement.style.zIndex = '100';
    this.canvasRef.nativeElement.classList.remove('dn');
    this.canvasRef.nativeElement.classList.add('fullScreen');
    this._displayController.startThreeExp();
    this.exitSite.nativeElement.classList.remove('dn');
    this.onResize(this.size);
  }

  public toSite(): void {
    this._sceneService.setStatus(false);
    this.isThree = false;
    this.canvasRef.nativeElement.style.display = 'none';
    this.exitSite.nativeElement.classList.add('dn');
    this._displayController.endThreeExp();
  }

  public onResize(size?: any): void {
    this._sceneService.onResize(size);
  }

  public doBackMove(): void {
    this._sceneService.doBackMove();
  }

  public stepToNextPhoto(): void {
    this._cameraController.stepToNextPhoto();
  }

  public stepToPrevPhoto(): void {
    this._cameraController.stepToPrevPhoto();
  }

  public defaultPositionInPhotoMode(): void {
    this._cameraController.defaultPositionInPhotoMode();
  }
}
