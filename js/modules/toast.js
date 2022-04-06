const DEFAULT_OPTIONS = {
    position: "top-right",
    autoClose: 1000,
    onClose: () => {},
    canClose: true,
    showProgress: true,
    pauseOnHover: false,
    pauseOnFocusLoss: false
}

class Toast {
    #toastElem
    #autoCloseInterval
    #progressInterval
    #timeVisible = 0
    #autoClose
    #isPaused = false
    #shouldUnPause
    
    constructor(options) {
        this.#toastElem = document.createElement("div")
        this.#toastElem.classList.add("toast")
        requestAnimationFrame(() => {this.#toastElem.classList.add("show")})

        this.update({...DEFAULT_OPTIONS, ...options})
    }

    set text(value) {
        this.#toastElem.textContent = value
    }

    set canClose(value) {
        this.#toastElem.classList.toggle("closible", value)
        if (value) {
            this.#toastElem.addEventListener("click", this.remove.bind(this))
        } else {
            this.#toastElem.removeEventListener("click", this.remove.bind(this))
        }
    }

    set position(value) {
        const currentContainer = this.#toastElem.parentElement
        const selector = `.toast-container[data-position="${value}"]`
        const container = document.querySelector(selector) || createContainer(value)
        container.append(this.#toastElem)
        if (currentContainer == null || currentContainer.hasChildNodes()) return
        currentContainer.remove()
    }

    set autoClose(value) {
        this.#autoClose = value
        if (value) {
            let lastTime
            const func = time => {
                if (this.#shouldUnPause) {
                    lastTime = null
                    this.#shouldUnPause = false
                }
                if (lastTime == null) {
                    lastTime = time
                    this.#autoCloseInterval = requestAnimationFrame(func)
                    return
                }
                if (!this.#isPaused) {
                    this.#timeVisible += time - lastTime
                    if (this.#timeVisible >= this.#autoClose) {
                        this.remove()
                        return
                    }
                }

                lastTime = time
                this.#autoCloseInterval = requestAnimationFrame(func)
            }

            this.#autoCloseInterval = requestAnimationFrame(func)
        }
    }

    set showProgress(value) {
        this.#toastElem.classList.toggle("progress", value)
        this.#toastElem.style.setProperty("--progress", 1)
    
        if (value) {
            const func = () => {
            if (!this.#isPaused) {
                this.#toastElem.style.setProperty(
                    "--progress",
                    1 - this.#timeVisible / this.#autoClose
                )
            }
            this.#progressInterval = requestAnimationFrame(func)
        }
            this.#progressInterval = requestAnimationFrame(func)
        }
    }

    set pauseOnHover(value) {
        if (value) {
            this.#toastElem.addEventListener("mouseover", () => (this.#isPaused = true))
            this.#toastElem.addEventListener("mouseleave", () => (this.#isPaused = false))
        } else {
            this.#toastElem.removeEventListener("mouseover", () => (this.#isPaused = true))
            this.#toastElem.removeEventListener("mouseleave", () => (this.#isPaused = false))
        }
    }
    
    set pauseOnFocusLoss(value) {
        if (value) {
            document.addEventListener("visibilitychange", () => {this.#shouldUnPause = document.visibilityState === "visible"})
        } else {
            document.removeEventListener("visibilitychange", () => {this.#shouldUnPause = document.visibilityState === "visible"})
        }
    }

    update(options) {
        Object.entries(options).forEach(([key, value]) => {
            this[key] = value
        })
    }
    
    remove() {
        cancelAnimationFrame(this.#autoCloseInterval)
        cancelAnimationFrame(this.#progressInterval)
        const container = this.#toastElem.parentElement
        this.#toastElem.classList.remove("show")
        this.#toastElem.addEventListener("transitionend", () => {
            this.#toastElem.remove()
            if (!container.hasChildNodes()) container.remove()
        })
        this.onClose()
    }
}

function createContainer(position) {
    const container = document.createElement("div")
    container.classList.add("toast-container")
    container.dataset.position = position
    document.body.append(container)
    return container
}

export default function createToast(options) {
    return new Toast(options)
}