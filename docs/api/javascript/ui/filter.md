---
title: Filter
page_title: Configuration, methods and events of Kendo UI Filter
description: 'Configuration steps for the Filter widget.'
res_type: api
---

# kendo.ui.Filter

Represents the Kendo UI Filter widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### applyButton `Boolean` *(default: false)*

If set to `true` the filter will display a button which when clicked will apply filtering over the datasource.

#### Example - set dataSource

    <div id="filter"></div>
    <br /><br />
    <div id="grid"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data,
        schema: {
          model: {
            fields: {
              name: { type: "string" },
              age: { type: "number" }
            }
          }
        }
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        applyButton: true
      });

      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: dataSource
      });
    </script>

### dataSource `kendo.data.DataSource`

The data source to which the widget will apply a filter. Should be an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

#### Example

    <div id="filter"></div>
    <br /><br />
    <div id="grid"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30, city: "New York" },
          { name: "John Doe", age: 33, city: "Boston" },
          { name: "Alice Smith", age: 25, city: "Chicago" }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data,
        schema: {
          model: {
            fields: {
              name: { type: "string" },
              age: { type: "number" },
              city: { type: "string" }
            }
          }
        }
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
      });
    </script>

### expression `Object`

An object which represents a [filter](/api/javascript/ui/filter/configuration/expression) expression which the [kendo.data.DataSource](/api/javascript/data/datasource) can use to filter the data.

#### Example - set expression

    <div id="filter"></div>
    <br /><br />
    <div id="grid"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data,
        schema: {
          model: {
            fields: {
              name: { type: "string" },
              age: { type: "number" }
            }
          }
        }
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expression: {
            logic: "and",
            filters: [
                { field: "name", value: "Jane Doe", operator: "eq" }
            ]
        }
      });

      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: dataSource
      });

      $("#filter").data("kendoFilter").applyFilter();
    </script>


#### Example - set nested filters

    <button id="btn">Apply Filter</button>
    <div id="filter"></div>
    <br /><br />
    <div id="grid"></div>
    <script>
      var data = [
        { name: "Jane Doe", age: 30 },
        { name: "John Doe", age: 33 },
        { name: "Mark Doe", age: 33 },
        { name: "Janet Peterson", age: 38 },
        { name: "Samuel Joen", age: 42 },
        { name: "Robert Michael", age: 46 }
      ];

      var dataSource = new kendo.data.DataSource({
        data: data,
        schema: {
          model: {
            fields: {
              name: { type: "string" },
              age: { type: "number" }
            }
          }
        }
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        expression: {
          logic: "and",
          filters: [
            { field: "name", value: "J", operator: "contains" },
            // Nested filter
            {
              logic: "and",
              filters: [
                { field: "age", value: 31, operator: "gte" },
                { field: "age", value: 39, operator: "lte" }
              ]
            }
          ]
        }
      });

      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: dataSource
      });

      $('#btn').on('click', function(){
        $("#filter").data("kendoFilter").applyFilter();
      })

    </script>


### expressionPreview `Boolean` *(default: false)*

If set to `true` the filter will visualize the filter expression that will be applied to the datasource.

#### Example - set expressionPreview

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data,
        schema: {
          model: {
            fields: {
              name: { type: "string" },
              age: { type: "number" }
            }
          }
        }
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        expression: {
            logic: "or",
            filters: [
                { field: "name", value: "Jane Doe", operator: "eq" },
                { field: "name", value: "John Doe", operator: "eq" },
                { field: "age", value: 33, operator: "eq" },
                { field: "age", value: 30, operator: "eq" }
            ]
        }
      });

    </script>

### fields `Array`

The configuration of the filter fields. An array of JavaScript objects that hold information regarding the filter field, it's editor, default values used for filter and etc.

#### Example - set the fields

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        expression: {
            logic: "or",
            filters: [
                { field: "name", value: "Jane Doe", operator: "eq" },
                { field: "name", value: "John Doe", operator: "eq" },
                { field: "age", value: 33, operator: "eq" },
                { field: "age", value: 30, operator: "eq" }
            ]
        },
        fields: [
          { name: "age", type:"number", label: "Age" },
          { name: "name", type:"string", label: "Name" }
        ]
      });
    </script>

### fields.defaultValue `Object`

A value which will be initially set as a filter value when an expression item for the specific field is created.

