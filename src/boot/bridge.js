import { Broker } from 'bridge'

export default ({ Vue }) => {
  Vue.prototype.$q.broker = Broker
}
