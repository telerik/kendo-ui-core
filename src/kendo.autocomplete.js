(function($, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Navigatable = ui.Navigatable,
        Selectable = ui.Selectable,
        Component = ui.Component,
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
                that.popup.close();
                that.element.val(that.selectable.value().text());
            }
        });

        that.element.keydown(proxy(that._keydown, that));
    }

    function lastIndexOf(value, character) {
        var characterLength = character.length;
        for (var i = value.length - 1; i > -1; i--)
            if (value.substr(i, characterLength) == character) return i;
        return -1;
    }

    function valueArrayIndex(input, separator) {
        return input.value.substring(0, $t.caretPos(input)).split(separator).length - 1;
    }

    function selection(input, start, end) {
        if (input.createTextRange) {
            var selRange = input.createTextRange();
            selRange.collapse(true);
            selRange.moveStart('character', start);
            selRange.moveEnd('character', end - start);
            selRange.select();
        } else if (input.selectionStart) {
            input.selectionStart = start;
            input.selectionEnd = end;
        }
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

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                keys = kendo.keys;

            if (key === keys.ENTER || key === keys.TAB) {
                that.selectable.clear();
                that.selectable.value(that.navigatable.current);
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

        complete: function(value) {
            var that = this,
                input = that.element[0],
                current = input.value,
                caret = that._caret();

            if (current !== value) {
                if (caret <= 0) {
                    caret = value.toLowerCase().indexOf(current.toLowerCase()) + 1;
                }

                that.element.val(value);
                that.element[0].selectionStart = caret;
            }
        },

        value: function() {
            return this.element.val();
        }
    }

    ui.plugin("AutoComplete", AutoComplete, Component);
})(jQuery);
