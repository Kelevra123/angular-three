import { ElementRef, Injectable } from "@angular/core";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap'
import { ControlEnum, TextureEnum } from "./components/helper.enum";
import { SavedMaterial } from "./components/canvas-members/data";
import { CameraControllerService } from "./cameraController.service";

@Injectable()
export class SceneService {
  //Camera setup
  private camera!: THREE.PerspectiveCamera;
  public cameraZ: number = 95;
  public cameraX: number = 0;
  public cameraY: number = 18;
  public cameraRotateX = 6.1;
  public fieldOfView: number = 45;
  public nearClippingPlane: number = 0.1;
  public farClippingPlane: number = 1000;

  //Controls setup
  private control: any;
  private maxDistance: number = 95;
  private enablePan: boolean = false;
  private minAzimuthAngle: number = -0.2;
  private maxAzimuthAngle: number = 0.2;
  private minPolarAngle: number = 1.2;
  private maxPolarAngle: number = 1.4;

  //Raycaster setup
  private mouse: THREE.Vector2 = new THREE.Vector2();
  private raycaster: THREE.Raycaster = new THREE.Raycaster();
  private sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  //Scene setup
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private canvas: any = null;
  private exploreButton: any;

  //Move control members
  private triggerActive: string | undefined = '';
  private needUpdate: boolean = false;
  private bookshelfActive: boolean = false;
  private mainTableActive: boolean = false;
  private photoActive: boolean = false;
  private freeMode: boolean = true;
  private exitButton: ElementRef | null = null;


  //Target Mesh Arrays
  private bookshelf: Array<THREE.Mesh> = [];
  private mainTable: Array<THREE.Mesh> = [];
  private photo: Array<THREE.Mesh> = [];
  private activeNow: any;

  //Video
  private videoArray: any = {};
  private videoContainer: any;
  private videoTexture: any;

  //Intersects
  private intersectsStatus: boolean = false;
  private mainTableIntersects: Array<THREE.Intersection> = [];
  private bookshelfIntersects: Array<THREE.Intersection> = [];
  private photoIntersects: Array<THREE.Intersection> = [];


  //Material Container
  private materialContainer: any = {};

  public setTriggerActive(trigger: string | undefined): void {
    this.triggerActive = trigger;
  }

  public setExitButton(element: ElementRef): void {
    this.exitButton = element
  }

  public setExploreButton(el: ElementRef): void {
    this.exploreButton = el;
  }

  constructor(
    private _cameraController: CameraControllerService
  ) {
    this.activeNow = {
      mesh: [],
      material: []
    }
  }

  public onMouseMove(event: MouseEvent): void {
      this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1;
  }

  public onClick(event: MouseEvent): void {
    this._cameraController.doMove(this.triggerActive, this.toggleRaycasterActive.bind(this), this.updateMaterial.bind(this),
      this.setTriggerActive.bind(this), this.playVideo.bind(this))
  }

  public doBackMove(): void {
    this._cameraController.doMove(this.triggerActive, this.toggleRaycasterActive.bind(this), null, null, this.playVideo.bind(this))
  }

  public onResize(size?: any) : void {
    // Update renderer
    if (size) {
      this.renderer.setSize(size.innerWidth, size.innerHeight);
      this.sizes.width = size.innerWidth;
      this.sizes.height = size.innerHeight;
    }
    else {
      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    }

    //Update Camera
    const aspectRatio = this.getAspectRatio()
    this.camera.aspect = aspectRatio
    this.camera.updateProjectionMatrix()

    if (this.canvas.clientWidth < 1000) {
      this.camera.fov = 55
    }

    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  public setVideoToScene(video: ElementRef, key: string): void {
    this.videoArray[key] = video;
  }

  public createScene(scene: THREE.Scene, canvas: ElementRef, activeMeshes: any, materialContainer: any, videoContainer: any): void {
    this.scene = scene;
    this.canvas = canvas;

    //*Targets
    this.bookshelf = activeMeshes[TextureEnum.BOOKSHELF];
    this.mainTable = activeMeshes[TextureEnum.MAIN_TABLE];
    this.photo = activeMeshes[TextureEnum.PHOTO];

    //*Containers
    this.materialContainer = materialContainer;
    this.videoContainer = videoContainer;

    //VideoSet
    for (let key in this.videoContainer)
    {
      if (this.videoContainer.hasOwnProperty(key))
      {
        this.videoContainer[key].material = this.materialContainer[key]
      }
    }


    let aspectRatio = this.getAspectRatio();
    //*Camera
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    );
    this.camera.position.set(this.cameraX, this.cameraY, this.cameraZ);
    this.camera.rotation.x = this.cameraRotateX;
    this.camera.updateProjectionMatrix();
    this._cameraController.setCamera(this.camera)

    //*Controls
    this.control = new OrbitControls(this.camera, this.canvas);
    this.control.maxDistance = this.maxDistance;
    this.control.enablePan = this.enablePan;
    this.control.minAzimuthAngle = this.minAzimuthAngle;
    this.control.maxAzimuthAngle = this.maxAzimuthAngle;
    this.control.minPolarAngle = this.minPolarAngle
    this.control.maxPolarAngle = this.maxPolarAngle;
    this._cameraController.setControls(this.control)

    this.startRenderingLoop();
  }

