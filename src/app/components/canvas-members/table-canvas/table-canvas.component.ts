import { Component, OnInit } from '@angular/core';
import * as THREE from 'three'
import { LoadingService } from "../../../loading.service";
import { MeshBasicMaterial } from "three";
import { HelperEnum } from "../../helper.enum";

@Component({
  selector: '.table-canvas',
  templateUrl: './table-canvas.component.html',
  styleUrls: ['./table-canvas.component.scss']
})
export class TableCanvasComponent implements OnInit {
  //Path
  private tableTexturePath: string = '../../assets/table/mainTable.jpg';
  private tableGltf: string = '../../assets/table/mainTable.glb';
  private emisTexturePath: string = '../../assets/table/emisText.jpg'
  private pcTexturePath: string = '../../assets/table/pc.jpg';
  private gltfPc: string = '../../assets/table/pc2.glb';

  //Materials
  private tableMaterial: THREE.MeshBasicMaterial = new THREE.MeshBasicMaterial();
  private PCMaterial: THREE.MeshBasicMaterial = new MeshBasicMaterial();

  //Textures
  private tableTexture: THREE.Texture = new THREE.Texture();
  private PCTexture: THREE.Texture = new THREE.Texture();
  private emisTableTexture: THREE.Texture = new THREE.Texture;

  constructor(
    private readonly _loadingService: LoadingService
  ) { }

  ngOnInit(): void {
  //   this.tableTexture = this._loadingService.textureLoader.load(this.tableTexturePath);
  //   this.tableTexture.flipY = false;
  //   this.tableMaterial.map = this.tableTexture;
  //   this.tableTexture.name = 'normalTableTexture'
  //   this._loadingService.addToTexture(this.tableTexture);
  //
  //   this.PCTexture = this._loadingService.textureLoader.load(this.pcTexturePath);
  //   this.PCTexture.flipY = false;
  //   this.PCMaterial.map = this.PCTexture;
  //
  //   this.emisTableTexture = this._loadingService.textureLoader.load(this.emisTexturePath);
  //   this.emisTableTexture.flipY= false;
  //   this.emisTableTexture.name = 'emisTableTexture'
  //   this._loadingService.addToTexture(this.emisTableTexture);
  //
  //
  //   this._loadingService.gltfLoader.load(this.tableGltf,
  //     (gltf) =>
  //   {
  //       gltf.scene.traverse((child: THREE.Mesh | any) =>
  //       {
  //         if (child.type === HelperEnum.MESH)
  //         {
  //           child.material = this.tableMaterial;
  //           this._loadingService.addToScene(child);
  //         }
  //       })
  //   })
  //   this._loadingService.gltfLoader.load(this.gltfPc,
  //     (gltf) =>
  //     {
  //       gltf.scene.traverse((child: THREE.Mesh | any) =>
  //       {
  //         if (child.type === HelperEnum.MESH)
  //         {
  //           child.material = this.PCMaterial;
  //           this._loadingService.addToScene(child);
  //         }
  //       })
  //     })
  }

}
