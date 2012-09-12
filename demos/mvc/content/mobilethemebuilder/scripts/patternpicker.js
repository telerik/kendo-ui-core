(function($, undefined) {

    function limitValue(value, minLimit, maxLimit) {
        return Math.max( minLimit, Math.min( maxLimit, value));
    }

    var ui = kendo.ui,
        Widget = ui.Widget,
        support = kendo.support,
        click = support.touch ? "touchend" : "click",
        Class = kendo.Class,
        proxy = $.proxy,
        ACTIVE_STATE = "km-state-active",

        PatternPicker = Widget.extend({
            init: function (element, options) {
                var that = this, popupElement, repeat;

                Widget.fn.init.call(that, element, options);
                element = that.element;
                options = that.options;

                if (!options.filter) {
                    element.addClass("k-sampler");
                }

                that.bgimage = element.css("background-image");
                that.backgroundPosX = element.css("background-position-x");
                that.backgroundPosY = element.css("background-position-y");

                repeat = element.css("background-repeat");
                that.backgroundRepeatX = repeat == "repeat" || repeat == "repeat-x";
                that.backgroundRepeatY = repeat == "repeat" || repeat == "repeat-y";

                that.styleengine = options.styleEngine || that.element.parents(".device").data("kendoStyleEngine");

                that.popup = new ui.Popup("<div class='k-patternpick'></div>", {
                    anchor: element,
                    origin: "bottom center",
                    position: "top center",
                    open: function () {
                    },
                    close: function () {
                        if (that.styleengine) {
                            var background = { "background-image": that.bgimage };
                            background = that.styleengine.mixBackground(background, that.element);

                            that.styleengine.update(that.element, background);
                        }
                    }
                });

                popupElement = that.popup.element.addClass("k-list-container");

                that.preview = $("<div class='pattern-preview'></div>").appendTo(popupElement);
                that._update();

                if (!options.filter) {
                    $(document.body)
                        .on(click, ".k-sampler", function(e) {
                            if (e.currentTarget == element[0]) {
                                e.preventDefault();
                                that._toggle();
                            }
                        });
                } else {
                    $(element)
                        .on(click, options.filter, function(e) {
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
                    urlLabel = $('<label class="label">Pattern Url</label>').appendTo(popupElement).after('<br />');

                that.urlValue = $('<input type="text" class="input-value" title="Url" />').appendTo(urlLabel);
                that.repeatXValue = $('<input id="' + repeatXID + '" type="checkbox" class="k-checkbox check-value" title="repeat-x" />')
                                    .appendTo(popupElement);
                that.repeatYValue = $('<input id="' + repeatYID + '" type="checkbox" class="k-checkbox check-value" title="repeat-y" />')
                                    .appendTo(popupElement);
                that.positionXValue = $('<input type="text" class="input-value" title="position-x" />')
                                .appendTo($('<label class="label">X</label>').appendTo(popupElement));
                that.positionYValue = $('<input type="text" class="input-value" title="position-y" />')
                                .appendTo($('<label class="label">Y</label>').appendTo(popupElement));

                that.urlValue.val(that.bgimage.replace(/url\(["']?|["']?\);?/g, ""));
                that.repeatXValue
                    .before('<span class="label-title">Repeat</span>')
                    .after('<label for="' + repeatXID + '" class="k-checkbox label" title="repeat-x">X</label>')
                    [0].checked = that.backgroundRepeatX;

                that.repeatYValue
                    .after('<label for="' + repeatYID + '" class="k-checkbox label label-y" title="repeat-y">Y</label><br />');
                    [0].checked = that.backgroundRepeatY;

                that.positionXValue
                    .val(that.backgroundPosX)
                    .parent().before('<span class="label-title">Position</span>');

                that.positionYValue
                    .val(that.backgroundPosY);

                popupElement.find("[title^=position]").keydown(proxy(that._keyDown, that));
                popupElement.find("input[type=text]").bind("input", proxy(that._updateConnected, that));
                popupElement.find("input[type=checkbox]").bind("change", proxy(that._updateConnected, that));
            },

            options: {
                name: "PatternPicker",
                filter: null,
                toggleTarget: null,
                styleEngine: null
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

            _updateConnected: function (clean) {
                var that = this,
                    value = this.urlValue.val();

                that.bgimage = value == "none" ? value : "url(" + value + ")";

                var filter = that.options.filter,
                    target = !filter ? that.element : that.target,
                    repeatX = that.repeatXValue[0].checked,
                    repeatY = that.repeatYValue[0].checked,
                    positionX = that.positionXValue.val(),
                    positionY = that.positionYValue.val(),
                    css = {
                        backgroundImage: that.bgimage,
                        backgroundRepeat: repeatX && repeatY ? "repeat" : repeatX ? "repeat-x" : repeatY ? "repeat-y" : "no-repeat",
                        backgroundPosition: (/\d$/.test(positionX) ? positionX + "px" : positionX) + " " +
                                            (/\d$/.test(positionY) ? positionY + "px" : positionY)
                    };

                that.preview.css(css);
                target.css(css);

                if (clean) {
                    target.removeClass("k-none");
                }

                if (that.styleengine) {
                    target.attr("data-pattern", that.styleengine.createHash(JSON.stringify(kendo.getComputedStyles(target[0], [ "background-image", "background-repeat", "background-position" ]))));
                }
            },

            _update: function (trigger) {
                var that = this,
                    target = !that.options.filter ? that.element : that.target;

                if (target) {
                    that.urlValue.val(that.bgimage.replace(/url\(["']?|["']?\);?/g, ""));
                    that.repeatXValue[0].checked = that.backgroundRepeatX;
                    that.repeatYValue[0].checked = that.backgroundRepeatY;
                    that.positionXValue.val(that.backgroundPosX);
                    that.positionYValue.val(that.backgroundPosY);

                    that._updateConnected(true);

                    if (trigger) {
                        that.trigger("pick", { color: that.color, target: target });
                    }
                }
            },

            _keyDown: function (e) {
                var target = $(e.target),
                    title = target.attr("title"),
                    value = target.val(),
                    unit = value.match(/[^\d\.]*$/);

                if (e.which == 38 || e.which == 40) {
                    target.val(parseFloat(value) + (e.which == 38 ? 1 : -1) + unit);
                    target.trigger("input");
                }
            },

            _toggle: function(open) {
                var that = this, target, options = that.options, repeat;

                if (options.filter) {
                    that.target = that.target || that.element.find(options.filter);
                }
                target = !options.filter ? that.element : that.target;

                open = open !== undefined? open : that.options.filter ? true : !that.popup.visible();

                if (open) {
                    that.bgimage = target.css("background-image");
                    that.backgroundPosX = target.css("background-position-x");
                    that.backgroundPosY = target.css("background-position-y");

                    repeat = target.css("background-repeat");
                    that.backgroundRepeatX = repeat == "repeat" || repeat == "repeat-x";
                    that.backgroundRepeatY = repeat == "repeat" || repeat == "repeat-y";

                    that._update();
                }

                that.popup[open ? "open" : "close"]();
            }

        });

    ui.plugin(PatternPicker);

})(jQuery);
