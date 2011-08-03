(function($, undefined) {
    /**
    * @name kendo.ui.DropDownList.Description
    *
    * @section
    *   <p>
    *       The DropDownList widget displays flat data as a list of values and allows the
    *       selection of a single value from the list. It is a richer version of the standard
    *       HTML select, providing support for local and remote data binding, item templates, and
    *       configurable options for controlling the list behavior.
    *   </p>
    *   If you do not want to allow user input, use the <a href="../combobox/index.html" title="Kendo UI ComboBox">Kendo UI ComboBox</a>.
    *
    *   <h3>Getting Started</h3>
    *   There are two basic ways to create a DropDownList:
    *   <ol>
    *       <li>From a basic HTML input element, using data binding to define the list items</li>
    *       <li>From a HTML select element, using HTML to define the list items</li>
    *   </ol>
    *   Regardless of the initialization technique, the resulting Kendo UI DropDownList will look and function identically.
    *
    * @exampleTitle Creating a dropdownlist from existing input HTML element
    * @example
    * <!-- HTML -->
    * <input id="dropdownlist" />
    *
    * @exampleTitle DropDownList initialization
    * @example
    *   $(document).ready(function(){
    *      $("#dropdownlist").kendoDropDownList([{text: "Item1", value: "1"}, {text: "Item2", value: "2"}]);
    *   });
    *
    * @exampleTitle Creating a dropdownlist from existing select HTML element
    * @example
    * <!-- HTML -->
    * <select id="dropdownlist">
    *     <option>Item 1</option>
    *     <option>Item 2</option>
    *     <option>Item 3</option>
    * </select>
    *
    * @exampleTitle DropDownList initialization
    * @example
    *   $(document).ready(function(){
    *       $("#dropdownlist").kendDropDownList();
    *   });
    *
    * @section
    *   <h3>Binding to Data</h3>
    *   <p>
    *       The DropDownList can be bound to both local JavaScript Arrays and remote data via the
    *       Kendo DataSource component. Local JavaScript Arrays are appropriate for limited value
    *       options, while remote data binding is better for larger data sets. With remote binding,
    *       options will be loaded on-demand, similar to AutoComplete.
    *   </p>
    * @exampleTitle Binding to a remote OData service
    * @example
    *   $(document).ready(function() {
    *       $("#titles").kendoDropDownList({
    *           index: 0,
    *           dataTextField: "Name",
    *           dataValueField: "Id",
    *           filter: "contains",
    *           dataSource: {
    *               type: "odata",
    *               severFiltering: true,
    *               serverPaging: true,
    *               pageSize: 20,
    *               transport: {
    *                   read: "http://odata.netflix.com/Catalog/Titles"
    *               }
    *           }
    *       });
    *   });
    *
    * @section
    *   <h3>Customizing Item Templates</h3>
    *   <p>
    *       DropDownList leverages Kendo UI high-performance Templates to give you complete control
    *       over item rendering. For a complete overview of Kendo UI Template capabilities and syntax,
    *       please review the <a href="../templates/index.html" title="Kendo UI Template">Kendo UI Template</a> component demos and documentation.
    *   </p>
    * @exampleTitle Basic item template customization
    * @example
    *   <!-- HTML -->
    *   <input id="titles"/>
    *
    *   <!-- Template -->
    *   <script id="scriptTemplate" type="text/x-kendo-template">
    *       <# if (data.BoxArt.SmallUrl) { #>
    *           <img src="${ data.BoxArt.SmallUrl }" alt="${ data.Name }" />Title:${ data.Name }, Year: ${ data.Name }
    *       <# } else { #>
    *           <img alt="${ data.Name }" />Title:${ data.Name }, Year: ${ data.Name }
    *       <# } #>
    *   </script>
    *
    *   <!-- DropDownList initialization -->
    *   <script type="text/javascript">
    *       $(document).ready(function() {
    *           $("#titles").kendoDropDownList({
    *               autoBind: false,
    *               dataTextField: "Name",
    *               dataValueField: "Id",
    *               template: $("#scriptTemplate").html(),
    *               dataSource: {
    *                   type: "odata",
    *                   severFiltering: true,
    *                   serverPaging: true,
    *                   pageSize: 20,
    *                   transport: {
    *                       read: "http://odata.netflix.com/Catalog/Titles"
    *                   }
    *               }
    *           });
    *       });
    *   </script>
    */
    var kendo = window.kendo,
        ui = kendo.ui,
        Select = ui.Select,
        CHANGE = "change",
        SELECT = "select",
        SELECTED = "t-state-selected",
        DISABLED = "t-state-disabled",
        HOVER = "t-state-hover",
        HOVEREVENTS = "mouseenter mouseleave",
        INPUTWRAPPER = ".t-dropdown-wrap",
        proxy = $.proxy;

    var DropDownList = Select.extend( /** @lends kendo.ui.DropDownList.prototype */ {
        /**
         * @constructs
         * @extends kendo.ui.Select
         * @param {DomElement} element DOM element
         * @param {Object} options Configuration options.
         * @option {kendo.data.DataSource|Object} [dataSource] Instance of DataSource or the data that the DropDownList will be bound to.
         * @option {Boolean} [enable] <true> Controls whether the DropDownList should be initially enabled.
         * @option {Number} [index] <0> Defines the initial selected item.
         * @option {Boolean} [autoBind] <true> Controls whether to bind the component on initialization.
         * @option {Number} [delay] <500> Specifies the delay in ms before the search text typed by the end user is cleared.
         * @option {String} [dataTextField] <"text"> Sets the field of the data item that provides the text content of the list items.
         * @option {String} [dataValueField] <"value"> Sets the field of the data item that provides the value content of the list items.
         * @option {Number} [height] <200> Define the height of the drop-down list in pixels.
         */
        init: function(element, options) {
            var that = this;

            options = $.isArray(options) ? { dataSource: options } : options;

            Select.fn.init.call(that, element, options);

            that._word = "";

            that._wrapper();

            that._span();

            that._popup();

            that._accessors();

            that._dataSource();

            that.bind([
                /**
                * Fires when the drop-down list is opened
                * @name kendo.ui.DropDownList#open
                * @event
                * @param {Event} e
                */
                /**
                * Fires when the drop-down list is closed
                * @name kendo.ui.DropDownList#close
                * @event
                * @param {Event} e
                */
                /**
                * Fires when the value has been changed.
                * @name kendo.ui.DropDownList#change
                * @event
                * @param {Event} e
                */
                CHANGE
            ], that.options);

            if (that.element.prop("disabled")) {
                that.options.enable = false;
            }

            that.enable(that.options.enable);

            if (that.options.autoBind) {
                that.showBusy();
                that.dataSource.query();
            } else if (that.element.is(SELECT)) {
                that.text(that.element.children(":selected").text());
            }
        },

        options: {
            enable: true,
            index: 0,
            autoBind: true,
            delay: 500,
            dataTextField: "text",
            dataValueField: "value",
            height: 200
        },

        /**
        * Closes the drop-down list.
        * @name kendo.ui.DropDownList#close
        * @function
        * @example
        * dropdownlist.close();
        */

        /**
        * Hides loading icon
        * @name kendo.ui.DropDownList#hideBusy
        * @function
        * @example
        * dropdownlist.hideBusy();
        *
        */

        /**
        * Shows loading icon
        * @name kendo.ui.DropDownList#showBusy
        * @function
        * @example
        * dropdownlist.hideBusy();
        *
        */

        /**
        * Enables/disables the dropdownlist component
        * @param {Boolean} enable Desired state
        */
        enable: function(enable) {
            var that = this,
                wrapper = that.wrapper,
                element = that.element,
                ATTRIBUTE = "disabled";

            if (enable === false) {
                wrapper
                    .addClass(DISABLED)
                    .unbind()
                    .children(INPUTWRAPPER)
                    .unbind(HOVEREVENTS);
                element.attr(ATTRIBUTE, ATTRIBUTE);
            } else {
                element.removeAttr(ATTRIBUTE, ATTRIBUTE);
                wrapper
                    .removeClass(DISABLED)
                    .bind({
                        keydown: proxy(that._keydown, that),
                        keypress: proxy(that._keypress, that),
                        focusin: function() {
                            clearTimeout(that._bluring);
                        },
                        click: function() {
                            if(!that.ul[0].firstChild) {
                                that.showBusy();
                                that.dataSource.read();
                            } else {
                                that.toggle();
                            }
                        },
                        focusout: function(e) {
                            that._bluring = setTimeout(function() {
                                that._blur();
                            }, 100);
                        }
                    })
                    .children(INPUTWRAPPER)
                    .bind(HOVEREVENTS, that._toggleHover);
            }
        },

        /**
        * Opens the drop-down list.
        * @example
        * dropdownlist.open();
        */
        open: function() {
            var that = this,
                current = that._current;

            if (!that.ul[0].firstChild) {
                that.showBusy();
                that.options.autoBind = false;
                that.dataSource.query();
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
        * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
        *
        * // toggles the open state of the drop-down list.
        * dropdownlist.toggle();
        */
        toggle: function(toggle) {
            var that = this;

            if (toggle === undefined) {
                toggle = !that.popup.visible();
            }

            that[toggle ? "open" : "close"]();
        },

        refresh: function() {
            var that = this,
                value = that.value(),
                options = that.options,
                data = that.dataSource.view(),
                length = data.length;

            that.ul[0].innerHTML = kendo.render(that.template, data);
            that._height(length);

            if (that.element.is(SELECT)) {
                that._options(data);
            }

            if (value) {
                that.value(value);
            } else {
                that.select(options.index);
            }

            that.previous = that.value();

            if (!options.autoBind) {
                that.toggle(length);
            }

            that.hideBusy();
        },

        /**
        * Selects item, which starts with the provided parameter.
        * @param {string} word The search value.
        * @example
        * var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
        *
        * // Selects item which starts with "In".
        * autocomplete.search("In");
        */
        search: function(word) {
            if(word){
                var that = this;
                word = word.toLowerCase();

                that.select(function(dataItem) {
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
            var that = this,
                idx,
                length,
                text,
                value,
                current = that._current,
                data = that.dataSource.view(),
                children = that.ul[0].childNodes;

            if (current) {
                current.removeClass(SELECTED);
            }

            if (typeof li === "function") {
                for (idx = 0, length = data.length; idx < length; idx++) {
                    if (li(data[idx])) {
                        li = idx;
                        break;
                    }
                }
            }

            if (typeof li === "number") {
                if (li < 0) {
                    return;
                }

                li = $(children[li]);
            }

            if (li[0] && !li.hasClass(SELECTED)) {
                idx = $.inArray(li[0], children);

                if (idx === -1) {
                    return;
                }

                data = data[idx];
                text = that._text(data);
                value = that._value(data);

                that.text(text);
                that.element[0].value = value != undefined ? value : text;
                that.current(li.addClass(SELECTED));
            }
        },

        /**
        * Gets/Sets the text of the dropdownlist.
        * @param {String} text The text to set.
        * @returns {String} The text of the dropdownlist.
        * @example
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
                element = that.element;

            if (value !== undefined) {
                var data = that.dataSource.view(),
                    index;

                if (data[0]) {
                    index = $.map(data, function(dataItem, idx) {
                        var dataItemValue = that._value(dataItem);
                        if (dataItemValue === undefined) {
                            dataItemValue = that._text(dataItem);
                        }

                        if (dataItemValue == value) {
                            return idx;
                        }
                    });
                    that.select(index[0] || 0);
                    that.previous = element.val();
                }
            } else {
                return element.val();
            }
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVER, e.type == "mouseenter");
        },

        _accept: function(li) {
            this._focus(li);
        },

        _keydown: function(e) {
            var prevent,
                that = this,
                key = e.keyCode,
                current = that._current,
                keys = kendo.keys;

            if (e.altKey) {
                that.toggle(key === keys.DOWN);
            } else if (key === keys.DOWN) {
                that._move(current.next());

                prevent = true;
            } else if (key === keys.UP) {
                that._move(current.prev());

                prevent = true;
            } else if (key === keys.HOME) {
                that._move(that.ul.children().first());

                prevent = true;
            } else if (key === keys.END) {
                that._move(that.ul.children().last());

                prevent = true;
            } else if (key === keys.ENTER || key === keys.TAB) {
                that._accept(current);

                prevent = true;
            } else if (key === keys.ESC) {
                that.close();
            }

            if (prevent) {
                e.preventDefault();
            }
        },

        _keypress: function(e) {
            var that = this;

            setTimeout(function() {
                that._word += String.fromCharCode(e.keyCode || e.charCode);
                that._search();
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

        _span: function() {
            var that = this,
                wrapper = that.wrapper,
                SELECTOR = ".t-input",
                span;

            span = wrapper.find(SELECTOR);

            if (!span[0]) {
                wrapper.append('<div class="t-dropdown-wrap t-state-default"><span class="t-input">&nbsp;</span><span class="t-select"><span class="t-icon t-arrow-down">select</span></span></div>')
                       .append(that.element);

                span = wrapper.find(SELECTOR);
            }
            that.span = span;

            that.arrow = wrapper.find(".t-icon");
        },

        _wrapper: function() {
            var that = this,
                element = that.element,
                DOMelement = element[0],
                TABINDEX = "tabIndex",
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("div.t-widget")) {
                wrapper = element.wrap("<div />").parent();
            }

            if (!wrapper.attr(TABINDEX)) {
                wrapper.attr(TABINDEX, 0);
            }

            wrapper[0].style.cssText = DOMelement.style.cssText;
            element.hide();

            that._focused = that.wrapper = wrapper
                              .addClass("t-widget t-dropdown t-header")
                              .addClass(DOMelement.className);
        }
    });

    ui.plugin("DropDownList", DropDownList);
})(jQuery);
