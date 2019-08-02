import { BridgeWebworker, Broker } from 'bridge'

class WorkerPrimeHandler {
  constructor() {
    const worker = new Worker('../workers/prime/worker.js', { type: 'module' })
    const bridge = new BridgeWebworker(worker)

    // Register a bridge for this webworker
    Broker.registerBridge('MyBridgeForPrimeWebWorker', bridge)

    // Register a remote receiver
    Broker.registerReceiver('WorkerPrimeRemote', 'MyBridgeForPrimeWebWorker')

    // You could also register another named_target to the same webworker over the same bridge
    // In this case the webworker may route the message to another piece of code
    // Broker.registerReceiver('WorkerPrimeRemoteSomeOtherName', 'MyBridgeForPrimeWebWorker')

    this.worker = worker
  }

  /* These are the only two functions a receiver must implement */
  receive(message) {
    console.log('worker-prime-hander got message ', message)
  }

  receivePromise(message, resolve, reject) {
    console.log('worker-prime-hander got messagePromise ', message)
    resolve()
  }

  /* These functions are helper methods (not required or part of any spec)
     and simply help to send messages to the webworker */
  restart() {
    Broker.send('WorkerPrimeRemote', { action: 'restart' })
  }

  getHighestPrime() {
    // Returning the promise from the broker here
    return Broker.sendPromise('WorkerPrimeRemote', { action: 'highest' })
  }
}

export default ({ Vue }) => {
  const handler = new WorkerPrimeHandler()

    // Register a local receiver
  Broker.registerReceiver('WorkerPrimeHandler', handler)

  Vue.prototype.$prime = handler
}
