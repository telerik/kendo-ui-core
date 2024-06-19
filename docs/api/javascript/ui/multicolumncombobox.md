---
title: MultiColumnComboBox
page_title: Configuration, methods and events of Kendo UI MultiColumnComboBox
description: Learn to configure Kendo UI MultiColumnComboBox widget, use the documentation guide to operate different types of methods and get familiar with all events, used in MultiColumnComboBox UI widget.
res_type: api
component: multicolumncombobox
---

# kendo.ui.MultiColumnComboBox

Represents the Kendo UI MultiColumnComboBox widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.

### animation `Object`

Configures the opening and closing animations of the suggestion popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the suggestion popup will open and close instantly.

#### Example - disable open and close animations

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        animation: false,
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Apples", value: "1" },
            { text: "Oranges", value: "2" }
        ],
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
    });
    </script>

#### Example - configure the animation

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        animation: {
            close: {
                effects: "fadeOut zoom:out",
                duration: 300
            },
            open: {
                effects: "fadeIn zoom:in",
                duration: 300
            }
        },
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Apples", value: "1" },
            { text: "Oranges", value: "2" }
        ],
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
    });
    </script>

### animation.close `Object`

#### Example - configure the close animation

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      animation: {
       close: {
         effects: "zoom:out",
         duration: 300
       }
      },
      dataTextField: "text",
      dataValueField: "value",
      dataSource: [
          { text: "Apples", value: "1" },
          { text: "Oranges", value: "2" }
      ],
      columns: [
          { field: "text", title: "Text" },
          { field: "value", title: "Value" }
      ]
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

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      animation: {
       open: {
         effects: "zoom:in",
         duration: 300
       }
      },
      dataTextField: "text",
      dataValueField: "value",
      dataSource: [
          { text: "Apples", value: "1" },
          { text: "Oranges", value: "2" }
      ],
      columns: [
          { field: "text", title: "Text" },
          { field: "value", title: "Value" }
      ]
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

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        autoBind: false,
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Apples", value: "1" },
            { text: "Oranges", value: "2" }
        ],
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
    });
    </script>

### cascadeFrom `String`

Use it to set the Id of the parent MultiColumnComboBox widget.
[Help topic showing how cascading functionality works](/controls/multicolumncombobox/cascading)

#### Example

    <input id="parent" />
    <input id="child" />
    <script>
    $("#parent").kendoMultiColumnComboBox({
        dataTextField: "parentName",
        dataValueField: "parentId",
        dataSource: [
            { parentName: "Parent1", parentId: 1 },
            { parentName: "Parent2", parentId: 2 }
        ],
        columns: [
          { field: "parentName" },
          { field: "parentId" }
        ]
    });

    $("#child").kendoMultiColumnComboBox({
        cascadeFrom: "parent",
        dataTextField: "childName",
        dataValueField: "childId",
        dataSource: [
            { childName: "Child1", childId: 1, parentId: 1 },
            { childName: "Child2", childId: 2, parentId: 2 },
            { childName: "Child3", childId: 3, parentId: 1 },
            { childName: "Child4", childId: 4, parentId: 2 }
        ],
        columns: [
          { field: "childName" },
          { field: "childId" },
          { field: "parentId" }
        ]
    });
    </script>

### cascadeFromField `String`

