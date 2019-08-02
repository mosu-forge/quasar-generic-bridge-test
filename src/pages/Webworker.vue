<template>
<q-page>
    <q-card class="q-ma-md">
        <q-card-section>
            <div class="text-h6">Webworker as a sender/receiver</div>
            <p>This example registers two receivers: a webworker named <code>WorkerPrimeRemote</code>, and an es6 class that is injected at <code>Vue.prototype.$prime</code> named <code>WorkerPrimeHandler</code>.</p>
            <p>The webworker will compute prime numbers. When it finds a prime, it will send a message to <code>WorkerPrimeHandler</code>. This page has controls that will use <code>sendPromise</code> to get the highest prime found, and a control that will use <code>send</code> to tell the webworker to restart from zero.</p>
        </q-card-section>
    </q-card>
    <q-card class="q-ma-md">
        <q-card-section>
            <div class="text-h6">Actions</div>
            <q-btn @click="restart">restart</q-btn>
            <q-btn @click="getHighestPrime()">getHighest</q-btn>
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
    restart() {
      this.$prime.restart()
    },
    getHighestPrime() {
      this.$prime.getHighestPrime().then(prime => {
        this.$q.notify('Highest prime: ' + prime)
      }).catch(error => {
        this.$q.notify('Error: ' + error)
      })
    }
  }
}
</script>

<style>
</style>
