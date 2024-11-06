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

        this.#bindUtils()

        UtilsConfig.instance = this

        return this
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
        this.currentUtil = util
        this.currentUtilType = util.dataset.type
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
                const index = parseInt(key, 10) - 1  // Convert to 0-based index
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

    /**
     * Get the current active tool's type.
     * 
     * @returns {string} The type of the currently active tool.
     */
    getCurrentUtilType() {
        return this.currentUtilType
    }
}
