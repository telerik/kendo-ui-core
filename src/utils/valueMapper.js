import "../kendo.core.js";

let $ = kendo.jQuery;

export function valueMapperOptions(options, value, callback) {
    return {
        value: (options.selectable === "multiple" || options.checkboxes) ? value : value[0],
        success: function(response) {
            callback(response);
        }
    };
}
