(function(f, define){
    define([ "./kendo.core" ], f);
})(function(){

var __meta__ = {
    id: "maskinput",
    name: "MaskInput",
    category: "web",
    description: "The MaskInput widget allows to specify a mask type on an input field.",
    depends: [ "core" ]
};

(function($, undefined) {
    var kendo = window.kendo;
    var keys = kendo.keys;
    var ui = kendo.ui;
    var Widget = ui.Widget;
    var ns = ".kendoMaskInput";
    var proxy = $.proxy;

    var STATEDISABLED = "k-state-disabled";
    var DISABLED = "disabled";
    var READONLY = "readonly";
    var CHANGE = "change";

    var MaskInput = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            that._tokenize();
            that._reset();

            that.element
                .addClass("k-textbox")
                .attr("autocomplete", "off")
                .on("focus" + ns, function() {
                    that._oldValue = element.val();

                    if (!element.val()) {
                        element.val(that._emptyMask);
                    } else {
                        setTimeout(function() {
                            element.select();
                        });
                    }
                })
                .on("blur" + ns, function() {
                    if (element.val() === that._emptyMask) {
                        element.val("");
                    }

                    that._change();
                });

             that.value(that.options.value || element.val());

             var disabled = element.is("[disabled]");

             if (disabled) {
                 that.enable(false);
             } else {
                 that.readonly(element.is("[readonly]"));
             }

             kendo.notify(that);
        },

        options: {
            name: "MaskInput",
            promptChar: "_",
            culture: "",
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
            "C": /./
        },

        setOptions: function(options) {
            var that = this;

            Widget.fn.setOptions.call(that, options);

            this._tokenize();

            this.value(this.element.val());
        },

        destroy: function() {
            var that = this;

            that.element.off(ns);

            if (that._form) {
                that._form.off("reset", that._resetHandler);
            }

            Widget.fn.destroy.call(that);
        },

        value: function(value) {
            if (value === undefined) {
                return this.element.val();
            }

            value = this._unmask(value + "");

            this.element.val(value ? this._emptyMask : "");

            this._mask(0, this._maskLength, value);
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

        _editable: function(options) {
            var that = this;
            var element = that.element;
            var disable = options.disable;
            var readonly = options.readonly;
            var inputEventName = ("onpropertychange" in element[0] ? "propertychange" : "input") + ns;

            element
                .off("keydown" + ns)
                .off("keypress" + ns)
                .off("paste" + ns)
                .off(inputEventName);

            if (!readonly && !disable) {
                element.removeAttr(DISABLED)
                       .removeAttr(READONLY)
                       .removeClass(STATEDISABLED)
                       .on("keydown" + ns, proxy(that._keydown, that))
                       .on("keypress" + ns, proxy(that._keypress, that))
                       .on("paste" + ns, proxy(that._paste, that))
                       .on(inputEventName, proxy(that._propertyChange, that));
            } else {
                element.attr(DISABLED, disable)
                       .attr(READONLY, readonly)
                       .toggleClass(STATEDISABLED, disable);
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
        },

        _propertyChange: function() {
            var that = this;
            var element = that.element[0];
            var value = element.value;
            var unmasked;
            var start;

            if (value !== that._old) {
                start = caret(element)[0];
                unmasked = that._unmask(value.substring(start), start);

                element.value = that._old = value.substring(0, start) + that._emptyMask.substring(start);

                that._mask(start, start, unmasked);
                caret(element, start);
            }
        },

        _paste: function(e) {
            var that = this;
            var element = e.target;
            var position = caret(element);
            var start = position[0];
            var end = position[1];

            if (start !== end) {
                that._mask(start, end, "");
                start = caret(element)[0];
            }

            setTimeout(function() {
                var value = element.value;
                var end = caret(element)[0];
                var pasted = value.substring(start, end);

                element.value = that._old = value.substring(0, start) + value.substring(end);
                caret(element, start);

                that._mask(start, start, pasted);
            });
        },

        _reset: function() {
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

                that._form = form.on("reset", that._resetHandler);
            }
        },

        _keydown: function(e) {
            var key = e.keyCode;
            var element = this.element[0];
            var selection = caret(element);
            var start = selection[0];
            var end = selection[1];
            var placeholder;

            var backward = key === keys.BACKSPACE;

            if (backward || key === keys.DELETE) {
                if (start === end) {
                    if (backward) {
                        start -= 1;
                    } else {
                        end += 1;
                    }

                    placeholder = this._find(start, backward);
                }

                if (placeholder !== undefined && placeholder !== start) {
                    if (backward) {
                        placeholder += 1;
                    }

                    caret(element, placeholder);
                } else if (start > -1) {
                    this._mask(start, end, "", backward);
                }

                e.preventDefault();
            } else if (key === keys.ENTER) {
                this._change();
            }
        },

        _keypress: function(e) {
            var selection = caret(this.element[0]);

            this._mask(selection[0], selection[1], String.fromCharCode(e.which));

            e.preventDefault();
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
            var charIdx = 0;
            var unmasked;
            var char;
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
            char = value.charAt(charIdx);

            while (start < this._maskLength) {
                current[start] = char || empty;
                char = value.charAt(++charIdx);

                if (idx === undefined && charIdx > valueLength) {
                    idx = start;
                }

                start = this._find(start + 1);
            }

            element.value = this._old = current.join("");

            if (kendo._activeElement() === element) {
                caret(element, idx);
            }
        },

        _unmask: function(value, idx) {
            if (!value) {
                return "";
            }

            value = (value + "").split("");

            var char;
            var token;
            var charIdx = 0;
            var tokenIdx = idx || 0;

            var empty = this.options.promptChar;

            var valueLength = value.length;
            var tokensLength = this.tokens.length;

            var result = "";

            while (tokenIdx < tokensLength) {
                char = value[charIdx];
                token = this.tokens[tokenIdx];

                if (char === token || char === empty) {
                    result += char === empty ? empty : "";

                    charIdx += 1;
                    tokenIdx += 1;
                } else if (typeof token !== "string") {
                    if (token.test && token.test(char)) {
                        result += char;
                        tokenIdx += 1;
                    }

                    charIdx += 1;
                } else {
                    tokenIdx += 1;
                }

                if (charIdx >= valueLength) {
                    break;
                }
            }

            return result;
        },

        _tokenize: function() {
            var tokens = [];
            var tokenIdx = 0;

            var mask = this.options.mask || "";
            var maskChars = mask.split("");
            var length = maskChars.length;
            var idx = 0;
            var char;
            var rule;

            var emptyMask = "";
            var promptChar = this.options.promptChar;
            var numberFormat = kendo.getCulture(this.options.culture).numberFormat;

            for (; idx < length; idx++) {
                char = maskChars[idx]
                rule = this.rules[char];

                if (rule) {
                    tokens[tokenIdx] = rule;
                    emptyMask += promptChar;
                } else {
                    if (char === "." || char === ",") {
                        char = numberFormat[char];
                    } else if (char === "$") {
                        char = numberFormat.currency.symbol;
                    } else if (char === "\\") {
                        idx += 1;
                        char = maskChars[idx];
                    }

                    tokens[tokenIdx] = char;
                    emptyMask += char;
                }

                tokenIdx += 1;
            }

            this.tokens = tokens;

            this._emptyMask = emptyMask;
            this._maskLength = emptyMask.length;
        }
    });

    //TODO: Move caret function in core.js
    function caret(element, start, end) {
        var rangeElement;
        var isPosition = start !== undefined;

        if (end === undefined) {
            end = start;
        }

        if (element.selectionStart !== undefined) {
            if (isPosition) {
                element.focus();
                element.setSelectionRange(start, end);
            } else {
                start = [element.selectionStart, element.selectionEnd];
            }
        } else if (document.selection) {
            if ($(element).is(":visible")) {
                element.focus();
            }

            rangeElement = element.createTextRange();

            if (isPosition) {
                rangeElement.collapse(true);
                rangeElement.moveStart("character", start);
                rangeElement.moveEnd("character", end - start);
                rangeElement.select();
            } else {
                var rangeDuplicated = rangeElement.duplicate(),
                    selectionStart, selectionEnd;

                    rangeElement.moveToBookmark(document.selection.createRange().getBookmark());
                    rangeDuplicated.setEndPoint('EndToStart', rangeElement);
                    selectionStart = rangeDuplicated.text.length;
                    selectionEnd = selectionStart + rangeElement.text.length;

                start = [selectionStart, selectionEnd];
            }
        }

        return start;
    }

    ui.plugin(MaskInput);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
