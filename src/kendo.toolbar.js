(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "toolbar",
    name: "ToolBar",
    category: "web",
    description: "The ToolBar widget displays one or more command buttons divided into groups.",
    depends: [ "core" ]
};

(function($, undefined) {
    var kendo = window.kendo,
        Widget = kendo.ui.Widget,
        template = kendo.template,

        templates = {

            buttonTemplate: kendo.template(
                '<a href="" role="button" class="k-button" unselectable="on" title="#= text #">' +
                '<span class=""></span>#: text #</a>'
            ),

            toggleButtonTemplate: kendo.template(
                '<a href="" role="togglebutton" class="k-button k-toggle-button" unselectable="on" title="#= text #">' +
                '<span class=""></span>#: text #</a>'
            ),

            buttonGroupTemplate: kendo.template(
                '<div class="k-button-group">' +
                    '# for(var i = 0; i < items.length; i++) { #' +
                        '<a href="" role="button" class="k-button" unselectable="on" title="#= items[i].text #">' +
                            '<span class=""></span>#: items[i].text #' +
                        '</a>' +
                    '# } #' +
                '</div>'
            ),

            splitButtonTemplate: kendo.template(
                '<div class="k-split-button">' +
                    '<a href="" role="splitbutton" class="k-button k-split-button">' +
                        '<span class="k-split-button-text">#= text #</span><span class="k-icon k-i-arrow-s"></span>' +
                    '</a>' +
                    '<ul class="k-split-button-dropdown">' +
                        '# for(var i = 0; i < options.length; i++) { #' +
                            '<li id="#=options[i].id#"><a>#=options[i].text#</a></li>' +
                        '# } #' +
                    '</ul>' +
                '</div>'
            )

        };

        var ToolBar = Widget.extend({
            init: function(element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);

                options = that.options;
                element = that.element;

                element.addClass("k-toolbar");

                if(options.items && options.items.length) {
                    that._renderItems(options.items);
                }
            },

            events: [
                //event list
            ],

            options: {
                name: "ToolBar"
                //option list
            },

            destroy: function() {
                Widget.fn.destroy.call(this);
            },

            _renderItems: function(items) {
                this.element.empty();

                for (var i = 0; i < items.length; i++) {
                    var command = items[i];

                    switch (command.type) {
                        case 'button':
                            this._renderButton(command);
                            break;

                        case 'toggleButton':
                            this._renderToggleButton(command);
                            break;

                        case 'buttonGroup':
                            this._renderButtonGroup(command);
                            break;

                        case 'splitButton':
                            this._renderSplitButton(command);
                            break;

                        case 'separator':
                            this._renderSeparator(command);
                            break;

                        default:
                            throw new Error("Item does not have a valid type!");
                    }
                }
            },

            _renderButton: function(options) {
                this.element.append(templates.buttonTemplate(options));
            },

            _renderToggleButton: function(options) {
                this.element.append(templates.toggleButtonTemplate(options));
            },

            _renderButtonGroup: function(options) {
                this.element.append(templates.buttonGroupTemplate(options));
                //var html = "",
                //    items = options.items;

                //for (var i = 0; i < items.length; i++) {
                //    html += templates.buttonTemplate(items[i]);
                //}

                //$(templates.buttonGroupWrapper).html(html).appendTo(this.element);
            },

            _renderSplitButton: function(options) {
                this.element.append(templates.splitButtonTemplate(options));
            },

            _renderSeparator: function(options) {
                //todo
            }

        });

    kendo.ui.plugin(ToolBar);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
