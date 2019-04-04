export function createStore(reduser, initialState) {
    let state = initialState
    let callbacks = []

    const getState = () => state

    const dispath = action => {
        state = reduser(state, action)
        callbacks.forEach(callback => callback())
    }

    const subscribe = callback => {
        callbacks.push(callback)
        return () => callbacks.filter(cb => cb !== callback)
    }

    return {
        getState,
        dispath,
        subscribe
    }
}