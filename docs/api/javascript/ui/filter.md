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


<div class="meta-api-description">
Control when filter criteria are applied by enabling or disabling manual submission of filter expressions, toggling between automatic live filtering and requiring users to click an apply button to update data or results, allowing configuration of filter controls to batch changes before executing, set filters to update only on explicit confirmation rather than on every selection change, manage workflows where filter prompts do not immediately refresh data but wait for a user-initiated action to trigger filtering, customize filtering behavior for performance optimization or user experience by delaying updates until a final apply command is given, support scenarios where multiple filter options are chosen before applying, toggle filter application modes between instant and manual triggers, and configure UI elements that enable explicit filter activation rather than continuous auto-filtering.
</div>

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


<div class="meta-api-description">
Bind the filter functionality directly to a predefined data collection or data source object to enable dynamic filtering, searching, and managing filter expressions across complex datasets, ensuring integration with structured data frameworks rather than simple arrays, allowing configuration of filter criteria linked to existing data sources, setting up connected filters for user-driven queries, controlling data-binding for filtering operations, and enabling seamless interaction with data models that support sorting, paging, and querying within applications.
</div>

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


<div class="meta-api-description">
Configure advanced data filtering by setting up expressions that combine conditions, predicates, logical operators, and grouping to selectively retrieve or display subsets of data. Enable custom filter criteria using nested expressions, Boolean logic, comparison operators, and compound statements for precise data querying and dynamic filtering scenarios with collections or data sources. Set complex filter rules to control which records are included based on multiple fields and conditions, supporting flexible search, filtering, and data slicing needs in applications.
</div>

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


<div class="meta-api-description">
Visualize, display, or preview the exact filter logic, query expression, or criteria before executing or applying filters to data sources, enabling users to see the constructed filter query, condition, or rule syntax in advance, helping to verify, validate, debug, or understand how filter conditions, expressions, or parameters will impact data retrieval or results prior to running the filter operation or data query.
</div>

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


<div class="meta-api-description">
Customize and control filterable fields by specifying which data columns or properties users can filter on, setting field names, data types, display titles, and configuring editors with custom input controls or options. Define default filter values and select allowed comparison operators to shape filtering behavior, manage validation rules, bind fields to data sources, enable custom templates, and tailor how filters apply to queries or server-side processing. Configure field-level filtering logic, UI editing experiences, and default states within filter components, supporting dynamic adjustments of which fields appear, how users interact with filters, and how filter criteria translate into backend queries or client-side filtering operations.
</div>

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


<div class="meta-api-description">
Set or configure initial filter values to prefill specific fields when creating new filter expressions, enabling customization of default criteria, starting filter settings, preset field values, or predefined filter inputs to streamline filtering workflows and control the initial state of filter fields automatically for improved user experience and efficiency.
</div>

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


<div class="meta-api-description">
Customize and control how filter fields are displayed and edited by defining templates or custom markup for field editors, enabling the use of personalized inputs, dropdowns, or complex HTML elements to tailor filter UI components, configure field editor layouts and behaviors, embed custom controls for filtering, and set or override default editor interfaces within filter components across initialization and rendering phases.
</div>

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


<div class="meta-api-description">
Configure how preview values for specific fields display by setting formatting patterns such as date, time, number, currency, or custom string formats to control the appearance of field previews within filtering components. Enable, customize, or adjust preview formats to influence rendering styles, presentation, and display output of filtered data fields, ensuring consistent or localized visualization of preview values across different field types and use cases. Set or modify preview display options to tailor how results or summaries show in filters, search interfaces, or data preview elements using varied format patterns and user-defined templates.
</div>

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


<div class="meta-api-description">
Control or customize the displayed name, title, or caption for a data field within filter interfaces by specifying a friendly, human-readable label instead of the raw or technical field identifier. Configure, set, or override the field’s default name text seen in filtering components, search filters, query builders, or UI filter elements to improve clarity, user understanding, or localization. Enable custom naming, aliasing, or renaming of data attributes in filters to show descriptive, meaningful labels for fields during data filtering, selection, search refinement, or user interaction without altering the underlying data keys. Adjust how field names appear visually in filter controls by changing the label text used in dropdowns, filter panels, or search filters for better UX and clearer presentation.
</div>

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


