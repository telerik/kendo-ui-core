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
    var ns = ".kendoNumericTextBox";

    var MaskInput = Widget.extend({
        init: function(element, options) {
            var that = this;

            Widget.fn.init.call(that, element, options);

            element = that.element;

            that._tokenize();

            that._wrapper();

            that.element.addClass("k-input")
                .attr("autocomplete", "off")
                .on("keydown" + ns, $.proxy(that._keydown, that))
                .on("keypress" + ns, $.proxy(that._keypress, that))
                .on("focus" + ns, function() {
                    element.val(that._emptyMask);
                    caret(element[0], 0);
                })
                .on("blur" + ns, function() {
                    element.val("");
                });
        },

        options: {
            name: "MaskInput",
            emptySymbol: "_",
            mask: ""
        },

        events: [],

        rules: {
            "0": /\d/
        },

        _keydown: function(e) {
            var key = e.keyCode;
            var selection = caret(this.element[0]);
            var start = selection[0];
            var end = selection[1];

            if (key == keys.BACKSPACE) {
                if (start === end) {
                    start -= 1;
                }

                if (start > -1) {
                    this._mask(end, start);
                }

                e.preventDefault();
            } else if (key == keys.DELETE) {
                if (start === end) {
                    end += 1;
                }

                this._mask(start, end);

                e.preventDefault();
            }
        },

        _keypress: function(e) {
            var selection = caret(this.element[0]);
            var start = selection[0];
            var end = selection[1];

            if (start === end) {
                end += 1;
            }

            this._mask(start, end, String.fromCharCode(e.which));

            e.preventDefault();
        },

        _mask: function(start, end, newVal) {
            newVal = newVal || "";

            var tokens = this.tokens;
            var element = this.element[0];
            var oldValue = element.value;

            var backward = start > end;
            var direction = 1;

            if (backward) {
                direction = -1;
                start -= 1;
            }

            var result = [];
            var charIdx = 0;
            var valid = true;

            var idx = start;

            var maskLength = this._emptyMaskLength;
            if (maskLength < start || maskLength < end) {
                return;
            }

            var current;
            var multipleSelection = Math.abs(end - start) > 1;

            while ((backward && idx >= end && end > -1) || (!backward && idx != end)) {
                var token = tokens[idx];

                if (token === oldValue.charAt(idx)) {
                    current = token;
                    if (!multipleSelection && newVal) {
                        end += direction;
                    }
                } else {
                    var current = newVal.charAt(charIdx);
                    charIdx += 1;

                    if (!current) {
                        current = this.options.emptySymbol;
                    } else if (token.test) {
                        valid = token.test(current);

                        if (!valid) {
                            break;
                        }
                    }
                }

                result.push(current);
                idx += direction;
            }

            if (valid) {
                charIdx = end;
                if (multipleSelection && !backward) {
                    charIdx = start + newVal.length;
                }

                if (backward) {
                    direction = start;

                    start = end;
                    end = direction;

                    end += 1; //include end char when delete
                    result = result.reverse();
                }

                element.value = oldValue.substring(0, start) + result.join("") + oldValue.substring(end);

                caret(element, charIdx);
            }
        },

        _tokenize: function() {
            var tokens = [];

            var maskChars = this.options.mask.split("");
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
            this._emptyMaskLength = emptyMask.length;
        },

        _wrapper: function() {
            var element = this.element;
            var DOMelement = element[0];
            var wrapper = element.parent("span.k-widget");

            if (!wrapper[0]) {
                wrapper = element.wrap("<span />").parent();
            }

            wrapper[0].style.cssText = DOMelement.style.cssText;
            wrapper.attr({
                tabindex: -1,
                role: "presentation"
            });

            element.css({
                width: "100%",
                height: DOMelement.style.height
            });

            this.wrapper = wrapper
                            .addClass("k-widget k-maskinput k-header")
                            .addClass(DOMelement.className);
        }
    });

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
