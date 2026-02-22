---
title: TreeList
page_title: Configuration, methods and events of Kendo UI TreeList
description: Code examples for TreeList UI widget configuration. Learn how to use methods and which events to set once the treelist UI widget is initialized and expanded.
res_type: api
component: treelist
---

# kendo.ui.TreeList

Represents the Kendo UI TreeList widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### altRowTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the alternating table rows. By default the treelist renders a table row (`<tr>`) for every data source item.

> The outermost HTML element in the template must be a table row (`<tr>`). That table row must have the `uid` data attribute set to `#= uid #`. The treelist uses the `uid` data attribute to determine the data to which a table row is bound to.
> Set the `class` of the table row to `k-alt` to get the default "alternating" look and feel.


<div class="meta-api-description">
How do I customize alternating row templates in Kendo UI for jQuery TreeList? Control and customize how alternating rows appear in hierarchical or tree-structured data grids by setting custom row templates that override default table row rendering for every other data item; define unique HTML row structures using table row elements with appropriate data binding attributes like unique identifiers, apply alternate styling classes such as "k-alt" for zebra striping effects, and configure row appearance for better visual distinction in nested tables or TreeList components with alternating row designs, ensuring consistent mapping between data items and their respective UI rows through the required data attributes and enabling tailored display of different types of data within hierarchical lists.
</div>

#### Example - specify alternating row template as a function

    <div id="treelist"></div>
    <script id="template" type="text/x-kendo-template">
        <tr class="k-table-row" data-uid="#= data.model.uid #" role="row" >
            <td class="k-table-td" colspan="2">
                #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                	<span class="k-icon k-i-none"></span>
            		#}#
             		# if (data.hasChildren) { #
                	# if(data.model.expanded) { #
                      #= kendo.ui.icon("caret-alt-down") #
                	# } else { #
                      #= kendo.ui.icon("caret-alt-right") #
                	# } #
            		# } #
                <strong>#: data.model.lastName # </strong>
                <strong>#: data.model.position #</strong>
            </td>
        </tr>
    </script>
    <script id="altTemplate" type="text/x-kendo-template">
         <tr class="k-table-row k-alt" data-uid="#= data.model.uid #" role="row" >
            <td class="k-table-td" colspan="2">
                #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                	<span class="k-icon k-i-none"></span>
            		#}#
             		# if (data.hasChildren) { #
                	# if(data.model.expanded) { #
                      #= kendo.ui.icon("caret-alt-down") #
                	# } else { #
                      #= kendo.ui.icon("caret-alt-right") #
                	# } #
            		# } #
                <strong>#: data.model.lastName # </strong>
                <strong>#: data.model.position #</strong>
            </td>
        </tr>
    </script>
    <script>
      $("#treelist").kendoTreeList({
        rowTemplate: kendo.template($("#template").html()),
        altRowTemplate: kendo.template($("#altTemplate").html()),
        columns: [
          { field: "lastName" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" },
            { id: 3, parentId: 2, lastName: "Jason", position: "Director, Engineering" }

          ]
        }
      });
    </script>

### autoBind `Boolean` *(default: true)*

If set to `false`, the TreeList will not bind to the specified DataSource during initialization. In this case, data binding will occur when the [`change`](/api/javascript/data/datasource/events/change) event of the DataSource fires. By default, the TreeList will bind to the DataSource that is specified in the configuration.

> Setting `autoBind` to `false` is useful when multiple widgets are bound to the same DataSource. Disabling automatic binding ensures that the shared DataSource makes a single request to the remote service.


<div class="meta-api-description">
How to prevent automatic data binding in Kendo UI TreeList on initial load? Configure initial data fetch behavior, prevent automatic or premature loading, delay binding of hierarchical data grids until explicit triggers like data source changes occur, control when tree or list components connect to their data providers, disable immediate server requests on initialization, manage synchronization between multiple UI elements sharing one remote dataset, enable deferred or conditional data binding strategies, optimize network usage by postponing data retrieval, set or toggle automatic data connection at startup, and control lazy loading or manual refresh actions in tree-structured data displays.
</div>

#### Example - disabling automatic binding

    <div id="treelist"></div>
    <button id="btn">Bind TreeList</button>
    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
          }
        },
        schema: {
          model: {
            id: "EmployeeID",
            parentId: "ReportsTo",
            fields: {
              ReportsTo: { field: "ReportsTo",  nullable: true },
              EmployeeID: { field: "EmployeeId", type: "number" },
              Extension: { field: "Extension", type: "number" }
            },
            expanded: true
          }
        }
      });
      var treelist = $("#treelist").kendoTreeList({
        dataSource: dataSource,
        columns: [
          { field: "FirstName" }, { field: "LastName" }, { field: "Position" }
        ],
        autoBind: false
      }).data("kendoTreeList");

      $("#btn").click(function(){
        treelist.dataSource.read();
      });
    </script>

### columns `Array`

The configuration of the TreeList columns whcih represents an array of JavaScript objects or strings. JavaScript objects are interpreted as column configurations. Strings are interpreted as the
[`field`](/api/javascript/ui/treelist#configuration-columns.field) to which the column is bound. The TreeList will create a column for each item of the array.


<div class="meta-api-description">
How do I configure the columns in my Kendo UI TreeList? Configure, customize, and control the display of columns within a hierarchical data grid by specifying column order, binding fields, and detailed settings using an array of objects or field names; manage which data fields appear as columns, how they are arranged, and their initialization parameters to tailor the tree-structured list’s columns for sorting, filtering, or visibility, enabling flexible column definitions through fully configured objects or simple field identifiers to match data schema and UI needs in dynamic or static configurations.
</div>

#### Example - specifyinging the columns of the TreeList as an array of strings

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          "lastName",
          "position"
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>

#### Example - specifyinging the columns of the TreeList as an array of objects

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>

### columns.attributes `Object`

The HTML attributes of the table cell (`<td>`) that is rendered for the column.

> Quote all HTML attributes which are JavaScript keywords (for example, `class`).


<div class="meta-api-description">
How to add custom CSS classes to individual table cells in a Kendo UI TreeList column? Set and customize HTML attributes on table cells within grid columns to control cell styling, add CSS classes, data attributes, ARIA roles, inline styles, or other custom properties. Enable cell-level customization by configuring cell attributes dynamically, including handling reserved JavaScript keywords like "class" by quoting attribute names. Adjust and apply additional markup options for individual grid column cells to enhance accessibility, styling, or data-binding by specifying attributes on the column’s rendered table data cell elements in a tree-structured list or grid view.
</div>

#### Example - specifyinging the column HTML attributes

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          {
            field: "position",
            attributes: {
              "class": "highlight",
              style: "text-align: right"
            }
          }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>
    <style>
      .highlight {
        color: red;
      }
    </style>
    //The table cells look like `<td role="gridcell" class="highlight" style="text-align: right;">...</td>`.

### columns.columns `Array`

The columns which will be rendered as child columns under this group column header.

> Group columns cannot be data-bound and support a limited number of bound column settings such as title or locked.


<div class="meta-api-description">
How to configure child columns in a TreeList grouped header? Configure nested or child columns within grouped headers in hierarchical data grids by defining a nested columns array inside a column group setup. Enable multi-level column grouping with child columns arranged under parent group headers, controlling the structure and appearance of grouped sections in tree or hierarchical grid views. Set up non-data-bound sub-columns that support basic settings like titles and locking behavior, allowing structured, grouped columns in tree-based lists or grids during initialization without dynamic data binding. Achieve organized column grouping, control group layout, and manage locked or titled child columns beneath higher-level column groups for better visual hierarchy and grouping in complex grid or tree list UIs.
</div>

#### Example - setting the column group column for displaying multicolumn headers

    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
        columns: [
        {
            title: "Personal Info",
            columns: [
                { field: "lastName" },
                { field: "age" }
            ]
        },
        {
            title: "Work info",
            columns: [
                { field: "position" }
            ]
        }
      ],
      dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", age: 25, position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", age: 33, position: "	VP, Engineering" }
        ]
    });
    </script>

### columns.command `Array`

The configuration of the column commands. If set, the column will display a button for every command. Commands can be custom or built-in

The built-in commands are:

* `edit` - Switches the current table row to edit mode. Supports the `inline` and `popup` edit modes.
* `createChild`- Adds a new child item to the current table row and switches to edit mode.
* `destroy` - Removes the data item to which the current table row is bound.

Custom commands are supported by specifying the [`click`](/api/javascript/ui/treelist#configuration-columns.command.click) option.

> * Each custom command requires you to explicitly specify its [`name`](/api/javascript/ui/treelist/configuration/columns.command#columnscommandname).
> * A command column cannot be [`expandable`](/api/javascript/ui/treelist#configuration-columns.expandable).
> * The built-in commands work only if editing is enabled through the [`editable`](/api/javascript/ui/treelist#configuration-editable) option and the DataSource of the TreeList is configured for [CRUD operations](https://docs.telerik.com/kendo-ui/framework/datasource/crud).


<div class="meta-api-description">
How to customize command buttons in a TreeList column? Control and customize action buttons within TreeList columns to perform tasks like editing rows, adding child elements, deleting items, or triggering personalized operations through click event handlers. Easily enable built-in commands such as switching rows to inline or popup edit modes, creating child records beneath parent rows, or removing data entries, while supporting custom command definitions by assigning unique command names and custom click logic. Configure action columns to manage row-level editing and hierarchical data manipulation, integrate CRUD operations seamlessly, set up interactive buttons for editing or data changes, and tailor command behavior in editable trees to fit various data interaction and UI scenarios. Handle command visibility, behavior customization, and dynamic row modifications through flexible command column settings that respond to editing states and data source configurations.
</div>

#### Example - setting the command as an array of strings

      <div id="treelist"></div>

      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

          $("#treelist").kendoTreeList({
            editable: true,
            height: 540,
            columns: [
              { field: "FirstName", expandable: true, title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { title: "Edit", command: [ "createChild", "edit" ], width: 180 }
            ],
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  type: "POST",
                  contentType: "application/json"
                },
                create: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                  type: "POST",
                  contentType: "application/json"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                  }
                }
              },
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            }
          });
      </script>

#### Example - setting the command as an array of objects

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              click: function(e) {
                // command button click handler
              },
              icon: "info-circle"
            },
            { name: "destroy" } // built-in "destroy" command
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>

### columns.command.className `String`

The CSS class that is applied to the command button.


<div class="meta-api-description">
How do I customize the appearance of action buttons in a Kendo UI TreeList column using CSS classes? Apply custom CSS classes, styles, or icon fonts to action buttons within TreeList columns to customize appearance, control button layout, enable targeting with CSS selectors, configure button styling, set class names for command elements, and adjust visual design of interactive column buttons.
</div>

#### Example - setting the CSS class of the command

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              className: "btn-details"
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
    </script>
    <style>
      .btn-details {
        color: green;
        font-weight: bold;
      }
    </style>

### columns.command.icon `String`

Specifies the icon's name of the command button.


<div class="meta-api-description">
How do I customize the icons for command buttons in a Kendo UI TreeList column? Customize, specify, or set the graphic or symbol shown on command buttons within hierarchical or tree-structured data grids, enabling control over button visuals by defining icon names, glyphs, or CSS-based images. This includes configuring command button appearances, changing icons dynamically or statically, binding icon sources to data or expressions, and modifying the visual indicators used for commands like edit, delete, or custom actions within tree list columns. Adjust button styling and icon representation to enhance user interface clarity and functionality in tree or nested list views.
</div>

#### Example - setting the CSS class of the command icon

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              icon: "info-circle",
              imageClass: "details-info"
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.command.imageClass `String`

The CSS class that is applied to the icon span of the command button.


<div class="meta-api-description">
How can I customize the icon appearance in command buttons within my Kendo UI TreeList? Customize the icon appearance in command buttons within hierarchical data grids by assigning CSS classes to control button icons, enabling the use of custom visuals, font-based icons, unique styling, or thematic adjustments for command column icons; allows setting or adjusting the styling, class names, or icon graphics on command buttons in tree-structured lists, supporting flexible UI theming, icon overrides, and visual customization of actionable items in tree or expandable data views.
</div>

#### Example - setting the CSS class of the command icon

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              icon: "info-circle",
              imageClass: "details-info"
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.command.click `Function`

The JavaScript function that is executed when the user clicks the command button. The function receives a [jQuery event](https://api.jquery.com/category/events/event-object/) as an argument. The function context that is available through the `this` keyword will be set to the TreeList instance.


<div class="meta-api-description">
How do I handle click events on command buttons in a Kendo UI TreeList? Manage user interactions with command buttons in hierarchical or tree-structured lists by defining custom JavaScript functions that execute upon button clicks, enabling developers to respond to click events with access to event data and control event flow. This includes configuring event handlers that receive event objects, allowing prevention of default actions or stopping propagation, while providing contextual access to the component instance for manipulating tree list methods, properties, or triggering dynamic behaviors based on user command interactions within the tree structure or nested data presentations.
</div>

#### Example - handling the click event of the custom command button

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              click: function(e) {
                // e.target is the DOM element which represents the button
                var tr = $(e.target).closest("tr"); // get the current table row (tr)
                // get the data bound to the current table row
                var data = this.dataItem(tr);
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log("Details for: " + data.lastName);
              }
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.command.name `String`

The name of the command. Commands can be built-in ("edit", "createChild" and "destroy") or custom. When set to a custom value, the `name` is rendered as a `data-command` attribute. For more information, refer to the [`columns.command`](/api/javascript/ui/treelist#configuration-columns.command) section.


<div class="meta-api-description">
How do I customize the command identifier for row operations in a Kendo UI TreeList? Control and configure the action identifier for row commands within hierarchical grid structures, enabling built-in operations like editing, adding child items, or deleting rows, as well as custom command strings for triggering specific behaviors; use this to set or customize command triggers, associate button actions with row commands, define command attributes for event handling, specify command types for data manipulation, and implement custom row-level interactions by assigning unique command names or identifiers.
</div>

#### Example - setting the command name

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "details",
              text: "Details",
              icon: "info-circle"
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.command.text `String`

The text that is displayed by the command button. If not set, the [`name`](/api/javascript/ui/treelist#configuration-columns.command.name) option is used as the button text. To have an icon button with no text, you can set the `text` property to an empty string.


<div class="meta-api-description">
How to customize command button labels in a Kendo UI TreeList? Configure or customize the label text displayed on command buttons within a hierarchical data grid or tree list, controlling the visible button captions or titles in action columns, including options to set custom button names, override default labels, show icon-only buttons with no text by using empty strings, and manage how command buttons are rendered in tree structure tables, enabling precise control over button appearances, captions, and user interface elements for commands embedded in column definitions.
</div>

#### Example - customizing the text of the command

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" },
          { command: [
            {
              name: "custom",
              text: "Details"
            },
            {
              name: "details",
              icon: "info-circle",
              text: ""
            }
          ]}
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.draggable `Boolean` *(default: false)*

If set to `true` a draghandle will be rendered and the user could reorder the rows by dragging the row via the drag handle.

> Note that the reordering operation is only a client-side operation and it does not reflect the order of any data that is bound to the server.


<div class="meta-api-description">
How can I enable drag-and-drop row reordering in my Kendo UI TreeList? Control whether rows can be reordered by dragging a handle within the column, enabling interactive drag-and-drop for rearranging rows visually; configure drag handles to allow client-side only row sorting, reorder items directly in the interface through mouse or touch drag gestures without affecting server data order, enable or disable drag functionality for columns to customize user interaction with tree or list data, and set up intuitive row dragging for reordering within hierarchical or tabular views.
</div>

#### Example

      <div id="treelist"></div>
      <script>
        var service = "https://demos.telerik.com/service/v2/core";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            move: {
              reorderable: true
            }
          },
          columns: [
            { draggable: true, width: "40px" },
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" }
          ]
        });
      </script>


### columns.editable `Function`

The JavaScript function that is executed when the cell or row is about to be opened for editing. The returned result will determine whether an editor for the column will be created.


<div class="meta-api-description">
How to enable editing in specific cells of Kendo UI TreeList based on custom logic? Control whether individual cells or entire rows in a grid or tree list can be edited based on dynamic conditions by configuring a function that runs before editing starts, allowing enabling or disabling inline editing per column using custom logic, expressions, or rules; this makes it possible to selectively set edit permissions, toggle cell edits, manage editable states, and customize when editors appear depending on row data, user roles, or application state, supporting granular interactive behavior for data entry and modification within tabular components.
</div>

#### Example - conditionally editing a cell

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
            columns: [
              {
                  field: "lastName",
                  title: "Last Name",
                  editable: function(dataItem) {
                      return dataItem.lastName !== "Jackson";
                  }
              },
              { field: "position", title: "Position", },
              { title: "Edit", command: ["edit"], width: 250 }
            ],
            editable: true,
            dataSource: [
              { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
              { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
            ]
        });
    </script>

### columns.editor `String|Function`

Provides a way to specify a custom editing UI for the column. To create the editing UI, use the `container` parameter.

> * The editing UI has to contain an element with a set `name` HTML attribute. The attribute value has to match the [`field`](/api/javascript/ui/treelist#configuration-columns.field) name.
> * The validation settings that are defined in the `model.fields` configuration will not be applied automatically. In order for the validation to work, you (the developer) are responsible for attaching the corresponding validation attributes to the editor input. If the custom editor is a widget, to avoid visual issues, you can [customize the tooltip position of the validation warning](/framework/validator/overview#customizing-the-tooltip-position).

When used as `String`, defines the editor widget type. For further info check the Form API: [`field`](/api/javascript/ui/form/configuration/items#itemseditor)


<div class="meta-api-description">
How do I customize the editing interface for specific columns in a Kendo UI TreeList? Configure and customize the editing interface for individual columns within hierarchical or tree-structured grid components by defining custom input controls, editors, or widgets that render inside specified containers, enabling precise control over in-cell editing experiences. This includes creating editors tied to specific data fields with matching name attributes, implementing validation manually by adding necessary validation attributes or integrating with validation frameworks, and adjusting validation error tooltips for consistent display when using custom widgets. Supports specifying editor types as strings to select predefined input widgets, allowing developers to set, enable, or control editing UIs tailored to complex data models, field validation, keyboard interaction, and user input scenarios in hierarchical data grids.
</div>

#### Parameters

##### container `jQuery`

The jQuery object that represents the container element.

##### options `Object`

##### options.field `String`

The name of the field to which the column is bound.

##### options.format `String`

The format string of the column that is specified through the [`format`](/api/javascript/ui/treelist#configuration-columns.format) option.

##### options.model `kendo.data.TreeListModel`

The model instance to which the current table row is bound.

#### Example - creating a custom column editor using the Kendo UI AutoComplete and NumericTextBox

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          {
            field: "lastName",
            editor: function(container, options) {
              // create an input element
              var input = $("<input/>");
              // set its name to the field to which the column is bound ('lastName' in this case)
              input.attr("name", options.field);
              // append it to the container
              input.appendTo(container);
              // initialize a Kendo UI AutoComplete
              input.kendoAutoComplete({
                dataTextField: "lastName",
                dataSource: [
                  { lastName: "Jackson" },
                  { lastName: "Strong" },
                  { lastName: "Simon"}
                ]
              });
            }
          },
          {
            field: "number",
            editor: function(container, options) {
              $('<input required name="' + options.field + '"/>')
                .appendTo(container)
              // initialize a Kendo UI NumericTextBox
              .kendoNumericTextBox({
                decimals: 2,
                step: 0.1
              });
            },
            format: "{0:0}"
          },
          { field: "position"},
          { command: [ "edit" ] }
        ],
        editable: true,
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", number: 10342.16, position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", number: 18031.11, position: "VP, Engineering" }
        ]
      });
    </script>

#### Example - creating a custom column editor with validation

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          {
            field: "lastName",
            editor: function(container, options) {
              // create input element and add the validation attribute
              var input = $('<input name="' + options.field + '" required="required" />');
              // set its name to the field to which the column is bound ('lastName' in this case)
              input.attr("name", options.field);
              // append it to the container
              input.appendTo(container);
              // initialize a Kendo UI AutoComplete
              input.kendoAutoComplete({
                dataTextField: "lastName",
                dataSource: [
                  { lastName: "Jackson" },
                  { lastName: "Strong" },
                  { lastName: "Simon"}
                ]
              });
            }
          },
          { field: "position"},
          { command: [ "edit" ] }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

#### Example - creating a custom column editor using String literal for AutoComplete

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          {
            field: "lastName",
            editor: "AutoComplete",
            editorOptions: {
              dataTextField: "lastName",
              dataSource: [
                { lastName: "Jackson" },
                { lastName: "Strong" },
                { lastName: "Simon"}
              ]
            }
          },
          {
            field: "number",
            format: "{0:0}"
          },
          { field: "position"},
          { command: [ "edit" ] }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", number: 10342.16, position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", number: 18031.11, position: "VP, Engineering" }
        ]
      });
    </script>

### columns.editorOptions `Object`

Defines the widget configuration when one is initialized as editor for the column (or the widget defined in `items.editor`). For further info check the Form API: [`field`](/api/javascript/ui/form/configuration/items#itemseditoroptions).


<div class="meta-api-description">
How to customize editor settings for individual columns in a Kendo UI TreeList? Set or customize the input controls and editing behavior for individual columns within hierarchical data grids, configuring how editors like text boxes, dropdowns, or custom components appear and function when modifying cell values. Enable control over editor settings such as validation rules, formatting options, placeholder text, and interactive features to tailor editing experiences at the column level in tree-structured tables. Adjust or fine-tune the properties of inline editors, including component-specific parameters or dynamic editor configurations, ensuring seamless data entry, form integration, and user-friendly editing workflows within nested or expandable grid views.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          {
            field: "lastName",
            editor: "AutoComplete",
            editorOptions: {
              dataTextField: "lastName",
              dataSource: [
                { lastName: "Jackson" },
                { lastName: "Strong" },
                { lastName: "Simon"}
              ]
            }
          },
          {
            field: "number",
            format: "{0:0}",
            editor: "NumericTextBox",
            editorOptions: {
              decimals: 2,
              step: 0.1
            }
          },
          { field: "position"},
          { command: [ "edit" ] }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", number: 10342.16, position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", number: 18031.11, position: "VP, Engineering" }
        ]
      });
    </script>

### columns.encoded `Boolean` *(default: true)*

If set to `true`, the column value will be HTML-encoded before it is displayed. If set to `false`, the column value will be displayed as is. By default, the column value is HTML-encoded.


<div class="meta-api-description">
How do I prevent HTML injection attacks in my Kendo UI TreeList columns? Configure the rendering of TreeList column content to either sanitize by encoding HTML entities or show raw HTML markup, controlling whether column values are escaped to prevent HTML injection attacks or displayed with full formatting and embedded tags. Enable or disable automatic HTML encoding to secure data display or allow inclusion of rich content, customize column output by toggling escaping of special characters versus rendering literal HTML, and manage how displayed values handle HTML strings for safe or enhanced visualization, supporting scenarios requiring either protection against malicious scripts or direct insertion of markup within table columns.
</div>

#### Example - preventing HTML encoding

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName"},
          { field: "position", encoded: false},
          { command: [ "edit" ] }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "<strong>CEO</strong>" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.expandable `Boolean` *(default: false)*

If set to `true`, the column will show the icons that are used for expanding and collapsing child rows. By default, the first column of the TreeList is expandable.

> An expandable column cannot hold [commands](/api/javascript/ui/treelist#configuration-columns.command).


<div class="meta-api-description">
How do I control expandable columns in Kendo UI for jQuery TreeList? Configure the visibility and behavior of expand and collapse icons within a TreeList column to enable toggling child rows, managing hierarchical or nested data navigation, controlling row expansion states, and visually organizing parent-child relationships in tabular views. This setting governs whether a column supports interactive expand/collapse controls for displaying or hiding nested sub-rows, facilitating hierarchical data browsing, customizing expandable columns, and disabling command functionality in columns used to expand tree nodes.
</div>

#### Example - making the second column expandable

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age", expandable: true }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columns.field `String`

The field to which the column is bound. The value of this field is displayed by the column during data binding.

> The field name has to be a valid Javascript identifier, has to contain only alphanumeric characters, `$`, or `_`, and must not start with a digit.


<div class="meta-api-description">
How do I map a Kendo UI TreeList column to a specific data model property using the `field` property? Set or configure the data source attribute that a hierarchical grid column displays, mapping the column to a specific data model property or key, often referred to as the field or data field, enabling binding to object properties, JSON keys, or record attributes; control which underlying data property populates each column cell, specifying valid property names or identifiers composed of letters, numbers, underscores, or dollar signs, and ensuring proper linkage between tree or nested data structures and their visual column representation for filtering, sorting, or display purposes.
</div>

#### Example - specifyinging the column field

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { command: [ "edit" ] }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable `Boolean|Object` *(default: true)*

If set to `true` and if filtering is enabled, a filter menu will be displayed for this column. If set to `false`, the filter menu will not be displayed. By default, a filter menu is displayed
for all columns when filtering is enabled through the [`filterable`](/api/javascript/ui/treelist#configuration-filterable) option. Can be set to a JavaScript object which represents the filter menu configuration.


<div class="meta-api-description">
How do I enable filtering on specific columns in a Kendo UI TreeList widget? Enable or disable filtering options on individual columns in a hierarchical data grid, configure or customize per-column filter menus, control visibility of filter dropdowns for each column, manage filter settings and UI elements for column-specific search or data refinement, specify custom filter configurations or presets for columns, toggle filtering capabilities on a per-column basis, set filters to appear or be hidden in tree-structured lists, adjust filter menu behavior and interface for granular data filtering, fine-tune column filter controls for tailored data queries, and customize how users can apply filters to columns within nested or grouped data presentations.
</div>

#### Example - disabling filtering

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position", filterable: false }
        ],
        editable: "popup",
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell `Object`

Specifies options for the filter header cell when filter mode is set to 'row'.

Can be set to a JavaScript object which represents the filter cell configuration.


<div class="meta-api-description">
How do I customize filter cells in a TreeList when applying row-based filtering? Control and customize individual column filter cells in a hierarchical grid or tree list when applying row-based filtering, enabling configuration of filter input types, custom templates, filter operators, and header cell behavior through a JavaScript object. Adjust or set filter UI components per column, tailor filter conditions, define dropdowns or text inputs for filtering, and manage filter presentation to refine filtering experience column-wise in nested data structures or tree grids when filtering is applied at the row level.
</div>

#### Example - cell filtering options

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
                cell: {
                    enabled: true,
                    delay: 1500
                }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.dataSource `Object|kendo.data.DataSource`

Specifies a custom dataSource for the AutoComplete when the type of the column is `string`. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array, or an existing [`kendo.data.DataSource`](/api/javascript/data/datasource) instance.

It is not recommended that you use the same `dataSource` instance for the TreeList and the AutoComplete because it causes negative side effects.

If the `dataSource` options is missing, a new cloned instance of the TreeList's dataSource will be used.

If the `dataSource` option is an existing [`kendo.data.DataSource`](/api/javascript/data/datasource) instance, the widget will use that instance and will _not_ initialize a new one.


<div class="meta-api-description">
How do I configure the data source for filtering in a TreeList column? Configure or customize the autocomplete data source used in a tree list column’s string filter by setting a specific data collection, array, or existing data source instance to control which items appear during filtering; set up independent or separate data sources for filter input suggestions to avoid conflicts with the main data collection, bind filtering UI elements to custom datasets or remote data sources, and enable precise control over autocomplete options in column filters by linking them to different objects, arrays, or preconfigured data source instances.
</div>

#### Example - custom cell filter autocomplete dataSource

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
                cell: {
                    dataSource: new kendo.data.DataSource({
                        data: [
                            { someField: "CEO" },
                            { someField: "VP, Engineering" },
                            { someField: "Software Engineer" }
                        ]
                    }),
                    dataTextField: "someField"
                }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.dataTextField `String`

Specifies the name of the field which will provide the text representation for the AutoComplete suggestion (when using String type column) when CustomDataSource is provided. By default the name of the field bound to the column will be used.


<div class="meta-api-description">
How do I customize the autocomplete suggestions in Kendo UI TreeList filter cells? Configure which field supplies the suggestion text in AutoComplete dropdowns within TreeList filter cells, especially when filtering string-type columns using a custom data source; control the displayed filter suggestions by setting the text field to customize autocomplete behavior, override the default bound column field for filter inputs, enable fine-tuned filtering interfaces by specifying the data property that populates filter cell autocomplete lists, and adjust which data attribute appears in the suggestions to improve user search accuracy within TreeList filtering scenarios.
</div>

#### Example - Using custom dataSource and providing dataTextField option

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
                cell: {
                    dataSource: new kendo.data.DataSource({
                        data: [
                            { someField: "CEO" },
                            { someField: "VP, Engineering" },
                            { someField: "Software Engineer" }
                        ]
                    }),
                    dataTextField: "someField"
                }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.delay `Number` *(default: 200)*

Specifies the delay of the AutoComplete widget which will provide the suggest functionality (when using String type column).


<div class="meta-api-description">
How do I configure the delay for filter dropdown suggestions in a Kendo UI TreeList column? Set or configure the debounce time delay in milliseconds for how long the system waits after typing input before showing autocomplete suggestions in filter cells of a tree list column, controlling when and how quickly the filter dropdown or suggestions appear during string-based filtering, managing the responsiveness and timing of autocomplete or suggestion popups to optimize user experience during column filtering, adjusting or tuning the wait interval before filter options or search suggestions are triggered following user input in filter fields.
</div>

#### Example - Specifying delay option for the AutoComplete widget used to make suggestions while filtering.

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
                cell: {
                    dataSource: new kendo.data.DataSource({
                        data: [
                            { someField: "CEO" },
                            { someField: "VP, Engineering" },
                            { someField: "Software Engineer" }
                        ]
                    }),
                    dataTextField: "someField"
                }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.inputWidth `Number`

Specifies the width of the input before it is initialized or turned into a widget. Provides convenient way to set the width according to the column width.


<div class="meta-api-description">
How to set input width for filterable cells in TreeList column headers? Control and configure the width or size of filter input fields within tree-list column headers, setting explicit pixel values or CSS widths to align filter boxes with their respective columns before initialization or widget transformation, enabling precise customization of filter cell input dimensions for consistent layout and responsive design in hierarchical data grids, tables, or tree structures.
</div>

#### Example - Specifying inputWidth option for the filter cell of a column


    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                  inputWidth: 333
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.suggestionOperator `String` *(default: "startswith")*

Specifies the AutoComplete `filter` option. The possible values are the same as the ones for the AutoComplete `filter` option - `"startswith"`, `"endswith"`, `"contains"`. The `"contains"` operator performs a case-insensitive search. To perform a case-sensitive filtering, set a custom filtering function through the [`dataSource.filter.operator`](/api/javascript/data/datasource/configuration/filter#filteroperator) option.

> This operator is completely independent from the operator used for the filtering on this column. For more inforamtion, check [`operator`](columns.filterable.cell.operator).


<div class="meta-api-description">
How do I configure the filtering behavior for autocomplete suggestions in a TreeList column filter cell? Configure the filtering behavior for autocomplete suggestions within tree list column filter cells by specifying how input matches options, including options to start with, end with, or contain specific text. Enable case-insensitive searches by default with "contains" or customize filtering to be case-sensitive or use alternative matching logic through custom filter functions. Adjust suggestion filtering independently of overall column filtering operators to control autocomplete results, support flexible search patterns, partial matches, substring searches, prefix matching, suffix matching, and tailor user input matching and filtering experience inside filter dropdowns or cells.
</div>

#### Example - Specifying suggestionOperator option for the filter cell of a column

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                  suggestionOperator: "contains"
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.minLength `Number` *(default: 1)*

Specifies the minLength option of the AutoComplete widget when column is of type string.


<div class="meta-api-description">
How do I set the minimum number of characters required to trigger filter suggestions in a Kendo UI TreeList column? Control the minimum number of characters a user must type in a filter input to activate or display autocomplete suggestions, set thresholds to delay or optimize filtering behavior on string columns, configure when type-ahead or dropdown suggestions appear during filtering to reduce unnecessary search queries or API calls, set a character count limit before filter options appear, manage filter input responsiveness and autocomplete activation for text-based columns, adjust the minimum input length that triggers suggestion lists in filtering interfaces, define how many characters are required before filter autocomplete starts providing matches, optimize filtering performance by limiting early or premature search triggers, enable granular control over filtering suggestion delays and lookups in list or tree table components.
</div>

#### Example - Specifying minLength of the AutoComplete widget when using filter cell.

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                   minLength: 3
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.enabled `Boolean` *(default: true)*

When set to false the TreeList will not render the cell filtering widget for that specific column.


<div class="meta-api-description">
How to enable filtering on individual cells in Kendo UI TreeList column? Control visibility and activation of individual column cell filters within hierarchical data grids by enabling or disabling per-cell filtering inputs, allowing configuration to show or hide filter widgets inside specific columns, manage interactive filtering controls on a per-column basis in tree-structured lists, customize or turn off inline cell filter editors to simplify or restrict user filtering options at the column cell level, configure fine-grained filtering behaviors to prevent rendering of cell filter inputs within columns, adjust interface elements to enable, disable, or hide cell-based filter widgets in nested data views, manage per-column filtering capabilities for cell-level interaction in tree list structures, set filters at the cell granularity to be active or inactive depending on UI requirements or filtering needs.
</div>

#### Example - Disable the cell filtering for a specific column.

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                  enabled: false
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.operator `String` *(default: "eq")*

Specifies the default operator that will be used for the cell filtering.

> If you want to change how the AutoComplete suggestions are filtered use [suggestionOperator](columns.filterable.cell.suggestionoperator).


<div class="meta-api-description">
How do I set the default operator for filtering in individual cells of a Kendo UI TreeList? Control and configure the default comparison operator for filtering values within individual cells of a hierarchical data grid or tree list, enabling selection of operators like equals, not equals, contains, starts with, or ends with to customize how cell-level filtering behaves by default during initial setup or runtime adjustments, supporting scenarios where you want precise control over filter matching criteria inside tree structures, grids, or tables, including configuring default search conditions, adjusting filter logic, and setting comparison types for cell filtering in nested or parent-child data presentations, while distinguishing this from operators used for autocomplete suggestion filtering.
</div>

#### Example - Specifying default operator for cell filtering.

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                  operator: "neq"
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.showOperators `Boolean` *(default: true)*

Specifies whether to show or hide the DropDownList with the operators.


<div class="meta-api-description">
How do I control visibility of filter operator dropdowns in Kendo UI TreeList column cells? Control the visibility and enablement of filter operator dropdowns within tree list column cells, configuring whether users can see or hide the operator selector such as "equals," "contains," or "starts with" when applying filters in hierarchical data grids. Configure, toggle, or disable the operator list or dropdown in cell-level filtering interfaces of tree-structured data tables, enabling precise control over filter criteria input, operator selector presentation, filter UI customization, and user interaction for column-based searches and filters within nested data displays. Adjust the filter mode to show, hide, or manage operator controls dynamically for enhanced column filter behavior in tree list components.
</div>

#### Example - Hide the operators dropdownlist for cell filtering.

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                  showOperators: false,
                  operator: "contains"
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
        ]
      });
    </script>

### columns.filterable.cell.template `Function`

JavaScript function which will customize how the input for the filter value is rendered.
The function receives an object argument with two fields:

* **`element`** - the default input inside the filter cell;
* **`dataSource`** - a Kendo UI DataSource instance, which has the same settings as the TreeList dataSource, but will only contain data items with unique values for the current column.
This instance is also used by the default AutoComplete widget, which is used inside the filter cell if no template is set. Keep in mind that the passed dataSource instance may still not be
populated at the time the template function is called, if the TreeList uses remote binding.


<div class="meta-api-description">
How do I customize the filter input cell in my Kendo UI TreeList column to use a dropdown with remote data? Control and customize the filter input cell in a hierarchical tree list column by injecting custom rendering logic, enabling the use of tailored editors like autocomplete, dropdowns, or other interactive components, and modifying or replacing the default filter input element. Implement a JavaScript function to dynamically generate or override filter inputs, leveraging a unique-value data source for populating suggestions or options, supporting scenarios such as local and remote data binding, value filtering, dynamic dropdown content, input customization, and integration with third-party components for advanced filtering UI within tree-structured tabular data views.
</div>

#### Example - Using template for the filter cell

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position",
            filterable: {
              cell: {
                  template: function (args) {
                      // create a DropDownList of unique values (colors)
                      args.element.kendoDropDownList({
                          dataSource: args.dataSource,
                          dataTextField: "position",
                          dataValueField: "position",
                          valuePrimitive: true
                      });

                  },
                  showOperators: false
              }
            }
          }
        ],
        editable: "popup",
        filterable: {
            mode: "row"
        },
        dataSource: [
              { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
              { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" },
              { id: 3, parentId: null, lastName: "Jason", position: "Contractor" }
        ]
      });
    </script>

### columns.filterable.operators `Object`

The property is identical to [`filterable.operators`](filterable.operators), but is used for a specific column.


<div class="meta-api-description">
How to customize filtering operators for individual columns in Kendo UI TreeList? Control and customize filtering options for individual columns by setting specific filter operators that override global defaults, enabling tailored filter types such as string, numeric, or date operators per column; configure, enable, or adjust comparison operations, filter conditions, and operator sets at the column level for precise filtering behavior, supporting use cases like column-specific search criteria, custom filter logic, or advanced filtering scenarios in hierarchical data grids or tree structures.
</div>

#### Example - Set custom filterable operators

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          {
            field: "name",
            filterable:{
              operators:{
                string:{
                  eq: "custom equal",
                  neq: "custom not equal"
                }
              }
            }
          },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { parentId: null, id: 1, name: "Jane Doe", age: 30 },
            { parentId: 1, id: 2, name: "John Doe", age: 33 }
          ]
        },
        filterable: {
          extra: false
        }
      });
    </script>

### columns.filterable.ui `String|Function`

The `role` [data attribute](/framework/data-attribute-initialization) of the widget that is used in the filter menu, or a JavaScript function which initializes that widget.


<div class="meta-api-description">
How to customize filter UI in Kendo TreeList columns? Control and customize the filter menu interface in TreeList columns by specifying or configuring the filtering UI element, including selecting specific filter widgets through their role identifiers or initializing them via JavaScript functions, enabling developers to set, change, or override how filter controls appear and behave in the column filter menus, integrate custom filter components, switch filter widget types, and tailor the interactive filtering experience using role-based widget references or custom initializer code.
</div>

#### Example - specifyinging the filter UI as a string

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          {
            field: "hireDate",
            filterable: {
              ui: "datetimepicker" // use Kendo UI DateTimePicker
            }
          }
        ],
        filterable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", hireDate: new Date(2012, 2, 3) },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering", hireDate: new Date(2012, 7, 13) }
          ],
          schema: {
            model: {
              fields: {
                hireDate: { type: "date" }
              }
            }
          }
        }
      });
    </script>

#### Example - initializing the filter UI

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          {
            field: "hireDate",
            filterable: {
              ui: function(element) {
                element.kendoDateTimePicker(); // initialize a Kendo UI DateTimePicker
              }
            }
          }
        ],
        filterable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", hireDate: new Date(2012, 2, 3) },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering", hireDate: new Date(2012, 7, 13) }
          ],
          schema: {
            model: {
              fields: {
                hireDate: { type: "date" }
              }
            }
          }
        }
      });
    </script>

### columns.footerTemplate `String|Function`

The [`template`](/api/javascript/kendo/methods/template) which renders the footer table cell for the column.

The following fields can be used in the template:

* `average` - The value of the `average` aggregate (if specified).
* `count` - The value of the `count` aggregate (if specified).
* `max` - The value of the `max` aggregate (if specified).
* `min` - The value of the `min` aggregate (if specified).
* `sum` - The value of the `sum` aggregate (if specified).


<div class="meta-api-description">
How to customize footer content in a TreeList column using the `footerTemplate` property? Configure and customize the footer content for columns in a hierarchical data grid by defining templates that render dynamic HTML or text, enabling display and binding of aggregate calculations like averages, counts, maximum, minimum, and sums. Enable flexible footer cell rendering with aggregate value placeholders to summarize data, control summary information presentation, and incorporate calculated metrics into footers using templating engines for tailored output in tree or grouped tabular structures. Adjust, set, or control footer templates to show totals, summaries, or custom formatted results based on aggregate functions for hierarchical list components.
</div>

#### Example - specifyinging a column footer template

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age",
              footerTemplate: "Min: #: min # Max: #: max #"
            }
          ],
          dataSource: {
            data: [
              { id: 1, parentId: null, name: "Jane Doe", age: 30 },
              { id: 2, parentId: 1, name: "John Doe", age: 33 },
              { id: 3, parentId: 1, name: "Joseph Doe", age: 42 }
            ],
            aggregate: [
                { field: "age", aggregate: "min" },
                { field: "age", aggregate: "max" }
            ]
          }
        });
    </script>

### columns.format `String`

The format that is applied to the value before it is displayed. Takes the `{0:format}` form where `format` is a [standard number format](/api/javascript/kendo#standard-number-formats), [custom number format](/api/javascript/kendo#custom-number-formats), [standard date format](/api/javascript/kendo#standard-date-formats) or a [custom date format](/api/javascript/kendo#custom-date-formats).

> The [`kendo.format`](/api/javascript/kendo/methods/format) function is used to format the value.


<div class="meta-api-description">
How to customize the display format of values in Kendo UI TreeList columns? Customize and control the display format of values within hierarchical table columns by setting patterns for numbers, currencies, dates, or personalized templates. Enable configuring numeric precision, currency symbols, date and time layouts, or complex formatting strings to shape how data appears in each cell. Support standard and custom formatting expressions to tailor output for financial data, timestamps, percentages, and other specialized value presentations, ensuring consistent and readable visual representation across tree-structured lists. Adjust cell content appearance dynamically using flexible, developer-friendly format specifiers similar to string interpolation or templating functions, suitable for diverse localization and data presentation needs.
</div>

#### Example - specifyinging the column format string

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "successRate", format: "{0:p}" },
          { field: "hireDate", format: "{0:dd/MMM/yyyy}" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", successRate: 0.7, hireDate: new Date(2012, 2, 3) },
            { id: 2, parentId: 1, lastName: "Weber", successRate: 0.8, hireDate: new Date(2012, 7, 13) }
          ]
        }
      });
    </script>

### columns.headerAttributes `Object`

The HTML attributes of the table header cell (`<th>`) that is rendered for the column.

> Quote the HTML attributes which are JavaScript keywords (for example, `class`).


<div class="meta-api-description">
How do I add custom CSS classes to column headers in a Kendo UI TreeList component? Configure table header cell attributes in a tree list component by setting custom HTML properties such as CSS classes, inline styles, data attributes, ARIA labels, accessibility tags, and other custom or standard HTML attributes on column headers. Control, customize, or enhance header cells with attributes like class names, data-* properties, ARIA roles, and style rules to tailor appearance, behavior, and accessibility of column headers. Enable adding semantic, styling, or metadata attributes to header cells, support quoting JavaScript reserved keywords as attribute names, and easily manage header customization for sorting indicators, themes, accessibility compliance, and dynamic styling in tabular tree structures.
</div>

#### Example - specifyinging column header HTML attributes

    <div id="treeList"></div>
    <script>
      var dataSource = new kendo.data.TreeListDataSource({
          data: [
            { id: 1, parentId: null, lastName: "Jackson" },
            { id: 2, parentId: 1, lastName: "Weber" }
          ]
      });
      $("#treeList").kendoTreeList({
        columns: [ {
          field: "lastName",
          headerAttributes: {
            "class": "name-header",
            style: "text-align: right"
          }
        } ],
        dataSource: dataSource
      });
    </script>
    // The table headers will look like `<th class="name-header" style="text-align: right">...</th>`.


### columns.headerTemplate `String|Function`

The [`template`](/api/javascript/kendo/methods/template) which renders the column header content. By default, the value of the [`title`](/api/javascript/ui/treelist/configuration/columns.title) column option is displayed in the column header cell.

> If sorting is enabled, the column header content will be wrapped in an `<a>` element. As a result, the template must contain only inline elements.


<div class="meta-api-description">
How do I customize the header template in Kendo UI TreeList to include HTML markup? Control and customize the column header content in a TreeList by defining a header template that supports HTML markup, custom bindings, inline elements, and dynamic rendering of icons, badges, styles, or classes, allowing flexible formatting beyond default text titles. Enable or set custom header designs for sorting-enabled columns where headers are wrapped with interactive links, ensuring templates use inline elements only. Adjust header appearance by injecting custom templates to display additional visuals or complex layouts in column headers, supporting sorting interactions and dynamic content updates in grid lists.
</div>

#### Example - defining the column header template as a string

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
            columns: [ {
                field: "lastName",
                headerTemplate: '<input type="checkbox" id="check-all" /><label for="check-all">check all</label>'
            }],
            dataSource: {
                data: [
                    { id: 1, parentId: null, lastName: "Jackson" },
                    { id: 2, parentId: 1, lastName: "Weber" }
                ]
            }
        });
    </script>

### columns.minScreenWidth `Number`

The pixel screen width below which the column will be hidden. The setting takes precedence over the [`hidden`](/api/javascript/ui/treelist/configuration/columns.hidden) setting and the two cannot not be used at the same time.


<div class="meta-api-description">
How to set minimum screen width for column visibility in Kendo UI TreeList? Control the visibility of a data grid or tree list column based on viewport or screen width by setting a minimum pixel threshold that hides columns responsively on smaller screens, mobile devices, or narrow windows. Configure, enable, or set columns to disappear automatically beneath a specified screen width to optimize layouts, improve usability, and manage adaptive or responsive design in tables. Manage column responsiveness, control display rules for narrow displays, and override static hidden settings to ensure columns show only at or above certain device widths, supporting flexible, context-aware user interfaces.
</div>

#### Example - hiding columns when the screen is smaller than a given width

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
          columns: [
            { field: "id", width: 250, minScreenWidth: 500 }, //column will become hidden if screen size is less than 500px
            { field: "name", width: 250 }, //column will always be visible
            { field: "age", width: 250, minScreenWidth: 750 } //column will become hidden if screen size is less than 750px
          ],
          dataSource: [
              { id: 1, parentId: null, name: "Jane Doe", age: 31, city: "Boston" },
              { id: 2, parentId: 1, name: "John Doe", age: 55, city: "New York" }
          ]
        });
    </script>

### columns.selectable `Boolean` *(default: false)*

If set to `true` the treelist will render a select column with checkboxes in each cell, thus enabling multi-row selection. The header checkbox allows users to select/deselect all the rows on the current page.


<div class="meta-api-description">
How can I enable multi-row selection in my Kendo UI TreeList? Configure multi-row selection by enabling checkbox columns within a hierarchical data grid or tree-like list, allowing users to check individual items or toggle all visible entries with a header checkbox. Control row selection behavior by adding interactive selection controls that support selecting multiple rows simultaneously, such as enabling selectable checkboxes per row, implementing bulk select/deselect functionality, and managing selection state in nested or paged data structures. Set up selection columns to allow users to efficiently pick and manipulate multiple entries within a tree or list interface using familiar checkbox inputs.
</div>

#### Example

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
          columns: [
            { selectable: true, width: 65 },
            { field: "id", width: 250},
            { field: "name", width: 250 },
            { field: "age", width: 250}
          ],
          dataSource: [
              { id: 1, parentId: null, name: "Jane Doe", age: 31, city: "Boston" },
              { id: 2, parentId: 1, name: "John Doe", age: 55, city: "New York" }
          ]
        });
    </script>

### columns.sortable `Boolean|Object` *(default: true)*

If set to `true` and sorting is enabled, the user can click the column header and sort the TreeList by the column [`field`](/api/javascript/ui/treelist#configuration-columns.field). If set to `false`, sorting will be disabled for this column. By default, all columns are sortable if sorting is enabled though the [`sortable`](/api/javascript/ui/treelist#configuration-sortable) option.


<div class="meta-api-description">
How do I make specific columns in my Kendo UI TreeList sortable? Enable or disable sorting functionality on individual columns by controlling whether clicking the column header triggers sorting by that column’s data field, including options to activate or deactivate sortable headers, configure per-column click-to-sort behavior, manage user interactions for ascending or descending order toggling, customize header sortability in hierarchical tree list views, and selectively restrict sorting capabilities on specific columns while maintaining overall sorting settings for the entire tree or grid structure.
</div>

#### Example - disabling sorting

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position", sortable: false }
        ],
        sortable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" },
            { id: 3, parentId: 1, lastName: "Carr", position: "VP, Finance" }
          ]
        }
      });
    </script>

### columns.sortable.compare `Function`

A JavaScript function for comparing the values.

* If the first argument is less than the second one, returns `-1`.
* If both arguments are the same, returns `0`.
* If the first argument is greater than the second one, returns `+1`.


<div class="meta-api-description">
How to customize sorting behavior in Kendo UI TreeList with a custom comparison function? Customize sorting behavior in hierarchical data tables by defining a JavaScript comparison function that controls the ordering of column values, enabling tailored sorting logic such as locale-sensitive string comparison, case-insensitive sorting, custom numeric or date ordering, handling null or undefined values gracefully, and implementing specialized or complex sorting algorithms beyond default behavior to ensure precise data arrangement based on specific application needs.
</div>

#### Example - defining the custom compare function

    <div id="treeList"></div>
    <script>
      var numbers = {
        "one"  : 1,
        "two"  : 2,
        "three": 3
      };


      $("#treeList").kendoTreeList({
        dataSource: {
          data: [
                { id: 1, parentId: null, item: "two" },
                { id: 2, parentId: 1, item: "one" },
                { id: 3, parentId: 1, item: "three" }
            ]
        },
        sortable: true,
        columns: [{
          field: "item",
          sortable: {
            compare: function(a, b) {
              return numbers[a.item] - numbers[b.item];
            }
          }
        }]
      });
    </script>

### columns.template `String|Function`

The [`template`](/api/javascript/kendo/methods/template) which renders the column content. The TreeList renders table rows (`<tr>`) which represent the data source items.
Each table row consists of table cells (`<td>`) which represent the TreeList columns. By default, the HTML-encoded value of the [`field`](/api/javascript/ui/treelist#configuration-columns.field) is displayed in the column.

> To customize the way the column displays its value, use `template`.


<div class="meta-api-description">
How can I customize the rendering of each cell in a Kendo UI TreeList column? Control and customize the rendering of each cell in a hierarchical table column by configuring dynamic templates, enabling custom formatting, raw HTML injection, or computed markup using functions or template engines. Adjust how data fields display within table cells by setting personalized cell content, applying custom rendering logic, formatting values with code or markup snippets, and overriding default HTML encoding of field values. Enable flexible and programmable cell output in tree-structured grid columns to meet diverse UI needs, including injecting inline HTML, formatting values on a per-row basis, and using templating syntax for granular cell customization.
</div>

#### Example - setting the template as a string (wrapping the column value in HTML)

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position", template: "<strong>#: position #</strong>" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
          ]
        }
      });
    </script>

#### Example - setting an external template with conditional formatting and a button handler

    <div id="treelist"></div>

    <script type="text/x-kendo-template" id="template">
        # if (data.allowVote) { #
            <button class='k-button btn-vote'>Vote</button>
        # } #
    </script>

    <script>
    $("#treelist")
      .kendoTreeList({
        columns: [
          { field: "name" },
          { template: $("#template").html() }
        ],
        dataSource: [
          { allowVote: true, name: "Jane Doe" },
          { allowVote: true, name: "Joseph Doe" },
          { name: "John Doe" }
        ]
      })
      .on("click", ".btn-vote", function(e) {
        var treelist = $(e.delegateTarget).data("kendoTreeList");
        var dataItem = treelist.dataItem(e.currentTarget);
        alert("Voted for " + dataItem.name)
      });
    </script>

### columns.title `String`

The text that is displayed in the column header cell. If not set, the TreeList uses [`field`](/api/javascript/ui/treelist#configuration-columns.field).


<div class="meta-api-description">
How do I customize the header label in a Kendo UI TreeList column? Set or customize the header label text displayed at the top of a TreeList column, control what title or caption appears in the column header cell, configure column headings with specific names or labels, override default field names by specifying custom header text for clearer identification, assign descriptive titles to columns for improved readability, enable renaming or labeling of columns in hierarchical or grid-style data presentations, define column header captions to match user terminology, specify the text shown to represent a column’s contents in the header area, control and set the label that identifies each column’s data field, and adjust or personalize column header titles to better organize and display tree-structured tabular information.
</div>

#### Example - setting the title of the column

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", title: "Last Name" },
          { field: "position", title: "Position" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
          ]
        }
      });
    </script>

### columns.width `String|Number`

The width of the column. Numeric values are treated as pixels.


<div class="meta-api-description">
How do I set fixed column widths in a Kendo UI TreeList? Control and configure fixed or consistent column widths in hierarchical or tree-structured data tables by specifying numeric pixel values, enabling precise layout and sizing of table columns during initialization or dynamic rendering. Adjust, set, or lock individual column sizes to maintain uniform appearance, optimize space, and manage visual structure of expandable or nested data grids with columns in tree list or similar UI components. Use precise width settings to shape column layouts, enable fixed dimensions, and customize the presentation of multilevel tabular data.
</div>

#### Example - setting the column width as a string

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", width: "200px" },
          { field: "position" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
          ]
        }
      });
    </script>

#### Example - setting the column width as a number

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName", width: 200 },
          { field: "position" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" }
          ]
        }
      });
    </script>

To set the column width after the TreeList initialization you can use the [setOptions()](/api/javascript/ui/treelist/methods/setoptions) method.

### columns.hidden `Boolean` *(default: false)*

If set to `true`, the TreeList will not display the column. By default, all columns are displayed.


<div class="meta-api-description">
How to hide specific columns in a Kendo UI TreeList using JavaScript? Control the visibility of individual columns by configuring them to be hidden or shown in hierarchical grid or tree structures, enabling developers to set, toggle, or manage which columns appear in the interface, customize layouts by selectively displaying or concealing data fields, adjust column display programmatically or via initialization settings, and tailor the presentation of tabular hierarchical data by hiding unnecessary or optional columns to optimize user experience and interface clarity.
</div>

#### Example - hiding columns

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age", hidden: true }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columns.includeChildren `Boolean` *(default: false)*

If set to `true`, the TreeList will select all child rows upon parent row selection when checkbox selection is used.


<div class="meta-api-description">
How can I enable hierarchical checkbox selection in Kendo UI TreeList? Enable hierarchical checkbox selection where choosing a parent node automatically includes all its descendant child rows, allowing configuration to cascade selections throughout nested tree structures, manage group selection propagation, set checkbox behavior for parent-child relationships, control multi-level selection dependencies, synchronize selection states between parent and leaf nodes, implement cascading or recursive selection logic in tree data grids, and customize how selecting one item affects its entire subtree in hierarchical checkboxes.
</div>

#### Example

    <div id="treelist"></div>
    <script>
        $("#treelist").kendoTreeList({
          columns: [
            { selectable: true, includeChildren: true },
            { field: "id", width: 250},
            { field: "name", width: 250 },
            { field: "age", width: 250}
          ],
          dataSource: [
              { id: 1, parentId: null, name: "Jane Doe", age: 31, city: "Boston" },
              { id: 2, parentId: 1, name: "John Doe", age: 55, city: "New York" }
          ]
        });
    </script>

### columns.menu `Boolean`

If set to `true`, the TreeList will display the column in the column menu. By default, the column menu includes all data-bound columns, that is, the ones with a set [`field`](/api/javascript/ui/treelist#configuration-columns.field) option.


<div class="meta-api-description">
How can I customize the columns shown in the menu of a Kendo UI TreeList? Control the inclusion of specific columns in the interactive column menu within a hierarchical data grid, enabling developers to enable, show, hide, toggle visibility, or access column-specific actions and settings through a user-accessible menu; configure whether columns appear in dropdown menus that manage column visibility and features, customize which fields or data-bound columns are available for user interaction and dynamic display adjustments, and set options to manage column-level controls in tree-structured data tables for enhanced user interface customization and flexible column management.
</div>

#### Example - hiding a column from the column menu

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id", menu: false },
                { field: "name" },
                { field: "age" }
            ],
            columnMenu: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columns.locked `Boolean` *(default: false)*

If set to `true`, the TreeList will display the column as locked (frozen).


<div class="meta-api-description">
How to lock columns in Kendo UI TreeList so they stay visible while scrolling? Control or configure fixed columns in hierarchical or tree-structured tables to keep key data visible while scrolling horizontally, enabling column freezing, pinning, or locking to ensure certain columns remain static and on-screen during navigation; adjust settings to freeze columns at initialization so important fields stay constantly displayed regardless of user scroll position in TreeList or similar grid components.
</div>

#### Example - displaying locked columns

    <div id="treeList" style="width: 500px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 100},
          { field: "name", width: 200 },
          { field: "age", width: 250 }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        }
      });
    </script>

### columns.lockable `Boolean` *(default: true)*

If set to `false`, the column will remain in that side of the TreeList where its own locked configuration placed it.

> This option is useful when the TreeList has columns which are configured with a [`locked`](/api/javascript/ui/treelist#configuration-columns.locked) value. Setting it explicitly to `false` will
prevent the user from locking or unlocking this column while using the user interface.


<div class="meta-api-description">
Can I disable column locking in Kendo UI TreeList? Control whether a column’s locked or fixed position in a hierarchical list or grid can be changed by users, enabling or disabling the ability to toggle, lock, or unlock columns interactively in the tree or list interface, ensuring certain columns stay permanently pinned to the left or right side without user modification of their locked state or freezing behavior, useful for configuring immovable columns when customizing or restricting user column locking and unlocking actions in UI layouts.
</div>

#### Example - setting locked columns

    <div id="treeList" style="width: 500px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 100},
          { field: "name", width: 200 },
          { field: "age", width: 250, lockable: false }
        ],
        reorderable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        }
      });
    </script>

### resizable `Boolean` *(default: false)*

If set to `true`, the user can resize columns by dragging their header borders. By default, resizing is disabled.


<div class="meta-api-description">
How to enable column resizing in Kendo UI TreeList widget? Enable dynamic adjustment of column widths in hierarchical or tree-structured data grids by allowing users to drag and resize column edges interactively. Configure columns to be resizable or fixed, control user ability to modify column size on the fly, customize the flexibility of table headers, support manual column width changes, and toggle interactive column resizing for better layout control and responsive design in data tables with nested rows.
</div>

#### Example - enabling column resizing

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id" },
                { field: "name" },
                { field: "age" }
            ],
            resizable: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### reorderable `Boolean` *(default:false)*

If set to `true`, the user can reorder the columns by dragging their header cells. By default, reordering is disabled.


<div class="meta-api-description">
How can I enable users to reorder columns in my Kendo UI TreeList dynamically? Enable dynamic column rearrangement in hierarchical data grids by allowing users to drag and drop header cells to reorder columns interactively at runtime, providing customizable ordering, adjustable column positions, and user-controlled layout modifications within tree-structured lists or tables for improved interface flexibility and personalized data views.
</div>

#### Example - enabling column reordering

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "id" },
                { field: "name" },
                { field: "age" }
            ],
            reorderable: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columnMenu `Boolean|Object` *(default: false)*

If set to `true`, the TreeList displays the column menu when the user clicks the **Chevron** icon in the column headers. The column menu allows the user to show and hide columns, and, if filtering and sorting are enabled, filter and sort the data. By default, the column menu is disabled. Can be set to a JavaScript object which represents the column menu configuration.


<div class="meta-api-description">
How to enable column menu in Kendo UI TreeList? Enable or configure a customizable menu that appears when clicking the icon in a column header within a TreeList or grid, allowing users to toggle column visibility, apply sorting, and manage filtering options on individual columns; this feature supports dynamic control over column display and data manipulation by setting it to true or providing specific settings, commonly used for interactive column management, user-driven sorting, filtering, and layout customization in tabular data interfaces.
</div>

#### Example - enabling the column menu

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            columnMenu: true,
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columnMenu.columns `Boolean` *(default: true)*

If set to `true`, the column menu allows the user to select (show and hide) TreeList columns. By default, the column menu allows column selection.


<div class="meta-api-description">
How to enable column selection and visibility toggles in a hierarchical TreeList? Control the ability to show or hide columns through the column menu by enabling or disabling column selection and visibility toggles in hierarchical or tree-structured lists; configure whether users can access checkboxes in the menu to dynamically display or hide specific columns, manage column visibility settings interactively, and customize the user interface to allow or restrict column toggling options for better data presentation and user control over which columns appear in the tree list display.
</div>

#### Example - disabling the showing or hiding of the columns by using the column menu

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        columnMenu: {
          columns: false
        },
        sortable: true,
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.filterable `Boolean` *(default: true)*

If set to `true`, the column menu will allow the user to filter the TreeList. By default, if filtering is enabled through [`filterable`](/api/javascript/ui/treelist#configuration-filterable), the column menu allows the user to filter.


<div class="meta-api-description">
How to enable filtering options in each column's menu in a Kendo UI TreeList widget? Control the ability to activate or deactivate filtering options directly within each column’s menu in hierarchical or tree-structured data grids, allowing users to apply, enable, disable, or customize filters per column through the column menu interface, supporting scenarios like activating filter input fields, toggling filter visibility on individual columns, enabling granular data filtering from tree list headers, setting up per-column filter controls, and configuring interactive filtering options accessible from the column menu to refine visible data subsets dynamically.
</div>

#### Example - disabling column menu filtering

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        filterable: true,
        columnMenu: {
          filterable: false
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        }
      });
    </script>

### columnMenu.sortable `Boolean` *(default: true)*

If set to `true`, the column menu will allow the user to sort the TreeList by the column field. By default, if sorting is enabled through [`sortable`](/api/javascript/ui/treelist#configuration-sortable), the column menu allows the user to sort the data.

> If this option is set to `false`, the user will still be able to sort by clicking the column header cell.


<div class="meta-api-description">
How do I control sorting options in the column menu of Kendo UI TreeList? Control whether sorting options appear in the column's dropdown menu, enabling or disabling the ability to sort data directly from the column menu controls, configure the display of sort commands for individual columns, set sorting availability through the column context menu while still allowing header-click sorting when menu sorting is disabled, toggle sortable menu features on or off during grid or treelist setup, customize user interaction for sorting via menu versus header clicks, adjust whether users can activate sorting through column menus, enable sorting commands in menu interfaces for specific fields, manage sorting behavior in grid column menus to refine UX sorting options, configure if the column menu includes sort ascending and descending commands, and control sorting functionality exposed in column context menus independent from header sorting capabilities.
</div>

#### Example - disabling the sorting of the column menu

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            sortable: true,
            columnMenu: {
                sortable: false
            },
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 },
                    { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
                ]
            }
        });
    </script>

### columnMenu.messages `Object`

The text messages that is played in the column menu. Use it to customize or localize the column menu messages.


<div class="meta-api-description">
How to customize column menu messages in Kendo UI TreeList? Customize and localize the text strings displayed in the column menu of a hierarchical data grid, enabling configuration of menu labels, messages, prompts, and interface wording to support different languages, branding, or user interface preferences in tree-structured grid columns, including adjustments to column menu item descriptions, notifications, and contextual messages within expandable and collapsible tree grid menus.
</div>

#### Example - customizing column menu messages

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        filterable: true,
        columnMenu: {
          messages: {
            columns: "Choose columns",
            filter: "Apply filter",
            sortAscending: "Sort (asc)",
            sortDescending: "Sort (desc)"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.columns `String` *(default: "Columns")*

The text message that is displayed for the column selection menu item.


<div class="meta-api-description">
How to customize the column selection item label in Kendo UI TreeList's hierarchical grid column menu? Customize or configure the text label for the column selection item in the hierarchical grid column menu, control the display wording for choosing which columns to show or hide, enable localization or personalization of the menu's columns option, set or override the default columns menu text for enhanced clarity or user interface customization, adjust the label for the dropdown that manages column visibility within a tree-structured list or grid component.
</div>

#### Example - setting the column selection message

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            columnMenu: {
                messages: {
                  columns: "Choose columns"
                }
            },
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            }
        });
    </script>

### columnMenu.messages.filter `String` *(default: "Filter")*

The text message that is displayed for the filter menu item.


<div class="meta-api-description">
How can I customize the label for the filter option in a TreeList column menu? Customize the label, wording, or text shown for the filter option, filter command, or filtering entry within a column menu, column header dropdown, or context menu of a hierarchical grid or tree-structured list, enabling developers to localize, rename, or tailor the filter action display in the columns’ interactive menu, filter control, or column options panel for better user interface clarity, accessibility, or multilingual support when configuring or modifying column filtering UI in tree-like data grids.
</div>

#### Example - setting the filter message

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        filterable: true,
        columnMenu: {
          messages: {
            filter: "Apply filter"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.moveNext `String` *(default: "Move Next")*

The text message that is displayed for the Move to next position column menu item.


<div class="meta-api-description">
How do I customize the "move to next" label in Kendo UI TreeList column menu? Customize or configure the label, text, or caption for the action that moves a column to the next position within a column menu in a hierarchical grid or tree list interface. Enable control over the wording used for navigation commands such as "move to next," "shift column right," or "advance column placement" in column menus, dropdowns, or toolbar options. Adapt or localize the text string for user interface elements that handle rearranging or repositioning columns sequentially, supporting various phrasing like moving columns forward, shifting columns to the next slot, or changing column order in tree-structured tabular data displays.
</div>

#### Example

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        columnMenu: {
          messages: {
            moveNext: "Move to Next Position"
          }
        }
      });
    </script>

### columnMenu.messages.movePrev `String` *(default: "Move Previous")*

The text message that is displayed for the Move to previous position column menu item.


<div class="meta-api-description">
How to customize the "Move to Previous" column menu option in Kendo UI TreeList? Set or customize the label, title, or text displayed for the column menu option that moves a column to the previous position, reorder columns by shifting left or prior order, control menu item wording for moving columns earlier in the sequence, adjust the move-to-previous or shift-column-left command text to fit localization, UX preferences, or custom interface language, modify the prompt for column position rearrangement controls to indicate moving columns backward or up in the column list, configure the user interface string for moving columns to an earlier place within a grid or tree table structure.
</div>

#### Example

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        columnMenu: {
          messages: {
            movePrev: "Move to Previous Position"
          }
        }
      });
    </script>

### columnMenu.messages.sortAscending `String` *(default: "Sort Ascending")*

The text message that is displayed for the menu item which performs the ascending sort mode.


<div class="meta-api-description">
How to change the text for the "Sort Ascending" option in a Kendo UI TreeList column menu? Customize or set the label, text, or caption displayed for the option that sorts data in ascending order within a tree list column menu, including how to change, modify, or localize the ascending sort menu item text, adjust the wording for sorting ascending, enable or configure ascending order sorting prompts, control the user interface text that triggers sorting from lowest to highest or A to Z in hierarchical grid column menus, and tailor the ascending sort menu terminology to fit different languages, user preferences, or application themes.
</div>

#### Example - setting the message for the ascending sort mode

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            sortAscending: "Sort (asc)"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.sortDescending `String` *(default: "Sort Descending")*

The text message that is displayed for the menu item which performs the descending sort mode.


<div class="meta-api-description">
How do I change the label for the "sort descending" command in a Kendo UI TreeList column menu? Customize or configure the label, text, or message shown for descending sort options in column menus, control how the sort descending command appears in tree-like data grids, set the display wording for sorting columns from highest to lowest, adjust or change the prompt or tooltip text related to sorting data in descending order within hierarchical table structures, modify the description or string shown when enabling reverse or descending sort in column menus, define the phrasing or terminology for sorting columns descending in grid or list components with expandable rows, tailor the interface text for descending sorting choices in column headers, control how descending sort instructions or labels are presented in expandable tables, set or change the language displayed for ordering data from largest to smallest in tree-structured list controls.
</div>

#### Example - setting the message for the descending sort mode

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            sortDescending: "Sort (desc)"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.settings `String` *(default: "Column Settings")*

The text message that is displayed in the menu header.


<div class="meta-api-description">
How to customize column menu header in Kendo UI TreeList? Customize or localize the header text displayed in the column menu of a hierarchical tree list, control or configure the label for the column options or settings menu, set the title or prompt that appears at the top of the column menu interface, adjust the text shown in the column menu header for different languages or custom terminology, enable modification of the column menu header caption to fit UI preferences or localization needs.
</div>

#### Example - setting the message for the menu header

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            settings: "Column Options"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.lock `String` *(default: "Lock Column")*

The text message that is displayed in the column menu when locking a column.


<div class="meta-api-description">
How do I customize the lock column menu message in a Kendo UI TreeList? Customize, configure, or localize the text label, message, or prompt displayed in the column menu for locking columns within a hierarchical or tree-structured list. Enable setting or changing the lock option wording, menu item text, UI strings, or localization for the column lock feature to support different languages, user preferences, or interface customization when controlling column locking behavior in tree data grids.
</div>

#### Example - setting the messages for locking a column

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            lock: "Pin Column"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### columnMenu.messages.unlock `String` *(default: "Unlock Column")*

The text message that is displayed in the column menu for unlocking a column.


<div class="meta-api-description">
How do I customize the "unlock" option in a TreeList column menu? Customize or localize the text label displayed for the option to unlock or release a column in a hierarchical data grid or tree-structured list, enabling developers to configure the wording shown in the column menu when users want to make a previously locked column movable or editable, supporting multilingual interfaces and adapting the unlock action terminology for different languages or UI contexts where column unlocking, releasing, or enabling free movement is required.
</div>

#### Example - setting the message for unlocking a column

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            lock: "Unpin Column"
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

### dataSource `Object|Array|kendo.data.TreeListDataSource`

The data source of the widget which is used to render table rows. Can be a JavaScript object which represents a valid [`kendo.data.TreeListDataSource`](/api/javascript/data/treelistdatasource) configuration, a JavaScript array, or an existing [`kendo.data.TreeListDataSource`](/api/javascript/data/treelistdatasource) instance.

