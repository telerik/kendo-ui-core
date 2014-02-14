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

            that.element
                .addClass("k-textbox")
                .attr("autocomplete", "off")
                .on("focus" + ns, function() {
                    that._oldValue = element.val();

                    if (!element.val()) {
                        element.val(that._emptyMask);
                    } else {
                        element.select();
                    }
                })
                .on("blur" + ns, function() {
                    if (element.val() === that._emptyMask) {
                        element.val("");
                    }

                    that._change();
                });

            that.value(that.options.value); // || element.val());

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
            emptySymbol: "_",
            value: "",
            mask: ""
        },

        events: [
            CHANGE
        ],

        rules: {
            "0": /\d/
        },

        setOptions: function(options) {
            var that = this;

            Widget.fn.setOptions.call(that, options);

            //TODO: add support for dynamic change of mask
            //TODO: dynamic change of emptySymbol
        },

        //TODO: add form support!
        //
        destroy: function() {
            var that = this;

            that.element.off(ns);

            /*if (that._form) {
                that._form.off("reset", that._resetHandler);
            }*/

            Widget.fn.destroy.call(that);
        },

        value: function(value) {
            if (value === undefined) {
                return this.element.val();
            }

            value = this._unmask(value + "");

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
                       .on(inputEventName, proxy(that._propertChange, that));
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

        _propertChange: function() {
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
            var empty = this.options.emptySymbol;
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
            value = this._unmask(value);
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

            var empty = this.options.emptySymbol;

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
            var mask = this.options.mask || "";

            var maskChars = mask.split("");
            var length = maskChars.length;
            var idx = 0;
            var char;
            var rule;

            var emptyMask = "";
            var emptySymbol = this.options.emptySymbol;

            for (; idx < length; idx++) {
                char = maskChars[idx]
                rule = this.rules[char];

                if (rule) {
                    tokens[idx] = rule;
                    emptyMask += emptySymbol;
                } else {
                    tokens[idx] = char;
                    emptyMask += char;
                }
            }

            this.tokens = tokens;

            this._emptyMask = emptyMask;
            this._maskLength = emptyMask.length;
        }
    });

    //TODO: Move caret function in core.js
    function caret(element, position) {
        var range,
            isPosition = position !== undefined;

        if (element.selectionStart !== undefined) {
            if (isPosition) {
                element.focus();
                element.setSelectionRange(position, position);
            } else {
                position = [element.selectionStart, element.selectionEnd];
            }
        } else if (document.selection) {
            if ($(element).is(":visible")) {
                element.focus();
            }
            range = document.selection.createRange();
            if (isPosition) {
                range.move("character", position);
                range.select();
            } else {
                var rangeElement = element.createTextRange(),
                    rangeDuplicated = rangeElement.duplicate(),
                    selectionStart, selectionEnd;

                    rangeElement.moveToBookmark(range.getBookmark());
                    rangeDuplicated.setEndPoint('EndToStart', rangeElement);
                    selectionStart = rangeDuplicated.text.length;
                    selectionEnd = selectionStart + rangeElement.text.length;

                position = [selectionStart, selectionEnd];
            }
        }

        return position;
    }

    ui.plugin(MaskInput);

})(window.kendo.jQuery);

return window.kendo;

}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });
