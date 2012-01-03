(function($, undefined) {
    var kendo = window.kendo,
        roleSelector = kendo.roleSelector,
        mobile = kendo.mobile,
        ui = mobile.ui,
        support = kendo.support,
        touch = support.touch,
        os = support.mobileOS,
        TOGGLE = "toggle",
        MOUSEDOWN = touch ? "touchstart" : "mousedown",
        MOUSEUP = touch ? "touchend" : "mouseup",
        extend = $.extend,
        proxy = $.proxy;

    var RadioGroup = ui.Widget.extend({
        init: function (element, options) {
            var that = this;
            element = $(element);

            if (!element.is("div,.km-radiogroup")) {
                var selector = "input[name=" + element.attr("name") + "]";
                element = element.add(element.siblings(selector)).add(element.siblings("label:has(" + selector + ")")).wrapAll("<div />").parent();
            }

            ui.Widget.fn.init.call(that, element, options);

            options = that.options;

            that._toggleProxy = proxy(that._toggle, that);
            that._triggerProxy = proxy(that._trigger, that);

            that._wrap();
            that.enable(options.enable);
            that.selectedIndex = -1;

            that.bind([
                TOGGLE
            ], options);
        },

        options: {
            name: "RadioGroup",
            selector: roleSelector("radiogroup"),
            enable: true
        },

        enable: function (enable) {
            enable = typeof enable === "boolean" ? enable : true;
            var that = this;

            if (enable) {
                that.element.removeClass("km-state-disabled");
                that.inputs
                    .removeAttr("disabled")
                    .bind("change", that._toggleProxy)
                    .parent().bind(MOUSEDOWN, that._triggerProxy);
            } else {
                that.inputs
                    .unbind("change", that._toggleProxy)
                    .parent().unbind(MOUSEDOWN, that._triggerProxy)
                    .attr("disabled", "disabled");
                that.element.addClass("km-state-disabled");
            }
        },

        select: function (index) {
            var that = this,
                hasArgs = (arguments.length != 0),
                input = that.inputs.filter(function () { return $(this).data("selected-index") == (hasArgs ? index : that.selectedIndex) });

            if (hasArgs) {
                input.parent().trigger(MOUSEDOWN);
            }

            return input;
        },

        disable: function () {
            this.enable(false);
        },

        _toggle: function (e) {
            this._trigger(e);
        },

        _trigger: function (e) {
            var that = this,
                label = $(kendo.eventTarget(e)).closest(".km-button"),
                input = label.children("input[type=radio]");

            this.element.find(".km-button.km-state-active").removeClass("km-state-active");
            $(e.target).closest(".km-button").addClass("km-state-active");

            if (e.type == MOUSEDOWN) {
                var selected = input.data("selected-index");

                if (selected != that.selectedIndex) {
                    that.trigger(TOGGLE, { selectedIndex: selected });

                    input
                        .unbind("change", that._toggleProxy) // change event is not throwing fast enough and it is on mouseup/touchend.
                        .attr("checked", "checked")
                        .bind("change", that._toggleProxy);

                    that.selectedIndex = selected;
                }
            }
        },

        _wrap: function () {
            var that = this;

            if (that.element.length)
                that.element.addClass("km-radiogroup");

            that.inputs = that.element.find("input[type=radio]");

            if (that.inputs.length) {
                that.inputs.each(function (idx) {
                    var input = $(this),
                        forId = "[for=" + input.attr("id") + "]",
                        label = input.parent("label");

                    if (!label.length)
                        label = that.element.siblings(forId).add(input.siblings(forId)).insertBefore(input);

                    if (!label.length)
                        label = input.wrap("<label>&nbsp;</label>").parent();

                    label
                        .addClass("km-button")
                        .wrapInner("<span class='km-text' />")
                        .find("img")
                        .addClass("km-image")
                        .prependTo(label)
                        .end()
                        .find(".km-sprite")
                        .prependTo(label);

                    input
                        .data("kendo-role", "radio-group-button")
                        .data("selected-index", idx)
                        .appendTo(label);
                });
            } else {
                that.inputs = $("<input type='radio' " + kendo.attr("role") + "='radio-group-button' data-selected-index='0' />").appendTo(that.element).wrap("<label class='km-button'>&nbsp;</label>");
            }

        }

    });

    ui.plugin(RadioGroup);
})(jQuery);