#### Example - set the default value

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        fields: [
          { name: "age", type:"number", defaultValue: 31 },
          { name: "name", type:"string", defaultValue: "Rick" }
        ]
      });
    </script>

### fields.editorTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which the widget will use to create the field editor.

#### Example - set the editorTemplate

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        fields: [
          {
            name: "age",
            type:"number",
            editorTemplate: function (container, options) {
                $('<input data-bind="value: value" name="' + options.field + '"/>')
                    .appendTo(container).kendoNumericTextBox();
            }
          },
          { name: "name", type:"string", editorTemplate : "<input type='text' class='k-textbox' data-bind='value: value'/>" }
        ]
      });
    </script>

### fields.previewFormat `String`

The format of the value displayed in the preview.

#### Example - set the editorTemplate

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        fields: [
          {
            name: "age",
            type:"number",
            previewFormat:'n2'
          },
          { name: "name", type:"string" }
        ]
      });
    </script>

### fields.label `String`

Defines a value which will be visualized instead of the data feild name.

> **Note:** By default if a value is not provided the data field name will be used.

#### Example - set the editorTemplate

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        expression: {
            logic: "or",
            filters: [
                { field: "name", value: "Jane Doe", operator: "eq" },
                { field: "name", value: "John Doe", operator: "eq" },
                { field: "age", value: 33, operator: "eq" },
                { field: "age", value: 30, operator: "eq" }
            ]
        },
        fields: [
          { name: "age", type:"number", label: "Age" },
          { name: "name", type:"string", label: "Name" }
        ]
      });
    </script>

### fields.name `String`

A value matching a field name from the datasource model.

#### Example - set the fields name

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        expression: {
            logic: "or",
            filters: [
                { field: "name", value: "Jane Doe", operator: "eq" },
                { field: "name", value: "John Doe", operator: "eq" },
                { field: "age", value: 33, operator: "eq" },
                { field: "age", value: 30, operator: "eq" }
            ]
        },
        fields: [
          { name: "age", type:"number", label: "Age" },
          { name: "name", type:"string", label: "Name" }
        ]
      });
    </script>

### fields.operators `Object`

The text of the filter operators displayed for the current field.

#### Example - set the operators

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        expression: {
            logic: "or",
            filters: [
                { field: "name", value: "Jane Doe", operator: "eq" },
                { field: "name", value: "John Doe", operator: "eq" },
                { field: "age", value: 33, operator: "eq" },
                { field: "age", value: 30, operator: "eq" }
            ]
        },
        fields: [
          { name: "age", type:"number", label: "Age" },
          { name: "name", type:"string", label: "Name", operators: {
              string:{
                eq: 'Custom equal message'
              }
            }
          }
        ]
      });
    </script>

### fields.type `String`

Defines the value type of the field.

> **Note:** By default if a value is not provided the type will be **string**.

The available dataType options are:
* `"string"`
* `"number"`
* `"boolean"`
* `"date"`

#### Example - set the editorTemplate

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        expression: {
            logic: "or",
            filters: [
                { field: "name", value: "Jane Doe", operator: "eq" },
                { field: "name", value: "John Doe", operator: "eq" },
                { field: "age", value: 33, operator: "eq" },
                { field: "age", value: 30, operator: "eq" }
            ]
        },
        fields: [
          { name: "age", type:"number", label: "Age" },
          { name: "name", type:"string", label: "Name" }
        ]
      });
    </script>

### mainLogic `String`

Defines the value of the logical operator at the root level of the filter expression.

#### Example - set the main logic

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        mainLogic: "or",
        fields: [
          { name: "age", type:"number", label: "Age" },
          { name: "name", type:"string", label: "Name" }
        ]
      });
    </script>

### messages `Object`

The text messages displayed in the filter. Use it to customize or localize the filter messages.

#### Example - set the messages

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        applyButton: true,
        messages: {
            and: "And",
            or: "Or",
            apply: "Apply"
        },
        fields: [
          { name: "age", type:"number", label: "Age" },
          { name: "name", type:"string", label: "Name" }
        ]
      });
    </script>

### messages.addExpression `String` *(default: "Add Expression")*

