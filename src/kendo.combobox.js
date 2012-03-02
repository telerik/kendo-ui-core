(function($, undefined) {
    /**
     * @name kendo.ui.ComboBox.Description
     *
     * @section
     * <p>
     * The <b>ComboBox</b> widget allows the selection from pre-defined
     * values or entering a new value. It is a richer version of the standard
     * HTML select, providing support for local and remote data binding, item
     * templates, and configurable options for controlling the list behavior.
     * </p>
     * <p>
     *  To prevent user input, use the
     *  <a href="../dropdownlist/index.html">DropDownList</a>.
     * </p>
     * <h3>Getting Started</h3>
     * <p>There are two basic ways to create a <b>ComboBox</b>:</p>
     * <ol>
     *  <li>
     *   From a HTML input element, using data binding to define the list
     *   items
     *  </li>
     *  <li>
     *   From a HTML select element, using HTML to define the list items
     *  </li>
     * </ol>
     * <p>
     *  Regardless of the initialization technique, the resulting
     *  <b>ComboBox</b> will look and function identically.
     * </p>
     *
     * @exampleTitle Creating a combobox from existing input HTML element
     * @example
     * <input id="comboBox" />
     *
     * @exampleTitle ComboBox initialization
     * @example
     * $(document).ready(function(){
     *  $("#comboBox").kendoComboBox([
     *   {text: "Item1", value: "1"},
     *   {text: "Item2", value: "2"}
     *  ]);
     * });
     *
     * @exampleTitle Creating a ComboBox from existing select HTML element
     * @example
     * <select id="comboBox">
     *  <option>Item 1</option>
     *  <option>Item 2</option>
     *  <option>Item 3</option>
     * </select>
     *
     * @exampleTitle ComboBox initialization
     * @example
     * $(document).ready(function(){
     *  $("#comboBox").kendoComboBox();
     * });
     *
     * @section
     * <h3>Binding to Data</h3>
     * <p>
     *  The <b>ComboBox</b> can be bound to both local arrays and remote data
     *  via the <a href="../datasource/index.html">DataSource</a> component;
     *  an abstraction for local and remote data. Local arrays are
     *  appropriate for limited value options, while remote data binding is
     *  better for larger data sets. With remote binding, options will be
     *  loaded on-demand, similar to an
     *  <a href="../autocomplete/index.html">AutoComplete</a>.
     * </p>
     * @exampleTitle Binding to a remote OData service
     * @example
     * $(document).ready(function() {
     *  $("#comboBox").kendoComboBox({
     *   index: 0,
     *   dataTextField: "Name",
     *   dataValueField: "Id",
     *   filter: "contains",
     *   dataSource: {
     *    type: "odata",
     *    serverFiltering: true,
     *    serverPaging: true,
     *    pageSize: 20,
     *    transport: {
     *     read: "http://odata.netflix.com/Catalog/Titles"
     *    }
     *   }
     *  });
     * });
     *
     * @section
     * <h3>Customizing Item Templates</h3>
     * <p>
     *       ComboBox leverages Kendo UI high-performance Templates to give you complete control
     *       over item rendering. For a complete overview of Kendo UI Template capabilities and syntax,
     *       please review the <a href="../templates/index.html" title="Kendo UI Template">Kendo UI Template</a> demos and documentation.
     *   </p>
     * @exampleTitle Basic item template customization
     * @example
     * <input id="comboBox" />
     * <!-- Template -->
     * <script id="scriptTemplate" type="text/x-kendo-template">
     *  # if (data.BoxArt.SmallUrl) { #
     *  <img src="${ data.BoxArt.SmallUrl }" alt="${ data.Name }" />Title:${ data.Name }, Year: ${ data.Name }
     *  # } else { #
     *  <img alt="${ data.Name }" />Title:${ data.Name }, Year: ${ data.Name }
     *  # } #
     * </script>
     * <!-- ComboBox initialization -->
     * <script>
     *  $(document).ready(function() {
     *   $("#comboBox").kendoComboBox({
     *    autoBind: false,
     *    dataTextField: "Name",
     *    dataValueField: "Id",
     *    template: $("#scriptTemplate").html(),
     *    dataSource: {
     *     type: "odata",
     *     serverFiltering: true,
     *     serverPaging: true,
     *     pageSize: 20,
     *     transport: {
     *      read: "http://odata.netflix.com/Catalog/Titles"
     *     }
     *    }
     *   });
     *  });
     * </script>
     *
     * @section
     * <h3>Accessing an Existing ComboBox</h3>
     * <p>
     *  You can reference an existing <b>ComboBox</b> instance via
     *  <a href="http://api.jquery.com/jQuery.data/">jQuery.data()</a>.
     *  Once a reference has been established, you can use the API to control
     *  its behavior.
     * </p>
     *
     * @exampleTitle Accessing an existing ComboBox instance
     * @example
     * var comboBox = $("#comboBox").data("kendoComboBox");
     *
     */
    var kendo = window.kendo,
        ui = kendo.ui,
        List = ui.List,
        Select = ui.Select,
        support = kendo.support,
        placeholderSupported = support.placeholder,
        keys = kendo.keys,
        CLICK = support.touch ? "touchend" : "click",
        ATTRIBUTE = "disabled",
        CHANGE = "change",
        DEFAULT = "k-state-default",
        DISABLED = "k-state-disabled",
        FOCUSED = "k-state-focused",
        MOUSEDOWN = "mousedown",
        SELECT = "select",
        STATE_SELECTED = "k-state-selected",
        STATE_FILTER = "filter",
        STATE_ACCEPT = "accept",
        HOVER = "k-state-hover",
        HOVEREVENTS = "mouseenter mouseleave",
        NULL = null,
        proxy = $.proxy;

    var ComboBox = Select.extend(/** @lends kendo.ui.ComboBox.prototype */{
        /**
        * @constructs
        * @extends kendo.ui.Select
        * @param {DomElement} element DOM element
        * @param {Object} options Configuration options.
        * @option {Object | kendo.data.DataSource} [dataSource] A local JavaScript object or instance of DataSource or the data that the ComboBox will be bound to.
        * _example
        * var items = [{ text: "Item 1", value: "1" }, { text: "Item 2", value: "2" }];
        * $("#comboBox").kendoComboBox({
        *     dataSource: items
        * });
        * _exampleTitle To set after initialization
        * _example
        * $("#comboBox").kendoComboBox({
        *     dataSource: new kendo.data.DataSource({
        *         transport: {
        *             read: {
        *                 url: "Get/Items" // url to remote data source
        *             }
        *         }
        *     });
        * });
        * @option {Boolean} [enable] <true> Controls whether the ComboBox should be initially enabled.
        * _example
        * $("#comboBox").kendoComboBox({
        *     enable: false
        * });
        * _exampleTitle To set after initialization
        * _example
        * // get a reference to the ComboBox widget
        * var comboBox = $("#comboBox").data("kendoComboBox");
        * comboBox.enable(false);
        * @option {Number} [index] <-1> Defines the initial selected item.
        * _example
        * var items = [{ text: "Item 1", value: "1" }, { text: "Item 2", value: "2" }];
        * $("#comboBox").kendoComboBox({
        *     dataSource: items,
        *     index: 1 // 0 based from the start of the collection of objects. this selects "Item 2".
        * });
        * @option {Boolean} [autoBind] <true> Controls whether to bind the widget to the DataSource on initialization.
        * _example
        * $("#comboBox").kendoComboBox({
        *     autoBind: false
        * });
        * @option {Boolean} [highlightFirst] <true> Controls whether the first item will be automatically highlighted.
        * _example
        * $("#comboBox").kendoComboBox({
        *     highLightFirst: true
        * });
        * @option {Boolean} [suggest] <false> Controls whether the ComboBox should automatically auto-type the rest of text.
        * _example
        * $("#comboBox").kendoComboBox({
        *     suggest: false
        * });
        * @option {Number} [delay] <200> Specifies the delay in ms after which the ComboBox will start filtering dataSource.
        * _example
        * $("#comboBox").kendoComboBox({
        *     delay: 500
        * });
        * @option {Number} [minLength] <1> Specifies the minimum characters that should be typed before the ComboBox activates
        * _example
        * $("#comboBox").kendoComboBox({
        *     minLength: 3
        * });
        * @option {String} [dataTextField] <"text"> Sets the field of the data item that provides the text content of the list items.
        * _example
        * $("#comboBox").kendoComboBox({
        *     dataTextField: "Name",
        *     dataValueField: "ID"
        * });
        * @option {String} [dataValueField] <"value"> Sets the field of the data item that provides the value content of the list items.
        * _example
        * $("#comboBox").kendoComboBox({
        *     dataTextField: "Name",
        *     dataValueField: "ID"
        * });
        * @option {String} [filter] <"none"> Defines the type of filtration. If "none" the ComboBox will not filter the items.
        * _example
        * $("#comboBox").kendoComboBox({
        *     filter: "startswith"
        * });
        * @option {Number} [height] <200> Define the height of the drop-down list in pixels.
        * _example
        * $("#comboBox").kendoComboBox({
        *     height: 500
        * });
        * @option {Function} [template] Template to be used for rendering the items in the list.
        * _example
        *  //template
        * &lt;script id="template" type="text/x-kendo-tmpl"&gt;
        *       # if (data.BoxArt.SmallUrl) { #
        *           &lt;img src="${ data.BoxArt.SmallUrl }" alt="${ data.Name }" /&gt;Title:${ data.Name }, Year: ${ data.Name }
        *       # } else { #
        *           &lt;img alt="${ data.Name }" /&gt;Title:${ data.Name }, Year: ${ data.Name }
        *       # } #
        *  &lt;/script&gt;
        *
        *  //combobox initialization
        *  &lt;script&gt;
        *      $("#combobox").kendoComboBox({
        *          dataSource: dataSource,
        *          dataTextField: "Name",
        *          dataValueField: "Id",
        *          template: kendo.template($("#template").html())
        *      });
        *  &lt;/script&gt;
        * @option {Object} [animation] <> Animations to be used for opening/closing the popup. Setting to false will turn off the animation.
        * _exampleTitle Turn of animation
        * _example
        * $("#comboBox").kendoComboBox({
        *     animation: false
        * });
        * @option {Function} [animation.open] <> Animation to be used for opening of the popup.
        * _example
        *  //combobox initialization
        *  &lt;script&gt;
        *      $("#combobox").kendoComboBox({
        *          dataSource: dataSource,
        *          animation: {
        *             open: {
        *                 effects: "fadeIn",
        *                 duration: 300,
        *                 show: true
        *             }
        *          }
        *      });
        *  &lt;/script&gt;
        * @option {Function} [animation.close] <> Animation to be used for closing of the popup.
        * _example
        *  //combobox initialization
        *  &lt;script&gt;
        *      $("#combobox").kendoComboBox({
        *          dataSource: dataSource,
        *          animation: {
        *             close: {
        *                 effects: "fadeOut",
        *                 duration: 300,
        *                 hide: true
        *                 show: false
        *             }
        *          }
        *      });
        *  &lt;/script&gt;
        */
        init: function(element, options) {
            var that = this, wrapper;

            options = $.isArray(options) ? { dataSource: options } : options;

            Select.fn.init.call(that, element, options);

            options = that.options;
            element = that.element.focus(function() {
                        that.input.focus();
                      });

            options.placeholder = options.placeholder || element.attr("placeholder");

            that._reset();

            that._wrapper();

            that._input();

            that._popup();

            that._accessors();

            that._dataSource();

            that._enable();

            wrapper = that._inputWrapper;

            that.input.bind({
                keydown: proxy(that._keydown, that),
                focus: function() {
                    wrapper.addClass(FOCUSED);
                    that._placeholder(false);
                },
                blur: function() {
                    wrapper.removeClass(FOCUSED);
                    clearTimeout(that._typing);
                    that.text(that.text());
                    that._placeholder();
                    that._blur();
                }
            });

            that.selectedIndex = -1;
            that._old = that.value();

            if (options.autoBind) {
                that._selectItem();
            } else if (element.is(SELECT)) {
                that.input.val(element.children(":selected").text());
            }

            that._placeholder();

            kendo.notify(that);
        },

        options: {
            name: "ComboBox",
            enable: true,
            index: -1,
            autoBind: true,
            delay: 200,
            dataTextField: "",
            dataValueField: "",
            minLength: 0,
            height: 200,
            highlightFirst: true,
            template: "",
            filter: "none",
            placeholder: "",
            suggest: false
        },
        events:[
            /**
            * Fires when the drop-down list is opened
            * @name kendo.ui.ComboBox#open
            * @event
            * @param {Event} e
            * @example
            * $("#comboBox").kendoComboBox({
            *     open: function(e) {
            *             // handle event
            *         }
            * });
            * @exampleTitle To set after initialization
            * @example
            * // get a reference to instance of the Kendo UI ComboBox
            * var combobox = $("#comboBox").data("kendoComboBox");
            * // bind to the open event
            * combobox.bind("open", function(e) {
            *     // handle event
            * });
            */
            "open",

            /**
            * Fires when the drop-down list is closed
            * @name kendo.ui.ComboBox#close
            * @event
            * @param {Event} e
            * @example
            * $("#comboBox").kendoComboBox({
            *     close: function(e) {
            *         // handle event
            *     }
            * });
            * @exampleTitle To set after initialization
            * @example
            * // get a reference to instance of the Kendo UI ComboBox
            * var combobox = $("#comboBox").data("kendoComboBox");
            * // bind to the close event
            * combobox.bind("close", function(e) {
            *     // handle event
            * });
            */
            "close",

            /**
            * Fires when the value has been changed.
            * @name kendo.ui.ComboBox#change
            * @event
            * @param {Event} e
            * @example
            * $("#comboBox").kendoComboBox({
            *     change: function(e) {
            *         // handle event
            *     }
            * });
            * @exampleTitle To set after initialization
            * @example
            * // get a reference to instance of the Kendo UI ComboBox
            * var combobox = $("#comboBox").data("kendoComboBox");
            * // bind to the change event
            * combobox.bind("change", function(e) {
            *     // handle event
            * });
            */
            CHANGE,
            "dataBinding",
            "dataBound"
        ],
        setOptions: function(options) {
            Select.fn.setOptions.call(this, options);

            this._template();
            this._accessors();
        },

        current: function(li) {
            var that = this,
                current = that._current;

            if (li === undefined) {
                return current;
            }

            if (current) {
                current.removeClass(STATE_SELECTED);
            }

            Select.fn.current.call(that, li);
        },

        /**
        * Gets the dataItem of the selected LI element.
        * @returns {Object} The dataItem of the selected LI element or null if no item is selected.
        * @example
        * var combobox = $("#combobox").data("kendoComboBox");
        *
        * // get the dataItem.
        * var text = combobox.dataItem();
        */
        dataItem: function() {
            var that = this,
                index = that.selectedIndex;

            if (index > 0) {
                return that.dataSource.view()[index];
            } else {
                return NULL;
            }
        },

        /**
        * Closes the drop-down list.
        * @name kendo.ui.ComboBox#close
        * @function
        * @example
        * // get a reference to instance of the Kendo UI ComboBox
        * var combobox = $("#comboBox").data("kendoComboBox");
        * combobox.close();
        */
        /**
        * Enables/disables the combobox widget
        * @param {Boolean} enable Desired state
        * @example
        * // get a reference to instance of the Kendo UI ComboBox
        * var combobox = $("#comboBox").data("kendoComboBox");
        * // disables the combobox
        * combobox.enable(false);
        */
        enable: function(enable) {
            var that = this,
                input = that.input.add(that.element),
                wrapper = that._inputWrapper.unbind(HOVEREVENTS),
                arrow = that._arrow.parent().unbind(CLICK + " " + MOUSEDOWN);

            if (enable === false) {
                wrapper
                    .removeClass(DEFAULT)
                    .addClass(DISABLED);

                input.attr(ATTRIBUTE, ATTRIBUTE);
            } else {
                wrapper
                    .removeClass(DISABLED)
                    .addClass(DEFAULT)
                    .bind(HOVEREVENTS, that._toggleHover);

                input.removeAttr(ATTRIBUTE);
                arrow.bind(CLICK, function() { that.toggle() })
                     .bind(MOUSEDOWN, function(e) { e.preventDefault(); });
            }
        },

        /**
        * Opens the drop-down list.
        * @example
        * // get a reference to instance of the Kendo UI ComboBox
        * var combobox = $("#comboBox").data("kendoComboBox");
        * combobox.open();
        */
        open: function() {
            var that = this,
                serverFiltering = that.dataSource.options.serverFiltering;

            if (that.popup.visible()) {
                return;
            }

            if (!that.ul[0].firstChild || (that._state === STATE_ACCEPT && !serverFiltering)) {
                that._open = true;
                that._state = "";
                that._selectItem();
            } else {
                that.popup.open();
                if (that.selectedIndex > -1) {
                    that._scroll(that._current);
                }
            }
        },

        /**
        * Re-render the items of the drop-down list.
        * @name kendo.ui.ComboBox#refresh
        * @function
        * @example
        * // get a referenence to the Kendo UI ComboBox
        * var combobox = $("#combobox").data("kendoComboBox");
        * // re-render the items of the drop-down list.
        * combobox.refresh();
        */
        refresh: function() {
            var that = this,
                ul = that.ul[0],
                popup = that.popup,
                options = that.options,
                suggest = options.suggest,
                height = options.height,
                data = that._data(),
                length = data.length;

            that.trigger("dataBinding");

            ul.innerHTML = kendo.render(that.template, data);
            that._height(length);

            if (that.element.is(SELECT)) {
                that._options(data);
            }

            if (length) {
                if (suggest || options.highlightFirst) {
                    that.current($(ul.firstChild));
                }

                if (suggest && that.input.val()) {
                    that.suggest(that._current);
                }
            }

            if (popup.visible()) {
                popup._update();
            }

            if (that._open) {
                that._open = false;
                that.toggle(!!length);
            }

            that._makeUnselectable();

            that._hideBusy();
            that.trigger("dataBound");
        },

        /**
        * Selects drop-down list item and sets the value and the text of the combobox.
        * @param {jQueryObject | Number | Function} li LI element or index of the item or predicate function, which defines the item that should be selected.
        * @example
        * var combobox = $("#combobox").data("kendoComboBox");
        *
        * // selects by jQuery object
        * combobox.select(combobox.ul.children().eq(0));
        *
        * // selects by index
        * combobox.select(1);
        *
        * // selects item if its text is equal to "test" using predicate function
        * combobox.select(function(dataItem) {
        *     return dataItem.text === "test";
        * });
        */
        select: function(li) {
            var that = this;

            if (li === undefined) {
                return that.selectedIndex;
            } else {
                that._select(li);
                that._old = that._accessor();
            }
        },

        /**
        * Filters dataSource using the provided parameter and rebinds drop-down list.
        * @param {string} word The filter value.
        * @example
        * var combobox = $("#combobox").data("kendoComboBox");
        *
        * // Searches for item which has "In" in the name.
        * combobox.search("In");
        */
        search: function(word) {
            word = typeof word === "string" ? word : this.text();
            var that = this,
                length = word.length,
                options = that.options,
                filter = options.filter,
                field = options.dataTextField,
                expression;

            clearTimeout(that._typing);

            if (length >= options.minLength) {
                if (filter === "none") {
                    that._filter(word);
                } else {
                    that._open = true;
                    that._state = STATE_FILTER;

                    expression = that.dataSource.filter() || {};
                    removeFiltersForField(expression, field);

                    filters = expression.filters || [];
                    filters.push({ field: field, operator: filter, value: word });

                    that.dataSource.filter(filters);
                }
            }
        },

        /**
        * Forces a suggestion onto the text of the ComboBox.
        * @param {string} value Characters to force a suggestion.
        * @example
        * // note that this suggest is not the same as the configuration method
        * // suggest which enables/disables auto suggesting for the ComboBox
        * //
        * // get a referenence to the Kendo UI ComboBox
        * var combobox = $("#combobox").data("kendoComboBox");
        * // force a suggestion to the item with the name "Inception"
        * combobox.suggest("Inception");
        */
        suggest: function(word) {
            var that = this,
                element = that.input[0],
                value = that.text(),
                caret = List.caret(element),
                key = that._last,
                idx;

            if (key == keys.BACKSPACE || key == keys.DELETE) {
                that._last = undefined;
                return;
            }

            word = word || "";

            if (typeof word !== "string") {
                idx = word.index();

                if (idx > -1) {
                    word = that._text(that.dataSource.view()[idx]);
                } else {
                    word = "";
                }
            }

            if (caret <= 0) {
                caret = value.toLowerCase().indexOf(word.toLowerCase()) + 1;
            }

            if (word) {
                idx = word.toLowerCase().indexOf(value.toLowerCase());
                if (idx > -1) {
                    value += word.substring(idx + value.length);
                }
            } else {
                value = value.substring(0, caret);
            }

            if (value.length !== caret || !word) {

                if (value.toLowerCase() === word.toLowerCase()) {
                    value = word;
                }

                that.text(value);
                List.selectText(element, caret, value.length);
            }
        },

        /**
        * Gets/Sets the text of the ComboBox.
        * @param {String} text The text to set.
        * @returns {String} The text of the combobox.
        * @example
        * var combobox = $("#combobox").data("kendoComboBox");
        *
        * // get the text of the combobox.
        * var text = combobox.text();
        */
        text: function (text) {
            var that = this,
                textAccessor = that._text,
                input = that.input[0],
                value = input.value,
                dataItem;

            if (text !== undefined) {
                dataItem = that.dataItem();

                if (dataItem && textAccessor(dataItem) === value) {
                    return;
                }

                that._select(function(dataElement) {
                    return textAccessor(dataElement) === text;
                });

                if (that.selectedIndex < 0) {
                    that._custom(text);
                }

                input.value = text;
            } else {
                return value;
            }
        },

        /**
        * Toggles the drop-down list between opened and closed state.
        * @param {Boolean} toggle Defines the whether to open/close the drop-down list.
        * @example
        * var combobox = $("#combobox").data("kendoComboBox");
        *
        * // toggles the open state of the drop-down list.
        * combobox.toggle();
        */
        toggle: function(toggle) {
            var that = this;

            that._toggle(toggle);
        },

        /**
        * Gets/Sets the value of the combobox. If the value is undefined, text of the data item will be used.
        * @param {String} value The value to set.
        * @returns {String} The value of the combobox.
        * @example
        * var combobox = $("#combobox").data("kendoComboBox");
        *
        * // get the value of the combobox.
        * var value = combobox.value();
        *
        * // set the value of the combobox.
        * combobox.value("1"); //looks for item which has value "1"
        */
        value: function(value) {
            var that = this,
                element = that.element,
                idx;

            if (value !== undefined) {
                if (value && that._valueOnFetch(value)) {
                    return;
                }

                idx = that._index(value);

                if (idx > -1) {
                    that.select(idx);
                } else {
                    that.current(NULL);
                    that._custom(value);
                    that.text(value);
                }

                that._old = that._accessor();
            } else {
                return that._accessor();
            }
        },

        _accept: function(li) {
            var that = this;

            if (li && that.popup.visible()) {

                if (that._state === STATE_FILTER) {
                    that._state = STATE_ACCEPT;
                }

                that._focus(li);
            } else {
                that.text(that.text());
                that._change();
            }
        },

        _custom: function(value) {
            var that = this,
                element = that.element,
                custom = that._option;

            if (element.is(SELECT)) {
                if (!custom) {
                    custom = that._option = $("<option/>");
                    element.append(custom);
                }
                custom.text(value);
                custom[0].selected = true;
            } else {
                element.val(value);
            }
        },

        _filter: function(word) {
            word = word.toLowerCase();
            var that = this,
                options = that.options,
                dataSource = that.dataSource,
                predicate = function (dataItem) {
                    var text = that._text(dataItem);
                    if (text !== undefined) {
                        text = text + "";
                        if (text !== "" && word === "") {
                            return false;
                        }

                        return text.toLowerCase().indexOf(word) === 0;
                    }
                };

            if (!that.ul[0].firstChild) {
                dataSource.one(CHANGE, function () { that.search(word); }).fetch();
                return;
            }

            if (that._highlight(predicate) !== -1) {
                if (options.suggest && that._current) {
                    that.suggest(that._current);
                }
                that.open();
            }

            that._hideBusy();
        },

        _highlight: function(li) {
            var that = this, idx;

            if (li == undefined) {
                return -1;
            }

            li = that._get(li);
            idx = List.inArray(li[0], that.ul[0]);

            if (idx == -1) {
                if (that.options.highlightFirst && !that.text()) {
                    li = $(that.ul[0].firstChild);
                } else {
                    li = NULL;
                }
            }

            that.current(li);

            return idx;
        },

        _input: function() {
            var that = this,
                element = that.element[0],
                wrapper = that.wrapper,
                SELECTOR = ".k-input",
                input;

            input = wrapper.find(SELECTOR);

            if (!input[0]) {
                wrapper.append('<span unselectable="on" class="k-dropdown-wrap k-state-default"><input class="k-input" type="text" autocomplete="off"/><span unselectable="on" class="k-select"><span unselectable="on" class="k-icon k-arrow-down">select</span></span></span>')
                       .append(that.element);

                input = wrapper.find(SELECTOR);
            }

            input[0].style.cssText = element.style.cssText;
            input.addClass(element.className)
                 .val(element.value)
                 .css({
                    width: "100%",
                    height: "auto"
                 })
                 .show();

            if (placeholderSupported) {
                input.attr("placeholder", that.options.placeholder);
            }

            that._focused = that.input = input;
            that._arrow = wrapper.find(".k-icon");
            that._inputWrapper = $(wrapper[0].firstChild)
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                input = that.input;

            that._last = key;

            clearTimeout(that._typing);

            if (key == keys.TAB) {
                that.text(input.val());

                if (that._state === STATE_FILTER && that.selectedIndex > -1) {
                    that._state = STATE_ACCEPT;
                }
            } else if (!that._move(e)) {
               that._search();
            }
        },

        _placeholder: function(show) {
            if (placeholderSupported) {
                return;
            }

            var that = this,
                input = that.input,
                placeholder = that.options.placeholder,
                value;

            if (placeholder) {
                value = that.value();

                if (show === undefined) {
                    show = !value;
                }

                if (!show) {
                    if (value) {
                        placeholder = input.val();
                    } else {
                        placeholder = "";
                    }
                }

                input.toggleClass("k-readonly", show)
                     .val(placeholder);
            }
        },

        _search: function() {
            var that = this;

            that._typing = setTimeout(function() {
                var value = that.text();
                if (that._prev !== value) {
                    that._prev = value;
                    that.search(value);
                }
            }, that.options.delay);
        },

        _select: function(li) {
            var that = this,
                text,
                value,
                idx = that._highlight(li),
                data = that._data();

            that.selectedIndex = idx;

            if (idx !== -1) {
                that._current.addClass(STATE_SELECTED);

                data = data[idx];
                text = that._text(data);
                value = that._value(data);

                that._prev = that.input[0].value = text;
                that._accessor(value != undefined ? value : text, idx);
                that._placeholder();
            }
        },

        _selectItem: function() {
            var that = this,
                dataSource = that.dataSource,
                expression = dataSource.filter() || {};

            removeFiltersForField(expression, that.options.dataTextField);

            that.dataSource.one(CHANGE, function() {
                var value = that.value();
                if (value) {
                    that.value(value);
                } else {
                    that.select(that.options.index);
                }
            }).filter(expression);
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("span.k-widget")) {
                wrapper = element.hide().wrap("<span />").parent();
            }

            wrapper[0].style.cssText = element[0].style.cssText;
            that.wrapper = wrapper.addClass("k-widget k-combobox k-header").show();
        }
    });

    function removeFiltersForField(expression, field) {
        if (!field) {
            return;
        }

        if (expression.filters) {
            expression.filters = $.grep(expression.filters, function(filter) {
                removeFiltersForField(filter, field);
                if (filter.filters) {
                    return filter.filters.length;
                } else {
                    return filter.field != field;
                }
            });
        }
    }

    ui.plugin(ComboBox);
})(jQuery);
