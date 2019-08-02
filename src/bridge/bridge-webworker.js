import { BridgeBase, Broker } from '.'

export default class BridgeWebworker extends BridgeBase {
  constructor(target) {
    super()
    this.target = target
    this.target.addEventListener('message', (event) => {
      if(event.target === this.target && event.data.type && event.data.type === 'QUASAR_BRIDGE') {
        this.receive(event.data)
      }
    }, false)
  }
  send(target_name, uid, message) {
    this.target.postMessage({
      type: 'QUASAR_BRIDGE',
      target_name,
      uid,
      message
    })
  }
  receive({ target_name, uid, message, status }) {
    if(uid && status) {
      Broker.receivePromise(target_name, uid, message, status)
    } else {
      Broker.receive(target_name, message)
    }
  }
}