The title of the add expression button.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        messages: {
            addExpression: "Add New Filter"
        },
        fields: [
          { name: "age", type: "number", label: "Age" },
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### messages.addGroup `String` *(default: "Add Group")*

The title of the add group button.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        messages: {
            addGroup: "Add Filter Group"
        },
        fields: [
          { name: "age", type: "number", label: "Age" },
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### messages.and `String` *(default: "And")*

The text of the option which represents the "and" logical operation.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        messages: {
            and: "AND"
        },
        fields: [
          { name: "age", type: "number", label: "Age" },
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### messages.apply `String` *(default: "Apply")*

The title and text inside the apply button.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        applyButton: true,
        messages: {
            apply: "Filter Data"
        },
        fields: [
          { name: "age", type: "number", label: "Age" },
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### messages.close `String` *(default: "Close")*

The title of the close button.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        messages: {
            close: "Exit Filter"
        },
        fields: [
          { name: "age", type: "number", label: "Age" },
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### messages.fields `String` *(default: "Fields")*

The title of the fields drop down.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        messages: {
            fields: "Select Field"
        },
        fields: [
          { name: "age", type: "number", label: "Age" },
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### messages.filterExpressionLabel `String` *(default: "filter expression")*

The text that will be used as an `aria-label` of the filter expression groups.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        messages: {
            filterExpressionLabel: "filter condition"
        },
        fields: [
          { name: "age", type: "number", label: "Age" },
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### messages.filterLogicLabel `String` *(default: "filter logic")*

The text that will be used as an `aria-label` of the filter logic toolbars.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        messages: {
            filterLogicLabel: "logical operator"
        },
        fields: [
          { name: "age", type: "number", label: "Age" },
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### messages.mainFilterLogicLabel `String` *(default: "main filter logic")*

The text that will be used as an `aria-label` of the main filter logic toolbar.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        messages: {
            mainFilterLogicLabel: "primary filter logic"
        },
        fields: [
          { name: "age", type: "number", label: "Age" },
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### messages.operators `String` *(default: "Operators")*

The title of the operators drop down.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        messages: {
            operators: "Filter Operators"
        },
        fields: [
          { name: "age", type: "number", label: "Age" },
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### messages.or `String` *(default: "Or")*

The text of the option which represents the "or" logical operation.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        messages: {
            or: "OR"
        },
        fields: [
          { name: "age", type: "number", label: "Age" },
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators `Object`

The text of the filter operators displayed in the filter.

> If `operators` are defined manually, then the default messages will be overridden too. If you would like to control the `operators` and still use the default messages,
then you will need to retrieve them from the `Filter` prototype - `kendo.ui.Filter.fn.options.operators.{type}`, where type can be "string", "date", "number" and "enums".

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                eq: "Is equal to",
                neq: "Is not equal to",
                contains: "Contains"
            },
            number: {
                eq: "Is equal to",
                neq: "Is not equal to",
                gt: "Is greater than"
            }
        },
        fields: [
          { name: "age", type: "number", label: "Age" },
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string `Object`

The texts of the filter operators displayed for string fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                eq: "Equals",
                neq: "Not equal",
                contains: "Contains text",
                startswith: "Starts with"
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string.custom `Object`

Specifies a custom operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                custom: {
                    text: "Custom Filter",
                    handler: (data) => {
                        console.log("Custom filter applied", data);
                        return true;
                    }
                }
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string.custom.text `String`

The text displated in the operators drop down.

#### Example - set the operator

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        fields: [
          { name: "age", type:"number", label: "Age" },
          { name: "name", type:"string", label: "Name", operators: {
              string:{
                customOperator:{
                  text: 'Custom operator',
                  handler: customOperatorHandler
                }
              }
            }
          }
        ]
      });

      function customOperatorHandler(itemValue, filterValue){
        return itemValue.indexOf(filterValue) > 1;
      }
    </script>

### operators.string.custom.handler `Function`

The handler of the operator.

#### Example - set the operator

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        fields: [
          { name: "age", type:"number", label: "Age" },
          { name: "name", type:"string", label: "Name", operators: {
              string:{
                customOperator:{
                  text: 'Custom operator',
                  handler: customOperatorHandler
                }
              }
            }
          }
        ]
      });

      function customOperatorHandler(itemValue, filterValue){
        return itemValue.indexOf(filterValue) > 1;
      }
    </script>

### operators.string.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                eq: "Equals"
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                neq: "Not equal to"
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                isnull: "Is null value"
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                isnotnull: "Has value"
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string.isempty `String` *(default: "Is empty")*

The text of the "isempty" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                isempty: "Is blank"
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string.isnotempty `String` *(default: "Is not empty")*

The text of the "isnotempty" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                isnotempty: "Has content"
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string.startswith `String` *(default: "Starts with")*

The text of the "starts with" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                startswith: "Begins with"
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string.contains `String` *(default: "Contains")*

The text of the "contains" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                contains: "Includes"
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string.doesnotcontain `String` *(default: "Does not contain")*

The text of the "does not contain" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                doesnotcontain: "Excludes"
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string.endswith `String` *(default: "Ends with")*

The text of the "ends with" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                endswith: "Ends with"
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string.isnullorempty `String` *(default: "Has no value")*

The text of the "isnullorempty" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                isnullorempty: "Is null or empty"
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.string.isnotnullorempty `String` *(default: "Has value")*

The text of the "isnotnullorempty" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            string: {
                isnotnullorempty: "Has a value"
            }
        },
        fields: [
          { name: "name", type: "string", label: "Name" }
        ]
      });
    </script>

### operators.number `Object`

The texts of the filter operators displayed for number fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            number: {
                eq: "Equals",
                neq: "Not equal",
                gte: "Greater than or equal",
                lte: "Less than or equal"
            }
        },
        fields: [
          { name: "age", type: "number", label: "Age" }
        ]
      });
    </script>

