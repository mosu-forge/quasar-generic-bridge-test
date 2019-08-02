<template>
<div>
    <p>Component Receiver: </p>
    <ul>
        <li v-for="message in messages">
            {{ message }}
        </li>
    </ul>
</div>
</template>

<script>
export default {
  name: 'ComponentReceiver',
  data () {
    return {
      messages: []
    }
  },
  created () {
    this.$q.broker.registerReceiver('MyComponent', this)

    // this check is optional, but if you want to be sure nobody has
    // removed your receiver and added their own, you can check this
    if(this.$q.broker.compareReceiver('MyComponent', this)) {
      this.messages.push('Correctly registered receiver')
    } else {
      this.messages.push('This is not the receiver you\'re looking for')
    }
  },
  destroyed () {
    try {
      this.$q.broker.deregisterReceiver('MyComponent')
    } catch(error) {
    }
  },
  methods: {
    receive(message) {
      this.messages.push('component-receiver got message ' + message)
      switch(message) {
          case 'clear':
            this.messages = []
            break
          case 'deregisterYourself':
            this.$q.broker.deregisterReceiver('MyComponent')
            break
      }
    },
    receivePromise(message, resolve, reject) {
      this.messages.push('component-receiver got messagePromise ' + message)
      if(message === 'resolveMe') {
        resolve()
      } else {
        reject('I\'m programmed to reject this')
      }
    }
  }
}
</script>

<style>
</style>
