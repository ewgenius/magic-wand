import {
  THREE
} from 'three'
import Pubnub from 'pubnub'

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
    this.pubnub = new Pubnub({
      publish_key: 'pub-c-e0b788e5-deaa-44f9-8f6e-a5e97fe3b6cf',
      subscribe_key: 'sub-c-c825c9b2-0666-11e6-a5b5-0619f8945a4f'
    })
    console.log('Subscribing..');
    this.pubnub.subscribe({
      channel: 'hello_world',
      message: (message, envelope, channelOrGroup, time, channel) => console.log(`
        Message Received.
        Channel or Group: ${JSON.stringify(channelOrGroup)}
        Channel: ${JSON.stringify(channel)}
        Message: ${JSON.stringify(message)}
        Time: ${time}
        Raw Envelope: ${JSON.stringify(envelope)}
        `),
      connect: () => {
        console.log(`Since we're publishing on subscribe connectEvent, we're sure we'll receive the following publish.`)
        this.pubnub.publish({
          channel: 'hello_world',
          message: 'Hello from PubNub Docs!',
          callback: m => console.log(m)
        })
      }
    })

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