### operators.number.custom `Object`

Specifies a custom operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            number: {
                custom: {
                    text: "Custom Number Filter",
                    handler: function(data) {
                        console.log("Custom number filter applied", data);
                        return true;
                    }
                }
            }
        },
        fields: [
          { name: "age", type: "number", label: "Age" }
        ]
      });
    </script>

### operators.number.custom.text `String`

The text displated in the operators drop down.

#### Example - set the operator

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        fields: [
          { name: "age", type:"number", label: "Age", operators: {
              number:{
                customOperator:{
                  text: 'Custom operator',
                  handler: customOperatorHandler
                }
              }
            } },
          { name: "name", type:"string", label: "Name" }
        ]
      });

      function customOperatorHandler(itemValue, filterValue){
        return itemValue > filterValue / 2;
      }
    </script>

### operators.number.custom.handler `Function`

The handler of the operator.

#### Example - set the operator

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        fields: [
          { name: "age", type:"number", label: "Age", operators: {
              number:{
                customOperator:{
                  text: 'Custom operator',
                  handler: customOperatorHandler
                }
              }
            } },
          { name: "name", type:"string", label: "Name" }
        ]
      });

      function customOperatorHandler(itemValue, filterValue){
        return itemValue > filterValue / 2;
      }
    </script>

### operators.number.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            number: {
                eq: "Equals"
            }
        },
        fields: [
          { name: "age", type: "number", label: "Age" }
        ]
      });
    </script>

### operators.number.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            number: {
                neq: "Not equal to"
            }
        },
        fields: [
          { name: "age", type: "number", label: "Age" }
        ]
      });
    </script>

### operators.number.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            number: {
                isnull: "Is null value"
            }
        },
        fields: [
          { name: "age", type: "number", label: "Age" }
        ]
      });
    </script>

### operators.number.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            number: {
                isnotnull: "Has value"
            }
        },
        fields: [
          { name: "age", type: "number", label: "Age" }
        ]
      });
    </script>

### operators.number.gte `String` *(default: "Is greater than or equal to")*

The text of the "greater than or equal" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            number: {
                gte: "Greater than or equal to"
            }
        },
        fields: [
          { name: "age", type: "number", label: "Age" }
        ]
      });
    </script>

### operators.number.gt `String` *(default: "Is greater than")*

The text of the "greater than" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            number: {
                gt: "Greater than"
            }
        },
        fields: [
          { name: "age", type: "number", label: "Age" }
        ]
      });
    </script>

### operators.number.lte `String` *(default: "Is less than or equal to")*

The text of the "less than or equal" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            number: {
                lte: "Less than or equal to"
            }
        },
        fields: [
          { name: "age", type: "number", label: "Age" }
        ]
      });
    </script>

### operators.number.lt `String` *(default: "Is less than")*

The text of the "less than" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            number: {
                lt: "Less than"
            }
        },
        fields: [
          { name: "age", type: "number", label: "Age" }
        ]
      });
    </script>

### operators.date `Object`