<div class="meta-api-description">
Control and configure which specific data model property or column the filtering logic targets to apply search, filter expressions, or query conditions, ensuring the filter operates on an exact match with the designated field name from the data source or model schema; this setting enables developers to bind filter criteria precisely to a particular attribute or field within the dataset, supporting use cases like filtering by user-defined fields, selecting searchable columns, setting targeted filters, and managing dynamic queries based on individual data properties.
</div>

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


<div class="meta-api-description">
Customize and control the display labels and text for filter operator buttons and menus, enabling you to set, override, or localize operator names like equals, contains, or other comparison options per filter field. Configure how filtering operators appear in user interfaces, modify default operator wording, translate operator labels to different languages, and adjust text for clarity, matching developer needs to tailor filter logic presentation and improve usability in search, query building, or data filtering components.
</div>

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


<div class="meta-api-description">
Specify or set the data type for filtering fields to determine how values are processed and compared, including options like string, numeric, boolean, or date types; controlling type settings enables accurate filtering behavior for text, numbers, true/false flags, or timestamps, and helps configure or customize filter logic by indicating whether values should be treated as text, integers, floating-point numbers, logical booleans, or date/time objects, ensuring proper evaluation during search, querying, sorting, or conditional filtering tasks.
</div>

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


<div class="meta-api-description">
Control or configure the primary logical operator that governs how top-level filter conditions or rules are combined in a filtering system, including options like "and," "or," and other boolean operators, affecting how multiple filter criteria interact or connect within expressions; set or customize the main logical connector for combining root-level filter statements to influence overall filtering behavior, rule aggregation, and conditional logic flow during initialization or setup of filter components.
</div>

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


<div class="meta-api-description">
Control and customize the display text, labels, prompts, and messages shown within filtering interfaces, enabling localization, personalization, or overriding default filter component wording, prompts, error messages, and user interface text elements to match specific languages, branding, or user experience requirements.
</div>

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


<div class="meta-api-description">
Customize or modify the label, text, or title displayed on the button used to add filter expressions, enabling control over the prompt or call-to-action wording shown when users insert new conditions or criteria within filter interfaces, supporting localization, UI personalization, and dynamic message configuration for adding expressions in filtering components.
</div>

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


<div class="meta-api-description">
Customize, localize, or set the label, title, or text of the add group button in filtering interfaces, filter controls, or UI components for group addition actions, enabling control over button captions, names, or prompts for adding new filter groups, configuring the displayed wording for multi-group filtering features, and adjusting the user-facing title or description associated with the action of introducing an additional group within filter mechanisms.
</div>

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


<div class="meta-api-description">
Customize, translate, or set the text label for the logical AND operator in filter components, enabling localization and modifying the conjunction word that combines multiple filter conditions, criteria, or rules. This control helps configure how the AND logic is presented in user interfaces, search filters, query builders, or any place where multiple conditions are joined with an AND keyword, supporting different languages, wording preferences, and contextual labeling of logical operations in filtering systems.
</div>

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


<div class="meta-api-description">
Set, configure, or customize the text label, title, or caption of the apply button used for confirming filter selections, enabling localization, translation, or personalized button wording to match user interface language preferences, control UI element text for applying filters, modify button titles for various languages or contexts, change apply button prompt text, and adjust label wording for better user clarity in filter dialogs or menus.
</div>

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


<div class="meta-api-description">
Set or customize the text label, tooltip, or accessible name of the close button in filtering interfaces to support localization, internationalization, or user interface customization, enabling control over how the close action is described or announced in filters, search dialogs, or UI components featuring close controls and exit options.
</div>

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


<div class="meta-api-description">
Customize and control the label or title displayed on the dropdown menu for selecting fields within filtering interfaces, enabling localization, renaming, or configuring the fields selector prompt in filter components, search filters, or data filtering UIs. Adjust or set the display text for the filter fields dropdown to match language preferences, user interface terminology, or context-specific naming for clearer field selection prompts in filtering widgets.
</div>

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


<div class="meta-api-description">
Customize and control the accessible label text for filter expression groups in filtering interfaces, enabling developers to specify, configure, or set descriptive aria-labels for enhanced screen reader support and improved accessibility of filter components, filter groups, filter criteria, and search expression containers in user interfaces.
</div>

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


