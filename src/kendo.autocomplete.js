(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Component = ui.Component,
        CHANGE = "change",
        CHARACTER = "character",
        proxy = $.proxy,
        extend = $.extend;

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

    function AutoComplete(element, options) {
        var that = this;

        options = $.isArray(options) ? { data: options } : options;

        Component.call(that, element, options);

        that.ul = $("<ul/>");

        that.popup = new ui.Popup(that.ul, {
            anchor: that.element
        });

        that._dataSource();

        that.bind([CHANGE], that.options);

        that.template = kendo.template(that.options.template);

        that.ul
            .mousedown(function() {
                setTimeout(function() {
                    clearTimeout(that._bluring);
                }, 0);
            })
            .delegate("li", "click", proxy(that._click, that));

        that.element
            .keydown(proxy(that._keydown, that))
            .focus(function() {
                that.previous = that.value();
            })
            .blur(function() {
                that._bluring = setTimeout(function() {
                    that._blur();
                }, 100);
            });
    }

    AutoComplete.prototype = {
        options: {
            suggest: false,
            minLength: 1,
            template: "<li><%= data %></li>",
            delay: 300
        },

        refresh: function() {
            var that = this,
                data = that.dataSource.view();

            that.ul[0].innerHTML = kendo.render(that.template, data);

            that.popup[data.length ? "open" : "close"]();
        },

        _dataSource: function() {
            var that = this,
                options = that.options,
                dataSource = options.dataSource || {};

            if (options.data) {
                dataSource.data = options.data;
            }

            that.dataSource = DataSource.create(dataSource);
            that.dataSource.bind(CHANGE, proxy(that.refresh, that));
        },

        _blur: function() {
            var that = this;

            that._current = null;
            that.popup.close();
            that._change();
        },

        select: function(li) {
            var that = this,
                separator = that.options.separator,
                text;

            if (li) {
                text = li.text();

                if (separator) {
                    text = replaceWordAtCaret(that._caret(), that.value(), text, separator);
                }

                that.value(text);
                that.current(li.addClass("t-state-selected"));
            }

            if (that.element[0] !== document.activeElement) {
                that.element.focus();
            }

            that._blur();
        },

        _change: function() {
            var that = this,
                value = that.value();

            that.term = value;
            if (value !== that.previous) {
                that.trigger(CHANGE);
                that.previous = value;
            }
        },

        current: function(candidate) {
            var that = this;

            if (candidate !== undefined) {
                if (that._current) {
                    that._current.removeClass("t-state-focused");
                }

                if (candidate) {
                    candidate.addClass("t-state-focused");
                }
                that._current = candidate;
            } else {
                return that._current;
            }
        },

        _click: function(e) {
            this.select($(e.currentTarget));
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
                keys = kendo.keys;

            if (key === keys.DOWN) {
                that._move(that._current ? that._current.next() : that.ul.children().first());

                e.preventDefault();
            } else if (key === keys.UP) {
                that._move(that._current ? that._current.prev() : that.ul.children().last());

                e.preventDefault();
            } else if (key === keys.ENTER || key === keys.TAB) {
                that.select(that._current);
            } else {
                clearTimeout(that._typing);

                that._typing = setTimeout(function() {
                    if (that.term !== that.value()) {
                        that.search();
                    }
                }, that.options.delay);
            }
        },

        search: function() {
            var that = this,
                word = that.value(),
                separator = that.options.separator,
                length,
                caret,
                index;

            clearTimeout(that._typing);

            if (separator) {
                word = wordAtCaret(that._caret(), word, separator);
            }

            length = word.length;

            if (!length) {
                that.popup.close();
            } else if (length >= that.options.minLength) {
                that.dataSource.filter( { operator: "startswith", value: word } );
            }
        },

        _caret: function() {
            var caret,
                element = this.element[0],
                selection = element.ownerDocument.selection;

            if (selection) {
                caret = Math.abs(selection.createRange().moveStart(CHARACTER, -element.value.length));
            } else {
                caret = element.selectionStart;
            }

            return caret;
        },

        suggest: function(word) {
            var that = this,
                element = that.element[0],
                separator = that.options.separator,
                value = that.value(),
                selectionStart,
                selectionEnd,
                textRange,
                caret = that._caret();


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

                selectionStart = caret;
                selectionEnd = word.length;

                if (separator) {
                    selectionEnd = caret + word.substring(caret).indexOf(separator);
                }

                if (element.createTextRange) {
                    textRange = element.createTextRange();
                    textRange.collapse(true);
                    textRange.moveStart(CHARACTER, selectionStart);
                    textRange.moveEnd(CHARACTER, selectionEnd - selectionStart);
                    textRange.select();
                } else {
                    element.selectionStart = selectionStart;
                    element.selectionEnd = selectionEnd;
                }
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
        }
    }

    ui.plugin("AutoComplete", AutoComplete, Component);
})(jQuery);
