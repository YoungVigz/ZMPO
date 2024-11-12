/**
 * UtilsConfig Singleton Class
 * 
 * This singleton class manages the configuration and state of the toolbar settings.
 * It ensures only one instance of UtilsConfig exists across the application,
 * allowing centralized access and modification of toolbar properties.
 *
 * Responsibilities:
 * - Store information about each tool in the toolbar, including its type and current state.
 * - Provide methods to switch between tools based on user interactions (click or keyboard).
 * - Keep track of the active tool and its type.
 *
 * Usage:
 * - The only instance of UtilsConfig is accessible via `UtilsConfig.getInstance()`.
 * - To modify the active tool, use `changeUtil` internally; do not call it directly from outside.
 */

export class UtilsConfig {
    static instance = null
    utils = []
    currentUtil = null
    currentUtilType = null
    
    utilsSettings = document.querySelector(".utils-settings")

    observers = []

    /**
     * Constructor
     * Initializes the UtilsConfig with a list of DOM elements (utils) and binds event listeners.
     * 
     * @param {NodeList} utilsList - List of DOM elements representing tools in the toolbar.
     */
    constructor(utilsList) {
        if (UtilsConfig.instance) {
            return UtilsConfig.instance
        }

        utilsList.forEach((util, i) => {
            this.utils.push({
                index: i + 1,
                util,
                type: util.dataset.type ? util.dataset.type : undefined
            })
        })

        this.currentUtil = this.utils[0].util
        this.currentUtilType = this.utils[0].type

        const penSettings = this.utilsSettings.querySelector("#pen")
        penSettings.classList.add("active-settings")

        this.#bindUtils()

        UtilsConfig.instance = this

        return this
    }


    /**
     * Adds an observer to the observers list
     * @param {Function} observer - The function that will be called whenever `currentUtilType` changes.
     */
    addObserver(observer) {
        this.observers.push(observer)
    }

    /**
     * Notifies all observers of the change in `currentUtilType`.
     */
    #notifyObservers() {
        this.observers.forEach(observer => observer(this.currentUtilType))
    }

     /**
     * Toggles the visibility of settings for the currently selected tool.
     * 
     * This method iterates over all child elements of `utilsSettings` to find 
     * the element corresponding to `currentUtilType`. It removes the "active-settings" 
     * class from any previously active settings and applies it to the matching 
     * child element based on `currentUtilType`. This ensures that only the 
     * settings for the active tool are visible in the toolbar.
     */
    #makeUtilSettingsVisible() {
        const childs = this.utilsSettings.children

        for(let i = 0; i < childs.length; i++) {
            if(childs[i].classList.contains("active-settings")) {
                childs[i].classList.remove("active-settings")
            }

            if(childs[i].id == `${this.currentUtilType}`) {
                childs[i].classList.add("active-settings")
            }
        }
    }

    /**
     * Change the currently active tool in the toolbar.
     * This function is private and should not be called from outside the class.
     * 
     * @param {HTMLElement} util - The DOM element of the new tool to be set as active.
     */
    #changeUtil(util) {
        this.currentUtil.classList.remove('util-select')
        util.classList.add('util-select')

        let lastType = this.currentUtilType
        this.currentUtil = util
        this.currentUtilType = util.dataset.type

        if(lastType != this.currentUtilType) {
            this.#makeUtilSettingsVisible()
            this.#notifyObservers()
        }
    }

    /**
     * Bind event listeners for click and keyboard interactions.
     * This function is private and should not be called from outside the class.
     */
    #bindUtils() {
        this.utils.forEach(uObj => {
            const util = uObj.util
            util.addEventListener('click', () => this.#changeUtil(util))
        })

        document.addEventListener('keydown', (event) => {
            const key = event.key

            if (key >= '1' && key <= `${this.utils.length}`) {
                const index = parseInt(key, 10) - 1
                const util = this.utils[index].util
                this.#changeUtil(util)
            }
        })
    }

    /**
     * Static method to get the singleton instance of the UtilsConfig class.
     * 
     * @returns {UtilsConfig} The single instance of UtilsConfig.
     */
    static getInstance() {
        if (!UtilsConfig.instance) {
            throw new Error('UtilsConfig has not been initialized. Please create an instance first.')
        }
        return UtilsConfig.instance
    }
}
