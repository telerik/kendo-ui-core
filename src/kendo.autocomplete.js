(function($, window, undefined) {
    var kendo = window.kendo,
        ui = kendo.ui,
        DataSource = kendo.data.DataSource,
        Component = ui.Component,
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
        that.dataSource.read();

        that.element.keydown($.proxy(that._keydown, that));
    }

    function move(direction, ul) {
        var items = ul.find("li"),
            selectedItem = items.filter(".t-state-selected");

        if(direction == "next") {
            if(selectedItem.length){
                selectedItem.removeClass("t-state-selected")
                            .next()
                            .addClass("t-state-selected");
            } else {
                items.first().addClass("t-state-selected");
            }
        } else if(direction == "prev") {
            if(selectedItem.length){
                selectedItem.removeClass("t-state-selected")
                            .prev()
                            .addClass("t-state-selected");
            } else {
                items.last().addClass("t-state-selected");
            }
        }
    }

    function lastIndexOf(value, character) {
        var characterLength = character.length;
        for (var i = value.length - 1; i > -1; i--)
            if (value.substr(i, characterLength) == character) return i;
        return -1;
    }

    function caretPos (element) {
        var pos = -1;

        if (document.selection)
            pos = Math.abs(element.document.selection.createRange().moveStart('character', -element.value.length));
        else if (element.selectionStart !== undefined)
            pos = element.selectionStart;

        return pos;
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
            separator: ', ',
            template: "<li><%= data %></li>"
        },

        refresh: function() {
            var that = this,
                data = that.dataSource.view();


            that.list.dataBind(data);
        },

        _dataSource: function() {
            var that = this,
                options = that.options,
                dataSource = options.dataSource || {};

            if (options.data) {
                dataSource.data = options.data;
            }

            that.dataSource = DataSource.create(dataSource);
            that.dataSource.bind("change", $.proxy(that.refresh, that));
        },

        _keydown: function(e){
            var that = this,
                key = e.keyCode,
                keys = kendo.keys;

            switch(key) {
            case keys.DOWN :
                 if (!that.popup.element.is(":visible")) {
                    that.popup.open();
                 }
                 move("next", that.ul);
                 var selectedItem = that.ul.find(".selected");
                 if (selectedItem.length > 0) {
                    autoFill(that.element, selectedItem.text(), that.options.separator, that.options.multiple);
                 }
                 e.preventDefault();
                 break;
            case keys.UP :
                 if (!that.popup.element.is(":visible")) {
                    that.popup.open();
                 }
                 move("prev", that.ul);
                 e.preventDefault();
                 break;
            }
        }
    }

    ui.plugin("AutoComplete", AutoComplete, Component);
})(jQuery, window);