* If the `dataSource` option is set to a JavaScript object or an array, the widget will initialize a new [`kendo.data.DataSource`](/api/javascript/data/treelistdatasource) instance and will use that value as the DataSource configuration.
* If the `dataSource` option is an existing `kendo.data.TreeListDataSource` instance, the widget will use that instance and will not initialize a new one.


<div class="meta-api-description">
How to configure data source for hierarchical data in Kendo UI TreeList? Set or configure the hierarchical data input for rendering rows in a tree-structured list, supporting local arrays, nested objects, existing data source instances, or configuration objects to control data binding, loading, and hierarchy representation. Enable binding to various types of hierarchical data sets including JavaScript arrays, data source configurations, or pre-existing data source instances, allowing flexible integration of data models in tree list components. Control how hierarchical or nested data collections populate the tree view, including using built-in or custom data sources, passing raw data arrays, or referencing external data provider instances for dynamic or static hierarchical data visualization.
</div>

#### Example - setting the dataSource as a JavaScript object

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
          ]
        }
      });
    </script>

#### Example - setting the dataSource as a JavaScript array

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        columnMenu: {
          messages: {
            sortDescending: "Sort (desc)"
          }
        },
        dataSource: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 14 }
        ]
      });
    </script>

#### Example - setting the dataSource as an existing dataSource instance

      <div id="treelist"></div>

      <script>
        var service = "https://demos.telerik.com/service/v2/core";

        $("#treelist").kendoTreeList({
          dataSource: new kendo.data.TreeListDataSource({
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          }),
          height: 400,
          columns: [
            { field: "FirstName", title: "First Name", width: 220},
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" }
          ]
        });
      </script>

### editable `Boolean|Object` *(default: false)*

If set to `true`, the user will be able to edit the data to which the TreeList is bound. By default, editing is disabled.

`editable` can be set to a JavaScript object (which represents the editing configuration) or to a string (which specifies the edit mode).

The supported string values are:

* (Default) `inline`
* `popup`
* `incell`

> * The inline and popup edit modes are triggered by the `edit` column command. Therefore, in order for these edit modes to work correctly, you need to have a column with the `edit` command.
> * In order for the edit operations to work correctly, [configure the dataSource for CRUD operations](/framework/datasource/crud).


<div class="meta-api-description">
How to enable editing in Kendo UI TreeList component? Configure data editing capabilities for hierarchical or tree-structured data grids by enabling or disabling user modifications, setting detailed editing options via objects, or specifying edit modes such as inline editing directly in rows, popup dialog-based editing, or editing within individual cells. Control how users interact with the data by activating edit commands tied to specific columns, handle create, read, update, and delete operations through proper data source setup, and customize the editing experience to fit user interface requirements for seamless modification of nested or parent-child record structures. This includes toggling editable states, defining edit triggers, opting for modal or inline input methods, and ensuring data persistence through CRUD configuration.
</div>

#### Example - enabling editing

      <div id="treelist"></div>
      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

          $("#treelist").kendoTreeList({
            editable: true,
            height: 540,
            columns: [
              { field: "FirstName", title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { title: "Edit", command: [ "edit" ], width: 180 }
            ],
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  type: "POST",
                  contentType: "application/json"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                  }
                }
              },
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            }
          });
      </script>

#### Example - enabling popup editing

      <div id="treelist"></div>
      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

          $("#treelist").kendoTreeList({
            editable: "popup",
            height: 540,
            columns: [
              { field: "FirstName", title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { title: "Edit", command: [ "edit" ], width: 180 }
            ],
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  type: "POST",
                  contentType: "application/json"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                  }
                }
              },
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            }
          });
      </script>

### editable.mode `String` *(default: "inline")*

The edit mode that will be used.

The supported edit modes are:

* `inline`
* `popup`
* `incell`

> The inline and popup edit modes are triggered by the `edit` column command. Therefore, in order for these edit modes to work correctly, you need to have a column with the `edit` command.


<div class="meta-api-description">
How can I configure inline editing in a Kendo UI TreeList widget? Configure or set the editing mode for hierarchical data grids to control whether users can edit entire rows inline, through popup dialogs, or directly within individual cells; enable different editing experiences such as inline editing that modifies whole rows within the list, popup editing that opens a separate dialog for row details, or incell editing where cells become editable on click or focus, all requiring integration with editing commands or controls to activate these modes effectively.
</div>

#### Example - specifyinging the inline edit mode

      <div id="treelist"></div>
      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

          $("#treelist").kendoTreeList({
            editable: {
                mode: "inline"
            },
            height: 540,
            columns: [
              { field: "FirstName", title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { title: "Edit", command: [ "edit" ], width: 180 }
            ],
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  type: "POST",
                  contentType: "application/json"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                  }
                }
              },
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            }
          });
      </script>

### editable.move `Boolean|Object` *(default: false)*

Enables the drag-and-drop UI of rows between parents.


<div class="meta-api-description">
How to enable drag-and-drop functionality in Kendo UI TreeList? Control drag-and-drop functionality for rearranging hierarchical data by enabling row movement, reparenting, and transfer within a tree-structured list or grid. Configure interactive row dragging to reorder items visually, change parent-child relationships dynamically, and facilitate node relocation across different branches or levels. Set options to activate or deactivate move operations during initialization, supporting user-driven restructuring of nested data with intuitive drag interfaces, row repositioning, and hierarchical modifications in tree views.
</div>

#### Example - using the drag-and-drop functionality for editing the row parent node

      <div id="treelist"></div>
      <script>
        var service = "https://demos.telerik.com/service/v2/core";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            move: true
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" }
          ]
        });
      </script>

### editable.move.clickMoveClick `Boolean` *(default: true)*

If set to `true` (default), when there is a drag column for the items in the TreeList, the user will be allowed to reorder rows via click move click interaction as an alternative of the drag and drop one.


<div class="meta-api-description">
How do I enable click-to-move row reordering in a TreeList with Kendo UI for jQuery? Control row reordering in hierarchical or nested lists by enabling or disabling click-based move interactions as an alternative to drag-and-drop, allowing users to reorder items via sequential clicks (click, move, click) rather than drag gestures; configure settings to turn on or off this click-driven item rearrangement, especially useful when drag handles or drag columns are present, supporting use cases that prefer keyboard-friendly, accessible, or simplified movement of rows within tree or list data structures without relying solely on dragging motions.
</div>

#### Example

      <div id="treelist"></div>
      <script>
        var service = "https://demos.telerik.com/service/v2/core";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            move: {
              reorderable: true,
              clickMoveClick: false
            }
          },
          columns: [
            { draggable: true, width: "40px" },
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" }
          ]
        });
      </script>

### editable.move.reorderable `Boolean` *(default: false)*

Enables reordering of rows via a drag-and-drop UI.


<div class="meta-api-description">
How do I enable drag-and-drop row reordering in a Kendo UI TreeList widget? Enable drag-and-drop row rearrangement within a TreeList or hierarchical grid, allowing users to move and reorder items or nodes visually by dragging to new positions; configure drag reorder functionality to control dynamic reordering, item repositioning, interactive sorting, and custom row ordering workflows in tree-structured lists or nested data views.
</div>

#### Example - using the drag-and-drop functionality for editing the row parent node

      <div id="treelist"></div>
      <script>
        var service = "https://demos.telerik.com/service/v2/core";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            move: {
              reorderable: true
            }
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" }
          ]
        });
      </script>

### editable.template `String|Function`

The [`template`](/api/javascript/kendo/methods/template) which renders the popup editor.

The template has to contain elements whose `name` HTML attribute is set to the name of the editable field. In this way, the TreeList recognizes
the field to which it has to bind the each editor. Alternatively, use [MVVM](/framework/mvvm/overview) bindings for binding HTML elements to data item fields.

> To initialize Kendo UI widgets in the template, use the `role` data attribute. For more information, refer to the [`data` attribute initialization](/framework/data-attribute-initialization).


<div class="meta-api-description">
How can I customize the popup editor template in a Kendo UI TreeList component to match my specific form layout needs? Configure and customize popup editor templates for tree-structured grid components by defining custom HTML markup or MVVM bindings that bind individual editable fields to specific input elements, enabling tailored form layouts, complex field editors, and per-column controls within popup editing interfaces, including the ability to integrate Kendo UI widgets using data-role attributes for enhanced UI customization and dynamic editing experiences in hierarchical data grids.
</div>

#### Example - customizing the popup editor

      <div id="treelist"></div>
      <script id="popup-editor" type="text/x-kendo-template">
  			<h3>Edit Person</h3>
  			<p>
  			  <label>First Name:<input name="FirstName" /></label>
  			</p>
  			<p>
  			  <label>Last Name:<input name="LastName" /></label>
  			</p>
  			<p>
  			  <label>Position:
              <select name="Position">
          	    <option>Software Developer</option>
                <option>Team Lead</option>
                <option>Technical Lead</option>
        	  </select>
        	</label>
        </p>
      </script>
      <script>
        var service = "https://demos.telerik.com/service/v2/core";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            template: kendo.template($("#popup-editor").html()),
            mode: "popup"
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" },
            { command: ["edit"] }
          ]
        });
      </script>

#### Example - using MVVM in the popup editor template

      <div id="treelist"></div>
      <script id="popup-editor" type="text/x-kendo-template">
  			<h3>Edit Person</h3>
  			<p>
  			  <label>First Name:<input data-bind="value: FirstName" /></label>
  			</p>
  			<p>
  			  <label>Last Name:<input data-bind="value: LastName" /></label>
  			</p>
  			<p>
  			  <label>Position:
          <select data-bind="value: Position">
          	<option>CEO</option>
            <option>Team Lead</option>
            <option>Technical Lead</option>
        	</select>
        	</label>
        </p>
      </script>
      <script>
        var service = "https://demos.telerik.com/service/v2/core";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            template: kendo.template($("#popup-editor").html()),
            mode: "popup"
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" },
            { command: ["edit"] }
          ]
        });
      </script>

### editable.window `Object`

Configures the Kendo UI Window instance which is used when the TreeList edit mode is set to `popup`. For more information, refer to the [configuration API of the Window](/api/javascript/ui/window).


<div class="meta-api-description">
How do I customize the popup edit window in Kendo UI TreeList? Configure and customize the popup dialog or modal window used for editing items when in popup edit mode, including setting the title, dimensions, modal behavior, animations, action buttons, templates, and appearance of the edit form. Control and tailor the editing interface window's settings like size, layout, animation effects, modal overlay, toolbar actions, and content templates to enhance user interaction and editing experience within a TreeList or similar hierarchical data grid. Adjust the popup editor's visual and functional properties to enable, disable, or personalize the edit dialog’s look and behavior, ensuring seamless integration and intuitive editing workflows during popup mode.
</div>

#### Example - configuring the Window in the popup edit mode

      <div id="treelist"></div>
      <script>
        var service = "https://demos.telerik.com/service/v2/core";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            mode: "popup",
            window: {
              title: "My Custom Title",
              animation: false,
              open: myOpenEventHandler
            }
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" },
            { command: ["edit"] }
          ]
        });

        function myOpenEventHandler(e) {
          // ...
        }
      </script>

### excel `Object`

Configures the Excel export settings of the TreeList.


<div class="meta-api-description">
How do I configure Excel export options for hierarchical data in Kendo UI TreeList? Control exporting hierarchical grid or tree-structured data to Excel by configuring Excel export options such as setting the output filename, customizing worksheet names, defining column visibility and formatting, including or excluding child nodes and nested data, managing paging and filtering during export, applying workbook-level settings like proxies or templates, and enabling fine-tuning of export behaviors to match desired Excel output, sheet structure, and file organization for exporting trees, lists, or complex data grids to spreadsheets in various export scenarios.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        excel: {
          fileName: "TreeListData.xlsx",
          allPages: true
        }
      });
    </script>

### excel.allPages `Boolean` *(default: false)*

If set to `true` the TreeList will export all pages of data. By default the TreeList exports only the current page.


<div class="meta-api-description">
How to export all TreeList pages to Excel instead of just the current page? Enable exporting all data rows to an Excel file instead of just the current visible page by configuring the option to include every record from all pages during export, allowing full dataset export across pagination boundaries, supporting use cases where users want to export complete data rather than partial or paged views, controlling whether the export captures only the current subset versus the entire data source, setting or toggling export scope for Excel downloads to handle multi-page data structures in hierarchical or tree-like lists, ensuring comprehensive export output regardless of pagination, managing full versus partial data export for spreadsheet generation, setting export modes to include all records or simply the displayed page when exporting to Excel formats.
</div>

#### Example - export all pages of data

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        excel: {
          allPages: true
        },
        pageable: {
          pageSize: 10
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### excel.fileName `String` *(default: "Export.xslx")*

Specifies the file name of the exported Excel file.


<div class="meta-api-description">
How to set custom filename for exported Excel file in TreeList Kendo UI component? Set or customize the name of the exported Excel file when saving or downloading data from the hierarchical grid, manage the default or dynamic filename for the Excel (.xlsx) export, specify or control the workbook's output file name to ensure meaningful or user-friendly titles during export operations, enable naming conventions for exported spreadsheets, adjust or configure the export file's identification for downloadable Excel workbooks generated from the tree-structured data list component.
</div>

#### Example - setting the default Excel file name

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        excel: {
          fileName: "Employees.xlsx"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              }
            }
          }
        }
      });
    </script>

### excel.filterable `Boolean` *(default: false)*

Enables or disables column filtering in the Excel file. Not to be mistaken with the filtering feature of the TreeList.


<div class="meta-api-description">
How to control column filters in TreeList Excel export? Control whether column filters are included or excluded in the Excel export generated from the TreeList, enabling or disabling filter controls within the exported spreadsheet. Configure the export to show, set, or remove column-level filtering options directly inside the Excel file without impacting the interactive filtering behavior of the TreeList itself. Adjust settings to embed filter dropdowns, searchable filters, or disable them in the output Excel document, affecting only the static export representation rather than the live UI filtering capabilities.
</div>

#### Example - enabling filtering in the output Excel file

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        excel: {
          filterable: true
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              }
            }
          }
        }
      });
    </script>

### excel.forceProxy `Boolean` *(default: false)*

If set to `true`, the content will be forwarded to [`proxyURL`](/api/javascript/ui/treelist#configuration-excel.proxyURL) even if the browser supports local file saving.


<div class="meta-api-description">
How can I control Excel export behavior in Kendo UI TreeList to always route through a proxy server? Control export behavior for Excel files by enabling or disabling proxy routing during file generation, allowing the developer to force the exported Excel content to pass through a specified proxy URL regardless of browser capabilities, or to permit direct local file saving without proxy interception. Configure settings to either route export data through a server-side proxy for improved compatibility and security or to save Excel files directly on the client side, managing how export requests are handled, transmitted, and saved. Adjust export handling to enable proxy forwarding to a designated endpoint or bypass it for native browser file saving, supporting scenarios involving export content delivery, server load balancing, cross-origin restrictions, and file saving workflows. Set options to control whether Excel export streams use proxy URLs, influence save paths, override local storage capabilities, and determine the routing method for exported spreadsheet data within the TreeList component.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        excel: {
          fileName: "TreeListData.xlsx",
          forceProxy: true,
          proxyURL: "/save"
        }
      });
    </script>

### excel.proxyURL `String` *(default: null)*

The URL of the server-side proxy which will stream the file to the end user. A proxy will be used when the browser is not capable of saving files locally. Such browsers are IE version 9 and earlier and Safari. The developer is responsible for implementing the server-side proxy. The proxy will return the decoded file with the `Content-Disposition` header set to `attachment; filename="<fileName.xslx>"`.

The proxy will receive a POST request with the following parameters in the request body:

* `contentType` - The MIME type of the file.
* `base64` - The base-64 encoded file content.
* `fileName` - The file name as requested by the caller.


<div class="meta-api-description">
How do I enable Excel export in Kendo UI TreeList when using IE9? Configure or specify a server endpoint URL to act as a proxy for delivering exported Excel files when direct client-side saving is unsupported or restricted by browsers like IE9 or Safari, enabling seamless file downloads by posting base64 encoded spreadsheet content, MIME type, and designated filenames to a server-side handler that streams the decoded file back with appropriate content-disposition headers for attachment; this setup supports scenarios requiring secure, cross-browser compatible Excel exports, custom filename control, and backend processing to facilitate file delivery otherwise blocked by local file system limitations or older browser constraints.
</div>

#### Example - setting the server proxy URL

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        excel: {
          proxyURL: "/save"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              }
            }
          }
        }
      });
    </script>

### filterable `Boolean|Object` *(default: false)*

If set to `true`, the user can filter the data source by using the TreeList filter menu. By default, filtering is disabled. Can be set to a JavaScript object which represents the filter menu configuration.


<div class="meta-api-description">
How do I enable filtering in a Kendo UI TreeList column? Control the ability to enable or disable interactive filtering of columns in a hierarchical data grid, allowing users to search, filter, or narrow down displayed data through filter menus or customizable filter options, including configuring filter behavior, enabling filter input fields, setting filter modes, and applying multi-column filters within a tree-structured list.
</div>

#### Example - enabling and configuring filtering

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          height: "100em",
          columns: [
            { field: "lastName" },
            { field: "position" },
            { field: "extension" }
          ],
          dataSource: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
          ],
          filterable: {
            extra: false,
            messages: {
              and: "and",
              or: "or",
              filter: "Apply filter",
              clear: "Clear filter",
              info: "Filter by: ",
              isFalse: "False",
              isTrue: "True",
              selectValue: "Select category",
              cancel: "Reject",
              operator: "Choose operator",
              value: "Choose value"
            },
            operators: {
              string: {
                eq: "Equal to",
                neq: "Not equal to",
                startswith: "Starts",
                endswith: "Ends",
                contains: "Contains",
                doesnotcontain: "Doesn't contain"
              },
              number: {
                eq: "Equal to",
                neq: "Not equal to",
                gt: "Greater than",
                gte: "Greater than or equal to",
                lt: "Less than",
                lte: "Less than or equal to"
              },
              date: {
                gt: "After",
                gte: "On or after",
                lt: "Before",
                lte: "On or before",
                eq: "On",
                neq: "Not equal"
              },
              enums: {
                eq: "Equal to",
                neq: "Not equal to"
              }
            }
          }
        });
    </script>

### filterable.extra `Boolean` *(default: true)*

If set to `true`, the filter menu will allow the user to input a second criteria.


<div class="meta-api-description">
How to configure advanced filter criteria in Kendo UI TreeList's column filter menu? Enable configuring additional filter criteria in the column filter menu to allow users to apply multiple conditions or complex filtering logic such as combining filters with AND/OR operators, setting up advanced multi-rule filters, entering more than one search term or value directly in the UI, enhancing data narrowing capabilities, supporting compound filter expressions, and controlling layered or sequential filtering within tree-structured lists or grids.
</div>

#### Example - disabling the extra filtering criteria

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          extra: false
        }
      });
    </script>

### filterable.messages `Object`

The text messages that are displayed in the filter menu. Use it to customize or localize the filter menu messages.


<div class="meta-api-description">
How can I customize filter messages in my Kendo UI TreeList? Control and personalize filter menu labels and text in hierarchical data grids by customizing, overriding, or localizing filter messages for tree-structured lists, enabling tailored filter prompts, instructions, and options display, and adjusting language or terminology in filter dropdowns and search fields within nested or grouped data views.
</div>

#### Example - customizing the filter menu messages

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            and: "and",
            or: "or",
            filter: "Apply filter",
            clear: "Clear filter"
          }
        }
      });
    </script>

### filterable.messages.and `String` *(default: "And")*

The text of the option which represents the `AND` logical operation.


<div class="meta-api-description">
How to change the label for the "and" operator in a Kendo UI TreeList filter? Customize or configure the label, text, or display name shown for the logical "and" operator within tree-based or hierarchical list filtering interfaces, enabling control over how conjunctions between multiple filter conditions are presented or localized in user interfaces, filter dialogs, or query builders, including adjusting wording for clarity, translation, or UI consistency in combinational filter expressions.
</div>

#### Example - setting the AND message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            and: "and"
          }
        }
      });
    </script>

### filterable.messages.clear `String` *(default: "Clear")*

The text of the button which clears the filter.


<div class="meta-api-description">
How do I customize the clear filter button label in a Kendo UI TreeList? Customize, localize, or set the label and text displayed on the clear filter button within hierarchical or tree-structured lists, enabling control over UI messaging for clearing applied filters, resetting filter inputs, or removing search criteria in tree data grids, allowing developers to adjust wording to match language preferences, user interface terminology, or accessibility requirements for filter clearing actions in data presentations and interactive filtering scenarios.
</div>

#### Example - setting the clear message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            clear: "Clear filter"
          }
        }
      });
    </script>

### filterable.messages.filter `String` *(default: "Filter")*

The text of the button which applies the filter.


<div class="meta-api-description">
How do I change the text on the filter apply button in a Kendo UI TreeList? Customize or translate the text label on the filter apply button in hierarchical data grids or tree-structured lists, enabling localization or modification of filter action prompts, button captions, or UI text related to applying filters in tree lists, grids, or nested data views, supporting internationalization, user interface text configuration, and adaptive language settings for filter controls in interactive tree table components.
</div>

#### Example - setting the filter message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            filter: "Apply filter"
          }
        }
      });
    </script>

### filterable.messages.info `String` *(default: "Show items with value that: ")*

The text of the information message on top of the filter menu.


<div class="meta-api-description">
How to change the text above filter input fields in a Kendo UI TreeList? Set or customize the informational text displayed at the top of a filter menu in hierarchical or tree-structured data grids, enabling developers to configure, modify, or replace default filter guidance messages, hints, or instructions shown above filter input fields in tree list components, facilitating clearer user prompts for applying or using filtering options, messages related to filter criteria, or contextual help for searching and sorting nested data views.
</div>

#### Example - setting the info message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: {
          messages: {
            info: "Filter by: "
          }
        }
      });
    </script>

### filterable.messages.title `String` *(default: "Show items with value that: ")*

The text that is rendered for the `title` attribute of the filter menu form.


<div class="meta-api-description">
How to customize the title of the filter menu in a TreeList component? Customize or configure the filter menu form's title text in hierarchical or tree-structured data grids to support localization, set or change the accessible name of the filtering interface, enable setting descriptive tooltips or labels for filter dialogs in tree lists, control the display text shown in filter controls for nested data views, modify or translate the filter form heading to improve usability and clarity in data filtering interfaces, and localize or adapt the filter menu title attribute to different languages and contexts within tree-based data presentations.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        filterable: {
          messages: {
            title: "Filter by value:"
          }
        }
      });
    </script>

### filterable.messages.isFalse `String` *(default: "is false")*

The text of the radio button for `false` values. Displayed when the user filters Boolean fields.


<div class="meta-api-description">
How to customize the label for false Boolean filter options in Kendo UI TreeList? Customize or configure the label, text, or caption displayed for false Boolean filter options in hierarchical or tree-structured data grids, enabling control over how "false" values appear in filter selection menus, radio buttons, or toggles when filtering by Boolean fields within tree list components, filterable columns, or checkbox states across nested row data.
</div>

#### Example - setting the isFalse message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "available" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", available: true },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", available: false }
          ],
          schema: {
            model: {
              fields: {
                available: {type: "boolean"}
              }
            }
          }
        },
        filterable: {
          messages: {
            isFalse: "False"
          }
        }
      });
    </script>

### filterable.messages.isTrue `String` *(default: "is true")*

The text of the radio button for `true` values. Displayed when the user filters Boolean fields.


<div class="meta-api-description">
How to customize the "True" label in TreeList Boolean filters? Customize or configure the text label displayed for the true option in Boolean field filters within hierarchical or tree-structured data grids, including setting, controlling, or enabling the radio button captions that represent "true" values during filtering operations on tree lists, boolean property searches, or data grids with nested entries, ensuring clarity for filtering controls in user interfaces that handle true/false or yes/no conditions in complex data views.
</div>

#### Example - setting the isTrue message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "available" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", available: true },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", available: false }
          ],
          schema: {
            model: {
              fields: {
                available: {type: "boolean"}
              }
            }
          }
        },
        filterable: {
          messages: {
            isTrue: "True"
          }
        }
      });
    </script>

### filterable.messages.or `String` *(default: "Or")*

The text of the option which represents the `OR` logical operation.


<div class="meta-api-description">
How to customize OR filter condition text in Kendo UI TreeList? Customize, localize, or configure the text that appears for logical OR conditions in filter prompts, messages, or labels within hierarchical data grids, tree lists, or nested filtering interfaces; control the wording shown when users combine multiple filter criteria using OR operators, adapt filter logic language for internationalization, translation, or regional settings, and adjust user-facing filter messages to clarify alternative filtering options or selectable conditions in tree-structured data views.
</div>

#### Example - setting the or message

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
        ],
        filterable: true,
        filterable: {
          messages: {
            or: "or"
          }
        }
      });
    </script>

### filterable.mode `String` *(default: "menu")*

If set to `row` the user would be able to filter via extra row added below the headers. By default filtering is using the `menu` mode.

Can also be set to the following string values:

- "row" - the user can filter via extra row within the header.
- "menu" - the user can filter via the menu after clicking the filter icon.
- "menu, row" - the user can filter with both modes above enabled.

> When the `filterable.mode` property is set to `"row"` or `"menu, row"`, the TreeList dataSource instance is copied and applied to the Kendo UI AutoComplete widgets used for string filtering.
This will cause one additional read request per string column. The AutoComplete dataSources do not perform paging and will use a collection of the unique column values only.


<div class="meta-api-description">
How to configure filtering in hierarchical data grids with Kendo UI TreeList? Control how filtering is enabled in hierarchical data grids, allowing configuration to show filter inputs either as an additional row below the headers for direct inline filtering, within column header menus requiring a filter icon click, or both simultaneously, enabling users to set up filters via header rows, dropdown menu filters, or combined filtering interfaces. This setup supports inline filtering controls, menu-based filter dropdowns, and hybrid modes, impacting data loading by duplicating data sources for autocomplete filters on string columns without paging, and facilitating flexible user-driven filtering experiences through both filter row inputs and column menu selections.
</div>

#### Example - set mode option to use both "menu" and "row" modes simultaneously

    <div id="treeList"></div>

    <script>
      $("#treeList").kendoTreeList({
        columns: [
          "lastName",
          "position"
        ],
        filterable: {
            mode: "menu, row"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
          ]
        }
      });
    </script>

### filterable.operators `Object`

The text of the filter operators that are displayed in the filter menu.

> In multiple TreeLists, you can override the filterable options of the `FilterMenu` before the TreeLists are initialized. Then, the new filter options will be available for all TreeLists without further configuration.


<div class="meta-api-description">
How do I customize the operator labels in a TreeList filter menu? Control and customize the text labels for filter operators in hierarchical list filtering menus, enabling you to configure, rename, or override comparison operators such as equals, contains, starts with, ends with, greater than, less than, and more, to tailor filter criteria options across multiple data tree components or grid filters. Adjust or replace default operator names used in filtering menus to match specific language, terminology, localization needs, or user preferences, ensuring consistent and recognizable filter controls when searching, sorting, or applying conditional queries within nested or tree-structured data views. This setup optimizes filtering interfaces by allowing developers to set global or individual operator labels that appear in filter dropdowns to enhance usability, customization, and clarity in dynamic, tree-formatted data filtering scenarios.
</div>

#### Example - overriding the filterable options in multiple TreeLists

    <h4>TreeList One</h4>
    <div id="treeList1"></div>
    <h4>TreeList Two</h4>
    <div id="treeList2"></div>

    <script>
      kendo.ui.FilterMenu.fn.options.operators.string = {
        eq: "Equal to...",
        neq: "Not equal to..."
      };

      $("#treeList1").kendoTreeList({
        columns: [
          "lastName",
          "position"
        ],
        filterable: {
          extra: false
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
          ]
        }
      });

      $("#treeList2").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" }
        ],
        filterable: {
          extra: false
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
          ]
        }
      });
    </script>

### filterable.operators.string `Object`

The texts of the filter operators that are displayed for columns whcih are bound to string fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

In the following example, only the `Contains...` and `Starts with...` operators will be displayed in the DropDownList.


<div class="meta-api-description">
How do I customize the filter options for string columns in a Kendo UI TreeList? Customize, modify, or set the available string filter operations and their labels for filtering text columns in a hierarchical data grid or tree structure, controlling which filtering options appear such as contains, starts with, ends with, equals, or excludes and how these options are labeled in dropdown menus, enabling tailored filtering experiences by including or omitting specific operators to match user search preferences and filtering needs for string values in tree or hierarchical list views.
</div>

#### Example - setting the string operators

    <div id="treeList"></div>

    <script>
      $("#treeList").kendoTreeList({
        columns: [
          "lastName",
          "position"
        ],
        filterable: {
          extra: false,
          operators: {
          	string: {
            	contains: "Contains...",
              startswith: "Starts with..."
            }
          }
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
            { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
          ]
        }
      });
    </script>


### filterable.operators.string.eq `String` *(default: "Is equal to")*

The text of the `eq` (equal to) filter operator.


<div class="meta-api-description">
How do I customize the "equals" filter option label in a Kendo UI TreeList? Configure or customize the label text for the string equality filter option used in filtering data within hierarchical or tree-structured lists, enabling localization or renaming of the "equals" operator in filter dropdowns. Adjust or define the displayed name for exact match string comparisons, control how the "equal to" string operator appears in user interfaces for filtering tree or nested data, and manage the terminology presented when setting up string filters that check for precise equality in tree list filters. This supports internationalization, custom phrasing, and UI consistency for string equality filter controls in hierarchical data grids or tree list components.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        filterable: {
          operators: {
            string: {
              eq: "Equals"
            }
          }
        }
      });
    </script>

### filterable.operators.string.neq `String` *(default: "Is not equal to")*

The text of the `ne` (not equal to) filter operator.


<div class="meta-api-description">
How to customize the "not equal" filter operator label in Kendo UI TreeList? Customize or localize the label, caption, or text shown for the "not equal" string filter operator in hierarchical or tree-structured data grids, enabling control over the display wording for inequality filtering conditions, adjusting or setting the operator text for string-based filtering where values are filtered by excluding matches, supporting localization, translation, or personalized phrasing of the not-equal string filter option in tree list components.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        filterable: {
          operators: {
            string: {
              neq: "Not equal to"
            }
          }
        }
      });
    </script>

### filterable.operators.string.isnull `String` *(default: "Is null")*

The text of the `isnull` filter operator.


<div class="meta-api-description">
How do I customize the "is null" filter option in a Kendo UI TreeList? Customize or configure the label text for the filter operator that identifies null or missing string values within hierarchical data grids or tree-structured lists, enabling developers to control how the "is null" string condition appears in filtering options, set user interface language or terminology for filtering by empty or non-existent string entries, manage filter comparison operators for strings checking the presence or absence of data, and tailor the filter operator wording for better clarity in tree list filtering scenarios.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        filterable: {
          operators: {
            string: {
              isnull: "Is null"
            }
          }
        }
      });
    </script>

### filterable.operators.string.isnotnull `String` *(default: "Is not null")*

The text of the `isnotnull` filter operator.


<div class="meta-api-description">
How do I customize the label for the "is not null" filter operator in a TreeList column? Customize or configure the label, text, or display name for the string filter operator that checks for non-empty, non-null, or existing string values within a column filter interface, enabling control over how "is not null," "has value," or "string is present" operators appear and are presented to users in filtering options.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        filterable: {
          operators: {
            string: {
              isnotnull: "Is not null"
            }
          }
        }
      });
    </script>

### filterable.operators.string.isempty `String` *(default: "Is empty")*

The text of the `isempty` filter operator.


<div class="meta-api-description">
How to customize the "is empty" string filter operator in Kendo UI TreeList? Customize the display text or label for the string filter operator that checks for empty or blank values within filtering interfaces, allowing definition or localization of the "is empty" condition used in search, filtering, query builders, or UI elements that enable setting criteria based on whether a string is empty, null, or has no content, helping users configure, rename, or modify the prompt shown for empty string matching in tree or hierarchical list filters.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        filterable: {
          operators: {
            string: {
              isempty: "Is empty"
            }
          }
        }
      });
    </script>

### filterable.operators.string.isnotempty `String` *(default: "Is not empty")*

The text of the `isnotempty` filter operator.


<div class="meta-api-description">
How do I customize the "is not empty" filter option in a Kendo UI TreeList? Set or customize the label, text, or display name for the "is not empty" string filter option used in filtering lists or tree structures, enabling clear identification when filtering to exclude empty or blank string values, configuring filter operators for string data to detect non-empty entries, adjusting filter labels in user interfaces to clarify the "not empty" condition, specifying how the filter prompt or operator name appears for non-blank string checks in data grids, lists, or tree-like data presentations, and controlling the descriptive text shown for string filters that match any value except empty or null strings.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        filterable: {
          operators: {
            string: {
              isnotempty: "Is not empty"
            }
          }
        }
      });
    </script>

### filterable.operators.string.startswith `String` *(default: "Starts with")*

The text of the `startswith` filter operator.


<div class="meta-api-description">
How do I customize the "starts with" filter option in a Kendo UI TreeList? Set or customize the localized text, label, or display name for the string filter operation that checks if text begins with a specified sequence in a hierarchical or tree-structured list. Adjust, configure, or define how the "starts with" filter option appears in user interfaces, including changing language, translation, or wording to match localization needs or specific terminology preferences when filtering string data by prefix or initial characters.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        filterable: {
          operators: {
            string: {
              startswith: "Starts with"
            }
          }
        }
      });
    </script>

### filterable.operators.string.contains `String` *(default: "Contains")*

The text of the `contains` filter operator.


<div class="meta-api-description">
How do I customize the "contains" filter option in a Kendo UI TreeList widget? Customize or set the label and text shown for the string "contains" filter option in tree-structured list filtering interfaces, enabling control over how substring matching, inclusion checks, partial text searches, or filtering by contained values appear in dropdowns or filter menus when users look to apply text-based filters that search for entries containing specific substrings, words, or phrases within hierarchical data views.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        filterable: {
          operators: {
            string: {
              contains: "Contains"
            }
          }
        }
      });
    </script>

### filterable.operators.string.doesnotcontain `String` *(default: "Does not contain")*

The text of the `doesnotcontain` filter operator.


<div class="meta-api-description">
How to customize the "does not contain" filter operator label in a Kendo UI TreeList? Control and customize the display text or label for the string filter operator that excludes results containing specific substrings in hierarchical or tree-structured data grids, enabling localized or translated phrasing for "does not contain" filtering in tree lists, allowing filtering options where users can search for entries that do not include certain words or characters, supporting various languages and regional settings to tailor the filter operator’s wording to user preferences or internationalization needs in tree-like data views.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        filterable: {
          operators: {
            string: {
              doesnotcontain: "Does not contain"
            }
          }
        }
      });
    </script>

### filterable.operators.string.endswith `String` *(default: "Ends with")*

The text of the `endswith` filter operator.


