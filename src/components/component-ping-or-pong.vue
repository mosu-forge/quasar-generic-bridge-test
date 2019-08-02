<template>
<div>
    <div class="q-pa-md q-gutter-sm">
        <div class="q-gutter-sm">
            <q-radio dense v-model="pingorpong" val="ping" label="Ping" />
            <q-radio dense v-model="pingorpong" val="pong" label="Pong" />
        </div>
        <div class="q-px-sm q-pt-sm">
            Your selection is: <strong>{{ pingorpong }}</strong>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: 'ComponentPingOrPong',
  data () {
    return {
      pingorpong: 'ping'
    }
  },
  created () {
    this.$q.broker.registerReceiver('PingOrPongComponent', this)
  },
  destroyed () {
    this.$q.broker.deregisterReceiver('PingOrPongComponent')
  },
  methods: {
    receive(message) {
    },
    receivePromise(message, resolve, reject) {
      if(message === 'everyone is asking ping or pong?') {
        resolve(this.pingorpong)
      } else {
        reject()
      }
    }
  }
}
</script>

<style>
</style>
