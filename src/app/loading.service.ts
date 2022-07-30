import { ElementRef, Injectable } from "@angular/core";
import * as THREE from 'three';
import { SceneService } from "./scene.service";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { HelperEnum } from "./components/helper.enum";
import {
  GltfData,
  meshData,
  PhotoData,
  photoData,
  SavedMaterial, videoData
} from "./components/canvas-members/data";
import { MeshBasicMaterial } from "three";

@Injectable()
export class LoadingService {
  private meshContainer: Array<THREE.Object3D> = [];
  private materialContainer: SavedMaterial | any = {};
  private videoContainer: any = {};

  //Screens
  loadingScreen: any;
  viewScreen: any;

  //_Data
  private data: Array<GltfData> = [];
  private photoData: Array<PhotoData> = [];
  private videoData: any = null;
  public listener: Array<any> = [];

  private activeMeshes: any = {}

  private _scene: THREE.Scene = new THREE.Scene();
  private _canvas: any = null;

  private _loadingManager = new THREE.LoadingManager(
    () => {
      console.log('ready')
      this.sceneReady();
    },
    (itemUri: string, itemLoaded: number, total: number) => {},
  );

  private readonly _textureLoader: any = null;
  private readonly _gltfLoader: any = null;
  private readonly _dracoLoader: any = null;

  public get textureLoader() : THREE.TextureLoader {
    return this._textureLoader;
  }

  public get gltfLoader(): GLTFLoader {
    return this._gltfLoader;
  }

  public get loadingManager () {
    return this._loadingManager;
  }

  public get scene(): THREE.Scene {
    return this._scene;
  }

  setLoadingScreen(loading: ElementRef) {
    this.loadingScreen = loading;
  }

  setViewScreen(view: ElementRef) {
    this.viewScreen = view;
  }

  setListener(component: any) {
    this.listener.push(component);
  }

  constructor(
    private _sceneService: SceneService
  ) {
    this._textureLoader = new THREE.TextureLoader(this._loadingManager);
    this._gltfLoader = new GLTFLoader(this._loadingManager);
    this._dracoLoader = new DRACOLoader();
    this._dracoLoader.setDecoderPath('../../assets/draco/');
    this._gltfLoader.setDRACOLoader(this._dracoLoader);
  }

  public start(isDesktop: boolean) : void {
    if (isDesktop) {
      this.data = meshData;
      this.photoData = photoData;
      this.videoData = videoData;
      this.loadMeshData();
      this.loadPhotoData();
      this.loadVideoData();
    }
    else {
      this.nonDesktopVersion();
    }
  }

  private loadMeshData(): void {
    this.data.forEach((obj: GltfData): void => {
        const texture = this.textureLoader.load(obj.texture);
        texture.flipY = false;

        const material: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial({ map: texture })

        if (obj.textureName) {
          material.name = obj.textureName
          this.addToMaterial(material, obj.textureName)
        }
        if (obj.gltf.length !== 0)
        {
          this.gltfLoader.load(obj.gltf,
            (gltf): void => this.fetchChildFromGLTF(gltf, material, obj));
        }
    });
  }

  private loadPhotoData(): void {
    // Combine Materials
    const photoMaterials: any = {};

    this.photoData.forEach((data: any) =>
    {
      const matContainer: any = {}

      for (let key in data.texture) {
        const currentTexture = this.textureLoader.load(data.texture[key]);
        currentTexture.flipY = false;

        const currentMaterial = new MeshBasicMaterial({map: currentTexture});
        matContainer[key] = currentMaterial;
      }

      photoMaterials[data.id] = matContainer;
    });

    // Add materials to gltf
    this.photoData.forEach(data => {

      this.gltfLoader.load(data.gltf,
        (gltf): void => {
          gltf.scene.traverse((child: THREE.Mesh | any) => {

            if (child.type === HelperEnum.MESH)
            {
              const name = child.name;
              child.material = photoMaterials[data.id][name];

              this.addToScene(child);
            }

          });
        });

    })
  }

  private loadVideoData(): void {
    this.videoData.forEach((data: any) => {
      this.gltfLoader.load(data.gltf,
        (gltf) => {
          gltf.scene.traverse(child => {
            if (child.type === HelperEnum.MESH) {
              this.videoContainer[data.id] = child;
            }
          });
        });
    });
  }

  public encodeVideoToTexture(videoElement: ElementRef, key: string): void {
    let videoTexture = new THREE.VideoTexture(videoElement.nativeElement);
    videoTexture.minFilter = THREE.NearestFilter;
    videoTexture.magFilter = THREE.NearestFilter;
    videoTexture.flipY = false;
    const videoMaterial = new THREE.MeshBasicMaterial( {map: videoTexture} );

    this.addToMaterial(videoMaterial, key);
  }

  public canvas(canvas: any) : void {
    this._canvas = canvas;
  }

  public fetchChildFromGLTF(gltf: GLTF, material: THREE.MeshBasicMaterial, obj?: GltfData): void {
    if (obj?.handleMeshes && obj?.textureName)
    {
      this.activeMeshes[obj.textureName] = [];
    }

    gltf.scene.traverse((child: THREE.Mesh | any): void => {
      if (child.type === HelperEnum.MESH)
      {
        child.material = material;

        if (obj?.handleMeshes && obj?.textureName)
        {
          this.activeMeshes[obj.textureName].push(child);
        }

        this.addToScene(child);
      }
    });
  }

  public addToScene(mesh: THREE.Object3D): void {
    this.meshContainer.push(mesh);
  }

  public addToMaterial(texture: THREE.MeshBasicMaterial, key: string): void {
    this.materialContainer[key] = texture;
  }

  public sceneReady(): void {
    this.loadingScreen.nativeElement.classList.add('dn');
    this.viewScreen.nativeElement.classList.remove('dn');
    this.listener.forEach(component => component.onSceneLoad(true));
    this.meshContainer.forEach(mesh => this._scene.add(mesh));
    this._sceneService.createScene(this.scene, this._canvas, this.activeMeshes, this.materialContainer, this.videoContainer);
  }

  public getMaterialByKey(key: string): THREE.MeshBasicMaterial | undefined {
    return this.materialContainer[key];
  }

  public nonDesktopVersion(): void {
    this.loadingScreen.nativeElement.classList.add('dn');
    this.viewScreen.nativeElement.classList.remove('dn');
    this.listener.forEach(component => component.onSceneLoad(false));
  }

}
