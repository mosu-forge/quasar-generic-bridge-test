import EventEmitter from "events"

export default class Bridge extends EventEmitter {
    constructor() {
        super()
        this.id = 0
        this.promises = new Map()
        self.addEventListener("message", (event) => {
            if(event.data.type && event.data.type == "P_MESSAGE_MAIN") {
                this.receive(event.data)
            }
        }, false)
    }
    receive(data) {
        switch(data.subtype) {
            case "PROMISE_MAIN":
                if(data.id && this.promises.has(data.id)) {
                    if(data.status == "RESOLVE") {
                        this.promises.get(data.id)[0](data.message)
                    } else {
                        this.promises.get(data.id)[1](data.message)
                    }
                    this.promises.delete(data.id)
                }
                break
            case "PROMISE_RENDER":
                if(data.id) {
                    new Promise((resolve, reject) => {
                        this.emit("messagePromise", resolve, reject, data.message)
                    }).then(message => {
                        try {
                            this.postMessage({ type: "P_MESSAGE_RENDER", subtype: "PROMISE_RENDER", status: "RESOLVE", id: data.id, message })
                        } catch(error) {
                            message = { error: error.message }
                            this.postMessage({ type: "P_MESSAGE_RENDER", subtype: "PROMISE_RENDER", status: "REJECT", id: data.id, message })
                        }
                    }).catch(message => {
                        try {
                            this.postMessage({ type: "P_MESSAGE_RENDER", subtype: "PROMISE_RENDER", status: "REJECT", id: data.id, message })
                        } catch(error) {
                            message = { error: error.message }
                            this.postMessage({ type: "P_MESSAGE_RENDER", subtype: "PROMISE_RENDER", status: "REJECT", id: data.id, message })
                        }
                    })
                }
                break
            case "TRANSMIT":
                this.emit("message", data.message)
                break
        }
    }
    send(message) {
        this.postMessage({ type: "P_MESSAGE_RENDER", subtype: "TRANSMIT", message })
    }
    sendPromise(message) {
        return new Promise((resolve, reject) => {
            const id = ++this.id % Number.MAX_SAFE_INTEGER
            this.promises.set(id, [resolve, reject])
            this.postMessage({ type: "P_MESSAGE_RENDER", subtype: "PROMISE_MAIN", id, message })
        })
    }
    postMessage(data) {
        let transfer = null
        if(data.message.transfer) {
            transfer = data.message.transfer
            delete data.message.transfer
        }
        postMessage(data, transfer)
    }
}
