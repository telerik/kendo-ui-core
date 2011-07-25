(function($, undefined) {
    /**
    * @name kendo.ui.AutoComplete.Description
    *
    * @section The autocomplete component provide suggestions depending on the typed text. Also it allows
    * to enter multiple values devided by predefined separator.
    *
    * @exampleTitle Creating an autocomplete from existing input HTML element
    * @example
    * <input id="autocomplete" />
    *
    * @exampleTitle AutoComplete initialization
    * @example
    * var autocomplete = $("#autocomplete").kendoAutoComplete(["Item1", "Item2"]);
    */
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

    var AutoComplete = List.extend/** @lends kendo.ui.AutoComplete.prototype */({
        /**
        * @constructs
        * @extends kendo.ui.List
        * @param {DomElement} element DOM element
        * @param {Object} options Configuration options.
        * @option {Array} [dataSource] The data that the AutoComplete will be bound to.
        * @option {Boolean} [enable] <true> Controls whether the AutoComplete should be initially enabled.
        * @option {Boolean} [suggest] <false> Controls whether the AutoComplete should automatically auto-type the rest of text.
        * @option {Number} [delay] <200> Specifies the delay in ms after which the AutoComplete will start filtering dataSource.
        * @option {Number} [minLength] <1> Specifies the minimum characters that should be typed before the AutoComplete activates
        * @option {String} [dataTextField] <null> Sets the field of the data item that provides the text content of the list items.
        * @option {String} [filter] <"startswith"> Defines the type of filtration.
        * @option {Number} [height] <200> Define the height of the drop-down list in pixels.
        */
        init: function(element, options) {
            var that = this;

            options = $.isArray(options) ? { dataSource: options } : options;

            List.fn.init.call(that, element, options);

            that.wrapper = that._focused = that.element;

            that._popup();

            that._accessors();

            that.dataSource = DataSource.create(that.options.dataSource || {}).bind(CHANGE, proxy(that.refresh, that));

            that.bind([
                /**
                * Fires when the drop-down list is opened
                * @name kendo.ui.AutoComplete#open
                * @event
                * @param {Event} e
                */
                /**
                * Fires when the drop-down list is closed
                * @name kendo.ui.AutoComplete#close
                * @event
                * @param {Event} e
                */
                /**
                * Fires when the value has been changed.
                * @name kendo.ui.AutoComplete#change
                * @event
                * @param {Event} e
                */
                CHANGE
            ], that.options);

            that.element
                .attr("autocomplete", "off")
                .addClass('t-widget t-input t-autocomplete')
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


            that.ul.width(that.element.width());
        },

        options: {
            suggest: false,
            minLength: 1,
            delay: 200,
            height: 200,
            filter: "startswith"
        },

        /**
        * Closes the drop-down list.
        * @example
        * autocomplete.close();
        */
        close: function() {
            var that = this;
            that._current = null;
            that.popup.close();
        },

        refresh: function() {
            var that = this,
            ul = that.ul[0],
            data = that.dataSource.view(),
            length = data.length;

            ul.innerHTML = kendo.render(that.template, data);

            that._height(length);

            if (length && that.options.highlightFirst) {
                that.current($(ul.firstChild));
            }

            that.popup[length ? "open" : "close"]();
        },

        /**
        * Selects drop-down list item and sets the value and the text of the dropdownlist.
        * @param {jQueryObject} li The LI element.
        * @example
        * var autocomplete = $("#autocomplete").data("kendoAutoComplete");
        *
        * // selects by jQuery object
        * autocomplete.select(autocomplete.ul.children().eq(0));
        */
        select: function(li) {
            var that = this,
            separator = that.options.separator,
            data = that.dataSource.view(),
            text,
            idx;

            if (li && !li.hasClass(SELECTED)) {
                idx = $.inArray(li[0], that.ul[0].childNodes);

                if (idx === -1) {
                    return;
                }

                data = that.dataSource.view()[idx];
                text = that._text(data);

                if (separator) {
                    text = replaceWordAtCaret(caretPosition(that.element[0]), that.value(), text, separator);
                }

                that.value(text);
                that.current(li.addClass(SELECTED));
            }
        },

        search: function(word) {
            var that = this,
            word = word || that.value(),
            options = that.options,
            separator = options.separator,
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
                that.dataSource.filter( {field: options.dataTextField, operator: options.filter, value: word } );
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
                word = value.substring(0, caret);

                if (separator) {
                    word = word.split(separator).pop();
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

        /**
        * Gets/Sets the value of the autocomplete.
        * @param {String} value The value to set.
        * @returns {String} The value of the autocomplete.
        * @example
        * var autocomplete = $("#autocomplete").data("kendoAutoComplete");
        *
        * // get the text of the autocomplete.
        * var value = autocomplete.value();
        */
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
