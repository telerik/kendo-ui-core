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
            var element = this.element;
            var selection = caret(element[0]);
            var selectionStart = selection[0];
            var selectionEnd = selection[1];
            var equal = selectionStart === selectionEnd;

            var value = element.val();

            //TODO: Test this!
            if (key == keys.BACKSPACE) {
                if (equal) {
                    selectionStart -= 1;

                    var currentChar = value.charAt(selectionStart);
                    var token = this.tokens[selectionStart];

                    while (currentChar && currentChar === token) {
                        selectionStart -= 1;
                        currentChar = value.charAt(selectionStart);
                        token = this.tokens[selectionStart];
                    }

                    if (currentChar && (token.test || $.isFunction(token))) {
                        element.val(value.substring(0, selectionStart) + this.options.emptySymbol + value.substring(selectionStart + 1));
                        caret(element[0], selectionStart - 1);
                    }

                    e.preventDefault();
                }
            }
        },

        _keypress: function(e) {

            var element = this.element;
            var selection = caret(element[0]);
            var selectionStart = selection[0];
            //var selectionEnd = selection[1];
            //
            var character = String.fromCharCode(e.which);

            var value = element.val();
            var currentChar = value.charAt(selectionStart);
            var token = this.tokens[selectionStart];

            while (currentChar && currentChar === token) {
                selectionStart += 1;
                currentChar = value.charAt(selectionStart);
                token = this.tokens[selectionStart];
            }

            var valid = false;

            if (token) {
                if (token.test) {
                    valid = token.test(character);
                } /*else if ($.isFunction(token)) {
                    valid = token(character);
                }*/
            }

            if (valid) {
                element.val(value.substring(0, selectionStart) + character + value.substring(selectionStart + 1));

                selectionStart += 1;
                currentChar = value.charAt(selectionStart);
                token = this.tokens[selectionStart];

                while (currentChar && currentChar === token) {
                    selectionStart += 1;
                    currentChar = value.charAt(selectionStart);
                    token = this.tokens[selectionStart];
                }

                caret(element[0], selectionStart);
            }

            e.preventDefault();
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

            this._emptyMask = emptyMask;
            this.tokens = tokens;
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