The texts of the filter operators displayed for date fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", birthDate: new Date(1990, 0, 15) },
          { name: "John Doe", birthDate: new Date(1985, 5, 20) }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            date: {
                eq: "Is equal to",
                neq: "Is not equal to",
                gte: "Is after or equal to",
                lte: "Is before or equal to"
            }
        },
        fields: [
          { name: "birthDate", type: "date", label: "Birth Date" }
        ]
      });
    </script>

### operators.date.custom `Object`

Specifies a custom operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", birthDate: new Date(1990, 0, 15) },
          { name: "John Doe", birthDate: new Date(1985, 5, 20) }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            date: {
                custom: {
                    text: "Custom Date Filter",
                    handler: function(data) {
                        console.log("Custom date filter applied", data);
                        return true;
                    }
                }
            }
        },
        fields: [
          { name: "birthDate", type: "date", label: "Birth Date" }
        ]
      });
    </script>

### operators.date.custom.text `String`

The text displated in the operators drop down.

#### Example - set the operator

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", hireDate: new Date(2017,5,2) },
          { name: "John Doe", hireDate: new Date(2019,6,9) }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        fields: [
          { name: "hireDate", type:"date", label: "Hire Date", operators: {
              date:{
                customOperator:{
                  text: 'Custom operator',
                  handler: customOperatorHandler
                }
              }
            } },
          { name: "name", type:"string", label: "Name" }
        ]
      });

      function customOperatorHandler(itemValue, filterValue){
        return itemValue.getMonth() > filterValue.getMonth();
      }
    </script>

### operators.date.custom.handler `Function`

The handler of the operator.

#### Example - set the operator

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", hireDate: new Date(2017,5,2) },
          { name: "John Doe", hireDate: new Date(2019,6,9) }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        fields: [
          { name: "hireDate", type:"date", label: "Hire Date", operators: {
              date:{
                customOperator:{
                  text: 'Custom operator',
                  handler: customOperatorHandler
                }
              }
            } },
          { name: "name", type:"string", label: "Name" }
        ]
      });

      function customOperatorHandler(itemValue, filterValue){
        return itemValue.getMonth() > filterValue.getMonth();
      }
    </script>

### operators.date.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", birthDate: new Date(1990, 0, 15) },
          { name: "John Doe", birthDate: new Date(1985, 5, 20) }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            date: {
                eq: "Equals"
            }
        },
        fields: [
          { name: "birthDate", type: "date", label: "Birth Date" }
        ]
      });
    </script>

### operators.date.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", birthDate: new Date(1990, 0, 15) },
          { name: "John Doe", birthDate: new Date(1985, 5, 20) }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            date: {
                neq: "Not equal to"
            }
        },
        fields: [
          { name: "birthDate", type: "date", label: "Birth Date" }
        ]
      });
    </script>

### operators.date.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", birthDate: new Date(1990, 0, 15) },
          { name: "John Doe", birthDate: new Date(1985, 5, 20) }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            date: {
                isnull: "Is null value"
            }
        },
        fields: [
          { name: "birthDate", type: "date", label: "Birth Date" }
        ]
      });
    </script>

### operators.date.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", birthDate: new Date(1990, 0, 15) },
          { name: "John Doe", birthDate: new Date(1985, 5, 20) }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            date: {
                isnotnull: "Has value"
            }
        },
        fields: [
          { name: "birthDate", type: "date", label: "Birth Date" }
        ]
      });
    </script>

### operators.date.gte `String` *(default: "Is after or equal to")*

The text of the "greater than or equal" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", birthDate: new Date(1990, 0, 15) },
          { name: "John Doe", birthDate: new Date(1985, 5, 20) }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            date: {
                gte: "Is after or equal to"
            }
        },
        fields: [
          { name: "birthDate", type: "date", label: "Birth Date" }
        ]
      });
    </script>

### operators.date.gt `String` *(default: "Is after")*

The text of the "greater than" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", birthDate: new Date(1990, 0, 15) },
          { name: "John Doe", birthDate: new Date(1985, 5, 20) }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            date: {
                gt: "Is after"
            }
        },
        fields: [
          { name: "birthDate", type: "date", label: "Birth Date" }
        ]
      });
    </script>

### operators.date.lte `String` *(default: "Is before or equal to")*

