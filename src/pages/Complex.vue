<template>
<q-page>
    <q-card class="q-ma-md">
        <q-card-section>
            <div class="text-h6">Complex example</div>
            <p>This example is convoluted on purpose. First on the Vue side, two webworkers are created: <code>Ping</code> and <code>Pong</code>. Then, a bridge to each is created: <code>BridgePing</code> and <code>BridgePong</code>. Finally, a remote target to each worker: <code>WorkerPing</code> and <code>WorkerPong</code>.</p>

            <p>In the webworker <code>Ping</code>, a remote target is created called <code>WorkerPong</code> and targets back over the bridge to Vue. Because Vue already has a named target called <code>WorkerPong</code>, when <code>Ping</code> sends a message to <code>WorkerPong</code>, it will travel over <code>BridgePing</code> to Vue, and then be automatically forwarded by the Vue broker over <code>BridgePong</code> to worker <code>Pong</code>.</p>

            <p>Since that is still not convoluted enough, the worker <code>Pong</code> sets a remote target to the Vue component with the radio buttons below. When you click the "ping or pong" button, this page will send a messagePromise to target <code>WorkerPing</code>, which will send a messagePromise to <code>WorkerPong</code> that travels across both bridges, and finally worker <code>Pong</code> will send a messagePromise to the Vue component asking if we should return "ping" or "pong". The promises will all resolve back to this page which will show a notification with your choice. Of course this all could be done without any of the webworkers or remote targets, but this example shows how the broker is able to route complex messages.</p>

        </q-card-section>
    </q-card>
    <q-card class="q-ma-md">
        <q-card-section>
            <div class="text-h6">Set Ping or Pong</div>
            <component-ping-or-pong />
        </q-card-section>
    </q-card>
    <q-card class="q-ma-md">
        <q-card-section>
            <div class="text-h6">Actions</div>
            <q-btn @click="checkPingOrPong()">check ping or pong</q-btn>
        </q-card-section>
    </q-card>
</q-page>
</template>

<script>
import ComponentPingOrPong from 'components/component-ping-or-pong'
export default {
  name: 'PageComplex',
  methods: {
    checkPingOrPong() {
      this.$q.broker.sendPromise('WorkerPing', 'do we have ping or pong?').then(result => {
        this.$q.notify(result)
      }).catch(error => {
      })
    }
  },
  components: {
    ComponentPingOrPong
  }
}
</script>

<style>
</style>
