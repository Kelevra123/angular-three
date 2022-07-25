import * as THREE from 'three'
import { TextureEnum } from "../helper.enum";

export type GltfData = {
  gltf: string,
  texture: string,
  textureName?: string,
  handleMeshes?: boolean,
  photoPosition?: number
};

export type PhotoData = {
    id: string
    gltf: string,
    texture: {}
};


export type SavedMaterial = {
  string: THREE.MeshBasicMaterial
};

export type ActiveMeshes = {
  string: Array<THREE.Mesh>
};

export const photoData: Array<PhotoData>  = [
  {
    id: 'wallPhoto',
    gltf: '../assets/photo/photo.glb',
    texture: {
      photo1: '../assets/photo/photo1.jpg',
      photo2: '../assets/photo/photo2.jpg',
      photo3: '../assets/photo/photo3.jpg',
      photo4: '../assets/photo/photo4.jpg',
      photo5: '../assets/photo/photo5.jpg',
      photo6: '../assets/photo/photo6.jpg',
      photo7: '../assets/photo/photo7.jpg',
      photo8: '../assets/photo/photo8.jpg',
      photo9: '../assets/photo/photo9.jpg',
      photo10: '../assets/photo/photo10.jpg',
      photo11: '../assets/photo/photo11.jpg',
      photo12: '../assets/photo/photo12.jpg',
      photo13: '../assets/photo/photo13.jpg',
    }
  }
];

export const meshData: Array<GltfData> = [
  {gltf: '../assets/walls/frontWall3.glb', texture: '../assets/walls/frontWalle.jpg'},
  {gltf: '../assets/walls/sideWalls.glb', texture: '../assets/walls/sideWallse.jpg'},
  {gltf: '../assets/curtains/curtains.glb', texture: '../assets/curtains/curtains.jpg'},
  {gltf: '../assets/table/pc2.glb', texture: '../assets/table/pc.jpg'},
  {gltf: '../assets/floor/floor1.glb', texture: '../assets/floor/newFloor1.jpg'},
  {gltf: '../assets/floor/floor2.glb', texture: '../assets/floor/newFloor2.jpg'},
  {gltf: '../assets/decor/vase.glb', texture: '../assets/decor/vase.jpg'},
  {gltf: '../assets/decor/coffeeTable.glb', texture: '../assets/decor/coffeeTable.jpg'},
  {gltf: '../assets/decor/sofa.glb', texture: '../assets/decor/sofa.jpg'},
  {gltf: '../assets/decor/window.glb', texture: '../assets/decor/window.jpg'},
  {gltf: '../assets/decor/car.glb', texture: '../assets/decor/carDream4.jpg'},
  {gltf: '../assets/decor/gamedev.glb', texture: '../assets/decor/gamedev.jpg'},
  {gltf: '../assets/decor/guitDream.glb', texture: '../assets/decor/guitDream.jpg'},
  {gltf: '../assets/decor/house.glb', texture: '../assets/decor/houseDream.jpg'},
  {gltf: '../assets/decor/ny.glb', texture: '../assets/decor/nyDream.jpg'},
  {gltf: '../assets/decor/rightWalla.glb', texture: '../assets/decor/rightWalla.jpg'},
  {gltf: '../assets/bookshelf/otherBooks.glb', texture: '../assets/bookshelf/otherBooks.jpg'},
  {gltf: '../assets/bookshelf/bookClear.glb', texture: '../assets/bookshelf/bookClean.jpg'},
  {gltf: '../assets/bookshelf/bookMicro.glb', texture: '../assets/bookshelf/bookMicro.jpg'},
  {gltf: '../assets/bookshelf/bookRef.glb', texture: '../assets/bookshelf/bookReff.jpg'},
  {gltf: '../assets/bookshelf/bookWork.glb', texture: '../assets/bookshelf/bookWork.jpg'},
  {gltf: '../assets/bookshelf/garry.glb', texture: '../assets/bookshelf/GarryP.jpg'},
  {gltf: '../assets/bookshelf/bookshelf.glb', texture: '../assets/bookshelf/bookshelf.jpg', handleMeshes: true, textureName: TextureEnum.BOOKSHELF},
  {gltf: '', texture: '../assets/bookshelf/bookshelfActive.jpg', textureName: TextureEnum.BOOKSHELF_ACTIVE},
  {gltf: '../assets/table/bTable.glb', texture: '../assets/table/bTable.jpg', handleMeshes: true, textureName: TextureEnum.MAIN_TABLE},
  {gltf: '', texture: '../assets/table/emisText.jpg', textureName: TextureEnum.MAIN_TABLE_ACTIVE},
  {gltf: '../assets/photo/photoWex.glb', texture: '../assets/photo/photoWex.jpg', handleMeshes: true, textureName: TextureEnum.PHOTO},
  {gltf: '', texture: '../assets/photo/photoWexEmis.jpg', textureName: TextureEnum.PHOTO_ACTIVE},
];

export const videoData = [
  {gltf: '../assets/video/videoLaptop.glb', id: TextureEnum.LAPTOP_VIDEO},
  {gltf: '../assets/video/videoPC.glb', id: TextureEnum.PC_VIDEO}
]
