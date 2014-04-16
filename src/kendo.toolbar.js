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
                '<a href="" role="togglebutton" class="k-toggle-button" unselectable="on" title="#= text #">' +
                '<span class=""></span>#: text #</a>'
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
                //todo
            },

            _renderSeparator: function(options) {
                //todo
            }

        });

    kendo.ui.plugin(ToolBar);
})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
