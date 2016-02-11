---
title: AutoComplete
page_title: Configuration, methods and events of Kendo UI AutoComplete
description: How to configure and control methods in Autocomplete UI widget, which events to use to open, close, change, select.
---

# kendo.ui.AutoComplete

Represents the Kendo UI AutoComplete widget. Inherits from [Widget](/api/javascript/ui/widget).

> **Important:** The Kendo UI AutoComplete should be created from an *input* HTML element.

## Configuration

### animation `Object`

Configures the opening and closing animations of the suggestion popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the suggestion popup will open and close instantly.

#### Example - disable open and close animations

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      animation: false
    });
    </script>

#### Example - configure the animation

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      animation: {
       close: {
         effects: "fadeOut zoom:out",
         duration: 300
       },
       open: {
         effects: "fadeIn zoom:in",
         duration: 300
       }
      }
    });
    </script>

### animation.close `Object`

The animation played when the suggestion popup is closed.

#### Example - configure the close animation

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      animation: {
       close: {
         effects: "zoom:out",
         duration: 300
       }
      }
    });
    </script>

### animation.close.duration `Number` *(default: 100)*

The duration of the close animation in milliseconds.

### animation.close.effects `String`

The effect(s) to use when playing the close animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### animation.open `Object`

The animation played when the suggestion popup is opened.

#### Example - configure the open animation

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      animation: {
       open: {
         effects: "zoom:in",
         duration: 300
       }
      }
    });
    </script>

### animation.open.duration `Number` *(default: 200)*

The duration of the open animation in milliseconds.

### animation.open.effects `String`

The effect(s) to use when playing the open animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used to display suggestions for the current value. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <input id="autocomplete" />
    <script>
    $("#autoComplete").kendoAutoComplete({
      dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <input id="autocomplete" />
    <script>
    var data = ["One", "Two"];
    $("#autoComplete").kendoAutoComplete({
      dataSource: data
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <input id="autocomplete" />
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      }
    });
    $("#autocomplete").kendoAutoComplete({
      dataSource: dataSource,
      dataTextField: "ProductName"
    });
    </script>

### dataTextField `String` *(default: null)*

The field of the data item used when searching for suggestions.  This is the text that will be displayed in the list of matched results.

#### Example - set the dataTextField

    <input id="autocomplete" />
    <script>
    var data = [
      { id: 1, name: "Apples" },
      { id: 2, name: "Oranges" }
    ];
    $("#autocomplete").kendoAutoComplete({
      dataTextField: "name", // The widget is bound to the "name" field
      dataSource: data
    });
    </script>

### delay `Number` *(default: 200)*

The delay in milliseconds between a keystroke and when the widget displays the suggestion popup.

#### Example - set the delay

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      delay: 500
    });
    </script>

### enable `Boolean` *(default: true)*

If set to `false` the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.

#### Example - disable the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      enable: false
    });
    </script>

### filter `String` *(default: "startswith")*

The filtering method used to determine the suggestions for the current value. The default filter is "startswith" -
all data items which begin with the current widget value are displayed in the suggestion popup. The supported `filter` values are `startswith`, `endswith` and `contains`.

#### Example - set the filter

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      filter: "contains"
    });
    </script>

### fixedGroupTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) used to render the fixed header group. By default the widget displays only the value of the current group.

    <input id="customers" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#customers").kendoAutoComplete({
                dataTextField: "ContactName",
                fixedGroupTemplate: "Fixed group: #:data#",
                height: 400,
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                    },
                    group: { field: "Country" }
                }
            });
        });
    </script>

### groupTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) used to render the groups. By default the widget displays only the value of the group.

    <input id="customers" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#customers").kendoAutoComplete({
                dataTextField: "ContactName",
                groupTemplate: "Group: #:data#",
                height: 400,
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                    },
                    group: { field: "Country" }
                }
            });
        });
    </script>

### height `Number` *(default: 200)*

The height of the suggestion popup in pixels. The default value is 200 pixels.

#### Example - set the height

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      height: 500
    });
    </script>

### highlightFirst `Boolean` *(default: true)*

If set to `true` the first suggestion will be automatically highlighted.

#### Example - set highlightFirst

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      highlightFirst: false
    });
    </script>

### ignoreCase `Boolean` *(default: true)*

If set to `false` case-sensitive search will be performed to find suggestions. The widget performs case-insensitive searching by default.

#### Example - disable case-insensitive suggestions

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      ignoreCase: false
    });
    </script>

### minLength `Number` *(default: 1)*

The minimum number of characters the user must type before a search is performed. Set to higher value than `1` if the search could match a lot of items.

> Widget will initiate a request when input value is cleared. If you would like to prevent this behavior please check the [filtering](#events-filtering) event for more details.

#### Example - set minLength

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      minLength: 3
    });
    </script>

