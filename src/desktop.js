import {
  THREE
} from 'three'
import Pubsub from './pubsub'

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
    const channel = '123'; // String(Date.now())

    this.pubsub = new Pubsub()
    this.pubsub.subscribe(channel, message => this.onUpdate(message))
      .then(() => console.log(`connect to ${channel}`))

    this.camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000)
    this.camera.position.x = 400
    this.camera.position.z = 400
    this.camera.position.y = 400
    this.camera.lookAt(new Vector3(-1, -1, -1))

    this.scene = new Scene()

    this.cube = new CubeMesh(200, 200, 200)
    this.cube.rotation.order = 'ZXY'
    this.scene.add(this.cube)

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

  onUpdate(message) {
    if (message.orientation) {
      let {
        alpha,
        beta,
        gamma
      } = message.orientation
      this.cube.rotation.x = beta * Math.PI / 180
      this.cube.rotation.y = gamma * Math.PI / 180
      this.cube.rotation.z = alpha * Math.PI / 180
    } else {
      console.log(message)
    }
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
