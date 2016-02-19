---
title: MultiSelect
page_title: Configuration, methods and events of Kendo UI MultiSelect
---

# kendo.ui.MultiSelect

Represents the Kendo UI MultiSelect widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Object`

Configures the opening and closing animations of the suggestion popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the suggestion popup will open and close instantly.

#### Example - disable open and close animations

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      animation: false
    });
    </script>

#### Example - configure the animation

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
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

#### Example - configure the close animation

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      animation: {
       close: {
         effects: "zoom:out",
         duration: 300
       }
      }
    });
    </script>

### animation.close.effects `String`

The effect(s) to use when playing the close animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### animation.close.duration `Number` *(default: 100)*

The duration of the close animation in milliseconds.

### animation.open `Object`

The animation played when the suggestion popup is opened.

#### Example - configure the open animation

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      animation: {
       open: {
         effects: "zoom:in",
         duration: 300
       }
      }
    });
    </script>

### animation.open.effects `String`

The effect(s) to use when playing the open animation. Multiple effects should be separated with a space.

[Complete list of available animations](/api/javascript/effects/common)

### animation.open.duration `Number` *(default: 200)*

The duration of the open animation in milliseconds.

### autoBind `Boolean`*(default: true)*

Controls whether to bind the widget to the data source on initialization.

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        autoBind: false
    });
    </script>

### autoClose `Boolean`*(default: true)*

Controls whether to close the widget suggestion list on item selection.

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        autoClose: false
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used to display a list of values. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <select id="multiselect" multiple="multiple"></select>
    <script>
    var data = ["One", "Two"];
    $("#multiselect").kendoMultiSelect({
      dataSource: data
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <select id="multiselect" multiple="multiple"></select>
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      }
    });
    $("#multiselect").kendoMultiSelect({
      dataSource: dataSource,
      dataTextField: "ProductName",
      dataValueField: "ProductID"
    });
    </script>

### dataTextField `String`*(default: "")*

The field of the data item that provides the text content of the list items. The widget will filter the data source based on this field.

> **Important** When `dataTextField` is defined, the`dataValueField` option also should be set.

#### Example - set the dataTextField

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: [
            { Name: "Parent1", Id: 1 },
            { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id"
    });
    </script>

### dataValueField `String`*(default: "")*

The field of the data item that provides the value of the widget.

> **Important** When `dataValueField` is defined, the`dataTextField` option also should be set.

#### Example - set the dataValueField

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: [
            { Name: "Parent1", Id: 1 },
            { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id"
    });
    </script>

### delay `Number`*(default: 200)*

 Specifies the delay in milliseconds after which the MultiSelect will start filtering dataSource.

#### Example - set the delay

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        delay: 1000 // wait 1 second before clearing the user input
    });
    </script>

### enable `Boolean`*(default: true)*

If set to `false` the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.

#### Example - disable the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      enable: false
    });
    </script>

### filter `String`*(default: "startswith")*

The filtering method used to determine the suggestions for the current value. Filtration is turned of by default.
The supported filter values are `startswith`, `endswith` and `contains`.

#### Example - set the filter

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      filter: "contains"
    });
    </script>

### fixedGroupTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) used to render the fixed header group. By default the widget displays only the value of the current group.

    <select id="customers" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#customers").kendoMultiSelect({
                placeholder: "Select customers...",
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
              	fixedGroupTemplate: "Fixed header: #: data #",
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

    <select id="customers" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#customers").kendoMultiSelect({
                placeholder: "Select customers...",
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
              	groupTemplate: "Group template: #: data #",
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

### height `Number`*(default: 200)*

The height of the suggestion popup in pixels. The default value is 200 pixels.

#### Example - set the height

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      height: 500
    });
    </script>

### highlightFirst `Boolean`*(default: true)*

If set to `true` the first suggestion will be automatically highlighted.

#### Example - set highlightFirst

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      highlightFirst: false
    });
    </script>

### ignoreCase `Boolean`*(default: true)*

If set to `false` case-sensitive search will be performed to find suggestions. The widget performs case-insensitive searching by default.

#### Example - disable case-insensitive suggestions

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      ignoreCase: false
    });
    </script>

### minLength `Number`*(default: 0)*

The minimum number of characters the user must type before a search is performed. Set to a higher value if the search could match a lot of items.
A zero value means that a request will be made as soon as the user focuses the widget.

> Widget will initiate a request when input value is cleared. If you would like to prevent this behavior please check the [filtering](#events-filtering) event for more details.

#### Example - set minLength

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      minLength: 3
    });
    </script>

### maxSelectedItems `Number`*(default: null)*

 Defines the limit of the selected items. If set to null widget will not limit number of the selected items.

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
        <option>Item3</option>
        <option>Item4</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        maxSelectedItems: 3 //only three or less items could be selected
    });
    </script>

### placeholder `String`*(default: "")*

The hint displayed by the widget when it is empty. Not set by default.

#### Example - specify placeholder option

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      placeholder: "Select..."
    });
    </script>

#### Example - specify placeholder as HTML attribute

    <select id="multiselect data-placeholder="Select..." multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>

    <script>
    $("#multiselect").kendoMultiSelect();
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.

#### Example - append the popup to a specific element

    <div id="container">
        <select id="multiselect"></select>
    </div>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        appendTo: $("#container")
      }
    });
    </script>

### popup.appendTo `String`

Defines a jQuery selector that will be used to find a container element, where the popup will be appended to.

#### Example - append the popup to a specific element

    <div id="container">
        <input id="multiselect" />
    </div>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        appendTo: $("#container")
      }
    });
    </script>

### popup.origin `String`

Specifies how to position the popup element based on achor point. The value is
space separated "y" plus "x" position.

The available "y" positions are:
- "bottom"
- "center"
- "top"

The available "x" positions are:
- "left"
- "center"
- "right"

#### Example - append the popup to a specific element

    <div id="container">
        <input id="multiselect" />
    </div>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        origin: "top left"
      }
    });
    </script>

### popup.position `String`

Specifies which point of the popup element to attach to the anchor's origin point. The value is
space separated "y" plus "x" position.

The available "y" positions are:
- "bottom"
- "center"
- "top"

The available "x" positions are:
- "left"
- "center"
- "right"

#### Example - append the popup to a specific element

    <div id="container">
        <input id="multiselect" />
    </div>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        origin: "top left"
      }
    });
    </script>
    
### headerTemplate `String|Function`

Specifies a static HTML content, which will be rendered as a header of the popup element.

> **Important** The header content **should be wrapped** with a HTML tag if it contains more than one element. This is applicable also when header content is just a string/text.

> **Important** Widget does not pass a model data to the header template. Use this option only with static HTML.

#### Example - specify headerTemplate as a string

    <select id="multiselect"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      headerTemplate: '<div><h2>Fruits</h2></div>'
    });
    </script>

### itemTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) used to render the items in the popup list.

#### Example - specify template as a function

    <select id="multiselect" multiple="multiple"></select>
    <script id="itemTemplate" type="text/x-kendo-template">
      <span>
        <img src="/img/#: id #.png" alt="#: name #" />
        #: name #
      </span>
    </script>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      itemTemplate: kendo.template($("#itemTemplate").html())
    });
    </script>

#### Example - specify template as a string

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      itemTemplate: '<span><img src="/img/#: id #.png" alt="#: name #" />#: name #</span>'
    });
    </script>

### tagTemplate `String`

The [template](/api/javascript/kendo#methods-template) used to render the tags.

#### Template Data for the 'multiple' [tagMode](#configuration-tagMode)

##### data `Object`

The dataitem that corresponds to the selected value.

#### Template Data for the 'single' [tagMode](#configuration-tagMode)

##### data.values `Array`

A list of the selected values.

##### data.dataItems `Array`

A list of the selected data items.

##### data.currentTotal `Array`

The current dataSource total value. If it is server filtered, it will show the current length of the [view](/api/javascript/data/datasource#methods-view).

##### data.maxTotal `Array`

The maximum total value of the dataSource. Unlike the `currentTotal`, this value will keep the maximum reached total value.
Usable when the tag shows the total of the available items.

#### Example - specify template as a function

    <select id="multiselect" multiple="multiple"></select>
    <script id="tagTemplate" type="text/x-kendo-template">
      <span>
        <img src="/img/#: id #.png" alt="#: name #" />
        #: name #
      </span>
    </script>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      tagTemplate: kendo.template($("#tagTemplate").html())
    });
    </script>

#### Example - specify template as a string

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      tagTemplate: '<span><img src="/img/#: id #.png" alt="#: name #" />#: name #</span>'
    });
    </script>

#### Example - specify a template displaying the number of the selected values

    <select id="multiselect" multiple="multiple"></select>
    <script id="tagTemplate" type="text/x-kendo-template">
        # if (values.length < 3) { #
            # for (var idx = 0; idx < values.length; idx++) { #
                #:values[idx]#
                # if (idx < values.length - 1) {#, # } #
            # } #
        # } else { #
           #:values.length# out of #:maxTotal#
        # } #
    </script>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" },
        { id: 2, name: "Bananas" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      tagTemplate: kendo.template($("#tagTemplate").html()),
      tagMode: "single"
    });
    </script>

### tagMode `String`*(default: "multiple")*

The mode used to render the selected tags. The available modes are:
- `multiple` - renders a tag for every selected value
- `single` - renders only one tag that shows the number of the selected values

> Every tagMode has a specific `tagTemplate` value. If you would like to control the content of the rendered tags,
set a custom a [tagTemplate](#configuration-tagTemplate) value.

### value `Array`*(default: [])*

 Define the value of the widget

#### Example


    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
         dataSource: ["Item1", "Item2", "Item3", "Item4"],
         value: ["Item2", "Item3"]
    });
    </script>

> **Important:** Define a list of data items if widget is not initially bound

#### Example

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        autoBind: false,
        dataTextField: "productName",
        dataValueField: "productId",
        value: [{ productName: "Item 1", productId: "1" }, { productName: "Item 2", productId: "2" }]
    });
    </script>

### valuePrimitive `Boolean`*(default: false)*

Specifies the [value binding](/framework/mvvm/bindings/value) behavior for the widget. If set to true, the View-Model field will be updated with the selected item value field. If set to false, the View-Model field will be updated with the selected item.

#### Example - specify that the View-Model field should be updated with the selected item value

    <select id="multiselect" multiple="multiple" data-bind="value: values, source: products"></select>

    <script>
    $("#multiselect").kendoMultiSelect({
      valuePrimitive: true,
      dataTextField: "name",
      dataValueField: "id"
    });
    var viewModel = kendo.observable({
      selectedProductId: [],
      products: [
        { id: 1, name: "Coffee" },
        { id: 2, name: "Tea" },
        { id: 3, name: "Juice" }
      ]
    });

    kendo.bind($("#multiselect"), viewModel);
    </script>

### virtual `Boolean|Object`*(default: false)*

Enables the virtualization feature of the widget.

#### Example - MultiSelect with virtualized list

    <select id="orders" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#orders").kendoMultiSelect({
                placeholder: "Select addresses...",
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                height: 520,
                virtual: {
                    itemHeight: 26,
                    valueMapper: function(options) {
                        $.ajax({
                            url: "http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
                            type: "GET",
                            data: convertValues(options.value),
                            success: function (data) {
                                options.success(data);
                            }
                        })
                    }
                },
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

        function convertValues(value) {
            var data = {};

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

#### Example - MultiSelect widget with declarative virtualization config

    <div class="demo-section k-header">
        <h4>Search for shipping name</h4>
        <select id="orders" style="width: 400px"
               data-role="multiselect"
               data-bind="value: order, source: source"
               data-text-field="ShipName"
               data-value-field="OrderID"
               data-filter="contains"
               data-virtual="{itemHeight:26,valueMapper:orderValueMapper}"
               data-height="520"
                ></select>
    </div>

    <script>
        $(document).ready(function() {
            var model = kendo.observable({
                    order: [10548],
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

    <select id="orders" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#orders").kendoMultiSelect({
                placeholder: "Select addresses...",
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                height: 520,
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
                                // 10258 -> 10 (index in the Orders collection)
                                // [10258, 10261] -> [10, 14] (indices in the Orders collection)

                                options.success(data);
                            }
                        })
                    }
                },
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

        function convertValues(value) {
            var data = {};

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

### virtual.valueMapper `Function`*(default: null)*

The `valueMapper` function is **mandatory** for the functionality of the virtualized widget.
The widget calls the `valueMapper` function when the widget receives a value, that is not fetched from the remote server yet.
The widget will pass the selected value(s) in the `valueMapper` function. In turn, the `valueMapper` implementation should return the **respective data item(s) index/indices**.

    <select id="orders" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#orders").kendoMultiSelect({
                placeholder: "Select addresses...",
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                height: 520,
                virtual: {
                    itemHeight: 26,
                    valueMapper: function(options) {
                        $.ajax({
                            url: "http://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
                            type: "GET",
                            data: convertValues(options.value),
                            success: function (data) {
                                options.success(data);
                            }
                        })
                    }
                },
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

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { name: "Apples" },
        { name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "name"
    });
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.dataSource.add({ name: "Appricot" });
    multiselect.search("A");
    </script>

### input `jQuery`
A jQuery object of the visible input element, where the user types.

#### Example - get input element

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var input = multiselect.input;
    <script>

### options `Object`
An object, which holds the options of the widget.

#### Example - get options of the widget

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var options = multiselect.options;
    <script>

### list `jQuery`
A jQuery object of the drop-down list element.

#### Example - get list element

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var list = multiselect.list;
    <script>

### ul `jQuery`
A jQuery object of the `ul` element, which holds the available options.

#### Example - get ul element

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var ul = multiselect.ul;
    <script>

### tagList `jQuery`
A jQuery object of the `ul` element, which holds the selected tags.

#### Example - get tagList element

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var tagList = multiselect.tagList;
    <script>

## Methods

### close

Closes the widget popup.

#### Example - close the suggestion popup

    <select id="multiselect" multiple="multiple">
        <option>Apples</option>
        <option>Oranges</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    // Search for items starting with "A" - will open the suggestion popup and show "Apples"
    multiselect.search("A");
    // Close the suggestion popup
    multiselect.close();
    </script>

### dataItems

Returns list of raw data records corresponding to the selected items.

#### Returns

`Array` The raw data records. Returns empty array ([]) if no selected options

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    // get data items for the selected options.
    var dataItem = multiselect.dataItems();
    </script>

### destroy

Prepares the **MultiSelect** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the MultiSelect element from DOM.

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.destroy();
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      enable: false
    });
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.enable(true);
    </script>

### focus

Focuses the widget.

#### Example - focus the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.focus();
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource#methods-view).

#### Returns

`Array` The currently rendered dropdown list items (`<li>` elements).

### open

Opens the popup.

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.focus();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

If set to `true` the widget will not allow user input. If set to `false` the widget will allow user input.

#### Example - make the widget readonly

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.readonly(true);
    </script>

### refresh

Refresh the popup by rendering all items again.

#### Example - refresh the popup items

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    multiselect.refresh();
    </script>

### search

Searches the data source for the provided value and displays any matches as suggestions.

#### Parameters

##### word `String`

The filter value.

#### Example - search the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    multiselect.search("Item1");
    </script>

### setDataSource

Sets the dataSource of an existing MultiSelect and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [ "Apples", "Oranges" ]
    });
    var dataSource = new kendo.data.DataSource({
      data: [ "Bananas", "Cherries" ]
    });
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.setDataSource(dataSource);
    </script>

### toggle

Opens or closes the widget popup.

#### Parameters

##### toggle `Boolean`

Defines the whether to open/close the drop-down list.

#### Example - set text of the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    multiselect.toggle();
    </script>

### value

Gets or sets the value of the MultiSelect.

> **Important:** If there are no items, the value method will pre-fetch the data before continue with the value setting.

> **Important:** The widget will **clear the applied filter** if a new value is set. Thus it ensures that the original/whole data set is available for selection.

> **Important:** This method **does not trigger** [change](#events-change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable#methods-trigger) method.

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    multiselect.value("Item1");
    multiselect.trigger("change");
    </script>

#### Parameters

##### value `Array|String`

The value to set. A *String* value or an *Array of strings* is accepted. To clear the value, pass an empty array.

#### Returns

`Array` The value of the MultiSelect.

#### Example - set value

    <select id="multiselect" multiple="multiple">
        <option value="1">Item1</option>
        <option value="2">Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    // get the value of the multiselect.
    var value = multiselect.value();

    // set the value of the multiselect.
    multiselect.value(["1", "2"]); //select items which have value respectively "1" and "2"
    </script>

> If initial items are lost in attempt to set new values, probably the widget is filtered by the end user, but no value has been selected. You will need to remove applied filter, before calling value method

#### Example - remove applied filter before set the value

    <select id="multiselect" multiple="multiple">
        <option value="1">Item1</option>
        <option value="2">Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    //clear filter
    multiselect.dataSource.filter({});

    //set value
    multiselect.value(["1", "2"]);
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      change: function(e) {
        var value = this.value();
        // Use the value of the widget
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_change(e) {
      var value = this.value();
      // Use the value of the widget
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("change", multiselect_change);
    </script>

### close

Fired when the popup of the widget is closed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      close: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_close(e) {
      // handle the event
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("close", multiselect_close);
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataBound: function(e) {
          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_dataBound(e) {
      // handle the event
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("dataBound", multiselect_dataBound);
    </script>

### filtering

Fired when the widget is about to filter the data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

##### e.filter `Object`

The filter descriptor that will be used to filter the data source.

> The data source filters the data items client-side unless the [data source serverFiltering](/api/javascript/data/datasource#configuration-serverFiltering) option is set to `true`.

#### Example - subscribe to the "filtering" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      filter: "startswith",
      filtering: function(e) {
          //get filter descriptor
          var filter = e.filter;

          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "filtering" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_filtering(e) {
      //get filter descriptor
      var filter = e.filter;

      // handle the event
    }
    $("#multiselect").kendoMultiSelect({
      filter: "startswith"
    });
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("filtering", multiselect_filtering);
    </script>

#### Example - prevent filtering event when filter value is empty

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      filter: "startswith",
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

Fired when the popup of the widget is opened by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      open: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_open(e) {
      // handle the event
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("open", multiselect_open);
    </script>

### select

Fired when an item from the popup is selected by the user.

> **Important:** The event is not fired when an item is selected programmatically.

#### Event Data

##### e.item `jQuery`

The jQuery object which represents the selected item.

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "select" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      select: function(e) {
        var item = e.item;
        var text = item.text();
        // Use the selected item or its text
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_select(e) {
      var item = e.item;
      var text = item.text();
      // Use the selected item or its text
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("select", multiselect_select);
    </script>