Defines the field to be used to filter the data source. If not defined the [parent's dataValueField option will be used](/api/javascript/ui/multicolumncombobox/configuration/datavaluefield).
[Help topic showing how cascading functionality works](/controls/multicolumncombobox/cascading)

#### Example

    <input id="parent" />
    <input id="child" />
    <script>
    $("#parent").kendoMultiColumnComboBox({
      dataTextField: "name",
      dataValueField: "id",
      dataSource: [
        { name: "Parent1", id: 1 },
        { name: "Parent2", id: 2 }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ]
    });

    $("#child").kendoMultiColumnComboBox({
      cascadeFrom: "parent",
      cascadeFromField: "parentId",
      dataTextField: "name",
      dataValueField: "id",
      dataSource: [
        { name: "Child1", id: 1, parentId: 1 },
        { name: "Child2", id: 2, parentId: 2 },
        { name: "Child3", id: 3, parentId: 1 },
        { name: "Child4", id: 4, parentId: 2 }
      ],
      columns: [
        { field: "id" },
        { field: "name" },
        { field: "parentId" }
      ]
    });
    </script>

### cascadeFromParentField `String`

Defines the parent field to be used to retain value from. This value will be used further to filter the dataSource. If not defined the value from the [parent's dataValueField will be used](/api/javascript/ui/multicolumncombobox/configuration/datavaluefield).

#### Example

    <input id="parent" />
    <input id="child" />
    <script>
    $("#parent").kendoMultiColumnComboBox({
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [
            { name: "Parent1", id: 123, cascadeId: 1 },
            { name: "Parent2", id: 234, cascadeId: 2 }
        ]
    });

    $("#child").kendoMultiColumnComboBox({
        cascadeFrom: "parent",
        cascadeFromField: "parentId",
        cascadeFromParentField: "cascadeId",
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

### cascadeOnCustomValue `Boolean` *(default: false)*

Applicable to a parent MultiColumnComboBox in a cascading scenario. If set to `true` cascading will be triggered upon custom input in the parent widget. When set to `false` (default) the child will not cascade and it will be disabled upon setting custom input in the parent MultiColumnComboBox. Cascade on custom values works only when `cascadeFromParentField` is not set for the child combo, or it points to the `dataValueField` of the parent.

#### Example

    <p><em>Hint: type `p3` in the parent MultiColumnComboBox input</em></p>
    <input id="parent" />
    <input id="child" />
    <script>
    $("#parent").kendoMultiColumnComboBox({
        dataTextField: "name",
        dataValueField: "id",
        cascadeOnCustomValue: true,
        dataSource: [
            { name: "Parent1", id: "p1" },
            { name: "Parent2", id: "p2" }
        ]
    });

    $("#child").kendoMultiColumnComboBox({
        cascadeFrom: "parent",
        cascadeFromField: "parentId",
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [
            { name: "Child1", id: 1, parentId: "p1" },
            { name: "Child2", id: 2, parentId: "p2" },
            { name: "Child3", id: 3, parentId: "p3" },
            { name: "Child4", id: 4, parentId: "p3" }
        ]
    });
    </script>

### columns `Array`

Defines the columns rendered in the table of the MultiColumnComboBox.

#### Example

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ],
            columns: [
                { field: "text", title: "Text" },
                { field: "value", title: "Value" }
            ]
        });
    </script>

### columns.field `String`

Defines the field for the column.

#### Example

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ],
            columns: [
                { field: "text", title: "Text" },
                { field: "value", title: "Value" }
            ]
        });
    </script>

### columns.title `String`

Defines the text of the column title in the header.

#### Example

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ],
            columns: [
                { field: "text", title: "Text" },
                { field: "value", title: "Value" }
            ]
        });
    </script>

### columns.template `String|Function`

Renders a template for the column.

#### Example

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ],
            columns: [
                { field: "text", title: "Text", template: "Text: #:text#" },
                { field: "value", title: "Value", template: "Value: <strong>#:value#</strong>" }
            ]
        });
    </script>

### columns.headerTemplate `String|Function`

Renders a template for the column header.

#### Example

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ],
            columns: [
                { field: "text", headerTemplate: "<strong>Text</strong>" },
                { field: "value", headerTemplate: "<strong>Value</strong>" }
            ]
        });
    </script>

### columns.width `String|Number`

The width of the column. Numeric values are treated as pixels.

#### Example

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ],
            columns: [
                { field: "text", headerTemplate: "<strong>Text</strong>", width: "100px" },
                { field: "value", headerTemplate: "<strong>Value</strong>", width: 100 }
            ]
        });
    </script>

### clearButton `Boolean` *(default: true)*

Unless this options is set to `false`, a button will appear when hovering the widget. Clicking that button will reset the widget's value and will trigger the change event.

#### Example - disable the clear button

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        clearButton: false
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used to display a list of values. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as a JavaScript object

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataTextField: "text",
      dataValueField: "value",
      dataSource: {
        data:  [
          { text: "Apples", value: "1" },
          { text: "Oranges", value: "2" }
        ]
      },
      columns: [
        { field: "text", title: "Text" },
        { field: "value", title: "Value" }
      ]
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <input id="multicolumncombobox" />
    <script>
    var data = [
      { text: "Apples", value: "1" },
      { text: "Oranges", value: "2" }
    ];
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: data,
      dataTextField: "text",
      dataValueField: "value",
      columns: [
          { field: "text", title: "Text" },
          { field: "value", title: "Value" }
      ]
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <input id="multicolumncombobox" />
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/kendo-ui/service/products",
          dataType: "jsonp"
        }
      }
    });
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: dataSource,
      dataTextField: "ProductName",
      dataValueField: "ProductID",
      columns: [
          { field: "ProductName" },
          { field: "ProductID" }
      ]
    });
    </script>

### dataTextField `String`*(default: "")*

The field of the data item that provides the text content of the list items. The widget will filter the data source based on this field.

> **Important** When `dataTextField` is defined, the`dataValueField` option also should be set.

#### Example - set the dataTextField

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        dataSource: [
            { Name: "Parent1", Id: 1 },
            { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id",
        columns: [
          { field: "Name" },
          { field: "Id" }
        ]
    });
    </script>

### dataValueField `String`*(default: "")*

The field of the data item that provides the value of the widget.

> **Important** When `dataValueField` is defined, the`dataTextField` option also should be set.

#### Example - set the dataValueField

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        dataSource: [
            { Name: "Parent1", Id: 1 },
            { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id",
        columns: [
          { field: "Name" },
          { field: "Id" }
        ]
    });
    </script>

### delay `Number`*(default: 200)*

The delay in milliseconds between a keystroke and when the widget displays the popup.

#### Example - set the delay

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      delay: 500,
      dataSource: [
        { Name: "Parent1", Id: 1 },
        { Name: "Parent2", Id: 2 }
      ],
      dataTextField: "Name",
      dataValueField: "Id",
      columns: [
        { field: "Name" },
        { field: "Id" }
      ]
    });
    </script>

### dropDownWidth `String|Number`

The width of the dropdown. Numeric values are treated as pixels.

#### Example - set the dropdown width as a string

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dropDownWidth: "600px",
      dataSource: [
        { Name: "Parent1", Id: 1 },
        { Name: "Parent2", Id: 2 }
      ],
      dataTextField: "Name",
      dataValueField: "Id",
      columns: [
        { field: "Name" },
        { field: "Id" }
      ]
    });
    </script>

#### Example - set the dropdown width as a number

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dropDownWidth: 600,
      dataSource: [
        { Name: "Parent1", Id: 1 },
        { Name: "Parent2", Id: 2 }
      ],
      dataTextField: "Name",
      dataValueField: "Id",
      columns: [
        { field: "Name" },
        { field: "Id" }
      ]
    });
    </script>

### enable `Boolean`*(default: true)*

If set to `false` the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.

#### Example - disable the widget

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      enable: false,
      dataSource: [
        { Name: "Parent1", Id: 1 },
        { Name: "Parent2", Id: 2 }
      ],
      dataTextField: "Name",
      dataValueField: "Id",
      columns: [
        { field: "Name" },
        { field: "Id" }
      ]
    });
    </script>

### enforceMinLength `Boolean` *(default: false)*

If set to `true` the widget will not show all items when the text of the search input cleared. By default the widget shows all items when the text of the search input is cleared. Works in conjunction with [minLength](/api/javascript/ui/multicolumncombobox#configuration-minLength).

#### Example - enforce minLength

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        placeholder: "Select product",
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        filter: "contains",
        autoBind: false,
        minLength: 3,
        enforceMinLength: true,
        dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
                read: {
                    url: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                }
            }
        },
        columns: [
          { field: "ProductName" },
          { field: "ProductID" }
        ]
    });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "none"
- "solid"
- "flat"
- "outline"

#### Example - sets the fillMode

    <input id="multicolumncombobox" />
    <script>
      $("#multicolumncombobox").kendoMultiColumnComboBox({
        dataSource: [
          { Name: "Parent1", Id: 1 },
          { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id",
        columns: [
          { field: "Name" },
          { field: "Id" }
        ],
        fillMode: "flat"
      });
    </script>

### filter `String`*(default: "none")*

The filtering method used to determine the suggestions for the current value. Filtration is turned off by default, and can be performed over `string` values only (either the widget's data has to be an array of strings, or over the field, configured in the [`dataTextField`](/api/javascript/ui/multicolumncombobox#configuration-dataTextField) option).
The supported filter values are `startswith`, `endswith` and `contains`.

#### Example - set the filter

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      filter: "contains",
      dataSource: [
        { Name: "Parent1", Id: 1 },
        { Name: "Parent2", Id: 2 }
      ],
      dataTextField: "Name",
      dataValueField: "Id",
      columns: [
        { field: "Name" },
        { field: "Id" }
      ]
    });
    </script>

### filterFields `Array`

Enables multicolumn filtering.

#### Example

    <input id="multicolumncombobox" />
    <script>
        $("#multicolumncombobox").kendoMultiColumnComboBox({
            filter: "contains",
            filterFields: ["text", "value"],
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ],
            columns: [
                { field: "text", title: "Text" },
                { field: "value", title: "Value" }
            ]
        });
    </script>

### fixedGroupTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the fixed header group. By default the widget displays only the value of the current group.

    <input id="customers" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#customers").kendoMultiColumnComboBox({
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                fixedGroupTemplate: "Fixed group: #:data#",
                height: 400,
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                    },
                    group: { field: "Country" }
                },
                columns: [
                  { field: "ContactName" },
                  { field: "CustomerID" }
                ]
            });
        });
    </script>

### footerTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the footer template. The footer template receives the widget itself as a part of the data argument. Use the widget fields directly in the template.

#### Parameters

##### instance `Object`

The widget instance.

#### Example - specify footerTemplate as a string

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      footerTemplate: 'Total <strong>#: instance.dataSource.total() #</strong> items found',
      columns: [
        { field: "name" },
        { field: "id" }
      ]
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the input. If the input has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.

#### Example - create a label from a string

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      label: "Fruits"
    });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      label: function() {
          return "Fruits";
      }
    });
    </script>

### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.

#### Example - create a label from a string

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      label: { content: "Fruits" }
    });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      label: {
        content: function() {
            return "Fruits";
        }
      }
    });
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/multicolumncombobox/methods/value) method **does not trigger** the `focusout` event of the input.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#multicolumncombobox").data("kendoMultiColumnComboBox").label.floatingLabel.refresh();`

#### Example - create a label from a string

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      label: {
        content: "Fruits",
        floating: true
      }
    });
    </script>


### groupTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the groups. By default the widget displays only the value of the group.

    <input id="customers" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#customers").kendoMultiColumnComboBox({
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                groupTemplate: "Group: #:data#",
                height: 400,
                dataSource: {
                    type: "odata",
                    transport: {
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers"
                    },
                    group: { field: "Country" }
                },
                columns: [
                  { field: "ContactName" },
                  { field: "CustomerID" }
                ]
            });
        });
    </script>

### height `Number`*(default: 200)*

The height of the suggestion popup in pixels. The default value is 200 pixels.

#### Example - set the height

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      height: 500
    });
    </script>

### highlightFirst `Boolean`*(default: true)*

If set to `true` the first suggestion will be automatically highlighted.

#### Example - set highlightFirst

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      highlightFirst: false
    });
    </script>

### ignoreCase `Boolean`*(default: true)*

If set to `false` case-sensitive search will be performed to find suggestions. The widget performs case-insensitive searching by default.

#### Example - disable case-insensitive suggestions

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      ignoreCase: false
    });
    </script>

### index `Number`*(default: -1)*

The index of the initially selected item. The index is `0` based.

#### Example - select second item

    <input id="multicolumncombobox" />
    <script>
    var items = [{ text: "Item 1", value: "1" }, { text: "Item 2", value: "2" }];
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: items,
        index: 1,
        columns: [
          { fields: "text" },
          { fields: "value" }
        ]
    });
    </script>

### messages `Object`

The text messages displayed in the widget. Use this option to customize or localize the messages.

#### Example - customize MultiColumnComboBox messages

    <input id="multicolumncombobox" />
    <script>
      var items = [{ text: "Item 1", value: "1" }, { text: "Item 2", value: "2" }];
      $("#multicolumncombobox").kendoMultiColumnComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: items,
        index: 1,
        messages: {
          clear: "clear!",
          noData: "There is no data!"
        }
      });
    </script>

### messages.clear `String` *(default: "clear")*

The text message when hovering the input clear button.

#### Example - customize clear message

    <input id="multicolumncombobox" />
    <script>
      var items = [{ text: "Item 1", value: "1" }, { text: "Item 2", value: "2" }];
      $("#multicolumncombobox").kendoMultiColumnComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: items,
        index: 1,
        messages: {
          clear: "clear!"
        }
      });
    </script>

### messages.noData `String` *(default: "No data found.")*

The text message shown in the noDataTemplate when no data is available in the widget drop-down.

#### Example - customize noData message

    <input id="multicolumncombobox" />
    <script>
      $("#multicolumncombobox").kendoMultiColumnComboBox({
        dataSource: [],
        index: 1,
        messages: {
          noData: "There is no data!"
        }
      });
    </script>

### minLength `Number`*(default: 1)*

The minimum number of characters the user must type before a search is performed. Set to higher value than `1` if the search could match a lot of items.

> Widget will initiate a request when input value is cleared. If you would like to prevent this behavior please check the [filtering](/api/javascript/ui/multicolumncombobox/events/filtering) event for more details.

#### Example - set minLength

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      minLength: 3
    });
    </script>

### noDataTemplate `String|Function|Boolean` *(default: true)*

The [template](/api/javascript/kendo/methods/template) used to render the "no data" template, which will be displayed if no results are found or the underlying data source is empty.
The noData template receives the widget itself as a part of the data argument. The template will be evaluated on every widget data bound.

> **Important** The popup will open when 'noDataTemplate' is defined

#### Example - specify noDataTemplate as a string

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [],
      dataTextField: "name",
      dataValueField: "id",
      noDataTemplate: 'No Data!'
    });
    </script>

### placeholder `String`*(default: "")*

The hint displayed by the widget when it is empty. Not set by default.

#### Example - specify placeholder option

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      placeholder: "Select..."
    });
    </script>

#### Example - specify placeholder as HTML attribute

    <input id="multicolumncombobox" placeholder="Select..." />

    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        dataSource: [
          { text: "Apples", value: "1" },
          { text: "Oranges", value: "2" }
        ],
        columns: [
          { field: "text", title: "Text" },
          { field: "value", title: "Value" }
        ]
    });
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.

#### Example - append the popup to a specific element

    <div id="container">
        <input id="multicolumncombobox" />
    </div>
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        appendTo: $("#container")
      },
      columns: [
        {field: "name"},
        {field: "id"}
      ]
    });
    </script>

### popup.appendTo `String`

Defines a jQuery selector that will be used to find a container element, where the popup will be appended to.

#### Example - append the popup to a specific element

    <div id="container">
        <input id="multicolumncombobox" />
    </div>
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        appendTo: $("#container")
      },
      columns: [
        {field: "name"},
        {field: "id"}
      ]
    });
    </script>

### popup.origin `String`

Specifies how to position the popup element based on anchor point. The value is
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
        <input id="multicolumncombobox" />
    </div>
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        origin: "top left"
      },
      columns: [
        {field: "name"},
        {field: "id"}
      ]
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
        <input id="multicolumncombobox" />
    </div>
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      popup: {
        position: "top center"
      },
      columns: [
        {field: "name"},
        {field: "id"}
      ]
    });
    </script>
    <style>
      #container{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -50px;
        margin-left: -50px;
        width: 100px;
        height: 100px;
      }
    </style>

### prefixOptions `Object`

The configuration for the prefix adornment of the component.

#### Example - specify prefix adornment configuration

    <input id="prefix" />
    <script>
      $("#prefix").kendoMultiColumnComboBox({
        label: "MultiColumnComboBox",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data:  [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ]
        },
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
        prefixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      });
    </script>

### prefixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content

#### Example - specify prefix adornment icon

    <input id="prefix" />
    <script>
      $("#prefix").kendoMultiColumnComboBox({
        label: "MultiColumnComboBox",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data:  [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ]
        },
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
        prefixOptions: {
          icon: "search"
        }
      })
    </script>

### prefixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the prefix adornment of the component.

#### Example - specify prefix adornment template

    <input id="prefix" />
    <script>
      $("#prefix").kendoMultiColumnComboBox({
        label: "MultiColumnComboBox",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data:  [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ]
        },
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
        prefixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      })
    </script>

### prefixOptions.separator `Boolean` *(default: true)*

If set to `false`, the prefix adornment will not have a separator.

#### Example - specify prefix adornment separator

    <input id="prefix" />
    <script>
      $("#prefix").kendoMultiColumnComboBox({
        label: "MultiColumnComboBox",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data:  [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ]
        },
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
        prefixOptions: {
          template: () => `${kendo.ui.icon("search")}`,
          separator: false
        }
      })
    </script>

### rounded `String`*(default: "medium")*

Sets a value controlling the border radius. Can also be set to the following string values:

- "none"
- "small"
- "medium"
- "large"
- "full"

#### Example - sets the rounded value

    <input id="multicolumncombobox" />
    <script>
      $("#multicolumncombobox").kendoMultiColumnComboBox({
        dataSource: [
          { Name: "Parent1", Id: 1 },
          { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id",
        columns: [
          { field: "Name" },
          { field: "Id" }
        ],
        rounded: "large"
      });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"

#### Example - sets a size

    <input id="multicolumncombobox" />
    <script>
      $("#multicolumncombobox").kendoMultiColumnComboBox({
        dataSource: [
          { Name: "Parent1", Id: 1 },
          { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id",
        columns: [
          { field: "Name" },
          { field: "Id" }
        ],
        size: "large"
      });
    </script>

### suffixOptions `Object`

The configuration for the suffix adornment of the component.

#### Example - specify suffix adornment configuration

    <input id="suffix" />
    <script>
      $("#suffix").kendoMultiColumnComboBox({
        label: "MultiColumnComboBox",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data:  [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ]
        },
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
        suffixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      });
    </script>

### suffixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content

#### Example - specify suffix adornment icon

    <input id="suffix" />
    <script>
      $("#suffix").kendoMultiColumnComboBox({
        label: "MultiColumnComboBox",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data:  [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ]
        },
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
        suffixOptions: {
          icon: "search"
        }
      })
    </script>

### suffixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the suffix adornment of the component.

#### Example - specify suffix adornment template

    <input id="suffix" />
    <script>
      $("#suffix").kendoMultiColumnComboBox({
        label: "MultiColumnComboBox",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data:  [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ]
        },
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
        suffixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      })
    </script>

### suffixOptions.separator `Boolean` *(default: true)*

If set to `false`, the suffix adornment will not have a separator.

#### Example - specify suffix adornment separator

    <input id="suffix" />
    <script>
      $("#suffix").kendoMultiColumnComboBox({
        label: "MultiColumnComboBox",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data:  [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ]
        },
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
        suffixOptions: {
          template: () => `${kendo.ui.icon("search")}`,
          separator: false
        }
      })
    </script>

### suggest `Boolean`*(default: false)*

If set to `true` the widget will automatically use the first suggestion as its value.

#### Example - enable automatic suggestion

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        suggest: true,
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            data:  [
                { text: "Apples", value: "1" },
                { text: "Oranges", value: "2" }
            ]
        },
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
    });
    </script>

### syncValueAndText `Boolean`*(default: true)*

When set to `true` the widget will automatically set selected value to the typed custom text. Set the option to `false` to
clear the selected value but keep the custom text.

#### Example - disable automatic sync between value and text

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      syncValueAndText: true
    });
    </script>

### headerTemplate `String|Function`

Specifies a static HTML content, which will be rendered as a header of the popup element.

> **Important** The header content **should be wrapped** with a HTML tag if it contains more than one element. This is applicable also when header content is just a string/text.

> **Important** Widget does not pass a model data to the header template. Use this option only with static HTML.

#### Example - specify headerTemplate as a string

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      headerTemplate: '<div><h2>Fruits</h2></div>',
      columns: [
        {field: "name"},
        {field: "id"}
      ]
    });
    </script>

### text `String`*(default: "")*

The text of the widget used when the `autoBind` is set to `false`.

#### Example - specify text of the widget

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
         autoBind: false,
         text: "Chai"
    });
    </script>

### value `String`*(default: "")*

The value of the widget.

#### Example - specify value of the widget

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Apples", value: "1" },
            { text: "Oranges", value: "2" }
        ],
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ],
        value: "1"
    });
    </script>

### valuePrimitive `Boolean`*(default: false)*

Specifies the [value binding](/framework/mvvm/bindings/value) behavior for the widget when the initial model value is null. If set to true, the View-Model field will be updated with the selected item value field. If set to false, the View-Model field will be updated with the selected item.

#### Example - specify that the View-Model field should be updated with the selected item value

    <input id="multicolumncombobox" data-bind="value: selectedProductId, source: products"
            data-columns="[
              { field: 'id' },
              { field: 'name' }
            ]" />

    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      valuePrimitive: true,
      dataTextField: "name",
      dataValueField: "id"
    });
    var viewModel = kendo.observable({
      selectedProductId: null,
      products: [
        { id: 1, name: "Coffee" },
        { id: 2, name: "Tea" },
        { id: 3, name: "Juice" }
      ]
    });

    kendo.bind($("#multicolumncombobox"), viewModel);
    </script>

### virtual `Boolean|Object`*(default: false)*

Enables the virtualization feature of the widget. The configuration can be set on an object, which contains two properties - `itemHeight` and `valueMapper`.

For detailed information, refer to the [article on virtualization]({% slug virtualization_kendoui_combobox_widget %}).

### virtual.itemHeight `Number`*(default: null)*

Specifies the height of the virtual item. All items in the virtualized list **must** have the same height.
If the developer does not specify one, the framework will automatically set `itemHeight` based on the current theme and font size.

### virtual.mapValueTo `String`*(default: "index")*

The changes introduced with the Kendo UI R3 2016 release enable you to determine if the `valueMapper` must resolve a *value to an `index`* or a *value to a `dataItem`*. This is configured through the `mapValueTo` option that accepts two possible values - `"index"` or `"dataItem"`. By default, the `mapValueTo` is set to `"index"`, which does not affect the current behavior of the virtualization process.

