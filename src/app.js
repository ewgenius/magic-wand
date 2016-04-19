import {
  THREE
} from 'three'

const Scene = THREE.Scene
const PerspectiveCamera = THREE.PerspectiveCamera
const Mesh = THREE.Mesh
const WebGLRenderer = THREE.WebGLRenderer
const MeshBasicMaterial = THREE.MeshBasicMaterial
const BoxGeometry = THREE.BoxGeometry
const Vector3 = THREE.Vector3

class CubeMesh extends Mesh {
  constructor(x, y, z) {
    let geometry = new BoxGeometry(x, y, z)
    let material = new MeshBasicMaterial({})
    super(geometry, material)
  }
}

class Application {
  start() {
    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
    this.camera.position.x = 400
    this.camera.position.z = 400
    this.camera.position.y = 400
    this.camera.lookAt(new Vector3(-1, -1, -1))
    console.log(this.camera)

    this.scene = new Scene()

    let cube = new CubeMesh(200, 200, 200)
    this.scene.add(cube)

    this.renderer = new WebGLRenderer()
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)
    window.addEventListener('resize', () => this.onWindowResize())
    this.loop()
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  loop() {
    requestAnimationFrame(() => this.loop())
    this.renderer.render(this.scene, this.camera)
  }

  static main() {
    const app = new Application()
    app.start()
  }
}

Application.main()
