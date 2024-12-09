import "../kendo.core.js";

let $ = kendo.jQuery;

const LOADING = "k-loading",
      LOADER = "k-icon k-i-loading k-input-loading-icon",
      SELECTOR = "k-input-inner",
      INPUT_VALUES = "k-input-values",
      ARIA_BUSY = "aria-busy";

function initLoader() {
    const that = this;
    const loader = $("<span></span>").addClass(LOADER).attr("role", "presentation");
    that._loading = loader;

    that._showBusy = showBusy.bind(that);
    that._hideBusy = hideBusy.bind(that);
    that._toggleLoader = toggleLoader.bind(that);
    that._showBusyHandler = showBusyHandler.bind(that);
}

function toggleLoader(toggle) {
    const that = this;
    const loaderIsShown = that.wrapper.hasClass(LOADING);
    const inputValuesWrapper = that.wrapper.find(`.${INPUT_VALUES}`);
    const isMultiSelect = that.options.name.toLowerCase() === "multiselect";
    if (that._loading) {
        if (toggle && !loaderIsShown) {
            that.wrapper.addClass(LOADING);
            if (that._suffixContainer) {
                const separators = that.wrapper.find('.k-input-separator');
                $(separators[separators.length - 1]).before(that._loading);
            } else if (that._arrow) {
                that._arrow.before(that._loading);
            } else if (inputValuesWrapper.length > 0 && isMultiSelect) {
                that._loading.insertAfter(inputValuesWrapper);
            } else {
                const element = that.element.hasClass(SELECTOR) ? that.element : that.wrapper.find(`.${SELECTOR}`);
                that._loading.insertAfter(element);
            }
        } else if (loaderIsShown) {
            that.wrapper.removeClass(LOADING);
            that._loading.remove();
        }
    }
}

function showBusyHandler() {
        const that = this;
        if (that._focused) {
            that._focused.attr(ARIA_BUSY, true);
        } else {
            const element = that.element.hasClass(SELECTOR) ? that.element : that.wrapper.find(`.${SELECTOR}`);
            element.attr(ARIA_BUSY, true);
        }

        that._toggleLoader(true);
        that._hideClear();
}

function showBusy(e) {
    const that = this;

    if (e && e.isDefaultPrevented()) {
        return;
    }

    that._request = true;

    if (that._busy) {
        return;
    }

    that._busy = setTimeout(that._showBusyHandler, 100);
}


function hideBusy() {
    const that = this;
    clearTimeout(that._busy);
    that._toggleLoader(false);
    that._busy = null;

    if (that._request) {
        that._request = false;
    }

    if (that._focused) {
        that._focused.attr(ARIA_BUSY, false);
    } else {
        const element = that.element.hasClass(SELECTOR) ? that.element : that.wrapper.find(`.${SELECTOR}`);
        element.attr(ARIA_BUSY, true);
    }

    if (that._toggleCloseVisibility) {
        that._toggleCloseVisibility();
    } else {
        that._showClear();
    }
}


export {
    initLoader,
};