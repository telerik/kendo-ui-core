let $ = kendo.jQuery;

export function useLoaderContainer(toggle, options) {
    var that = this,
        wrapper = that.wrapper;

    if (toggle && that.loader) {
        if (!that.wrapper.find(".k-loader-container").length) {

            var defaultOptions = {
                message: "Loading...",
                overlayColor: "dark",
                themeColor: "primary",
            };
            defaultOptions = $.extend({}, defaultOptions, options);

            const loaderOverlay = kendo.html.renderLoaderContainer($("<div></div>"), defaultOptions);
            const wrapperWidth = that.wrapper.width();

            const mask = $("<div class='k-loading-pdf-mask'></div>");
            const wrapperClone = that.wrapper.clone().removeAttr("id").addClass('k-loading-pdf-progress').width(wrapperWidth);
            mask.append(wrapperClone);
            mask.append(loaderOverlay);
            that.mask = mask;

            wrapper.append(mask);

            that.wrapperClone = mask.find(".k-pivotgrid");
            that.loaderOverlay = mask.find(".k-loader-container");

            that.loader.element.insertBefore(mask.find(".k-loader-container-label"));
        }
    } else {
        if (that.loaderOverlay.length) {
            kendo.destroy(that.loaderOverlay);
            that.mask.remove();
        }
    }
}