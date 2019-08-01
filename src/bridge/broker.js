import { BridgeBase } from '.'
import { uid } from 'quasar'
import Vue from 'vue'

class Broker {
  constructor() {
    this.receivers = new Map()
    this.promises = new Map()
  }

  registerReceiver(target_name, target) {
    if(this.receivers.has(target_name)) {
      throw new Error('Named target already exists')
    }
    if(target.prototype instanceof BridgeBase) {
      this.receivers.set(target_name, {
        bridge: target,
        type: 'remote'
      })
    } else if(target instanceof Vue) {
      this.receivers.set(target_name, {
        target: target,
        type: 'vue'
      })
     } else {
      this.receivers.set(target_name, {
        target,
        type: 'local'
      })
    }
  }

  deregisterReceiver(target_name) {
    if(!this.receivers.has(target_name)) {
      throw new Error('Named target does not exist')
    }
    this.receivers.delete(target_name)
  }

  validateReceiver(target_name, target) {
    if(!this.receivers.has(target_name)) {
      return false
    }
    const receiver = this.receivers.get(target_name)

    if(receiver.type === 'remote') {
      return receiver.bridge === target
    } else if(receiver.type === 'vue') {
      return receiver.target === target
    } else if(receiver.type === 'local') {
      return receiver.target === target
    }
  }

  send(target_name, message) {
    if(!this.receivers.has(target_name)) {
      throw new Error('Named target does not exist')
    }
    const receiver = this.receivers.get(target_name)

    if(receiver.type === 'remote') {
      receiver.bridge.send(target_name, null, message)
    } else if(receiver.type === 'vue') {
      receiver.target.receive(message)
    } else if(receiver.type === 'local') {
      receiver.target.receive(message)
    }
  }

  sendPromise(target_name, message) {
    return new Promise((resolve, reject) => {
      if(!this.receivers.has(target_name)) {
        throw new Error('Named target does not exist')
      }
      const receiver = this.receivers.get(target_name)
      const promise_uid = uid()

      if(receiver.type === 'remote') {
        this.promises.set(promise_uid, [resolve, reject])
        receiver.bridge.send(target_name, promise_uid, message)
      } else if(receiver.type === 'vue') {
        receiver.target.receivePromise(message, resolve, reject)
      } else if(receiver.type === 'local') {
        receiver.target.receivePromise(message, resolve, reject)
      }
    })
  }

  receive(target_name, message) {
    if(!this.receivers.has(target_name)) {
      throw new Error('Named target does not exist')
    }
    const receiver = this.receivers.get(target_name)

    if(receiver.type === 'remote') {
      receiver.bridge.send(target_name, null, message)
    } else if(receiver.type === 'vue') {
      receiver.target.receive(message)
    } else if(receiver.type === 'local') {
      receiver.target.receive(message)
    }
  }

  receivePromise(target_name, uid, message, status) {
    if(!this.receivers.has(target_name)) {
      throw new Error('Named target does not exist')
    }
    if(!this.promises.has(uid)) {
      throw new Error('Invalid or expired promise')
    }
    const promise = this.promises.get(uid)

    // if(receiver.type === 'remote') {
    // } else if(receiver.type === 'vue') {
    // } else if(receiver.type === 'local') {
    // }

    if(status === 'RESOLVE') {
      promise[0](message) // calls the stored resolve()
    } else {
      promise[1](message) // calls the stored reject()
    }
  }
}

export default new Broker()
