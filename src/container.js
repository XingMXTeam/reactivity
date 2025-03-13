// 观察者模式
export default class Container { 
    subscribers = new Set()
    constructor(data) {
        this.data = data()
    }
    subscribe(fn) {
        this.subscribers.add(fn);
        return () => this.subscribers.delete(fn);
    }
    notify() {
        for( const sub of this.subscribers ) {
            sub(this.data)
        }
    }
}