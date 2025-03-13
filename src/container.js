export default class Container { 
    subscribers = new Set()
    constructor(data) {
        this.data = data()
    }
    notify() {
        for( const sub of this.subscribers ) {
            sub(this.data)
        }
    }
}