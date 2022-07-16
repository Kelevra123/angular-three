export type GltfPath = {
  gltf: string,
  texture: string,
  textureName?: string,
}

export const meshData: Array<GltfPath> = [
  {gltf: '../assets/curtains/curtains.glb', texture: '../assets/curtains/curtains.jpg'}
]