<div class="meta-api-description">
Configure or customize the accessible label text for filter logic controls, set or translate the ARIA label that describes filter logic options in filtering toolbars, enable localization or modification of screen reader descriptions for filter condition selectors, adjust or define filter logic identifiers for improved accessibility and clarity, manage the text announced by assistive technologies for filter logic elements in user interfaces involving filter components.
</div>

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


<div class="meta-api-description">
Configure or customize the accessible label, aria-label, or screen reader description for the primary filter logic control, main filter toolbar, or filter rule selector to improve usability, accessibility, and assistive technology support when managing filter criteria, filter expressions, or complex filtering conditions in user interfaces or components.
</div>

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


<div class="meta-api-description">
Set or modify the label text for the operators dropdown in filtering interfaces, configure custom titles for operator selectors, enable localization or translation of filter operator menus, control the display name for filter condition operators, adjust the operators label to match specific language or terminology preferences, customize dropdown headings related to filter logic, rename filter options for better clarity or accessibility, personalize the operator selector title in filtering components, define alternative text for filter operators to support multilingual or branded UI, and tailor operator captions within filter tools for enhanced user experience.
</div>

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


<div class="meta-api-description">
Customize, set, or translate the text label representing the logical "or" operator in filter messages or UI elements to match different languages, locales, or user preferences. Control how the "or" condition is displayed, configure alternative wording for the "or" logical option, and adjust the localization of conjunction terms in filtering criteria or query interfaces to improve user understanding and match internationalization requirements. Enable support for diverse linguistic expressions of the logical "or" in filter conditions, ensuring clarity in conditional statements, query builders, or search filters.
</div>

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


<div class="meta-api-description">
Customize and configure the text labels for filter operators used in filtering components, enabling control over how comparison or logical operators like equals, contains, or greater than are displayed in UI filters; modify, override, or set custom operator names for string, date, number, and enum filter types to tailor the filter interface messaging, adapt filter dropdown options, or localize operator labels, while optionally combining custom operator labels with default system messages by accessing predefined operator templates for different data types such as string, date, numeric, or enumerated filters.
</div>

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


<div class="meta-api-description">
Control, customize, rename, localize, or remove filtering operators for string-based fields in UI filters, including changing operator labels, translating text for internationalization, hiding unwanted string filter options, and managing which string comparison operations appear in filter dropdowns or menus for search, query building, or data filtering interfaces.
</div>

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


<div class="meta-api-description">
Add or configure custom string comparison logic and operators for filtering text fields, enabling tailored string matching, custom evaluation of string expressions, defining unique comparison behaviors beyond standard operators, setting user-defined string filters, enhancing filter components with specialized string operations, controlling how string criteria are processed, implementing customized string matching rules, adjusting filter evaluation to include bespoke string conditions, and extending filtering functionality with personalized string operators for more precise query handling.
</div>

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


<div class="meta-api-description">
Control and customize the display label or visible text for custom string operators within filtering dropdown menus, enabling precise adjustments of operator names shown in filter interfaces, configure or rename operator text to match specific filtering logic or user terminology, set or modify operator titles for string-based filters to improve dropdown clarity and usability, customize operator descriptions or labels used in filter components to tailor the filtering experience with personalized or localized text in operator selection lists.
</div>

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


<div class="meta-api-description">
Customize string comparison logic by defining a function that evaluates whether a given text field matches specific criteria within filtering operations, allowing control over how string data is compared, matched, or validated against filter inputs using custom conditions, user-defined functions, or advanced matching rules beyond default operators. This enables developers to set their own comparison behavior, implement customized string matching algorithms, conditionally process filter values against data fields, and handle complex scenarios like case-insensitive matching, partial matches, pattern recognition, or custom boolean evaluations during filtering tasks.
</div>

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


<div class="meta-api-description">
Control and customize the label or display text for the equality operator used in string filtering conditions within filtering interfaces, defining how "equals" comparisons appear to users when specifying exact string matches, enabling configuration of textual representation for string equality checks across filter components, setting or overriding the visible captions or operator names tied to string equality operations in filters, and managing how the equals operator is presented for string-based filter criteria in customizable filter UIs.
</div>

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


<div class="meta-api-description">
Customize, configure, or set the text label, display, or wording for the "not equal" operator in string filtering functions within filter components, enabling localization, translation, or modification of the inequality comparison term when filtering text fields, string values, or character data to control how exclusion criteria are presented and interpreted in user interfaces or query filters.
</div>

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


