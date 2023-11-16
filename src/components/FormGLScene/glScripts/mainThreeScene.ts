import * as THREE from "three"

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import RAF from '../../../utils/js/RAF'
import FormModel from './formModel'
import MaterialLib from './materialLib'

class MainThreeScene {
  private camera: THREE.PerspectiveCamera | undefined;
  private scene: THREE.Scene | undefined;
  private renderer: THREE.WebGLRenderer | undefined;
  private controls: OrbitControls | undefined;
  private static instance: MainThreeScene | null = null;


  constructor() {
    this.bind()
  }

  init(container: HTMLDivElement | null) {
    if (!container)
      return

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)


    //RENDERER SETUP
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.debug.checkShaderErrors = true
    container.appendChild(this.renderer.domElement)

    //MAIN SCENE INSTANCE
    this.scene = new THREE.Scene()

    //CAMERA AND ORBIT CONTROLLER
    this.camera.position.set(0, 2, 20)
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.target.set(0, 2, 0)
    this.camera.lookAt(0, 2, 0)
    this.controls.maxDistance = 1500
    this.controls.minDistance = 0

    MaterialLib.loadMaterials()
    FormModel.init(this.scene)

    const gridHelper = new THREE.GridHelper(10, 10);
    this.scene.add(gridHelper)


    //RENDER LOOP AND WINDOW SIZE UPDATER SETUP
    window.addEventListener("resize", this.resizeCanvas)
    RAF.subscribe('threeSceneUpdate', this.update)
  }

  update() {
    if (this.renderer && this.scene && this.camera) {

      this.renderer.render(this.scene, this.camera);
      FormModel.update()
    }
  }

  resizeCanvas() {
    if (this.renderer && this.scene && this.camera) {
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
    }
  }

  bind() {
    this.resizeCanvas = this.resizeCanvas.bind(this)
    this.update = this.update.bind(this)
    this.init = this.init.bind(this)
  }

  public static getInstance(): MainThreeScene {
    if (!MainThreeScene.instance) {
      MainThreeScene.instance = new MainThreeScene();
    }
    return MainThreeScene.instance;
  }
}

const _instance = MainThreeScene.getInstance()
export default _instance