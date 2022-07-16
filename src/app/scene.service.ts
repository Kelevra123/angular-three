import { ElementRef, Injectable, ViewChild } from "@angular/core";
import * as THREE from "three";
import { LoadingService } from "./loading.service";

@Injectable()
export class SceneService {
  public cameraZ: number = 95;
  public cameraX: number = 0;
  public cameraY: number = 18;
  public cameraRotateX = 6.1;
  public fieldOfView: number = 38;
  public nearClippingPlane: number = 0.1;
  public farClippingPlane: number = 1000;


  private camera!: THREE.PerspectiveCamera;

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;
  private canvas: any = null

  // private animateCube() {
  //   this.cube.rotation.x += this.rotationSpeedX;
  //   this.cube.rotation.y += this.rotationSpeedY;
  // }

  public createScene(scene: THREE.Scene, canvas: any): void {
    this.scene = scene
    // scene.remove(plug)
    this.canvas = canvas
    // this.scene.add(this.cube);
    let aspectRatio = this.getAspectRatio()
    //*Camera
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPlane,
      this.farClippingPlane
    )
    this.camera.position.set(this.cameraX, this.cameraY, this.cameraZ)
    this.camera.rotation.x = this.cameraRotateX
    this.camera.updateProjectionMatrix()
    this.startRenderingLoop()
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(1);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    // this.renderer.outputEncoding = THREE.sRGBEncoding

    let service: SceneService = this;
    (function render() {
      requestAnimationFrame(render);
      // service.animateCube();
      service.renderer.render(service.scene, service.camera);
    }());
  }
}
