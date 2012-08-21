(function($, undefined) {

    function limitValue(value, minLimit, maxLimit) {
        return Math.max( minLimit, Math.min( maxLimit, value));
    }

    var ui = kendo.ui,
        Widget = ui.Widget,
        support = kendo.support,
        Class = kendo.Class,
        proxy = $.proxy,
        ACTIVE_STATE = "km-state-active",

        PatternPicker = Widget.extend({
            init: function (element, options) {
                var that = this;

                Widget.fn.init.call(that, element, options);
                element = that.element;
                options = that.options;

                if (!options.filter) {
                    element.addClass("k-sampler");
                }

                that.bgimage = element.css("background-image");

                that.styleengine = that.element.parents(".device").data("kendoStyleEngine");

                that.popup = new ui.Popup("<div class='k-patternpick'></div>", {
                    anchor: element,
                    origin: "bottom center",
                    position: "top center",
                    open: function () {
                    },
                    close: function () {
                        if (that.styleengine) {
                            that.styleengine.update(that.element, { "background-image": that.bgimage });
                        }
                    }
                });

                that.preview = $("<div class='pattern-preview'></div>").appendTo(that.popup.element);
                that._update();

                if (!options.filter) {
                    $(document.body)
                        .on({
                            click: function(e) {
                                if (e.currentTarget == element[0]) {
                                    e.preventDefault();
                                    that._toggle();
                                }
                            }
                        }, ".k-sampler");
                } else {
                    $(element)
                        .on("click", options.filter, function(e) {
                            if (support.matchesSelector.call(e.currentTarget, options.filter)) {
                                e.preventDefault();
                                that.target = $(e.currentTarget);
                                that.popup.options.anchor = that.target;
                                that._toggle();
                            }
                        });
                }

                that.popup.element
                    .addClass("k-list-container");
            },

            options: {
                name: "PatternPicker",
                filter: null,
                toggleTarget: null
            },

            open: function (target) {
                if (typeof target != "undefined") {
                    this.target = target;
                }

                this._toggle(true);
            },

            close: function () {
                this._toggle(false);
            },

            _updateConnected: function (element) {
                var that = this,
                    filter = that.options.filter,
                    target = !filter ? that.element : that.target;

                that.preview.css("background-image", that.bgimage);
                target.css("background-image", that.bgimage);
                target.attr("data-pattern", that.styleengine.createHash(that.bgimage));
            },

            _update: function (updateAttr, trigger) {
                var that = this,
                    target = !that.options.filter ? that.element : that.target;

                if (target) {
                    that.preview.css("background-image", that.bgimage);

                    if (trigger) {
                        that.trigger("pick", { color: that.color, target: target });
                    }
                }
            },

            _toggle: function(open) {
                var that = this, target, options = that.options;

                if (options.filter) {
                    that.target = that.target || that.element.find(options.filter);
                }
                target = !options.filter ? that.element : that.target;

                open = open !== undefined? open : that.options.filter ? true : !that.popup.visible();

                if (open) {
                    that.bgimage = target.css("background-image");
                    that._update(true);
                }

                that.popup[open ? "open" : "close"]();
            }

        });

    ui.plugin(PatternPicker);

})(jQuery);
