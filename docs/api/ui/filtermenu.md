---
title: FilterMenu
page_title: Configuration, methods and events of Kendo UI FilterMenu
description: 'Configuration steps for the FilterMenu widget.'
res_type: api
---

# kendo.ui.FilterMenu

Represents the Kendo UI FilterMenu widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String` *(default: 'none')*

If set to `auto` and the filterMenu will use adaptive rendering.


<div class="meta-api-description">
How to make Kendo UI filter menus responsive on different screen sizes? Control adaptive or responsive behavior of filter menus for varying screen sizes and devices by enabling automatic layout adjustments, allowing filter interfaces to dynamically resize, reorganize, or reformat based on viewport dimensions, mobile usage, or limited display space; configure filter controls to seamlessly adapt for improved usability on phones, tablets, and desktop browsers, ensuring intuitive interaction with filter options regardless of device type or screen width.
</div>

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
        adaptiveMode: "auto",
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

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.


<div class="meta-api-description">
How to customize filter menu title in responsive Kendo UI layouts? Customize or configure the dynamic or responsive title text for a filter menu interface, controlling how the title adapts or changes in different views or screen sizes, enabling you to set, modify, or override the heading or label shown on filter selectors or dropdowns in adaptive or mobile layouts, adjust the filter panel header text, and personalize the user interface text for better clarity and context when filters collapse or shift in responsive design.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        adaptiveTitle: "Custom Filter Title",
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ]
    });
    </script>

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.


<div class="meta-api-description">
How do I customize the subtitle in a Kendo UI adaptive filter menu? Set or modify the subtitle text that appears in the responsive or adaptive filter menu layout, enabling the display of concise, contextual labels for compact views, controlling and customizing adaptive UI subtitles, configuring shorthand or brief descriptions for filter menus in mobile or narrow screens, adjusting the subtitle content shown when the filter menu switches to a condensed or adaptive mode, enhancing usability with clear, customizable text for the adaptive interface, and enabling tailored subtitle strings for different screen sizes or responsive states.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        adaptiveSubtitle: "Select filtering options",
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ]
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
How do I set up filter menu items in Kendo UI with different data sources? Configure the filter menu items by setting data sources from local arrays, remote endpoints, or existing data source instances to control data binding and loading behavior, supporting direct use of JavaScript arrays, objects with data source configuration, or pre-initialized data source objects for dynamic, reusable, or server-driven filter options in UI components while enabling developers to set, reuse, or link data collection sources without redundant initializations for custom filtering workflows.
</div>

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


<div class="meta-api-description">
How to enable multiple conditions in Kendo UI filter menus? Configure filter menus to support multiple conditions by enabling an additional input field that lets users enter and combine two separate criteria, allowing for more advanced filtering, multi-condition search, dual-parameter filtering, extended filter options, and enhanced query customization within interactive filter components.
</div>

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


<div class="meta-api-description">
How do I specify which field to filter in a Kendo UI FilterMenu? Specify or configure the exact data attribute, key, column, or model property to apply filters on within a filter menu, enabling precise targeting of data fields for filtering actions, controlling which property the filter criteria affect, setting or changing the filtering focus to a particular field name, and ensuring the filter menu interacts with the intended data item in datasets, models, or collections by defining the relevant string identifier for that field.
</div>

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


<div class="meta-api-description">
How do I customize the text in Kendo UI filter menus? Adjust, customize, or localize the text labels, prompts, messages, and user interface language shown in filter menus, enabling control over display wording, terminology, translations, or custom descriptions for filtering options, filter prompts, menu instructions, and related UI text to fit different languages, branding, or user preferences across filtering components.
</div>

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

### messages.additionalValue `String` *(default: "Additional value")*

The text of the additional filter value editor.


<div class="meta-api-description">
How do I customize the label for extra filter values in a Kendo UI FilterMenu? Customize or set the text label, caption, or prompt for extra filter values, additional criteria, or supplementary input fields within a filter menu or filtering interface, enabling control over how secondary or extra filtering options, extended filter parameters, or additional value editors are named, displayed, or presented in filtering components and user interfaces where dynamic or multiple filter values are applied and labeled.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        messages: {
            additionalValue: "Enter another value"
        }
    });
    </script>

### messages.additionalOperator `String` *(default: "Additional operator")*

The text of the additional filter operator editor.


<div class="meta-api-description">
How do I customize the text for extra filter operators in a Kendo UI FilterMenu? Customize, translate, or localize the text labels and prompts for extra filter operators within a filter menu interface, enabling control over how additional filtering options, operators, or criteria are displayed or named in different languages or contexts. Adjust, configure, or set the messaging for extended filter conditions to tailor user-facing filter operator descriptions, help text, or UI strings to specific locales, user preferences, or application requirements, including changing words for supplementary filter logic in dynamic query builders or advanced search filters.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        messages: {
            additionalOperator: "Select another operator"
        }
    });
    </script>

### messages.and `String` *(default: "And")*

The text of the option which represents the "and" logical operation.


<div class="meta-api-description">
How to customize the "and" operator label in Kendo UI filter menus? Customize the text label for the logical AND operator in filter menus, enabling control over how conjunctions appear in filtering interfaces, including configuring, renaming, or localizing the "and" option in query or condition builders, search filters, or data grid filter panels to match specific language, terminology, or user experience preferences.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        messages: {
            and: "AND"
        }
    });
    </script>

### messages.buttonTitle `String` *(default: "{0} filter column settings")*

The title of the button that displays the FilterMenu.

> The {0} argument represents the field name


<div class="meta-api-description">
How to customize the button title in Kendo UI filter menu? Customize the label or title text of the button that triggers opening a filter menu or dropdown, enabling dynamic insertion of the related field name or column via placeholders like {0} to create context-aware button captions, captions for filter toggles, or customizable button labels for activating filtering options in user interfaces, allowing configuration of button texts for filter controls in tables, grids, or lists with variable content based on the specific data field being filtered.
</div>

#### Example - set the "buttonTitle" message

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
          buttonTitle: "{} Filter Menu"
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

### messages.clear `String` *(default: "Clear")*

The text of the button which clears the filter.


<div class="meta-api-description">
How to customize the clear button label in Kendo UI FilterMenu? Customize or configure the label and display text of the button that resets, removes, or clears applied filters within filter menus, filter panels, or filter UI components, enabling control over the wording shown for clearing filter criteria, resetting selections, or removing active filter conditions in dropdown or sidebar filter interfaces.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        messages: {
            clear: "Reset Filter"
        }
    });
    </script>

### messages.filter `String` *(default: "Filter")*

The text of the button which applies the filter.


<div class="meta-api-description">
How to customize the apply button text in Kendo UI filter menu? Modify or customize the label, text, caption, or wording of the apply button that confirms, activates, or executes a filter selection within a filtering interface or menu. Configure the button text shown when users finalize filtering criteria, set localized or custom messages for the filter action, control the apply command prompt in filter menus, and adjust user interface strings for applying filters in data grids, tables, or search panels. Enable changes to the filter confirmation button text to match language preferences, UI themes, or accessibility requirements related to filter application controls.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        messages: {
            filter: "Apply Filter"
        }
    });
    </script>

### messages.info `String` *(default: "Show items with value that: ")*

The text of the information message on the top of the filter menu.


<div class="meta-api-description">
How do I customize the informational text in the Kendo UI filter menu? Configure or customize the informational text displayed at the top of the filter menu, control the header message shown above filter options, set or modify the guiding info text for users in the filter dropdown interface, enable custom messages to provide context or instructions in filter dialogs, adjust or update the informational banner content in filter panels to enhance user understanding and interaction.
</div>

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
    </script>

### messages.isFalse `String` *(default: "is false")*

The text of the radio button for `false` values. Displayed when filtering `Boolean` fields.


<div class="meta-api-description">
How to change the label for false values in Kendo UI filtering menus? Customize or change the text label for the option that represents false Boolean values in filtering menus, configure the displayed name or caption for selecting false states in Boolean filters, set or modify the label shown next to the false radio button in filter interfaces, control how false values are described or named when users pick false conditions in Boolean filtering controls, adjust the terminology or wording used for indicating false selections within filter menus for Boolean fields.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", active: true },
            { name: "Jane", active: false }
        ],
        field: "active",
        messages: {
            isFalse: "No"
        }
    });
    </script>

### messages.isTrue `String` *(default: "is true")*

The text of the radio button for `true` values. Displayed when filtering `Boolean` fields.


<div class="meta-api-description">
How do I customize the label for the "true" option in a Kendo UI Boolean filter menu? Adjust or set the label text shown for the true option in Boolean field filters, control how the affirmative or enabled state is presented in filter menus, customize the display name or caption for the "true" selection when filtering Boolean values, configure the wording or phrasing for the positive radio button in filtering interfaces, and tailor the true-value label to match user preferences or localization in Boolean filter components.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", active: true },
            { name: "Jane", active: false }
        ],
        field: "active",
        messages: {
            isTrue: "Yes"
        }
    });
    </script>

### messages.logic `String` *(default: "Filters logic")*

The text of the filter logic editor.


<div class="meta-api-description">
How do I customize the filter logic messages in Kendo UI? Customize or configure the text label, prompt, or message shown for filter logic expressions within filter menus, enabling control over the wording or localization of logic operators, logical conditions, or filter criteria descriptions in user interfaces where users build or edit advanced filter rules and boolean logic statements.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        messages: {
            logic: "Logical Operator"
        }
    });
    </script>

### messages.or `String` *(default: "Or")*

The text of the option which represents the "or" logical operation.


<div class="meta-api-description">
How do I customize the "or" label in Kendo UI filter menus? Customize, localize, or translate the text label for the logical OR operator in filter menus, enabling control over how the "or" option appears in user interfaces, search filters, conditional expressions, or query builders, supporting multiple languages and regional wording preferences for advanced filtering logic, boolean operations, or combined criteria settings.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        messages: {
            or: "OR"
        }
    });
    </script>

### messages.selectValue `String` *(default: "-Select value-")*

The text of the DropDownList displayed in the filter menu for columns whose [values](/api/javascript/ui/filtermenu#configuration-columns.values) option is set.


<div class="meta-api-description">
How can I customize the label in Kendo UI filter menu when selecting values? Customize or configure the dropdown list label, placeholder, or default text displayed when selecting filter values in filter menus for data columns with predefined options, enabling control over how chosen values appear in filter dropdowns, filter selection prompts, or filtering interfaces that use value-based selections or list options in grids and tables.
</div>

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

### messages.title `String` *(default: "Show items with value that: ")*

The text rendered for the title attribute of the filter menu form.


<div class="meta-api-description">
How to customize the title in Kendo UI FilterMenu? Set or customize the heading, label, or title text displayed on filter menus or filter forms for localization, accessibility, user interface customization, language translation, or display purposes. Configure, change, or control the filter dialog's main title text to provide contextual information, improve usability, adapt to different languages, or enhance screen reader support in filter menus and dropdown filters.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        messages: {
            title: "Filter data by criteria:"
        }
    });
    </script>

### operators `Object`

The text of the filter operators displayed in the filter menu.

> If `operators` are defined manually, then the default messages will be overridden too. If you would like to control the `operators` and still use the default messages,
then you will need to retrieve them from the `FilterCell` prototype - `kendo.ui.FilterCell.fn.options.operators.{type}`, where type can be "string", "date", "number" and "enums".


<div class="meta-api-description">
How do I customize filter operator labels in Kendo UI's filtering menu? Customize and control the filter operator labels and text in filtering menus by setting, changing, or overriding default filter operators for string, date, number, or enum types; configure custom operator names, labels, or sets to tailor filter dropdown menus, enable specific filter condition wording, and manage how filter expressions appear in UI components by defining or replacing default filter operator messages for various data types, while optionally retrieving standard operator text for partial customization or consistent filtering terminology across applications.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "name",
        operators: {
            string: {
                eq: "Equals",
                neq: "Not Equals",
                contains: "Contains"
            }
        }
    });
    </script>

### operators.string `Object`

The texts of the filter operators displayed for columns bound to string fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.


<div class="meta-api-description">
How do I customize the string operators in Kendo UI filter menu? Control and customize the text labels for string comparison options in filter dropdown menus within grid column filters, enabling configuration of which string operators appear or are hidden, such as equals, contains, starts with, ends with, and other string matching criteria, to tailor the filtering interface by setting, modifying, or removing specific operator labels shown in the filter selection for string-based columns, adjusting how users can apply string conditions in grid filtering scenarios.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", category: "Manager" },
            { name: "Jane", category: "Developer" }
        ],
        field: "name",
        operators: {
            string: {
                eq: "Is exactly",
                neq: "Is not",
                contains: "Includes",
                startswith: "Begins with"
            }
        }
    });
    </script>

### operators.string.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.


<div class="meta-api-description">
How do I change the label for the "equals" operator in a Kendo UI filter menu? Configure or customize the label, text, or display name for the equality operator used in filter menus, set or change the localized string representing the "equals" comparison in filtering options, control how the equal condition is presented or named in filters, adjust or override the default wording for the equality operator in string filters, specify or translate the label for "equals" in filter menus to match different languages or custom terminology.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", category: "Manager" },
            { name: "Jane", category: "Developer" }
        ],
        field: "name",
        operators: {
            string: {
                eq: "Matches exactly"
            }
        }
    });
    </script>

### operators.string.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.


<div class="meta-api-description">
How to localize the "not equal" string comparison operator in Kendo UI grid filter menus? Customize or localize the label for the "not equal" string comparison operator in grid filter menus, enabling you to configure how inequality conditions are displayed or phrased in filtering interfaces, set alternative text or terminology for "not equal" within string filters, adjust the wording shown to users when filtering out values that do not match specified strings, and control the language or phrasing used for the string inequality operator in data grid filtering options.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", category: "Manager" },
            { name: "Jane", category: "Developer" }
        ],
        field: "name",
        operators: {
            string: {
                neq: "Does not match"
            }
        }
    });
    </script>

### operators.string.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.


<div class="meta-api-description">
How do I customize the "is null" label in Kendo UI filter menus for string conditions? Customize or configure the text label for string filter conditions that check for null, empty, or missing values within filter menus, enabling localization, translation, or modification of the operator display name used when setting up filters to identify null or undefined string entries. This controls how "is null" or similar operators appear in filter dropdowns, helping developers tailor filter criteria wording, adapt to different languages, or clarify null-check options in user interfaces that include string filtering and conditional logic setups.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", category: "Manager" },
            { name: "Jane", category: null }
        ],
        field: "category",
        operators: {
            string: {
                isnull: "Has no value"
            }
        }
    });
    </script>

### operators.string.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.


<div class="meta-api-description">
How do I customize the "is not null" filter label in Kendo UI string filtering menus? Control or customize the label, caption, or display text for the filter operator that checks if string values are not null or empty, enabling localization, internationalization, and personalized filter menu wording. Adjust or configure the textual representation of the "is not null" filter condition in string-based filtering menus to better suit different languages, user preferences, or UI contexts. Manage how the filter option for non-null string entries is presented in dropdowns, filter selectors, or query builders to enhance clarity, usability, and accessibility when filtering data with string fields that require existence checks rather than null or empty values.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", category: "Manager" },
            { name: "Jane", category: null }
        ],
        field: "category",
        operators: {
            string: {
                isnotnull: "Has a value"
            }
        }
    });
    </script>

### operators.string.isempty `String` *(default: "Is empty")*

The text of the "isempty" filter operator.


<div class="meta-api-description">
How do I customize the label for empty string checks in Kendo UI filtering menus? Set or customize the label, text, or wording shown for empty or blank string checks in filtering menus, control how the interface represents conditions that test for empty values or missing text, configure the display string for operators that identify empty fields or null-like string entries, enable adjustment of the filter option's descriptive text when detecting no content or empty strings within filter dropdowns or menus.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", description: "Manager" },
            { name: "Jane", description: "" }
        ],
        field: "description",
        operators: {
            string: {
                isempty: "Is blank"
            }
        }
    });
    </script>

### operators.string.isnotempty `String` *(default: "Is not empty")*

The text of the "isnotempty" filter operator.


<div class="meta-api-description">
How to customize the label for string filter condition "is not empty" in Kendo UI? Control and customize the label or text displayed for string filter conditions that check if a value is present and not empty, such as "is not empty," "non-empty," "has content," or "contains data." Configure how the filter menu communicates criteria to exclude empty, null, or blank string entries in search filters, text inputs, or data grids, enabling developers to adjust the wording shown for conditions that verify the existence of any characters or values within a string field. This setting influences user interface prompts, filter dropdown options, and query operators related to non-empty string validations, helping match searches for filters that identify strings with actual content present.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", description: "Manager" },
            { name: "Jane", description: "" }
        ],
        field: "description",
        operators: {
            string: {
                isnotempty: "Is not blank"
            }
        }
    });
    </script>

### operators.string.startswith `String` *(default: "Starts with")*

The text of the "starts with" filter operator.


<div class="meta-api-description">
How can I customize the "starts with" operator label in Kendo UI filter menus? Control and customize the display label or text for the "starts with" string comparison operator in filtering interfaces, enabling you to rename, localize, or modify the operator’s name shown in filter menus, search filters, or dropdowns. This setting lets you configure how the "starts with" condition appears visually to users, adapt filter operator labels for different languages or terminologies, and tailor the filter UI to specific branding or terminology preferences in data querying, search interfaces, and string filtering scenarios.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", title: "Manager" },
            { name: "Jane", title: "Developer" }
        ],
        field: "title",
        operators: {
            string: {
                startswith: "Begins with"
            }
        }
    });
    </script>

### operators.string.contains `String` *(default: "Contains")*

The text of the "contains" filter operator.


<div class="meta-api-description">
How to customize the "contains" filter option label in a Kendo UI filtering menu? Customize and localize the label text for the substring matching filter option commonly known as "contains" in filtering menus, allowing developers to configure, rename, or translate the operator that checks if a string includes a specific sequence of characters, helping with search filters, text matching, and dynamic query interfaces by setting the display text shown to users for partial string search conditions.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", title: "Senior Manager" },
            { name: "Jane", title: "Lead Developer" }
        ],
        field: "title",
        operators: {
            string: {
                contains: "Includes"
            }
        }
    });
    </script>

### operators.string.doesnotcontain `String` *(default: "Does not contain")*

The text of the "does not contain" filter operator.


<div class="meta-api-description">
How to customize string filter operator for excluding values with specific substrings in Kendo UI? Customize, configure, or set the text label for string-based filters that exclude values containing specific substrings, enabling control over negative substring matching or exclusion criteria in filtering menus, search interfaces, or query builders where users need to specify conditions that do not include certain text fragments, words, or characters.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", title: "Senior Manager" },
            { name: "Jane", title: "Lead Developer" }
        ],
        field: "title",
        operators: {
            string: {
                doesnotcontain: "Excludes"
            }
        }
    });
    </script>

### operators.string.endswith `String` *(default: "Ends with")*

The text of the "ends with" filter operator.


<div class="meta-api-description">
How do I customize the "ends with" operator label in Kendo UI filter menus? Customize or localize the textual label for the "ends with" string operator in filter menus, enabling control over the display name of the suffix matching condition in filtering interfaces, search criteria, or query builders, with options to set, change, or adapt the description for suffix-based string comparisons and filtering operations.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", email: "john@company.com" },
            { name: "Jane", email: "jane@example.org" }
        ],
        field: "email",
        operators: {
            string: {
                endswith: "Finishes with"
            }
        }
    });
    </script>

### operators.string.isnullorempty `String` *(default: "Has no value")*

The text of the "isnullorempty" filter operator.


<div class="meta-api-description">
How do I customize the label for filter operators that check if string values are null or empty in a Kendo UI Filter Menu? Customize the label or display text for filter operators that check if string values are null, empty, or missing, enabling control over how such conditions appear in filter menus, including localization, internationalization, and text customization for empty string or null value filters. Adjust, configure, or set the wording for operators that identify fields lacking any content or having no value to enhance clarity in filtering interfaces or search conditions.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", notes: "Manager" },
            { name: "Jane", notes: "" },
            { name: "Bob", notes: null }
        ],
        field: "notes",
        operators: {
            string: {
                isnullorempty: "Is blank or null"
            }
        }
    });
    </script>

### operators.string.isnotnullorempty `String` *(default: "Has value")*

The text of the "isnotnullorempty" filter operator.


<div class="meta-api-description">
How to customize the label for "is not null or empty" filter operator in Kendo UI? Customize or localize the label text for filter operators that check if string values are neither null nor empty, enabling users to set, change, or configure the display text of conditions that filter out null or empty strings in menus, controls, or query builders with operators that verify non-nullity and non-emptiness of text inputs, ensuring clarity and language adaptation in filtering interfaces.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", notes: "Manager" },
            { name: "Jane", notes: "" },
            { name: "Bob", notes: null }
        ],
        field: "notes",
        operators: {
            string: {
                isnotnullorempty: "Has content"
            }
        }
    });
    </script>

### operators.number `Object`

The texts of the filter operators displayed for columns bound to number fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.


<div class="meta-api-description">
How can I customize the numeric filter operators in Kendo UI's FilterMenu dropdown menu? Customize and configure numeric filter operators for dropdown menus, enabling control over which comparison options appear such as equals, not equals, greater than, less than, and other number-based conditions; remove or rename numeric operators to tailor filtering behaviors, adjust operator labels for numeric fields in filter menus, and manage how numeric conditions are presented and selectable within filter interfaces for precise numeric filtering and searching scenarios.
</div>

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


<div class="meta-api-description">
How to customize the "equal to" label in a numeric filter menu with Kendo UI? Customize, configure, or override the display text, label, or name for the equality operator used in numeric filters or number comparisons within filtering menus, enabling localization, translation, or personalization of the "equal to" condition in user interfaces that filter data by numeric values, numbers, or quantities, useful for adapting filter operator labels to different languages or specific terminology when users search, compare, or set filters checking if numbers are exactly equal.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        operators: {
            number: {
                eq: "Equals"
            }
        }
    });
    </script>

### operators.number.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.


<div class="meta-api-description">
How do I customize the "not equal to" operator in Kendo UI's numeric filter menu? Adjust, set, or configure the text label or displayed string for the numeric "not equal to" comparison operator used in filtering menus, enabling customization of the inequality operator's wording in numeric filters, controlling how the "not equal" condition appears in filter dropdowns or UI elements, modifying or localizing the operator text for "neq" in number-based filter criteria, and specifying alternative phrases or symbols for the negation of equality in numeric filter interfaces.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        operators: {
            number: {
                neq: "Not equal"
            }
        }
    });
    </script>

### operators.number.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.


<div class="meta-api-description">
How to customize the label for "is null" number filters in Kendo UI? Control and customize the label or display text for numeric filters that check for null or missing values, enabling developers to set or localize the text indicating when a number field is empty, undefined, or has no value. Configure, change, or override the default operator label for "is null" conditions in filtering menus, search interfaces, or data grids to reflect specific language preferences, user interface wording, or custom terminology for detecting absent numeric entries or blank number filters. Adjust and manage how "null number" filters appear in dropdowns, selection lists, or query builders, ensuring clarity when filtering datasets by non-existent, empty, or null numeric attributes.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: null }
        ],
        field: "age",
        operators: {
            number: {
                isnull: "Has no value"
            }
        }
    });
    </script>

### operators.number.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.


<div class="meta-api-description">
How do I customize the "is not null" filter operator in Kendo UI for jQuery to show a specific wording? Configure or customize the text label, display, and wording for number filter options that check for non-null or existing numeric values, enabling setting or controlling conditions like "is not null," "has value," or "is defined" in filtering menus and query builders, including adjusting how the filter operator for numbers excluding nulls or missing entries appears in UI components and data filtering interfaces.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: null }
        ],
        field: "age",
        operators: {
            number: {
                isnotnull: "Has a value"
            }
        }
    });
    </script>

### operators.number.gte `String` *(default: "Is greater than or equal to")*

The text of the "greater than or equal" filter operator.


<div class="meta-api-description">
How do I customize the label for "greater than or equal to" numeric filters in Kendo UI? Adjust, configure, or localize the text label for numeric filters that select values greater than or equal to a specified number, enabling customized naming, translation, or phrasing for filtering options, controls, or conditions that apply "greater than or equal to" comparisons in numeric data fields within menus or user interfaces.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        operators: {
            number: {
                gte: "At least"
            }
        }
    });
    </script>

### operators.number.gt `String` *(default: "Is greater than")*

The text of the "greater than" filter operator.


<div class="meta-api-description">
How do I customize the display text for the "greater than" comparison operator in a Kendo UI filtering menu? Customize, configure, or set the display text, label, or caption for the numeric "greater than" comparison operator in filtering menus, ensuring localization or translation for user interfaces that use greater-than conditions in numeric filters, enabling accurate representation of the "gt" operator in various languages or regional formats for number filtering, comparison, or query building in data grids, tables, or search filters where users need to filter results by values exceeding a specified threshold.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        operators: {
            number: {
                gt: "Greater than"
            }
        }
    });
    </script>

### operators.number.lte `String` *(default: "Is less than or equal to")*

The text of the "less than or equal" filter operator.


<div class="meta-api-description">
How do I customize the "less than or equal to" operator label in a Kendo UI filter menu? Customize or configure the label, text, or display name for the less than or equal to numeric comparison operator used in filtering options, enabling localization or language-specific versions in filtering menus, numeric range queries, or conditional operators that control how numbers are compared and filtered within user interfaces or data grids.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        operators: {
            number: {
                lte: "At most"
            }
        }
    });
    </script>

### operators.number.lt `String` *(default: "Is less than")*

The text of the "less than" filter operator.


<div class="meta-api-description">
How to customize the "less than" operator label in Kendo UI filter menus? Configure or customize the label text for the numeric "less than" comparison operator used in filtering interfaces, enabling precise control over how the "lt" operator appears in filter menus or dropdowns, suitable for adjusting display names, localization, user-friendly terms, or altering default text in numeric filtering components.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ],
        field: "age",
        operators: {
            number: {
                lt: "Less than"
            }
        }
    });
    </script>

### operators.date `Object`

The texts of the filter operators displayed for columns bound to date fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.


<div class="meta-api-description">
How to customize date operators in Kendo UI filter menu? Control and customize comparison options for date filters by configuring which date operators appear and how their labels are displayed in filter dropdowns, enabling setting, adjusting, or removing operators like equals, before, after, or between in filter menus for date fields, supporting tailored date filtering criteria, date operator text customization, inclusion or exclusion of specific date comparison choices, and refined date filtering controls in the user interface.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", hired: new Date(2020, 5, 15) },
            { name: "Jane", hired: new Date(2021, 8, 20) }
        ],
        field: "hired",
        operators: {
            date: {
                eq: "On",
                gte: "On or after",
                lte: "On or before"
            }
        }
    });
    </script>

### operators.date.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.


<div class="meta-api-description">
How to customize the label for the "equal" date filter operator in Kendo UI for jQuery? Customize or configure the label text for the date equality filter operator in filter menus, enabling localization, translation, or modification of the "equal" comparison keyword used when filtering date values; control how the date filter’s equality condition is displayed or named, adjust the comparison operator’s label for dates to match different languages or terminology, set or change the text for date equality filtering options, and enable clear identification of date equals filters in user interfaces by tailoring the operator’s description.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", hired: new Date(2020, 5, 15) },
            { name: "Jane", hired: new Date(2021, 8, 20) }
        ],
        field: "hired",
        operators: {
            date: {
                eq: "On date"
            }
        }
    });
    </script>

### operators.date.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.


<div class="meta-api-description">
How to customize the "not equal to" date condition label in Kendo UI filter menus? Customize or modify the label, text, or wording displayed for the "not equal to" date condition in filter menus, enabling control over how date inequality comparisons appear in user interfaces, search filters, or query builders, including configuring, renaming, or localizing the operator text for "date is not equal to," "excluding specific dates," "date difference conditions," and any variations of expressing date inequality in filtering and conditional expressions.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", hired: new Date(2020, 5, 15) },
            { name: "Jane", hired: new Date(2021, 8, 20) }
        ],
        field: "hired",
        operators: {
            date: {
                neq: "Not on date"
            }
        }
    });
    </script>

### operators.date.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.


<div class="meta-api-description">
How do I customize the label for checking if a date field is null in Kendo UI's FilterMenu? Configure the label or text displayed when filtering date fields for empty, null, or missing values, enabling customization of operator labels for queries checking if a date is unset, undefined, or has no value, including support for localization and adjusting filter menu prompts to identify records with null or blank date entries.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", hired: new Date(2020, 5, 15) },
            { name: "Jane", hired: null }
        ],
        field: "hired",
        operators: {
            date: {
                isnull: "No date set"
            }
        }
    });
    </script>

### operators.date.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.


<div class="meta-api-description">
How to customize "is not null" date filter label in Kendo UI for jQuery? Customize or configure the label, text, or caption shown for date filters that check if a value is present or not empty, such as "is not null," "has date," "date exists," or "value is set," enabling control over how non-null date conditions appear in filtering menus, dropdowns, or user interfaces when users want to filter out empty or null date fields.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", hired: new Date(2020, 5, 15) },
            { name: "Jane", hired: null }
        ],
        field: "hired",
        operators: {
            date: {
                isnotnull: "Has date"
            }
        }
    });
    </script>

### operators.date.gte `String` *(default: "Is after or equal to")*

The text of the "greater than or equal" filter operator.


<div class="meta-api-description">
How do I customize the "greater than or equal to" date filter operator in Kendo UI for jQuery? Customize or configure the text label for date filters that check if a date is greater than or equal to a specific value, enable or set the display wording for greater-than-or-equal-to date comparisons in filter menus, control the phrasing users see when applying date range filters with "on or after" or "from this date forward" logic, adjust the operator text that defines minimum date thresholds, and tailor how date conditions like "date is greater than or equal to" appear in filtering interfaces.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", hired: new Date(2020, 5, 15) },
            { name: "Jane", hired: new Date(2021, 8, 20) }
        ],
        field: "hired",
        operators: {
            date: {
                gte: "On or after"
            }
        }
    });
    </script>

### operators.date.gt `String` *(default: "Is after")*

The text of the "greater than" filter operator.


<div class="meta-api-description">
How to customize the "greater than" label in date filters for Kendo UI filtering menus? Configure and customize the label for the "greater than" comparison in date filters, enabling localization or modification of the operator text used in filtering menus. Control how date-based "after," "is later than," or "greater than" filter options appear in user interfaces, allowing adjustments to wording for clarity, translation, or matching specific application terminology. This feature supports tailoring the date comparison operator language in filtering or search components to suit different locales, user preferences, or custom filter controls.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", hired: new Date(2020, 5, 15) },
            { name: "Jane", hired: new Date(2021, 8, 20) }
        ],
        field: "hired",
        operators: {
            date: {
                gt: "After"
            }
        }
    });
    </script>

### operators.date.lte `String` *(default: "Is before or equal to")*

The text of the "less than or equal" filter operator.


<div class="meta-api-description">
How can I customize the "less than or equal to" operator label in a Kendo UI filter menu for date fields? Customize or configure the label text for the "less than or equal to" date comparison operator within a filter menu, enabling localized or language-specific display of the operator for filtering dates by upper bounds. This setting controls how the date range filter behaves when users want to include all dates falling on or before a specified date, supporting internationalization, localization, date filtering, conditional operators, and UI customization of filter options including "on or before," "up to," or "no later than" comparisons in date fields.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", hired: new Date(2020, 5, 15) },
            { name: "Jane", hired: new Date(2021, 8, 20) }
        ],
        field: "hired",
        operators: {
            date: {
                lte: "On or before"
            }
        }
    });
    </script>

### operators.date.lt `String` *(default: "Is before")*

The text of the "less than" filter operator.


<div class="meta-api-description">
How do I customize the label for "less than" date comparison in Kendo UI FilterMenu? Control and customize the label or text shown for date comparisons that check if a value is earlier than a specified date, configure how the "less than" operator for date filters appears in menus or dropdowns, set or modify the display wording for filtering dates before a certain point, enable precise text adjustments for date-based filter conditions using "before," "earlier than," or "less than" criteria in filtering interfaces.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", hired: new Date(2020, 5, 15) },
            { name: "Jane", hired: new Date(2021, 8, 20) }
        ],
        field: "hired",
        operators: {
            date: {
                lt: "Before"
            }
        }
    });
    </script>

### operators.enums `Object`

The texts of the filter operators displayed for columns which have their [values](/api/javascript/ui/filtermenu#configuration-columns.values) option set.

> Omitting an operator will exclude it from the DropDownList with the available operators.


<div class="meta-api-description">
How to customize the filter operator labels in Kendo UI for jQuery? Set or customize the labels and display texts for filter operators in dropdown menus, tailoring how operator choices appear in filtering interfaces for columns with predefined value sets, control which filter options show or hide by mapping operator identifiers to custom strings, adjust or rename filtering operators in dropdown lists, configure or enable specific filter operation labels, filter operator names customization, exclude unwanted filter operators by not including them in the mapping, define operator text for filtering UIs, customize operator labels in filter dropdowns, and manage filter operator visibility and naming conventions in data filtering controls.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", status: 1 },
            { name: "Jane", status: 2 }
        ],
        field: "status",
        values: [
            { text: "Active", value: 1 },
            { text: "Inactive", value: 2 }
        ],
        operators: {
            enums: {
                eq: "Is",
                neq: "Is not"
            }
        }
    });
    </script>

### operators.enums.eq `String` *(default: "Is equal to")*

The text of the "equal" filter operator.


<div class="meta-api-description">
How do I customize the "equals" operator label in a Kendo UI grid filter menu? Adjust, set, or customize the display text, label, or wording for the equality condition in grid or table filter menus, including localization and language variations for the "equals," "is equal to," or "exact match" operator. Enable configuring the equality operator’s name, translation, or user-facing string to control how equality filters appear in filtering interfaces, filtering drop-downs, or query builders, ensuring proper internationalization and precise filter semantics in data grids or UI filter components.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", category: 1 },
            { name: "Jane", category: 2 }
        ],
        field: "category",
        values: [
            { text: "Manager", value: 1 },
            { text: "Developer", value: 2 }
        ],
        operators: {
            enums: {
                eq: "Is exactly"
            }
        }
    });
    </script>

### operators.enums.neq `String` *(default: "Is not equal to")*

The text of the "not equal" filter operator.


<div class="meta-api-description">
How do I customize the "not equal to" filter operator label in Kendo UI's filtering menus? Customize or configure the label text, name, or caption shown for the "not equal to," "does not equal," "is different from," or "unequal" filter operator in filtering menus, search filters, data grids, or query builders by setting or overriding its display value to control how inequality conditions are presented, enabling precise labeling of operators that exclude matching values during filtering operations.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", category: 1 },
            { name: "Jane", category: 2 }
        ],
        field: "category",
        values: [
            { text: "Manager", value: 1 },
            { text: "Developer", value: 2 }
        ],
        operators: {
            enums: {
                neq: "Is not"
            }
        }
    });
    </script>

### operators.enums.isnull `String` *(default: "Is null")*

The text of the "isnull" filter operator.


<div class="meta-api-description">
How to customize the "is null" label in a Kendo UI filter menu? Customize or configure the label, text, display name, or title for the filter condition that checks for null or missing values in filtering options, enabling control over the phrasing or terminology used to represent "is null" or "no value" criteria within filter menus, search filters, or query builders.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", category: 1 },
            { name: "Jane", category: null }
        ],
        field: "category",
        values: [
            { text: "Manager", value: 1 },
            { text: "Developer", value: 2 }
        ],
        operators: {
            enums: {
                isnull: "No category"
            }
        }
    });
    </script>

### operators.enums.isnotnull `String` *(default: "Is not null")*

The text of the "isnotnull" filter operator.


<div class="meta-api-description">
How to customize "is not null" filter operator label in Kendo UI for jQuery? Customize or configure the text label for filters that check if a value is present or not empty, such as "is not null," "exists," or "has value," enabling you to control how exclusion of null or empty data conditions are displayed in filter menus, search interfaces, or query builders, with options to set or change operator descriptions for non-null checks, null exclusion filters, and presence validation in data filtering scenarios.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", category: 1 },
            { name: "Jane", category: null }
        ],
        field: "category",
        values: [
            { text: "Manager", value: 1 },
            { text: "Developer", value: 2 }
        ],
        operators: {
            enums: {
                isnotnull: "Has category"
            }
        }
    });
    </script>

## Fields

### dataSource `kendo.data.DataSource`
The [data source](/api/javascript/data/datasource) of the widget.
Configured via the [dataSource](/api/javascript/ui/filtermenu#configuration-dataSource) option.


<div class="meta-api-description">
How can I access the data source of a Kendo UI filter menu? Access and inspect the underlying data set or collection that populates filter options within a filter menu component, enabling retrieval or configuration of the source data powering filter values, including adjusting, querying, or analyzing the dataset feeding the filter menu; useful for inspecting data arrays, remote data endpoints, in-memory collections, or data queries that determine which filter options appear, controlling or customizing filter data sources dynamically or statically, and managing data bindings tied to filter controls and their available selections.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    var dataSource = new kendo.data.DataSource({
        data: [
            { name: "John", age: 25 },
            { name: "Jane", age: 30 }
        ]
    });
    
    $("#filtermenu").kendoFilterMenu({
        dataSource: dataSource,
        field: "name"
    });
    </script>

### field `String`

The field from the model that filtering will be applied on


<div class="meta-api-description">
How do I specify the data model attribute in Kendo UI for jQuery to apply filter conditions? Specify or set the data model attribute or property that a grid, table, or filtering interface should use to apply, attach, or bind filter conditions, search criteria, or query inputs, such as filtering by product name, date, status, or any column field; configure which underlying data field the filtering UI controls correspond to, enabling search, filter, or criteria matching on specific model properties or dataset attributes for dynamic queries and user-driven data filtering within grids, lists, or data tables.
</div>

#### Example

    <div id="filtermenu"></div>
    <script>
    $("#filtermenu").kendoFilterMenu({
        dataSource: [
            { name: "John", age: 25, department: "IT" },
            { name: "Jane", age: 30, department: "HR" }
        ],
        field: "department"
    });
    </script>

## Methods

### clear

Resets the filter configurations and the dataSource to their initial state.


<div class="meta-api-description">
How do I reset all applied filters in Kendo UI's FilterMenu? Reset or clear all applied filters and selections to return the filtering interface to its default state, removing any active filter conditions and restoring the original data set or data source configuration, whether filters were applied locally or remotely; enables users to wipe out current filter expressions, discard user selections in the UI, and reload or reapply filtering rules from scratch, effectively resetting the filter menu and ensuring that all filtering criteria and results reflect the initial, unfiltered data state.
</div>

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
	/* The result can be observed in the DevTools(F12) console of the browser. */
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


