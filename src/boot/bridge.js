import { Broker } from 'bridge'

export default ({ Vue }) => {
  window.broker = Vue.prototype.$q.broker = Broker
}
