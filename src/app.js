import {THREE} from 'three'

class Application {
  start() {
    console.log('started')
  }

  static main() {
    const app = new Application()
    app.start()
  }
}

Application.main()
