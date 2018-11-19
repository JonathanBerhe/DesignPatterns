const obj = {
    hello: () => 'Hello'
}

// Proxy pattern: Object Composition
function createSafeProxy(subject) {

    // copy 'subject' properties
    const proto = Object.getPrototypeOf(subject)

    // 'Constructor' that copies 'subject' object
    const Proxy = (subject) => this.subject = subject

    // inheritance the prototype
    Proxy.prototype = Object.create(proto)

    // proxied method: overload
    Proxy.prototype.hello = () => (this.subject.hello() + ' world')

    return new Proxy(subject)
}

// unsafe method: we are using the 'subject.prototype.hello' instead of 'subject.hello'
const createProxy = (subject) => { return { hello: () => (subject.prototype.hello + ' world') } }


// Proxy pattern: Monkey patching
function monkeyProxy(subject) {
    const method = subject.hello
    // override subjects method
    subject.hello = () => (method.call(this) + ' world')
    return subject
}

module.exports = createSafeProxy, createProxy, monkeyProxy