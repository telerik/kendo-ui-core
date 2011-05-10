(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Navigatable = ui.Navigatable,
        Selectable = ui.Selectable,
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

        that.list = new ui.List(that.ul, {
            template: that.options.template
        });

        that._dataSource();

        that.bind([CHANGE], that.options);

        that.navigatable = new Navigatable(that.element, {
            context: that.ul,
            down: function(context, current) {
                return Navigatable[current ? "down" : "home"](context, current);
            },
            up: function(context, current){
                return Navigatable[current ? "up" : "end"](context, current);
            }
        });

        that.navigatable.bind("focus", function(e) {
            if (that.options.complete && e.type !== "mousedown") {
                that.complete(that.navigatable.current.text());
            }
        });

        that.selectable = new Selectable(that.ul, {
            change: function() {
                that._select(that.selectable.value());
            }
        });

        that.element.keydown(proxy(that._keydown, that))
            .focus(function() {
                that.previous = that.value();
            })
            .blur(function() {
                that._blur();
            });
    }

    function lastIndexOf(value, character) {
        var characterLength = character.length;
        for (var i = value.length - 1; i > -1; i--)
            if (value.substr(i, characterLength) == character) return i;
        return -1;
    }


    function autoFill(input, text, separator, multiple) {
        var textBoxValue = input.val(),
            endIndex = caretPos(input);

        var lastSeparatorIndex = multiple && separator ? $t.lastIndexOf(textBoxValue.substring(0, endIndex), separator) : -1;
        var startIndex = lastSeparatorIndex != -1 ? lastSeparatorIndex + separator.length : 0;

        var filterString = textBoxValue.substring(startIndex, endIndex);
        var matchIndex = text.toLowerCase().indexOf(filterString.toLowerCase());

        if (matchIndex != -1) {

            var stringToAppend = text.substring(matchIndex + filterString.length);

            if (multiple) {
                var split = textBoxValue.split(separator),
                    wordIndex = valueArrayIndex(input, separator);

                split[wordIndex] = filterString + stringToAppend;
                input.value = split.join(separator) + (component.multiple && wordIndex != 0 && wordIndex == split.length - 1 ? separator : '');
            } else {
                input.val(filterString + stringToAppend);
            }

            selection(input, endIndex, endIndex + stringToAppend.length);
        }
    }

    AutoComplete.prototype = {
        options: {
            complete: false,
            multiple: false,
            minLength: 1,
            separator: ', ',
            template: "<li><%= data %></li>",
            delay: 300
        },

        refresh: function() {
            var that = this,
                data = that.dataSource.view();

            that.navigatable.clear();

            that.list.dataBind(data);

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
            that.dataSource.bind("change", proxy(that.refresh, that));
        },

        _blur: function() {
            var that = this;
            that.popup.close();
            that._change();
        },

        _select: function(li) {
            var that = this;

            if (li) {
                that.value(li.text());
            }

            if (that.element[0] !== document.activeElement) {
                that.element.focus();
            }
        },

        _change: function() {
            var that = this;

            if (that.value() !== that.previous) {
                that.trigger(CHANGE);
                that.previous = that.value();
            }
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                keys = kendo.keys;

            if (key === keys.ENTER || key === keys.TAB) {
                that.selectable.clear();
                that.selectable.value(that.navigatable.current);
                that._blur();
            } else if (key !== keys.UP && key !== keys.DOWN) {
                clearTimeout(that._timeout);

                that._timeout = setTimeout(function() {
                    that.search();
                }, that.options.delay);
            }
        },
        search: function() {
            var that = this,
                value = that.value(),
                length = value.length;

            clearTimeout(that._timeout);

            if (!length) {
                that.popup.close();
            } else if (length >= that.options.minLength) {
                that.dataSource.filter( { operator: "startswith", value: value } );
            }
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

        _selection: function(start, end) {
            var input = this.element[0];

            if (input.createTextRange) {
                var selRange = input.createTextRange(),
                    character = "character";

                selRange.collapse(true);
                selRange.moveStart(character, start);
                selRange.moveEnd(character, end - start);
                selRange.select();
            } else if (input.selectionStart) {
                input.selectionStart = start;
                input.selectionEnd = end;
            }
        },

        complete: function(value) {
            var that = this,
                input = that.element[0],
                current = input.value,
                caret = that._caret();

            if (current !== value) {
                if (caret <= 0) {
                    caret = value.toLowerCase().indexOf(current.toLowerCase()) + 1;
                }
               // if (that.options.multiple) {
               //     var separator = that.options.separator;
               //     var lastSeparatorIndex = lastIndexOf(current.substring(0, endIndex), separator);
               //     var startIndex = lastSeparatorIndex + separator.length;
               //     var filterString = current.substring(startIndex, endIndex);
               //     var matchIndex = value.toLowerCase().indexOf(filterString.toLowerCase());

               //     var split = value.split(separator),
               //         wordIndex = value.substring(0, caret).split(separator).length - 1;

               //     split[wordIndex] = value;
               //     input.value = split.join(separator) + (component.multiple && wordIndex != 0 && wordIndex == split.length - 1 ? separator : '');
               // }

                input.value = value;
                input.selectionStart = caret;
            }
        },

        value: function() {
            return this.element.val.apply(this.element, arguments);
        }
    }

    ui.plugin("AutoComplete", AutoComplete, Component);
})(jQuery);
