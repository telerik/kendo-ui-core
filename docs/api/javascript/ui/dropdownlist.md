---
title: DropDownList
page_title: Configuration, methods and events of Kendo UI DropDownList
description: "Learn how to control your DropDown UI widget's behavior to suit your needs: open, close, enable, disable the widget. Events data and code examples available."
---

# kendo.ui.DropDownList

Represents the Kendo UI DropDownList widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### animation `Object`

Configures the opening and closing animations of the suggestion popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the suggestion popup will open and close instantly.

#### Example - disable open and close animations

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: {
        data: ["One", "Two"]
      },
      animation: false
    });
    </script>

#### Example - configure the animation

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: ["One", "Two"],
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

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: ["One", "Two"],
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

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
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

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        autoBind: false
    });
    </script>

### cascadeFrom `String`

Use it to set the Id of the parent DropDownList widget.
[Help topic showing how cascading functionality works](/web/dropdownlist/cascading)

#### Example

    <input id="parent" />
    <input id="child" />
    <script>
    $("#parent").kendoDropDownList({
        dataTextField: "parentName",
        dataValueField: "parentId",
        dataSource: [
            { parentName: "Parent1", parentId: 1 },
            { parentName: "Parent2", parentId: 2 }
        ]
    });

    $("#child").kendoDropDownList({
        cascadeFrom: "parent",
        dataTextField: "childName",
        dataValueField: "childId",
        dataSource: [
            { childName: "Child1", childId: 1, parentId: 1 },
            { childName: "Child2", childId: 2, parentId: 2 },
            { childName: "Child3", childId: 3, parentId: 1 },
            { childName: "Child4", childId: 4, parentId: 2 }
        ]
    });
    </script>

### cascadeFromField `String`

Defines the field to be used to filter the data source. If not defined the [parent's dataValueField option will be used](/api/javascript/ui/dropdownlist#configuration-dataValueField).
[Help topic showing how cascading functionality works](/web/dropdownlist/cascading)

#### Example

    <input id="parent" />
    <input id="child" />
    <script>
    $("#parent").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [
            { name: "Parent1", id: 1 },
            { name: "Parent2", id: 2 }
        ]
    });

    $("#child").kendoDropDownList({
        cascadeFrom: "parent",
        cascadeFromField: "parentId",
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [
            { name: "Child1", id: 1, parentId: 1 },
            { name: "Child2", id: 2, parentId: 2 },
            { name: "Child3", id: 3, parentId: 1 },
            { name: "Child4", id: 4, parentId: 2 }
        ]
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used to display a list of values. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <input id="dropdownlist" />
    <script>
    var data = ["One", "Two"];
    $("#dropdownlist").kendoDropDownList({
      dataSource: data
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <input id="dropdownlist" />
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "http://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      }
    });
    $("#dropdownlist").kendoDropDownList({
      dataSource: dataSource,
      dataTextField: "ProductName",
      dataValueField: "ProductID"
    });
    </script>

### dataTextField `String`*(default: "")*

The field of the data item that provides the text content of the list items. The widget will filter the data source based on this field.

> **Important** When `dataTextField` is defined, the`dataValueField` option also should be set.

#### Example - set the dataTextField

    <input id="dropdownlist" />
    <script>
      $("#dropdownlist").kendoDropDownList({
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

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: [
            { Name: "Parent1", Id: 1 },
            { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id"
    });
    </script>

### delay `Number`*(default: 500)*

 Specifies the delay in milliseconds before the search-text typed by the end user is cleared.

#### Example - set the delay

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        delay: 1000 // wait 1 second before clearing the user input
    });
    </script>

### enable `Boolean`*(default: true)*

If set to `false` the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.

#### Example - disable the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      enable: false
    });
    </script>

### filter `String`*(default: "none")*

The filtering method used to determine the suggestions for the current value. Filtration is turned off by default.
The supported filter values are `startswith`, `endswith` and `contains`.

#### Example - set the filter

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: ["Chai", "Chang", "Tofu"],
      filter: "contains"
    });
    </script>

### fixedGroupTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) used to render the fixed header group. By default the widget displays only the value of the current group.

    <input id="customers" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#customers").kendoDropDownList({
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                fixedGroupTemplate: "Fixed group: #: data #",
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
            $("#customers").kendoDropDownList({
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                groupTemplate: "Group: #: data #",
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

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      height: 500
    });
    </script>