<div class="meta-api-description">
How to customize the label for the "ends with" filter operator in Kendo UI TreeList? Customize, configure, or set the text label, name, or caption shown for string filter options that check if values end with specific characters, suffixes, or substrings in hierarchical or tree-structured lists. Control how the suffix matching filter operation is presented, displayed, or named to match user interfaces that involve searching, filtering, or querying data entries based on string endings, tail matches, postfix conditions, or pattern suffixes in tree list components or complex nested data grids.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        filterable: {
          operators: {
            string: {
              endswith: "Ends with"
            }
          }
        }
      });
    </script>

### filterable.operators.number `Object`

The texts of the filter operators that are displayed for columns which are bound to number fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

In the following example, only the `Equal to...` and `Not equal to...` operators will be displayed in the operators DropDownList.


<div class="meta-api-description">
How to customize numeric filter operators in Kendo UI TreeList? Customize and control numeric filter operators for columns with number data, adjusting which comparison options like equals, not equals, greater than, less than, or other numeric conditions appear in filter dropdowns for TreeList or similar grid components, enabling tailored numeric filtering criteria, filtering logic configuration, operator label adjustments, and precise control over available number-based filter comparisons and expressions to match user queries for setting or enabling specific numeric filter operations in data tables or interactive lists.
</div>

#### Example - setting the number operators

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "extension" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", extension: 8241 },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", extension: 8342 }
          ],
          schema: {
            model: {
              fields: {
                extension: { type: "number" }
              }
            }
          }
        },
        filterable: {
          extra: false,
          operators: {
            number: {
              eq: "Equal to...",
              neq: "Not equal to..."
            }
          }
        }
      });
    </script>

### filterable.operators.number.eq `String` *(default: "Is equal to")*

The text of the `eq` (equal to) filter operator.


<div class="meta-api-description">
How do I customize the "equal to" filter operator label in a number column of my Kendo UI TreeList? Adjust or translate the label text for the numeric equality filter operator, enabling customization of the "equal to" condition in number column filters, modifying the caption or name developers see when setting up filters that check if values are exactly equal, configuring filter UI operators for numbers, localizing or changing filter operator names, controlling how equal-to comparisons appear in filter dropdowns or menus in data grids or tree lists.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Age", type: "number" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Age: 45, parentId: null },
          { id: 2, Name: "Guy Wooten", Age: 35, parentId: 1 }
        ],
        filterable: {
          operators: {
            number: {
              eq: "Equals"
            }
          }
        }
      });
    </script>

### filterable.operators.number.neq `String` *(default: "Is not equal to")*

The text of the `ne` (not equal to) filter operator.


<div class="meta-api-description">
How do I customize the "not equal to" filter operator label in a TreeList? Configure or customize the label and text displayed for the "not equal to" numeric filter operator in hierarchical or tree-structured data lists, enabling users to set, change, or localize the wording used to exclude matching numbers during filtering, support differentiation of numeric criteria excluding equal values, and control how numeric inequality filtering expressions appear in tree data grids or lists.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Age", type: "number" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Age: 45, parentId: null },
          { id: 2, Name: "Guy Wooten", Age: 35, parentId: 1 }
        ],
        filterable: {
          operators: {
            number: {
              neq: "Not equal to"
            }
          }
        }
      });
    </script>

### filterable.operators.number.isnull `String` *(default: "Is null")*

The text of the `isnull` filter operator.


<div class="meta-api-description">
How to customize the "is null" condition label in Kendo UI TreeList numeric filtering? Configure or customize the display text for the "is null" condition in numeric filtering within hierarchical list controls, enabling setting, localizing, or translating the label that identifies when numeric fields have no value or are empty, supporting searches related to filtering numbers by null, empty, undefined, missing, or blank conditions in tree-structured data views with customizable operator names.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Age", type: "number" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Age: 45, parentId: null },
          { id: 2, Name: "Guy Wooten", Age: 35, parentId: 1 }
        ],
        filterable: {
          operators: {
            number: {
              isnull: "Is null"
            }
          }
        }
      });
    </script>

### filterable.operators.number.isnotnull `String` *(default: "Is not null")*

The text of the `isnotnull` filter operator.


<div class="meta-api-description">
How do I customize the "is not null" filter operator in a Kendo UI TreeList? Adjust, customize, or localize the label and text that represent the "is not null" numeric filter condition in hierarchical or tree-structured list components, enabling developers to set, change, or control how number filters exclude null or empty values, modify filtering operators for numeric data to recognize non-null entries, and tailor filter operator names for better clarity or translation in filtering interfaces that use number-based conditions excluding nulls.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Age", type: "number" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Age: 45, parentId: null },
          { id: 2, Name: "Guy Wooten", Age: 35, parentId: 1 }
        ],
        filterable: {
          operators: {
            number: {
              isnotnull: "Is not null"
            }
          }
        }
      });
    </script>

### filterable.operators.number.gte `String` *(default: "Is greater than or equal to")*

The text of the `gte` (greater than or equal to) filter operator.


<div class="meta-api-description">
How to customize the label for "greater than or equal to" filter in Kendo UI TreeList? Configure or customize the label text displayed for numeric filters that use "greater than or equal to" comparison in data grids or tree lists, enabling developers to set, change, or localize the operator’s wording for numeric filtering criteria, number-based filtering options, or conditional expressions that filter records where values are equal to or exceed a specified threshold, supporting personalization and UI flexibility for numeric filter operators involving comparisons like >= in grid or tree data structures.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Age", type: "number" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Age: 45, parentId: null },
          { id: 2, Name: "Guy Wooten", Age: 35, parentId: 1 }
        ],
        filterable: {
          operators: {
            number: {
              gte: "Greater than or equal to"
            }
          }
        }
      });
    </script>

### filterable.operators.number.gt `String` *(default: "Is greater than")*

The text of the `gt` (greater than) filter operator.


<div class="meta-api-description">
How to customize the "greater than" operator label in Kendo UI TreeList? Set or customize the label text for the numeric filter operator that filters values greater than a specified number in hierarchical or tree-structured lists, adjusting how the "greater than" condition appears in filter menus, column filters, or search interfaces; ideal for localization, changing default operator names, or tailoring filter UI wording for numeric comparisons involving greater-than criteria, enabling control over filter operator display text in number-based filtering scenarios.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Age", type: "number" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Age: 45, parentId: null },
          { id: 2, Name: "Guy Wooten", Age: 35, parentId: 1 }
        ],
        filterable: {
          operators: {
            number: {
              gt: "Greater than"
            }
          }
        }
      });
    </script>

### filterable.operators.number.lte `String` *(default: "Is less than or equal to")*

The text of the `lte` (less than or equal to) filter operator.


<div class="meta-api-description">
How do I customize the label for the "less than or equal to" filter operator in a Kendo UI TreeList? Customize or configure the label, caption, or display text for the numeric "less than or equal to" filter operator in hierarchical grid or tree-structured data lists, enabling control over how the "lte" comparison option appears in filtering interfaces and menus for number-based filtering criteria within data trees or nested list components.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Age", type: "number" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Age: 45, parentId: null },
          { id: 2, Name: "Guy Wooten", Age: 35, parentId: 1 }
        ],
        filterable: {
          operators: {
            number: {
              lte: "Less than or equal to"
            }
          }
        }
      });
    </script>

### filterable.operators.number.lt `String` *(default: "Is less than")*

The text of the `lt` (less than) filter operator.


<div class="meta-api-description">
How do I customize the "less than" operator label in a Kendo UI TreeList numeric filter? Customize, configure, or set the label and display text for the "less than" operator in numeric filtering controls within hierarchical data grids or tree structures, enabling tailored wording for number comparison filters, adjusting operator names for filtering columns with numeric values, modifying or localizing the "less than" condition in number-based filter menus, and controlling how "lt" numeric filter operators appear in user interfaces for filtering data by values smaller than a given number.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Age", type: "number" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Age: 45, parentId: null },
          { id: 2, Name: "Guy Wooten", Age: 35, parentId: 1 }
        ],
        filterable: {
          operators: {
            number: {
              lt: "Less than"
            }
          }
        }
      });
    </script>

### filterable.operators.date `Object`

The texts of the filter operators that are displayed for columns which are bound to date fields.

> Omitting an operator will exclude it from the DropDownList with the available operators.

In the following example, only the `Is before...` and `Is after...` operators will be displayed in the operators DropDownList.


<div class="meta-api-description">
How do I customize the date filter operators in Kendo UI TreeList? Customize, set, or control the available filter operators for date columns in tree-like lists, specifying which comparison options like before, after, equal to, or not equal to appear in the date filtering dropdown. Enable, disable, or configure operator labels and filter choices to tailor date-based filtering behavior, determining which date conditions users can select when filtering data by date values, such as greater than, less than, on or before, or between specific dates. Adjust, define, or limit the visible date filter operations to streamline user input and refine filtering UI for hierarchical or tabular data structures.
</div>

#### Example - setting the date operators

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" },
          { field: "hireDate", format: "{0:MM/dd/yyyy}" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, lastName: "Jackson", position: "CEO", hireDate: new Date() },
            { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering", hireDate: new Date() }
          ],
          schema: {
            model: {
              fields: {
                hireDate: { type: "date" }
              }
            }
          }
        },
        filterable: {
          extra: false,
          operators: {
            date: {
              lt: "Is before...",
              gt: "Is after..."
            }
          }
        }
      });
    </script>

### filterable.operators.date.eq `String` *(default: "Is equal to")*

The text of the `eq` (equal to) filter operator.


<div class="meta-api-description">
How to customize the date equality filter operator label in Kendo UI TreeList? Customize, localize, or translate the label text used for the date equality filter operator in tree list or hierarchical data grids, enabling control over how "equals date," "date is equal to," or "filter by exact date" conditions appear in filtering UI, ensuring date comparison operators reflect localized terms, date-specific equality checks, or customized date filter labels across different languages, regions, or interface settings for enhanced user understanding and precise date-based filtering criteria.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "HireDate", type: "date" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", HireDate: new Date("2023/1/1"), parentId: null },
          { id: 2, Name: "Guy Wooten", HireDate: new Date("2023/2/1"), parentId: 1 }
        ],
        filterable: {
          operators: {
            date: {
              eq: "Equals"
            }
          }
        }
      });
    </script>

### filterable.operators.date.neq `String` *(default: "Is not equal to")*

The text of the `ne` (not equal to) filter operator.


<div class="meta-api-description">
How do I customize the "not equal to" date filter operator label in Kendo UI TreeList? Customize or configure the label, wording, or text display for the "not equal to" date filter operator within the TreeList filter settings, enabling control over how the date inequality comparison appears in filtering interfaces, search conditions, or date-based criteria that exclude specific date values by setting custom operator names or synonyms for date filtering functionality.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "HireDate", type: "date" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", HireDate: new Date("2023/1/1"), parentId: null },
          { id: 2, Name: "Guy Wooten", HireDate: new Date("2023/2/1"), parentId: 1 }
        ],
        filterable: {
          operators: {
            date: {
              neq: "Not equal to"
            }
          }
        }
      });
    </script>

### filterable.operators.date.isnull `String` *(default: "Is null")*

The text of the `isnull` filter operator.


<div class="meta-api-description">
How do I customize the label for date filter option "is null" in a Kendo UI TreeList component? Customize or configure the text label, caption, or placeholder shown for filter options that check if a date value is empty, missing, null, undefined, or has no timestamp in hierarchical or tree-structured data grids. Control how date-based null checks, existence filters, and blank date searches appear in filter operator dropdowns, enabling intuitive UI for date filters that detect absence or nullity of date fields when users set conditions or build queries within tree list components.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "HireDate", type: "date" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", HireDate: new Date("2023/1/1"), parentId: null },
          { id: 2, Name: "Guy Wooten", HireDate: new Date("2023/2/1"), parentId: 1 }
        ],
        filterable: {
          operators: {
            date: {
              isnull: "Is null"
            }
          }
        }
      });
    </script>

### filterable.operators.date.isnotnull `String` *(default: "Is not null")*

The text of the `isnotnull` filter operator.


<div class="meta-api-description">
How to customize "is not null" date filter label in Kendo UI TreeList? Configure and customize the label or text displayed for date filters that check for non-empty, non-null, or existing date values within hierarchical or tree-structured lists, enabling users to control how "is not null" date filter options appear, modify default filter operator wording, adjust filter expressions targeting dates that are present or defined, and set user-friendly or localized labels for filtering out null or missing date entries in tree grid or TreeList filtering interfaces.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "HireDate", type: "date" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", HireDate: new Date("2023/1/1"), parentId: null },
          { id: 2, Name: "Guy Wooten", HireDate: new Date("2023/2/1"), parentId: 1 }
        ],
        filterable: {
          operators: {
            date: {
              isnotnull: "Is not null"
            }
          }
        }
      });
    </script>

### filterable.operators.date.gte `String` *(default: "Is after or equal to")*

The text of the `gte` (greater than or equal to) filter operator.


<div class="meta-api-description">
How do I customize the "greater than or equal to" operator label in Kendo UI TreeList date filtering? Customize or configure the label, keyword, or text string representing the "greater than or equal to" condition for date filtering in hierarchical or tree-structured data grids, enabling you to specify, set, or localize the operators used to filter dates that are on or after a certain value in tree list or data table components, supporting queries for filtering dates with conditions like "on or later than," "from this date forward," "after or equal to," or "dates greater or equal," allowing flexible control over the phrasing related to date comparison filters in complex data views.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "HireDate", type: "date" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", HireDate: new Date("2023/1/1"), parentId: null },
          { id: 2, Name: "Guy Wooten", HireDate: new Date("2023/2/1"), parentId: 1 }
        ],
        filterable: {
          operators: {
            date: {
              gte: "Is after or equal to"
            }
          }
        }
      });
    </script>

### filterable.operators.date.gt `String` *(default: "Is after")*

The text of the `gt` (greater than) filter operator.


<div class="meta-api-description">
How do I customize the "greater than" date filter label in a Kendo UI TreeList? Customize or configure the label, text, or wording shown for the “greater than” date filter option in tree list or grid components, enabling control over how users see or interact with date filtering criteria set to include dates after a specified value, supporting user interface localization, readability, and filtering precision for date comparisons, time-based filtering rules, and query operators that check if dates exceed a given threshold.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "HireDate", type: "date" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", HireDate: new Date("2023/1/1"), parentId: null },
          { id: 2, Name: "Guy Wooten", HireDate: new Date("2023/2/1"), parentId: 1 }
        ],
        filterable: {
          operators: {
            date: {
              gt: "Is after"
            }
          }
        }
      });
    </script>

### filterable.operators.date.lte `String` *(default: "Is before or equal to")*

The text of the "lte" (less than or equal to) filter operator.


<div class="meta-api-description">
How do I customize the "less than or equal to" filter operator in Kendo UI TreeList? Configure or customize the label text for the "less than or equal to" date filter operator in filter menus and filter rows, enabling control over how the date comparison operator "lte" appears in filtering interfaces, including setting display text, modifying operator labels, adjusting filter expressions for dates with less than or equal comparison, and tailoring filter UI terminology for date range conditions using strings to represent "less than or equal to" date constraints.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "HireDate", type: "date" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", HireDate: new Date("2023/1/1"), parentId: null },
          { id: 2, Name: "Guy Wooten", HireDate: new Date("2023/2/1"), parentId: 1 }
        ],
        filterable: {
          operators: {
            date: {
              lte: "Is before or equal to"
            }
          }
        }
      });
    </script>

### filterable.operators.date.lt `String` *(default: "Is before")*

The text of the `lt` (less than) filter operator.


<div class="meta-api-description">
How to customize the label for the "less than" date filter operator in a Kendo UI TreeList? Configure or customize the label and user interface text for the date comparison operator representing "less than," "before," or "earlier than" in date filtering within a hierarchical or tree-structured data grid. Control the phrasing shown to users when applying a filter to find records with dates prior to a specified value, enabling setting, changing, or localizing the text that corresponds to date filters that check if a date is less than a target date. Adjust how the system presents the "date is before," "date earlier than," or "date less than" filtering criterion for enhanced clarity, usability, or language support in complex data lists or tree list components.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "HireDate", type: "date" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", HireDate: new Date("2023/1/1"), parentId: null },
          { id: 2, Name: "Guy Wooten", HireDate: new Date("2023/2/1"), parentId: 1 }
        ],
        filterable: {
          operators: {
            date: {
              lt: "Is before"
            }
          }
        }
      });
    </script>

### height `Number|String`

The height of the TreeList. Numeric values are treated as pixels.


<div class="meta-api-description">
How do I set the height of my Kendo UI TreeList component? Adjust or configure the vertical dimension, overall height, or pixel size of a hierarchical list or tree grid component to control its rendered space, fixed height, maximum height, or layout alignment; set numeric values to define the container’s height in pixels for proper display, scrolling behavior, visual constraints, or fitting within user interface areas and parent containers, ensuring consistent vertical sizing in tree data structures or expandable list views.
</div>

#### Example - setting the height as a number

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          height: 100,
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

#### Example - setting the height as a string

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          height: "100em",
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          dataSource: [
              { name: "Jane Doe", age: 30 },
              { name: "John Doe", age: 33 }
          ]
        });
    </script>

### messages `Object`

Defines the text of the command buttons that are shown within the TreeList. Used primarily for localization.


<div class="meta-api-description">
How can I customize the button labels in my Kendo UI TreeList component? Customize, configure, or override the default command button labels such as edit, delete, save, cancel, or any custom actions displayed in hierarchical grid controls or tree-structured lists. Enable localized, translated, or personalized button texts to tailor the interface language for different regions, support multi-language applications, modify command labels for better user clarity, adjust UI text for editing and managing tree nodes, and control the display of action buttons within tree-like data views or hierarchical data grids. This encompasses setting custom, internationalized, or context-specific strings for all command buttons related to node operations in tree components.
</div>

#### Example - changing the messages

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 }
        ],
        toolbar: [ "create", "pdf", "excel" ],
        columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
        editable: true,
        messages: {
          noRows: "No records",
          loading: "Fetching records...",
          requestFailed: "Fetching failed.",
          retry: "Reload",
          commands: {
            edit: "Modify",
            update: "Save",
            canceledit: "Discard",
            create: "Add New",
            createchild: "Add Child",
            destroy: "Remove",
            excel: "Export XSLX",
            pdf: "Export to PDF"
          }
        }
      });
    </script>

### messages.commands `Object`

Defines the text for the command buttons that are used across the widget.


<div class="meta-api-description">
How do I customize the button labels in Kendo UI TreeList? Adjust or localize button labels and command text within hierarchical data grids to change default action captions, customize UI commands, rename buttons for sorting, editing, deleting, adding, or other tree list operations, and configure the display language or phrasing of command buttons in a tree view or expandable list interface.
</div>

#### Example - setting the command button messages

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 }
        ],
        toolbar: [ "create", "pdf", "excel" ],
        columns: [ "name", "age", { command: [ "edit", "destroy", "createchild" ] } ],
        editable: true,
        messages: {
          commands: {
            edit: "Modify",
            update: "Save",
            canceledit: "Discard",
            create: "Add New",
            createchild: "Add Child",
            destroy: "Remove",
            excel: "Export XSLX",
            pdf: "Export to PDF"
          }
        }
      });
    </script>

### messages.commands.canceledit `String` *(default: "Cancel")*

Defines the text of the **Cancel** button that discards the changes during editing.


<div class="meta-api-description">
How to change the Cancel edit button text in a Kendo UI TreeList? Customize, set, or translate the text label for the Cancel button that discards or reverts changes while editing rows or items within a hierarchical or tree-structured data grid, enabling localization, multiple language support, and user interface customization for canceling edits in tree-like editable lists or grids.
</div>

#### Example - setting the text of the **Cancel** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      columns: [ "name", "age", { command: [ "edit" ] } ],
      editable: true,
      messages: {
        commands: {
          canceledit: "Discard"
        }
      }
    });
    </script>

### messages.commands.create `String` *(default: "Add new record")*

Defines the text of the **Add new record** button that adds new data rows.


<div class="meta-api-description">
How do I customize the "Create" button label in a Kendo UI TreeList? Control and customize the label text for the button that adds new entries or records in hierarchical data grids, enabling localization, language translation, or custom naming conventions for create, add, insert, or new record actions within tree-structured lists or tables. Adjust the displayed prompts, captions, or command button text used to initiate adding child or parent nodes in nested or expandable data views to match various languages, UI preferences, or user workflows.
</div>

#### Example - setting the text of the **Add new record** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age" ],
      editable: true,
      messages: {
        commands: {
          create: "Add new"
        }
      }
    });
    </script>

### messages.commands.createchild `String` *(default: "Add child record")*

Defines the text of the **Add child record** button that adds new child data rows.


<div class="meta-api-description">
How do I customize the "Add Child" button label in a Kendo UI TreeList? Customize, configure, or set the label, caption, or text displayed on the button that adds a new child record or item within a hierarchical or tree-structured list interface, enabling localization, translation, or modification of the "add child," "create child node," "insert child entry," or similar command text for multi-language support and user interface adaptability in tree or nested data views.
</div>

#### Example - setting the text of the **Add child record** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age", { command: [ "createchild" ] } ],
      editable: true,
      messages: {
        commands: {
          createchild: "Add child item"
        }
      }
    });
    </script>

### messages.commands.destroy `String` *(default: "Delete")*

Defines the text of the **Delete** button that deletes a data row.


<div class="meta-api-description">
How to customize the delete button text in Kendo UI TreeList? Set or customize the text label for delete buttons in data grids or table rows, control the wording shown on removal or deletion commands, configure the display text for row deletion actions, change or localize the label used when a user deletes an entry, adjust button captions for removing data entries, modify or set the command text that triggers data row deletion in hierarchical or tabular UI components.
</div>

#### Example - setting the text of the **Delete** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      columns: [ "name", "age", { command: [ "destroy" ] } ],
      editable: true,
      messages: {
        commands: {
          destroy: "Remove"
        }
      }
    });
    </script>

### messages.commands.edit `String` *(default: "Edit")*

Defines the text of the **Edit** button that shows the editable fields for the row.


<div class="meta-api-description">
How do I change the default edit button label in a Kendo UI TreeList? Customize the label or text displayed on the edit button within tree-structured data grids that enables row editing or inline modification of fields, allowing developers to configure, change, localize, or override the default edit command text for interactive editing interfaces, including setting custom button captions, tooltips, or action names to control user prompts for modifying hierarchical list entries or tree grid items dynamically.
</div>

#### Example - setting the text of the **Edit** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      columns: [ "name", "age", { command: [ "edit" ] } ],
      editable: true,
      messages: {
        commands: {
          edit: "Modify"
        }
      }
    });
    </script>

### messages.commands.save `String` *(default: "Save Changes")*

Defines the text of the **Save Changes** button that saves modifed data rows.


<div class="meta-api-description">
How do I customize the save button in Kendo UI TreeList to display a specific label? Customize or configure the text label, caption, or title for the save changes button that commits edited or modified rows in a hierarchical or tree-like data grid, enabling control over the save command button’s displayed name, text content, or messaging prompt to suit localization, branding, or user interface preferences when saving updates or changes within nested list or tree table components.
</div>

#### Example - setting the text of the **save Changes** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age" ],
      editable: true,
      messages: {
        commands: {
          save: "Save data"
        }
      }
    });
    </script>

### messages.commands.search `String` *(default: "Search...")*

Allows the customization of the placeholder text in the treelist search panel.


<div class="meta-api-description">
How to change the default search message in Kendo UI TreeList? Customize or configure the placeholder text, hint, prompt, or default input message shown in the search box or search panel for hierarchical or tree-structured data lists, enabling control over the search input’s descriptive text to guide users when filtering, querying, or finding items within nested data views; adjust or set the search field’s placeholder label, tooltip, or hint in tree list components to improve user interface clarity or localization for search queries within hierarchical grids, trees, or structured data displays.
</div>

#### Example

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      columns: [ "name", "age" ],
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar:["search"],
      messages: {
        commands: {
          search: "Look for..."
        }
      }
    });
    </script>

### messages.commands.cancel `String` *(default: "Cancel Changes")*

Defines the text of the **Cancel Changes** button that cancels all data modifications.


<div class="meta-api-description">
How do I change the cancel button text in a Kendo UI TreeList? Configure or customize the text label, caption, or display name for the cancel or undo action button that reverts, discards, or cancels all changes, edits, or modifications made to data entries in a hierarchical or tree-structured list interface, enabling control over the wording shown to users for the button that aborts current edits and restores original data.
</div>

#### Example - setting the text of the **Cancel Changes** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age" ],
      editable: true,
      messages: {
        commands: {
          save: "Reject changes"
        }
      }
    });
    </script>

### messages.commands.excel `String` *(default: "Export to Excel")*

Defines the text of the **Export to Excel** button that exports the widget data in spreadsheet format.


<div class="meta-api-description">
How to customize the export to Excel button label in Kendo UI TreeList? Customize or localize the label text for the export to Excel button in hierarchical or tree-structured data components, enabling configuration of the Excel export command’s display name, adapting UI button captions, controlling multilingual or localized button text for exporting grid or treelist views to Excel formats, setting or changing the command label shown on Excel export actions in data tables and trees, and managing user-facing strings related to exporting hierarchical data to spreadsheet files.
</div>

#### Example - setting the text of the **Export to Excel** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "excel" ],
      columns: [ "name", "age" ],
      messages: {
        commands: {
          excel: "Export to XLSX"
        }
      }
    });
    </script>

### messages.commands.pdf `String` *(default: "Export to PDF")*

Defines the text of the **Export to PDF** button that exports the widget data in PDF format.


<div class="meta-api-description">
How to customize the export to PDF button label in a Kendo UI TreeList? Customize or configure the export to PDF button label, modify the displayed text for exporting tabular or hierarchical data structures to PDF format, set or change the command name associated with generating PDF exports from tree list views, control the wording of the PDF export action, update the button caption or tooltip for PDF output, enable localization or personalization of the export command text when saving or printing data as PDF files from hierarchical data grids or tree-based lists.
</div>

#### Example - setting the text of the **Export to PDF** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "pdf" ],
      columns: [ "name", "age" ],
      messages: {
        commands: {
          pdf: "Export data to PDF"
        }
      }
    });
    </script>

### messages.commands.update `String` *(default: "Update")*

Defines the text of the **Update** button that applies the changes during editing.


<div class="meta-api-description">
How do I customize the label for the update button in a Kendo UI TreeList? Change or customize the label text, caption, or wording of the update button used for saving, applying, confirming, or submitting edits in editable grids or hierarchical lists; modify the text shown on buttons for updating, saving changes, confirming edits, or committing modifications in tree-like data structures to fit localization, UI preferences, or specific terminology.
</div>

#### Example - setting the text of the **Update** button

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 22 },
        { id: 2, parentId: 1, name: "John Doe", age: 24 }
      ],
      toolbar: [ "create" ],
      columns: [ "name", "age", { command: [ "edit" ] } ],
      editable: true,
      messages: {
        commands: {
          update: "Save"
        }
      }
    });
    </script>

### messages.loading `String` *(default: "Loading...")*

Defines the text of the **Loading...** message when the widget loads its root-level items.


<div class="meta-api-description">
How to customize the loading message in Kendo UI TreeList component? Configure or customize the text, label, or message displayed during the loading state while hierarchical data, root-level nodes, or parent items are being fetched, rendered, or initialized in a tree or list view. Control the prompt, placeholder, or status message for the asynchronous loading phase to improve user feedback, such as setting custom loading indicators, progress messages, notifications, or spinner text that appears while expanding, retrieving, or populating the top-level items in a tree structure component. Adjust or override default loading messages to enhance user experience when data is still being loaded in a tree list or hierarchical grid interface.
</div>

#### Example - setting the text of the **Loading...** button

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory"
            }
          },
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", nullable: false },
                ReportsTo: { field: "ReportsTo", nullable: true }
              }
            }
          }
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" }],
        editable: true,
        messages: {
          loading: "Fetching records..."
        }
      });
    </script>

### messages.noRows `String` *(default: "No records to display")*

Defines the text of **No records to display** message when the widget does not show any items.


<div class="meta-api-description">
How can I customize the message when a Kendo UI TreeList has no rows? Customize or configure the displayed text, notification, or placeholder shown when a hierarchical data grid, tree list, or table component has no rows, empty data, or no records to display; control the empty state message for localization, internationalization, or customized user feedback in tree-structured lists or grids that lack data entries.
</div>

#### Example - setting the text of the **No records to display** button

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: [],
        columns: [ "name", "age" ],
        messages: {
          noRows: "No data"
        }
      });
    </script>

### messages.requestFailed `String` *(default: "Request failed.")*

Defines the text of **Request failed** message when the widget fails to load its root-level items.


<div class="meta-api-description">
What is TreeList.messages.requestFailed used for in Kendo UI? Set or customize the error message, alert text, or notification displayed when a data request, server call, or loading operation for root-level items in a tree or hierarchical list fails, crashes, or returns an error; control, configure, or change the failure message shown in the UI when the initial load of parent nodes or top-level data does not succeed, enabling developers to define clear communication for request failures, load errors, or data retrieval issues within tree-structured components.
</div>

#### Example - setting the text of the **Request failed** button

```html
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://example.com"
            }
          }
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" }],
        editable: true,
        messages: {
          requestFailed: "Fetching failed."
        }
      });
    </script>
```

### messages.retry `String` *(default: "Retry")*

Defines the text of **Retry** message for the button which triggers the reloading of the TreeList root-level items.


<div class="meta-api-description">
How can I change the retry button label in a Kendo UI TreeList? Customize, localize, or change the text label of the retry button used to reload or refresh root-level data or items in hierarchical or tree-style list controls, enabling control over retry prompts, button captions, or messages that prompt users to attempt loading data again after failures or errors.
</div>

#### Example - setting the text of the **Retry** button

```html
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://example.com"
            }
          }
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" }],
        editable: true,
        messages: {
          retry: "Try again"
        }
      });
    </script>
```

### navigatable `Boolean` *(default: false)*

If set to `true`, the user can navigate the widget with the keyboard. By default, keyboard navigation is disabled. For a runnable example, refer to the [demo on keyboard navigation in the TreeList](https://demos.telerik.com/kendo-ui/treelist/keyboard-navigation).


<div class="meta-api-description">
How to enable keyboard navigation in Kendo UI TreeList? Configure keyboard navigation to allow users to move through tree-structured grid rows and individual cells using arrow keys, Tab, Enter, or keyboard controls, enabling accessible and efficient traversal of hierarchical data without a mouse, supporting focus management, cell selection, and keyboard-driven interactions for improved usability and accessibility in data tables or tree lists.
</div>

#### Example - enabling keyboard navigation

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 2, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        navigatable: true
      });
    </script>

### pageable `Boolean|Object` *(default: false)*

If set to `true`, the TreeList displays a pager. By default, paging is disabled. Only client-side paging is supported which means that all data items are expected to be available when the TreeList is initialized. Can be set to a JavaScript object which represents the pager configuration.

> Set a [`pageSize`](/api/javascript/data/datasource/configuration/pagesize) no matter if paging is performed on the client or on the server. A `pageSize` can be defined in the `pageable` settings, or in the [`dataSource`](/api/javascript/ui/treelist/configuration/datasource) settings.


<div class="meta-api-description">
How do I implement client-side pagination in a Kendo UI TreeList control? Control and configure client-side pagination for hierarchical data grids by enabling page navigation controls, setting custom page sizes, and managing the display of rows across multiple pages. Adjust paging behavior, configure pager appearance, navigate between data pages within tree-structured lists, and implement client-only paging where all records are preloaded. Customize and set page size parameters either in the paging configuration or data source, handle page events, and optimize user interaction with multi-level grid data spanning different pages. Enable or disable pagination, tailor pager functionality, and refine how tree table data is segmented and accessed across discrete pages without server-side processing.
</div>

#### Example - enabling paging

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2
            }
        });
    </script>

If client-side paging is used with editing, an item is added, and the `id` field of the model has to be nullable, then you have to configure the model to a default `id` field value on the client-side that is different from the default `parentId` field value. This approach is required because root TreeList items have their `parentId` field set to the default value for no parent which, by default, is equal to `null` but can be configured from the `dataSource.schema.model.fields[FIELD_NAME].defaultValue` option. In such cases, the default value of the `id` field (`null`) will be equal to the default `parentId` field value (`null`) which creates a circular dependency. You can set the default `id` field to a different value instead, for example, `zero`.

#### Example - setting id values that are different from parentId values

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            editable: "incell",
            toolbar: ["create"],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ],
                schema: {
                    model: {
                        fields: {
                            id: {
                                type: "number",
                                defaultValue: 0
                            }
                        }
                    }
                }
            },
            pageable: {
                pageSize: 2
            }
        });
    </script>

### pageable.alwaysVisible `Boolean` *(default: true)*

(Available as of the Kendo UI 2017 R3 release) By default, the TreeList will render a pager even when total number of items in the DataSource is less than the `pageSize` value.

If set to `false` the TreeList will toggle the pager visibility as follows:

* When the total amount of items initially set in the DataSource is less than the `pageSize` number, the pager will be hidden.
* When the total amount of items initially set in the DataSource is greater than or equal to the `pageSize` number, the pager will be shown.
* When the total amount of items in the DataSource becomes less than the `pageSize` number (after a delete or filter operation, or upon changing the `pageSize`), the pager will be hidden.
* When the total amount of items in the DataSource becomes greater than or equal to the `pageSize` number (after an insert or filter operation, or upon changing the `pageSize`), the pager will be shown.


<div class="meta-api-description">
How to always show pagination in Kendo UI TreeList regardless of data length? Control or configure pagination visibility in hierarchical data grids by enabling or disabling always showing the pagination controls regardless of data length, allowing the pager to appear only when the number of items exceeds the page size, dynamically toggling display based on data source changes such as filtering, inserting, or deleting entries, setting whether the pager is persistently visible or conditionally rendered when the dataset meets or exceeds the specified page size, managing page navigation UI presence in tree-structured lists to optimize user experience by showing or hiding pagination controls depending on total item count and page size settings.
</div>

#### Example - hiding the pager if the total number of items is less than the pageSize value

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 10,
                alwaysVisible: false
            }
        });
    </script>

### pageable.pageSize `Number`

The number of data items which will be displayed in the TreeList.

> This setting will not work if the TreeList has an already existing DataSource instance.


<div class="meta-api-description">
How do I adjust the number of rows displayed per page in a Kendo UI TreeList? Control the number of rows or data items displayed per page in a hierarchical or tree-structured list by specifying the page size with an integer value. Adjust pagination settings to configure how many entries appear on each page when browsing large datasets in a tree view. Enable or set the items-per-page count for efficient navigation and data loading, ensuring this setting is applied before binding the data source. Manage page length, limit visible nodes per page, and optimize user experience for scenarios requiring segmented or paged presentation of tree-structured data without conflicting with pre-existing data sources.
</div>

#### Example - setting the page size

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2
            }
        });
    </script>

### pageable.previousNext `Boolean` *(default: true)*

If set to `true`, the pager will display buttons for going to the first, previous, next, and last pages. By default, these buttons are displayed.


