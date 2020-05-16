export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({ ...initialState }, { type: '__INIT__' })
    let listeners = []

    const subscribe = (fn) => {
        listeners.push(fn)

        return {
            unsubscribe() {
                listeners = listeners.filter(l => l !== fn)
            }
        }
    }

    const dispatch = (action) => {
        state = rootReducer(state, action)
        listeners.forEach(listener => listener(state))
    }

    const getState = () => JSON.parse(JSON.stringify(state))

    return { subscribe, dispatch, getState }
}