### ignoreCase `Boolean`*(default: true)*

If set to `false` case-sensitive search will be performed to find suggestions. The widget performs case-insensitive searching by default.

#### Example - disable case-insensitive suggestions

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      ignoreCase: false
    });
    </script>

### index `Number`*(default: 0)*

The index of the initially selected item. The index is `0` based.

#### Example - select second item

    <input id="dropdownlist" />
    <script>
    var items = [{ text: "Item 1", value: "1" }, { text: "Item 2", value: "2" }];
    $("#dropdownlist").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: items,
        index: 1
    });
    </script>

### minLength `Number`*(default: 1)*

The minimum number of characters the user must type before a filter is performed. Set to higher value than `1` if the search could match a lot of items.

> Widget will initiate a request when input value is cleared. If you would like to prevent this behavior please check the [filtering](#events-filtering) event for more details.

#### Example - set minLength

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: ["Chai", "Chang", "Tofu"],
      filter: "contains",
      minLength: 3
    });
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.

#### Example - append the popup to a specific element

    <div id="container">
        <input id="dropdownlist" />
    </div>
    <script>
    $("#dropdownlist").kendoDropDownList({
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
        <input id="dropdownlist" />
    </div>
    <script>
    $("#dropdownlist").kendoDropDownList({
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
        <input id="dropdownlist" />
    </div>
    <script>
    $("#dropdownlist").kendoDropDownList({
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
        <input id="dropdownlist" />
    </div>
    <script>
    $("#dropdownlist").kendoDropDownList({
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


### optionLabel `String | Object`*(default: "")*

 Define the text of the default empty item. If the value is an object, then the widget will use it as a valid data item.
 Note that the optionLabel will not be available if the widget is empty.

> **Important:** If `optionLabel` is an object, it needs to have at least `dataValueField` and `dataTextField` properties. Otherwise, widget will show `undefined`.
Note that the very same optionLabel object will be passed to the [valueTemplate](/api/javascript/ui/dropdownlist#configuration-valueTemplate). **You need to ensure that all required by the valueTemplate properties are present
in the optionLabel object**.

> **Important:** Since Q1 2015 (2015.1.318), the option label is rendered as a separate header template. The benefits of this change are:
- the widget's value will be empty string even when `dataValueField` and `dataTextField` options are equal or not defined
- the widget will not throw an exception when a custom item template is used and `optionLabel` is string
- option label has a separate template, that gives more freedom for customization

> **Important:** [Not relevant after Q1 2015] Widget's value will be equal to the `optionLabel` if the `dataValueField` and `dataTextField` options are equal or not defined

#### Example - specify optionLabel as a string

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: ["Apples", "Oranges"],
        optionLabel: "Select a fruit..."
    });
    </script>

#### Example - specify optionLabel as an object

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: [
            { productName: "Product 1", productId: 1 },
            { productName: "Product 2", productId: 2 }
        ],
        dataTextField: "productName",
        dataValueField: "productId",
        optionLabel: {
            productName: "Select a product...",
            productId: ""
        }
    });
    </script>

### optionLabelTemplate `String|Function`

The [template](/api/javascript/kendo#methods-template) used to render the option label.

> **Important:** Define the [optionLabel](/api/javascript/kendo#configuration-optionLabel) as **object** if complex template structure is used

### headerTemplate `String|Function`

Specifies a static HTML content, which will be rendered as a header of the popup element.

> **Important** The header content **should be wrapped** with a HTML tag if it contains more than one element. This is applicable also when header content is just a string/text.

> **Important** Widget does not pass a model data to the header template. Use this option only with static HTML.

#### Example - specify headerTemplate as a string

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      headerTemplate: '<div><h2>Fruits</h2></div>'
    });
    </script>

### template `String|Function`

The [template](/api/javascript/kendo#methods-template) used to render the items. By default the widget displays only the text of the data item (configured via `dataTextField`).

#### Example - specify template as a function

    <input id="dropdownlist" />
    <script id="template" type="text/x-kendo-template">
      <span>
        <img src="/img/#: id #.png" alt="#: name #" />
        #: name #
      </span>
    </script>
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      template: kendo.template($("#template").html())
    });
    </script>

#### Example - specify template as a string

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      template: '<span><img src="/img/#: id #.png" alt="#: name #" />#: name #</span>'
    });
    </script>

### valueTemplate `String|Function`

The [valueTemplate](/api/javascript/kendo#methods-template) used to render the selected value. By default the widget displays only the text of the data item (configured via `dataTextField`).

#### Example - specify valueTemplate as a function

    <input id="dropdownlist" />
    <script id="valueTemplate" type="text/x-kendo-template">
        <img src="/img/#: id #.png" alt="#: name #" />
        #: name #
    </script>
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      valueTemplate: kendo.template($("#valueTemplate").html())
    });
    </script>

#### Example - specify template as a string

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      valueTemplate: '<img src="/img/#: id #.png" alt="#: name #" />#: name #'
    });
    </script>

