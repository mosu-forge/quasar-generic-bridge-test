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
      if(status === 'RESOLVE') {
        Broker.resolvePromise(uid, message)
      } else {
        Broker.rejectPromise(uid, message)
      }
    } else if(uid) {
      Broker.sendPromise(target_name, message).then(message => {
        this.target.postMessage({
          type: 'QUASAR_BRIDGE',
          uid,
          message,
          status: 'RESOLVE'
        })
      }).catch(error => {
        this.target.postMessage({
          type: 'QUASAR_BRIDGE',
          uid,
          message,
          status: 'REJECT'
        })
      })
    } else {
      Broker.send(target_name, message)
    }
  }
}
