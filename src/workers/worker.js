import { BridgeWebworker, Broker } from 'bridge'

class MyWorkerReceiver {

  constructor() {
    this.primes = [2]
    this.n = 2
    this.started = false
    setInterval(() => {
      if(!this.started) {
        return
      }
      if(this.n === 1000) {
        Broker.send('WorkerHandler', { action: 'notifyofrestart' })
        this.n = 2
      }
      this.n++
      for(let i = 2; i < this.n; i++) {
        if(this.n % i === 0) {
          return
        }
      }
      this.primes.push(this.n)
      Broker.send('WorkerHandler', { action: 'notify', number: this.n })
    }, 1000)
  }

  start() {
    this.started = true
  }

  pause() {
    this.started = false
  }

  restart() {
    this.primes = [2]
    this.n = 2
  }

  receive(message) {
    console.log('worker-remote got message ', message)
    switch(message.action) {
        case 'start':
          this.start()
          break
        case 'pause':
          this.pause()
          break
        case 'restart':
          this.restart()
          break
    }
  }

  receivePromise(message, resolve, reject) {
    console.log('worker-remote got messagePromise ', message)
    if(message.action === 'getprimes') {
      resolve(this.primes)
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
Broker.registerReceiver('WorkerHandler', 'MyNamedBridge')

// Register a local receiver
Broker.registerReceiver('WorkerRemote', new MyWorkerReceiver())
