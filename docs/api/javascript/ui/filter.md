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

### messages.and `String` *(default: "And")*

The text of the option which represents the "and" logical operation.

### messages.apply `String` *(default: "Apply")*

The text inside the apply button.

### messages.or `String` *(default: "Or")*

The text of the option which represents the "or" logical operation.

### operators `Object`

The text of the filter operators displayed in the filter.

> If `operators` are defined manually, then the default messages will be overridden too. If you would like to control the `operators` and still use the default messages,
then you will need to retrieve them from the `Filter` prototype - `kendo.ui.Filter.fn.options.operators.{type}`, where type can be "string", "date", "number" and "enums".

### operators.string `Object`

The texts of the filter operators displayed for string fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

### operators.string.custom `Object`

Specifies a custom operator.

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

### operators.string.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

### operators.string.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.

### operators.string.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.

### operators.string.isempty `String` *(default: "Is empty")*

The text of the "isempty" filter operator.

### operators.string.isnotempty `String` *(default: "Is not empty")*

The text of the "isnotempty" filter operator.

### operators.string.startswith `String` *(default: "Starts with")*

The text of the "starts with" filter operator.

### operators.string.contains `String` *(default: "Contains")*

The text of the "contains" filter operator.

### operators.string.doesnotcontain `String` *(default: "Does not contain")*

The text of the "does not contain" filter operator.

### operators.string.endswith `String` *(default: "Ends with")*

The text of the "ends with" filter operator.

### operators.string.isnullorempty `String` *(default: "Has no value")*

The text of the "isnullorempty" filter operator.

### operators.string.isnotnullorempty `String` *(default: "Has value")*

The text of the "isnotnullorempty" filter operator.

### operators.number `Object`

The texts of the filter operators displayed for number fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

### operators.number.custom `Object`

Specifies a custom operator.

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

### operators.number.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

### operators.number.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.

### operators.number.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.

### operators.number.gte `String` *(default: "Is greater than or equal to")*

The text of the "greater than or equal" filter operator.

### operators.number.gt `String` *(default: "Is greater than")*

The text of the "greater than" filter operator.

### operators.number.lte `String` *(default: "Is less than or equal to")*

The text of the "less than or equal" filter operator.

### operators.number.lt `String` *(default: "Is less than")*

The text of the "less than" filter operator.

### operators.date `Object`

The texts of the filter operators displayed for date fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

### operators.date.custom `Object`

Specifies a custom operator.

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

### operators.date.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

### operators.date.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.

### operators.date.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.

### operators.date.gte `String` *(default: "Is after or equal to")*

The text of the "greater than or equal" filter operator.

### operators.date.gt `String` *(default: "Is after")*

The text of the "greater than" filter operator.

### operators.date.lte `String` *(default: "Is before or equal to")*

The text of the "less than or equal" filter operator.

### operators.date.lt `String` *(default: "Is before")*

The text of the "less than" filter operator.

### operators.boolean `Object`

The texts of the filter operators displayed for boolean fields

> Omitting an operator will exclude it from the DropDownList with the available operators.

### operators.boolean.custom `Object`

Specifies a custom operator.

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

### operators.boolean.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

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
            console.log(e.expression);
        }
      });
    </script>

