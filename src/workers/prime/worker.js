import { BridgeWebworker, Broker } from 'bridge'

class MyWorkerReceiver {

  constructor() {

  }

  receive(message) {
    console.log('worker-prime-remote got message ', message)
  }

  receivePromise(message, resolve, reject) {
    console.log('worker-prime-remote got messagePromise ', message)
    resolve()
  }
}

// Create a bridge back to the main Vue instance
const bridge = new BridgeWebworker(self)

// Register the bridge to the main Vue instance
Broker.registerBridge('MyNamedBridge', bridge)

// Register a remote receiver
Broker.registerReceiver('WorkerPrimeHandler', 'MyNamedBridge')

// Register a local receiver
Broker.registerReceiver('WorkerPrimeRemote', new MyWorkerReceiver())
