import Pubsub from './pubsub'

class Application {
  start() {
    this.channel = location.search.split('n=')[1]
    this.connected = false
    this.pubsub = new Pubsub()
    this.pubsub.publish(this.channel, {
        type: 'connected'
      })
      .then()

    if (window.DeviceOrientationEvent)
      window.addEventListener('deviceorientation', e => this.tilt(e.alpha, e.beta, e.gamma), false)
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