<div class="meta-api-description">
How to disable previousNext buttons in Kendo UI TreeList? Control the visibility and functionality of pagination navigation buttons such as first, previous, next, and last within a data grid or tree list to enable seamless browsing through paged content. Developers often look to configure, toggle, or disable these navigation controls to customize user interface pagination behavior, improve user experience for navigating large datasets, set preferences for showing or hiding page navigation buttons, or manage how users move between paged views. Common scenarios include enabling quick jumps to the first or last page, controlling stepwise page transitions, configuring page navigation UI elements, and customizing pagination controls for web or app data lists.
</div>

#### Example - hiding the first, previous, next, and last page navigation buttons

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                previousNext: false
            }
        });
    </script>

### pageable.numeric `Boolean` *(default: true)*

If set to `true`, the pager will display buttons for navigating to specific pages. By default, these buttons are displayed.

> Avoid using `pageable.numeric` and [`pageable.input`](pageable.input) simultaneously.


<div class="meta-api-description">
How to enable numeric page numbers in Kendo UI TreeList pager? Control the display of numeric pagination buttons in hierarchical or tree-structured data lists to allow direct navigation to specific pages, enabling users to click on page numbers for quick access, configure numeric page selectors versus input fields, toggle between numbered page links and other pager styles, manage pagination navigation UI elements for paged data views within tree lists, and customize page jumping methods for better user interaction with multi-page data presentations.
</div>

#### Example - hiding the numeric pager buttons

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                numeric: false
            }
        });
    </script>

### pageable.adaptiveMode `String` *(default: "none")*

Specifies a value whether the page sizes dropdown will be adaptive. Possible values are:

* `none` - The current page.
* `auto` - The total number of pages.


<div class="meta-api-description">
How to configure adaptive pagination for Kendo UI TreeList when total pages exceed a certain number? Configure how the pagination page size selector dynamically adjusts or adapts based on the total pages or current page, controlling which options for page size and navigation appear in the pagination UI. Enable responsive or adaptive behavior for page size dropdowns, customize visibility of page size choices depending on total pages or current page context, and manage user interaction with page sizing controls in a paginated tree or list structure. Adjust settings to optimize pagination controls, set adaptive modes like none or auto, and control how page size options are presented for efficient navigation and data display.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pageable: {
          adaptiveMode: "auto",
          pageSize: 5
        }
      });
    </script>

### pageable.buttonCount `Number` *(default: 10)*

The maximum number of buttons that are displayed in the numeric pager. If more pages than the specified number are rendered, the pager will display ellipsis (`...`).


<div class="meta-api-description">
How to set the maximum number of pagination buttons in a Kendo UI TreeList? Configure the maximum number of numeric pagination buttons displayed in a hierarchical data grid or tree-style list to control how many page links users see at once, enabling customization of pager button count, enabling ellipsis or dots to indicate additional hidden pages, managing page navigation controls, setting limits on visible page numbers to improve usability or UI compactness, and adjusting pager behavior when total pages exceed the visible button count.
</div>

#### Example - setting the pager button count

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                buttonCount: 1
            }
        });
    </script>

### pageable.input `Boolean` *(default: false)*

If set to `true`, the pager will display an `input` element which allows the user to type a specific page number. By default, the page input is not displayed.

> Avoid using `pageable.input` and [`pageable.numeric`](pageable.numeric) simultaneously.


<div class="meta-api-description">
How do I enable page number input in Kendo UI TreeList pager? Control and configure direct page number input in a hierarchical data grid pager to quickly jump to any page by typing the desired page, enabling fast navigation without clicking through pagination controls, supporting scenarios where users need to enter specific page numbers for immediate access, allowing input-driven paging as an alternative to numeric or button-based page selectors, and providing options to set, enable, or toggle a pager input field for efficient page transitions in complex tree-structured lists.
</div>

#### Example - showing the pager input

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                input: true
            }
        });
    </script>

### pageable.pageSizes `Boolean|Array` *(default: false)*

If set to `true`, the pager will display a drop-down which allows the user to pick a page size. By default, the drop-down for the page size is not displayed. Can be set to an array of predefined page sizes to override the default list. The TreeList supports a special `all` value which sets the page size to the total number of records. If you set a `pageSize` for the data source, then this value will be selected initially.


<div class="meta-api-description">
How do I customize the page sizes dropdown in Kendo UI TreeList? Configure the paging control to include a dropdown menu for selecting the number of rows or items shown per page, enabling users to adjust page length dynamically by choosing from predefined page size options, which can be specified as an array of numeric values or include a special 'all' option to display all records at once; this feature lets you toggle, customize, or override default page sizes and set initial values reflecting the current data source page size, supporting flexible pagination controls, user-driven page sizing, adjustable rows per page, and total record count display settings.
</div>

#### Example - showing the drop-down list for the page size

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                pageSizes: true
            }
        });
    </script>

#### Example - specifyinging the page sizes as an array

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                pageSizes: [2, 3, 4, "all"],
                numeric: false
            }
        });
    </script>

### pageable.refresh `Boolean` *(default: false)*

If set to `true`, the pager will display the **Refresh** button. Clicking the **Refresh** button will refresh the TreeList. By default, the **Refresh** button is not displayed.


<div class="meta-api-description">
How to enable refresh button in Kendo UI TreeList pager area? Configure or enable a refresh button within the pager area of a hierarchical data grid or tree list, allowing users to manually trigger data reloads or updates by clicking a refresh control in the pagination section. This setting controls the visibility and functionality of the refresh action integrated with the paging interface, useful for scenarios requiring explicit data refresh without reloading the entire page or grid. Ideal for dynamically updating displayed data in paginated tree structures, controlling user-initiated reloads, and ensuring the latest content is fetched on demand from server or data source while maintaining paging state.
</div>

#### Example - showing the **Refresh** button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                refresh: true
            }
        });
    </script>

### pageable.responsive `Boolean` *(default: false)*

If set to `false`, the pager will not be responsive. By default, the pager is responsive.


<div class="meta-api-description">
How do I enable adaptive paging layouts for my Kendo UI TreeList? Enable or disable adaptive paging layouts that automatically adjust the pagination controls based on container size or viewport width, allowing dynamic resizing, responsive navigation, or fixed pagination behavior for scrollable data grids, tables, or tree structures with variable display widths. Configure whether the page navigation adapts fluidly to device screen dimensions, shrinks or expands pagination elements for mobile, desktop, or embedded views, and control the user interface responsiveness of data pagination components in hierarchical lists or tabular trees.
</div>

#### Example - showing the responsive button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                responsive: false
            }
        });
    </script>

### pageable.info `Boolean` *(default: true)*

If set to `true`, the pager will display information about the current page and the total number of data items. By default, the paging information is displayed.


<div class="meta-api-description">
How to show page number and total item count in a Kendo UI TreeList component? Control the display of paging details such as showing or hiding the current page number, total item count, and page summary in a paginated data grid or TreeList component. Enable or disable informational text that indicates which page is active and how many data entries exist, configuring whether users see a summary of pagination status while navigating through pages. Adjust this setting during setup to toggle visibility of paging info elements, like page indices, overall row counts, total pages, or summary messages, helping to customize user interface feedback for page navigation and data overview.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pageable: {
          info: false
        }
      });
    </script>

##### Example - hiding the paging information

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                info: false
            }
        });
    </script>

### pageable.messages `Object`

The text messages that are displayed in the pager. Use this option to customize or localize the pager messages.


<div class="meta-api-description">
How do I customize the pagination labels in Kendo UI TreeList? Control and customize pagination text labels, configure localized pager messages, set custom navigation button names, override default page number wording, adjust displayed text for pages, enable multilingual pager captions, tailor navigation prompts, modify labels for page controls, localize paging interface strings, and manage the wording shown in list pagination controls for a seamless user experience across various languages and interfaces.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pageable: {
          messages: {
            display: "Showing {0} to {1} of {2} entries",
            empty: "No data available"
          }
        }
      });
    </script>

### pageable.messages.display `String` *(default: "{0} - {1} of {2} items")*,

The text with the pager information. Uses [`kendo.format`](/api/javascript/kendo/methods/format).

Contains the following placeholders:
- `{0}` - The first data item index.
- `{1}` - The last data item index.
- `{2}` - The total number of data items.


<div class="meta-api-description">
How can I customize the pager display text in a hierarchical data grid using Kendo UI for jQuery TreeList? Customize or configure pager display text in hierarchical data grids by setting formatted strings with placeholders for first item index, last item index, and total record count using templating or format strings; control the pagination label appearance, enable localization or internationalization, and adjust how page summaries and item ranges are shown within a tree-structured list or grid interface to match desired UI text, messages, or language preferences.
</div>

#### Example - setting the display pager message

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    display: "Showing {0}-{1} from {2} data items"
                }
            }
        });
    </script>

### pageable.messages.empty `String` *(default: "No items to display")*,

The text that is displayed when the TreeList is empty.


<div class="meta-api-description">
How do I customize the message shown when my Kendo UI TreeList is empty? Set or customize the message, text, or label shown when a hierarchical or tree-like list has no data, control the empty state notification, configure the placeholder text for an empty data grid or tree structure, define what users see when there are no records to display, enable custom empty messages in pageable or paginated tree lists, specify user-facing text indicating no results or no items found in tree views, adjust the default empty content message for data-bound tree components, and manage empty page messages to improve UX during no-data scenarios in tree-structured datasets.
</div>

#### Example - setting the empty pager message

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    empty: "No data"
                }
            }
        });
    </script>

### pageable.messages.page `String` *(default: "Page")*,

The label that is displayed before the pager input.


<div class="meta-api-description">
How to customize the paging message in Kendo UI TreeList? Customize or configure the label or text shown before the paging input box in hierarchical data grids or tree list components, enabling developers to define, change, or set the prompt or message that appears next to the page number input for better user guidance, localization, or UI clarity in paginated views and navigation controls within tree-structured tabular data presentations.
</div>

#### Example - setting the label before the pager input

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                input: true,
                messages: {
                    page: "Enter page"
                }
            }
        });
    </script>

### pageable.messages.of `String` *(default: "of {0}")*,

The label that is displayed before the pager input. Uses [`kendo.format`](/api/javascript/kendo/methods/format). Contains one optional `{0}` placeholder which represents the total number of pages.


<div class="meta-api-description">
How to customize "of X pages" label in Kendo UI TreeList pager? Customize or configure the label text shown before the page number input in a paginated tree grid or hierarchical list control, including setting dynamic messages that display total pages using placeholders or formatted strings, enabling control over pager UI text such as "of N pages," adjusting localization or language-specific pager labels, and formatting or replacing default page count indicators for user navigation feedback in hierarchical data views.
</div>

#### Example - setting the label after the pager input

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                input: true,
                messages: {
                    of: "from {0}"
                }
            }
        });
    </script>

### pageable.messages.itemsPerPage `String` *(default: "items per page")*,

The label that is displayed after the drop-down list for the page size.


<div class="meta-api-description">
How do I customize the items per page message in Kendo UI TreeList? Customize or set the text label displayed next to the page size selector, control or configure the wording that appears after the pagination dropdown, adjust the phrase shown by the page items selector in a data grid or list, modify the description or message that indicates how many items are shown per page, or localize and personalize the message linked to the page-size chooser in tree-structured or grid views.
</div>

#### Example - setting the label after the drop-down list for the page size

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSizes: [2, 5],
                input: true,
                messages: {
                    itemsPerPage: "data items per page"
                }
            }
        });
    </script>

### pageable.messages.first `String` *(default: "Go to the first page")*,

The tooltip of the button which goes to the first page.


<div class="meta-api-description">
How to customize the "Go to First Page" message in a Kendo UI TreeList? Control and customize the tooltip text or hover label displayed on the navigation button that jumps directly to the initial or first page in paginated hierarchical or tree-structured data views. This includes setting, updating, localizing, or configuring the message shown on the "go to first page" control within pageable, paginated grids or tree lists, enhancing user guidance and accessibility when users need to quickly return to the start of multi-page datasets or hierarchical listings.
</div>

#### Example - setting the Tooltip of the first page button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    first: "First page"
                }
            }
        });
    </script>

### pageable.messages.last `String` *(default: "Go to the last page")*,

The tooltip of the button which goes to the last page.


<div class="meta-api-description">
How do I customize the last page navigation button's tooltip in a Kendo UI TreeList? Customize or configure the tooltip text, label, or hover message for the last page navigation button in a pageable TreeList or grid to support localization, internationalization, or user interface text customization, enabling control over how the last-page button’s description appears when users navigate through paged data sets.
</div>

#### Example - setting the Tooltip of the last page button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    last: "Last page"
                }
            }
        });
    </script>

### pageable.messages.next `String` *(default: "Go to the next page")*,

The tooltip of the button which goes to the next page.


<div class="meta-api-description">
How do I customize the tooltip for the next button in a TreeList's pagination? Customize or localize the tooltip text displayed on the pagination next button within hierarchical data grids or tree list controls, enabling developers to set or override the default label, hint, or mouse-over description for navigating to the next page of items, ensuring support for multiple languages, customized user interfaces, and accessibility improvements related to paging controls in tree-structured or nested lists.
</div>

#### Example - setting the Tooltip of the next page button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    next: "Next page"
                }
            }
        });
    </script>

### pageable.messages.previous `String` *(default: "Go to the previous page")*,

The tooltip of the button which goes to the previous page.


<div class="meta-api-description">
How to customize previous page button tooltip in Kendo UI TreeList? Configure or customize the tooltip text, label, or hover message for the previous page button in pageable tree list navigation, enabling localization, translation, or setting descriptive text that appears when users hover over the backward page control, supporting internationalization and enhancing user interface clarity for paging backwards in hierarchical grids or lists.
</div>

#### Example - setting the Tooltip of the previous page button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                messages: {
                    previous: "Previous page"
                }
            }
        });
    </script>

### pageable.messages.refresh `String` *(default: "Refresh")*,

The tooltip of the **Refresh** button.


<div class="meta-api-description">
How can I customize the tooltip for the refresh button in a Kendo UI TreeList? Customize, configure, or localize the tooltip text, hover text, or button label shown on the refresh control within a paginated tree list or pageable grid interface, enabling developers to set descriptive, accessible, and context-specific strings that appear when users hover over or focus on the refresh button to reload or update the current page of hierarchical or tabular data.
</div>

#### Example - setting the Tooltip of the **Refresh** button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
                pageSize: 2,
                refresh: true,
                messages: {
                    refresh: "Refresh the treelist"
                }
            }
        });
    </script>

### pageable.messages.morePages `String` *(default: "More pages")*,

The tooltip of the **...** (ellipsis) button which appears when the number of pages is greater than the `buttonCount`.


<div class="meta-api-description">
How do I customize the "more pages" message in a Kendo UI TreeList? Customize or configure the tooltip text, label, or message displayed on the pagination ellipsis button when navigating through multiple pages, particularly when the total pages exceed the visible button count, enabling control over user interface hints, pagination prompts, or "more pages" indicators in hierarchical or tree-structured list components.
</div>

#### Example - setting the Tooltip of the ellipsis button

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
              { field: "id" },
              { field: "name" }
            ],
            dataSource: {
                data: [
                  { id: 1, parentId: null, name: "item 1" },
                  { id: 2, parentId: 1, name: "item 2" },
                  { id: 3, parentId: 1, name: "item 3" },
                  { id: 4, parentId: 1, name: "item 4" },
                ]
            },
            pageable: {
              pageSize: 1,
              buttonCount: 2,
              refresh: true,
              messages: {
                  morePages: "More pages"
              }
            }
        });
    </script>

### pdf `Object`

Configures the PDF export settings of the TreeList.


<div class="meta-api-description">
How to export TreeList data as a PDF with custom page layout and margins? Configure and customize exporting hierarchical or tabular data structures to PDF, including setting file names, page dimensions like paper size and orientation (portrait or landscape), adjusting margins and scaling to fit content, repeating headers across pages for clarity, and managing proxy settings for network environments. Enable precise control over PDF output formatting, such as specifying export options for page layout, printing preferences, and network configurations to ensure seamless, tailored generation of PDF documents from complex tree or list data presentations.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pdf: {
          fileName: "TreeListData.pdf",
          allPages: true
        }
      });
    </script>

### pdf.allPages `Boolean` *(default: false)*

Exports all TreeList pages, starting from the first one.

> **Note:** Chrome is known to crash when generating very large PDF-s.  A solution to this is to include the
> [Pako](http://nodeca.github.io/pako/) library. Simply loading this library with a `<script>` tag will enable compression in PDF, e.g.:
>
> `<script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>`


<div class="meta-api-description">
How to export all pages of a TreeList to PDF? Control exporting all data rows across multiple pages of a hierarchical or multi-page list to PDF by enabling full document export, configure output to include every page from the first to the last in the generated PDF, set options to capture complete tree or list content during PDF generation regardless of pagination, ensure exporting entire datasets without limiting to visible or current pages, manage pagination handling to produce one cohesive PDF of all pages, support comprehensive PDF export including all nested or paged items, adjust settings to toggle full versus partial content export in PDF, handle large multi-page structures in PDF output, and utilize compression techniques to prevent browser crashes when exporting large PDFs.
</div>

#### Example - export all pages

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
            allPages: true
        },
        pageable: {
          pageSize: 10
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.author `String` *(default: null)*

The author of the PDF document.


<div class="meta-api-description">
How do I set the author metadata in a PDF exported from a Kendo UI TreeList? Control or configure the PDF author metadata embedded during export, specifying the document creator name to ensure PDF viewers, indexing systems, search tools, and printed or shared files recognize and display the author information properly, enabling customization of author details in generated PDF files from hierarchical or tree-structured data exports.
</div>

#### Example - setting the author

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
            author: "John Doe"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> **Note:** Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.


<div class="meta-api-description">
How do I automatically print PDFs generated from my Kendo UI TreeList control? Control whether a PDF export from a TreeList triggers the print dialog automatically upon loading, enabling or disabling automatic printing prompts when generating or exporting PDF documents, configuring the behavior of print preview popups, setting up automatic print dialogs in PDF viewers during export, managing user prompts for printing PDFs created from data grids or tree structures, adjusting export settings to initiate printing workflows instantly after PDF generation, handling compatibility with PDF reader applications that may block or restrict automatic print dialogs, controlling whether to open print previews or send print commands programmatically after exporting hierarchical data to PDF format.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pdf: {
          autoPrint: true
        }
      });
    </script>

### pdf.avoidLinks `Boolean|String` *(default: false)*

(Available as of the 2015.3.1020 release) A flag which indicates whether to produce actual hyperlinks in the exported PDF file. You can also pass a CSS selector as an argument. All matching links will be ignored.


<div class="meta-api-description">
How to prevent clickable links from appearing in TreeList PDF exports using Kendo UI for jQuery? Control inclusion or exclusion of clickable hyperlinks in TreeList PDF exports by setting options to avoid or disable link generation, configure boolean flags to enable or prevent embedding active URLs, specify CSS selectors to omit or ignore certain hyperlinks during PDF creation, manage how links appear or function in exported documents, control hyperlink activation, and customize linked content handling in exported PDFs for better output formatting and link suppression as needed.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pdf: {
          avoidLinks: true
        }
      });
    </script>

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.


<div class="meta-api-description">
How to set creator metadata for PDFs exported from Kendo UI TreeList? Specify or customize the author or creator metadata for PDF documents generated from hierarchical or tree-structured data exports, enabling control over the PDF's "Creator" information field when configuring or initializing export settings; set, define, or change the document creator string to label who generated the PDF output, support identifying the source application or author in exported reports, and manage PDF metadata for proper attribution and tracking in document workflows involving tree-like data exports.
</div>

#### Example - setting the creator

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          creator: "John Doe"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.


<div class="meta-api-description">
How do I customize the date in Kendo UI TreeList exported PDFs? Control or customize the creation date and time metadata embedded in exported PDF documents from hierarchical or tree-structured lists by setting or overriding the default timestamp with a specific JavaScript Date object, enabling precise configuration of document creation timestamps for PDF metadata, digital stamping, or archival purposes in TreeList exports.
</div>

#### Example - setting the date

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          date: new Date("2014/10/10")
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.


<div class="meta-api-description">
How do I customize the file name when exporting a tree list to PDF in Kendo UI for jQuery? Control and specify the output file name for PDF exports generated from tree-structured lists or hierarchical data views, enabling customization of the PDF download filename when saving or exporting content. Configure or set the exported document’s filename to organize, identify, or standardize the PDF files created from data grids or tree list components. This customization supports scenarios like automating export workflows, defining naming conventions, controlling saved PDF titles, and ensuring clarity and consistency for downloaded hierarchical data snapshots.
</div>

#### Example - setting the default PDF file name

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          fileName: "Employees.pdf"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*

If set to `true`, the content will be forwarded to [`proxyURL`](/api/javascript/ui/treelist#configuration-pdf.proxyURL) even if the browser supports the local saving of files.


<div class="meta-api-description">
How do I force Kendo UI TreeList PDF exports to go through a proxy URL? Control whether PDF exports from a tree-structured data list are sent through a server proxy URL regardless of browser capabilities to save files locally, enabling overriding default local saving behavior by forcing export data to be uploaded via a proxy endpoint, useful for centralized processing, access control, or compliance needs when generating downloadable PDFs from hierarchical data components.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pdf: {
          forceProxy: true,
          proxyURL: "/save"
        }
      });
    </script>

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.


<div class="meta-api-description">
How do I control the image quality in PDF exports for a Kendo UI TreeList? Adjust the quality setting for JPEG images embedded in exported PDF files to manage the balance between image clarity and file size, allowing configuration of compression levels from low to high fidelity by specifying a value between 0 and 1; this enables control over output image sharpness, compression strength, PDF image resolution, and overall document size optimization when saving TreeList data as PDFs.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pdf: {
          jpegQuality: 0.8
        }
      });
    </script>

### pdf.keepPNG `Boolean` *(default: false)*

If set to true all PNG images contained in the exported file will be kept in PNG format.


<div class="meta-api-description">
How to keep PNG images intact when exporting TreeList data to PDF? Control whether PNG images within exported PDF files retain their original PNG format or are converted to other image types when exporting hierarchical or tree-structured lists to PDF. Enable or disable preserving embedded PNG graphics exactly as-is during export to maintain image quality, transparency, or resolution. Configure the export process to keep PNGs intact in the final PDF output rather than converting to JPEG or other formats, supporting scenarios where users want to preserve image fidelity, transparency layers, or detailed graphics embedded within exported tree or list data. This setting affects how embedded bitmap images are handled in PDF exports of structured data displays, ensuring original PNG images stay as PNGs to avoid quality degradation or format changes.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pdf: {
          keepPNG: true
        }
      });
    </script>

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.


<div class="meta-api-description">
How do I add searchable keywords to PDF exports from a Kendo UI TreeList component? Configure, set, or embed searchable keywords, metadata tags, or index terms into exported PDF files to enhance discoverability and search engine optimization within PDFs generated from hierarchical or tabular data components. Enable custom PDF metadata entries such as keyword strings, searchable descriptors, content tags, or indexing terms to improve PDF viewer search functionality, text retrieval, and content filtering for TreeList- or grid-based exports. Control PDF export properties to include relevant search keywords, terms, or labels that facilitate quick access, filtering, and semantic search across exported documents created from complex data structures.
</div>

#### Example - setting the keywords

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          keywords: "northwind products"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.landscape `Boolean` *(default: false)*

If set to `true`, reverses the paper dimensions in such a way that the width becomes the larger edge.


<div class="meta-api-description">
How to set landscape orientation for PDF export in Kendo UI TreeList? Control PDF export orientation to switch the page layout to landscape mode by adjusting paper dimensions so the width is greater than height, enabling horizontal page layout when exporting or printing tabular or hierarchical data views; configure, enable, or set landscape orientation for PDF output to flip page orientation from portrait to landscape for wider data presentation in documents.
</div>

#### Example - enabling the landscape mode

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          landscape: true
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.margin `Object`

Specifies the margins of the page and accepts numbers or strings with units.

The supported units are:

* `mm`
* `cm`
* `in`
* (Default) `pt`


<div class="meta-api-description">
How do I adjust the margins for a PDF export from a Kendo UI TreeList? Adjust or configure page margins for PDF export from TreeList to control layout spacing and printable areas with flexible units like millimeters, centimeters, inches, or points. Customize or set margin sizes to refine page formatting, print boundaries, and content alignment when saving TreeList data as PDF files. Manage printable margins in various measurement units to optimize page setup, document appearance, and export precision for TreeList-generated PDFs.
</div>

#### Example - setting the margins

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          margin: {
            left: 10,
            right: "10pt",
            top: "10mm",
            bottom: "1in"
          }
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as `pt` units.


<div class="meta-api-description">
How do I set the bottom margin when exporting a tree structure to PDF with Kendo UI TreeList? Set or configure the bottom page margin when exporting data grids or tree structures to PDF to adjust the spacing between the page content and the bottom edge, controlling page layout, content padding, and preventing cutoff or overlap at the page base. Customize, define, or specify the margin size in points to influence PDF pagination, white space, and overall document formatting during export processes for hierarchical or tabular data presentations.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pdf: {
          margin: {
            bottom: 20
          }
        }
      });
    </script>

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as `pt` units.


<div class="meta-api-description">
How do I adjust the left margin size when exporting a TreeList to PDF? Adjust or configure the left page margin size for PDF exports of hierarchical or tabular data, set the left whitespace or padding on the page when printing or saving grid, tree, or list structures as PDF, control the left-hand spacing to manage page layout and prevent content cutoff on the left side, specify or define margin width in points to customize output formatting, enable precise positioning of exported data in PDFs by setting left margin measurements, manage printable area boundaries on the left edge during PDF generation for tree or list views, control horizontal offset or indentation when exporting structured data to PDF formats.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pdf: {
          margin: {
            left: 25
          }
        }
      });
    </script>

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as `pt` units.


<div class="meta-api-description">
How do I adjust the right margin in PDF exports for a Kendo UI TreeList? Adjust or configure the right page margin in PDF exports to manage page layout, control the whitespace on the right side, set precise spacing in points for proper pagination, customize document formatting for TreeList data, fine-tune export appearance by defining the right boundary margin, enable setting numeric values for right margin size in PDF output, control page edge spacing during PDF generation, influence page breaking and alignment by modifying right margin parameters, optimize export layout by configuring right-side padding in PDFs, set right margin measurements to format TreeList content accurately in exported PDF files.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pdf: {
          margin: {
            right: 25
          }
        }
      });
    </script>

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as `pt` units.


<div class="meta-api-description">
How do I adjust the top margin when exporting data from a TreeList to PDF? Adjust or set the upper page margin spacing when exporting hierarchical or tree-structured data to PDF format, enabling customization of top whitespace or padding in points, millimeters, or standard units to control how much blank space appears at the top edge of PDF pages, useful for aligning headers, avoiding content clipping, or meeting print layout specifications during PDF generation from a data tree component or structured list.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pdf: {
          margin: {
            top: 25
          }
        }
      });
    </script>

### pdf.paperSize `String|Array` *(default: "auto")*

Specifies the paper size of the PDF document. The default `auto` setting means that the paper size is determined by the content.

The supported values are:

* A predefined size such as `A4`, `A3`, and so on.
* An array of two numbers which specify the width and height in points (1pt = 1/72in).
* An array of two strings which specify the width and height in units. The supported units are:
  * `mm`
  * `cm`
  * `in`
  * `pt`

> The size of the content in pixels will match the size of the output in points (1 pixel = 1/72 inch).


<div class="meta-api-description">
How to set custom paper size for exporting PDF from Kendo UI TreeList? Set or customize the page dimensions, layout, or paper size for exporting PDF documents from hierarchical or tree-structured data, specifying standard paper formats like A4, A3, or custom dimensions in points, inches, centimeters, or millimeters; control the output page width and height precisely for printing, layout consistency, and formatting, including flexible options to define exact sizes as numeric arrays or unit-based strings, enable auto-sizing based on content dimensions, and adjust scaling to ensure pixel-to-point accuracy for professional PDF export and page setup in tree or list data presentations.
</div>

#### Example - setting a custom paper size

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          paperSize: ["20mm", "20mm"]
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user. A proxy will be used when the browser is not capable of saving files locally. Such browsers are IE version 9 and earlier, and Safari. The developer is responsible for implementing the server-side proxy. The proxy will return the decoded file with the `Content-Disposition` header set to `attachment; filename="<fileName.pdf>"`.

The proxy will receive a POST request with the following parameters in the request body:

* `contentType` - The MIME type of the file.
* `base64` - The base-64 encoded file content.
* `fileName` - The file name, as requested by the caller.


<div class="meta-api-description">
How to enable file downloads in Internet Explorer 9 and earlier with Kendo UI for jQuery TreeList? Configure or set a server-side proxy URL to stream or deliver exported PDF files through a backend endpoint, enabling file downloads especially in browsers like Internet Explorer 9 and earlier or Safari that cannot save files locally; this includes posting base64-encoded PDF content, content type, and filename to a proxy service that returns the decoded PDF with appropriate content-disposition headers for attachment, supporting use cases for file streaming, proxy-based PDF delivery, server upload handling, managing file transfer limitations on older browsers, and ensuring reliable PDF export and download workflows through backend URL endpoints.
</div>

#### Example - setting the server proxy URL

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          proxyURL: "/save"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword whcih indicates where to display the document that was returned by the proxy. To display the document in a new window or iframe, the proxy will set the `Content-Disposition` header to `inline; filename="<fileName.pdf>"`.


<div class="meta-api-description">
How do I customize where my TreeList PDF is displayed in Kendo UI for jQuery? Configure where the exported TreeList PDF is displayed by specifying a target such as a new window, iframe, or named frame for rendering the PDF output. Control or set the display destination for proxy-generated PDF files, enabling inline viewing within the page or directing the PDF to open in a separate tab, embedded frame, or custom container. Adjust output behavior to manage whether the PDF is shown embedded inline, downloaded, or rendered in an external window or frame, using relevant target keywords or names to control presentation and user interaction with exported PDF documents.
</div>

#### Example - opening the generated document in a new window

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
            forceProxy: true,
            proxyURL: "/save",
            proxyTarget: "_blank"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.


<div class="meta-api-description">
How do I customize the subject metadata in Kendo UI TreeList PDF exports? Configure or set the PDF document's subject metadata, control the file's subject string visible in PDF viewers, specify or customize the document property that describes the content theme during export or initialization, adjust the PDF subject tag to reflect report purpose, enable setting descriptive metadata for TreeList exports, define the subject information embedded in the PDF file for identification, update or assign the PDF subject attribute to enhance document context or classification before exporting the hierarchy data, control the text shown in the PDF properties under the subject field to improve searchability and organization.
</div>

#### Example - setting the subject

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          subject: "Employees"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.


<div class="meta-api-description">
How to set custom title for PDF export in Kendo UI TreeList? Configure the exported PDF document title or metadata when saving or downloading hierarchical grid data as a PDF file, enabling setting, customizing, or controlling the printable document name, file title, or PDF viewer header that identifies the export output, useful for labeling, organizing, or distinguishing TreeList or hierarchical data exports, allowing developers to specify the document title shown in PDF readers, print jobs, or file properties to reflect content context, user preferences, or branding.
</div>

#### Example - setting the title

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        pdf: {
          title: "Employees"
        },
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### rowTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders rows. By default renders a table row (`<tr>`) for every data source item.

> The outermost HTML element in the template must be a table row (`<tr>`). That table row must have the `uid` data attribute set to `#= uid #`. The treelist uses the `uid` data attribute to determine the data to which a table row is bound to.


<div class="meta-api-description">
How to customize row appearance in Kendo UI TreeList? Customize or control the rendering and visual layout of each individual row within hierarchical, tree-structured data grids or tables, enabling developers to define, configure, or set custom templates or HTML structures to replace default table rows. This includes overriding the default row rendering behavior, providing custom markup or components for rows, specifying row templates that ensure proper data binding by associating unique identifiers or data attributes with each row element for selection, editing, mapping to data source entries, and other data manipulation tasks. Common use cases involve personalizing row appearance, injecting dynamic content, and controlling row structure in TreeList or similar grid-based hierarchical UI components.
</div>

#### Example - specify row template as a function

        <div id="treelist"></div>
        <script id="template" type="text/x-kendo-template">
            <tr class="k-table-row" data-uid="#= data.model.uid #" role="row" >
                <td class="k-table-td" colspan="2">
                    #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                    	<span class="k-icon k-i-none"></span>
                		#}#
                 		# if (data.hasChildren) { #
                    	# if(data.model.expanded) { #
                          #= kendo.ui.icon("caret-alt-down") #
                    	# } else { #
                          #= kendo.ui.icon("caret-alt-right") #
                    	# } #
                		# } #
                    <strong>#: data.model.lastName # </strong>
                    <strong>#: data.model.position #</strong>
                </td>
            </tr>
        </script>
        <script id="altTemplate" type="text/x-kendo-template">
          <tr class="k-table-row k-alt" data-uid="#= data.model.uid #" role="row" >
              <td class="k-table-td" colspan="2">
                  #for(var i = 0; i < (hasChildren ? level : (level + 1)); i++){#
                  	<span class="k-icon k-i-none"></span>
              		#}#
               		# if (data.hasChildren) { #
                  	# if(data.model.expanded) { #
                        #= kendo.ui.icon("caret-alt-down") #
                  	# } else { #
                        #= kendo.ui.icon("caret-alt-right") #
                  	# } #
              		# } #
                  <strong>#: data.model.lastName # </strong>
                  <strong>#: data.model.position #</strong>
              </td>
          </tr>
        </script>
        <script>
          $("#treelist").kendoTreeList({
            rowTemplate: kendo.template($("#template").html()),
            altRowTemplate: kendo.template($("#altTemplate").html()),
            columns: [
              { field: "lastName" }
            ],
            dataSource: {
              data: [
                { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
                { id: 2, parentId: 1, lastName: "Weber", position: "VP, Engineering" },
                { id: 3, parentId: 2, lastName: "Jason", position: "Director, Engineering" }
              ]
            }
          });
        </script>

### scrollable `Boolean|Object` *(default: true)*

If set to `true`, the TreeList will display a scrollbar when the total row height or width exceeds the TreeList height or width. By default, scrolling is enabled. Scrolling renders separate tables for the header and data area. For accessibility-conscious applications, disable scrolling.


<div class="meta-api-description">
How do I enable scrolling in Kendo UI TreeList when content overflows? Control whether the TreeList shows scrollbars by enabling or disabling scrolling when the content overflows the visible area, affecting vertical and horizontal navigation; configure scrolling behavior to handle large datasets with automatic scrollbars or disable scrolling for improved accessibility, fixed layouts, or to prevent header and data section separation, allowing developers to set, toggle, or customize scroll functionality, overflow handling, and layout responsiveness in hierarchical grid views.
</div>

#### Example - disabling scrolling

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "FirstName", title: "First Name" },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        scrollable: false,
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              fields: {
                parentId: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        }
      });
    </script>

### search `Object`

Configures the Kendo UI TreeList search bar settings.


<div class="meta-api-description">
How to customize the search feature in Kendo UI TreeList? Configure and customize a data grid search feature to let users quickly filter and query rows by typing keywords or phrases, including enabling or disabling the search input field, setting placeholder or hint text, defining which columns or fields are searchable, choosing filter operators like contains or equals, controlling case sensitivity during searches, adjusting debounce timing to limit rapid input processing, and managing the visibility of clear buttons to reset the search input for improved user interaction and efficient data retrieval within tree or hierarchical list structures.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        toolbar: ["search"],
        search: {
          fields: ["Name", "Position"]
        }
      });
    </script>

