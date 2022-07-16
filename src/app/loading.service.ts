import { AfterViewInit, ElementRef, Injectable, ViewChild } from "@angular/core";
import * as THREE from 'three'
import { SceneService } from "./scene.service";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { HelperEnum } from "./components/helper.enum";
import { GltfPath, meshData } from "./components/canvas-members/data";

@Injectable()
export class LoadingService {
  private meshContainer: Array<THREE.Object3D> = [];
  private textureContainer: Array<THREE.Texture | THREE.MeshBasicMaterial> = [];
  private data: any = null

  private _scene: THREE.Scene = new THREE.Scene();
  private _canvas: any = null;

  private _loadingManager = new THREE.LoadingManager(
    () => this.sceneReady(),
    (itemUri: string, itemLoaded: number, total: number) => {},
  )

  private readonly _textureLoader: any = null;
  private readonly _gltfLoader: any = null;
  private readonly _dracoLoader: any = null;

  public get textureLoader() : THREE.TextureLoader {
    return this._textureLoader
  }

  public get gltfLoader(): GLTFLoader {
    return this._gltfLoader
  }

  public get loadingManager () {
    return this._loadingManager;
  }

  public get scene(): THREE.Scene {
    return this._scene;
  }

  constructor(private _sceneService: SceneService) {
    this._textureLoader = new THREE.TextureLoader(this._loadingManager);
    this._gltfLoader = new GLTFLoader(this._loadingManager);
    this._dracoLoader = new DRACOLoader();
    this._dracoLoader.setDecoderPath('../../assets/draco/');
    this._gltfLoader.setDRACOLoader(this._dracoLoader);
    this.data = meshData
    this.loadMeshData();
  }

  private loadMeshData() {
    this.data.forEach((member: GltfPath) => {
      const texture = this.textureLoader.load(member.texture);
      texture.flipY = false;

      const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: texture })

      if (member.textureName) {
        material.name = member.textureName
        this.addToTexture(material)
      }

      this.gltfLoader.load(member.gltf,
        (gltf) => this.fetchChildFromGLTF(gltf, material))
    })
  }

  public canvas(canvas: any) : void {
    this._canvas = canvas;
  }

  public fetchChildFromGLTF(gltf: GLTF, material: THREE.MeshBasicMaterial): void {
    gltf.scene.traverse((child: THREE.Mesh | any) => {
      if (child.type === HelperEnum.MESH)
      {
        child.material = material;
        this.addToScene(child)
      }
    })
  }

  public addToScene(mesh: THREE.Object3D): void {
    this.meshContainer.push(mesh);
  }

  public addToTexture(texture: THREE.Texture | THREE.MeshBasicMaterial): void {
    this.textureContainer.push(texture);
  }

  public sceneReady(): void {
    this.meshContainer.forEach(mesh => this._scene.add(mesh));
    this._sceneService.createScene(this.scene, this._canvas);
  }

  public getTextureByName(textureName: string): THREE.Texture | THREE.MeshBasicMaterial | undefined {
    return this.textureContainer.find(texture => texture.name === textureName);
  }

}