<div class="meta-api-description">
Configure and customize the display text or label for the string null-check filter operator used in filtering components, control how the filter option for detecting empty, missing, or null string values appears, set or change the wording shown to users when using string presence or absence conditions, adjust the interface label for filters that identify null or undefined string entries, and enable personalized or localized naming for the filter operator that tests whether string fields are null or have no value.
</div>

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


<div class="meta-api-description">
Configure or customize the label, text, or caption shown for the filter condition that checks if a string field is not empty, has any value, or is non-null; control how the operator for excluding null or undefined string values appears in filters, search interfaces, or query builders; set or modify the display wording for conditions verifying the presence of any non-null string data during filtering or querying processes.
</div>

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


<div class="meta-api-description">
Customize or modify the display text, label, or name for the operator that checks if a string is empty or has no content within filter controls, search conditions, or query builders. Enable setting or configuring the wording for string emptiness checks, blank string filters, or empty value operators in filtering components, data grids, or dynamic search interfaces to tailor how the "isempty" condition appears in user-facing filter options or dropdown selections. Adjust terminology for emptiness evaluations, null string detection, or zero-length string filter operations to improve clarity, localization, or user experience in filtering logic or search criteria setups.
</div>

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


<div class="meta-api-description">
Control or customize the label text for string filters that check if a value is not empty or non-blank, supporting localization, translation, or renaming of filter operator labels like "is not empty," "not empty," "has text," or "contains value," enabling configuration of filter UI text to match language preferences, display options, or accessibility requirements in search, query building, or data filtering interfaces.
</div>

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


<div class="meta-api-description">
Configure and customize the localized label or text for string filters that check whether a value begins with a specific substring, enabling control over the "starts with" condition in filtering operations, search queries, and data matching scenarios where prefix-based string comparisons are required or preferred in user interfaces and dynamic data filtering components.
</div>

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


<div class="meta-api-description">
Set or customize the text label, display name, or user-facing wording for the string filter operator that checks if one string includes or contains another substring, adjusting how the "contains" condition appears in filter options, search criteria, or query builders that use string matching and partial text search rules.
</div>

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


<div class="meta-api-description">
Configure and customize the label or text used for the filter operator that excludes items containing specific substrings, enabling localization, translation, and internationalization of the "does not contain" filtering option. This setting helps control the display text for filtering criteria that omit results matching certain string parts, useful for adapting user interface language, creating multilingual filters, or modifying operator names in search, query, or data grid filtering components dealing with string exclusion conditions.
</div>

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


<div class="meta-api-description">
Customize or configure the textual label, display name, or visible wording for the filter suffix match option that checks whether a string ends with a specified substring, enabling control over how the ends-with string comparison operator appears in search filters, query builders, or user interfaces, including adjustments for localization, language variations, synonyms for terminologies like "suffix," "string matching," "ends with," "tail," or "string filter operator" in filtering components and search controls.
</div>

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


<div class="meta-api-description">
Customize, configure, or localize the text label for string filters that check if a value is null, empty, blank, missing, or undefined in filtering components, enabling control over operator display names for conditions evaluating empty strings, null values, or absence of text input in search filters and query builders.
</div>

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


<div class="meta-api-description">
Configure or customize the label text for string filter operators that check whether a value is neither null, undefined, empty, or blank in filtering components, search criteria, or query builders; control how checks for non-empty, non-null string fields are displayed, named, or localized in UI filters, enabling setting or renaming the operator label that verifies strings contain actual data rather than being null or empty.
</div>

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


<div class="meta-api-description">
Control, configure, or customize numeric filter operator labels, set, modify, or provide display texts for number comparison options, enable or disable specific numeric operators, adjust which number-based filtering options appear in dropdowns, manage numeric condition labels like equals, not equals, greater than, less than, and other number filter choices, tailor or personalize numeric filtering controls, include or exclude particular numeric operators from user selection, refine how number operators are presented for filtering data, optimize numeric filter conditions visibility and naming within selection dropdowns.
</div>

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