### search.fields `Array`

Defines a list of fields which will be included in the search. If values for the property are not defined the treelist will search in all column fields.


<div class="meta-api-description">
How do I restrict Kendo UI TreeList search to specific columns? Customize and limit searchable columns by specifying an array of data field names to control which fields are included in search and filtering operations, enabling precise matching of column values; if no specific fields are set, the search defaults to all columns, allowing configuration to focus or broaden search scope, filter by selected data properties, restrict searches to particular attributes, enable targeted search within designated columns, set search fields explicitly, and manage which dataset fields are queried during text matching or filtering processes in tabular or hierarchical data views.
</div>

#### Example - specify which fields will be included in the search

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        toolbar:["search"],
        search: {
          fields: ["name"] // Or, specify multiple fields by adding them to the array, e.g ["name", "age"]
        },
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
    </script>

### selectable `Boolean|String` *(default: false)*

If set to `true`, the user will be able to select TreeList rows. By default, selection is disabled.

Can also be set to the following string values:

- `row` - The user can select a single row.
- `cell` - The user can select a single cell.
- `multiple, row` - The user can select multiple rows.
- `multiple, cell` - The user can select multiple cells.


<div class="meta-api-description">
How do I enable multiple row selection in Kendo UI TreeList widget? Enable or configure user interaction for selecting items within a hierarchical data grid, allowing control over whether users can pick individual rows or single cells, as well as support single or multiple selection modes. This feature covers enabling row selection, cell selection, multiple row or cell selection, toggling selection capabilities on or off, managing user click behavior to highlight or choose specific parts of a tree-structured list, and customizing how users can highlight data entries or cells within a nested table or tree table. It supports use cases such as activating selection for picking one or many rows, choosing individual cells for editing or copying, setting selection modes for single or multiple items, and controlling whether selection persists during user navigation or interaction.
</div>

#### Example - setting selectable as a Boolean

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        selectable: true,
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
    </script>

#### Example - setting selectable as a string

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        selectable: "multiple, row",
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
    </script>

### sortable `Boolean|Object` *(default: false)*

If set to `true`, the user is able to sort the TreeList by clicking the column header cells. By default, sorting is disabled. Can be set to a JavaScript object which represents the sorting configuration.


<div class="meta-api-description">
How do I enable sorting in a Kendo UI TreeList column? Control the ability to activate or configure interactive sorting of columns in a hierarchical or tree-structured data grid, allowing users to click on column headers to sort rows ascending or descending. Enable or disable sortable column headers, define custom sorting behaviors, specify sorting modes, or set initial sorting states programmatically. Manage user-driven column sorting by toggling header click interactions, setting sorting parameters via configuration objects, or controlling multi-column sorting preferences in expandable tree lists or nested data views.
</div>

#### Example - enabling sorting

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: true,
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
    </script>

### sortable.allowUnsort `Boolean` *(default: true)*

If set to `true`, the user can get the TreeList in its unsorted state by clicking the sorted column header.


<div class="meta-api-description">
How can I allow users to unsort TreeList columns by clicking headers? Enable or disable the ability for users to toggle sorting on columns by clicking headers, including clearing or removing active sort orders to revert the list to an unsorted state, controlling whether clicking a sorted column header resets sorting or maintains a fixed sorted view, configuring interactive column sorting behavior with options to allow unsorting, cancel sorting, reset order, or prevent toggling sort state in a tree-structured list or table interface.
</div>

#### Example - preventing unsorting

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          allowUnsort: false
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ],
          sort: { field: "name", dir: "asc" }
        }
      });
    </script>

### sortable.mode `String` *(default: "single")*

The sort mode. If set to `single`, the user can sort by one column at a time. If set to `multiple`, the user can sort by multiple columns.


<div class="meta-api-description">
How to set sorting behavior for hierarchical data in Kendo UI TreeList? Control sorting behavior in hierarchical or nested lists, enabling single-column sorting to organize data by one attribute at a time or multi-column sorting to sort by several fields simultaneously; configure how users can order tree-structured data, manage sorting priorities across columns, set sorting modes to single or multiple criteria, and customize sorting interaction in expandable or collapsible tree views.
</div>

#### Example - allowing the multiple column sort mode

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 },
            { id: 4, parentId: 1, name: "John Doe", age: 22 }
          ],
          sort: { field: "name", dir: "asc" }
        }
      });
    </script>

### toolbar `String|Function|Array|Object`

* If a `String` value is assigned to the `toolbar` configuration option, it will be treated as a single string template for the whole TreeList toolbar and the string value will be passed as an argument to a [`kendo.template()`](/api/javascript/kendo/methods/template) function.
* If a `Function` value is assigned (it may be a `kendo.template()` function call or a generic function reference), then the return value of the function will be used to render the contents of the TreeList toolbar.
* If an `Array` value is assigned, it will be treated as the list of commands which are displayed in the TreeList toolbar. Commands can be custom or built-in. The supported built-in commands are:
  * `create` - Adds an empty data item to the treelist.
  * `excel` - Exports the TreeList data in MS Excel format.
  * `pdf` - Exports the TreeList data in PDF format.
  * `search` - built-in search panel for the TreeList.
* If an `Object` value is assigned, it will propagate these properties to the underlying Toolbar:
  * `items` - an array of commands as explained above
  * `overflow` - an object that configures the overflow behavior of the toolbar. The same as [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) property


<div class="meta-api-description">
How do I customize the toolbar in Kendo UI for jQuery TreeList component? Configure and customize the toolbar of a hierarchical data grid or tree-like list by specifying how it is displayed and which built-in or custom commands appear, enabling options such as adding new items, exporting data to Excel or PDF formats, integrating a search panel, or controlling overflow behavior. Adjust toolbar rendering using string templates, template functions, arrays of command definitions, or detailed configuration objects that allow binding custom actions, extending functionality, and controlling layout overflow to tailor the user interaction and visual presentation of actions like create, export, and search within a tree-structured list interface.
</div>

#### Example - configuring the TreeList toolbar as a string template

      <div id="treeList"></div>
      <script>
        $("#treeList").kendoTreeList({
          toolbar: "<p>My string template in a paragraph.</p>",
          columns: [
            { field: "name" },
            { field: "age" }
          ],
          sortable: {
            mode: "multiple"
          },
          dataSource: {
            data: [
              { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
              { id: 2, parentId: 1, name: "John Doe", age: 24 },
              { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
            ]
          }
        });
      </script>

#### Example - configuring the TreeList Toolbar template with a function and including the built in search functionality

    <div id="treeList"></div>
    <script type="text/x-kendo-template" id="template">
			<a class="k-button" href="\#" onclick="return toolbar_click()">Command</a>
      <span class="k-textbox k-grid-search k-display-flex">
          <input autocomplete="off" placeholder="Search..." title="Search..." class="k-input">
          <span class="k-input-icon">
              <span class="k-icon k-i-search"></span>
          </span>
      </span>
    </script>
    <script>
      function toolbar_click() {
        kendo.alert("Toolbar command is clicked!");
        return false;
      }

      $("#treeList").kendoTreeList({
        toolbar: kendo.template($("#template").html()),
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

#### Example - configuring the TreeList toolbar as an array of commands

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["excel", "pdf", "search"],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

Apart from the built-in tools, the TreeList fully exposes the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the widget using the components available in the ToolBar itself. Note that all tools (commands) must have their name specified:

#### Example

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [ {
            name: "btn-cmd",
            type: "button",
            text: "Button"
        }, {
            name: "toggle-cmd",
            type: "button",
            text: "Toggle",
            togglable: true,
            icon: "cancel"
        }, {
            name: "split-cmd",
            type: "splitButton",
            text: "SplitButton",
            menuButtons: [{text: "Option 1"}, {text: "Option 2"}]
        } ],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

### toolbar.click `Function`

The `click` handler of the toolbar command. Used for custom toolbar commands.


<div class="meta-api-description">
How to customize toolbar button click actions in Kendo UI TreeList? Configure or customize toolbar button click actions, set event handlers for toolbar command interactions, define functions that run when toolbar commands are clicked, handle or control toolbar button events, enable custom logic execution on toolbar command clicks, manage toolbar action callbacks, trigger component methods through toolbar clicks, implement event-driven responses for toolbar buttons, program toolbar command click handlers, and define behavior for user interactions with toolbar controls.
</div>

#### Example - specifying the name of the command

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [
          { name: "custom", click: function() { alert("custom"); } }
        ],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

### toolbar.icon `String`

Specifies the icon's name that will be rendered inside the toolbar button. When you set this option, the TreeList renders an additional `span` element inside the toolbar button which has a name set to the `option` value. This approach allows you to display an icon inside your custom toolbar commands.


<div class="meta-api-description">
How do I set a custom icon for toolbar buttons in my TreeList? Configure or set a custom icon for toolbar buttons within a hierarchical or tree-structured list interface to visually represent commands, actions, or features; control the appearance by specifying icon names that integrate font icons, sprite icons, or symbolic graphics inside toolbar buttons for better user recognition and usability; enable adding graphical markers, symbols, or icons dynamically to toolbars in tree views, allowing developers to customize command buttons with distinctive visual elements for enhanced navigation and interaction cues.
</div>

#### Example - specifying the name of the command

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [{name: "custom", text: "About", icon: "info-circle", imageClass: "custom-info" }],
        columns: [
          "lastName",
          "position"
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
        ]
      });
    </script>

### toolbar.imageClass `String`

A class name that will be rendered inside the toolbar button. When you set this option, the TreeList renders an additional `span` element inside the toolbar button which has a class name set to the `option` value. This approach allows you to display an icon inside your custom toolbar commands.


<div class="meta-api-description">
How do I customize the icons in my Kendo UI TreeList toolbar? Configure or set a custom icon for toolbar buttons in a hierarchical tree list interface by assigning CSS class names that render icon fonts or styled elements within toolbar commands; control visual indicators or graphical representations in toolbar items by specifying classes that dynamically insert styled spans or iconography inside buttons, enabling enhanced customization of toolbar commands, visual styling of tree list toolbars, and integration of custom icons through class-based styling techniques.
</div>

#### Example - specifying the name of the command

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [{name: "custom", text: "About", icon: "info-circle", imageClass: "custom-info" }],
        columns: [
          "lastName",
          "position"
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "  VP, Engineering" }
        ]
      });
    </script>

### toolbar.name `String`

The name of the toolbar command. Can be either a built-in ("create", "excel", or "pdf") or a custom string. The `name` is output in the HTML as a value of the `data-command` attribute of the button.


<div class="meta-api-description">
How to customize toolbar buttons in Kendo UI TreeList? Configure or set the identifier for toolbar commands within a hierarchical grid interface, enabling customization and control over toolbar buttons by specifying built-in commands like create, export to Excel, or PDF, or by defining custom command strings to target specific buttons via data attributes for styling, event handling, or initialization purposes in interactive tree-structured data lists.
</div>

#### Example - specifying the name of the command

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [
          { name: "custom", click: function() { alert("custom"); } }
        ],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>


### toolbar.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the command. By default renders a button. Uses the template for a ToolBar item [toolbar.items.template](/api/javascript/ui/toolbar/configuration/items.template)


<div class="meta-api-description">
How do I customize the rendering of toolbar commands in Kendo UI TreeList component? Control and customize the rendering of toolbar commands within hierarchical list components by specifying custom templates or markup that replace default buttons, enabling developers to configure toolbar buttons with personalized HTML, dynamic data bindings, icons, labels, and interactive content. Adjust or override toolbar item appearances in tree-structured data views by providing templates that support flexible UI elements for commands, allowing customization of button rendering, command presentation, icon inclusion, label changes, and dynamic behavior within toolbar toolkits associated with hierarchical list interfaces.
</div>

#### Example - set the template as a function

    <div id="treelist"></div>
    <script id="template" type="text/x-kendo-template">
    <a class="k-button" href="\#" onclick="return toolbar_click()">Command</a>
    </script>
    <script>
    function toolbar_click() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Toolbar command is clicked!");
      return false;
    }
    $("#treelist").kendoTreeList({
      toolbar: [
        { template: kendo.template($("#template").html()) }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    </script>

> Check [Toolbar template](https://demos.telerik.com/kendo-ui/treelist/toolbar-template) for a live demo.

#### Example - set the template as a string

    <div id="treelist"></div>
    <script>
    function toolbar_click() {
	/* The result can be observed in the DevTools(F12) console of the browser. */
      console.log("Toolbar command is clicked!");
      return false;
    }
    $("#treelist").kendoTreeList({
      toolbar: [
        {
          template: '<a class="k-button" href="\\#" onclick="return toolbar_click()">Command</a>'
        }
      ],
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
          { name: "Jane Doe", age: 30 },
          { name: "John Doe", age: 33 }
      ]
    });
    </script>


### toolbar.text `String`

The text that is displayed by the command button. If not set, the TreeList will use the [`name`](/api/javascript/ui/treelist#configuration-toolbar.name)` option as the button text instead.


<div class="meta-api-description">
How do I customize the text on toolbar buttons in a Kendo UI TreeList? Customize the label or text displayed on toolbar buttons within a hierarchical list or tree view interface, enabling developers to specify custom command captions, button titles, or control the text string shown on action buttons for clearer user interaction. This includes setting personalized names, captions, or labels for toolbar commands, overriding default identifiers or internal button names to enhance UI clarity, accessibility, and localization by defining explicit text values instead of relying on automatic or preset command names.
</div>

#### Example - specifying the text for the command button

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: [
          { name: "custom", text: "My Command" }
        ],
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        sortable: {
          mode: "multiple"
        },
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
            { id: 2, parentId: 1, name: "John Doe", age: 24 },
            { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
          ]
        }
      });
    </script>

### toolbar.items `Array`

A JavaScript array that contains the ToolBar's commands configuration.


<div class="meta-api-description">
How do I customize the toolbar items in my Kendo UI TreeList control? Control and customize the toolbar commands, buttons, and controls within a hierarchical data grid or tree-structured list by defining the set, sequence, and configuration of toolbar items using an array of command definitions. Enable, arrange, add, remove, or configure toolbar actions like buttons, menus, or commands that appear above or within the tree-view list interface, supporting flexible command customization and ordering to enhance user interaction with expandable, collapsible, or editable tree data grids. Adjust toolbar options to tailor user experience, streamline actions, and manage toolbar controls dynamically for hierarchical data presentations.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        toolbar: {
          items: [
            { name: "pdf" },
            { name: "excel" },
            { name: "custom", text: "Custom", click: function() { console.log("Custom clicked"); } }
          ]
        }
      });
    </script>

### toolbar.items.click `Function`

The `click` handler of the toolbar command. Used for custom toolbar commands.


<div class="meta-api-description">
How do I handle click events on custom toolbar buttons in a Kendo UI TreeList? Configure custom toolbar button click handlers in tree list interfaces to run specific logic when toolbar commands are activated, handling user interactions by setting callbacks that receive event details including the original DOM event and component context, enabling developers to execute actions such as CRUD operations, open dialogs, modify or prevent default behaviors, respond to toolbar command clicks dynamically, and integrate custom command functionality within toolbar items of hierarchical grid or tree components.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        toolbar: {
          items: [
            {
              name: "custom",
              text: "Custom Action", 
              click: function(e) { 
                console.log("Custom action clicked"); 
                alert("Custom toolbar button clicked!");
              } 
            }
          ]
        }
      });
    </script>


### toolbar.items.icon `String`

Specifies the icon's name that will be rendered inside the toolbar button. When you set this option, the TreeList renders an additional `span` element inside the toolbar button which has a name set to the `option` value. This approach allows you to display an icon inside your custom toolbar commands.


<div class="meta-api-description">
How to customize icon in TreeList toolbar using Kendo UI for jQuery? Specify or configure the icon displayed within a toolbar button of a TreeList, enabling customization or enhancement of toolbar commands by setting the icon’s name, symbol, or identifier. Control the visual representation of buttons by adding graphic elements, symbols, or glyphs inside toolbar items, including setting icons for both built-in and custom toolbar commands, embedding icons by name or key, and adjusting toolbar button visuals for better user interface clarity, appearance, or branding. Use cases include enabling or changing toolbar button images, icons, symbols, or glyphs dynamically through configuration, tailoring toolbar controls with specific iconography, and managing toolbar button elements for improved navigation and usability in TreeList components.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        toolbar: {
          items: [
            {
              name: "settings",
              text: "Settings", 
              icon: "k-icon k-i-gear"
            }
          ]
        }
      });
    </script>


### toolbar.items.imageClass `String`

A class name that will be rendered inside the toolbar button. When you set this option, the TreeList renders an additional `span` element inside the toolbar button which has a class name set to the `option` value. This approach allows you to display an icon inside your custom toolbar commands.


<div class="meta-api-description">
How can I customize the icon class for toolbar buttons in a Kendo UI TreeList component? Configure or customize toolbar buttons in a hierarchical list component by assigning icon styles through CSS class names, enabling the display of font icons or image-based visuals inside toolbar commands. This feature supports adding visual indicators or symbols to toolbar buttons, allowing developers to control and enhance toolbar appearance by embedding icon classes that inject styled span elements within buttons. Useful for enabling, setting, or styling icons in tree-structured list toolbars, this approach facilitates seamless integration of custom icon fonts or CSS-driven graphics in toolbar controls for improved UI clarity and user interaction.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        toolbar: {
          items: [
            {
              name: "custom",
              text: "Custom", 
              imageClass: "custom-toolbar-icon"
            }
          ]
        }
      });
    </script>

### toolbar.items.name `String`

The name of the toolbar command. Can be either a built-in ("create", "excel", or "pdf") or a custom string. The `name` is output in the HTML as a value of the `data-command` attribute of the button.


<div class="meta-api-description">
How to configure custom button actions in Kendo UI TreeList? Configure and control toolbar button actions in hierarchical data views by assigning command identifiers or custom labels that link buttons to built-in functions like creating new entries, exporting to Excel, or saving as PDF, while enabling the setup of personalized commands using string names that act as references within event handlers or scripts, facilitating the triggering and management of specific toolbar operations through data-command attributes tied to each button element.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        toolbar: {
          items: [
            { name: "pdf", text: "Export to PDF" },
            { name: "excel", text: "Export to Excel" }
          ]
        }
      });
    </script>


### toolbar.items.template `String|Function`

The [template](/api/javascript/kendo/methods/template) which renders the command. By default renders a button. Uses the template for a ToolBar item [toolbar.items.template](/api/javascript/ui/toolbar/configuration/items.template)


<div class="meta-api-description">
How do I customize toolbar commands in Kendo UI TreeList? Customize toolbar commands in a tree list by defining templates to render buttons, icons, or fully personalized HTML content within the toolbar area, enabling developers to set, configure, or override default command appearances with Kendo UI templates or custom HTML strings. This supports injecting dynamic markup, configuring toolbar controls, implementing custom action buttons, and styling toolbar items beyond standard buttons, providing flexible ways to embed interactive elements, icons, or complex layouts in the tree list toolbar region.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        toolbar: {
          items: [
            { 
              template: (data) => `<button class='k-button' onclick='myFunction()'>Custom Button</button>`
            }
          ]
        }
      });
      
      function myFunction() {
        console.log("Custom template button clicked");
      }
    </script>


> Check [Toolbar template](https://demos.telerik.com/kendo-ui/treelist/toolbar-template) for a live demo.

### toolbar.items.text `String`

The text that is displayed by the command button. If not set, the TreeList will use the [`name`](/api/javascript/ui/treelist#configuration-toolbar.name)` option as the button text instead.


<div class="meta-api-description">
How do I change the text label on a TreeList toolbar button? Customize, configure, or set the text label displayed on toolbar buttons within a TreeList interface, enabling control over command button captions, names, or titles. Adjust button text to match specific commands, localize labels for different languages, modify default or preset button names, and tailor the display text for better user understanding, interface clarity, or branding purposes. Supports changing command names, captions, or visible text on toolbar controls to fit varied application requirements, user preferences, or internationalization needs.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        toolbar: {
          items: [
            { name: "pdf", text: "Export to PDF" },
            { name: "excel", text: "Export to Excel" }
          ]
        }
      });
    </script>

### toolbar.overflow `Object`
Specifies [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) configuration for the toolbar.


<div class="meta-api-description">
How do I handle overflowing toolbar items in Kendo UI TreeList? Control and configure the toolbar's handling of excess or overflowing items within hierarchical list interfaces, enabling developers to set behaviors for responsive layouts such as collapsing toolbar buttons, managing the appearance and functionality of a "More" dropdown or overflow popup, customizing how toolbar items reorder, hide, or group when space is limited, and adjusting overflow strategies to optimize usability and accessibility on different screen sizes or container widths.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        toolbar: {
          items: [
            { name: "pdf" },
            { name: "excel" },
            { name: "custom1", text: "Custom1" },
            { name: "custom2", text: "Custom2" }
          ],
          overflow: {
            mode: "menu"
          }
        }
      });
    </script>


### toolbar.overflow.mode `String` *(default: "menu")*

Defines the overflow mode. The available options are:
- `"menu"` — Moves overflowing items into a dropdown menu.
- `"scroll"` — Keeps items visible and enables horizontal scrolling.
- `"section"` — Groups items into collapsible sections.
- `"none"` — Disables overflow handling; items may be cut off.


<div class="meta-api-description">
How do I handle overflow in Kendo UI TreeList toolbar items? Configure how toolbar buttons or items behave when they exceed the visible width in a hierarchical list interface, enabling control over overflow handling by setting modes that either move excess elements into a dropdown menu, allow horizontal scrolling to reveal hidden tools, group items into expandable or collapsible sections for better organization, or disable overflow management altogether which may result in clipped or hidden toolbar items; this covers scenarios such as enabling smooth access to toolbar actions on limited screen space, customizing user interface responsiveness, managing tool visibility in complex nested lists, and deciding between scrollable toolbars versus condensed menus for optimal user experience.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        toolbar: {
          items: [
            { name: "pdf" },
            { name: "excel" },
            { name: "custom1", text: "Custom1" },
            { name: "custom2", text: "Custom2" }
          ],
          overflow: {
            mode: "scroll"
          }
        }
      });
    </script>


### toolbar.overflow.scrollButtons `String` *(default: "auto")*

Defines the visibility of scroll buttons when `mode` is `"scroll"`. The available options are:
- `"auto"` — Displays scroll buttons only when needed.
- `"hidden"` — Hides the scroll buttons at all times.
- `"visible"` — Always shows the scroll buttons.


<div class="meta-api-description">
How do I control scroll buttons in a tree list toolbar when using Kendo UI for jQuery? Control the visibility and behavior of navigation or scroll buttons for toolbar overflow in tree lists when using scroll mode, enabling options to always display, hide completely, or show buttons automatically only when scrolling is necessary; configure how to enable or disable scroll navigation, toggle button presence during overflow scenarios, set toolbar controls for managing horizontal or vertical overflow in lists or grids, and adjust user interface elements for improved navigation through overflowing content areas with customizable button visibility settings.
</div>

#### Example

    <div id="treelist"></div>
    <script>
    $("#treelist").kendoTreeList({
      columns: [
        { field: "name" },
        { field: "age" }
      ],
      dataSource: [
        { id: 1, parentId: null, name: "Jane Doe", age: 30 },
        { id: 2, parentId: 1, name: "John Doe", age: 33 }
      ],
      toolbar: {
        overflow: {
          mode: "scroll",
          scrollButtons: "visible"
        },
        items: [
          { name: "create" },
          { name: "save" },
          { name: "cancel" },
          { name: "pdf" },
          { name: "excel" }
        ]
      }
    });
    </script>

### toolbar.overflow.scrollButtonsPosition `String` *(default: "split")*

Defines the placement of scroll buttons. The available options are:
- `"split"` — Scroll buttons appear at both ends of the toolbar.
- `"start"` — Scroll buttons appear only at the start of the toolbar.
- `"end"` — Scroll buttons appear only at the end of the toolbar.


<div class="meta-api-description">
How do I configure the scroll buttons in Kendo UI TreeList toolbar to appear at both ends of the overflow? Configure the placement of toolbar overflow scroll buttons in the TreeList interface, enabling control over whether scrolling controls appear at the beginning, the end, or simultaneously on both edges of the toolbar; options include positioning scroll buttons only at the start, only at the end, or splitting them to show on both sides, which can be set during initialization to customize user navigation and improve toolbar scrolling behavior in lists with overflow content.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        toolbar: {
          items: [
            { name: "pdf" },
            { name: "excel" },
            { name: "custom1", text: "Custom1" },
            { name: "custom2", text: "Custom2" }
          ],
          overflow: {
            mode: "scroll",
            scrollButtonsPosition: "start"
          }
        }
      });
    </script>


### toolbar.overflow.scrollDistance `Number` *(default: 50)*

Specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked.


<div class="meta-api-description">
How can I adjust the scroll distance of my Kendo UI TreeList toolbar overflow navigation? Control the horizontal scroll amount or increment for toolbar overflow navigation by setting how many pixels the toolbar content moves when clicking overflow scroll buttons, enabling adjustment of scroll step size, scroll distance, or scroll offset to customize navigation through hidden or overflowed toolbar items, configuring the scroll shift for overflow areas, fine-tuning how far the toolbar shifts per user scroll action, adjusting scroll increments to improve toolbar usability and access to functions beyond visible boundaries.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        toolbar: {
          items: [
            { name: "pdf" },
            { name: "excel" },
            { name: "custom1", text: "Custom1" },
            { name: "custom2", text: "Custom2" }
          ],
          overflow: {
            mode: "scroll",
            scrollDistance: 100
          }
        }
      });
    </script>



## Fields

### columns `Array`

The columns of the TreeList that are initialized from the [`columns`](/api/javascript/ui/treelist#configuration-columns) option. Every item from the `columns` array has the same fields as the corresponding [`columns`](/api/javascript/ui/treelist#configuration-columns) option.


<div class="meta-api-description">
How can I dynamically change the display name of a column in my Kendo UI TreeList? Control and interact with the collection of column definitions used in a hierarchical data grid, enabling retrieval or adjustment of properties such as column fields, headers, labels, widths, templates, and metadata at runtime; access and modify individual column configurations dynamically to inspect or update aspects like display names, data bindings, formatting, visibility, and layout within the tree-structured table, supporting scenarios for customizing columns after initialization, managing column settings programmatically, and synchronizing column schema with user interface elements.
</div>

#### Example - iterating the TreeList columns

    <button id="countBtn">Log Column Names</button>
    <div id="treelist"></div>
    <script>
      $("#treelist").kendoTreeList({
        columns: [
          { field: "lastName" },
          { field: "position" }
        ],
        dataSource: [
          { id: 1, parentId: null, lastName: "Jackson", position: "CEO" },
          { id: 2, parentId: 1, lastName: "Weber", position: "	VP, Engineering" }
        ]
      });
      $("#countBtn").click(function(e){
        var treelist = $("#treelist").data("kendoTreeList");
        for (var i = 0; i < treelist.columns.length; i++) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(treelist.columns[i].field); // displays "lastName" and then "position"
        }
      });
    </script>

### table `jQuery`

The jQuery object which represents the TreeList `table` element.


<div class="meta-api-description">
How can I access the HTML table element in a Kendo UI TreeList to attach event handlers? Retrieve the rendered HTML table element as a jQuery object to enable querying DOM nodes, attaching event handlers, manipulating table rows and cells, measuring element dimensions, customizing styling, integrating third-party jQuery plugins, performing virtual scrolling optimizations, or implementing custom DOM updates within hierarchical tree grid structures.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      var treelist = $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      }).data("kendoTreeList");
      
      // Access the table element
      var table = treelist.table;
      console.log(table);
    </script>

### tbody `jQuery`

The jQuery object which represents the table body. Contains all TreeList table rows.


<div class="meta-api-description">
How do I access and manipulate the table body in a Kendo UI TreeList? Access and manipulate the table body element containing all TreeList rows to query, traverse, or update rows dynamically after initialization using jQuery selectors and methods; control row selection, bind event handlers to rows, modify row content or structure, perform DOM traversal and updates, and handle interactive behaviors within the table body for advanced customization and real-time changes in hierarchical data grids.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      var treelist = $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      }).data("kendoTreeList");
      
      // Access the tbody element
      var tbody = treelist.tbody;
      console.log(tbody);
    </script>

### thead `jQuery`

The jQuery object which represents the TreeList table header element.


<div class="meta-api-description">
How do I access the header element in a Kendo UI TreeList? Accessing and controlling the table header element in a TreeList or similar grid component involves manipulating the header DOM node, enabling developers to query header cells, modify header content, add or remove CSS classes, attach event listeners for interactions like clicks or hovers, measure header dimensions such as height, and dynamically update or customize the header layout. This includes tasks like configuring header styling, enabling custom header behavior, controlling header cell access for responsive adjustments, and integrating event-driven header modifications using jQuery or equivalent DOM manipulation techniques in table-based UI components.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      var treelist = $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      }).data("kendoTreeList");
      
      // Access the thead element
      var thead = treelist.thead;
      console.log(thead);
    </script>

### content `jQuery`

The jQuery object which represents the TreeList `content` element which holds the scrollable content. Available only when `scrollable` is set to `true`.


<div class="meta-api-description">
How do I access the scrollable area of a Kendo UI TreeList component? Retrieve or access the scrollable area or container element of a hierarchical list or tree structure for purposes such as measuring dimensions, handling scroll events, customizing scroll behavior, or manipulating the visible content area dynamically. This property provides a way to control, query, or interact with the scrollable region of a tree-style data display when scrolling is enabled, enabling developers to manage scroll position, trigger events on scroll changes, calculate viewport size, or implement custom scroll functionality on the main content pane of a nested or expandable list component.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      var treelist = $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        scrollable: true
      }).data("kendoTreeList");
      
      // Access the content element
      var content = treelist.content;
      console.log(content);
    </script>

### lockedHeader `jQuery`

The jQuery object which represents the TreeList locked `header` element. Available only in a TreeList with locked columns.


<div class="meta-api-description">
How to access the locked header in Kendo UI TreeList? Access and manipulate the locked header element of a TreeList or grid component when columns are fixed or frozen, enabling interaction with the locked header's DOM structure for querying, styling, attaching event listeners, measuring size and layout, or dynamically updating its appearance and behavior. This locked header access supports developers in controlling fixed column headers for consistent UI during scrolling, including retrieving the jQuery or DOM node representing the locked header for customized event handling, styling adjustments, dimension calculations, and other direct manipulations within grids or tables that implement column locking or freezing functionality.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      var treelist = $("#treelist").kendoTreeList({
        columns: [
          { field: "Name", locked: true },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      }).data("kendoTreeList");
      
      // Access the locked header element
      var lockedHeader = treelist.lockedHeader;
      console.log(lockedHeader);
    </script>

### lockedTable `jQuery`

The jQuery object which represents the TreeList locked `table` element. Available only in a TreeList with locked columns.


<div class="meta-api-description">
How can I access and manipulate the locked columns section of a Kendo UI TreeList? Access and control the locked columns section or locked pane of a TreeList to measure dimensions, update styles, attach event listeners, or manipulate the locked portion’s DOM element representing the fixed columns table. Retrieve, customize, or interact with the locked part of the grid or table via a jQuery object reference to the locked columns area, enabling developers to programmatically query, style, or respond to events within the fixed locked columns section of a hierarchical or tabular data structure when locked columns are enabled or configured.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      var treelist = $("#treelist").kendoTreeList({
        columns: [
          { field: "Name", locked: true },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      }).data("kendoTreeList");
      
      // Access the locked table element
      var lockedTable = treelist.lockedTable;
      console.log(lockedTable);
    </script>

### lockedContent `jQuery`

The jQuery object which represents the TreeList locked `content` element. Available only in a TreeList with locked columns.


<div class="meta-api-description">
How to access and customize the locked columns area in a Kendo UI TreeList? Control and interact with the frozen or locked columns area in a TreeList by accessing the specific DOM element representing the locked content section, enabling developers to attach event listeners, measure dimensions, modify visual elements, synchronize scrolling behavior between locked and unlocked sections, and perform dynamic updates or customizations related to locked panes in tabular or grid components with frozen columns.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      var treelist = $("#treelist").kendoTreeList({
        columns: [
          { field: "Name", locked: true },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      }).data("kendoTreeList");
      
      // Access the locked content element
      var lockedContent = treelist.lockedContent;
      console.log(lockedContent);
    </script>

## Methods

### addRow

Adds an empty data item to the TreeList. In inline edit mode, appends a table row. In the popup edit mode, displays a popup window. Fires the [`edit`](/api/javascript/ui/treelist/events/edit) event.


<div class="meta-api-description">
How to dynamically add a new row to a Kendo UI TreeList with jQuery? Insert a new blank row or data item into a hierarchical tree list or grid for immediate editing, enabling users to add entries directly by appending an editable row inline or triggering a popup editor window, supporting workflows that require dynamically adding and modifying data within tree-structured tables, grids, or lists, with event-driven editing states that notify when the row is activated for input, allowing configuration of inline or modal editing experiences and initiating the creation of new tree nodes or list records interactively.
</div>

#### Parameters

##### parentRow `String|Element|jQuery`

A string, DOM element, or a jQuery object which represents the parent table row. A string is treated as a jQuery selector.

#### Example - adding a new root data item

      <div id="treelist"></div>
      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

          $("#treelist").kendoTreeList({
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  type: "POST",
                  contentType: "application/json"
                },
                create: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                  type: "POST",
                  contentType: "application/json"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                  }
                }
              },
              batch: true,
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            },
            height: 300,
            editable: true,
            columns: [
              { field: "FirstName", expandable: true, title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { command: ["edit"]}
            ]
          });
        $("#add").click(function(){
        	$("#treelist").data("kendoTreeList").addRow();
        });
      </script>

#### Example - adding a new child data item

      <button id="add">Add New Row</button>
      <div id="treelist"></div>

      <script>
          var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

          $("#treelist").kendoTreeList({
            dataSource: {
              transport: {
                read:  {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/All"
                },
                update: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                  type: "POST",
                  contentType: "application/json"
                },
                create: {
                  url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                  type: "POST",
                  contentType: "application/json"
                },
                parameterMap: function(options, operation) {
                  if (operation !== "read" && options.models) {
                    return kendo.stringify(options.models);
                  }
                }
              },
              batch: true,
              schema: {
                model: {
                  id: "EmployeeId",
                  parentId: "ReportsTo",
                  fields: {
                    EmployeeId: { type: "number", editable: false, nullable: false },
                    ReportsTo: { nullable: true, type: "number" },
                    FirstName: { validation: { required: true } },
                    LastName: { validation: { required: true } },
                    Position: { type: "string" }
                  },
                  expanded: true
                }
              }
            },
            height: 300,
            editable: true,
            columns: [
              { field: "FirstName", expandable: true, title: "First Name", width: 220 },
              { field: "LastName", title: "Last Name", width: 100 },
              { field: "Position" },
              { command: ["edit"]}
            ]
          });
        $("#add").click(function(){
        	$("#treelist").data("kendoTreeList").addRow("#treelist tbody>tr:first");
        });
      </script>

### autoFitColumn

Applies the minimum possible width for the specified column so that all the text fits without wrapping.


<div class="meta-api-description">
How do I automatically adjust column widths in a Kendo UI TreeList to fit its content? Automatically adjust or resize a table column, grid column, or tree list column width to fit its content or text without truncation or wrapping by calling a method that intelligently recalculates and sets the optimal minimum column width based on the longest cell or header value. This feature helps in dynamically sizing columns after data updates, user interactions, or layout changes to enhance readability, streamline presentation, and maintain a clean responsive table or tree structure. It supports use cases like auto-sizing columns on load, resizing to content programmatically, improving UI clarity, and controlling column widths to prevent horizontal scrolling or clipped text in hierarchical or tabular data displays.
</div>

#### Parameters

##### column `Number|String|Object`

The index of the column, the [`field`](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound, or the column object that is obtained from the [`columns`](/api/javascript/ui/treelist#fields-columns) collection.

#### Example - automatically fitting a column by an index

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        resizable: true,
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.autoFitColumn(1);
    </script>

#### Example - automatically fitting a column by a field

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        resizable: true,
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.autoFitColumn("Position");
    </script>

#### Example - automatically fitting a column by a column object reference

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        resizable: true,
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.autoFitColumn(treeList.columns[1]);
    </script>

### cancelChanges

Cancels any pending changes in the data source. Deleted data items are restored, new data items are removed, and updated data items are restored to their initial state.


<div class="meta-api-description">
How do I undo unsaved edits in Kendo UI TreeList? undo unsaved edits clear pending modifications revert added deleted or updated items reset hierarchical data changes rollback local changes discard unsynced edits before saving cancel pending insertions deletions and updates restore original data state reset TreeList modifications discard local edits before sync revert back to original hierarchical data state cancelChanges method for undoing changes in TreeList data source
</div>

#### Example - canceling all changes

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell"
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.addRow();
      treeList.cancelChanges();
    </script>

### cancelRow

Cancels editing for the table row which is in edit mode. Reverts any changes made.


<div class="meta-api-description">
How to cancel row editing in Kendo UI TreeList widget? Terminate or abort row editing session in a hierarchical list or tree grid, discard any unsaved modifications, revert cell or field changes to original data, exit edit mode for the active editable entry, cancel current row updates, rollback edits without saving, stop inline editing on a specific node or item, reset row data during editing, undo changes within the editing context of a single row, prevent committing partial or unwanted edits in a tree-structured data view.
</div>

#### Example - canceling editing

      <button id="cancel">Cancel Editing</button>
      <div id="treelist"></div>

      <script>
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/EmployeeDirectory/All"
              },
              update: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                type: "POST",
                contentType: "application/json"
              },
              create: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                type: "POST",
                contentType: "application/json"
              },
              parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                  return kendo.stringify(options.models);
                }
              }
            },
            batch: true,
            schema: {
              model: {
                id: "EmployeeId",
                parentId: "ReportsTo",
                fields: {
                  EmployeeId: { type: "number", editable: false, nullable: false },
                  ReportsTo: { nullable: true, type: "number" },
                  FirstName: { validation: { required: true } },
                  LastName: { validation: { required: true } },
                  Position: { type: "string" }
                },
                expanded: true
              }
            }
          },
          height: 300,
          editable: true,
          columns: [
            { field: "FirstName", expandable: true, title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 100 },
            { field: "Position" },
            { command: ["edit"]}
          ]
        });
        $("#cancel").click(function(){
          $("#treelist").data("kendoTreeList").cancelRow();
        });
      </script>

### clearSelection

Depending on the current selection [mode](/api/javascript/ui/treelist#configuration-selectable), clears the currently selected table rows or cells.


<div class="meta-api-description">
How to programmatically clear selected rows in Kendo UI TreeList? Remove or reset all selected rows or cells in a hierarchical table or grid by programmatically clearing the current selection state, regardless of whether the selection mode is single, multiple, rows, or cells; effectively disabling, deselecting, or unchecking any highlighted items or focused nodes to reset the visual selection without altering the underlying data structure or content, enabling developers to control, erase, or update selection programmatically in tree or list views.
</div>

#### Example - clearing selection

    <button id="clear">Clear Selection</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#clear").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.clearSelection();
      });
    </script>

### closeCell

Stops editing the table cell which is in edit mode. Requires the incell [edit mode](/api/javascript/ui/treelist/configuration/editable#editablemode).

> When the user applies keyboard navigation, [`table`](/api/javascript/ui/treelist/fields/table) must be focused programmatically after calling `closeCell`.


<div class="meta-api-description">
How do I programmatically close the editor in a Kendo UI TreeList cell? End or stop editing the current cell in a tree-structured list or table by programmatically closing the active cell editor, enabling control over finishing in-cell editing sessions, managing keyboard or automated input flows, validating changes, updating focus, or shifting interaction to other interface elements. This action supports workflows where users or code need to finalize edits within cells before moving on, applying keyboard navigation, or triggering validations, especially when editing mode is enabled for direct cell modifications. Control and terminate cell editing dynamically to ensure seamless data entry completion, focus management, and integration with keyboard-driven navigation or programmatic updates in hierarchical grid or tree list interfaces.
</div>

#### Parameters

##### isCancel `Boolean` *optional*

A flag which specifies whether to fire the `cancel` event. By default, the event is not fired.

#### Example - canceling cell editing

    <div id="treeList"></div>
    <script>
    $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        navigatable: true
    });

    var treeList = $("#treeList").data("kendoTreeList");

    treeList.editCell(treeList.tbody.find("td").first());

    setTimeout(function(){
        treeList.closeCell();
        treeList.table.focus();
    }, 1500);
    </script>

### collapse

This method collapses the row that is passed as a parameter.


<div class="meta-api-description">
How to programmatically collapse child rows in a Kendo UI TreeList? Programmatically close or hide child rows within a hierarchical dataset by collapsing a specific parent entry, enabling control over the expanded or collapsed state of tree structures, managing nested data visibility, dynamically folding branches, toggling row expansion for user interactions, configuring hierarchical display to streamline complex lists, setting rows to a collapsed state to improve readability, controlling row expansion programmatically, and responding to user-driven or automated commands that require folding tree nodes or hiding child elements within a nested or expandable list.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`Promise` - a promise that will be resolved once the data is loaded.

#### Example - returning a promise

    <button id="collapse">Collapse TreeList</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#collapse").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.collapse($("#treeList tbody>tr:eq(0)"));
      });
    </script>

### dataItem

Returns the data item to which the specified table row is bound.


<div class="meta-api-description">
How do I access the original data object linked to a specific row in a Kendo UI TreeList? Retrieve the original data object linked to a particular row within a hierarchical or tree-structured list, enabling access, modification, or inspection of the underlying model tied to that row element. This method supports scenarios like reading row data for custom display, updating values for inline editing, syncing selection state with data models, mapping DOM elements or row indices back to their bound data entries, and controlling row-level data operations by connecting visual rows to their source objects. Use cases include extracting or setting data for tree nodes, manipulating hierarchical data on user interaction, or linking UI elements to their corresponding dataset items in structured grid or tree views.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`kendo.data.TreeListModel` - The data item to which the specified table row is bound.

#### Example - getting the data item to which the first table row is bound

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "name" },
            { field: "age" }
          ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        });
        var treeList = $("#treeList").data("kendoTreeList");
        var data = treeList.dataItem("tbody>tr:eq(1)");
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(data.age); // displays "22"
    </script>

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls the `destroy` method of any child Kendo UI widgets.

> This method does not remove the widget element from the DOM.


<div class="meta-api-description">
How do I safely remove a hierarchical Kendo UI TreeList widget from my page? Clear all event listeners, release resources, detach data attributes, and recursively clean up nested components to safely dismantle a hierarchical grid or tree view widget without removing its DOM element, preventing memory leaks and ensuring proper disposal of child controls and event handlers in complex UI trees.
</div>

#### Example - safely removing the TreeList from the DOM

    <button id="destroy">Destroy and remove TreeList</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#destroy").click(function(){
        $("#treeList").data("kendoTreeList").destroy(); // destroy the TreeList

        $("#treeList").remove(); // remove all TreeList HTML
      });
    </script>

### editCell

Switches the specified table cell in edit mode. Requires the incell [edit mode](/api/javascript/ui/treelist/configuration/editable#editablemode). Fires the [`edit`](/api/javascript/ui/treelist/events/edit) event.


<div class="meta-api-description">
How can I programmatically enable editing for a specific cell in my Kendo UI TreeList? Programmatically enable or trigger editing mode for a specific cell within a hierarchical grid or table, opening the in-cell editor to allow user input, set focus automatically, and start direct editing; useful for controlling cell editing state via code, enabling inline editing in tree-structured lists or data grids, activating cell editors on demand, handling edit initiation events, and managing in-cell edit interactions dynamically within nested row collections.
</div>

#### Parameters

##### cell `jQuery`

The jQuery object which represents the table cell.

#### Example - switching the first cell to edit mode

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell"
    });
    var treeList = $("#treeList").data("kendoTreeList");
    treeList.editCell($("#treeList td:eq(0)"));
    </script>

### editRow

Switches the specified table row to edit mode. Fires the [`edit`](/api/javascript/ui/treelist/events/edit) event.


<div class="meta-api-description">
How do I programmatically edit a specific row in a Kendo UI TreeList? Programmatically initiate inline editing for a specific row in a hierarchical or tree-structured table by switching the row into edit mode, enabling modification of its cell values and activating editors for user input. Enable dynamic control over row editing, trigger editing states directly, integrate with custom edit and save workflows, and handle events related to starting edits on expandable or nested rows within tree-like data grids. Manage, configure, set, or enable row-level editing programmatically in complex grid components supporting hierarchical data and inline cell modifications.
</div>

#### Parameters

##### row `jQuery`

The jQuery object which represents the table row.

#### Example - switching the first row to edit mode

      <button id="edit">Edit First Row</button>
      <div id="treelist"></div>

      <script>
        var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read:  {
                url: crudServiceBaseUrl + "/EmployeeDirectory/All"
              },
              update: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
                type: "POST",
                contentType: "application/json"
              },
              create: {
                url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
                type: "POST",
                contentType: "application/json"
              },
              parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                  return kendo.stringify(options.models);
                }
              }
            },
            batch: true,
            schema: {
              model: {
                id: "EmployeeId",
                parentId: "ReportsTo",
                fields: {
                  EmployeeId: { type: "number", editable: false, nullable: false },
                  ReportsTo: { nullable: true, type: "number" },
                  FirstName: { validation: { required: true } },
                  LastName: { validation: { required: true } },
                  Position: { type: "string" }
                },
                expanded: true
              }
            }
          },
          height: 300,
          editable: true,
          columns: [
            { field: "FirstName", expandable: true, title: "First Name", width: 220 },
            { field: "LastName", title: "Last Name", width: 100 },
            { field: "Position" },
            { command: ["edit"]}
          ]
        });
        $("#edit").click(function(){
          $("#treelist").data("kendoTreeList").editRow($("#treelist tbody>tr:eq(0)"));
        });
      </script>

### expand

Expands the row.


<div class="meta-api-description">
How to programmatically expand collapsed parent rows in Kendo UI TreeList? Open or reveal hidden child rows within a hierarchical grid or tree-structured list by programmatically expanding collapsed parent rows. Use commands, functions, or triggers to control row expansion state, dynamically display nested data entries, respond to user clicks or interactions by unfolding specific tree nodes, and update the interface to show child elements on demand. Enable, set, or toggle expansion for tree branches, branches with children, or hierarchical dataset items, facilitating navigation, drilling down into details, or managing visibility of nested rows after loading or data updates.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`Promise` - a promise that will be resolved once the data is loaded.

#### Example - returning a promise

    <button id="expand">Expand TreeList</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#expand").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.expand($("#treeList tbody>tr:eq(0)"));
      });
    </script>

#### Example - expanding a row of a data item with a given id

    <button id="expand">Expand item with ID = 1</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22 },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#expand").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");

        // find item with id = 1 in datasource
        var dataItem = treeList.dataSource.get(1);

        // find row for data item
        var row = treeList.element.find("tr[data-uid=" + dataItem.uid + "]")

        treeList.expand(row);
      });
    </script>

### getOptions

Retrieves the options that are currently enabled or disabled on the Treelist, also gives the current state of the dataSource.
Use this method if you want to save the state of the Treelist into a variable. It is also possible to extract and store only some of the Treelist options.


<div class="meta-api-description">
How do I get the current configuration of a Kendo UI TreeList component? Retrieve the current configuration and data state of a hierarchical grid or tree table component, capturing all enabled or disabled settings and the active data source snapshot for purposes such as saving, exporting, restoring, duplicating, inspecting, or synchronizing component options and data state in your application. Access the full set of runtime parameters, control flags, data contents, and customization states to programmatically extract or persist the entire tree list setup for debugging, state management, dynamic reconfiguration, or serialization, supporting workflows that require comprehensive state snapshots or selective option retrieval from the tree-structured data grid.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      var treelist = $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        sortable: true,
        filterable: true
      }).data("kendoTreeList");
      
      // Get current options
      var options = treelist.getOptions();
      console.log(options);
    </script>

### itemFor

(Available as of the 2015.3.930 release) Returns the rendered HTML element for a given model.


<div class="meta-api-description">
How do I access the HTML element of a specific data item in a Kendo UI TreeList? Find or access the rendered HTML element corresponding to a specific data item within a hierarchical or tree-structured list, enabling actions like retrieving the DOM node for a given data model, locating rows or cells tied to particular data entries, manipulating or updating content dynamically, attaching event listeners directly to associated elements, measuring element dimensions or layout for customization, or performing targeted DOM operations on tree data items. This method supports developers looking to programmatically interact with the visual representation of hierarchical data by mapping data models to their precise HTML elements in the tree view.
</div>

#### Parameters

##### model `kendo.data.TreeListModel|Object`

A model from the DataSource, or the `id` of a model in the DataSource.

#### Returns

`jQuery` - The row that corresponds to the model.

#### Example - getting the row from model

    <button id="itemFor">Highlight the row with Jane</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#itemFor").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        var jane = treeList.dataSource.get(1);
        var row = treeList.itemFor(jane);

        treeList.select(row);
      });
    </script>

### items

Obtains an array of the DOM elements which correspond to the data items from the [`view`](/api/javascript/data/datasource/methods/view) of the data source.


<div class="meta-api-description">
How do I access the DOM elements of each item in a Kendo UI TreeList? Retrieve or access the rendered row elements or DOM nodes associated with each data item displayed in a hierarchical or tree-structured list, enabling direct manipulation, measurement, event binding, or synchronization between the visual rows and the underlying ordered data source or view; this functionality supports extracting the exact DOM elements that represent each data entry for custom UI updates, interaction handling, or precise alignment with the current data ordering and structure.
</div>

#### Example

    <div id="treelist"></div>
    <script>
      var treelist = $("#treelist").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      }).data("kendoTreeList");
      
      // Get all rendered items
      var items = treelist.items();
      console.log("Number of rendered items:", items.length);
    </script>

#### Returns

`Array` - The currently rendered data table rows (`<tr>` elements).

### refresh

Renders all table rows by using the current data items.


<div class="meta-api-description">
How do I update Kendo UI TreeList rows in real-time when data changes programmatically? Trigger an immediate update or redraw of all TreeList rows to reflect the latest in-memory data changes, refresh the visual row templates, reapply custom row formatting, and re-render the entire table markup dynamically without resetting or reloading the component instance; useful for forcing the UI to synchronize with programmatic data updates, template modifications, or any runtime changes that require the visible grid or hierarchical list to display fresh, current information instantly.
</div>

#### Example - refreshing the widget

    <button id="btn">Refresh</button>
    <div id="treelist"></div>
    <script>
      var treelist = $("#treelist").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      }).data("kendoTreeList");
      $("#btn").click(function(){
        var treelist = $("#treelist").data("kendoTreeList");
        treelist.dataSource.at(0).name="Marta Stewart";
        treelist.refresh();
      });
    </script>

### removeRow

Removes the specified table row from the TreeList. Also removes the corresponding data item from the data source. Fires the [`remove`](/api/javascript/ui/treelist/events/remove) event.


<div class="meta-api-description">
How to delete a row from a Kendo UI TreeList component? Delete or remove a specific row or entry from a hierarchical or tree-structured data table, eliminating both the visible row and its underlying dataset from the component’s source. Enable row deletion or removal operations on tree list or tree grid views, controlling data pruning, row elimination, or item removal in nested or parent-child table structures. Trigger update events or callbacks after deleting rows to handle UI refresh, data synchronization, or cleanup tasks in dynamic table interfaces. Handle row removal requests programmatically to manage tree data structures, prune entries, or update the user interface when rows are removed from tree-like data representations.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Example - removing the first table row

    <button id="btn">Remove second row</button>
    <div id="treelist"></div>
    <script>
      var dataSource = new kendo.data.TreeListDataSource({
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
          },
          destroy: {
            url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/Destroy",
            type: "POST",
            contentType: "application/json"
          },
          parameterMap: function(options, operation) {
            if (operation !== "read" && options.models) {
                return kendo.stringify(options.models);
            }
          }
        },
        batch: true,
        schema: {
          model: {
            id: "EmployeeId",
            parentId: "ReportsTo",
            fields: {
              EmployeeId: { type: "number", editable: false, nullable: false },
              ReportsTo: { nullable: true, type: "number" },
              HireDate: {type: "date"},
              BirthDate: {type: "date"}
            },
            expanded: true
          }
        }
      });

      $("#treelist").kendoTreeList({
        dataSource: dataSource,
        toolbar: [ "create" ],
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" }
        ]
      });
      $("#btn").click(function(){
        var treelist = $("#treelist").data("kendoTreeList");
        treelist.removeRow($("#treelist tbody>tr:nth(1)"));
      });
    </script>

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](/api/javascript/ui/treelist/events/excelexport) event.

> Calling this method may trigger the built-in browser popup blocker. To avoid that, always call it as a response to an end-user action (for example, a button click).


<div class="meta-api-description">
How can I programmatically export TreeList data to an Excel file in Kendo UI for jQuery? Trigger or initiate exporting the hierarchical TreeList data to an Excel spreadsheet file programmatically, enabling developers to start the client-side download of Excel exports on demand, control or automate Excel file generation from the grid or tree structure, handle export events like excelExport, and ensure the export process integrates smoothly with user interactions to avoid browser popup blockers by firing the export operation in response to user actions such as button clicks or UI commands.
</div>

#### Example - manually initiating the Excel export

    <button id="export">Export to Excel</button>
    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [ "id", "name" ],
            dataSource: [
                { id: 1, parentId: null, name: "Jane Doe", age: 30 },
                { id: 2, parentId: 1, name: "John Doe", age: 33 }
            ]
        });
        $("#export").click(function(e) {
            var treeList = $("#treeList").data("kendoTreeList");
            treeList.saveAsExcel();
        });
    </script>

### saveAsPDF

Initiates the PDF export and returns a promise. Also triggers the [`pdfExport`](/api/javascript/ui/treelist/events/pdfexport) event.

> Calling this method may trip the built-in browser popup blocker. To avoid that, call this method as a response to an end-user action (foe examlple, a button click).


<div class="meta-api-description">
How to export tree-like data from Kendo UI TreeList as a PDF? Export or convert hierarchical grid data to a PDF document, trigger file download, generate a printable PDF version of a tree-structured list, initiate asynchronous PDF export with progress tracking, handle PDF export events and callbacks, configure saving or exporting tree-like data tables to PDF format, ensure download starts after user interaction to bypass browser popup blockers, programmatically save or export displayed tree data as PDF file format from client-side interactions.
</div>

#### Returns

`Promise` - A promise that will be resolved when the export completes. The same promise is available in the [`pdfExport`](/api/javascript/ui/treelist/events/pdfexport) event arguments.

#### Example - manually initiating the PDF export

    <button id="export">Export to PDF</button>
    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [ "id", "name" ],
            dataSource: [
                { id: 1, parentId: null, name: "Jane Doe", age: 30 },
                { id: 2, parentId: 1, name: "John Doe", age: 33 }
            ]
        });
        $("#export").click(function(e) {
            var treeList = $("#treeList").data("kendoTreeList");
            treeList.saveAsPDF();
        });
    </script>

### saveChanges

Saves any pending changes by calling the [`sync`](/api/javascript/data/datasource/methods/sync) method. Fires the [`saveChanges`](/api/javascript/ui/treelist/events/savechanges) event.


<div class="meta-api-description">
How to save pending edits in Kendo UI TreeList component? Commit or persist all pending edits, including creates, updates, and deletions, by invoking a method that synchronizes the in-memory TreeList changes with the underlying data source. This operation can be triggered to apply batched modifications, ensuring that additions, modifications, or removals are saved and propagated correctly, while also enabling custom actions or UI updates through post-save event handling. Control, trigger, or enable saving of all queued data changes from the TreeList component to the server or storage, integrating with synchronization processes and allowing hooks for after-save logic and interface refresh.
</div>

#### Example - saving changes

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell"
    });
    var treeList = $("#treeList").data("kendoTreeList");
    treeList.addRow();
    treeList.saveChanges();
    </script>

### saveRow

Switches the table row which is in edit mode and saves any changes that are made by the user. Fires the [`edit`](/api/javascript/ui/treelist/events/save) event.


<div class="meta-api-description">
How to save changes made during inline editing in a Kendo UI TreeList? Trigger saving or committing changes made during inline row editing within hierarchical or tree-structured tables, finalize or end row edit mode to apply user modifications, switch editable rows back to display or view mode, persist updated data entered by users in tree list or nested table rows, execute functions that capture and handle edited row data, signal or fire events upon completion of row editing operations, control inline editing workflows for complex data grids with parent-child relationships, enable programmatic confirmation of row edits in tree-like data presentations, update and save changes to individual rows during interactive editing sessions.
</div>

#### Example - saving a row

    <button id="save">Save Row</button>
    <div id="treelist"></div>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read:  {
              url: crudServiceBaseUrl + "/EmployeeDirectory/All"
            },
            update: {
              url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
              type: "POST",
              contentType: "application/json"
            },
            create: {
              url: crudServiceBaseUrl + "/EmployeeDirectory/Create",
              type: "POST",
              contentType: "application/json"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return kendo.stringify(options.models);
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                FirstName: { validation: { required: true } },
                LastName: { validation: { required: true } },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        height: 300,
        editable: true,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 100 },
          { field: "Position" },
          { command: ["edit"]}
        ]
      });
      $("#save").click(function(){
        $("#treelist").data("kendoTreeList").saveRow($("treelist .k-treelist-edit-row"));
      });
    </script>

### select

Gets or sets the table rows (or cells) which are selected.


<div class="meta-api-description">
How do I programmatically select rows in a Kendo UI TreeList? Retrieve or modify the selected rows or cells within a hierarchical table or tree grid, enabling queries for current selections without parameters and updating or setting specific rows or cells programmatically; manage selection states, highlight user-chosen elements, handle multi-selection scenarios, synchronize selection with external controls, toggle selection modes, and control interactive selection behavior in tree-structured data displays.
</div>

#### Parameters

##### rows `Element|jQuery`

A DOM element or a jQuery object which represents the table rows or cells.

#### Returns

`jQuery` - The selected table rows or cells.

#### Example - selecting the first table cell

    <button id="btn">Highlight third row</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");

        treeList.select($("#treeList tbody>tr:nth(2)"));
      });
    </script>

#### Example - getting the selected table row

    <button id="btn">Get selected row info</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        var row = treeList.select();
        if(row.length > 0){
          var data = treeList.dataItem(row);
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(data.name);
        }
      });
    </script>

#### Example - getting the selected table row when checkbox selection is enabled

    <button id="btn">Get selected row/rows</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { selectable: true, width: "65px" },
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        console.log(treeList.select())
      });
    </script>

### setDataSource

Sets the data source of the widget.


<div class="meta-api-description">
How do I dynamically update the data in my Kendo UI TreeList component? Configure or update the hierarchical data displayed in a tree or nested list structure by dynamically setting or changing the underlying data source during runtime, enabling the component to refresh, reload, or rebind with new datasets, arrays, or data configurations to reflect changes in data hierarchy, structure, or content immediately without full reinitialization, supporting tasks like replacing data collections, updating nested items, modifying tree nodes, or resetting the data model for dynamic user interfaces that require flexible and reactive data binding.
</div>

#### Parameters

##### dataSource `kendo.data.TreeListDataSource`

The data source to which the widget will be bound.

#### Example - setting the data source

    <button id="btn">Change DataSource</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        var dsNew = new kendo.data.TreeListDataSource({
          data: [
            { id: 1, parentId: null, name: "Mark Jameson", age: 26, expanded: true },
            { id: 2, parentId: 1, name: "Joe Reeves", age: 22 },
          ]
        });
        treeList.setDataSource(dsNew);
      });
    </script>

### setOptions

Sets the options of the Treelist. Use this method if you want to enable/disable a particular feature/option or to load
the complete state obtained previously with the [`getOptions`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/treelist/methods/getoptions) method.

When `setOptions` is called, the Treelist widget will be destroyed and recreated. If the widget is bound to remote data, a new read request will be made.

> There are a few important things to keep in mind when using `getOptions` and `setOptions`.
>
> * **calling `setOptions()` in a Treelist event handler is not possible.**
> * **calling `setOptions()` in a function, which is related to the Treelist's databinding mechanism may cause an endless loop.**
> * `JSON.stringify()` cannot serialize function references (e.g. event handlers), so if stringification is used for the retrieved Treelist state,
> all configuration fields, which represent function references, will be lost. You have two options to avoid this limitation:
> use a [custom implementation](https://github.com/tarruda/super-json) to serialize JavaScript functions, or
> add the function references back to the deserialized configuration object before passing it to the `setOptions` method.


<div class="meta-api-description">
How do I dynamically update TreeList grid settings in Kendo UI for jQuery? Update, restore, or reconfigure hierarchical grid settings dynamically by applying new or saved configurations to adjust features, enable or disable specific options, or reload the component state from a previously captured snapshot. Control or modify runtime TreeList behavior by resetting its entire setup, including toggling features or applying complete saved states, while ensuring proper handling of remote data refresh and avoiding recursive data-binding loops. Manage serialization challenges when storing or reapplying settings that include event handlers or functions by customizing save/load processes or reattaching functions after deserialization to maintain interactive behaviors. Use this method for programmatically controlling, resetting, or initializing complex multi-option grid arrangements in applications that require live updates, feature toggling, state restoration, or reloading configurations from storage or earlier snapshots.
</div>

#### Example - set `reorderable` feature of the TreeList to true

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/service/v2/core";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ]
      });

      var treelist = $("#treelist").data("kendoTreeList");
      treelist.setOptions({
        reorderable: true
      });
    </script>

### showColumn

Shows the specified column.


<div class="meta-api-description">
How can I dynamically hide or show specific columns in a Kendo UI for jQuery TreeList grid after it has been initialized? Control and modify column visibility dynamically within a hierarchical data grid by enabling, revealing, or displaying specific columns after initial rendering; programmatically set which columns appear or become visible using identifiers to update headers and row contents accordingly, allowing real-time column toggling, conditional display based on user actions, interaction-based column showing, and flexible adjustments to the tree-structured list’s column presentation without re-initializing the entire grid.
</div>

#### Parameters

##### column `Number|String`

The index of the column, or the [`field`](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound.

#### Example - showing a hidden column by an index

    <button id="btn">Show Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age", hidden: true }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.showColumn(2);
      });
    </script>

#### Example - showing a hidden column by a field

    <button id="btn">Show Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age", hidden: true }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.showColumn("age");
      });
    </script>

### hideColumn

Hides the specified column.


<div class="meta-api-description">
How can I programmatically hide a specific column in my Kendo UI TreeList? Programmatically hide or remove a specific column from the tree or grid display dynamically at runtime by specifying the column through field name, index, or object reference to exclude it from rendering and the visible columns view while keeping it in the underlying configuration; control column visibility, toggle display of columns on the fly, configure which columns are shown or hidden in the hierarchical list or tree grid UI, and enable dynamic column hiding to customize and manage the visible dataset within the tree structure without affecting the overall column setup.
</div>

#### Parameters

##### column `Number|String`

The index of the column or the [`field`](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound.

#### Example - hiding a column by an index

    <button id="btn">Hide Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.hideColumn(2);
      });
    </script>

#### Example - hiding a column by a field

    <button id="btn">Hide Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ]
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.hideColumn("age");
      });
    </script>

### lockColumn

Locks (freezes) a column and allows the user to see it at all times when scrolling.


<div class="meta-api-description">
How to pin specific columns in Kendo UI TreeList for horizontal scrolling? Freeze or pin a specific column in a hierarchical or tree-structured grid to keep it fixed and always visible when scrolling horizontally, enabling users to maintain focus on important columns such as identifiers, indexes, or action buttons while navigating through other data columns; control column locking to enhance readability, configure persistent column visibility, enable locked columns for better data comparison, set fixed columns during sideways navigation, and programmatically manage column freeze behavior in tree-style tabular data views.
</div>

#### Parameters

##### column `Number|String`

The index of the column or the [`field`](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound.

> To use this method, initialize the TreeList with at least one locked column and render unlocked columns which will remain after the target column is locked.

#### Example - locking a column

    <button id="btn">Lock Age Column</button>
    <div id="treeList" style="width: 400px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.lockColumn("age");
      });
    </script>

### unlockColumn

Unlocks (unfreezes) a column.


<div class="meta-api-description">
How do I enable scrolling in previously fixed columns of a Kendo UI TreeList control? Control the scrolling behavior of columns by unlocking or unfreezing previously fixed or pinned columns so they scroll horizontally with other columns, re-enable normal column resizing, repositioning, and layout recalculations, and manage locked columns by toggling their fixed status to restore full movement and scrolling in hierarchical or tree-structured tabular data displays.
</div>

#### Parameters

##### column `Number|String`

The index of the column or the [`field`](/api/javascript/ui/treelist#configuration-columns.field) to which the columns is bound.

> To use this method, initialize the TreeList with at least one locked column and locked columns which will remain after the target column is unlocked.

#### Example - unlock a column

    <button id="btn">Unlock Name Column</button>
    <div id="treeList" style="width: 400px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", locked: true, width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.unlockColumn("name");
      });
    </script>

### reorderColumn

Changes the position of the specified column.


<div class="meta-api-description">
How can I programmatically reorder columns in a Kendo UI TreeList? Move or shift columns within a TreeList dynamically by specifying which column to relocate and the new target position, enabling programmatic control over column order, header placement, and overall grid layout rearrangement during runtime. Adjust column sequences, reorder headers, change column positions, and customize the visual or logical arrangement of columns on the fly using methods that manipulate column indexes and positions within the TreeList or similar grid structures.
</div>

#### Parameters

##### destIndex `Number`

The new position of the column. The destination index has to be calculated with regard to all columns including the hidden ones.

##### column `Object`

The column whose position will be changed.

#### Example - moving a column

    <button id="btn">Switch Name and Age Column</button>
    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: true
      });
      $("#btn").click(function(){
        var treeList = $("#treeList").data("kendoTreeList");
        treeList.reorderColumn(2, treeList.columns[1]);
      });
    </script>

## Events

### beforeEdit

Fires when the user tries to edit or creates a data item before the editor is created. Can be used for preventing the editing depending on custom logic. The event handler function context (available through the `this` keyword) will be set to the widget instance. The event will be fired only when the TreeList is editable.


<div class="meta-api-description">
How to cancel editing in Kendo UI TreeList widget? Intercept attempts to initiate editing or creating data entries before the editor interface appears, enabling control over edit or create actions by applying custom validation, conditional logic, or cancellation of modifications in hierarchical data views. Detect and manage user interactions that start data editing processes, control whether edits or new item additions proceed, prevent unauthorized changes, validate user permissions, enforce business rules before entry updates, and configure pre-edit checks in tree-structured grids. This event triggers only when editing capabilities are enabled, allowing developers to inject logic that can block, allow, or modify editing workflows dynamically.
</div>

#### Event Data

##### e.model `kendo.data.Model`

The data item which will be edited. To check if the data item is new (created) or not (edited), use its [`isNew`](/api/javascript/data/model/methods/isnew) method.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the beforeEdit event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        toolbar:["create"],
        beforeEdit: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("beforeEdit");

          if (!e.model.isNew()) {
            e.preventDefault();
          }
        }
      });
    </script>

### cancel

Fires when the user clicks the **Cancel** button (in inline or popup [edit mode](/api/javascript/ui/treelist#configuration-editable.mode)) or closes the popup window. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I detect when editing changes are canceled in a Kendo UI TreeList? Detect, listen for, or respond to when editing changes are canceled, aborted, or reverted in hierarchical grid or tree list interfaces, including user actions like clicking cancel buttons, closing popup editors, stopping inline edits, or aborting modifications; manage cleanup tasks, undo UI updates, discard unsaved user input, intercept edit cancelation events, handle rollback actions, and control edit lifecycle interruptions within tree-structured data editing components and nested item lists where edits may be stopped or dismissed.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit form container element.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked, prevents the `cancel` action. The table row remains in edit mode.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the cancel event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" },
            { command: [ "edit" ] }
          ],
          editable: true,
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          cancel: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("cancel");
          }
        });
    </script>

#### Example - subscribing to the cancel event after initialization

    <div id="treeList"></div>
     <script>
        function cancel(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("cancel");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" },
            { command: [ "edit" ] }
          ],
          editable: true,
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ]
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("cancel", cancel);
        treeList.dataSource.fetch();
    </script>

### cellClose

Fires when the incell edit mode is used and the cell will be closed. The event is triggered after saving or canceling the changes but before the cell is closed. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I handle cell close event in Kendo UI TreeList? Detect when an editable cell in a tree-structured data grid finishes editing or is about to close its editor, enabling actions such as validation, saving changes, updating the underlying data model or user interface, logging modifications, triggering post-edit workflows, or initiating asynchronous processes just before the cell editor disappears. This event occurs after users commit or cancel edits in a tree list or hierarchical grid, providing a hook for developers to configure behaviors tied to the lifecycle of cell editing, such as listening for cell edit closures, controlling edit finalization, or responding to in-place edit completion.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit container element. For more information, refer to the [`edit` event arguments](/api/javascript/ui/treelist/events/edit).

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.type `String`

The type of the cell close action.

The supported types are:

* `save`
* `cancel` - Triggered when the TreeList keyboard navigation is enabled by `navigateble: true` and the `Esc` key is used for the `close` action of the cell.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the cancel event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        toolbar:["create"],
        cellClose:  function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.type);
        }
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.editCell($("#treeList td:eq(1)"));
    </script>

### change

