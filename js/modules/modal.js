const DEFAULT_OPTIONS = {
    onClose: () => {},
    buttons: [],
    title: "",
    content: ""
}

const DEFAULT_BTN_OPTIONS = {
    type: "default"
}

export class Button {
    constructor(options) {
        Object.entries({...DEFAULT_BTN_OPTIONS, ...options}).forEach(([key, value]) => {
            this[key] = value
        })
    }
}
class Modal {
    #modal
    #options

    constructor(options) {
        const modalContainer = document.createElement("div")
        modalContainer.classList.add("modal-container")

        this.#modal = document.createElement("div")
        this.#modal.classList.add("modal")
        const close = document.createElement("div")
        close.classList.add("modal-close")
        close.textContent = "×"
        this.#modal.append(close)
        modalContainer.append(this.#modal)

        close.addEventListener("click", () => {this.close()})

        this.#options = {...DEFAULT_OPTIONS, ...options}
        this.update(this.#options)
        document.body.append(modalContainer)
    }

    setTitle(value) {
        const title = document.createElement("div")
        title.classList.add("modal-title")
        title.textContent = value
        this.#modal.append(title)
    }

    setContent(value) {
        const content = document.createElement("div")
        content.classList.add("modal-content")
        if (typeof this.#options["buttons"] !== "undefined" && this.#options["buttons"] !== []) content.classList.add("with-buttons")
        content.textContent = value
        this.#modal.append(content)
    }
    
    setButtons(value) {
        if (value !== []) {
            const buttons = document.createElement("div")
            buttons.classList.add("modal-buttons")
            Object.entries(value).forEach(([key, value]) => {
                let btn = document.createElement("div")
                btn.classList.add("btn")
                if (value.type !== "default") btn.classList.add(value.type)
                btn.textContent = value.text
                btn.id = value.id
                buttons.append(btn)
            })
            this.#modal.append(buttons)
        }
    }

    update(options) {
        this.setTitle(options['title'])
        this.setContent(options['content'])
        this.setButtons(options['buttons'])
    }

    close() {
        const container = this.#modal.parentElement
        this.#modal.classList.remove("show")
        this.#modal.addEventListener("transitionend", () => {
            this.#modal.remove()
            container.remove()
        })
        this.#options['onClose']()
    }
}

export function createModal(options){
    return new Modal(options)
}