<div class="meta-api-description">
Control and configure custom numeric comparison operators, set personalized labels for number-based filters, enable defining unique mathematical or logical operations beyond standard numeric operators, customize how number filters interpret and display conditions, specify bespoke numeric filter operations for tailored data searches, create and name custom number operator rules, adjust and extend filtering functionality for numerical values, define specialized numerical criteria in searches or filtering logic, implement user-defined numeric predicates, and tailor numeric operator behavior for advanced filtering scenarios.
</div>

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


<div class="meta-api-description">
Control and customize the displayed label for custom numeric filter operators within filter dropdowns, enabling you to set, override, or localize the text shown for number-based filter options, adjust operator names for better user experience, customize filter operator descriptions, configure custom labels for numerical filtering choices, and tailor how numeric conditions appear in filter selections across different languages or contexts.
</div>

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


<div class="meta-api-description">
Enable custom numeric comparison logic by defining a function that evaluates numerical data values against specific filter criteria, allowing tailored conditions, specialized operators, custom comparison rules, flexible number filtering, and dynamic true/false matching behavior for filtering datasets. This supports creating personalized numeric filters, implementing complex comparison logic beyond default operators, adjusting filter behavior by programming custom evaluation functions, configuring numeric filtering rules, and controlling how numerical values pass or fail filter conditions.
</div>

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


<div class="meta-api-description">
Customize or configure the text label, display string, or localized message used for the numeric equality operator in filtering interfaces, allowing you to set or change how the "equals" condition appears in number-based filters, numeric comparisons, or query operators, enabling precise control over the wording shown when users select or apply a filter that matches values exactly, ideal for scenarios where filtering by numbers with an "equal to" condition needs clear, customizable, or localized terminology in search, data grids, or UI filter controls.
</div>

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


<div class="meta-api-description">
Control and configure the text label shown for numeric filtering conditions where values are not equal, allowing customization of the "not equal" operator's display name in number-based filters. This setting enables adjusting or localizing the comparison operator label that excludes matches, supporting filter UI flexibility and clarity for numeric inequality comparisons, setting custom names for "not equal to" checks, and tailoring numeric filter operators to user preferences or localization needs.
</div>

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


<div class="meta-api-description">
Set or customize the display text, label, or name for the numeric filter condition that checks for null or empty values, enabling clear identification and localization of filters that test whether a number field is missing, undefined, or has no value; configure the wording shown in filter dropdowns or UI for operators that evaluate nullity in number fields, control how "is null," "empty number," or "missing numeric value" conditions are presented in filtering interfaces, and enable translation or adjustment of terms used to represent null checks on numeric columns in data filtering components or search queries.
</div>

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


<div class="meta-api-description">
Set or customize the label, text, or description shown for the numeric filter operator that checks if values are present or not null, especially useful when configuring or localizing filters, defining conditions to exclude null or empty numbers, enabling user-friendly prompts for “is not null” numeric checks, controlling how non-empty number filters appear in UI or search queries, and adjusting wording for filtering data by numbers that are not null or missing.
</div>

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


<div class="meta-api-description">
Customize or configure the label text, display name, or localized string for the numeric filter operator representing greater than or equal to (>=), enabling developers to define, set, or control how this comparison operator appears in filter interfaces, queries, or search filters that require numeric boundary conditions or threshold comparisons with inclusive limits, useful for configuring UI elements, validation filters, or dynamic query builders supporting numeric ranges and conditional logic for values greater than or equal to a specified number.
</div>

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


<div class="meta-api-description">
Control and customize the textual label for numerical filters that check if values exceed a certain threshold, enabling the configuration of comparison operators like "greater than," "above," or "exceeds" in filtering components. Adapt and localize the wording for number-based conditions where users want to filter datasets for numbers greater than a specified figure, set or translate operator names for numeric comparisons surpassing a limit, and tailor the display text for greater-than logic in advanced data filtering, search criteria, or query interfaces. This supports customizing, localizing, or modifying the text associated with numeric comparison operators to fit different languages, contexts, or user preferences in filtering numeric values exceeding a target.
</div>

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


<div class="meta-api-description">
Control, configure, or customize the textual label representing the numeric "less than or equal to" comparison operator in filters, enabling localization, internationalization, or personalized display of the "≤" condition for numeric data filtering, such as specifying, setting, or changing the operator text for queries, conditional filtering, search constraints, or comparison rules involving numbers where values are less than or equal to a given threshold.
</div>

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


