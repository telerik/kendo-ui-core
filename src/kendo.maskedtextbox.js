(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = { // jshint ignore:line
    id: "maskedtextbox",
    name: "MaskedTextBox",
    category: "web",
    description: "The MaskedTextBox widget allows to specify a mask type on an input field.",
    depends: [ "core" ]
};

(function($, undefined) {
    var global = window;
    var min = global.Math.min;
    var kendo = global.kendo;
    var caret = kendo.caret;
    var keys = kendo.keys;
    var ui = kendo.ui;
    var Widget = ui.Widget;
    var NS = ".kendoMaskedTextBox";
    var proxy = $.proxy;
    var setTimeout = window.setTimeout;

    var STATEDISABLED = "k-state-disabled";
    var STATEINVALID = "k-state-invalid";
    var DISABLED = "disabled";
    var READONLY = "readonly";
    var CHANGE = "change";
    var MOUSEUP = "mouseup";
    var DROP = "drop";
    var KEYDOWN = "keydown";
    var PASTE = "paste";
    var INPUT = "input";

    function ns(name) { return name + NS; }

    var INPUT_EVENT_NAME = ns(kendo.support.propertyChangeEvent ? "propertychange" : INPUT);

    function stringDiffStart(str1, str2) {
        var i = 0;
        while (i < str2.length) {
            if (str1[i] !== str2[i]) {
                break;
            }
            i++;
        }

        return i;
    }
    var MaskedTextBox = Widget.extend({
        init: function(element, options) {
            var that = this;
            var DOMElement;

            Widget.fn.init.call(that, element, options);

            that._rules = $.extend({}, that.rules, that.options.rules);

            element = that.element;
            DOMElement = element[0];

            that._wrapper();
            that._tokenize();
            that._form();

            that.element
                .addClass("k-textbox")
                .attr("autocomplete", "off")
                .on("focus" + NS, function() {
                    var value = DOMElement.value;

                    if (!value) {
                        DOMElement.value = that._old = that._emptyMask;
                    } else {
                        that._togglePrompt(true);
                    }

                    that._oldValue = value;

                    that._timeoutId = setTimeout(function() {
                        caret(element, 0, value ? that._maskLength : 0);
                    });
                })
                .on("focusout" + NS, function() {
                    var value = element.val();

                    clearTimeout(that._timeoutId);
                    DOMElement.value = that._old = "";

                    if (value !== that._emptyMask) {
                        DOMElement.value = that._old = value;
                    }

                    that._change();
                    that._togglePrompt();
                });

             var disabled = element.is("[disabled]") || $(that.element).parents("fieldset").is(':disabled');

             if (disabled) {
                 that.enable(false);
             } else {
                 that.readonly(element.is("[readonly]"));
             }

             that.value(that.options.value || element.val());

             that._validationIcon = $("<span class='k-icon k-i-warning'></span>")
                .insertAfter(element);

             kendo.notify(that);
        },

        options: {
            name: "MaskedTextBox",
            clearPromptChar: false,
            unmaskOnPost: false,
            promptChar: "_",
            culture: "",
            rules: {},
            value: "",
            mask: ""
        },

        events: [
            CHANGE
        ],

        rules: {
            "0": /\d/,
            "9": /\d|\s/,
            "#": /\d|\s|\+|\-/,
            "L": /[a-zA-Z]/,
            "?": /[a-zA-Z]|\s/,
            "&": /\S/,
            "C": /./,
            "A": /[a-zA-Z0-9]/,
            "a": /[a-zA-Z0-9]|\s/
        },

        setOptions: function(options) {
            var that = this;

            Widget.fn.setOptions.call(that, options);

            that._rules = $.extend({}, that.rules, that.options.rules);

            that._tokenize();

            this._unbindInput();
            this._bindInput();

            that.value(that.element.val());
        },

        destroy: function() {
            var that = this;

            that.element.off(NS);

            if (that._formElement) {
                that._formElement.off("reset", that._resetHandler);
                that._formElement.off("submit", that._submitHandler);
            }

            Widget.fn.destroy.call(that);
        },

        raw: function() {
            var unmasked = this._unmask(this.element.val(), 0);
            return unmasked.replace(new RegExp(this.options.promptChar, "g"), "");
        },

        value: function(value) {
            var element = this.element;
            var emptyMask = this._emptyMask;

            if (value === undefined) {
                return this.element.val();
            }

            if (value === null) {
                value = "";
            }

            if (!emptyMask) {
                this._oldValue = value;
                element.val(value);
                return;
            }

            value = this._unmask(value + "");

            element.val(value ? emptyMask : "");

            this._mask(0, this._maskLength, value);
            this._unmaskedValue = null;

            value = element.val();
            this._oldValue = value;

            if (kendo._activeElement() !== element) {
                if (value === emptyMask) {
                    element.val("");
                } else {
                    this._togglePrompt();
                }
            }
        },

        _togglePrompt: function(show) {
            var DOMElement = this.element[0];
            var value = DOMElement.value;

            if (this.options.clearPromptChar) {
                if (!show) {
                    value = value.replace(new RegExp(this.options.promptChar, "g"), " ");
                } else {
                    value = this._oldValue;
                }

                DOMElement.value = this._old = value;
            }
        },

        readonly: function(readonly) {
            this._editable({
                readonly: readonly === undefined ? true : readonly,
                disable: false
            });
        },

        enable: function(enable) {
            this._editable({
                readonly: false,
                disable: !(enable = enable === undefined ? true : enable)
            });
        },

        _bindInput: function() {
            var that = this;

            if (that._maskLength) {
                if(that.options.$angular) {//detach "input" event in angular scenario to keep the ng-model consistent and updated only when the change event of the textbox is raised.
                    that.element.off(INPUT);
                }
                that.element
                    .on(ns(KEYDOWN), proxy(that._keydown, that))
                    .on(ns(DROP), proxy(that._drop, that))
                    .on(ns(CHANGE), proxy(that._trackChange, that))
                    .on(INPUT_EVENT_NAME, proxy(that._inputHandler, that));


                if (kendo.support.browser.msie) {
                    var version = kendo.support.browser.version;
                    if (version > 8 && version < 11) {
                        var events = [ns(MOUSEUP), ns(DROP), ns(KEYDOWN), ns(PASTE)].join(" ");
                        that.element.on(events, proxy(that._legacyIEInputHandler, that));
                    }
                }
            }
        },

        _unbindInput: function() {
            var events = [INPUT_EVENT_NAME, ns(KEYDOWN), ns(MOUSEUP), ns(DROP), ns(PASTE)].join(" ");

            this.element.off(events);
        },

        _editable: function(options) {
            var that = this;
            var element = that.element;
            var wrapper = that.wrapper;
            var disable = options.disable;
            var readonly = options.readonly;

            that._unbindInput();

            if (!readonly && !disable) {
                element.removeAttr(DISABLED)
                       .removeAttr(READONLY);

                wrapper.removeClass(STATEDISABLED);

                that._bindInput();
            } else {
                element.attr(DISABLED, disable)
                       .attr(READONLY, readonly);

                wrapper.toggleClass(STATEDISABLED, disable);
            }
        },

        _change: function() {
            var that = this;
            var value = that.value();

            if (value !== that._oldValue) {
                that._oldValue = value;

                that.trigger(CHANGE);
                that.element.trigger(CHANGE);
            }
            else if (value === "" && that.__changing) {//ensure change is raised when empty value (mask is stripped from input content) for consistent ngjs model update
                that.element.trigger(CHANGE);
            }
        },

        inputChange: function(backward) {
            var that = this;
            var old = that._old;
            var element = that.element[0];
            var value = element.value;
            var selection = caret(element);
            var cursor = selection[1];
            var lengthDiff = value.length - old.length;
            var mobile = kendo.support.mobileOS;

            if (that.__dropping && lengthDiff < 0) {//dropping in same input on WebKit is raised once for the removal phase and once for the adding phase
                return;
            }

            if (lengthDiff === -1 && mobile.android && mobile.browser === "chrome") {
                backward = true;
            }

            var contentStart = min(cursor, stringDiffStart(value, old));
            var content = value.substring(contentStart, cursor);

            element.value = value.substring(0, contentStart) + that._emptyMask.substring(contentStart);

            var caretPos = that._mask(contentStart, cursor, content);
            var endContent = that._trimStartPromptChars(value.substring(cursor), min(lengthDiff, caretPos - contentStart));

            var unmasked = that._unmask(endContent, old.length - endContent.length);
            that._mask(caretPos, caretPos, unmasked);

            if (backward) {
                caretPos = that._findCaretPosBackwards(contentStart);
            }

            caret(element, caretPos);

            //clean-up flags
            that.__dropping = false;
        },

        _trimStartPromptChars: function(content, count) {
            var promptChar = this.options.promptChar;

            while (count-- > 0 && content.indexOf(promptChar) === 0) {
                content = content.substring(1);
            }

            return content;
        },

        _findCaretPosBackwards: function(pos) {
            var caretStart = this._find(pos, true);
            if (caretStart < pos) {
                caretStart += 1;
            }

            return caretStart;
        },

        _inputHandler: function() {
            if (kendo._activeElement() !== this.element[0]) {
                return;
            }

            this.inputChange(this.__backward);
        },

        _legacyIEInputHandler: function(e) {
            var that = this;
            var input = that.element[0];
            var value = input.value;
            var type = e.type;

            that.__pasting = (type === "paste");

            setTimeout(function() {
                if(type === "mouseup" && that.__pasting) {
                    return;
                }
                if (input.value && input.value !== value) {
                    that.inputChange(that.__backward);
                }
            });
        },

        _trackChange: function() {
            var that = this;

            that.__changing = true;
            setTimeout(function() { that.__changing = false; });
        },

        _form: function() {
            var that = this;
            var element = that.element;
            var formId = element.attr("form");
            var form = formId ? $("#" + formId) : element.closest("form");

            if (form[0]) {
                that._resetHandler = function() {
                    setTimeout(function() {
                        that.value(element[0].value);
                    });
                };

                that._submitHandler = function() {
                    that.element[0].value = that._old = that.raw();
                };

                if (that.options.unmaskOnPost) {
                    form.on("submit", that._submitHandler);
                }

                that._formElement = form.on("reset", that._resetHandler);
            }
        },

        _keydown: function(e) {
            var key = e.keyCode;

            this.__backward = key === keys.BACKSPACE;

            if (key === keys.ENTER) {
                this._change();
            }
        },

        _drop: function() {
            this.__dropping = true;
        },

        _find: function(idx, backward) {
            var value = this.element.val() || this._emptyMask;
            var step = 1;

            if (backward === true) {
                step = -1;
            }

            while (idx > -1 || idx <= this._maskLength) {
                if (value.charAt(idx) !== this.tokens[idx]) {
                    return idx;
                }

                idx += step;
            }

            return -1;
        },

        _mask: function(start, end, value, backward) {
            var element = this.element[0];
            var current = element.value || this._emptyMask;
            var empty = this.options.promptChar;
            var valueLength;
            var chrIdx = 0;
            var unmasked;
            var chr;
            var idx;

            start = this._find(start, backward);

            if (start > end) {
                end = start;
            }

            unmasked = this._unmask(current.substring(end), end);
            value = this._unmask(value, start);
            valueLength = value.length;

            if (value) {
                unmasked = unmasked.replace(new RegExp("^_{0," + valueLength + "}"), "");
            }

            value += unmasked;
            current = current.split("");
            chr = value.charAt(chrIdx);

            while (start < this._maskLength) {
                current[start] = chr || empty;
                chr = value.charAt(++chrIdx);

                if (idx === undefined && chrIdx > valueLength) {
                    idx = start;
                }

                start = this._find(start + 1);
            }

            element.value = this._old = current.join("");

            if (kendo._activeElement() === element) {
                if (idx === undefined) {
                    idx = this._maskLength;
                }

                caret(element, idx);
            }

            return idx;
        },

        _unmask: function(value, idx) {
            if (!value) {
                return "";
            }

            if (this._unmaskedValue === value) {
                return this._unmaskedValue;
            }
            value = (value + "").split("");

            var chr;
            var token;
            var chrIdx = 0;
            var tokenIdx = idx || 0;

            var empty = this.options.promptChar;

            var valueLength = value.length;
            var tokensLength = this.tokens.length;

            var result = "";

            while (tokenIdx < tokensLength) {
                chr = value[chrIdx];
                token = this.tokens[tokenIdx];

                if (chr === token || chr === empty) {
                    result += chr === empty ? empty : "";

                    chrIdx += 1;
                    tokenIdx += 1;
                } else if (typeof token !== "string") {
                    if ((token && token.test && token.test(chr)) || ($.isFunction(token) && token(chr))) {
                        result += chr;
                        tokenIdx += 1;
                    } else {
                        if (valueLength === 1) {
                            this._blinkInvalidState();
                        }
                    }

                    chrIdx += 1;
                } else {
                    tokenIdx += 1;
                }

                if (chrIdx >= valueLength) {
                    break;
                }
            }
            this._unmaskedValue = result;
            return result;
        },

        _wrapper: function () {
            var that = this;
            var element = that.element;
            var DOMElement = element[0];

            var wrapper = element.wrap("<span class='k-widget k-maskedtextbox'></span>").parent();
            wrapper[0].style.cssText = DOMElement.style.cssText;
            DOMElement.style.width = "100%";
            that.wrapper = wrapper.addClass(DOMElement.className);
        },

        _blinkInvalidState: function () {
            var that = this;

            that.wrapper.addClass(STATEINVALID);
            clearTimeout(that._invalidStateTimeout);
            that._invalidStateTimeout = setTimeout(proxy(that._removeInvalidState, that), 100);
        },

        _removeInvalidState: function () {
            var that = this;

            that.wrapper.removeClass(STATEINVALID);
            that._invalidStateTimeout = null;
        },

        _tokenize: function() {
            var tokens = [];
            var tokenIdx = 0;

            var mask = this.options.mask || "";
            var maskChars = mask.split("");
            var length = maskChars.length;
            var idx = 0;
            var chr;
            var rule;

            var emptyMask = "";
            var promptChar = this.options.promptChar;
            var numberFormat = kendo.getCulture(this.options.culture).numberFormat;
            var rules = this._rules;

            for (; idx < length; idx++) {
                chr = maskChars[idx];
                rule = rules[chr];

                if (rule) {
                    tokens[tokenIdx] = rule;
                    emptyMask += promptChar;
                    tokenIdx += 1;
                } else {
                    if (chr === "." || chr === ",") {
                        chr = numberFormat[chr];
                    } else if (chr === "$") {
                        chr = numberFormat.currency.symbol;
                    } else if (chr === "\\") {
                        idx += 1;
                        chr = maskChars[idx];
                    }

                    chr = chr.split("");

                    for (var i = 0, l = chr.length; i < l; i++) {
                        tokens[tokenIdx] = chr[i];
                        emptyMask += chr[i];
                        tokenIdx += 1;
                    }
                }
            }

            this.tokens = tokens;

            this._emptyMask = emptyMask;
            this._maskLength = emptyMask.length;
        }
    });

    ui.plugin(MaskedTextBox);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });
