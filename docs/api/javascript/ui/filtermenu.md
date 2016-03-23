---
title: FilterMenu
page_title: Configuration, methods and events of Kendo UI FilterMenu
description: 'Configuration steps for the FilterMenu widget.'
---

# kendo.ui.FilterMenu

Represents the Kendo UI FilterMenu widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.

#### Example - set dataSource as an existing instance

    <div id="filter-menu"></div>
    <br /><br />
    <div id="grid"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];
      
      var dataSource = new kendo.data.DataSource({
      	data: data
      });
      
      $("#filter-menu").kendoFilterMenu({
      	dataSource: dataSource,
        field: "age",
        messages: {
            and: "and",
            or: "or",
            filter: "Apply filter",
            clear: "Clear filter"
        }
      });
      
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: dataSource
      });
    </script>

### extra `Boolean` *(default: true)*

If set to `true` the filter menu allows the user to input a second criterion.

#### Example - disable the extra filtering criteria

    <div id="filter-menu">(age filter)</div>
    <br /><br />
    <div id="grid"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];
      
      var dataSource = new kendo.data.DataSource({
      	data: data
      });
      
      $("#filter-menu").kendoFilterMenu({
      	dataSource: dataSource,
        field: "age",
        extra: false
      });
      
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: dataSource
      });
    </script>

### field `String`

Specifies the field to filter on

#### Example - set the field the filter will be applied on 

    <div id="filter-menu">(age filter)</div>
    <br /><br />
    <div id="grid"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];
      
      var dataSource = new kendo.data.DataSource({
      	data: data
      });
      
      $("#filter-menu").kendoFilterMenu({
      	dataSource: dataSource,
        field: "age"
      });
      
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: dataSource
      });
    </script>

### messages `Object`

The text messages displayed in the filter menu. Use it to customize or localize the filter menu messages.

#### Example - customize filter menu messages

    <div id="filter-menu"></div>
    <br /><br />
    <div id="grid"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];
      
      var dataSource = new kendo.data.DataSource({
      	data: data
      });
      
      $("#filter-menu").kendoFilterMenu({
      	dataSource: dataSource,
        field: "age",
        messages: {
            and: "and",
            or: "or",
            filter: "Apply filter",
            clear: "Clear filter"
          }
      });
      
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: dataSource
      });
    </script>

### messages.and `String` *(default: "And")*

The text of the option which represents the "and" logical operation.

### messages.clear `String` *(default: "Clear")*

The text of the button which clears the filter.

### messages.filter `String` *(default: "Filter")*

The text of the button which applies the filter.

### messages.info `String` *(default: "Show items with value that: ")*

The text of the information message on the top of the filter menu.

#### Example - set the "info" message

    <div id="filter-menu"></div>
    <br /><br />
    <div id="grid"></div>
    <script>
      var data = [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
        ];
      
      var dataSource = new kendo.data.DataSource({
      	data: data
      });
      
      $("#filter-menu").kendoFilterMenu({
      	dataSource: dataSource,
        field: "age",
        messages: {
          	info: "<h4>Filter by age</h4>"
          }
      });
      
      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: dataSource
      });

### messages.isFalse `String` *(default: "is false")*

The text of the radio button for `false` values. Displayed when filtering `Boolean` fields.

### messages.isTrue `String` *(default: "is true")*

The text of the radio button for `true` values. Displayed when filtering `Boolean` fields.

### messages.or `String` *(default: "Or")*

The text of the option which represents the "or" logical operation.

### messages.selectValue `String` *(default: "-Select value-")*

The text of the DropDownList displayed in the filter menu for columns whose [values](#configuration-columns.values) option is set.

#### Example - set the "selectValue" message

    <div id="filter-menu"></div>
    <br /><br />
    <div id="grid"></div>
    <script>
      var data = [
        { productName: "Tea", category: 1 },
        { productName: "Ham", category: 2 }
      ];

      var dataSource = new kendo.data.DataSource({
        data: data
      });

      $("#filter-menu").kendoFilterMenu({
        values: [
            { text: "Beverages", value: 1 },
            { text: "Food", value: 2 },
          ],
        dataSource: dataSource,
        field: "category",
        messages: {
          selectValue: "Select category"
        }
      });

      $("#grid").kendoGrid({
        columns: [
          { field: "productName" },
          { field: "category"}        
        ],
        dataSource: dataSource
      });
    </script>

### operators `Object`

The text of the filter operators displayed in the filter menu.

> If `operators` are defined manually, then the default messages will be overridden too. If you would like to control the `operators` and still use the default messages,
then you will need to retrieve them from the `FilterCell` prototype - `kendo.ui.FilterCell.fn.options.operators.{type}`, where type can be "string", "date", "number" and "enums".

### operators.string `Object`

The texts of the filter operators displayed for columns bound to string fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

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

### operators.number `Object`

The texts of the filter operators displayed for columns bound to number fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

#### Example - set number operators

    <div id="filter-menu">(age filter)</div>
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
              age: { type: "number" }
            }
          }
        }
      });

      $("#filter-menu").kendoFilterMenu({
        dataSource: dataSource,
        field: "age",
        operators: {
          number: {
            eq: "Equal to",
            neq: "Not equal to"
          }
        }
      });

      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age", type: "number" }
        ],
        dataSource: dataSource
      });
    </script>

In this example only two operators would be displayed in the DropDownList - "Equal to" and "Not equal to".

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

The texts of the filter operators displayed for columns bound to date fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

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

### operators.enums `Object`

The texts of the filter operators displayed for columns which have their [values](#configuration-columns.values) option set.

> Omitting an operator will exclude it from the DropDownList with the available operators.

### operators.enums.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.

### operators.enums.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.

### operators.enums.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.

### operators.enums.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.

## Fields

### dataSource `kendo.data.DataSource`
The [data source](/api/javascript/data/datasource) of the widget.
Configured via the [dataSource](#configuration-dataSource) option.

### field `String`

The field from the model that filtering will be applied on 

## Methods

### clear

Resets the filter configurations and the dataSource to their initial state.

#### Example - reset the selected filter options

	<div id="filter-menu">(age filter)</div>
    <br />
    <button>Clear filter</button>
    <br />
    <br />
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
              age: { type: "number" }
            }
          }
        },
        change: function(){
        	console.log(5)
        }
      });

      $("#filter-menu").kendoFilterMenu({
        dataSource: dataSource,
        field: "age",
        operators: {
          number: {
            eq: "Equal to",
            neq: "Not equal to"
          }
        }
      });
      
      $("button").click(function(){
      	$("#filter-menu").data('kendoFilterMenu').clear();
      });

      $("#grid").kendoGrid({
        columns: [
          { field: "name" },
          { field: "age", type: "number" }
        ],
        dataSource: dataSource
      });
    </script>


