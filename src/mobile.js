import Pubnub from 'pubnub'

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
  }

  static main() {
    const app = new Application()
    app.start()
  }
}

Application.main()
