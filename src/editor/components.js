(function($, undefined) {

var kendo = window.kendo,
    Widget = kendo.ui.Widget,
    DropDownList = kendo.ui.DropDownList,
    Editor = kendo.ui.editor,
    dom = Editor.Dom,
    CHANGE = "change",
    KSTATESELECTED = "k-state-selected",
    SELECTEDCLASS = "." + KSTATESELECTED,
    SELECTEDCOLORCLASS = ".k-selected-color",
    UNSELECTABLE = "unselectable",
    BACKGROUNDCOLOR = "background-color",
    ARIASELECTED = "aria-selected",
    ARIALABELLEDBY = "aria-labelledby",
    keys = kendo.keys,
    template = kendo.template(
'<div class="k-colorpicker-popup">' +
   '<ul class="k-reset">'+
        '# for(var i = 0; i < colors.length; i++) { #' +
            '<li #=(id && i === 0) ? "id=\\""+id+"\\" aria-selected=\\"true\\"" : "" # class="k-item #= colors[i] == value ? "k-state-selected" : "" #" aria-label="\\##= colors[i]#">' +
                '<div style="background-color:\\##= colors[i] #"></div>'+
            '</li>' +
        '# } #' +
   '</ul>' +
'</div>');

var SelectBox = DropDownList.extend({
    init: function(element, options) {
        var that = this;

        DropDownList.fn.init.call(that, element, options);

        that.value(that.options.title);
    },
    options: {
        name: "SelectBox"
    },
    value: function(value) {
        var that = this,
            result = DropDownList.fn.value.call(that, value);

        if (value === undefined) {
            return result;
        }

        if (value !== DropDownList.fn.value.call(that)) {
           that.text(that.options.title);
           that._current.removeClass("k-state-selected");
           that.current(null);
           that._oldIndex = that.selectedIndex = -1;
        }
    }
});

kendo.ui.editor.SelectBox = SelectBox;

})(window.kendo.jQuery);
