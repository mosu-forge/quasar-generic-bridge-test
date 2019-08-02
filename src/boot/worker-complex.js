import { BridgeWebworker, Broker } from 'bridge'

export default () => {

  // Create two webworkers, two bridges, and a named target for each

  const worker_ping = new Worker('../workers/ping', { type: 'module' })
  const worker_pong = new Worker('../workers/pong', { type: 'module' })

  const bridge_ping = new BridgeWebworker(worker_ping)
  const bridge_pong = new BridgeWebworker(worker_pong)

  Broker.registerBridge('BridgePing', bridge_ping)
  Broker.registerBridge('BridgePong', bridge_pong)

  Broker.registerReceiver('WorkerPing', 'BridgePing')
  Broker.registerReceiver('WorkerPong', 'BridgePong')

}
