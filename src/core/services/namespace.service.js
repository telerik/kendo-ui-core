/**
 * Namespace Service
 *
 * Manages the data attribute namespace prefix used throughout Kendo UI.
 * This allows customization of data-role attributes (e.g., data-kendo-role instead of data-role).
 */
class NamespaceService {
    constructor() {
        this._ns = "";
    }
    /**
     * Get the current namespace prefix
     */
    get ns() {
        return this._ns;
    }
    /**
     * Set the namespace prefix
     * @param value - The namespace prefix (e.g., "kendo-")
     */
    setNs(value) {
        this._ns = value;
    }
}
export const namespaceService = new NamespaceService();