Fires when the user selects a table row or cell in the TreeList. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I detect selection changes in my Kendo UI TreeList component? Detect and respond to user selection changes in hierarchical or tabular data views, handling events triggered when users select rows, cells, or change the current selection. Enable event listeners or handlers to capture selection updates, synchronize selection state with underlying data models, manage row or cell highlights, and perform actions based on selection events. Control, track, or configure how selection changes propagate, integrate with component APIs for accessing or modifying selected items, and respond dynamically to user interactions involving selection within tree-structured lists or grids.
</div>

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - getting the selected data items when using row selection

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: "multiple, row",
        change: function(e) {
          var selectedRows = this.select();
          var selectedDataItems = [];
          for (var i = 0; i < selectedRows.length; i++) {
            var dataItem = this.dataItem(selectedRows[i]);
            selectedDataItems.push(dataItem);
          }
          // selectedDataItems contains all selected data items
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(selectedDataItems.length);
        }
      });
    </script>

#### Example - getting the selected data items when using cell selection

    <div id="treeList"></div>
    <script>
      function change(e) {
        var selectedCells = this.select();
        var selectedDataItems = [];
        for (var i = 0; i < selectedCells.length; i++) {
          var dataItem = this.dataItem(selectedCells[i].parentNode);
          if ($.inArray(dataItem, selectedDataItems) < 0) {
            selectedDataItems.push(dataItem);
          }
        }
        // selectedDataItems contains all selected data items
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(selectedDataItems.length + " data items selected.");
      }
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        selectable: "multiple, cell"
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("change", change);
    </script>

### collapse

Fires when an item is about to be collapsed. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How can I prevent tree items from collapsing in Kendo UI for jQuery TreeList? Capture and handle events triggered before a tree or hierarchical list item collapses, enabling developers to intercept collapsing actions to execute custom code, update the user interface, validate or modify data, synchronize state, or prevent collapse dynamically. This event-driven mechanism provides hooks to monitor when nodes or tree branches are about to close, offering access to component context to perform logic such as conditional collapsing, UI refreshes, asynchronous operations, or interaction coordination in tree structures, expandable lists, or nested item views.
</div>

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked, prevents the collapse action. The child table rows will not be hidden.

#### Example - subscribing to the collapse event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          collapse: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("collapse");
          }
        });
    </script>

#### Example - subscribing to the collapse event after initialization

    <div id="treeList"></div>
     <script>
        function collapse(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("collapse");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null, expanded: true },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ]
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("collapse", collapse);
        treeList.dataSource.fetch();
    </script>

### dataBinding

Fires before the widget binds to its data source. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How can I customize the data binding in Kendo UI TreeList before it populates the tree structure? Configure or hook into the pre-data binding phase to run custom logic, modify data requests, intercept or adjust parameters, control loading states, synchronize external or related components, or trigger actions just before data attaches to the tree list structure; handle events firing right before data population, with access to the component context to inspect data, update request arguments, enable loading indicators, or integrate state updates for dynamic data handling, refresh workflows, and fine-tuned data source coordination in hierarchical grid or tree view components.
</div>

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked, prevents the data bind action. The table rows will remain unchanged and the `dataBound` event will not fire.

#### Example - subscribing to the dataBinding event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          dataBinding: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("dataBinding");
          }
        });
    </script>

#### Example - subscribing to the dataBinding event after initialization

    <div id="treeList"></div>
     <script>
        function dataBinding(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("dataBinding");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ]
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("dataBinding", dataBinding);
        treeList.dataSource.fetch();
    </script>

### dataBound

Fires when the widget is bound to data from its data source. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
When does Kendo UI TreeList trigger its dataBound event? Trigger actions, execute custom code, or run callbacks immediately after the hierarchical data grid completes loading, refreshing, sorting, paging, or filtering data, enabling dynamic UI updates, row manipulation, event handler attachment, or plugin initialization whenever the underlying dataset changes. Detect when the tree-structured list finalizes its data fetch or refresh cycle to modify the interface, respond to data changes, or implement post-bind logic with access to the component instance context. Control behaviors that depend on the data being fully loaded and rendered, such as updating row content, reapplying styles, or hooking into user interactions right after data operations complete on the tree data view.
</div>

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the dataBound event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          dataBound: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("dataBound");
          }
        });
    </script>

#### Example - subscribing to the dataBound event after initialization

    <div id="treeList"></div>
     <script>
        function dataBound(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("dataBound");
        }
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ]
        });

        var treeList = $("#treeList").data("kendoTreeList");
        treeList.bind("dataBound", dataBound);
        treeList.dataSource.fetch();
    </script>

### dragstart

(Available as of the 2015.3.1014 release) Fires when the user attempts to drag an item. If prevented, the item is not allowed to move. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I prevent a drag action from starting in Kendo UI TreeList? Detect when a drag action begins within a hierarchical list or tree structure to capture user attempts to move or reorder items, allowing you to validate permissions, cancel dragging, customize behavior, or intercept item drag initiation before it proceeds; control or prevent the drag operation by calling event methods to stop item movement, monitor drag triggers, and manage drag lifecycle events in tree or nested list components.
</div>

##### e.source `kendo.data.TreeListModel`

The model of the source row.

#### Example - subscribing to the dragstart event before initialization

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/service/v2/core";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        dragstart: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("dragstart", e.source);
        }
      });
    </script>

#### Example - subscribing to the dragstart event after initialization

    <div id="treeList"></div>
    <script>
      var service = "https://demos.telerik.com/service/v2/core";

      function dragstart(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("dragstart");
      }

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("dragstart", dragstart);
    </script>

### drag

(Available as of the 2015.3.1014 release) Fires while the user is dragging and item. This event is triggered on every mouse move. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I capture ongoing drag actions in a Kendo UI TreeList component? Capture and handle ongoing drag actions, mouse movements, and pointer positions within hierarchical list components to enable real-time updates, custom feedback, or interactive UI changes during item drag operations. Manage continuous drag tracking events, monitor drag progress, respond dynamically as users move draggable elements, and create tailored drag-and-drop experiences by processing repeated drag event notifications for tree or multi-level list structures. This supports configuring drag motion listeners, controlling drag interaction flows, and integrating fine-grained handling of pointer movement throughout dragging sequences in nested or tree-based lists.
</div>

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.source `kendo.data.TreeListModel`

The model of the source row.

##### e.target `jQuery`

The element under the cursor.

##### e.pageX `Number`

The x coordinate of the mouse.

##### e.pageY `Number`

The y coordinate of the mouse.

##### e.status `String`

The status that the drag clue shows (**i-plus**, **i-cancel**, **i-insert-up**, **i-insert-middle** or **i-insert-down**).

##### e.setStatus `Function`

Allows a custom drag clue status to be set.

Pre-defined status classes are:

*   **k-i-insert-up**
        - Indicates that the item will be inserted on top.
*   **k-i-insert-middle**
        - Indicates that the item will be inserted in the middle.
*   **k-i-insert-down**
        - Indicates that the item will be inserted at the bottom.
*   **k-i-plus**
        - Indicates that the item will be added/appended.
*   **k-i-cancel**
        - Indicates an invalid operation. `DO NOT` overwrite this class as the drag logic depends on it.

#### Example - subscribing to the drag event before initialization

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/service/v2/core";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        drag: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("dragging", e.source, e.target);
        }
      });
    </script>

#### Example - subscribing to the drag event after initialization

    <div id="treeList"></div>
    <script>
      var service = "https://demos.telerik.com/service/v2/core";

      function drag(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("dragging");
      }

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("drag", drag);
    </script>

#### Example - replacing the status clue

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/service/v2/core";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: {
          reorderable: true
          }
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        drag: function(e) {
          // Replace the "add" icon with a "copy" icon. DO NOT REPLACE THE i-cancel status!
          if(e.status === 'plus') {
            e.setStatus("copy");
          }
        }
      });
    </script>

### dragend

(Available as of the 2015.3.1014 release) Fires when the user finishes dragging an item and the model was updated. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I handle drag-and-drop actions in Kendo UI TreeList to update data after reordering nodes? Capture when a drag-and-drop action finishes on a hierarchical tree or list structure to detect node reordering, item moving, or tree data changes, enabling you to respond after the model updates by saving changes, refreshing the interface, validating or syncing data, handling drop completions, or triggering post-move logic within the component’s context. This event supports monitoring drag operations completion for lists or trees, managing item repositioning, and updating underlying data models accordingly to implement drag end handlers, reorder listeners, or update workflows after moving nodes or items in nested or flat collections.
</div>

#### Event Data

##### e.source `kendo.data.TreeListModel`

The model of the source row.

##### e.destination `kendo.data.TreeListModel`

The model of the new parent row.

##### e.position `String`

The position of the dropped element.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the dragend event before initialization

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/service/v2/core";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        dragend: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("drag ended", e.source, e.destination);
        }
      });
    </script>

#### Example - subscribing to the dragend event after initialization

    <div id="treeList"></div>
    <script>
      var service = "https://demos.telerik.com/service/v2/core";

      function dragend(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("drag ended");
      }

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("dragend", dragend);
    </script>

### drop

(Available as of the 2015.3.1014 release) Fires when the user drops an item. If prevented, the source row will not be moved. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I customize the behavior when dragging and dropping items in a Kendo UI TreeList? Handle or customize behavior when dragging and dropping items or rows within a hierarchical or tree-structured list, detect when a user releases a dragged element to drop it into a new position, intercept or cancel move actions by preventing default drop behavior, control how and when rows are rearranged through drag-and-drop operations, listen for changes triggered by dropping nodes, respond to drag-and-drop completion events, manage item repositioning in tree or list structures, enable drop event handlers to update application state or validate drop targets, override default drag-and-drop behavior to implement custom logic during item drops, and trigger callbacks when users drop list entries to reorder or modify the tree data structure.
</div>

#### Event Data

##### e.source `kendo.data.TreeListModel`

The model of the source row.

##### e.destination `kendo.data.TreeListModel`

The model of the new parent row.

##### e.dropTarget `Element`

The element over which the node is placed.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.valid `Boolean`

Indicates whether the drag operation is successful.

##### e.setValid `Boolean`

Sets the valid state. If set to `false`, the row will be animated back to its origin and will indicate to the user that the operation was invalid.

#### The difference between e.setValid(false) and e.preventDefault()

Both operations cancel the default drag operation but the indication to the user is different.

* `e.setValid(false)` indicates that the operation was unsuccessful by animating the drag clue to its original position. Use `setValid(false)` to indicate unsuccessful drag-and-drop operations.
* `e.preventDefault()` only removes the clue as if it was dropped. Use `preventDefault` to manually handle the drag-and-drop operation.

#### Example - subscribing to the drop event before initialization

    <div id="treelist"></div>
    <script>
      var service = "https://demos.telerik.com/service/v2/core";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ],
        drop: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("drop", e.source, e.destination, e.valid);
        }
      });
    </script>

#### Example - subscribing to the drop event after initialization

    <div id="treeList"></div>
    <script>
      var service = "https://demos.telerik.com/service/v2/core";

      function drop(e) {
        debugger
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("row dropped");
      }

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: service + "/EmployeeDirectory/All"
            }
          },
          schema: {
            model: {
              id: "EmployeeID",
              parentId: "ReportsTo",
              fields: {
                ReportsTo: { field: "ReportsTo",  nullable: true },
                EmployeeID: { field: "EmployeeId", type: "number" },
                Extension: { field: "Extension", type: "number" }
              },
              expanded: true
            }
          }
        },
        height: 540,
        editable: {
          move: true
        },
        columns: [
          { field: "FirstName", title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 160 },
          { field: "Position" }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("drop", drop);
    </script>

### edit

Fires when the user edits or creates a data item. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I detect when editing starts on an existing item in a Kendo UI TreeList? Respond to user interactions for modifying or adding items within a hierarchical grid or tree-structured list by capturing when editing starts on existing entries or when new entries are created, enabling inspection of the updated data model, validation processes, initialization of custom input fields or editors, and controlling edit workflows through event-driven handlers bound to the tree-like data display component instance.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object which represents the container element. The container element contains the editing UI.

##### e.model `kendo.data.TreeListModel`

The data item which will be edited. To check if the data item is new (created) or not (edited), use its [`isNew`](/api/javascript/data/model/methods/isnew) method.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the edit event before initialization

    <div id="treelist"></div>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read:  {
              url: crudServiceBaseUrl + "/EmployeeDirectory/All"
            },
            update: {
              url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
              type: "POST",
                  contentType: "application/json"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return kendo.stringify(options.models);
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                FirstName: { validation: { required: true } },
                LastName: { validation: { required: true } },
                Position: { type: "string" }
              },
              expanded: true
            }
          }
        },
        height: 300,
        editable: true,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 100 },
          { field: "Position" },
          { command: ["edit"] }
        ],
        edit: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("edit");
        }
      });
    </script>

#### Example - subscribing to the edit event after initialization

    <div id="treelist"></div>

    <script>
      var crudServiceBaseUrl = "https://demos.telerik.com/service/v2/core";

      function edit(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("edit");
      }

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read:  {
              url: crudServiceBaseUrl + "/EmployeeDirectory/All"
            },
            update: {
              url: crudServiceBaseUrl + "/EmployeeDirectory/Update",
              type: "POST",
              contentType: "application/json"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return kendo.stringify(options.models);
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                FirstName: { validation: { required: true } },
                LastName: { validation: { required: true } },
                Position: { type: "string" }
              },
              expanded: true
            }
          }
        },
        height: 300,
        editable: true,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 220 },
          { field: "LastName", title: "Last Name", width: 100 },
          { field: "Position" },
          { command: ["edit"] }
        ]
      });

      var treeList = $("#treelist").data("kendoTreeList");
      treeList.bind("edit", edit);
    </script>

### excelExport

Fires when the user clicks the **Export to Excel** toolbar button.


<div class="meta-api-description">
How can I intercept and customize the Excel export process in a Kendo UI TreeList component? Listen for export to Excel actions triggered by clicking the export button in the TreeList toolbar to run custom code or intercept the export process, enabling validation, data preparation, progress indicators, or custom export workflows. Capture when users initiate Excel export from the grid interface to control, modify, or extend the export behavior programmatically. Detect and handle export events to integrate pre-export logic such as data checks, asynchronous operations, UI feedback for export progress, or conditional cancellation before the spreadsheet file is generated and downloaded. Facilitate hooking into the export lifecycle to customize how and when data is exported in Excel format, including modifying content, enforcing rules, or chaining additional functions upon export initiation.
</div>

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.data `Array`

(Available as of the 2014.3.1205 release) The array of data items that is used to create the Excel workbook.

##### e.workbook `Object`

The Excel [`workbook` configuration object](/api/javascript/ooxml/workbook#configuration). Used to initialize a `kendo.ooxml.Workbook` class. Modifications of the workbook will be reflected in the output Excel document.

##### e.preventDefault `Function`

If invoked, the TreeList will not save the generated file.

#### Example - subscribing to the excelExport event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        excelExport: function(e) {
          e.workbook.fileName = "Employees.xlsx";
        }
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.saveAsExcel();
    </script>

#### Example - subscribing to the excelExport event after initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["excel"],
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        excelExport: function(e) {
          e.workbook.fileName = "Employees.xlsx";
        }
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("excelExport", function(e) {
        e.workbook.fileName = "Employees.xlsx";
      });
      treeList.saveAsExcel();
    </script>

### expand

Fires when an item is about to be expanded. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to cancel tree node expansion in Kendo UI TreeList? Detect, handle, or intercept when a tree node, row, or item within a hierarchical list is about to expand or open, enabling developers to execute custom logic, validations, or dynamic data loading right before the expansion occurs. This event triggers before showing child nodes or nested data in a tree structure, allowing control over the expansion action, cancelation, or modification of behavior during node unfolding or row expansion. It’s useful for configuring pre-expansion checks, loading remote data on demand, or customizing UI interactions tied to expanding branches in tree or list views.
</div>

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked, prevents the expand action. The child table rows will not be shown.

#### Example - subscribing to the expand event before initialization

    <div id="treeList"></div>
     <script>
        $("#treeList").kendoTreeList({
          columns: [
            { field: "Name" },
            { field: "Position" }
          ],
          dataSource: [
            { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
            { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
          ],
          expand: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("expand");
          }
        });
    </script>

#### Example - subscribing to the expand event after initialization

    <div id="treeList"></div>
    <script>
      function expand(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("expand");
      }
      $("#treeList").kendoTreeList({
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ]
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("expand", expand);
    </script>

### filterMenuInit

Fires when the TreeList filter menu is initialized. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to customize filter menu creation in Kendo UI TreeList component? Control and customize the initialization of filter menus in hierarchical or tree-structured data grids, intercepting filter menu creation to modify menu items, adjust filtering operators, add custom filtering logic, or bind event handlers dynamically during setup to tailor filtering interfaces in tree list components. Enable configuration, customization, extension, or enhancement of filtering UI elements, operators, and options when filter menus are generated in data tree grids, supporting scenarios like dynamic operator changes, custom filter templates, or integrating advanced filter behaviors at filter menu creation time within tree or hierarchical list views.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object which represents the filter menu form element.

##### e.field `String`

The field of the column for which the filter menu is initialized.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the filterMenuInit event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        filterable: true,
        filterMenuInit: function(e) {
          if (e.field == "name") {
            var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
            firstValueDropDown.value("contains");
            firstValueDropDown.trigger("change");

            var logicDropDown = e.container.find("select:eq(1)").data("kendoDropDownList");
            logicDropDown.value("or");
            logicDropDown.trigger("change");

            var secondValueDropDown = e.container.find("select:eq(2)").data("kendoDropDownList");
            secondValueDropDown.value("contains");
            secondValueDropDown.trigger("change");
          }
        }
      });
    </script>

#### Example - subscribing to the filterMenuInit event during initialization and changing the default operators

    <div id="treelist"></div>
    <script>
      function treelist_filterMenuInit(e) {
        if (e.field == "name") {
          var firstValueDropDown = e.container.find("select:eq(0)").data("kendoDropDownList");
          firstValueDropDown.value("contains");
          var logicDropDown = e.container.find("select:eq(1)").data("kendoDropDownList");
          logicDropDown.value("or");
          var secondValueDropDown = e.container.find("select:eq(2)").data("kendoDropDownList");
          secondValueDropDown.value("contains");
        }
      }
      $("#treelist").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        filterable: true
      });
      var treelist = $("#treelist").data("kendoTreeList");
      treelist.bind("filterMenuInit", treelist_filterMenuInit);
    </script>

### filterMenuOpen

Fires when the TreeList filter menu is opened. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to detect when filter menu is open in Kendo UI TreeList? Detect when the filter dropdown or filter menu becomes visible in the grid or list to trigger custom code for initializing filter inputs, loading dynamic filter data, setting default filter values, updating interface elements, controlling UI state changes, or running logic at the exact moment the filter panel opens; capture events that signal filter controls activation, menu display, or filter editor visibility within a tree-structured data list or table component to customize filtering behavior and respond to user interactions during filter menu activation.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object which represents filter menu form element.

##### e.field `String`

The field of the column for which the filter menu is opened.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the filterMenuOpen event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        filterable: true,
        filterMenuOpen: function(e) {
          e.container.find(".k-textbox:last").focus();
        }
      });
    </script>

#### Example - subscribing to the filterMenuOpen event during initialization and change the default operators

    <div id="treelist"></div>
    <script>
      function treelist_filterMenuOpen(e) {
        e.container.find(".k-textbox:last").focus();
      }
      $("#treelist").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        filterable: true
      });
      var treelist = $("#treelist").data("kendoTreeList");
      treelist.bind("filterMenuOpen", treelist_filterMenuOpen);
    </script>

### pdfExport

Fires  when the user clicks the **Export to PDF** toolbar button.


<div class="meta-api-description">
How to intercept PDF export trigger in Kendo UI TreeList widget? Detect user interactions with export to PDF commands in hierarchical data views, capturing clicks on export buttons to initiate custom workflows for PDF output. Enable event-driven control over PDF export from tree-structured lists, allowing validation, modification, cancellation, replacement, or extension of the export process. Support use cases such as intercepting PDF generation triggers, customizing exported content, conditionally blocking default PDF creation, or integrating alternative PDF generation methods when users request PDF exports from tree-based data displays. Control PDF export button activation events to tailor the PDF output behavior programmatically during export operations on tree-like data grids or lists.
</div>

#### Event Data

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked, the TreeList will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

#### Example - subscribing to the pdfExport event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
        pdfExport: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("exporting PDF");
        }
      });
      var treelist = $("#treeList").data("kendoTreeList");
      treelist.saveAsPDF();
    </script>

#### Example - subscribing to the pdfExport event after initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        toolbar: ["pdf"],
        columns: [
          { field: "Name" },
          { field: "Position" }
        ],
        dataSource: [
          { id: 1, Name: "Daryl Sweeney", Position: "CEO", parentId: null },
          { id: 2, Name: "Guy Wooten", Position: "Chief Technical Officer", parentId: 1 }
        ],
      });
      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("pdfExport", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("exporting pdf");
      });
      treelist.saveAsPDF();
    </script>

### remove

Fires when the user clicks the **Destroy** command button. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to handle item removal in Kendo UI TreeList? Handle user-initiated deletions or removals by triggering custom logic, validation, cleanup, or UI refresh when a delete or destroy action is performed on a hierarchical or tree-structured list. Detect and respond to removal commands or delete button clicks to update data models, confirm deletions, or synchronize state changes in tree or grid components. Enable event-driven processing for node or item deletion in tree views, allowing developers to intercept remove actions, execute callbacks, and manage component lifecycle events related to item removal or destruction. Control, customize, or extend functionality on item deletion events to maintain integrity, validation, or perform side effects upon removal commands in nested or hierarchical data structures.
</div>

#### Event Data

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.row `jQuery`

The jQuery object which represents the current table row.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

##### e.preventDefault `Function`

If invoked, prevents the removal of the data item. The table rows will remain unchanged.

#### Example - subscribing to the remove event before initialization

    <div id="treelist"></div>
    <script>

      $("#treelist").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            },
            destroy: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/Destroy",
              type: "POST",
              contentType: "application/json"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return kendo.stringify(options.models);
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        toolbar: [ "create" ],
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" },
          { command: ["destroy"] }
        ],
        remove: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("remove");
        }
      });
    </script>

#### Example - subscribing to the remove event after initialization

    <div id="treeList"></div>
    <script>

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            },
            destroy: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/Destroy",
              type: "POST",
              contentType: "application/json"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                return kendo.stringify(options.models);
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        toolbar: [ "create" ],
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" },
          { command: ["destroy"] }
        ]
      });

      function remove(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("remove");
      }

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("remove", remove);
    </script>

### save

Fires when a data item is saved. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to detect save events in Kendo UI TreeList component? Detect when an item is saved or updated in a hierarchical or tree-structured list to trigger custom actions such as refreshing data, updating the interface, syncing changes, or executing side effects upon save operations; listen for save events, handle save callbacks, manage data persistence notifications, respond to save confirmations, and integrate save event handlers for dynamic UI updates and state management after saving entries in nested data structures.
</div>

#### Event Data

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.container `jQuery`

The jQuery object which represents the current editor container element. If the [`editable.mode`](/api/javascript/ui/treelist#configuration-editable.mode) is `inline`, the container will be the edited row. If it is set to `popup`, then the container element will be the window element.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the save event before initialization

    <div id="treeList"></div>
    <script>

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            },
            update: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/Update",
              type: "POST",
              contentType: "application/json"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                  return kendo.stringify(options.models);
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" },
          { command: ["edit"] }
        ],
        save: function(e){
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("save row");
        }
      });
    </script>

#### Example - subscribing to the save event after initialization

    <div id="treeList"></div>
    <script>

      $("#treeList").kendoTreeList({
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/All"
            },
            update: {
              url: "https://demos.telerik.com/service/v2/core/EmployeeDirectory/Update",
              type: "POST",
              contentType: "application/json"
            },
            parameterMap: function(options, operation) {
              if (operation !== "read" && options.models) {
                  return kendo.stringify(options.models);
              }
            }
          },
          batch: true,
          schema: {
            model: {
              id: "EmployeeId",
              parentId: "ReportsTo",
              fields: {
                EmployeeId: { type: "number", editable: false, nullable: false },
                ReportsTo: { nullable: true, type: "number" },
                HireDate: {type: "date"},
                BirthDate: {type: "date"}
              },
              expanded: true
            }
          }
        },
        editable: "popup",
        height: 540,
        columns: [
          { field: "FirstName", expandable: true, title: "First Name", width: 250 },
          { field: "LastName", title: "Last Name" },
          { field: "Position" },
          { command: ["edit"] }
        ]
      });

      function save(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("save row");
      }

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("save", save);
    </script>

### saveChanges

Fires when the user clicks the **Save** command button. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I handle pending changes in Kendo UI TreeList when user interactions trigger save actions? Detect and respond to save actions triggered by user interaction with tree structure editing interfaces, capturing all pending modifications, edits, or changes requiring validation and confirmation before final submission; control workflows involving collecting unsaved changes, running data validation checks, and enabling customized save operations such as server updates or local persistence, with access to component-level context for managing state and implementing handlers that control how and when edits are committed or rolled back during save command execution.
</div>

#### Event Data

##### e.preventDefault `Function`

If invoked, the TreeList will not call the [`sync`](/api/javascript/data/datasource/methods/sync) method of the data source.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the saveChanges event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        toolbar: ["save"],
        saveChanges: function(e) {
          if (!confirm("Are you sure you want to save all changes?")) {
            e.preventDefault();
          }
        }
      });
    </script>

#### Example - subscribing to the saveChanges event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_saveChanges(e) {
        if (!confirm("Are you sure you want to save all changes?")) {
          e.preventDefault();
        }
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        editable: "incell",
        toolbar: ["save"]
      });
      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("saveChanges", treelist_saveChanges);
    </script>

### columnShow

Fires when the user shows a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I detect when a hidden column becomes visible in a Kendo UI TreeList? Detect when a previously hidden column becomes visible in a hierarchical or tree-structured data grid to update the user interface, save or persist visibility settings, adjust column sizes, recalculate layout, or trigger custom behavior upon column reveal actions. Capture or listen for events signaling that a user has enabled, displayed, or toggled the visibility of data grid columns, useful for dynamically controlling column presentation, reacting to user interface changes, and managing column display state in tree or nested list components.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnShow event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true,
        columnShow: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.column.field); // displays the field of the shown column
        }
      });
    </script>

#### Example - subscribing to the columnShow event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_columnShow(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the shown column
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true
      });

      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("columnShow", treelist_columnShow);
    </script>

### columnHide

Fires when the user hides a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I capture column hiding events in Kendo UI TreeList? Detect and respond to column hiding actions triggered by users in hierarchical data grids or tree-structured lists, enabling you to capture events when a column is hidden, execute custom code to update interfaces, save or persist column visibility states, adjust layouts dynamically, and handle event data with access to the component instance for seamless state management and UI synchronization upon column visibility changes.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnHide event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true,
        columnHide: function(e){
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.column.field); // displays the field of the hidden column
        }
      });
    </script>

#### Example - subscribing to the columnHide event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_columnHide(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the hidden column
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "id" },
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true
      });

      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("columnHide", treelist_columnHide);
    </script>

### columnReorder

Fires when the user changes the order of a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I detect column reordering in a Kendo UI TreeList? Capture, handle, or listen for column reorder actions in hierarchical grid or tree list interfaces when users drag, move, or rearrange column positions, enabling developers to detect column order changes, track user preferences, save updated layouts, trigger callbacks on column movement, respond to column drag-and-drop events, synchronize UI updates after columns are shifted, implement validation or conditional logic based on new column arrangements, and programmatically access or manipulate the component state during or after columns are reordered.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.newIndex `Number`

The new column index.

##### e.oldIndex `Number`

The previous column index.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnReorder event during initialization

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            reorderable: true,
            columnReorder: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.column.field, e.newIndex, e.oldIndex);
            }
        });
    </script>

#### Example - subscribing to the columnReorder event after initialization

    <div id="treeList"></div>
    <script>
        function treelist_columnReorder(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.column.field, e.newIndex, e.oldIndex);
        }

        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            reorderable: true
        });

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.bind("columnReorder", treelist_columnReorder);
    </script>

### columnResize

Fires when the user resizes a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I detect when a user resizes a column in a Kendo UI TreeList? Detect, handle, or listen for changes when a user adjusts, modifies, drags, or resizes a column width in a hierarchical TreeList or grid interface to dynamically update layout, save or persist column size preferences, synchronize UI elements, or trigger responsive behavior immediately during or after the column resize action; monitor column width changes in real time for custom reactions, including adjusting adjacent columns, reflowing content, or storing state, with event callbacks tied to the TreeList component that provide access to column resize details and interaction context.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.newWidth `Number`

The new column width.

##### e.oldWidth `Number`

The previous column width.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnResize event during initialization

    <div id="treeList"></div>
    <script>
        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            resizable: true,
            columnResize: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
                console.log(e.column[0].field, e.newWidth, e.oldWidth);
            }
        });
    </script>

#### Example - subscribing to the columnResize event after initialization

    <div id="treeList"></div>
    <script>
        function treelist_columnResize(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.column[0].field, e.newWidth, e.oldWidth);
        }

        $("#treeList").kendoTreeList({
            columns: [
                { field: "name" },
                { field: "age" }
            ],
            dataSource: {
                data: [
                    { id: 1, parentId: null, name: "Jane Doe", age: 22 },
                    { id: 2, parentId: 1, name: "John Doe", age: 24 }
                ]
            },
            resizable: true
        });

        var treelist = $("#treeList").data("kendoTreeList");
        treelist.bind("columnResize", treelist_columnResize);
    </script>

### columnMenuInit

Fires when the column menu is initialized. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How can I customize the column header menu in Kendo UI TreeList? Listen for the event triggered when the column header menu is created in a TreeList or grid to customize, modify, or intercept its initialization, allowing developers to add, remove, or adjust menu items, commands, and actions before the menu is shown. Use event handlers to dynamically control column menu behavior, access or inspect menu elements at runtime, customize context menus, or override default options during menu setup. This supports scenarios like adding custom commands, enabling or disabling selections, injecting additional features, or altering the menu structure programmatically when users interact with column headers.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object which represents column menu form element.

##### e.field `String`

The field of the column for which the column menu is initialized.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnMenuInit event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true,
        columnMenuInit: function(e) {
          var menu = e.container.find(".k-menu").data("kendoMenu");
          var field = e.field;
          menu.append({ text: "Custom" });
          menu.bind("select", function(e) {
            if ($(e.item).text() == "Custom") {
	/* The result can be observed in the DevTools(F12) console of the browser. */
              console.log("Custom button for", field);
            }
          });
        }
      });
    </script>

#### Example - subscribing to the columnMenuInit event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_columnMenuInit(e) {
        var menu = e.container.find(".k-menu").data("kendoMenu");
        var field = e.field;
        menu.append({ text: "Custom" });
        menu.bind("select", function(e) {
          if ($(e.item).text() == "Custom") {
	/* The result can be observed in the DevTools(F12) console of the browser. */
            console.log("Custom button for", field);
          }
        });
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true
      });

      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("columnMenuInit", treelist_columnMenuInit);
    </script>

### columnMenuOpen

Fires when the column menu is opened. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
What triggers when a column menu opens in a Kendo UI TreeList? Trigger actions or execute custom code when a column menu in a hierarchical data grid or TreeList component becomes visible, enabling detection of menu opening events, responding dynamically to user interactions with column headers, accessing event details like clicked column info, and manipulating or retrieving component state within the handler function context. This event supports handling scenarios such as controlling menu visibility, customizing menu behavior on open, reacting to column menu activation, integrating additional logic for column filtering, sorting, or grouping triggers, and interfacing with the TreeList methods or properties during menu display.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object which represents column menu form element.

##### e.field `String`

The field of the column for which the column menu is initialized.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnMenuOpen event during initialization

    <div id="treeList"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true,
        columnMenuOpen: function(e) {
          var menu = e.container.children().data("kendoMenu");
          menu.open(menu.element.find("li:first"));
        }
      });
    </script>

#### Example - subscribing to the columnMenuOpen event after initialization

    <div id="treeList"></div>
    <script>
      function treelist_columnMenuOpen(e) {
        var menu = e.container.children().data("kendoMenu");
        menu.open(menu.element.find("li:first"));
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "name" },
          { field: "age" }
        ],
        dataSource: {
          data: [
            { id: 1, parentId: null, name: "Jane Doe", age: 22 },
            { id: 2, parentId: 1, name: "John Doe", age: 24 }
          ]
        },
        columnMenu: true
      });

      var treelist = $("#treeList").data("kendoTreeList");
      treelist.bind("columnMenuOpen", treelist_columnMenuOpen);
    </script>

### columnLock

Fires when the user lock a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I detect when columns in my Kendo UI TreeList get locked by the user? Detect and respond to user actions locking columns within hierarchical or tree-structured data grids by capturing column lock events, enabling developers to trigger custom functions when columns become fixed or frozen, control UI updates reflecting locked column states, save or restore column positions and locked statuses, synchronize locking behavior across multiple related components or views, handle user interactions that pin or freeze columns for better data visibility, and apply logic to manage dynamic locking or unlocking of columns in complex tabular data presentations.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnLock event during initialization

    <div id="treeList" style="width: 400px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true,
        columnMenu: true,
        columnLock: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.column.field); // displays the field of the just locked column
        }
      });
    </script>

#### Example - subscribing to the columnLock event after initialization

    <div id="treeList" style="width: 400px"></div>
    <script>
      function treeList_columnLock(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the just locked column
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true,
        columnMenu: true
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("columnLock", treeList_columnLock);
    </script>

### columnUnlock

Fires when the user unlock a column. The event handler function context (available through the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to detect when a user unlocks a column in a TreeList? Detect when a user unlocks or unlocks a column in a hierarchical data grid or tree view, triggering custom actions such as updating the interface, saving column order or state, controlling column locking behavior, responding to changes in column lock status, handling dynamic unlocking events, enabling reactive UI updates after a column lock is removed, responding to user interactions with locked or unlocked columns, managing state persistence upon column unlock, and integrating custom event-driven logic tied to unlocking columns within tree-structured lists or data tables.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the [`column`](/api/javascript/ui/treelist#configuration-columns) configuration.

##### e.sender `kendo.ui.TreeList`

The widget instance which fired the event.

#### Example - subscribing to the columnUnlock event during initialization

    <div id="treeList" style="width: 400px"></div>
    <script>
      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true,
        columnMenu: true,
        columnUnlock: function (e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.column.field); // displays the field of the just locked column
        }
      });
    </script>

#### Example - subscribing to the columnUnlock event after initialization

    <div id="treeList" style="width: 400px"></div>
    <script>
      function treeList_columnUnlock(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.column.field); // displays the field of the just locked column
      }

      $("#treeList").kendoTreeList({
        columns: [
          { field: "id", locked: true, width: 150 },
          { field: "name", width: 150 },
          { field: "age", width: 150 }
        ],
        dataSource: [
          { id: 1, parentId: null, name: "Jane Doe", age: 22, expanded: true },
          { id: 2, parentId: 1, name: "John Doe", age: 24 },
          { id: 3, parentId: 1, name: "Jenny Doe", age: 3 }
        ],
        scrollable: true,
        columnMenu: true
      });

      var treeList = $("#treeList").data("kendoTreeList");
      treeList.bind("columnUnlock", treeList_columnUnlock);
    </script>
