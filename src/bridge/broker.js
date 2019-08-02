import { BridgeBase } from '.'
import { uid } from './utils'
// import Vue from 'vue'

class Broker {
  constructor() {
    this.receivers = new Map()
    this.promises = new Map()
    this.bridges = new Map()
  }

  /* Bridge Functions */
  registerBridge(bridge_name, bridge) {
    if(this.bridges.has(bridge_name)) {
      throw new Error(`Bridge ${bridge_name} already exists`)
    }
    if(!(bridge instanceof BridgeBase)) {
      throw new Error(`Bridge ${bridge_name} does not inherit BridgeBase`)
    }
    if(!this.validateBridge(bridge)) {
      throw new Error(`Bridge ${bridge_name} does not implement correct functions`)
    }
    this.bridges.set(bridge_name, bridge)
  }

  deregisterBridge(bridge_name) {
    if(!this.bridges.has(target_name)) {
      throw new Error(`Bridge ${bridge_name} does not exist`)
    }
    this.bridges.delete(bridge_name)
  }

  getBridge(bridge_name) {
    if(!this.bridges.has(bridge_name)) {
      throw new Error(`Bridge ${bridge_name} does not exist`)
    }
    return this.bridges.get(bridge_name)
  }

  validateBridge(bridge) {
    return typeof bridge.send === 'function'
  }

  compareBridge(bridge_name, bridge) {
    if(!this.bridges.has(bridge_name)) {
      return false
    }
    return bridge === this.bridges.get(bridge_name)
  }

  /* Receiver Functions */
  registerReceiver(target_name, target) {
    if(this.receivers.has(target_name)) {
      throw new Error(`Target ${target_name} already exists`)
    }
    if(typeof target === 'string' || target instanceof String) {
      if(!this.bridges.has(target)) {
        throw new Error(`Bridge ${target_name} does not exist`)
      }
      this.receivers.set(target_name, {
        bridge: this.bridges.get(target),
        type: 'remote'
      })
    } else if(target instanceof BridgeBase) {
      if(!this.validateBridge(target)) {
        throw new Error(`Bridge ${target_name} does not implement correct functions`)
      }
      this.receivers.set(target_name, {
        bridge: target,
        type: 'remote'
      })
    } else if(target._isVue) { // or if(target instanceof Vue)
      if(!this.validateReceiver(target)) {
        throw new Error(`Target ${target_name} does not implement correct functions`)
      }
      this.receivers.set(target_name, {
        target: target,
        type: 'vue'
      })
    } else {
      if(!this.validateReceiver(target)) {
        throw new Error(`Target ${target_name} does not implement correct functions`)
      }
      this.receivers.set(target_name, {
        target,
        type: 'local'
      })
    }
  }

  deregisterReceiver(target_name) {
    if(!this.receivers.has(target_name)) {
      throw new Error(`Target ${target_name} does not exist`)
    }
    this.receivers.delete(target_name)
  }

  getReceiver(target_name) {
    if(!this.receivers.has(target_name)) {
      throw new Error(`Target ${target_name} does not exist`)
    }
    return this.receivers.get(target_name)
  }

  validateReceiver(target) {
    return typeof target.receive === 'function' && typeof target.receivePromise === 'function'
  }

  compareReceiver(target_name, target) {
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

  listReceivers() {
    return this.receivers.keys()
  }

  send(target_name, message) {
    if(!this.receivers.has(target_name)) {
      throw new Error(`Target ${target_name} does not exist`)
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
        throw new Error(`Target ${target_name} does not exist`)
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

  resolvePromise(promise_uid, message) {
    if(!this.promises.has(promise_uid)) {
      throw new Error('Invalid or expired promise')
    }
    const promise = this.promises.get(promise_uid)

    promise[0](message) // calls the stored resolve()
    this.promises.delete(promise_uid)
  }

  rejectPromise(promise_uid, message) {
    if(!this.promises.has(promise_uid)) {
      throw new Error('Invalid or expired promise')
    }
    const promise = this.promises.get(promise_uid)

    promise[1](message) // calls the stored reject()
    this.promises.delete(promise_uid)
  }
}

export default new Broker()
