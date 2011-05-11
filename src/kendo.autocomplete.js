(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Component = ui.Component,
        CHANGE = "change",
        proxy = $.proxy,
        extend = $.extend;

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
            complete: false,
            minLength: 1,
            template: "<li><%= data %></li>",
            delay: 300
        },

        refresh: function() {
            var that = this,
                data = that.dataSource.view();

            that._current = null;

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

            that.popup.close();
            that._change();
        },

        select: function(li) {
            var that = this,
                text;

            if (li) {
                text = li.text();

                if (that.options.separator) {
                    text = that._insert(that._caret(), text);
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

                that._current = candidate.addClass("t-state-focused");

                if (that.options.complete) {
                    that.complete(that._current.text());
                }
            } else {
                return that._current;
            }
        },

        _click: function(e) {
            this.select($(e.currentTarget));
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                keys = kendo.keys;

            if (key === keys.DOWN) {
                that.current(that._current ? that._current.next() : that.ul.children().first());

                e.preventDefault();
            } else if (key === keys.UP) {
                that.current(that._current ? that._current.prev() : that.ul.children().last());

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
                word = that._wordAtCaret(that._caret(), word);
            }

            length = word.length;

            if (!length) {
                that.popup.close();
            } else if (length >= that.options.minLength) {
                that.dataSource.filter( { operator: "startswith", value: word } );
            }
        },

        _wordAtCaret: function(caret, value) {
            return value.split(this.options.separator)[ this._caretToWordIndex(caret, value) ];
        },

        _caretToWordIndex: function(caret, value) {
            return value.substring(0, caret).split(this.options.separator).length - 1;
        },

        _caret: function() {
            var caret,
                input = this.element[0];

            if (input.createTextRange) {
                caret = Math.abs(input.createTextRange().moveStart('character', -input.value.length))
            } else {
                caret = input.selectionStart;
            }

            return caret;
        },

        complete: function(word) {
            var that = this,
                length = word.length,
                element = that.element,
                separator = that.options.separator,
                value = that.value(),
                caret = that._caret();

            if (caret <= 0) {
                caret = value.toLowerCase().indexOf(word.toLowerCase()) + 1;
            }

            if (separator) {
                word = that._insert(caret, word);
            }

            if (word !== value) {
                that.value(word);
                element[0].selectionStart = caret;

                if (separator) {
                    element[0].selectionEnd = caret + word.substring(caret).indexOf(separator);
                }
            }
        },

        _insert: function(caret, word) {
            var that = this,
                separator = that.options.separator,
                value = that.value(),
                words = value.split(separator);

            words.splice(that._caretToWordIndex(caret, value), 1, word);

            if (words[words.length - 1] !== "") {
                words.push("");
            }

            return words.join(separator);
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