  private getAspectRatio(): number {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private updateMaterial(): void {
    for (const object of this.activeNow.mesh)
    {
      object.material = this.activeNow.material;
    }

    this.needUpdate = false;
    this.triggerActive = undefined
  }

  private toggleRaycasterActive(isActive: boolean, trigger?: string | undefined): void {
    if (isActive)
    {
      this.exitButton?.nativeElement.classList.add('dn')
        this.freeMode = true;
        this.bookshelfActive = false;
        this.mainTableActive = false;
        this.photoActive = false;
    }
    else
    {
      this.freeMode = false;
      this.bookshelfActive = true;
      this.mainTableActive = true;
      this.photoActive = true;
      this.control.reset();
      this.control.enabled = false;
      this.camera.updateProjectionMatrix()
      this.exitButton?.nativeElement.classList.remove('dn')
    }
  }

  private playVideo(play: boolean, videoKeyArray: Array<string>): void {
      videoKeyArray.forEach(key => {
        if (this.videoContainer.hasOwnProperty(key) && this.videoArray.hasOwnProperty(key))
        {
          if (play)
          {
            this.scene.add(this.videoContainer[key]);
            this.videoArray[key].nativeElement.playbackRate = 3.0;
            this.videoArray[key].nativeElement.play();
          }
          else
          {
            this.scene.remove(this.videoContainer[key]);
            this.videoArray[key].nativeElement.pause();
          }
        }
      })
  }

  private containActiveElement(activeMeshArray: any, arrayStandardMaterial: any): void {
    this.activeNow.mesh = activeMeshArray;
    this.activeNow.material = arrayStandardMaterial;
  }

  private backToStandardMesh(): void {
    if (!this.mainTableIntersects.length  && this.needUpdate && this.triggerActive === ControlEnum.TABLE_MOVE)
    {
      // this.updateMaterial(this.mainTable, this.materialContainer[TextureEnum.MAIN_TABLE]);
      this.updateMaterial()
    }
    else if (!this.bookshelfIntersects.length && this.needUpdate && this.triggerActive === ControlEnum.BOOKSHELF_MOVE)
    {
      // this.updateMaterial(this.bookshelf, this.materialContainer[TextureEnum.BOOKSHELF]);
      this.updateMaterial()
    }
    else if (!this.photoIntersects.length && this.needUpdate && this.triggerActive === ControlEnum.PHOTO_MOVE)
    {
      // this.updateMaterial(this.photo, this.materialContainer[TextureEnum.PHOTO]);
      this.updateMaterial()
    }
  }

  private triggerMeshByCursor(): void {
    if (this.mainTableIntersects.length && !this.mainTableActive && !this.needUpdate)
    {
      this.containActiveElement(this.mainTable, this.materialContainer[TextureEnum.MAIN_TABLE])

      this.triggerActive = ControlEnum.TABLE_MOVE;
      this.needUpdate = true;
      for (const object of this.mainTable)
      {
        object.material = this.materialContainer[TextureEnum.MAIN_TABLE_ACTIVE];
      }
    }

    else if (this.bookshelfIntersects.length && !this.bookshelfActive && !this.needUpdate)
    {
      this.containActiveElement(this.bookshelf, this.materialContainer[TextureEnum.BOOKSHELF])

      this.triggerActive = ControlEnum.BOOKSHELF_MOVE;
      this.needUpdate = true;
      for (const object of this.bookshelf)
      {
        object.material = this.materialContainer[TextureEnum.BOOKSHELF_ACTIVE];
      }
    }

    else if (this.photoIntersects.length && !this.photoActive && !this.needUpdate)
    {
      this.containActiveElement(this.photo, this.materialContainer[TextureEnum.PHOTO])

      this.triggerActive = ControlEnum.PHOTO_MOVE;
      this.needUpdate = true;
      for (const object of this.photo)
      {
        object.material = this.materialContainer[TextureEnum.PHOTO_ACTIVE];
      }
    }
  }

  private startRenderingLoop() {
    //* Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    // this.renderer.outputEncoding = THREE.sRGBEncoding

    console.log(this.exploreButton)
    if (this.exploreButton) {
      // this.exploreButton.nativeElement.style.visibility = 'visible';
      this.exploreButton.nativeElement.classList.add('visible')
    }

    //Create meshes array

    let self: SceneService = this;
    (function tick() {
      self.raycaster.setFromCamera(self.mouse, self.camera);

      self.mainTableIntersects = self.raycaster.intersectObjects(self.mainTable);
      self.photoIntersects = self.raycaster.intersectObjects(self.photo);
      self.bookshelfIntersects = self.raycaster.intersectObjects(self.bookshelf);

      self.backToStandardMesh();
      self.triggerMeshByCursor();

      if (self.control.enabled) {
        self.control.update();
      }

      requestAnimationFrame(tick);
      self.renderer.render(self.scene, self.camera);
    }());
  }
}
