export class Page {
    constructor (params) {
        this.params = params
    }

    getRoot() {
        throw new Error('Method "getRoot" shoold be implemented')
    }

    afterRender() {

    }

    destroy() { }
}