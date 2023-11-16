import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import * as THREE from "three"
import MaterialLib from "./materialLib"

class FormModel {
  modelLoader: GLTFLoader
  form3Model: THREE.Object3D
  mainScene?: THREE.Scene

  constructor() {
    this.bind()
    this.modelLoader = new GLTFLoader()
    this.form3Model = new THREE.Object3D
  }

  extractMaterialName(inputString: string) {
    // Regular expression to match the string between <>
    const regex = /<(.*?)>/;

    // Use the regex to find the match
    const match = inputString.match(regex);

    // Check if there is a match and return the captured group (string between symbols)
    return match ? match[1] : null;
  }

  init(scene: THREE.Scene) {
    this.mainScene = scene

    this.modelLoader.load("/3d/lowpolyform3v3.glb", (glb: GLTF) => {
      console.log(glb)

      glb.scene.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          const matName = this.extractMaterialName(child.name)
          child.material = MaterialLib.materials.find(mat => mat.name === matName) || new THREE.MeshNormalMaterial
        }
        if (child.name === "form3") {
          this.form3Model = child
          child.position.y = .3
        }
      })
      this.mainScene?.add(glb.scene)
    })
  }

  update() {
    this.form3Model.position.y = (Math.sin(Date.now() * 0.001) + 1) * 0.1;
  }

  bind() {

  }
}

const _singleton = new FormModel
export default _singleton