### placeholder `String` *(default: "")*

The hint displayed by the widget when it is empty. Not set by default.

#### Example - specify placeholder

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      placeholder: "Enter value ..."
    });
    </script>

The Kendo UI AutoComplete widget could also use the value of the `placeholder` HTML attribute as hint.

#### Example - use the placeholder HTML attribute

    <input id="autocomplete" placeholder="Enter value..." />
    <script>
    $("#autocomplete").kendoAutoComplete();
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.

#### Example - append the popup to a specific element

    <div id="container">
        <input id="autocomplete" />
    </div>
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      popup: {
        appendTo: $("#container")
      }
    });
    </script>

### separator `String` *(default: "")*

The character used to separate multiple values. Empty by default.

#### Example - set separator to allow multiple values

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      separator: ", "
    });
    </script>

### suggest `Boolean` *(default: false)*

If set to `true` the widget will automatically use the first suggestion as its value.

#### Example - enable automatic suggestion

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      suggest: true
    });
    </script>

### headerTemplate `String|Function`

Specifies a static HTML content, which will be rendered as a header of the popup element.

> **Important** The header content **should be wrapped** with a HTML tag if it contains more than one element. This is applicable also when header content is just a string/text.

> **Important** Widget does not pass a model data to the header template. Use this option only with static HTML.

#### Example - specify headerTemplate as a string

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      headerTemplate: '<div><h2>Fruits</h2></div>'
    });
    </script>

### template `String|Function`

The [template](/api/javascript/kendo#methods-template) used to render the suggestions. By default the widget displays only the text of the suggestion (configured via `dataTextField`).

#### Example - specify template as a function

    <input id="autocomplete" />
    <script id="template" type="text/x-kendo-template">
      <span>
        <img src="/img/#: id #.png" alt="#: name #" />
        #: name #
      </span>
    </script>
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      template: kendo.template($("#template").html())
    });
    </script>

#### Example - specify template as a string

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      template: '<span><img src="/img/#: id #.png" alt="#: name #" />#: name #</span>'
    });
    </script>

### valuePrimitive `Boolean`*(default: false)*

Specifies the [value binding](/framework/mvvm/bindings/value) behavior for the widget when the initial model value is null. If set to true, the View-Model field will be updated with the selected item text field. If set to false, the View-Model field will be updated with the selected item.

#### Example - specify that the View-Model field should be updated with the selected item text

    <input id="autocomplete" data-bind="value: productName, source: products" />

    <script>
    $("#autocomplete").kendoAutoComplete({
      valuePrimitive: true,
      dataTextField: "name"
    });
    var viewModel = kendo.observable({
      productName: null,
      products: [
        { id: 1, name: "Coffee" },
        { id: 2, name: "Tea" },
        { id: 3, name: "Juice" }
      ]
    });

    kendo.bind($("#autocomplete"), viewModel);
    </script>

### virtual `Boolean|Object`*(default: false)*

Enables the virtualization feature of the widget.

#### Example - AutoComplete with virtualized list

    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoAutoComplete({
                template: "#= OrderID # | For: #= ShipName #, #= ShipCountry #",
                dataTextField: "ShipName",
                virtual: true,
                height: 520,
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                Freight: { type: "number" },
                                ShipName: { type: "string" },
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                            }
                        }
                    },
                    pageSize: 80,
                    serverPaging: true,
                    serverFiltering: true
                }
            });
        });
    </script>

#### Example - AutoComplete widget with declarative virtualization config

    <div class="demo-section k-header">
        <h4>Search for shipping name</h4>
        <input id="orders" style="width: 400px"
               data-role="autocomplete"
               data-bind="value: order, source: source"
               data-text-field="ShipName"
               data-virtual="{itemHeight:26,valueMapper:orderValueMapper}"
               />
    </div>

    <script>
        $(document).ready(function() {
            var model = kendo.observable({
              order: "Hanari Carnes",
              source: new kendo.data.DataSource({
                type: "odata",
                transport: {
                  read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                },
                schema: {
                  model: {
                    fields: {
                      OrderID: { type: "number" },
                      Freight: { type: "number" },
                      ShipName: { type: "string" },
                      OrderDate: { type: "date" },
                      ShipCity: { type: "string" }
                    }
                  }
                },
                pageSize: 80,
                serverPaging: true,
                serverFiltering: true
              })
            });

            kendo.bind($(document.body), model);
        });

        function orderValueMapper(options) {
            $.ajax({
              url: "http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
              type: "GET",
              dataType: "jsonp",
              data: convertValues(options.value),
              success: function (data) {
                options.success(data);
              }
            })
        }

        function convertValues(value) {
            var data = {};

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

### virtual.itemHeight `Number`*(default: null)*

Specifies the height of the virtual item. All items in the virtualized list **must** have the same height.
If the developer does not specify one, the framework will automatically set `itemHeight` based on the current theme and font size.

#### Example - AutoComplete with virtualized list

    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoAutoComplete({
                template: "#= OrderID # | For: #= ShipName #, #= ShipCountry #",
                dataTextField: "ShipName",
                virtual: {
                    itemHeight: 26
                },
                height: 520,
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    schema: {
                        model: {
                            fields: {
                                OrderID: { type: "number" },
                                Freight: { type: "number" },
                                ShipName: { type: "string" },
                                OrderDate: { type: "date" },
                                ShipCity: { type: "string" }
                            }
                        }
                    },
                    pageSize: 80,
                    serverPaging: true,
                    serverFiltering: true
                }
            });
        });
    </script>