The text of the "less than or equal" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", birthDate: new Date(1990, 0, 15) },
          { name: "John Doe", birthDate: new Date(1985, 5, 20) }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            date: {
                lte: "Is before or equal to"
            }
        },
        fields: [
          { name: "birthDate", type: "date", label: "Birth Date" }
        ]
      });
    </script>

### operators.date.lt `String` *(default: "Is before")*

The text of the "less than" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", birthDate: new Date(1990, 0, 15) },
          { name: "John Doe", birthDate: new Date(1985, 5, 20) }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            date: {
                lt: "Is before"
            }
        },
        fields: [
          { name: "birthDate", type: "date", label: "Birth Date" }
        ]
      });
    </script>

### operators.boolean `Object`

The texts of the filter operators displayed for boolean fields

> Omitting an operator will exclude it from the DropDownList with the available operators.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", isManager: true },
          { name: "John Doe", isManager: false }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            boolean: {
                eq: "Is equal to",
                neq: "Is not equal to"
            }
        },
        fields: [
          { name: "isManager", type: "boolean", label: "Is Manager" }
        ]
      });
    </script>

### operators.boolean.custom `Object`

Specifies a custom operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", isManager: true },
          { name: "John Doe", isManager: false }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            boolean: {
                custom: {
                    text: "Custom Boolean Filter",
                    handler: function(data) {
                        console.log("Custom boolean filter applied", data);
                        return true;
                    }
                }
            }
        },
        fields: [
          { name: "isManager", type: "boolean", label: "Is Manager" }
        ]
      });
    </script>

### operators.boolean.custom.text `String`

The text displated in the operators drop down.

#### Example - set the operator

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", isManager: true },
          { name: "John Doe", isManager: false }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        fields: [
          { name: "isManager", type:"boolean", label: "Is manager", operators: {
              boolean:{
                customOperator:{
                  text: 'Custom operator',
                  handler: customOperatorHandler
                }
              }
            } },
          { name: "name", type:"string", label: "Name" }
        ]
      });

      function customOperatorHandler(itemValue, filterValue){
        return itemValue == filterValue;
      }
    </script>

### operators.boolean.custom.handler `Function`

The handler of the operator.

#### Example - set the operator

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", isManager: true },
          { name: "John Doe", isManager: false }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expressionPreview: true,
        fields: [
          { name: "isManager", type:"boolean", label: "Is manager", operators: {
              boolean:{
                customOperator:{
                  text: 'Custom operator',
                  handler: customOperatorHandler
                }
              }
            } },
          { name: "name", type:"string", label: "Name" }
        ]
      });

      function customOperatorHandler(itemValue, filterValue){
        return itemValue == filterValue;
      }
    </script>

### operators.boolean.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", isManager: true },
          { name: "John Doe", isManager: false }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            boolean: {
                eq: "Equals"
            }
        },
        fields: [
          { name: "isManager", type: "boolean", label: "Is Manager" }
        ]
      });
    </script>

### operators.boolean.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

#### Example

    <div id="filter"></div>
    <script>
      var data = [
          { name: "Jane Doe", isManager: true },
          { name: "John Doe", isManager: false }
        ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter").kendoFilter({
        dataSource: dataSource,
        operators: {
            boolean: {
                neq: "Not equal to"
            }
        },
        fields: [
          { name: "isManager", type: "boolean", label: "Is Manager" }
        ]
      });
    </script>

## Methods

### applyFilter

Applies the generated filter to the dataSource.

#### Example - apply filter

    <div id="filter"></div>
    <br /><br />
    <div id="grid"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data,
        schema: {
          model: {
            fields: {
              name: { type: "string" },
              age: { type: "number" }
            }
          }
        }
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        expression: {
            logic: "and",
            filters: [
                { field: "name", value: "Jane Doe", operator: "eq" }
            ]
        }
      });

      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: dataSource
      });

      $("#filter").data("kendoFilter").applyFilter();
    </script>

## Events

### change

Fired when the generated filter expression is changed.

#### Event Data

##### e.expression `Object`

The generated filter expression object which can be used by the datasource.

##### e.sender `kendo.ui.Filter`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <div id="filter"></div>
    <br /><br />
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];

      var dataSource = new kendo.data.DataSource({
      	data: data,
        schema: {
          model: {
            fields: {
              name: { type: "string" },
              age: { type: "number" }
            }
          }
        }
      });

      $("#filter").kendoFilter({
      	dataSource: dataSource,
        change: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.expression);
        }
      });
    </script>

