import { BridgeWebworker, Broker } from 'bridge'
import { Notify } from 'quasar'

class WorkerHandler {

  /* These are the only two functions a receiver must implement */
  receive(message) {
    console.log('worker-hander got message ', message)
    switch(message.action) {
        case 'notify':
          Notify.create('Found prime: ' + message.number)
          break
        case 'notifyofrestart':
          Notify.create('Reached limit, resarting')
          break
    }
  }

  receivePromise(message, resolve, reject) {
    console.log('worker-hander got messagePromise ', message)
    resolve()
  }

  /* These functions are helper methods (not required or part of any spec)
     and simply help to send messages to the webworker */
  start() {
    Broker.send('WorkerRemote', { action: 'start' })
  }

  pause() {
    Broker.send('WorkerRemote', { action: 'pause' })
  }

  restart() {
    Broker.send('WorkerRemote', { action: 'restart' })
  }

  getPrimes() {
    // Returning the promise from the broker here
    return Broker.sendPromise('WorkerRemote', { action: 'getprimes' })
  }
}

export default ({ Vue }) => {

  // Create a new instance of the above class
  const handler = new WorkerHandler()

  // Register a local receiver
  Broker.registerReceiver('WorkerHandler', handler)

  // Store reference to the above class for components
  // Could also be exporting it from the boot module
  Vue.prototype.$worker = handler

  // Create a webworker and a bridge to it
  const worker = new Worker('../workers/worker', { type: 'module' })
  const bridge = new BridgeWebworker(worker)

  // Register a bridge for this webworker
  Broker.registerBridge('MyBridgeForWebWorker', bridge)

  // Register a remote receiver
  Broker.registerReceiver('WorkerRemote', 'MyBridgeForWebWorker')

  // We can register another receiver across the same bridge to the same webworker
  // This would allow the webworker to route messages to different parts of code
  // This named_target is not used, but is shown as an example
  Broker.registerReceiver('WorkerRemote2', 'MyBridgeForWebWorker')

}