<div class="meta-api-description">
Customize and configure the display text or label for numeric comparison operators that check if a value is less than a specified number, including setting localized or translated strings to match different languages or regions, controlling how "less than" conditions appear in filters, adjusting numeric operator wording for user interfaces, enabling tailored numeric filtering options, and defining phrases used in numeric comparisons when filtering data sets by values smaller than a given threshold.
</div>

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


<div class="meta-api-description">
Adjust, customize, set, or rename comparison terms for date-based filters such as equals, not equals, before, after, on, or between to localize, personalize, or limit available date operators in filtering interfaces; control which date comparison options appear in dropdowns when filtering data by dates, timestamps, or time intervals, enabling tailored label text for better clarity, localization, or user experience in date-specific queries, search filters, or conditional logic involving date values.
</div>

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


<div class="meta-api-description">
Configure advanced date comparisons by adding custom operators that enable non-standard logic for filtering dates, allowing creation of personalized comparison rules, unique operator names or labels, and enhanced control over date filtering behavior both on client and server sides. Extend default date filter functionality with bespoke operator definitions to handle specialized queries, tailor filtering criteria, and implement custom date comparisons beyond built-in options. Enable developers to define and integrate custom date comparison methods for flexible filtering, supporting diverse user cases such as range overrides, specialized date matching, or unique temporal conditions within filtering components.
</div>

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


<div class="meta-api-description">
Control and customize the display text or label for custom date filtering options in dropdown menus, enabling you to set, modify, or configure the specific wording shown when selecting personalized date operators. Adjust how date-related filters appear by specifying the custom operator’s name, ensuring intuitive date criteria selection, filtering, or querying with tailored or user-defined date condition labels in filter operator lists. This includes setting readable, localized, or context-appropriate text that appears alongside standard date filter operators in user interfaces.
</div>

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


<div class="meta-api-description">
Customize date filtering by implementing your own comparison logic for date operators, allowing you to define functions that handle complex conditions such as range validations, timezone adjustments, and specialized date comparisons. Enable flexible date-based filtering by setting custom callback functions that evaluate whether data entries meet specific temporal criteria, supporting scenarios like overlapping intervals, exclusive or inclusive date ranges, and intricate predicate rules. Control and tailor how date values are filtered by providing personalized comparison handlers to accommodate advanced date filtering needs beyond standard operators.
</div>

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


<div class="meta-api-description">
Customize or localize the label text for date equality conditions in filter components, enabling control over the displayed wording for "equals" or "is equal to" operators when filtering by date values, dates, timestamps, or calendar fields; adjust, set, modify, or translate the textual representation users see for date equality comparisons within filtering interfaces or query builders.
</div>

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


<div class="meta-api-description">
Customize and configure the display text, label, or name for the date filter condition that excludes values matching a specific date, enabling control over the wording shown for "not equal to" date comparisons, date inequality filters, date exclusion operators, or conditions that filter out exact date matches within localized or internationalized interfaces.
</div>

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


<div class="meta-api-description">
Set or customize the localized label or text displayed for filtering dates where the value is null, missing, or empty; control how the "date is null" condition appears in filter dropdowns or UI selectors, enable specific wording or phrasing for filtering date fields that are blank or unset, configure the display term used to represent null or absent dates in date filter operators, manage the text shown for filters checking if a date field has no value, adjust or override the default "is null" date filter operator wording to match language, locale, or app terminology for filtering dates without entries.
</div>

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


<div class="meta-api-description">
Customize the text label or display name shown for conditions that check whether a date or timestamp field has a non-empty, non-null value, controlling how "is not null" date filters appear in user interfaces, search filters, query builders, or data grids across applications that handle date validations, enabling tailored wording for filtering entries where date fields contain any valid date instead of being empty or missing.
</div>

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


<div class="meta-api-description">
Customize or configure the text label, display name, or localization string for the date filtering condition that checks if a date value is greater than or equal to a specified date, enabling control over how the "date is on or after," "date after or equal," "greater than or equal to date," or "date >= filter" operator is presented in user interfaces, search filters, or query builders with date comparison logic.
</div>

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


<div class="meta-api-description">
Customize or set the date "greater than" comparison label, text, or operator name in filtering controls to display user-preferred language, localize date comparison prompts, configure the filter operator's wording for dates exceeding a specific value, enable regional or customized wording for date filters checking if a date is after a certain point, and control the text shown for "date greater than" conditions in filtering components across different locales or language settings.
</div>

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


