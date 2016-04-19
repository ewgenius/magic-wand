import Pubnub from 'pubnub'
import Bacon from 'baconjs'

export default class Pubsub {
  constructor() {
    this.pubnub = new Pubnub({
      publish_key: 'pub-c-e0b788e5-deaa-44f9-8f6e-a5e97fe3b6cf',
      subscribe_key: 'sub-c-c825c9b2-0666-11e6-a5b5-0619f8945a4f',
      ssl: (('https:' == document.location.protocol) ? true : false)
    })
  }

  subscribe(channel) {
    let stream = Bacon.fromBinder(sink => {
      this.pubnub.subscribe({
        channel,
        message: sink
      })
      return () => this.pubnub.unsubscribe({
        channel
      })
    })
    return stream
  }

  publish(channel, message) {
    return new Promise(resolve => {
      this.pubnub.publish({
        channel: channel,
        message: message,
        callback: m => resolve(m)
      })
    })
  }
}
