import { ElementRef, Injectable } from "@angular/core";
import * as THREE from "three"
import { ControlEnum, TextureEnum } from "./components/helper.enum";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { stepData } from "./components/canvas-members/stepData";

@Injectable()
export class CameraControllerService {
  private _camera!: THREE.PerspectiveCamera;
  private _controls!: OrbitControls;
  private mode: string = '';

  //Photo Mode
  private stepCount: number = -1;
  private readonly stepPhotoData: any;
  private cameraDefaultPositionInPhotoMode: THREE.Vector3 = new THREE.Vector3(0, 17, 20);
  private nav: any;

  //Bookshelf Mode
  private bottomTop: any
  private readonly stepShelData: any;

  public setCamera(camera: THREE.PerspectiveCamera): void {
    this._camera = camera;
  }

  public setControls(controls: OrbitControls): void {
    this._controls = controls;
  }

  public setControlsForPhotoMode(nav: ElementRef): void {
    this.nav = nav;
  }

  public setControlsForBookshelfMode(el: ElementRef): void {
    this.bottomTop = el;
  }

  constructor() {
    this.stepPhotoData = stepData;
  }

  public doMove(trigger: string | undefined, callback?: Function | null,
                materialCallback?: Function | null, setTriggerCallback?: Function| null, videoCallback?: Function | null): void {
    switch(trigger)
    {
      case ControlEnum.TABLE_MOVE:
        this.toTable(callback, materialCallback, setTriggerCallback, videoCallback);
        break;
      case ControlEnum.BOOKSHELF_MOVE:
        this.toBooks(callback, materialCallback, setTriggerCallback);
        break;
      case ControlEnum.PHOTO_MOVE:
        this.toPhoto(callback, materialCallback, setTriggerCallback);
        break;
      case ControlEnum.EXIT_TABLE_MOVE:
        this.exitTable(callback, materialCallback, setTriggerCallback, videoCallback);
        break;
      case ControlEnum.EXIT_PHOTO_MOVE:
        this.exitPhoto(callback, materialCallback, setTriggerCallback);
        break;
      case ControlEnum.EXIT_BOOKSHELF_MOVE:
        this.exitBook(callback, materialCallback, setTriggerCallback);
        break;
    }
  }

  private exitPhoto(callback?: Function | null, materialCallback?: Function | null, setTriggerCallback?: Function | null): void {
    if (callback)  callback(true);
    if (materialCallback) materialCallback();
    if (setTriggerCallback) setTriggerCallback();

    this.nav.nativeElement.classList.add('dn');
    this.mode = '';
    this._camera.rotation.x = 0;
    this._controls.enabled = true;
    gsap.to(this._camera.position, {
      x: 0,
      y: 18,
      z: 95,
      duration: 1
    });
    gsap.to(this._camera.rotation, {
      x: -0.186,
      y: 0,
      z: 0,
      duration: 1
    });
  }

  private toPhoto(callback?: Function | null, materialCallback?: Function | null, setTriggerCallback?: Function | null): void {
    if (callback)  callback(false);
    if (materialCallback) materialCallback();
    if (setTriggerCallback) setTriggerCallback(ControlEnum.EXIT_PHOTO_MOVE);

    this.nav.nativeElement.classList.remove('dn')
    this.mode = ControlEnum.PHOTO_MOVE;
    this._camera.rotation.x = 0;
    gsap.to(this._camera.position, {
      duration: 1,
      z: 20
    });
    gsap.to(this._camera.rotation, {
      duration: 1,
      y: Math.PI / 2
    });
  }

  private exitTable(callback?: Function | null, materialCallback?: Function | null,
                    setTriggerCallback?: Function | null, videoCallback?: Function | null): void {
    if (callback) callback(true);
    if (materialCallback) materialCallback();
    if (setTriggerCallback) setTriggerCallback();
    if (videoCallback) videoCallback(false, [TextureEnum.LAPTOP_VIDEO, TextureEnum.PC_VIDEO]);
    gsap.to(this._camera.position, {
      duration: 1,
      z: 95,
      y: 18
    });
    this._controls.enabled = true;
  }

  private toTable(callback?: Function | null, materialCallback?: Function | null,
                  setTriggerCallback?: Function | null, videoCallback?: Function | null): void {
    if (callback) callback(false);
    if (materialCallback) materialCallback();
    if (setTriggerCallback) setTriggerCallback(ControlEnum.EXIT_TABLE_MOVE);
    if (videoCallback) videoCallback(true, [TextureEnum.PC_VIDEO, TextureEnum.LAPTOP_VIDEO]);

    gsap.to(this._camera.position, {
      duration: 1,
      z: 1,
      y: 17
    });
  }

  private toBooks(callback?: Function| null, materialCallback?: Function | null,
                  setTriggerCallback?: Function | null): void {
    if (callback) callback(false);
    if (materialCallback) materialCallback();
    if (setTriggerCallback) setTriggerCallback(ControlEnum.EXIT_BOOKSHELF_MOVE);

    this._camera.rotation.x = 0;
    gsap.to(this._camera.position, {
      duration: 1,
      z: -14,
      x: -14,
    });
    gsap.to(this._camera.rotation, {
      duration: 1,
      y: Math.PI / 2
    });
  }

  private exitBook(callback?: Function | null, materialCallback?: Function | null, setTriggerCallback?: Function | null): void {
    if (callback)  callback(true);
    if (materialCallback) materialCallback();
    if (setTriggerCallback) setTriggerCallback();

    this.nav.nativeElement.classList.add('dn');
    this.mode = '';
    this._camera.rotation.x = 0;
    this._controls.enabled = true;
    gsap.to(this._camera.position, {
      x: 0,
      y: 18,
      z: 95,
      duration: 1
    });
    gsap.to(this._camera.rotation, {
      x: -0.186,
      y: 0,
      z: 0,
      duration: 1
    });
  }

  public stepToNextPhoto(): void {
    if (this.mode === ControlEnum.PHOTO_MOVE)
    {
      this.stepCount++;
      if (this.stepCount === this.stepPhotoData.length)
      {
        this.stepCount = -1;
        this.defaultPositionInPhotoMode();
      }
      else
      {
        const step = this.stepPhotoData[this.stepCount];
        gsap.to(this._camera.position, {
          x: step.x,
          y: step.y,
          z: step.z,
          duration: 0.5
        });
      }
    }
  }

  public stepToPrevPhoto(): void {
    if (this.mode === ControlEnum.PHOTO_MOVE)
    {
      this.stepCount--
      if (this.stepCount < 0)
      {
        this.stepCount =-1;
        this.defaultPositionInPhotoMode();
      }
      else {
        const step = this.stepPhotoData[this.stepCount];
        gsap.to(this._camera.position, {
          x: step.x,
          y: step.y,
          z: step.z,
          duration: 0.5
        });
      }
    }
  }

  public defaultPositionInPhotoMode(): void {
    if (this.mode === ControlEnum.PHOTO_MOVE)
    {
      this.stepCount = -1;
      gsap.to(this._camera.position, {
        x: this.cameraDefaultPositionInPhotoMode.x,
        y: this.cameraDefaultPositionInPhotoMode.y,
        z: this.cameraDefaultPositionInPhotoMode.z,
        duration: 0.5
      });
    }
  }
}
