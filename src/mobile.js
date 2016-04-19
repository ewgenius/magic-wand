import Pubsub from './pubsub'
import Bacon from 'baconjs'

class Application {
  start() {
    this.channel = location.search.split('n=')[1]
    this.connected = false
    this.pubsub = new Pubsub()
    this.pubsub.publish(this.channel, {
        type: 'connected'
      })
      .then()

    if (window.DeviceOrientationEvent) {
      let stream = Bacon
        .fromEvent(window, 'deviceorientation')
        .throttle(100)
      stream.onValue(v => this.tilt(v.alpha, v.beta, v.gamma))
    }
  }

  tilt(alpha, beta, gamma) {
    if (this.pubsub)
      this.pubsub.publish(this.channel, {
        type: 'update',
        orientation: {
          alpha,
          beta,
          gamma
        }
      })
  }

  static main() {
    const app = new Application()
    app.start()
  }
}

Application.main()