### text `String`*(default: "")*

The text of the widget used when the `autoBind` is set to `false`.

#### Example - specify text of the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
         autoBind: false,
         text: "Chai"
    });
    </script>

### value `String`*(default: "")*

The value of the widget.

#### Example - specify value of the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
         dataSource: ["Item1", "Item2"],
         value: "Item1"
    });
    </script>

### valuePrimitive `Boolean`*(default: false)*

Specifies the [value binding](/framework/mvvm/bindings/value) behavior for the widget when the initial model value is null. If set to true, the View-Model field will be updated with the selected item value field. If set to false, the View-Model field will be updated with the selected item.

#### Example - specify that the View-Model field should be updated with the selected item value

    <select id="dropdown" data-bind="value: selectedProductId, source: products" >
    </select>

    <script>
    $("#dropdown").kendoDropDownList({
      valuePrimitive: true,
      dataTextField: "name",
      dataValueField: "id",
      optionLabel: "Select product..."
    });
    var viewModel = kendo.observable({
      selectedProductId: null,
      products: [
        { id: 1, name: "Coffee" },
        { id: 2, name: "Tea" },
        { id: 3, name: "Juice" }
      ]
    });

    kendo.bind($("#dropdown"), viewModel);
    </script>

### virtual `Boolean|Object`*(default: false)*

Enables the virtualization feature of the widget.

