(function ($, undefined) {
    /**
    * @name kendo.ui.AutoComplete.Description
    *
    * @section The AutoComplete widget provides suggestions depending on the typed text. It also allows entry of multiple values with by predefined separator.
    * The suggestions shown by the AutoComplete widget can come from a local Array or from a remote data service.
    *
    * <h3>Getting Started</h3>
   * @exampleTitle Create a simple HTML input element
   * @example
   * <input id="autocomplete" />
   *
   * @exampleTitle Initialize Kendo AutoComplete using a jQuery selector
   * @example
   * var autocomplete = $("#autocomplete").kendoAutoComplete(["Item1", "Item2"]);
   *
   * @section <h3>AutoComplete Suggestions</h3>
   * There are two primary ways to provide the AutoComplete suggestions:
   *   <ol>
   *       <li>From a local, statically defined JavaScript Array</li>
   *       <li>From a remote data service</li>
   *   </ol>
   * Locally defined values are best for small, fixed sets of suggestions. Remote suggestions should be used for larger data sets. When used with the <a href="../datasource/index.html" title="Kendo DataSource">Kendo DataSource</a>,
   * filtering large remote data services can be pushed to the server, too, maximizing client-side performance.
   * <h3>Local Suggestions</h3>
   * To configure and provide AutoComplete suggestions locally, you can either pass an Array directly to the AutoComplete constructor,
   * or you can set the AutoComplete dataSource property to an Array defined elsewhere in your JavaScript code.
   * @exampleTitle Directly initialize suggestions in constructor
   * @example
   * $("#autocomplete").kendoAutoComplete(["Item1", "Item2", "Item3"]);
   *
   * @exampleTitle Using dataSource property to bind to local Array
   * @example
   * var data = ["Item1", "Item2", "Item3"];
   * $("#autocomplete").kendoAutoComplete({
   *    dataSource: data
   * });
   * @section <h3>Remote Suggestions</h3>
   * The easiest way to bind to remote AutoComplete suggestions is to use the <a href="../datasource/index.html" title="Kendo DataSource">Kendo DataSource</a> component. The Kendo DataSource is an abstraction for local and
   * remote data, and it can be used to serve data from a variety of data services, such as XML, JSON, and JSONP.
   *
   * @exampleTitle Using Kendo DataSource to bind to remote suggestions with OData
   * @example
   * $("#autocomplete").kendoAutoComplete({
   *    minLength: 3,
   *    dataTextField: "Name", //JSON property name to use
   *    dataSoruce: new kendo.data.DataSource({
   *        type: "odata", //Specifies data protocol
   *        pageSize: 10, //Limits result set
   *        transport: {
   *            read: "http://odata.netflix.com/Catalog/Titles"
   *        }
   *    })
   * });
   *
   * @exampleTitle Using Kendo DataSource to bind to JSONP suggestions
   * @example
   * $(document).ready(function(){
   *    $("#txtAc").kendoAutoComplete({
   *        minLength:6,
   *        dataTextField:"title",
   *        filter: "contains",
   *        dataSource: new kendo.data.DataSource({
   *            transport:{
   *                read:{
   *                    url: "http://api.geonames.org/wikipediaSearchJSON",
   *                    data:{
   *                        q:function(){
   *                            var ac = $("#txtAc").data("kendoAutoComplete");
   *                            return ac.value();
   *                        },
   *                        maxRows:10,
   *                        username:"demo"
   *                    }
   *                }
   *            },
   *            schema:{
   *                data:"geonames"
   *            }
   *        }),
   *        change:function(){
   *            this.dataSource.read();
   *        }
   *    });
   * });
   *
   * @section <h3>Accessing an Existing AutoComplete</h3>
   * To access an existing Kendo UI AutoComplete widget instance, use the jQuery data API. Once a reference to the AutoComplete is established,
   * you can use the Kendo UI API to control the widget.
   *
   * @exampleTitle Accessing Existing AutoComplete widget instance
   * @example
   * var autocomplete = $("#autocomplete").data("kendoAutoComplete");
   *
   *
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
        return text.split(separator)[indexOfWordAtCaret(caret, text, separator)];
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
        * @option {kendo.data.DataSource | Object} [dataSource] Instance of DataSource or the data that the AutoComplete will be bound to.
        * @option {Boolean} [enable] <true> Controls whether the AutoComplete should be initially enabled.
        * @option {Boolean} [suggest] <false> Controls whether the AutoComplete should automatically auto-type the rest of text.
        * @option {Number} [delay] <200> Specifies the delay in ms after which the AutoComplete will start filtering dataSource.
        * @option {Number} [minLength] <1> Specifies the minimum characters that should be typed before the AutoComplete activates
        * @option {String} [dataTextField] <null> Sets the field of the data item that provides the text content of the list items.
        * @option {String} [filter] <"startswith"> Defines the type of filtration.
        * @option {Number} [height] <200> Define the height of the drop-down list in pixels.
        */
        init: function (element, options) {
            var that = this;

            options = $.isArray(options) ? { dataSource: options} : options;

            List.fn.init.call(that, element, options);

            that.wrapper = that._focused = that.element;

            that._accessors();

            that.dataSource = DataSource.create(that.options.dataSource).bind(CHANGE, proxy(that.refresh, that));

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
                .addClass("t-widget t-input t-autocomplete")
                .bind({
                    keydown: proxy(that._keydown, that),
                    paste: proxy(that._search, that),
                    focus: function () {
                        that.previous = that.value();
                    },
                    blur: function () {
                        that._bluring = setTimeout(function () {
                            that._blur();
                        }, 100);
                    }
                });

            that._popup();
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
        close: function () {
            var that = this;
            that._current = null;
            that.popup.close();
        },

        refresh: function () {
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
        * Selects drop-down list item and sets the text of the autocomplete.
        * @param {jQueryObject} li The LI element.
        * @example
        * var autocomplete = $("#autocomplete").data("kendoAutoComplete");
        *
        * // selects by jQuery object
        * autocomplete.select(autocomplete.ul.children().eq(0));
        */
        select: function (li) {
            var that = this,
                separator = that.options.separator,
                data = that.dataSource.view(),
                text,
                idx;

            li = $(li);

            if (li[0] && !li.hasClass(SELECTED)) {
                idx = $.inArray(li[0], that.ul[0].childNodes);

                if (idx > -1) {
                    data = data[idx];
                    text = that._text(data);

                    if (separator) {
                        text = replaceWordAtCaret(caretPosition(that.element[0]), that.value(), text, separator);
                    }

                    that.value(text);
                    that.current(li.addClass(SELECTED));
                }
            }
        },

        /**
        * Filters dataSource using the provided parameter and rebinds drop-down list.
        * @param {string} word The filter value.
        * @example
        * var autocomplete = $("#autocomplete").data("kendoAutoComplete");
        *
        * // Searches for item which has "Inception" in the name.
        * autocomplete.search("Inception");
        */
        search: function (word) {
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
                that.dataSource.filter({ field: options.dataTextField, operator: options.filter, value: word });
            }
        },

        suggest: function (word) {
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

            if (word !== value) {
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
        value: function (value) {
            var that = this,
                element = that.element[0];

            if (value !== undefined) {
                element.value = value;
            } else {
                return element.value;
            }
        },

        _accept: function (li) {
            var that = this;

            that._focus(li);

            moveCaretAtEnd(that.element[0]);
        },

        _move: function (li) {
            var that = this;

            li = li[0] ? li : null;

            that.current(li);

            if (that.options.suggest) {
                that.suggest(li);
            }
        },

        _keydown: function (e) {
            var that = this,
                key = e.keyCode,
                keys = kendo.keys,
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

        _search: function () {
            var that = this;
            clearTimeout(that._typing);

            that._typing = setTimeout(function () {
                if (that.previous !== that.value()) {
                    that.search();
                }
            }, that.options.delay);
        }
    });

    ui.plugin("AutoComplete", AutoComplete);
})(jQuery);
