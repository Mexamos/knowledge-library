export default class Store {
    constructor(updateState, state) {
        this._updateState = updateState
        this._state = state
        this._callbacks = []
    }

    get state() {
        return this._state
    }

    update(action) {
        this._state = this._updateState(this._state, action)
        this._callbacks.forEach(calback => calback())
    }

    subscribe(calback) {
        this._callbacks.push(calback)
        return () => this._callbacks = this._callbacks.filter(cb => cb !== calback)
    }
}