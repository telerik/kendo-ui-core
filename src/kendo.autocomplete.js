(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        List = ui.List,
        CHANGE = "change",
        SELECTED = "t-state-selected",
        caretPosition = List.caret,
        selectText = List.selectText,
        proxy = $.proxy;

    function indexOfWordAtCaret(caret, text, separator) {
        return text.substring(0, caret).split(separator).length - 1;
    }

    function wordAtCaret(caret, text, separator) {
        return text.split(separator)[ indexOfWordAtCaret(caret, text, separator) ];
    }

    function replaceWordAtCaret(caret, text, word, separator) {
        var words = text.split(separator);

        words.splice(indexOfWordAtCaret(caret, text, separator), 1, word);

        if (words[words.length - 1] !== "") {
            words.push("");
        }

        return words.join(separator);
    }

    function moveCaretAtEnd(element) {
        var length = element.value.length;

        selectText(element, length, length);
    }

    var AutoComplete = List.extend({
        init: function(element, options) {
            var that = this;

            options = $.isArray(options) ? { dataSource: options } : options;

            List.fn.init.call(that, element, options);

            that._focused = that.element;

            that.popup = new ui.Popup(that.ul, {
                anchor: that.element
            });

            that.dataSource = DataSource.create(that.options.dataSource || {}).bind(CHANGE, proxy(that.refresh, that));

            that.bind([CHANGE], that.options);

            that._template();

            that.element
                .attr("autocomplete", "off")
                .bind({
                    keydown: proxy(that._keydown, that),
                    paste: proxy(that._search, that),
                    focus: function() {
                        that.previous = that.value();
                    },
                    blur: function() {
                        that._bluring = setTimeout(function() {
                            that._blur();
                        }, 100);
                    }
                });
        },
        options: {
            suggest: false,
            minLength: 1,
            delay: 300,
            height: 200
        },

        refresh: function() {
            var that = this,
            data = that.dataSource.view(),
            length = data.length;

            that._height(length);
            that.ul[0].innerHTML = kendo.render(that.template, data);

            that.popup[length ? "open" : "close"]();
        },

        close: function() {
            var that = this;
            that._current = null;
            that.popup.close();
        },

        select: function(li) {
            var that = this,
            separator = that.options.separator,
            text;

            if (li && !li.hasClass(SELECTED)) {
                text = li.text();

                if (separator) {
                    text = replaceWordAtCaret(caretPosition(that.element[0]), that.value(), text, separator);
                }

                that.value(text);
                that.current(li.addClass(SELECTED));
            }
        },

        search: function() {
            var that = this,
            word = that.value(),
            separator = that.options.separator,
            length,
            caret,
            index;

            that._current = null;

            clearTimeout(that._typing);

            if (separator) {
                word = wordAtCaret(caretPosition(that.element[0]), word, separator);
            }

            length = word.length;

            if (!length) {
                that.popup.close();
            } else if (length >= that.options.minLength) {
                that.dataSource.filter( { operator: "startswith", value: word } );
            }
        },

        suggest: function(word) {
            var that = this,
                element = that.element[0],
                separator = that.options.separator,
                value = that.value(),
                selectionEnd,
                textRange,
                caret = caretPosition(element);


            if (typeof word !== "string") {
                word = word ? word.text() : "";
            }

            if (caret <= 0) {
                caret = value.toLowerCase().indexOf(word.toLowerCase()) + 1;
            }

            if (!word) {
                if (separator) {
                    word = value.substring(0, caret).split(separator).pop();
                } else {
                    word = value.substring(0, caret);
                }
            }

            if (separator) {
                word = replaceWordAtCaret(caret, value, word, separator);
            }

            if(word !== value) {
                that.value(word);

                selectionEnd = word.length;

                if (separator) {
                    selectionEnd = caret + word.substring(caret).indexOf(separator);
                }

                selectText(element, caret, selectionEnd);
            }
        },

        value: function(value) {
            var that = this,
                element = that.element[0];

            if (value !== undefined) {
                element.value = value;
            } else {
                return element.value;
            }
        },

        _accept: function(li) {
            var that = this;

            that._focus(li);

            moveCaretAtEnd(that.element[0]);
        },

        _move: function(li) {
            var that = this;

            li = li[0] ? li : null;

            that.current(li);

            if (that.options.suggest) {
                that.suggest(li);
            }
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                keys = kendo.keys
                visible = that.popup.visible();

            if (key === keys.DOWN) {
                if (visible) {
                    that._move(that._current ? that._current.next() : that.ul.children().first());
                }
                e.preventDefault();
            } else if (key === keys.UP) {
                if (visible) {
                    that._move(that._current ? that._current.prev() : that.ul.children().last());
                }
                e.preventDefault();
            } else if (key === keys.ENTER || key === keys.TAB) {
                that._accept(that._current);
            } else if (key === keys.ESC) {
                that.close();
            } else {
                that._search();
            }
        },

        _search: function() {
            var that = this;
            clearTimeout(that._typing);

            that._typing = setTimeout(function() {
                if (that.previous !== that.value()) {
                    that.search();
                }
            }, that.options.delay);
        }
    });

    ui.plugin("AutoComplete", AutoComplete);
})(jQuery);
