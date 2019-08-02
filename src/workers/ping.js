import { BridgeWebworker, Broker } from 'bridge'

class Ping {

  receive(message) {
  }

  receivePromise(message, resolve, reject) {
    if(message === 'do we have ping or pong?') {
      Broker.sendPromise('WorkerPong', 'someone asked me ping or pong, do you know?').then(result => {
        resolve(result)
      }).catch(error => {
        reject(error)
      })
    } else {
      reject()
    }
  }
}

// Create a bridge back to the main Vue instance
const bridge = new BridgeWebworker(self)

// Register the bridge to the main Vue instance
Broker.registerBridge('MyNamedBridge', bridge)

// Register a remote receiver
Broker.registerReceiver('WorkerPong', bridge)

// Register a local receiver
Broker.registerReceiver('WorkerPing', new Ping())