For more information, refer to the [article on virtualization]({% slug virtualization_kendoui_combobox_widget %}#value-mapping).

### virtual.valueMapper `Function`*(default: null)*

The widget calls the `valueMapper` function when the widget receives a value, that is not fetched from the remote server yet.
The widget will pass the selected value(s) in the `valueMapper` function. In turn, the valueMapper implementation should return the **respective data item(s) index/indices**.

> **Important**
>
> As of the Kendo UI R3 2016 release, the implementation of the `valueMapper` function is optional. It is required only if the widget contains an initial value or if the `value` method is used.

#### Example - MultiColumnComboBox widget with a virtualized list

    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoMultiColumnComboBox({
                template: '<span class="order-id">#= OrderID #</span> #= ShipName #, #= ShipCountry #',
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                columns: [
                  { field: "ShipName" },
                  { field: "OrderID" }
                ],
                virtual: {
                    itemHeight: 26,
                    valueMapper: function(options) {
                        $.ajax({
                            url: "https://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
                            type: "GET",
                            dataType: "jsonp",
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
                        read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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

#### Example - MultiColumnComboBox widget with declarative virtualization config

    <div class="demo-section k-header">
        <h4>Search for shipping name</h4>
        <input id="orders" style="width: 400px"
               data-role="multicolumncombobox"
               data-bind="value: order, source: source"
               data-text-field="ShipName"
               data-value-field="OrderID"
               data-filter="contains"
               data-virtual="{itemHeight:26,valueMapper:orderValueMapper}"
               data-height="520"
               data-columns="[
                { field: 'ShipName' },
                { field: 'OrderID' }
               ]"
               />
    </div>

    <script>
        $(document).ready(function() {
            var model = kendo.observable({
                    order: "10249",
              source: new kendo.data.DataSource({
                type: "odata",
                transport: {
                  read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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
              url: "https://demos.telerik.com/kendo-ui/service/Orders/ValueMapper",
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

## Fields

### dataSource `kendo.data.DataSource`

The [data source](/api/javascript/data/datasource) of the widget. Configured via the [dataSource](/api/javascript/ui/multicolumncombobox/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> **Important:** Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/multicolumncombobox/methods/setdatasource) method instead.

#### Example - add a data item to the data source
    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { name: "Apples" },
        { name: "Oranges" }
      ],
      columns: [
        { field: "name" },
      ],
      dataTextField: "name",
      dataValueField: "name"
    });
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.dataSource.add({ name: "Appricot" });
    multicolumncombobox.search("A");
    </script>

### input `jQuery`
A jQuery object of the visible input element, where the user types.

#### Example - get input element

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox();

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    var input = multicolumncombobox.input;
    </script>

### options `Object`
An object, which holds the options of the widget.

#### Example - get options of the widget

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox();

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    var options = multicolumncombobox.options;
    </script>

### list `jQuery`
A jQuery object of the drop-down list element.

#### Example - get list element

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox();

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    var list = multicolumncombobox.list;
    </script>

### ul `jQuery`
A jQuery object of the `ul` element, which holds the available options.

#### Example - get ul element

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox();

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    var ul = multicolumncombobox.ul;
    </script>

## Methods

### close

Closes the widget popup.

#### Example - close the suggestion popup

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Apples", value: "1" },
            { text: "Oranges", value: "2" }
        ],
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ],
    });
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    // Search for items starting with "A" - will open the suggestion popup and show "Apples"
    multicolumncombobox.search("A");
    // Close the suggestion popup
    multicolumncombobox.close();
    </script>

### dataItem

Returns the data item at the specified index. If the index is not specified, the selected index will be used.

#### Parameters

##### index `Number` *(optional)*

The zero-based index of the data record.

#### Returns

`Object` The raw data record. Returns *undefined* if no data.

#### Example

    <input id="multicolumncombobox" />
    <script>

    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      index: 1
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    // get the dataItem corresponding to the selectedIndex.
    var dataItem = multicolumncombobox.dataItem();

    // get the dataItem corresponding to the passed index.
    var dataItem = multicolumncombobox.dataItem(0);
    </script>

### destroy

Prepares the **MultiColumnComboBox** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the MultiColumnComboBox element from DOM.

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox();
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.destroy();
    </script>

### enable

Enables or disables the widget.

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      enable: false
    });
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.enable(true);
    </script>

### focus

Focuses the widget.

#### Example - focus the widget

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox();
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.focus();
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource/methods/view).

#### Returns

`Array` The currently rendered dropdown list items (`<li>` elements).

### open

Opens the popup.

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.open();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.

#### Parameters

##### readonly `Boolean`

If set to `true` the widget will not allow user input. If set to `false` the widget will allow user input.

#### Example - make the widget readonly

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox();
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.readonly(true);
    </script>

### refresh

Refresh the popup by rendering all items again.

#### Example - refresh the popup items

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    multicolumncombobox.refresh();
    </script>

### search

Searches the data source for the provided value and displays any matches as suggestions.

#### Parameters

##### word `String`

The filter value.

#### Example - search the widget

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    multicolumncombobox.search("App");
    </script>

### select

Gets or sets the selected item. Selects the item provided as an argument and updates the value and text of the widget.

> **Important:** If the widget is not bound (e.g. `autoBind` is set to `false`), the `select` method will **not** pre-fetch the data before continuing with the selection and value setting (unlike the [value](/api/javascript/ui/multicolumncombobox/methods/value) method), and no item will be selected.

> **Important:** When **virtualization** is enabled, the method **does not support** selection with a *function predicate*. The predicate function looks only
in the current datasource view, which represents only the active range/page. Hence it will not work properly.

> **Important:** This method **does not trigger** [change](/api/javascript/ui/multicolumncombobox/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.select(0);
    multicolumncombobox.trigger("change");
    </script>

#### Parameters

##### li `jQuery | Number | Function`

A string, DOM element or jQuery object which represents the item to be selected. A string is treated as a jQuery selector.
A number representing the index of the item or function predicate which returns the correct data item.

#### Returns

`Number` The index of the selected item, if called with no parameters. If a custom value is entered, the returned selected index is `-1`.

`undefined` If called with a parameter as a setter.

#### Example - select item based on jQuery object

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    multicolumncombobox.select(multicolumncombobox.ul.children().eq(0));
    </script>

#### Example - select item based on index

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    multicolumncombobox.select(1);
    </script>

#### Example - select item based on function predicate

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    multicolumncombobox.select(function(dataItem) {
        return dataItem.name === "Apples";
    });
    </script>

#### Example - get selected index of the component

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    var selectedIndex = multicolumncombobox.select();
    
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(selectedIndex)
    </script>

### setDataSource

Sets the dataSource of an existing MultiColumnComboBox and rebinds it.

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
    var dataSource = new kendo.data.DataSource({
      data: [
        { id: 3, name: "Bananas" },
        { id: 4, name: "Cherries" }
      ]
    });
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.setDataSource(dataSource);
    </script>

### suggest

Sets the value of the widget to the specified argument and visually selects the text.

#### Parameters

##### value `String`

Characters to force a suggestion.

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.suggest("Apples");
    </script>

### text

Gets or sets the text of the MultiColumnComboBox. Widget will select the item with same text. If
there are no matches then the text will be considered as a custom value of the widget.

> **Important:** When the `autoBind` option is set to *false*, the widget will update only the selected text. The widget will stay **unbound**.

> **Important:** This method **does not trigger** [change](/api/javascript/ui/multicolumncombobox/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.text("Apples");
    multicolumncombobox.trigger("change");
    </script>

#### Parameters

##### text `String`

The text to set.

#### Returns

`String` The text of the MultiColumnComboBox.

#### Example - set text of the widget

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    multicolumncombobox.text("Apples");
    </script>

### toggle

Opens or closes the widget popup.

#### Parameters

##### toggle `Boolean`

Defines the whether to open/close the drop-down list.

#### Example - set text of the widget

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    multicolumncombobox.toggle();
    </script>

### value

Gets or sets the value of the MultiColumnComboBox.

> **Important:** If the widget is not bound, value method will pre-fetch the data before continue with the value setting.

> **Important:** The widget will **clear the applied filter** if a new value is set. Thus it ensures that the original/whole data set is available for selection.

> **Important:** This method **does not trigger** [change](/api/javascript/ui/multicolumncombobox/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.value("Apples");
    multicolumncombobox.trigger("change");
    </script>

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` The value of the MultiColumnComboBox.

#### Example - set value of the widget

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    multicolumncombobox.value("Oranges");
    </script>

## Events

### change

Fired when the value of the widget is changed by the user. As of 2015 Q3 SP1 cascading widget will trigger change event when its value is changed due to parent update.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.
> **Important:** The event is not fired when the value of the widget is changed programmatically. If you need to handle changes made by API, wire the [cascade](/api/javascript/ui/multicolumncombobox/events/cascade) event.

#### Event Data

##### e.sender `kendo.ui.MultiColumnComboBox`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      change: function(e) {
        var value = this.value();
        // Use the value of the widget
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="multicolumncombobox" />
    <script>
    function multicolumncombobox_change(e) {
      var value = this.value();
      // Use the value of the widget
    }
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.bind("change", multicolumncombobox_change);
    </script>

### close

Fired when the popup of the widget is closed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.MultiColumnComboBox`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      close: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <input id="multicolumncombobox" />
    <script>
    function multicolumncombobox_close(e) {
      // handle the event
    }
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.bind("close", multicolumncombobox_close);
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.MultiColumnComboBox`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      dataBound: function(e) {
          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <input id="multicolumncombobox" />
    <script>
    function multicolumncombobox_dataBound(e) {
      // handle the event
    }
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.bind("dataBound", multicolumncombobox_dataBound);
    </script>

### filtering

Fired when the widget is about to filter the data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

#### Event Data

##### e.sender `kendo.ui.MultiColumnComboBox`

The widget instance which fired the event.

##### e.filter `Object`

The filter descriptor that will be used to filter the data source.

> The data source filters the data items client-side unless the [data source serverFiltering](/api/javascript/data/datasource/configuration/serverfiltering) option is set to `true`.

#### Example - subscribe to the "filtering" event during initialization

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      filter: "startswith",
      filtering: function(e) {
          //get filter descriptor
          var filter = e.filter;

          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "filtering" event after initialization

    <input id="multicolumncombobox" />
    <script>
    function multicolumncombobox_filtering(e) {
      //get filter descriptor
      var filter = e.filter;

      // handle the event
    }
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      filter: "startswith"
    });
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.bind("filtering", multicolumncombobox_filtering);
    </script>

#### Example - prevent filtering event when filter value is empty

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
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

##### e.sender `kendo.ui.MultiColumnComboBox`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      open: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <input id="multicolumncombobox" />
    <script>
    function multicolumncombobox_open(e) {
      // handle the event
    }
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.bind("open", multicolumncombobox_open);
    </script>

### select

Fired when an item from the popup is selected by the user either with mouse/tap or with keyboard navigation.

> **Important:** The event is not fired when an item is selected programmatically.

#### Event Data

##### e.dataItem `Object`

The data item instance of the selected item.

##### e.item `jQuery`

The jQuery object which represents the selected item.

##### e.preventDefault `Function`

If invoked prevents the select action. The widget will retain the previous selected item.

##### e.sender `kendo.ui.MultiColumnComboBox`

The widget instance which fired the event.

#### Example - subscribe to the "select" event during initialization

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      select: function(e) {
        var item = e.item;
        var text = item.text();
        // Use the selected item or its text
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <input id="multicolumncombobox" />
    <script>
    function multicolumncombobox_select(e) {
      var item = e.item;
      var text = item.text();
      // Use the selected item or its text
    }
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.bind("select", multicolumncombobox_select);
    </script>

#### Example - prevent the item selection

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      select: function(e) {
        //call preventDefault() to prevent the selection
        e.preventDefault();
      }
    });
    </script>

### cascade

Fired when the value of the widget is changed via API or user interaction.

#### Event Data

##### e.sender `kendo.ui.MultiColumnComboBox`

The widget instance which fired the event.

#### Example - subscribe to the "cascade" event during initialization

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      cascade: function() {
        // Handle the event
      }
    });
    </script>

#### Example - subscribe to the "cascade" event after initialization

    <input id="multicolumncombobox" />
    <script>
    function multicolumncombobox_cascade(e) {
        // Handle the event
    }
    $("#multicolumncombobox").kendoMultiColumnComboBox({
       dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      columns: [
        { field: "name" },
        { field: "id" }
      ],
      dataTextField: "name",
      dataValueField: "id",
    });
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.bind("cascade", multicolumncombobox_cascade);
    </script>
