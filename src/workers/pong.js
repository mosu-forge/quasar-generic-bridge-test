import { BridgeWebworker, Broker } from 'bridge'

class Pong {

  receive(message) {
  }

  receivePromise(message, resolve, reject) {
    if(message === 'someone asked me ping or pong, do you know?') {
      Broker.sendPromise('PingOrPongComponent', 'everyone is asking ping or pong?').then(result => {
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
Broker.registerReceiver('PingOrPongComponent', 'MyNamedBridge')

// Register a local receiver
Broker.registerReceiver('WorkerPong', new Pong())