### virtual.valueMapper `Function`*(default: null)*

The `valueMapper` function is **mandatory** for the functionality of the virtualized widget.
The widget calls the `valueMapper` function when the widget receives a value, that is not fetched from the remote server yet.
The widget will pass the selected value(s) in the `valueMapper` function. In turn, the valueMapper implementation should return the **respective data item(s) index/indices**.

    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoAutoComplete({
                template: '<span class="order-id">#= OrderID #</span> #= ShipName #, #= ShipCountry #',
                dataTextField: "ShipName",
                virtual: {
                    itemHeight: 26,
                    valueMapper: function(options) {
                        $.ajax({
                            url: "http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
                            type: "GET",
                            data: convertValues(options.value),
                            success: function (data) {
                                //the **data** is either index or array of indices.
                                //Example:
                                // "Ernst Handel" -> 10 (index in the Orders collection)
                                // ["Ernst Handel", "Que Delícia"] -> [10, 14] (indices in the Orders collection)

                                options.success(data);
                            }
                        })
                    }
                },
                height: 520,
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                    },
                    pageSize: 80,
                    serverPaging: true,
                    serverFiltering: true
                }
            });
        });

        function convertValues(value) {
            var data = {};

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

## Fields

### dataSource `kendo.data.DataSource`

The [data source](/api/javascript/data/datasource) of the widget. Configured via the [dataSource](#configuration-dataSource) option.

> Changes of the data source will be reflected in the widget.

> **Important:** Assigning a new data source would have no effect. Use the [setDataSource](#methods-setDataSource) method instead.

#### Example - add a data item to the data source
    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [
        { name: "Apples" },
        { name: "Oranges" }
      ],
      dataTextField: "name"
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.dataSource.read();
    autocomplete.dataSource.add({ name: "Appricot" });
    autocomplete.search("A");
    </script>

### options `Object`
An object, which holds the options of the widget.

#### Example - get options of the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();

    var autocomplete = $("#autocomplete").data("kendoAutoComplete");

    var element = autocomplete.element;

    var options = autocomplete.options;
    </script>

### list `jQuery`
A jQuery object of the drop-down list element.

#### Example - get list element

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();

    var autocomplete = $("#autocomplete").data("kendoAutoComplete");

    var list = autocomplete.list;
    </script>

### ul `jQuery`
A jQuery object of the `ul` element, which holds the available options.

#### Example - get ul element

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();

    var autocomplete = $("#autocomplete").data("kendoAutoComplete");

    var ul = autocomplete.ul;
    </script>

## Methods

### close

Closes the widget suggestion popup.

#### Example - close the suggestion popup

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    // Search for items starting with "A" - will open the suggestion popup and show "Apples"
    autocomplete.search("A");
    // Close the suggestion popup
    autocomplete.close();
    </script>

### dataItem

Returns the data item at the specified index.

#### Parameters

##### index `Number` *(required)*

The zero-based index of of the data item.

#### Returns

`Object` the data item at the specified index. Returns `undefined` if the index is not within bounds.

#### Example - get the item at certain index

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
        dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    // Search for items starting with "A" - will open the suggestion popup and show "Apples"
    autocomplete.search("A");
    console.log(autocomplete.dataItem(0)); // Displays "Apples" in the browser console
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the widget element from DOM.

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.destroy();
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      enable: false
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.enable(true);
    </script>

#### Example - disable the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.enable(false);
    </script>

### focus

Focuses the widget.

#### Example - focus the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.focus();
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource#methods-view) (e.g. the ones that match the user's last filtering input).

#### Returns

`Array` The currently rendered dropdown list items (`<li>` elements).

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

If set to `true` the widget will not allow user input. If set to `false` the widget will allow user input.

#### Example - make the widget readonly

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.readonly(true);
    </script>

### refresh

Refresh the suggestion popup by rendering all items again.

#### Example - refresh the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.refresh();
    </script>

### search

Searches the data source for the provided value and displays any matches as suggestions.

#### Parameters

##### word `String`

The value to search for. All matches are displayed in the suggestion popup.

#### Example - search the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.search("A"); // Displays "Apples" in the suggestion popup
    </script>

### select

Selects the item provided as an argument and updates the value of the widget.

> **Important:** When **virtualization** is enabled, the method **does not support** selection with a *function predicate*. The predicate function looks only
in the current datasource view, which represents only the active range/page. Hence it will not work properly.

> **Important:** This method **does not trigger** [change](#events-change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable#methods-trigger) method.

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.search("J");
    autocomplete.select(autocomplete.ul.children().eq(1)); // Selects the second suggestion which is "Jane"
    autocomplete.trigger("change");
    </script>


#### Parameters

##### item `String|Element|jQuery`

A string, DOM element or jQuery object which represents the item to be selected. A string is treated as a jQuery selector.

#### Example - select item

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "John", "Jane" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.search("J");
    autocomplete.select(autocomplete.ul.children().eq(1)); // Selects the second suggestion which is "Jane"
    </script>

### setDataSource

Sets the data source of the widget.

#### Parameters

##### dataSource `kendo.data.DataSource`

The data source to which the widget should be bound.

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var dataSource = new kendo.data.DataSource({
      data: [ "Bananas", "Cherries" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.setDataSource(dataSource);
    </script>

### suggest

Sets the value of the widget to the specified argument and visually selects the text.

#### Parameters

##### value `String`

The value to set.

#### Example

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.suggest("Apples");
    </script>

### value

Gets or sets the value of the widget.

> **Important:** This method **does not trigger** [change](#events-change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable#methods-trigger) method.

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.value("new value");
    autocomplete.trigger("change");
    </script>

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` the value of the widget.

#### Example - set and get the value of the widget

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.value("Apples");
    var value = autocomplete.value();
    console.log(value); // Displays "Apples"
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.

#### Event Data

##### e.sender `kendo.ui.AutoComplete`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      change: function(e) {
        var value = this.value();
        // Use the value of the widget
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="autocomplete" />
    <script>
    function autocomplete_change(e) {
      var value = this.value();
      // Use the value of the widget
    }
    $("#autocomplete").kendoAutoComplete();
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.bind("change", autocomplete_change);
    </script>

### close

Fired when the suggestion popup of the widget is closed by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.AutoComplete`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ],
      close: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <input id="autocomplete" />
    <script>
    function autocomplete_close(e) {
      // handle the event
    }
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.bind("close", autocomplete_close);
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.AutoComplete`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ],
      dataBound: function(e) {
          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <input id="autocomplete" />
    <script>
    function autocomplete_dataBound(e) {
      // handle the event
    }
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.bind("dataBound", autocomplete_dataBound);
    </script>

### filtering

Fired when the widget is about to filter the data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.AutoComplete`

The widget instance which fired the event.

##### e.filter `Object`

The filter descriptor that will be used to filter the data source.

> The data source filters the data items client-side unless the [data source serverFiltering](/api/javascript/data/datasource#configuration-serverFiltering) option is set to `true`.

#### Example - subscribe to the "filtering" event during initialization

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ],
      filtering: function(e) {
          //get filter descriptor
          var filter = e.filter;

          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "filtering" event after initialization

    <input id="autocomplete" />
    <script>
    function autocomplete_filtering(e) {
      //get filter descriptor
      var filter = e.filter;

      // handle the event
    }
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.bind("filtering", autocomplete_filtering);
    </script>

#### Example - prevent filtering event when filter value is empty

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ],
      filtering: function(e) {
          var filter = e.filter;

          if (!filter.value) {
            //prevent filtering if the filter does not value
            e.preventDefault();
          }
      }
    });
    </script>

### open

Fired when the suggestion popup of the widget is opened by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.AutoComplete`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ],
      open: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <input id="autocomplete" />
    <script>
    function autocomplete_open(e) {
      // handle the event
    }
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.bind("open", autocomplete_open);
    </script>

### select

Fired when an item from the suggestion popup is selected by the user.

> **Important:** The event is not fired when an item is selected programmatically.

#### Event Data

##### e.item `jQuery`

The jQuery object which represents the selected item.

##### e.sender `kendo.ui.AutoComplete`

The widget instance which fired the event.

#### Example - subscribe to the "select" event during initialization

    <input id="autocomplete" />
    <script>
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ],
      select: function(e) {
        var item = e.item;
        var text = item.text();
        // Use the selected item or its text
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <input id="autocomplete" />
    <script>
    function autocomplete_select(e) {
      var item = e.item;
      var text = item.text();
      // Use the selected item or its text
    }
    $("#autocomplete").kendoAutoComplete({
      dataSource: [ "Apples", "Oranges" ]
    });
    var autocomplete = $("#autocomplete").data("kendoAutoComplete");
    autocomplete.bind("select", autocomplete_select);
    </script>
