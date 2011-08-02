(function($, undefined) {
    /**
    * @name kendo.ui.ComboBox.Description
    *
    * @section 
    *   <p>
    *       The ComboBox widget displays flat data as a list of values and allows the selection of 
    *       a single value from the list or the input of a new value. It is a richer version of the 
    *       standard HTML select, providing support for local and remote data binding, item templates, 
    *       and configurable options for controlling the list behavior.
    *   </p>
    *   If you do not want to allow user input, use the <a href="../dropdownlist/index.html" title="Kendo UI DropDownList">Kendo UI DropDownList</a>.
    *
    *   <h3>Getting Started</h3>
    *   There are two basic ways to create a ComboBox:
    *   <ol>    
    *       <li>From a basic HTML input element, using data binding to define the list items</li>
    *       <li>From a HTML select element, using HTML to define the list items</li>
    *   </ol>
    *   Regardless of the initialization technique, the resulting Kendo UI ComboBox will look and function identically.
    *
    * @exampleTitle Creating a combobox from existing input HTML element
    * @example
    * <!-- HTML -->
    * <input id="combobox" />
    *
    * @exampleTitle ComboBox initialization
    * @example
    *   $(document).ready(function(){
    *      $("#combobox").kendoComboBox([{text: "Item1", value: "1"}, {text: "Item2", value: "2"}]);
    *   });
    *
    * @exampleTitle Creating a combobox from existing select HTML element
    * @example
    * <!-- HTML -->
    * <select id="combobox">
    *     <option>Item 1</option>
    *     <option>Item 2</option>
    *     <option>Item 3</option>
    * </select>
    *
    * @exampleTitle ComboBox initialization
    * @example
    *   $(document).ready(function(){
	*	    $("#combobox").kendComboBox();
	*   });
    *
    * @section
    *   <h3>Binding to Data</h3>
    *   <p>
    *       The ComboBox can be bound to both local JavaScript Arrays and remote data via the 
    *       Kendo DataSource component. Local JavaScript Arrays are appropriate for limited value 
    *       options, while remote data binding is better for larger data sets. With remote binding, 
    *       options will be loaded on-demand, similar to AutoComplete.
    *   </p>
    * @exampleTitle Binding to a remote OData service
    * @example
    *   $(document).ready(function() {
    *       $("#titles").kendoComboBox({
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
    *       ComboBox leverages Kendo UI high-performance Templates to give you complete control 
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
    *   <!-- ComboBox initialization -->
    *   <script type="text/javascript">
    *       $(document).ready(function() {
    *           $("#titles").kendoComboBox({
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
        List = ui.List,
        Select = ui.Select,
        CLICK = "click",
        ATTRIBUTE = "disabled",
        CHANGE = "change",
        DISABLED = "t-state-disabled",
        SELECT = "select",
        STATE_SELECTED = "t-state-selected",
        HOVER = "t-state-hover",
        HOVEREVENTS = "mouseenter mouseleave",
        INPUTWRAPPER = ".t-dropdown-wrap",
        proxy = $.proxy;

    var ComboBox = Select.extend(/** @lends kendo.ui.ComboBox.prototype */{
        /**
        * @constructs
        * @extends kendo.ui.Select
        * @param {DomElement} element DOM element
        * @param {Object} options Configuration options.
        * @option {kendo.data.DataSource|Object} [dataSource] Instance of DataSource or the data that the ComboBox will be bound to.
        * @option {Boolean} [enable] <true> Controls whether the ComboBox should be initially enabled.
        * @option {Number} [index] <-1> Defines the initial selected item.
        * @option {Boolean} [autoBind] <true> Controls whether to bind the component on initialization.
        * @option {Boolean} [highlightFirst] <true> Controls whether the first item will be automatically highlighted.
        * @option {Boolean} [suggest] <false> Controls whether the ComboBox should automatically auto-type the rest of text.
        * @option {Number} [delay] <200> Specifies the delay in ms after which the ComboBox will start filtering dataSource.
        * @option {Number} [minLength] <1> Specifies the minimum characters that should be typed before the ComboBox activates
        * @option {String} [dataTextField] <"text"> Sets the field of the data item that provides the text content of the list items.
        * @option {String} [dataValueField] <"value"> Sets the field of the data item that provides the value content of the list items.
        * @option {String} [filter] <"none"> Defines the type of filtration. If "none" the ComboBox will not filter the items.
        * @option {Number} [height] <200> Define the height of the drop-down list in pixels.
        */
        init: function(element, options) {
            var that = this;

            options = $.isArray(options) ? { dataSource: options } : options;

            Select.fn.init.call(that, element, options);

            that._wrapper();

            that._input();

            that._popup();

            that._accessors();

            that._dataSource();

            that.bind([
                /**
                * Fires when the drop-down list is opened
                * @name kendo.ui.ComboBox#open
                * @event
                * @param {Event} e
                */
                /**
                * Fires when the drop-down list is closed
                * @name kendo.ui.ComboBox#close
                * @event
                * @param {Event} e
                */
                /**
                * Fires when the value has been changed.
                * @name kendo.ui.ComboBox#change
                * @event
                * @param {Event} e
                */
                CHANGE
            ], that.options);

            that.input.bind({
                keydown: proxy(that._keydown, that),
                blur: function() {
                    that._bluring = setTimeout(function() {
                        if (!that._current) {
                            that.text(that.text());
                        }

                        clearTimeout(that._typing);
                        that._blur();
                    }, 100);
                }
            });

            if (that.element.prop("disabled")) {
                that.options.enable = false;
            }

            that.enable(that.options.enable);

            that.previous = that.value();

            if (that.options.autoBind) {
                that._select();
            } else if (that.element.is(SELECT)) {
                that.input.val(that.element.children(":selected").text());
            }
        },

        options: {
            enable: true,
            index: -1,
            autoBind: true,
            delay: 200,
            dataTextField: "text",
            dataValueField: "value",
            minLength: 1,
            height: 200,
            highlightFirst: true,
            filter: "none",
            suggest: false
        },

        current: function(li) {
            var that = this,
                current = that._current;

            if (current) {
                current.removeClass(STATE_SELECTED);
            }

            Select.fn.current.call(that, li);
        },

        /**
        * Closes the drop-down list.
        * @name kendo.ui.ComboBox#close
        * @function
        * @example
        * combobox.close();
        */

        /**
        * Hides loading icon
        * @name kendo.ui.ComboBox#hideBusy
        * @function
        * @example
        * combobox.hideBusy();
        *
        */

        /**
        * Shows loading icon
        * @name kendo.ui.ComboBox#showBusy
        * @function
        * @example
        * combobox.hideBusy();
        *
        */

        /**
        * Enables/disables the combobox component
        * @param {Boolean} enable Desired state
        */
        enable: function(enable) {
            var that = this,
                element = that.element,
                wrapper = that.wrapper,
                input = that.input,
                arrow = that.arrow;

            if (enable === false) {
                wrapper
                    .addClass(DISABLED)
                    .children(INPUTWRAPPER)
                    .unbind(HOVEREVENTS);

                input.attr(ATTRIBUTE, ATTRIBUTE);
                element.attr(ATTRIBUTE, ATTRIBUTE);
                arrow.unbind(CLICK);
            } else {
                wrapper
                    .removeClass(DISABLED)
                    .children(INPUTWRAPPER)
                    .bind(HOVEREVENTS, that._toggleHover);

                input.removeAttr(ATTRIBUTE);
                element.removeAttr(ATTRIBUTE);
                arrow.bind(CLICK, proxy(that.toggle, that));
            }
        },

        /**
        * Opens the drop-down list.
        * @example
        * combobox.open();
        */
        open: function() {
            var that = this,
                selected = that._selected;

            if (!that.ul[0].firstChild || (that._filtered && selected)) {
                that.options.autoBind = false;
                that._filtered = false;
                that._select();
            } else {
                that.popup.open();
                if (selected) {
                    that._scroll(selected[0]);
                }
            }
        },

        refresh: function() {
            var that = this,
                ul = that.ul,
                options = that.options,
                suggest = options.suggest,
                height = options.height,
                data = that.dataSource.view(),
                length = data.length;

            ul[0].innerHTML = kendo.render(that.template, data);
            that._height(length);

            if (that.element.is(SELECT)) {
                that._options(data);
            }

            if (length) {
                if (suggest || options.highlightFirst) {
                    that.current($(that.ul[0].firstChild));
                }

                if (suggest) {
                    that.suggest(that._current);
                }
            }

            if (!options.autoBind) {
                that.toggle(!!length);
            }

            that.hideBusy();
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
            var that = this,
                text,
                value,
                idx = that._highlight(li),
                data = that.dataSource.view();

            if (idx !== -1) {
                that._selected = that._current.addClass(STATE_SELECTED);

                data = data[idx];
                text = that._text(data);
                value = that._value(data);

                that.input[0].value = text;
                that.element[0].value = value !== undefined ? value : text;
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
            var that = this,
                word = word || that.text(),
                length = word.length,
                options = that.options,
                filter = options.filter;

            clearTimeout(that._typing);

            if (!length) {
                that.close();
            } else if (length >= options.minLength) {
                that.showBusy();
                if (filter === "none") {
                    that._filter(word);
                } else {
                    that._filtered = true;
                    options.autoBind = false;
                    that.dataSource.filter( {field: options.dataTextField, operator: filter, value: word } );
                }
            }
        },

        suggest: function(word) {
            var that = this,
                element = that.input[0],
                value = that.text(),
                caret = List.caret(element);


            if (typeof word !== "string") {
                word = word ? word.text() : "";
            }

            if (caret <= 0) {
                caret = value.toLowerCase().indexOf(word.toLowerCase()) + 1;
            }

            if (!word) {
                word = value.substring(0, caret);
            }

            if (word !== value) {
                that.text(word);
                List.selectText(element, caret, word.length);
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
                input = that.input[0];

            if (text !== undefined) {
                that.select(function(dataItem) {
                    return that._text(dataItem) === text;
                });

                if (!that._selected) {
                    that._customOption(text);
                    that.element.val(text);
                }

                input.value = text;
            } else {
                return input.value;
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
            that.input[0].focus();
            clearTimeout(that._bluring);

            if (typeof toggle !== "boolean") {
                toggle = !that.popup.visible();
            }

            that[toggle ? "open" : "close"]();
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
                    })[0];
                }

                if (index !== undefined) {
                    that.select(index);
                } else {
                    that.current(null);
                    that._customOption(value);

                    element.val(value);
                    that.text(value);
                }

                that.previous = element.val();
            } else {
                return element.val();
            }
        },

        _toggleHover: function(e) {
            $(e.currentTarget).toggleClass(HOVER, e.type == "mouseenter");
        },

        _accept: function(li) {
            var that = this,
                previous;

            if (li) {
                that._focus(li);
            } else {
                previous = that.previous;
                that.value(that.text());
                that.previous = previous;
                that._change();
            }
        },

        _clear: function() {
            var that = this;
            if (!that.text()) {
                that.current(null);
            }
        },

        _customOption: function(value) {
            var that = this,
                element = that.element,
                custom = that._custom;

            if (element.is(SELECT)) {
                if (!custom) {
                    custom = that._custom = $("<option/>");
                    element.append(custom);
                }
                custom.text(value);
            }
        },

        _filter: function(word) {
            var that = this,
                options = that.options,
                word = word.toLowerCase(),
                dataSource = that.dataSource,
                predicate = function(dataItem) {
                    var text = that._text(dataItem);
                    if (text !== undefined) {
                        return (text + "").toLowerCase().indexOf(word) === 0;
                    }
                };

            if (!that.ul[0].firstChild) {
                options.autoBind = true;
                dataSource.bind(CHANGE, function search() {
                    that.search(word);
                    dataSource.unbind(CHANGE, handler);
                }).query();
                return;
            }

            if (that._highlight(predicate) !== -1) {
                if (options.suggest && that._current) {
                    that.suggest(that._current);
                }
                that.open();
            }

            that.hideBusy();
        },

        _highlight: function(li) {
            var that = this,
                i = 0,
                idx = -1,
                length,
                text = "",
                value,
                data = that.dataSource.view(),
                children = that.ul[0].childNodes;

            that.current(null);

            if (typeof li === "function") {
                for (i = 0, length = data.length; i < length; i++) {
                    if (li(data[i])) {
                        li = i;
                        break;
                    }
                }
            }

            if (typeof li === "number") {
                if (li < 0) {
                    return idx;
                }

                li = $(children[li]);
            }

            if (li[0] && !li.hasClass("t-state-focused")) {
                idx = $.inArray(li[0], children);

                if (idx !== -1) {
                    that.current(li);
                }
            }

            return idx;
        },

        _input: function() {
            var that = this,
                element = that.element[0],
                wrapper = that.wrapper,
                SELECTOR = ".t-input",
                input;

            input = wrapper.find(SELECTOR);

            if (!input[0]) {
                wrapper.append('<div class="t-dropdown-wrap t-state-default"><input class="t-input" type="text" autocomplete="off"></input><span class="t-select"><span class="t-icon t-arrow-down">select</span></span></div>')
                       .append(that.element);

                input = wrapper.find(SELECTOR);
            }

            input[0].style.cssText = element.style.cssText;
            input.addClass(element.className).show();

            that._focused = that.input = input;

            that.arrow = wrapper.find(".t-icon");
        },

        _keydown: function(e) {
            var prevent,
                that = this,
                key = e.keyCode,
                keys = kendo.keys,
                current = that._current;

            if (e.altKey) {
                that.toggle(key === keys.DOWN);
            } else if (key === keys.DOWN) {
                that._move(current ? current.next() : that.ul.children().first());

                prevent = true;
            } else if (key === keys.UP) {
                that._move(current ? current.prev() : that.ul.children().last());

                prevent = true;
            } else if (key === keys.ENTER || key === keys.TAB) {
                that._accept(current);
            } else if (key === keys.ESC) {
                that.close();
            } else {
                that._search();
            }

            if (prevent) {
                e.preventDefault();
            }

            setTimeout(proxy(that._clear, that));
        },

        _search: function() {
            var that = this;
            clearTimeout(that._typing);

            that._typing = setTimeout(function() {
                var value = that.text();
                if (that._previousText !== value) {
                    that._previousText = value;
                    that.search(value);
                }
            }, that.options.delay);
        },

        _select: function() {
            var that = this,
                dataSource = that.dataSource,
                handler = function () {
                    var value = that.value();
                    if (value) {
                        that.value(value);
                    } else {
                        that.select(that.options.index);
                    }

                    that.previous = that.value();
                    dataSource.unbind(CHANGE, handler);
                };

            dataSource.bind(CHANGE, handler);

            that.showBusy();
            dataSource.query();
        },


        _wrapper: function() {
            var that = this,
                element = that.element,
                wrapper;

            wrapper = element.parent();

            if (!wrapper.is("div.t-widget")) {
                wrapper = element.hide().wrap("<div />").parent();
            }

            that.wrapper = wrapper.addClass("t-widget t-combobox t-header");
        }
    });

    ui.plugin("ComboBox", ComboBox);
})(jQuery);