#### Example - DropDownList with virtualized list

    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoDropDownList({
                template: '<span class="order-id">#= OrderID #</span> #= ShipName #, #= ShipCountry #',
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                filter: "contains",
                virtual: true,
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
    </script>

#### Example - DropDownList widget with declarative virtualization config

    <div class="demo-section k-header">
        <h4>Search for shipping name</h4>
        <input id="orders" style="width: 400px"
               data-role="dropdownlist"
               data-bind="value: order, source: source"
               data-text-field="ShipName"
               data-value-field="OrderID"
               data-filter="contains"
               data-virtual="{itemHeight:26,valueMapper:orderValueMapper}"
               data-height="520"
               />
    </div>

    <script>
        $(document).ready(function() {
            var model = kendo.observable({
                    order: "10548",
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

    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoDropDownList({
                template: '<span class="order-id">#= OrderID #</span> #= ShipName #, #= ShipCountry #',
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                filter: "contains",
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
The widget will pass the selected value(s) in the `valueMapper` function. In turn, the valueMapper implementation should return the **respective data item(s) index/indices**.

    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoDropDownList({
                template: '<span class="order-id">#= OrderID #</span> #= ShipName #, #= ShipCountry #',
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                filter: "contains",
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
    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { name: "Apples" },
        { name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "name"
    });
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.dataSource.add({ name: "Appricot" });
    dropdownlist.search("A");
    </script>

### span `jQuery`
A jQuery object of the span element which holds the selected text.

#### Example - modify span element

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList();

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    var span = dropdownlist.span;

    span.css("background-color", "red");
    </script>

### filterInput `jQuery`
A jQuery object of the filter input element, where the user types.

> Available only if the filtering is enabled.

#### Example - get input element

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList();

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    var filterInput = dropdownlist.filterInput;
    </script>

### options `Object`
An object, which holds the options of the widget.

#### Example - get options of the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList();

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    var options = dropdownlist.options;
    </script>

### list `jQuery`
A jQuery object of the drop-down list element.

#### Example - get list element

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList();

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    var list = dropdownlist.list;
    </script>

### ul `jQuery`
A jQuery object of the `ul` element, which holds the available options.

#### Example - get ul element

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList();

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    var ul = dropdownlist.ul;
    </script>

## Methods

### close

Closes the widget popup.

#### Example - close the suggestion popup

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    // Search for items starting with "A" - will open the suggestion popup and show "Apples"
    dropdownlist.search("A");
    // Close the suggestion popup
    dropdownlist.close();
    </script>

### dataItem

Returns the data item at the specified index. If the index is not specified, the selected index will be used.

#### Parameters

##### index `jQuery|Number` *(optional)*

The zero-based index of the data record.

#### Returns

`Object` The raw data record. Returns *undefined* if no data.

#### Example

    <input id="dropdownlist" />
    <script>

    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    // get the dataItem corresponding to the selectedIndex.
    var dataItem = dropdownlist.dataItem();

    // get the dataItem corresponding to the passed index.
    var dataItem = dropdownlist.dataItem(0);
    </script>

### destroy

Prepares the **DropDownList** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the DropDownList element from DOM.

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList();
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.destroy();
    </script>

### focus

Focuses the widget.

#### Example - focus the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList();
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.focus();
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource#methods-view).

#### Returns

`Array` The currently rendered dropdown list items (`<li>` elements).

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <select id="dropdownlist">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#dropdownlist").kendoDropDownList({
      enable: false
    });
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.enable(true);
    </script>

### open

Opens the popup.

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.open();
    </script>

### readonly

Controls whether the widget is editable or readonly.

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    // get a reference to the dropdownlist widget
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    // makes dropdownlist readonly
    dropdownlist.readonly();

    // makes dropdownlist editable
    dropdownlist.readonly(false);
    </script>

#### Parameters

##### readonly `Boolean`

The argument, which defines whether the DropDownList should be readonly or editable.

### refresh

Refresh the popup by rendering all items again.

#### Example - refresh the popup items

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    dropdownlist.refresh();
    </script>

### search

Selects an item, which starts with the provided value.

#### Parameters

##### word `String`

The search value.

#### Example - search the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id"
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    dropdownlist.search("Oranges");
    </script>

### select

Gets or sets the selected item. Selects the item provided as an argument and updates the value and text of the widget.

> **Important:** When **virtualization** is enabled, the method **does not support** selection with a *function predicate*. The predicate function looks only
in the current datasource view, which represents only the active range/page. Hence it will not work properly.

> **Important:** This method **does not trigger** [change](#events-change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable#methods-trigger) method.

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.select(1);
    dropdownlist.trigger("change");
    </script>

#### Parameters

##### li `jQuery | Number | Function`

A string, DOM element or jQuery object which represents the item to be selected. A string is treated as a jQuery selector.
A number representing the index of the item or function predicate which returns the correct data item.

#### Returns

`Number` The index of the selected item, if called with no parameters. If a custom value is entered, the returned selected index is `-1`.

`undefined` If called with a parameter as a setter.

#### Example - select item based on jQuery object

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id"
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    dropdownlist.select(dropdownlist.ul.children().eq(0));
    </script>

#### Example - select item based on index

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id"
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    dropdownlist.select(1);
    </script>

#### Example - select item based on function predicate

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id"
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    dropdownlist.select(function(dataItem) {
        return dataItem.name === "Apples";
    });
    </script>

#### Example - get selected index of the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    var selectedIndex = dropdownlist.select();
    </script>

### setDataSource

Sets the dataSource of an existing DropDownList and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });
    var dataSource = new kendo.data.DataSource({
      data: [ "Bananas", "Cherries" ]
    });
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.setDataSource(dataSource);
    </script>

### text

Gets or sets the text of the DropDownList.

#### Parameters

##### text `String`

The text to set.

#### Returns

`String` The text of the DropDownList.

#### Example - set text of the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    dropdownlist.text("Apples");
    </script>

### toggle

Opens or closes the widget popup.

#### Parameters

##### toggle `Boolean`

Defines the whether to open/close the drop-down list.

#### Example - set text of the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    dropdownlist.toggle();
    </script>

### value

Gets or sets the value of the DropDownList. The value will not be set if there is no item with such value. If value is undefined, text of the data item is used.

> **Important:** If the widget is not bound (e.g. `autoBind` is set to `false`), the `value` method will pre-fetch the data before continuing with the value setting.
**This does not apply when MVVM binding is used.**

> **Important:** The widget will **clear the applied filter** if a new value is set. Thus it ensures that the original/whole data set is available for selection.

> **Important:** This method **does not trigger** [change](#events-change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable#methods-trigger) method.

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.value("Apples");
    dropdownlist.trigger("change");
    </script>

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` The value of the DropDownList.

#### Example - set value of the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    dropdownlist.value("Oranges");
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed programmatically. If you need to handle changes made by API, wire the [cascade](/api/javascript/ui/dropdownlist#events-cascade) event.

#### Event Data

##### e.sender `kendo.ui.DropDownList`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ],
      change: function(e) {
        var value = this.value();
        // Use the value of the widget
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="dropdownlist" />
    <script>
    function dropdownlist_change(e) {
      var value = this.value();
      // Use the value of the widget
    }
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.bind("change", dropdownlist_change);
    </script>

### close

Fired when the popup of the widget is closed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.DropDownList`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ],
      close: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <input id="dropdownlist" />
    <script>
    function dropdownlist_close(e) {
      // handle the event
    }
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.bind("close", dropdownlist_close);
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.DropDownList`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ],
      dataBound: function(e) {
          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <input id="dropdownlist" />
    <script>
    function dropdownlist_dataBound(e) {
      // handle the event
    }
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.bind("dataBound", dropdownlist_dataBound);
    </script>

### filtering

Fired when the widget is about to filter the data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.DropDownList`

The widget instance which fired the event.

##### e.filter `Object`

The filter descriptor that will be used to filter the data source.

> The data source filters the data items client-side unless the [data source serverFiltering](/api/javascript/data/datasource#configuration-serverFiltering) option is set to `true`.

#### Example - subscribe to the "filtering" event during initialization

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ],
      filter: "startswith",
      filtering: function(e) {
          //get filter descriptor
          var filter = e.filter;

          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "filtering" event after initialization

    <input id="dropdownlist" />
    <script>
    function dropdownlist_filtering(e) {
      //get filter descriptor
      var filter = e.filter;

      // handle the event
    }
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ],
      filter: "startswith"
    });
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.bind("filtering", dropdownlist_filtering);
    </script>

#### Example - prevent filtering event when filter value is empty

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ],
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

##### e.sender `kendo.ui.DropDownList`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ],
      open: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <input id="dropdownlist" />
    <script>
    function dropdownlist_open(e) {
      // handle the event
    }
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.bind("open", dropdownlist_open);
    </script>

### select

Fired when an item from the popup is selected by the user either with mouse/tap or with keyboard navigation.

> **Important:** The event is not fired when an item is selected programmatically.

> **Important:** Since version Q1 2015 (2015.1.318), the
[option label has been moved outside the item list DOM collection](/backward-compatibility#kendo-ui-2015-q1).
As a result, jQuery.index() can no longer be used to reliably detect if the option label is the selected dropdown item.
A more appropriate approach would be to check if the selected dataItem value is an empty string,
and/or check if the selected dateItem's text is equal to the optionLabel string.
>
> *  `e.sender.dataItem(e.item)[e.sender.options.dataValueField] == ""`
> *  `e.sender.dataItem(e.item)[e.sender.options.dataTextField] == e.sender.options.optionLabel`

#### Event Data

##### e.item `jQuery`

The jQuery object which represents the selected item.

##### e.preventDefault `Function`

If invoked prevents the select action. The widget will retain the previous selected item.

##### e.sender `kendo.ui.DropDownList`

The widget instance which fired the event.

#### Example - subscribe to the "select" event during initialization

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ],
      select: function(e) {
        var item = e.item;
        var text = item.text();
        // Use the selected item or its text
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <input id="dropdownlist" />
    <script>
    function dropdownlist_select(e) {
      var item = e.item;
      var text = item.text();
      // Use the selected item or its text
    }
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.bind("select", dropdownlist_select);
    </script>

### cascade

Fired when the value of the widget is changed via API or user interaction.

#### Event Data

##### e.sender `kendo.ui.DropDownList`

The widget instance which fired the event.

#### Example - subscribe to the "select" event during initialization

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ],
      cascade: function() {
        // Handle the event
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <input id="dropdownlist" />
    <script>
    function dropdownlist_cascade(e) {
        // Handle the event
    }
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.bind("cascade", dropdownlist_cascade);
    </script>