<div class="meta-api-description">
Customize or set the wording, label, or text for the "less than or equal to" date comparison operator in filtering controls, enabling localization, translation, or modification of the operator phrase for date filters, date range queries, or date comparisons to match different languages, locales, or user interface preferences related to filtering data by dates with conditions like "on or before," "up to," or "dates less than or equal."
</div>

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


<div class="meta-api-description">
Adjust, configure, or set the display text, label, or wording for the date filter operator that matches values earlier than a specified date, such as "before," "less than," "prior to," or "earlier than" when filtering data by dates; control how the "less than" date comparison appears in filter dropdowns, operator selections, or UI labels for date range filtering and conditional date queries.
</div>

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


<div class="meta-api-description">
Customize or control the labels and text shown for true/false or yes/no filter conditions in filter dropdown menus, modifying available boolean operators like equals, does not equal, or toggling visibility of these options by adding or removing them from filter selections, enabling configuration of which logical boolean choices users can pick when applying filters to data sets or UI elements.
</div>

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


<div class="meta-api-description">
Control and customize boolean filtering by defining your own logical comparison or predicate for true/false fields, allowing tailored evaluation of boolean values in filtering interfaces, enabling custom operators to override default boolean checks, integrating personalized conditions within filter components, and supporting advanced boolean query customization, flexible true/false comparisons, and developer-defined boolean logic in search or filter UIs.
</div>

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


<div class="meta-api-description">
Set or customize the displayed label, caption, or text for a boolean operator in a filter or query builder, control how boolean options appear in dropdowns or selection menus, configure custom names for true/false or yes/no operators, override default boolean operator strings with personalized wording, enable tailored captions for logical operators in filtering interfaces, adjust or rename boolean filter choices for clearer UI presentation, modify boolean operator text for improved user understanding or localization, define specific strings to represent custom logical conditions, and specify exact wording for boolean controls within data filters or search criteria.
</div>

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


<div class="meta-api-description">
Configure custom logic for boolean operators in filtering by defining a handler function that controls how true/false values are evaluated, combined, compared, or transformed during filter operations. This enables customizing boolean condition checks, overriding default operator behavior, implementing specialized comparison rules, or manipulating boolean data processing within filter expressions. Whether adjusting boolean evaluation, setting custom matching criteria, or controlling conditional logic execution in filters, this functionality supports flexible, programmable handling of boolean operators in search and data queries.
</div>

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


<div class="meta-api-description">
Control and customize the equality operator label or symbol used for boolean field filters, configure how exact matches for true or false conditions are displayed or interpreted, adjust the equality comparison text for boolean filtering logic, set or modify the operator representation for checking boolean equivalence in filter components, manage the way boolean equals operations appear or function within filtering interfaces, specify the label or code used for boolean equality checks in filter criteria, tailor the true/false match operator wording or token, enable precise control over boolean equal condition expressions in data filtering scenarios.
</div>

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


<div class="meta-api-description">
Configure or customize the text label or display name for the "not equal" boolean operator in filters, enabling you to set how the inequality condition appears in boolean filtering expressions, queries, or criteria, such as defining alternative phrases or symbols that represent the logical negation of equality in boolean filter operations, helping to control the wording or representation of not-equal conditions in search filters, data queries, or conditional boolean logic settings.
</div>

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


<div class="meta-api-description">
Trigger or execute the current filtering criteria on a data set by applying the constructed filter logic to refresh or update displayed data, enabling immediate or deferred filtering actions, including sending filter conditions to back-end data sources for remote queries or processing locally on client data; useful for programmatically activating or enforcing filters after interface updates, modifying filter parameters, or synchronizing filter state with underlying data collections to control which items are shown based on dynamic rules or conditions.
</div>

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


<div class="meta-api-description">
Capture updates or modifications to filter criteria, monitor changes in filter expressions, detect when filter conditions are altered, listen for filter updates to trigger data source refresh or query rebinding, track dynamic filter changes to synchronize user interface state, respond to user-driven filter adjustments, detect real-time filtering changes for reactive UI behavior, handle filter expression modifications to apply new filter logic, observe filter condition shifts to update displayed data, and configure event handling for any filter expression transitions or state changes.
</div>

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

