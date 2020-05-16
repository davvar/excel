import { isEqual } from "./utils"

export class StoreSubscriber {
    constructor (store) {
        this.store = store
        this.sub = null
        this.prevState = {}
    }

    subscribeComponents(components) {
        this.prevState = this.store.getState()

        this.sub = this.store.subscribe(state => {
            Object.entries(state).forEach(([key, value]) => {
                if (!isEqual(this.prevState[key], state[key])) {
                    components.forEach(component => {
                        if (component.isWatching(key)) {
                            component.storeChanged({ [key]: value })
                        }
                    })
                }
            })

            this.prevState = this.store.getState()
        })
    }

    unsubscribeFromStore() {
        this.sub.unsubscribe()
    }

}