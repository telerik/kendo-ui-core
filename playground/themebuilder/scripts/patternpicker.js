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
                var that = this, popupElement;

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
                            var bgimage = that.bgimage;
                            bgimage = that.styleengine.mixBackground(bgimage, that.element);

                            that.styleengine.update(that.element, { "background-image": bgimage });
                        }
                    }
                });

                popupElement = that.popup.element.addClass("k-list-container");

                that.preview = $("<div class='pattern-preview'></div>").appendTo(popupElement);
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

                var repeatXID = kendo.guid(),
                    repeatYID = kendo.guid(),
                    urlLabel = $('<label class="label">Pattern Url</label>').appendTo(popupElement).after('<br />'),
                    urlValue = $('<input type="text" class="input-value" title="Url" />').appendTo(urlLabel),
                    repeatXValue = $('<input id="' + repeatXID + '" type="checkbox" class="k-checkbox check-value" title="repeat-x" />').appendTo(popupElement),
                    repeatYValue = $('<input id="' + repeatYID + '" type="checkbox" class="k-checkbox check-value" title="repeat-y" />')
                                        .appendTo(popupElement),
                    positiionXValue = $('<input type="text" class="input-value" title="position-x" />')
                                        .appendTo($('<label class="label">X</label>').appendTo(popupElement)),
                    positionYValue = $('<input type="text" class="input-value" title="position-y" />')
                                        .appendTo($('<label class="label">Y</label>').appendTo(popupElement));

                repeatXValue.after('<label for="' + repeatXID + '" class="k-checkbox label">X</label>');
                repeatYValue.after('<label for="' + repeatYID + '" class="k-checkbox label">Y</label><br />');
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
