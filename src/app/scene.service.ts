import { ElementRef, Injectable } from "@angular/core";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap'
import { ControlEnum, TextureEnum } from "./components/helper.enum";
import { SavedMaterial } from "./components/canvas-members/data";

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

  //Move control members
  private triggerActive: string = '';
  private needUpdate: boolean = false;
  private bookshelfActive: boolean = false;
  private mainTableActive: boolean = false;
  private photoActive: boolean = false;
  private freeMode: boolean = true;


  //Target Mesh Arrays
  private bookshelf: Array<THREE.Mesh> = [];
  private mainTable: Array<THREE.Mesh> = [];
  private photo: Array<THREE.Mesh> = [];

  //Intersects
  private intersectsStatus: boolean = false;
  private mainTableIntersects: Array<THREE.Intersection> = [];
  private bookshelfIntersects: Array<THREE.Intersection> = [];
  private photoIntersects: Array<THREE.Intersection> = [];

  //Material Container
  private materialContainer: any = {};


  // private animateCube() {
  //   this.cube.rotation.x += this.rotationSpeedX;
  //   this.cube.rotation.y += this.rotationSpeedY;
  // }

  public onMouseMove(event: MouseEvent): void {
      this.mouse.x = (event.clientX / this.sizes.width) * 2 - 1;
      this.mouse.y = - (event.clientY / this.sizes.height) * 2 + 1;
  }

  public onClick(event: MouseEvent): void {
    console.log(this.triggerActive, this.photoActive)
    switch(this.triggerActive)
    {
      case ControlEnum.TABLE_MOVE:
        this.toTable();
        break;
      case ControlEnum.BOOKSHELF_MOVE:
        this.toBooks();
        break;
      case ControlEnum.PHOTO_MOVE:
        this.toPhoto();
        break;
    }
  }

  private toPhoto(): void {
    if (!this.photoActive)
    {
      this.toggleRaycasterActive(false, ControlEnum.PHOTO_MOVE);
      this.updateMaterial(this.photo, this.materialContainer[TextureEnum.PHOTO]);
      this.camera.rotation.x = 0;
      gsap.to(this.camera.position, {
        duration: 1,
        z: 20
      });
      gsap.to(this.camera.rotation, {
        duration: 1,
        y: Math.PI / 2
      });
    }
    else if (this.photoActive && !this.freeMode)
    {
      this.control.enabled = true;
      this.camera.rotation.x = 0;
      gsap.to(this.camera.rotation, {
        duration: 1,
        y: -(Math.PI / 2)
      });
      gsap.to(this.camera.position, {
        duration: 1,
        z: 95
      });
      gsap.delayedCall(1.5, () =>
      {
        this.toggleRaycasterActive(true, '');
      });
    }
  }

  private toTable(): void {
    console.log('toTable')
    // gsap.to(this.camera.position, {
    //   duration: 1,
    //   z: 1,
    //   y: 17
    // })
  }

  private toBooks(): void {
    console.log('toBooks')
  }

  public createScene(scene: THREE.Scene, canvas: ElementRef, activeMeshes: any, materialContainer: any): void {
    this.scene = scene;
    this.canvas = canvas;

    //*Targets
    this.bookshelf = activeMeshes[TextureEnum.BOOKSHELF];
    this.mainTable = activeMeshes[TextureEnum.MAIN_TABLE];
    this.photo = activeMeshes[TextureEnum.PHOTO];

    //Material Container
    this.materialContainer = materialContainer;


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

    //*Controls
    this.control = new OrbitControls(this.camera, this.canvas);
    this.control.maxDistance = this.maxDistance;
    this.control.enablePan = this.enablePan;
    this.control.minAzimuthAngle = this.minAzimuthAngle;
    this.control.maxAzimuthAngle = this.maxAzimuthAngle;
    this.control.minPolarAngle = this.minPolarAngle
    this.control.maxPolarAngle = this.maxPolarAngle;

    this.startRenderingLoop();
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private updateMaterial(array: any, arrMaterial: any): void {
    for (const object of array)
    {
      object.material = arrMaterial;
    }

    this.needUpdate = false;
  }

  private toggleRaycasterActive(isActive: boolean, trigger: string): void {
    if (isActive)
    {
      this.freeMode = true;
      this.bookshelfActive = false;
      this.mainTableActive = false;
      this.photoActive = false;
      this.triggerActive = '';
    }
    else
    {
      this.triggerActive = '';
      this.freeMode = false;
      this.bookshelfActive = true;
      this.mainTableActive = true;
      this.photoActive = true;
      this.control.reset();
      this.control.enabled = false;
      this.camera.updateProjectionMatrix()
      gsap.delayedCall(1.5, () => {
        this.triggerActive = trigger;
      })
    }
  }

  private backToStandardMesh(): void {
    if (!this.mainTableIntersects.length  && this.needUpdate && this.triggerActive === ControlEnum.TABLE_MOVE)
    {
      this.updateMaterial(this.mainTable, this.materialContainer[TextureEnum.MAIN_TABLE]);
    }
    else if (this.bookshelf.length && this.needUpdate && this.triggerActive === ControlEnum.BOOKSHELF_MOVE)
    {
      this.updateMaterial(this.bookshelf, this.materialContainer[TextureEnum.BOOKSHELF]);
    }
    else if (this.photo.length && this.needUpdate && this.triggerActive === ControlEnum.PHOTO_MOVE)
    {
      this.updateMaterial(this.photo, this.materialContainer[TextureEnum.PHOTO]);
    }
  }

  private triggerMeshByCursor(): void {
    if (this.mainTableIntersects.length && !this.mainTableActive)
    {
      this.triggerActive = ControlEnum.TABLE_MOVE;
      this.needUpdate = true;
      for (const object of this.mainTable)
      {
        object.material = this.materialContainer[TextureEnum.MAIN_TABLE_ACTIVE];
      }
    }

    else if (this.bookshelfIntersects.length && !this.bookshelfActive)
    {
      this.triggerActive = ControlEnum.BOOKSHELF_MOVE;
      this.needUpdate = true;
      for (const object of this.bookshelf)
      {
        object.material = this.materialContainer[TextureEnum.BOOKSHELF_ACTIVE];
      }
    }

    else if (this.photoIntersects.length && !this.photoActive)
    {
      this.triggerActive = ControlEnum.PHOTO_MOVE;
      this.needUpdate = true;
      for (const object of this.photo)
      {
        object.material = this.materialContainer[TextureEnum.PHOTO_ACTIVE];
      }
    }
    else if (!this.mainTableActive && !this.bookshelfActive && !this.photoActive)
    {
      this.triggerActive = '';
    }
  }

  private startRenderingLoop() {
    //* Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    // this.renderer.outputEncoding = THREE.sRGBEncoding

    //Create meshes array

    let self: SceneService = this;
    (function tick() {
      self.raycaster.setFromCamera(self.mouse, self.camera);

      self.mainTableIntersects = self.raycaster.intersectObjects(self.mainTable);
      self.photoIntersects = self.raycaster.intersectObjects((self.photo));
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
