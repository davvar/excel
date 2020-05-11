class Dom {
    constructor (selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.innerHTML
    }

    get data() {
        return this.$el.dataset
    }

    clear() {
        this.html('')
        return this
    }

    on(event, callback) {
        this.$el.addEventListener(event, callback)
    }

    off(event, callback) {
        this.$el.removeEventListener(event, callback)
    }

    append(node) {
        if (node instanceof Dom) node = node.$el
        this.$el.append(node)

        return this
    }

    closest(selector) {
        /* 
         * wrapping with function because closest returns 
        *  html element but we need instance od dom to 
        *  continue chaining
        */
        return $(this.$el.closest(selector))
    }

    getCoordinates() {
        return this.$el.getBoundingClientRect()
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    css(styles = {}) {
        Object.entries(styles)
            .forEach(([prop, value]) => this.$el.style[prop] = value)
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, clases = "") => {
    const el = document.createElement(tagName)
    if (clases) {
        el.classList.add(clases)
    }
    return $(el)
}

