<template>
<q-page>
    <q-card class="q-ma-md">
        <q-card-section>
            <div class="text-h6">Component as a receiver</div>
            <p>This example registers a component as a receiver, and sends messages from this page to the component.</p>
            <p>This is a simplified example, because the component is a child of this page, but it does not have to be. The message sender could be anywhere in the frontend codebase, or even the electron main process or a webworker.</p>
            <p>The receiver component must define two methods <code>receive(message)</code> and <code>receivePromise(message, resolve, reject)</code>, and register itself with the broker.</p>
        </q-card-section>
    </q-card>
    <q-card class="q-ma-md">
        <q-card-section>
            <div class="text-h6">Send message</div>
            <q-btn @click="sendMessage('foo')">foo</q-btn>
            <q-btn @click="sendMessage('bar')">bar</q-btn>
            <q-btn @click="sendMessage('baz')">baz</q-btn>
        </q-card-section>
        <q-card-section>
            <div class="text-h6">Send messagePromise</div>
            <q-btn @click="sendMessagePromise('resolveMe')">resolveMe</q-btn>
            <q-btn @click="sendMessagePromise('rejectMe')">rejectMe</q-btn>
        </q-card-section>
        <q-card-section>
            <div class="text-h6">Actions</div>
            <q-btn @click="sendMessage('clear')">clear log</q-btn>
            <q-btn @click="sendMessage('deregisterYourself')">tell component to deregister itself</q-btn>
        </q-card-section>
    </q-card>
    <q-card class="q-ma-md">
        <q-card-section>
            <component-receiver />
        </q-card-section>
    </q-card>
</q-page>
</template>

<style>
</style>

<script>
import ComponentReceiver from 'components/component-receiver'
export default {
  name: 'PageSecondary',
  methods: {
    sendMessage(message) {
      try {
        this.$q.broker.send('MyComponent', message)
      } catch(error) {
        this.$q.notify('Error sending message! ' + error)
      }
    },
    sendMessagePromise(message) {
      this.$q.broker.sendPromise('MyComponent', message).then(() => {
        this.$q.notify('Message was resolved!')
      }).catch(error => {
        this.$q.notify('Message was rejected! ' + error)
      })
    }
  },
  components: {
    ComponentReceiver
  }
}
</script>
