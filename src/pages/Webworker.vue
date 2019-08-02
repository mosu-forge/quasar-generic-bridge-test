<template>
<q-page>
    <q-card class="q-ma-md">
        <q-card-section>
            <div class="text-h6">Webworker as a sender/receiver</div>
            <p>This example registers two receivers: a webworker named <code>WorkerRemote</code>, and an es6 class that is injected at <code>Vue.prototype.$worker</code> named <code>WorkerHandler</code>.</p>
            <p>The webworker will compute prime numbers. When it finds a prime, it will send a message to <code>WorkerHandler</code>. This page has controls that will use <code>sendPromise</code> to get the highest prime found, and a control that will use <code>send</code> to tell the webworker to restart from zero.</p>
        </q-card-section>
    </q-card>
    <q-card class="q-ma-md">
        <q-card-section>
            <div class="text-h6">Actions</div>
            <q-btn @click="start()">start</q-btn>
            <q-btn @click="pause()">pause</q-btn>
            <q-btn @click="restart">restart</q-btn>
            <q-btn @click="getPrimes()">number found</q-btn>
        </q-card-section>
    </q-card>
    <q-card class="q-ma-md">
        <q-card-section>

        </q-card-section>
    </q-card>
</q-page>
</template>

<script>
export default {
  name: 'PageWebworker',
  methods: {
    start() {
      this.$worker.start()
    },
    pause() {
      this.$worker.pause()
    },
    restart() {
      this.$worker.restart()
    },
    getPrimes() {
      this.$worker.getPrimes().then(primes => {
        this.$q.notify('Number of primes found: ' + primes.length)
      }).catch(error => {
        this.$q.notify('Error: ' + error)
      })
    }
  }
}
</script>

<style>
</style>
