import { Component, OnInit } from '@angular/core';
import { LoadingManager, MeshBasicMaterial } from "three";
import * as THREE from "three";
import { LoadingService } from "../../../loading.service";
import { HelperEnum } from "../../helper.enum";

@Component({
  selector: '.walls-canvas',
  templateUrl: './walls-canvas.component.html',
  styleUrls: ['./walls-canvas.component.scss']
})
export class WallsCanvasComponent implements OnInit {
  //Path
  private frontWallTexturePath: string = '../../assets/walls/frontWall.jpg';
  private frontWallGLFTPath: string = '../../assets/walls/frontWall.glb';
  private sideWallsTexturePath: string = '../../assets/walls/sideWalls.jpg';
  private sideWallsGLFTPath: string = '../../assets/walls/sideWalls.glb';

  //Materials
  private frontWallMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
  private sideWallsMaterial: THREE.MeshBasicMaterial = new MeshBasicMaterial();

  //Textures
  private frontWallTexture: THREE.Texture = new THREE.Texture();
  private sideWallsTexture: THREE.Texture = new THREE.Texture();

  constructor(
    private readonly _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.frontWallTexture = this._loadingService.textureLoader.load(this.frontWallTexturePath);
    this.frontWallTexture.flipY = false;
    this.frontWallMaterial.map = this.frontWallTexture;

    this.sideWallsTexture = this._loadingService.textureLoader.load(this.sideWallsTexturePath);
    this.sideWallsTexture.flipY = false;
    this.sideWallsMaterial.map = this.sideWallsTexture;

    this._loadingService.gltfLoader.load(this.frontWallGLFTPath,
      (gltf) => this._loadingService.fetchChildFromGLTF(gltf, this.frontWallMaterial))

    this._loadingService.gltfLoader.load(this.sideWallsGLFTPath,
      (gltf) => this._loadingService.fetchChildFromGLTF(gltf, this.sideWallsMaterial))
  }

}
