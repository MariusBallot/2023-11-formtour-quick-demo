import * as THREE from "three"

interface MaterialNode {
  targetMat: string,
  url?: string,
}

const materialNodes: MaterialNode[] = [
  { targetMat: "black-plastic", url: "/3d/textures/plastic-black.png" },
  { targetMat: "orange-plastic", url: "/3d/textures/plastic-orange.png" },
  { targetMat: "floor", url: "/3d/textures/floor-texture-bake.png" },
  { targetMat: "alu" },
  { targetMat: "black-alu" },
]


class MaterialLib {
  materials: THREE.Material[]
  texLoader: THREE.TextureLoader
  private static instance: MaterialLib | null = null;


  constructor() {
    this.materials = []
    this.texLoader = new THREE.TextureLoader
  }

  loadMaterials() {
    materialNodes.forEach((matNode: MaterialNode) => {
      switch (matNode.targetMat) {
        case "black-plastic":
          const blackMatcap = matNode.url ? this.texLoader.load(matNode.url) : null;
          if (blackMatcap) blackMatcap.colorSpace = THREE.SRGBColorSpace

          this.materials.push(new THREE.MeshMatcapMaterial({
            matcap: blackMatcap,
            name: matNode.targetMat
          }))
        case "floor":
          this.materials.push(new THREE.MeshBasicMaterial({
            map: matNode.url ? this.texLoader.load(matNode.url) : null,
            name: matNode.targetMat
          }))
        case "orange-plastic":
          this.materials.push(new THREE.MeshPhysicalMaterial({
            roughness: 0,
            transmission: 1,
            color: 0xFF6109,
            thickness: 0.01, // Add refraction!
            name: matNode.targetMat
          }))
      }

    });
  }

  public static getInstance(): MaterialLib {
    if (!MaterialLib.instance) {
      MaterialLib.instance = new MaterialLib();
    }
    return MaterialLib.instance;
  }
}

const _instance = MaterialLib.getInstance();
export default _instance;