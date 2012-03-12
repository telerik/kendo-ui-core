/**
 * @fileOverview Provides a DropDownList implementation which can be used to display a list of values and allows the
 * selection of a single value from the list.
 */

(function($, undefined) {
    /**
     * @name kendo.ui.DropDownList.Description
     *
     * @section
     * <p>
     *  A <strong>DropDownList</strong> displays a list of values and allows the selection of a single value from the
     *  list. It is a richer version of the standard HTML select, providing support for local and remote data binding,
     *  item templates, and configurable options for controlling the list behavior.
     * </p>
     * <p>
     *  If you want to allow user input, use the
     *  <a href="../combobox/index.html" title="Kendo UI ComboBox">Kendo UI ComboBox</a>.
     * </p>
     * <h3>Getting Started</h3>
     * <p>There are two basic ways to create a <strong>DropDownList</strong>:</p>
     * <ol>
     *  <li>From a input element, using data binding to define the list items</li>
     *  <li>From a select element, using HTML to define the list items</li>
     * </ol>
     * <p>
     *  Regardless of the initialization technique, the resulting <strong>DropDownList</strong> will look and function
     *  identically.
     * </p>
     *
     * @exampleTitle Creating a dropdownlist from existing input HTML element
     * @example
     * <input id="dropDownList" />
     *
     * @section
     * <p></p>
     * <p>
     *  Initialization of a <strong>DropDownList</strong> should occur after the DOM is fully loaded. It is recommended
     *  that initialization the <strong>DropDownList</strong> occur within a handler is provided to
     *  $(document).ready().
     * </p>
     *
     * @exampleTitle Initialize a DropDownList using a selector within $(document).ready()
     * @example
     * $(document).ready(function() {
     *     $("#dropDownList").kendoDropDownList(
     *         [
     *             { text: "Item1", value: "1" },
     *             { text: "Item2", value: "2" }
     *         ]
     *     );
     * });
     *
     * @exampleTitle Create a DropDownList from existing select HTML element with a defined structure
     * @example
     * <select id="dropDownList">
     *     <option>Item 1</option>
     *     <option>Item 2</option>
     *     <option>Item 3</option>
     * </select>
     *
     * @exampleTitle Initialize a DropDownList using a selector within $(document).ready()
     * @example
     * $(document).ready(function(){
     *     $("#dropDownList").kendoDropDownList();
     * });
     *
     * @section
     * <h3>Binding to Data</h3>
     * <p>
     *  A <strong>DropDownList</strong> can be bound to both local arrays and remote data via the DataSource component.
     *  Arrays are appropriate for limited value options while remote data binding is better suited for larger data
     *  sets. With remote binding, options will be loaded on-demand, similar to an <strong>AutoComplete</strong>.
     * </p>
     *
     * @exampleTitle Binding to a remote OData service
     * @example
     * $(document).ready(function() {
     *     $("#titles").kendoDropDownList({
     *         index: 0,
     *         dataTextField: "Name",
     *         dataValueField: "Id",
     *         filter: "contains",
     *         dataSource: {
     *             type: "odata",
     *             serverFiltering: true,
     *             serverPaging: true,
     *             pageSize: 20,
     *             transport: {
     *                 read: "http://odata.netflix.com/Catalog/Titles"
     *             }
     *         }
     *     });
     * });
     *
     * @section
     * <h3>Customizing Item Templates</h3>
     * <p>
     *  A DropDownList leverages templates, providing an ability to control item rendering. For a complete overview of
     *  the template capabilities and syntax of Kendo UI Web, please review the
     *  <a href="../templates/index.html" title="Kendo UI Template">Kendo UI Template</a> demos and documentation.
     * </p>
     *
     * @exampleTitle Basic item template customization
     * @example
     * <!-- HTML -->
     * <input id="titles" />
     *
     * <!-- Template -->
     * <script id="scriptTemplate" type="text/x-kendo-template">
     *     # if (data.BoxArt.SmallUrl) { #
     *         <img src="${ data.BoxArt.SmallUrl }" alt="${ data.Name }" />Title:${ data.Name }, Year: ${ data.Name }
     *     # } else { #
     *         <img alt="${ data.Name }" />Title:${ data.Name }, Year: ${ data.Name }
     *     # } #
     * </script>
     *
     * <!-- DropDownList initialization -->
     * <script type="text/javascript">
     *     $(document).ready(function() {
     *         $("#titles").kendoDropDownList({
     *             autoBind: false,
     *             dataTextField: "Name",
     *             dataValueField: "Id",
     *             template: $("#scriptTemplate").html(),
     *             dataSource: {
     *                 type: "odata",
     *                 serverFiltering: true,
     *                 serverPaging: true,
     *                 pageSize: 20,
     *                 transport: {
     *                     read: "http://odata.netflix.com/Catalog/Titles"
     *                 }
     *             }
     *         });
     *     });
     * </script>
     *
     * @section
     * <h3>Accessing an Existing DropDownList</h3>
     * <p>
     *  You can reference an existing <b>DropDownList</b> instance via
     *  <a href="http://api.jquery.com/jQuery.data/">jQuery.data()</a>. Once a reference has been established, you can
     *  use the API to control its behavior.
     * </p>
     *
     * @exampleTitle Accessing an existing DropDownList instance
     * @example
     * var dropDownList = $("#dropDownList").data("kendoDropDownList");
     *
     */
    var kendo = window.kendo,
        ui = kendo.ui,
        Select = ui.Select,
        CLICK = kendo.support.touch ? "touchend" : "click",
        ATTRIBUTE = "disabled",
        CHANGE = "change",
        SELECT = "select",
        FOCUSED = "k-state-focused",
        DEFAULT = "k-state-default",
        DISABLED = "k-state-disabled",
        SELECTED = "k-state-selected",
        HOVER = "k-state-hover",
        HOVEREVENTS = "mouseenter mouseleave",
        INPUTWRAPPER = ".k-dropdown-wrap",
        trimRegExp = /^\s/,
        proxy = $.proxy;

    var DropDownList = Select.extend( /** @lends kendo.ui.DropDownList.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Select
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {kendo.data.DataSource | Object} [dataSource] Instance of DataSource or the data that the DropDownList will be bound to.
         * _exampleTitle Bind to a local array
         * _example
         * // bind to local data
         * var items = [ { Id: 0, Title: "Manager" }, { Id: 1, Title: "Developer" }, { Id: 2, Title: "Vice President" } ];
         * $("#dropdownlist").kendoDropDownList({
         *     dataSource: items,
         *     dataTextField: "Title",
         *     dataValueField: "Id"
         * });
         * _exampleTitle Bind to a remote URL
         * _example
         * $("#dropdownlist").kendoDropDownList({
         *     dataSource: {
         *         transport: {
         *             read: "titles.json"
         *         }
         *     },
         *     dataTextField: "Title",
         *     dataValueField: "Id"
         * });
         * @option {Boolean} [enable] <true> Controls whether the DropDownList should be initially enabled.
         * _example
         * $("#dropdownlist").kendoDropDownList({
         *     enabled: false // dropdown list will not be enabled
         * });
         * _exampleTitle To set after initialization
         * _example
         * // get a reference to the dropdown list
         * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
         * // disable the dropdown
         * dropdownlist.enable(false);
         * @option {Number} [index] <0> Defines the initial selected item.
         * _example
         * $("#dropdownlist").kendoDropDownList({
         *     index: 1 // selects the second item in the dropdown list
         * });
         * @option {Boolean} [autoBind] <true> Controls whether to bind the widget on initialization.
         * _example
         * $("#dropdownlist").kendoDropDownList({
         *     autoBind: false
         * });
         * @option {Number} [delay] <500> Specifies the delay in ms before the search text typed by the end user is cleared.
         * _example
         * $("#dropdownlist").kendoDropDownList({
         *     delay: 1000 // wait 1 second before clearing the user input
         * });
         * @option {String} [dataTextField] <"text"> Sets the field of the data item that provides the text content of the list items.
         * _example
         * var items = [ { Id: 0, Title: "Manager" }, { Id: 1, Title: "Developer" }, { Id: 2, Title: "Vice President" } ];
         * $("#dropdownlist").kendoDropDownList({
         *     dataSource: items,
         *     dataTextField: "Title",
         *     dataValueField: "Id"
         * });
         * @option {String} [dataValueField] <"value"> Sets the field of the data item that provides the value content of the list items.
         * _example
         * var items = [ { Id: 0, Title: "Manager" }, { Id: 1, Title: "Developer" }, { Id: 2, Title: "Vice President" } ];
         * $("#dropdownlist").kendoDropDownList({
         *     dataSource: items,
         *     dataTextField: "Title",
         *     dataValueField: "Id"
         * });
         * @option {Number} [height] <200> Define the height of the drop-down list in pixels.
         * _example
         * $("#dropdownlist").kendoDropDownList({
         *     height: 400
         * });
         * @option {String} [optionLabel] Define the text of the default empty item.
         * _example
         * $("#dropdownlist").kendoDropDownList({
         *     optionLabel: "Select An Option"
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
         *  //dropdownlist initialization
         *  &lt;script&gt;
         *      $("#dropdownlist").kendoDropDownList({
         *          dataSource: dataSource,
         *          dataTextField: "Name",
         *          dataValueField: "Id",
         *          template: kendo.template($("#template").html())
         *      });
         *  &lt;/script&gt;
         * @option {Object} [animation] <> Animations to be used for opening/closing the popup. Setting to false will turn of the animation.
         * @option {Function} [animation.open] <> Animation to be used for opening of the popup.
         * _example
         *  //dropdownlist initialization
         *  &lt;script&gt;
         *      $("#dropdownlist").kendoDropDownList({
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
         *  //dropdownlist initialization
         *  &lt;script&gt;
         *      $("#dropdownlist").kendoDropDownList({
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
            var that = this,

            options = $.isArray(options) ? { dataSource: options } : options;

            Select.fn.init.call(that, element, options);

            options = that.options;
            element = that.element.focus(function() {
                that.wrapper.focus();
            });

            that._reset();

            that._word = "";

            that._wrapper();

            that._span();

            that._popup();

            that._accessors();

            that._dataSource();

            that._enable();

            that.selectedIndex = -1;

            if (options.autoBind) {
                that._selectItem();
            } else {
                if (element.is(SELECT)) {
                    that.text(element.children(":selected").text());
                }

                if (!that.text().replace(trimRegExp, "") && options.optionLabel) {
                    that.text(options.optionLabel);
                }
            }

            kendo.notify(that);
        },

        options: {
            name: "DropDownList",
            enable: true,
            index: 0,
            autoBind: true,
            template: "",
            delay: 500,
            dataTextField: "",
            dataValueField: "",
            height: 200
        },
        events: [
            /**
            * Fires when the drop-down list is opened
            * @name kendo.ui.DropDownList#open
            * @event
            * @param {Event} e
            * @example
            * $("#dropdownlist").kendoDropDownList({
            *     open: function(e) {
            *         // handle event
            *     }
            * });
            * @exampleTitle To set after initialization
            * @example
            * // get a reference to the dropdown list
            * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
            * // bind to the open event
            * dropdownlist.bind("open", function(e) {
            *     // handle event
            * });
            */
            "open",

            /**
            * Fires when the drop-down list is closed
            * @name kendo.ui.DropDownList#close
            * @event
            * @param {Event} e
            * @example
            * $("#dropdownlist").kendoDropDownList({
            *     close: function(e) {
            *         // handle event
            *     }
            * });
            * @exampleTitle To set after initialization
            * @example
            * // get a reference to the dropdown list
            * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
            * // bind to the close event
            * dropdownlist.bind("close", function(e) {
            *     // handle event
            * });
            */
            "close",

            /**
            * Fires when the value has been changed.
            * @name kendo.ui.DropDownList#change
            * @event
            * @param {Event} e
            * @example
            * $("#dropdownlist").kendoDropDownList({
            *     change: function(e) {
            *         // handle event
            *     }
            * });
            * @exampleTitle To set after initialization
            * @example
            * // get a reference to the dropdown list
            * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
            * // bind to the change event
            * dropdownlist.bind("change", function(e) {
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

        /**
        * Closes the drop-down list.
        * @name kendo.ui.DropDownList#close
        * @function
        * @example
        * // get a reference to the dropdown widget
        * var dropdownList = $("#dropdownList").data("kendoDropDownList");
        * // close the dropdown
        * dropdownlist.close();
        */

        /**
        * Gets the dataItem of the selected LI element.
        * @name kendo.ui.DropDownList#dataItem
        * @function
        * @returns {Object} The dataItem of the selected LI element or null if no item is selected.
        * @example
        * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
        *
        * // get the dataItem.
        * var dataItem = dropdownlist.dataItem();
        */

        /**
        * Enables/disables the dropdownlist widget
        * @param {Boolean} enable Desired state
        * @example
        * // get a reference to the dropdown list
        * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
        * // disable the dropdown list
        * dropdownlist.enable(false);
        */
        enable: function(enable) {
            var that = this,
                element = that.element,
                wrapper = that.wrapper.unbind(),
                dropDownWrapper = that._inputWrapper.unbind(HOVEREVENTS);

            if (enable === false) {
                element.attr(ATTRIBUTE, ATTRIBUTE);

                dropDownWrapper
                    .removeClass(DEFAULT)
                    .addClass(DISABLED);
            } else {
                element.removeAttr(ATTRIBUTE, ATTRIBUTE);

                dropDownWrapper
                    .addClass(DEFAULT)
                    .removeClass(DISABLED)
                    .bind(HOVEREVENTS, that._toggleHover);

                wrapper
                    .bind({
                        click: function(e) {
                            e.preventDefault();
                            that.toggle();
                        },
                        keydown: proxy(that._keydown, that),
                        keypress: proxy(that._keypress, that),
                        focusin: function() {
                            dropDownWrapper.addClass(FOCUSED);
                        },
                        focusout: function(e) {
                            that._blur();
                            dropDownWrapper.removeClass(FOCUSED);
                        }
                    });
            }
        },

        /**
        * Opens the drop-down list.
        * @example
        * // get a reference to the dropdown list
        * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
        * // open the drop down
        * dropdownlist.open();
        */
        open: function() {
            var that = this,
                current = that._current;

            if (!that.ul[0].firstChild) {
                that._open = true;
                that._selectItem();
            } else {
                that.popup.open();
                if (current) {
                    that._scroll(current[0]);
                }
            }
        },

        /**
        * Toggles the drop-down list between opened and closed state.
        * @param {Boolean} toggle Defines the whether to open/close the drop-down list.
        * @example
        * // get a reference to the dropdown list
        * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
        *
        * // toggles the open state of the drop-down list.
        * dropdownlist.toggle();
        */
        toggle: function(toggle) {
            this._toggle(toggle);
        },

        /**
        * Re-render the items in drop-down list.
        * @name kendo.ui.DropDownList#refresh
        * @function
        * @example
        * // get a referenence to the Kendo UI DropDownList
        * var dropdownlist = $("dropdownlist").data("kendoDropDownList");
        * // re-render the items in drop-down list.
        * dropdownlist.refresh();
        */
        refresh: function() {
            var that = this,
                data = that._data(),
                length = data.length;

            that.trigger("dataBinding");

            that.ul[0].innerHTML = kendo.render(that.template, data);
            that._height(length);

            if (that.element.is(SELECT)) {
                that._options(data);
            }

            if (that._open) {
                that.toggle(length);
            }

            that._hideBusy();
            that._makeUnselectable();

            that.trigger("dataBound");
        },



        /**
        * Selects item, which starts with the provided parameter.
        * @param {string} word The search value.
        * @example
        * // get a reference to the dropdown list
        * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
        *
        * // Selects item which starts with "In".
        * dropdownlist.search("In");
        */
        search: function(word) {
            if(word){
                var that = this;
                word = word.toLowerCase();

                that._select(function(dataItem) {
                    var text = that._text(dataItem);
                    if (text !== undefined) {
                        return (text + "").toLowerCase().indexOf(word) === 0;
                    }
                });
            }
        },

        /**
        * Selects drop-down list item and sets the value and the text of the dropdownlist.
        * @param {jQueryObject | Number | Function} li LI element or index of the item or predicate function, which defines the item that should be selected.
        * @example
        * // get a reference to the dropdown list
        * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
        *
        * // selects by jQuery object
        * dropdownlist.select(dropdownlist.ul.children().eq(0));
        *
        * // selects by index
        * dropdownlist.select(1);
        *
        * // selects item if its text is equal to "test" using predicate function
        * dropdownlist.select(function(dataItem) {
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
        * Gets/Sets the text of the dropdownlist.
        * @param {String} text The text to set.
        * @returns {String} The text of the dropdownlist.
        * @example
        * // get a reference to the dropdown list
        * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
        *
        * // get the text of the dropdownlist.
        * var text = dropdownlist.text();
        */
        text: function (text) {
            var span = this.span;

            if (text !== undefined) {
                span.text(text);
            } else {
                return span.text();
            }
        },

        /**
        * Gets/Sets the value of the dropdownlist. The value will not be set if there is no item with such value. If value is undefined, text of the data item is used.
        * @param {String} value The value to set.
        * @returns {String} The value of the dropdownlist.
        * @example
        * // get a reference to the dropdown list
        * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
        *
        * // get the value of the dropdownlist.
        * var value = dropdownlist.value();
        *
        * // set the value of the dropdownlist.
        * dropdownlist.value("1"); //looks for item which has value "1"
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

                that.select(idx > -1 ? idx : 0);
            } else {
                return that._accessor();
            }
        },

        _selectItem: function() {
            var that = this;

            that.dataSource.one(CHANGE, function() {
                var value = that.value();
                if (value) {
                    that.value(value);
                } else {
                    that.select(that.options.index);
                }
            }).fetch();
        },

        _accept: function(li) {
            this._focus(li);
        },

        _data: function() {
            var that = this,
                options = that.options,
                optionLabel = options.optionLabel,
                textField = options.dataTextField,
                valueField = options.dataValueField,
                data = that.dataSource.view(),
                length = data.length,
                first = optionLabel,
                idx = 0;

            if (optionLabel && length) {
                if (textField) {
                    first = {};

                    textField = textField.split(".");
                    valueField = valueField.split(".");

                    assign(first, valueField, "");
                    assign(first, textField, optionLabel);
                }

                first = new kendo.data.ObservableArray([first]);

                for (; idx < length; idx++) {
                    first.push(data[idx]);
                }
                data = first;
            }

            return data;
        },

        _keydown: function(e) {
            var that = this,
                key = e.keyCode,
                keys = kendo.keys,
                ul = that.ul[0];

            that._move(e);

            if (key === keys.HOME) {
                e.preventDefault();
                that._select(ul.firstChild);
            } else if (key === keys.END) {
                e.preventDefault();
                that._select(ul.lastChild);
            }
        },

        _keypress: function(e) {
            var that = this;

            setTimeout(function() {
                that._word += String.fromCharCode(e.keyCode || e.charCode);
                that._search();
            });
        },

        _popup: function() {
            Select.fn._popup.call(this);
            this.popup.one("open", function() {
                this.wrapper = kendo.wrap(this.element)
                                    .addClass("km-popup");
            });
        },

        _search: function() {
            var that = this;
            clearTimeout(that._typing);

            that._typing = setTimeout(function() {
                that._word = "";
            }, that.options.delay);

            that.search(that._word);
        },

        _select: function(li) {
            var that = this,
                element = that.element[0],
                current = that._current,
                data = that._data(),
                value,
                text,
                idx;

            li = that._get(li);

            if (li && li[0] && !li.hasClass(SELECTED)) {
                if (current) {
                    current.removeClass(SELECTED);
                }

                idx = ui.List.inArray(li[0], that.ul[0]);
                if (idx > -1) {
                    data = data[idx];
                    text = that._text(data);
                    value = that._value(data);
                    that.selectedIndex = idx;

                    that.text(text);
                    that._accessor(value != undefined ? value : text, idx);
                    that.current(li.addClass(SELECTED));
                }
            }
        },

        _span: function() {
            var that = this,
                wrapper = that.wrapper,
                SELECTOR = ".k-input",
                span;

            span = wrapper.find(SELECTOR);

            if (!span[0]) {
                wrapper.append('<span unselectable="on" class="k-dropdown-wrap k-state-default"><span unselectable="on" class="k-input">&nbsp;</span><span class="k-select"><span class="k-icon k-arrow-down">select</span></span></span>')
                       .append(that.element);

                span = wrapper.find(SELECTOR);
            }

            that.span = span;
            that._arrow = wrapper.find(".k-icon");
            that._inputWrapper = $(wrapper[0].firstChild)
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                DOMelement = element[0],
                TABINDEX = "tabIndex",
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("span.k-widget")) {
                wrapper = element.wrap("<span />").parent();
            }

            if (!wrapper.attr(TABINDEX)) {
                wrapper.attr(TABINDEX, 0);
            }

            wrapper[0].style.cssText = DOMelement.style.cssText;
            element.hide();

            that._focused = that.wrapper = wrapper
                              .attr("unselectable", "on")
                              .addClass("k-widget k-dropdown k-header")
                              .addClass(DOMelement.className);
        }
    });

    function assign(instance, fields, value) {
        var idx = 0,
            lastIndex = fields.length - 1,
            field;

        for (; idx < lastIndex; ++idx) {
            field = fields[idx];

            if (!(field in instance)) {
                instance[field] = {};
            }

            instance = instance[field];
        }

        instance[fields[lastIndex]] = value;
    }

    ui.plugin(DropDownList);
})(jQuery);
