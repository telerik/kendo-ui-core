---
title: PropertyGrid
page_title: Configuration, methods and events of Kendo UI PropertyGrid
description: Code examples for the PropertyGrid UI component configuration. Learn how to use its methods and which events to set once the PropertyGrid UI component is initialized and expanded.
res_type: api
component: propertygrid
---

# kendo.ui.PropertyGrid

Represents the Kendo UI PropertyGrid component. Inherits from [TreeList](/api/javascript/ui/treelist).

## Configuration

### columns `Object`

The configuration of the PropertyGrid columns which allows for setting the field and value column configuration options.


<div class="meta-api-description">
How do I customize the column layout in Kendo UI's PropertyGrid? Customize and control the layout and presentation of fields and values in a property grid by configuring columns with options for display labels, ordering sequence, width adjustments, and individual rendering or editing settings. Enable setting or modifying column headers, arranging the order of properties visually, resizing columns dynamically, and applying customized editors or renderers on a per-column basis to tailor the grid's appearance and interaction for property names and their associated values. This covers scenarios where developers need to organize, style, or extend property display in data grids or UI panels, allowing precise control over how each property column behaves, looks, and responds to user input.
</div>

#### Example - specifying the columns of the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        width: 400,
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        }
      });
    </script>

### columns.fieldColumn `Object`

The configuration of the field column.


<div class="meta-api-description">
How to customize the display of field names in a Kendo UI PropertyGrid? Customize and control the display and behavior of the name or field column in a property grid by setting header text, adjusting column width, styling appearance, applying custom templates, and managing user interaction with individual field cells. Enable configuration of how field names appear, including formatting, alignment, and responsiveness, while supporting customization options for rendering content and controlling the cell behavior within property listing or object property exploration interfaces. Set parameters that influence the visual layout and functional handling of the first or main column in tabular property displays, allowing developers to tailor the field column presentation and interactivity to match UI requirements, improve usability, or adapt to dynamic data environments.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: {
                width: 200,
                resizable: true
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### columns.fieldColumn.width `Number`

The width of the column. Numeric values are treated as pixels. Refer to the documentation for details on using column widths and scrolling.


<div class="meta-api-description">
How do I set the width of each column in a Kendo UI PropertyGrid? Control and configure the displayed width of columns within a PropertyGrid or similar grid interface by setting fixed or adjustable pixel-based widths, enabling precise layout sizing, adjusting column dimensions at setup or runtime, managing horizontal space allocation for property fields, supporting consistent column presentation, and influencing scroll behavior when columns exceed the viewport, with options to define exact pixel widths or flexible sizing to fit UI requirements and ensure clear visibility and structured alignment of property information.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: {
                width: 300
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### columns.valueColumn `Object`

The configuration of the value column.


<div class="meta-api-description">
How to customize the value column in a Kendo UI PropertyGrid? Customize and control the display and editing behavior of property values within a grid by setting headers, column widths, data formats, inline editors, input templates, and editor configurations. Enable flexible adjustment of the value column’s appearance and interaction methods, including specifying how values render, which editing controls appear, and how property values are formatted or validated, supporting tasks like configuring input types, setting formatting options, and managing user input experience in editable grids or property panels.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        columns: {
            valueColumn: {
                width: 400,
                resizable: true
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### columns.valueColumn.width `Number`

The width of the column. Numeric values are treated as pixels. Refer to the documentation for details on using column widths and scrolling.


<div class="meta-api-description">
How to set fixed width for value column in Kendo UI PropertyGrid? Adjust or configure the width, size, or pixel measurement of the value column in a property grid or settings panel to control layout appearance, column sizing, and horizontal scrolling behavior; set fixed or dynamic widths to manage how much space the values occupy, ensure proper alignment, prevent overflow, enable responsive resizing, and improve user interface clarity in property editors or data grids.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        columns: {
            valueColumn: {
                width: 350
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### contextMenu `Object|Boolean` *(default: false)*

Configures the ContextMenu of the PropertyGrid. If set to `true` enables the default ContextMenu.


<div class="meta-api-description">
How do I customize the right-click context menu in a Kendo UI PropertyGrid? Control and customize the right-click context menu behavior within a property editing grid, including enabling or disabling the default context menu, configuring menu visibility, triggering context-specific actions on user interaction, adjusting how context menus appear when right-clicking properties, setting up contextual options or commands for property fields, managing the appearance and activation of contextual menus in property lists, and tailoring the user experience around property-focused context actions and menu controls.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        contextMenu: true,
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### contextMenu.body `Array`

Configures the items of the ContextMenu for the table body element. Those are some valid predefined tools: "separator", "copy", "copyName", "copyDeclaration", "resize", "reset", "expandItem", "collpaseItem".

You can also specify a custom item and associate it with a command.


<div class="meta-api-description">
How do I customize the context menu in Kendo UI PropertyGrid? Configure and customize the context menu that appears when right-clicking the main area or body of a property grid or table interface, enabling control over which menu items appear, including predefined options like separators, copy commands for names or declarations, resizing functions, reset actions, expanding or collapsing items, as well as the ability to add custom menu entries with associated commands or handlers. This enables tailoring the interactive right-click menu to fit various user needs, workflows, or extensions, supporting modifications of menu content, command bindings, and enabling or disabling specific actions within the main table body context menu. Whether you want to adjust default tools, implement copy functionality, add custom commands, or manage expansion controls, this helps control and fine-tune the right-click interactions in a property list or grid view environment.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
        $("#propertyGrid").kendoPropertyGrid({
            columns: {
                fieldColumn: { width: 200 },
                valueColumn: { width: 250 }
            },
            model: {
                foo: "bar",
                baz: 5
            },
            contextMenu: {
                body: [
                    "copyDeclaration",
                    "separator",
                    "resize",
                    { name: "MyCustomCommand", text: "Save State", icon: "gear", command: "CustomCommand" }
                ]
                // You can also concat to the default tools
                // body: kendo.ui.propertygrid.defaultBodyContextMenu.concat([
                //     { name: "MyCustomCommand", text: "SaveState", icon: "gear", command: "CustomCommand" }
                // ])
            }
        });

        kendo.ui.propertygrid.commands["CustomCommand"] = kendo.ui.propertygrid.PropertyGridCommand.extend({
            exec: function() {
                var that = this,
                    propertyGrid = that.propertyGrid;

                propertyGrid.saveState();
            }
        });
    </script>

### contextMenu.body.name `String`

Specifies the name of the item.


<div class="meta-api-description">
How can I customize the context menu item names in a Kendo UI PropertyGrid? Set or customize the label, title, or display name for context menu items within a property grid or similar UI component, enabling control over the text shown to users when right-clicking or opening menu options; useful for localization, renaming menu entries, adjusting user-facing item names, configuring menu labels dynamically, or tailoring context menu captions for improved clarity and user experience in interfaces that present property or settings lists.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        contextMenu: {
            body: [{
                name: "custom",
                text: "Custom Action",
                command: "CustomCommand"
            }]
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### contextMenu.body.text `String`

Specifies the text of the item.


<div class="meta-api-description">
How to customize context menu text in Kendo UI PropertyGrid? Configure and customize the text labels displayed in the right-click context menu for body items within property grids, enabling setting or changing menu item names, localization strings, dynamic labels, or user-defined text that appears on context menus for properties. This supports modifying, localizing, or dynamically generating the menu item display text seen on right-click actions, allowing control over contextual menu labeling for enhanced user interface clarity and customization in property management environments.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        contextMenu: {
            body: [{
                name: "customItem",
                text: "Custom Menu Item",
                command: "CustomCommand"
            }]
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### contextMenu.body.icon `String`

Specifies the icon of the item.


<div class="meta-api-description">
How to customize icons for context menu items in a Kendo UI PropertyGrid? Customize or configure the icon displayed next to context menu items within a property grid interface, enabling control over the visual symbol or glyph shown in menu bodies. This setting lets you set, change, or update the graphical icon component associated with menu entries to enhance interface clarity, user experience, or branding. Adjust, assign, or override the visual marker for context menu items' body sections to signify actions or categories, tailor menu item icons for better recognition, or implement specific icon components in menus tied to property grids.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        contextMenu: {
            body: [{
                name: "customItem",
                text: "Custom Item",
                icon: "k-icon k-i-gear",
                command: "CustomCommand"
            }]
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### contextMenu.body.command `String`

Specifies the command of the item.


<div class="meta-api-description">
How to customize the action triggered when selecting the main area of a context menu in Kendo UI PropertyGrid? Set or customize the action triggered when selecting the main area of a context menu in property grids by defining the command name, identifier, or handler function to execute on click or activation. Control which function, command string, or event handler runs from the context menu’s body selection, enabling configuration of commands tied to body clicks, context menu interactions, or action keys within property grid interfaces. Adjust or bind specific commands to the context menu body selection, allowing developers to enable, configure, or override default context menu item behaviors linked to the property panel.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        contextMenu: {
            body: [{
                name: "customItem",
                text: "Execute Command",
                command: "MyCustomCommand"
            }]
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### editMode `Boolean|String` *(default: true)*

If set to `true`, the user will be able to edit the values of the object's properties to which the PropertyGrid is bound. By default, editing is enabled.

`editMode` can also be set to a string (which specifies the edit mode).

The supported string values are:

* (Default) `incell`


<div class="meta-api-description">
How do I enable editing in a Kendo UI PropertyGrid? Control or configure whether users can modify the values of an object's properties within a property grid interface, including enabling or disabling editing functionality, setting the editing state on or off, and choosing interaction styles like inline editing or cell-based modification; this setting determines how and if users can update bound data fields, switch between editable or read-only modes, and customize the user input experience for property value changes in UI components that display data bindings.
</div>

#### Example - disable editing for the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        editMode: false
      });
    </script>

### excel `Object`

Configures the Excel export settings of the PropertyGrid.


<div class="meta-api-description">
How can I configure export settings to generate Excel files from a property grid? Enable exporting data from a property grid or data component to Excel workbooks by configuring export settings such as customizing workbook and worksheet options, specifying file names, controlling which fields, columns, or cell values are included or excluded, adjusting export formatting, and fine-tuning initialization parameters for Excel file generation. This covers scenarios like setting up Excel output, controlling export content, customizing sheets, and managing file metadata for spreadsheet exports from data-driven UI elements.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        excel: {
            fileName: "PropertyGrid.xlsx",
            forceProxy: true
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### excel.fileName `String` *(default: "Export.xslx")*

Specifies the file name of the exported Excel file.


<div class="meta-api-description">
How do I customize the filename when exporting data to Excel using Kendo UI for jQuery PropertyGrid? Configure or specify the name of the Excel file generated when exporting data, controlling the output filename for spreadsheet downloads to customize export results, set or change the default workbook name during export operations, define the saved file's title for easier identification, and manage how the export process presents the filename to users for improved organization of exported Excel files.
</div>

#### Example - setting the default Excel file name

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        excel: {
          fileName: "Employees.xlsx"
        },
        model: {
            foo: "bar",
            baz: 5
        }
      });
    </script>

### excel.filterable `Boolean` *(default: false)*

Enables or disables column filtering in the Excel file.


<div class="meta-api-description">
How to enable Excel filter dropdowns in Kendo UI PropertyGrid export? Enable or disable automatic inclusion of Excel column filters and sorting dropdowns during export, allowing users to configure, control, or set whether the exported spreadsheet contains interactive filterable headers for columns; supports scenarios where recipients want to sort, filter, query, or manage data directly within the exported Excel file, enhancing data analysis, viewing, and manipulation capabilities by toggling filter dropdown availability on worksheets generated from property grids or similar data views.
</div>

#### Example - enabling filtering in the output Excel file

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        excel: {
          filterable: true
        },
        model: {
            foo: "bar",
            baz: 5
        }
      });
    </script>

### excel.forceProxy `Boolean` *(default: false)*

If set to `true`, the content will be forwarded to [`proxyURL`](/api/javascript/ui/propertygrid#configuration-excel.proxyURL) even if the browser supports local file saving.


<div class="meta-api-description">
How do I configure the PropertyGrid to force Excel exports through a server proxy? Control exporting Excel files through a server proxy by forcing all export operations to route the Excel content to a specified proxy URL regardless of the browser’s native file saving capabilities, enabling scenarios where you need to handle exports centrally, enforce security policies, or integrate with backend services. Configure, enable, or set this option to override default local saving behavior for Excel exports in PropertyGrid, ensuring that the export data is always sent to a server endpoint, useful for centralized processing, logging, or compliance. Adjust export routing to proxy even when the client supports direct file downloads, facilitating controlled file handling and export mediation through your backend infrastructure.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        excel: {
            fileName: "PropertyGrid.xlsx",
            forceProxy: true,
            proxyURL: "/api/export"
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### excel.proxyURL `String` *(default: null)*

The URL of the server-side proxy which will stream the file to the end user. A proxy will be used when the browser is not capable of saving files locally. Such browsers are IE version 9 and earlier and Safari. The developer is responsible for implementing the server-side proxy. The proxy will return the decoded file with the `Content-Disposition` header set to `attachment; filename="<fileName.xslx>"`.

The proxy will receive a POST request with the following parameters in the request body:

* `contentType`&mdash;The MIME type of the file.
* `base64`&mdash;The base-64 encoded file content.
* `fileName`&mdash;The file name as requested by the caller.


<div class="meta-api-description">
How do I handle Excel file saving in older Internet Explorer versions using Kendo UI PropertyGrid? Configure or set the server-side URL endpoint to handle streaming and downloading generated Excel files when direct browser saving is unsupported, such as in older Internet Explorer versions or Safari. Enable a fallback proxy service that accepts POST requests containing file metadata including MIME type, base64-encoded content, and desired filename, then responds by delivering the decoded Excel file with appropriate content-disposition headers for attachment download. This setup supports scenarios where client-side saving fails, allowing developers to control or implement backend proxy URLs for exporting or downloading Excel spreadsheets, ensuring compatibility across browsers and environments that restrict local file saving during file export operations.
</div>

#### Example - setting the server proxy URL

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        excel: {
          proxyURL: "/save"
        }
      });
    </script>

### groupable `Boolean` *(default: true)*

Enables the grouping of properties. Set this configuration to `false` to disable grouping.

> For the `ToggleGroupLayout` command button to be rendered in the ToolBar, the `items` configuration should specify the groups to which the fields belong.


<div class="meta-api-description">
How do I enable grouping of fields in a PropertyGrid? Configure the interface to arrange fields into expandable or collapsible sections for better organization and readability, enabling users to group related properties under distinct headers or categories. Control whether fields can be grouped visually to simplify complex forms, and manage the inclusion or exclusion of grouped layouts in toolbars for streamlined interaction. Enable or disable grouping of form elements to improve navigation, presentation, or data categorization, allowing toggling between grouped and ungrouped views, setting group memberships, or customizing how property fields cluster dynamically. This covers user intents around organizing fields by category, adjusting layout grouping behavior, controlling collapsible group displays, and managing toolbar commands that interact with grouped property arrangements.
</div>

#### Example - define groups of items for the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        items:[
            {field:"foo", group: "Group A"},
            {field:"baz", group: "Group B"}
        ]
      });
    </script>

#### Example - disable grouping for the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        groupable: false
      });
    </script>

### height `Number`

Sets the height of the PropertyGrid. Numeric values are treated as pixels.


<div class="meta-api-description">
How do I set the height of a Kendo UI PropertyGrid widget? Adjust the vertical dimension or height of the component to manage layout space, control scrolling behavior, set fixed or dynamic pixel-based sizes for user interfaces, define how tall the property grid or panel appears on screen, specify numeric height values for arranging components visually, and configure the vertical space allocation to optimize display and usability in various screen or container sizes.
</div>

#### Example - set the height of the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        height: 500
      });
    </script>

### items `Array`

Additional configuration options for the properties of the model.


<div class="meta-api-description">
How to customize individual fields in a Kendo UI PropertyGrid? Customize individual fields in a property grid by configuring per-property settings that control how each model attribute is displayed and edited, including specifying editor types, custom labels, read-only states, validation rules, input options, or interactive behavior; enable fine-grained control over form fields, adjust property presentations, set custom editors, control editability, and tailor user input elements for dynamic model property handling and enhanced user interface customization.
</div>

#### Example - set the items configuration for the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5,
            price: 10,
            agree: false,
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida tincidunt tellus."
        },
        items:[
            {field: "foo", group: "Group A", editable: false},
            {field: "baz", group: "Group B", editor: "NumericTextBox", editorOptions: { min: 1, max: 10 } },
            {field: "agree", group: "Group C", validation: { required: true } },
            {field: "details", group: "Group D", editor: "TextArea", editorOptions: { rows: 5 }, template: (data)=>`<span style="color:red">${data.value}</span>`},
            {field: "price", group: "Group A", editable: false, format: "{0:C}", description: "The price for the item."}
        ]
      });
    </script>

### items.description `String`

Sets the description for the property.


<div class="meta-api-description">
How do I add custom tooltips or help text to specific properties in a Kendo UI PropertyGrid? Add detailed explanatory text, contextual help, or tooltips to specific configuration fields, form items, or settings by setting descriptive labels that clarify purpose, usage, or expected values next to each property or input element; enable users to see additional guidance, hints, instructions, or field-level descriptions inline or on hover in settings panels, property editors, or UI components that display configurable options, improving user understanding and interaction by attaching meaningful annotations, notes, or support text tied directly to individual properties or parameters.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        items: [
            { field: "name", description: "The name of the item" },
            { field: "price", description: "The price in USD" }
        ],
        model: {
            name: "Laptop",
            price: 999
        }
    });
    </script>

### items.editable `Boolean|Function`

The JavaScript function that is executed when the value cell is about to be opened for editing. The returned result will determine whether an editor  will be created.

> Items of type Object are not editable.


<div class="meta-api-description">
How to allow inline editing of specific property values in Kendo UI PropertyGrid? Enable or disable inline editing of individual property values within a property grid by defining custom logic that runs when a cell enters edit mode, allowing dynamic control to specify which cells or fields can be modified based on conditions, user roles, or property characteristics. Configure the behavior to allow or prevent editing dynamically through JavaScript functions that return boolean values, supporting scenarios like read-only fields, conditional edit permissions, or selective inline update capabilities. This control excludes complex object-type values from being editable, focusing on primitive or simple data types for inline modifications while enabling tailored interactive editing experiences in property grids.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        items: [
            { field: "name", editable: true },
            { field: "id", editable: false },
            { field: "status", editable: (data) => data.category === "active" }
        ],
        model: {
            name: "Laptop",
            id: 123,
            status: "pending",
            category: "active"
        }
    });
    </script>

### items.editor `String|Function`

Provides a way to specify a custom editing UI for the value of the property. To create the editing UI, use the `container` parameter.

> * The editing UI has to contain an element with a set `name` HTML attribute. The attribute value should be set to `value`.
> * The validation settings that are defined in the `model.fields` configuration will not be applied automatically. In order for the validation to work, you (the developer) are responsible for attaching the corresponding validation attributes to the editor input. If the custom editor is a component, to avoid visual issues, you can [customize the tooltip position of the validation warning](/framework/validator/overview#customizing-the-tooltip-position).

When used as `String`, defines the editor component type. Set the options for the component via the [items.editorOptions](/api/javascript/ui/propertygrid/configuration/items#editoroptions).For further info check the Form API: [`field`](/api/javascript/ui/form/configuration/items#itemseditor)


<div class="meta-api-description">
How to override default editors in Kendo UI PropertyGrid with custom components? Customize property value editing by injecting tailored input elements, components, or third-party controls directly into a UI container, enabling developers to configure, set, or override default editors with bespoke user interfaces. This includes binding custom editor components, controlling editor types via string identifiers, and applying manual validation attributes since automatic validation from field models is not enforced. Adjust tooltip placement for validation messages to prevent visual overlap, implement dynamic input naming for form data binding, and manage editor options to fine-tune behavior, supporting scenarios like specialized controls, interactive forms, and seamless integration of external UI elements into property editing workflows.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        items: [
            { field: "name", editor: "TextBox" },
            { field: "price", editor: "NumericTextBox" },
            { field: "category", editor: "DropDownList" }
        ],
        model: {
            name: "Laptop",
            price: 999,
            category: "Electronics"
        }
    });
    </script>

### items.editorOptions `Object`

Defines the component options for the custom property value UI editor that is set via the `items.editor` configuration. For further info check the Form API: [`field`](/api/javascript/ui/form/configuration/items#itemseditoroptions).


<div class="meta-api-description">
How to customize the settings of the custom value editor in a Kendo UI property grid? Configure and customize the settings and behavior of the custom value editor within a property grid, enabling control over editor initialization, component-specific options like data binding, validation rules, appearance tweaks, and interaction handling; adjust editor parameters, pass configuration props, define editor state defaults, set validation constraints, or control visual styling and behaviors dynamically for tailored property editing experiences in forms or UI grids.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        items: [
            { 
                field: "price", 
                editor: "NumericTextBox",
                editorOptions: { min: 0, max: 10000, decimals: 2 }
            },
            { 
                field: "category", 
                editor: "DropDownList",
                editorOptions: { 
                    dataSource: ["Electronics", "Books", "Clothing"],
                    filter: "startswith"
                }
            }
        ],
        model: {
            price: 999.99,
            category: "Electronics"
        }
    });
    </script>

### items.field `String`

Maps the item configuration to the model property.


<div class="meta-api-description">
What is the correct syntax for setting up two-way binding in a PropertyGrid with a specific data model property? Configure a mapping between UI elements and underlying data by specifying the exact data model property name to bind for dynamic updates and synchronization, enabling control over which model fields are linked to interface items, setting or associating data keys for two-way binding, connecting form inputs to specific object properties, defining the data property path for automatic value reading and writing, and managing how individual UI components correspond to model attributes for seamless data reflection and manipulation within interactive grids or property editors.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        items: [
            { field: "name" },
            { field: "price" },
            { field: "category" }
        ],
        model: {
            name: "Laptop",
            price: 999,
            category: "Electronics"
        }
    });
    </script>

### items.format `String`

The format that is applied to the value before it is displayed. Takes the `{0:format}` form where `format` is a [standard number format](/api/javascript/kendo#standard-number-formats), [custom number format](/api/javascript/kendo#custom-number-formats), [standard date format](/api/javascript/kendo#standard-date-formats) or a [custom date format](/api/javascript/kendo#custom-date-formats).

> The [`kendo.format`](/api/javascript/kendo/methods/format) function is used to format the value.


<div class="meta-api-description">
How to format currency values in Kendo UI PropertyGrid with a specific decimal place? Control and customize how values appear in a property grid by applying various formats such as numeric, currency, percentage, date, time, or custom patterns to individual items. Enable developers to format numbers with standard or custom numeric formats, display dates using predefined or user-defined date/time formats, present currency values with symbols or specific decimal places, and define personalized string patterns for display. Configure formatting strings using standard format specifiers or custom format codes within placeholder syntax to ensure consistent, localized, and readable data presentation, supporting diverse scenarios like financial data, percentages, timestamps, and custom text formatting in UI components.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        items: [
            { field: "price", format: "{0:C2}" },
            { field: "percent", format: "{0:P}" },
            { field: "date", format: "{0:MM/dd/yyyy}" }
        ],
        model: {
            price: 999.99,
            percent: 0.15,
            date: new Date(2023, 5, 15)
        }
    });
    </script>

### items.group `String`

Sets the name of the group to which the property will belong, if grouping is enabled. Only root level items can be grouped.


<div class="meta-api-description">
How can I group property entries in Kendo UI PropertyGrid? Organize and categorize property entries by assigning them to specific named groups to enable grouping related settings together, controlling and configuring how root-level items are clustered within a property list, allowing developers to set, structure, or arrange properties into logical collections or sections for clearer navigation and management in a configurable property interface.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        items: [
            { field: "name", group: "Basic Info" },
            { field: "description", group: "Basic Info" },
            { field: "price", group: "Financial" },
            { field: "cost", group: "Financial" }
        ],
        model: {
            name: "Laptop",
            description: "High-performance laptop",
            price: 999,
            cost: 500
        }
    });
    </script>

### items.items `Array`

Additional configuration options for the nested properties of the model, if any.


<div class="meta-api-description">
How to customize editor types for nested data model fields in a Kendo UI property grid? Configure and customize nested data model fields within a property grid by setting per-field options such as editor types, display templates, custom labels, read-only states, visibility toggles, and hierarchical nested configurations to control how each sub-property is rendered, bound to data, and interacted with. Enable granular control over complex object structures by defining detailed settings for child properties during initialization, allowing users to tailor property editors, hide or show specific fields, set read-only modes, and apply custom UI components or templates to any level of nested properties inside a model-driven property grid interface.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        items: [
            { 
                field: "address",
                items: [
                    { field: "street" },
                    { field: "city" },
                    { field: "zipCode" }
                ]
            }
        ],
        model: {
            address: {
                street: "123 Main St",
                city: "Anytown",
                zipCode: "12345"
            }
        }
    });
    </script>

### items.template `String|Function`

The [`template`](/api/javascript/kendo/methods/template) which is rendered for the property's value.


<div class="meta-api-description">
How can I customize the display of property values in a Kendo UI PropertyGrid? Customize the display of property values by defining templates that render HTML, formatted text, or dynamic content, allowing control over how fields appear with custom markup, bindings, or string and function-based formatting options. Enable tailored visualization for individual property values using template functions or string templates to format, style, or transform displayed data within property listings, supporting flexible content rendering and interactive display customization for property editors, data grids, or UI components.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        items: [
            { 
                field: "name", 
                template: (data) => `<strong>${data.value}</strong>` 
            },
            { 
                field: "status", 
                template: (data) => `<span class="${data.value}">${data.value}</span>` 
            }
        ],
        model: {
            name: "Laptop",
            status: "active"
        }
    });
    </script>

### items.validation `Object`

Specifies the validation rules for the field.


<div class="meta-api-description">
How to add custom validation rules to PropertyGrid fields in Kendo UI for jQuery? Configure input validation rules, constraints, and error messages for individual PropertyGrid fields using built-in validators like required, minimum, maximum, and pattern matching, or implement custom validation functions to enforce data integrity and client-side checks, control when and how errors display, and set up field-level validation logic to ensure correct user input during form initialization or runtime adjustments.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        items: [
            { 
                field: "name", 
                validation: { required: true, minLength: 2 }
            },
            { 
                field: "email", 
                validation: { required: true, email: true }
            },
            { 
                field: "age", 
                validation: { min: 18, max: 120 }
            }
        ],
        model: {
            name: "",
            email: "",
            age: 25
        }
    });
    </script>

### messages `Object`

Defines the text of the command buttons that are shown within the PropertyGrid. Used primarily for localization.


<div class="meta-api-description">
How do I customize the text labels in Kendo UI's PropertyGrid component? Customize, translate, or adapt the text labels and command button captions displayed within the property grid interface by setting or overriding message strings, enabling localization, internationalization, language support, custom phrasing, UI text modification, multilingual configuration, resource string replacement, or user interface text adjustments for commands and controls.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        messages: {
            defaultGroupName: "General",
            commands: {
                details: "Show Details",
                excel: "Export to Excel",
                group: "Group",
                pdf: "Export to PDF",
                search: "Search",
                sort: "Sort"
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### messages.defaultGroupName `String` *(default: Other)*

When grouping is enabled, sets the name for the group, to which any root properties without a defined group will be added to.


<div class="meta-api-description">
How to set default group label in Kendo UI PropertyGrid? Control or configure the default group label or name applied automatically to root-level properties in a property grid interface when grouping features are enabled, specifying the fallback or catch-all category title for ungrouped items, managing how properties without explicit groups are organized and displayed, setting a default classification or section header for items that do not belong to any custom or user-defined group, and customizing the grouping behavior by naming the standard group container where uncategorized properties appear.
</div>

#### Example - set default group name

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5,
            price: 10,
            agree: false,
            details: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida tincidunt tellus."
        },
        items:[
            {field: "foo", group: "Group A", editable: false},
            {field: "baz", group: "Group B", editor: "NumericTextBox", editorOptions: { min: 1, max: 10 } },
            {field: "agree", group: "Group C", validation: { required: true } },
            {field: "details", group: "Group D", editor: "TextArea", editorOptions: { rows: 5 }, template: (data)=>`<span style="color:red">${data.value}</span>`},
            {field: "price", editable: false, format: "{0:C}"}
        ],
        messages: { defaultGroupName: "Other Items"}
      });
    </script>

### messages.commands `Object`

Defines the text and/or title for the command buttons that are used across the component.


<div class="meta-api-description">
How do I customize the button text in Kendo UI PropertyGrid? Customize, set, or override the displayed text, labels, titles, or captions for action buttons, commands, or controls within a property grid interface by supplying localized or translated strings; enable internationalization and localization of command names, button text, tooltips, or UI labels for configurable property editors, allowing developers to control and tailor command messages, prompts, and button titles to different languages, cultures, or custom terminology in the property grid environment.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        messages: {
            commands: {
                details: "View Details",
                excel: "Export Excel File",
                group: "Group Properties",
                pdf: "Export PDF File",
                search: "Search properties...",
                sort: "Sort Properties"
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### messages.commands.details `String` *(default: "Toggle Info box")*

Defines the title attribute for the `details` command.


<div class="meta-api-description">
How do I customize the hover title for detail commands in a Kendo UI property grid? Control and customize the tooltip text, hover titles, or descriptive labels shown for detail commands within a property grid interface, enabling configuration of accessible or informative titles, setting command descriptions that appear on mouseover, adjusting textual hints for detail actions, and modifying the displayed attribute for detail-related commands in property editing contexts.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        messages: {
            commands: {
                details: "Show Property Details"
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### messages.commands.excel `String` *(default: "Export to Excel")*

Defines the text of the **Export to Excel** button that exports the component's data in spreadsheet format.


<div class="meta-api-description">
How to localize the "Export to Excel" button in a PropertyGrid? Customize, set, or localize the label text for the Export to Excel command button within a PropertyGrid interface, enabling control over the displayed caption for Excel export functionality, adjusting button wording, naming, or translations to fit different languages, user preferences, or UI customizations related to exporting grid data in spreadsheet format.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        messages: {
            commands: {
                excel: "Export as Spreadsheet"
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### messages.commands.group `String` *(default: "Group Items")*

Defines the title attribute for the `group` DropDownList.


<div class="meta-api-description">
How do I customize the title of dropdown menus in a Kendo UI property grid? Customize, configure, or set the label, text, or title shown on dropdown menus or command groups within a property grid interface, enabling control over group command captions, headings, or menu titles for enhanced UI clarity and localization support in settings panels or configuration dialogs.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        messages: {
            commands: {
                group: "Group by Category"
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### messages.commands.pdf `String` *(default: "Export to PDF")*

Defines the text of the **Export to PDF** button that exports the component's data in PDF format.


<div class="meta-api-description">
How do I change the export-to-PDF button label in a Kendo UI PropertyGrid? Customize or set the label, text, or caption of the export-to-PDF button within a property grid or data grid interface, control the displayed wording for generating downloadable PDF reports, configure the export button’s name or title for PDF output, modify the button text that triggers PDF export functionality, enable tailored prompt text for saving or exporting data as a PDF file, adjust the user interface string associated with PDF generation commands, change or localize the export PDF button label for improved clarity or user experience, specify the textual content shown on the control responsible for exporting grid data to a PDF document, set the command button text related to PDF exports, and personalize how the export-to-PDF action is presented through button text customization.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        messages: {
            commands: {
                pdf: "Export as Document"
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### messages.commands.search `String` *(default: "Search...")*

Defines the placeholder text in the PropertyGrid search panel.


<div class="meta-api-description">
How to change the default placeholder text in a Kendo UI PropertyGrid's search input? Configure or customize the search input placeholder text in the property grid's search panel to display localized or custom messages, enabling control over the hint, prompt, or default text shown in the search box. Adjust or set the prompt that appears inside the property listing search field, supporting internationalization, localization, or specific terminology preferences to improve user guidance and search usability within the property grid interface.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        messages: {
            commands: {
                search: "Find properties..."
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### messages.commands.sort `String` *(default: "Sort")*

Defines the title attribute for the Sort DropDownList.


<div class="meta-api-description">
How to customize sorting dropdown menu label in Kendo UI PropertyGrid? Customize or configure the label, title, or tooltip text that appears on the sorting dropdown menu in the property grid interface, enabling control over the displayed sort command name or description. Adjust the accessible title attribute for sorting options, modify the sort dropdown's header text, or set the sort command label to improve user interface clarity, localization, or accessibility in configurable property lists. Tailor the text shown for sort controls within property panels to match specific language, terminology, or user experience needs in component settings.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        messages: {
            commands: {
                sort: "Sort Properties"
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### model `Object`

Defines the model to which the PropertyGrid is bound to.


<div class="meta-api-description">
How to link a data model to Kendo UI PropertyGrid? Connect or link a data model, object instance, or plain JavaScript object to the property grid interface to display, view, edit, or update its fields and attributes dynamically; configure binding to control which properties appear, synchronize changes made through the UI back to the source model, enable two-way data flow between forms or editors and the underlying data structure, customize which object keys or fields are editable, and set or assign the target data source for real-time property manipulation in user interfaces.
</div>

#### Example - define the model to which the PropertyGrid is bound

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

### navigatable `Boolean` *(default: false)*

If set to `true`, the user can navigate the component with the keyboard. By default, keyboard navigation is disabled.


<div class="meta-api-description">
How do I enable keyboard navigation in the Kendo UI PropertyGrid component? Enable keyboard navigation and focus control within the property grid to move between items, open or activate editors using arrow keys, tab, or keyboard shortcuts, allowing users to traverse properties efficiently without a mouse. Configure keyboard interactions to support accessibility, set focus management for item selection, and control how users can navigate through property fields or panels using keys. This feature facilitates keyboard-driven editing, selection movement, and focus shifts inside the property grid interface, improving usability for power users, accessibility compliance, and streamlined keyboard workflows.
</div>

#### Example - enabling keyboard navigation

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        navigatable: true
      });
    </script>

### pdf `Object`

Configures the PDF export settings of the PropertyGrid.

> Chrome is known to crash when generating very large PDF-s.  A solution to this is to include the
> [Pako](http://nodeca.github.io/pako/) library. Simply loading this library with a `<script>` tag enables compression in the PDF, e.g.:
>
> `<script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>`


<div class="meta-api-description">
How to export PropertyGrid data as PDF with customizable layout and compression? Configure exporting and saving PropertyGrid data as PDF files with options to control layout, formatting, metadata, compression, and generation settings. Enable or fine-tune PDF export behavior such as page layout, content styling, metadata inclusion, compression techniques to reduce file size, and workaround browser-specific issues like Chrome crashing on large PDFs by integrating additional libraries for compression support. Customize PDF output to match application needs, optimize export performance, and seamlessly generate portable documents from the PropertyGrid content.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        pdf: {
            fileName: "PropertyGrid.pdf",
            author: "Kendo UI Team",
            autoPrint: true,
            margin: { top: 20, left: 20, right: 20, bottom: 20 }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### pdf.author `String` *(default: null)*

The author of the PDF document.


<div class="meta-api-description">
How to set author name in Kendo UI PropertyGrid PDF export? Control, configure, or specify the author name embedded in PDF metadata when exporting data or components to PDF format, including setting the PDF document's "Author" property, customizing who is listed as the creator or author within PDF properties, defining the author string for PDF export, managing metadata for author identification in exported PDFs, and enabling precise assignment of author information in PDF document info for better tracking, identification, or customization of PDF output files.
</div>

#### Example - setting the author

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
            author: "John Doe"
        }
      });
    </script>

### pdf.autoPrint `Boolean` *(default: false)*
Specifies if the Print dialog should be opened immediately after loading the document.

> Some PDF Readers/Viewers will not allow opening the Print Preview by default, it might be necessary to configure the corresponding add-on or application.


<div class="meta-api-description">
How can I automatically trigger print dialog when PDF document loads in Kendo UI PropertyGrid? Automatically trigger the print dialog or print preview when a PDF document finishes loading, enabling immediate printing or suppressing it based on configuration. Control whether the print popup appears right after the PDF renders, support auto-print functionality, manage automatic print prompt display, set options to launch print dialogs on document load, configure silent printing or manual print confirmation, handle PDF viewer compatibility with auto-print features, enable or disable printing prompts on PDF open, and adjust print dialog behavior for seamless or user-initiated printing workflows.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        pdf: {
            fileName: "PropertyGrid.pdf",
            autoPrint: true
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### pdf.avoidLinks `Boolean|String` *(default: false)*

A flag which indicates whether to produce actual hyperlinks in the exported PDF file. You can also pass a CSS selector as an argument. All matching links will be ignored.


<div class="meta-api-description">
How to prevent links in PropertyGrid from being clickable when generating PDF? Control the inclusion or exclusion of clickable hyperlinks when generating PDF exports from a property grid, enabling you to disable active links entirely or selectively omit links matching specific CSS selectors to customize PDF output by preventing certain or all hyperlinks from being embedded or made interactive in the final exported document.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        pdf: {
            fileName: "PropertyGrid.pdf",
            avoidLinks: true
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### pdf.creator `String` *(default: "Kendo UI PDF Generator")*

The creator of the PDF document.


<div class="meta-api-description">
How to set author information in exported PDFs with Kendo UI PropertyGrid? Configure the PDF metadata author or creator information embedded in exported documents, control the document's creator string displayed in PDF properties, specify or customize the author identity associated with generated PDFs, define the exported file’s creator metadata for accurate attribution, set or modify the PDF author tag as part of PDF export settings to reflect correct document ownership, enable specifying who created the PDF during export, and adjust the creator field within PDF generation options for PropertyGrid exports.
</div>

#### Example - setting the creator

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          creator: "John Doe"
        }
      });
    </script>

### pdf.date `Date`

The date when the PDF document is created. Defaults to `new Date()`.


<div class="meta-api-description">
How do I set the creation date in PDF documents exported from a PropertyGrid? Configure or specify the embedded creation timestamp in exported PDF documents, controlling PDF metadata dates by setting the document’s creation or modification time through standard date inputs like JavaScript Date objects, enabling customization of PDF file properties such as creation date, export time, or metadata timestamps for accurate document tracking, versioning, audit trails, or compliance purposes.
</div>

#### Example - setting the date

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          date: new Date("2014/10/10")
        }
      });
    </script>

### pdf.fileName `String` *(default: "Export.pdf")*

Specifies the file name of the exported PDF file.


<div class="meta-api-description">
How do I customize the PDF file name when exporting data from a Kendo UI PropertyGrid? Specify or customize the output PDF file name when exporting data or content to PDF format, control the saved or downloaded PDF filename for export operations, set or configure the target PDF document name during PDF generation or save workflows, enable naming or renaming of the exported PDF file to fit automated export processes, downloads, or user-defined file naming conventions for PDF exports from grids, tables, or property views.
</div>

#### Example - setting the default PDF file name

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          fileName: "Employees.pdf"
        }
      });
    </script>

### pdf.forceProxy `Boolean` *(default: false)*

If set to `true`, the content will be forwarded to [`proxyURL`](/api/javascript/ui/propertygrid#configuration-pdf.proxyURL) even if the browser supports the local saving of files.


<div class="meta-api-description">
How to force PDF export through a server proxy in Kendo UI PropertyGrid? Control whether PDF exports route through a server proxy to enable consistent downloading, apply server-side processing, enforce proxy forwarding of PDF data, override browser local save options, configure export behavior to use proxyURL, ensure reliable file delivery regardless of client capabilities, set server-handled PDF generation, toggle forcing proxy use for PDF output, manage download flow through server middleware, and guarantee uniform export handling across different environments.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        pdf: {
            fileName: "PropertyGrid.pdf",
            forceProxy: true,
            proxyURL: "/api/export-pdf"
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### pdf.jpegQuality  `Number` *(default: 0.92)*

Specifies the quality of the images within the exported file, from 0 to 1.


<div class="meta-api-description">
How to adjust image quality when exporting PropertyGrid content as PDF? Adjust image compression level for PDF exports by setting JPEG quality from low to high using values between zero and one, balancing file size reduction and image clarity; configure image fidelity and compression ratio when saving or exporting PropertyGrid content as PDF, control visual quality versus storage size, optimize image output settings for PDF generation with options to prioritize either smaller file size or higher resolution images embedded in the document.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        pdf: {
            fileName: "PropertyGrid.pdf",
            jpegQuality: 0.8
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### pdf.keepPNG `Boolean` *(default: false)*

If set to `true` all PNG images contained in the exported file will be kept in PNG format.


<div class="meta-api-description">
How to prevent PNG images from being compressed when exporting a property grid to PDF in Kendo UI? Control whether PNG images embedded within a property grid export to PDF retain their original PNG format instead of being converted or compressed, enabling preservation of image quality and transparency; configure, enable, or set options to maintain PNG graphics intact during PDF export, keep embedded images as PNG files, or prevent image format degradation when saving property grids to PDF documents.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        pdf: {
            fileName: "PropertyGrid.pdf",
            keepPNG: true
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### pdf.keywords `String` *(default: null)*

Specifies the keywords of the exported PDF file.


<div class="meta-api-description">
How do I set custom keywords in a Kendo UI PropertyGrid's exported PDF? Set, configure, or control the keywords metadata embedded in exported PDF files from a PropertyGrid, enabling descriptive tags, searchable terms, and indexable content within the PDF metadata for improved document searchability, organization, and management. This includes adding custom searchable keywords, configuring metadata tags for PDFs, enhancing PDF document indexing, and embedding relevant keyword information to support content discovery and search engine optimization in exported PDF files.
</div>

#### Example - setting the keywords

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          keywords: "object details"
        }
      });
    </script>

### pdf.landscape `Boolean` *(default: false)*

If set to `true`, reverses the paper dimensions in such a way that the width becomes the larger edge.


<div class="meta-api-description">
How do I set the page layout to landscape when exporting a grid to PDF using Kendo UI for jQuery PropertyGrid? Control the page layout orientation when exporting grids or tables to PDF by setting the document to landscape or portrait mode, enabling the width to be greater than the height for wide-format printing or display. Adjust the export orientation by toggling between horizontal (landscape) and vertical (portrait) page setups to fit wide datasets, reports, or property listings. Configure or enable the paper orientation during PDF generation to switch between standard page alignment and rotated layouts for better readability, presentation, or printing preferences in exported files.
</div>

#### Example - enabling the landscape mode

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          landscape: true
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
How do I adjust page margins in PDF export from a PropertyGrid using Kendo UI for jQuery? Set or adjust page margins for PDF export from a property grid, defining top, bottom, left, and right spacing to control page layout and whitespace when generating PDF files. Configure margin dimensions using numeric values or string formats including units such as millimeters, centimeters, inches, or points to customize the printable area. Control or fine-tune PDF page borders for exported property lists by specifying margin sizes in different measurement units to ensure proper content alignment and spacing in the output document. Enable precise page margin settings to improve formatting and avoid clipping or overflow in PDF exports of property grids.
</div>

#### Example - setting the margins

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          margin: {
            left: 10,
            right: "10pt",
            top: "10mm",
            bottom: "1in"
          }
        }
      });
    </script>

### pdf.margin.bottom `Number|String` *(default: 0)*

The bottom margin. Numbers are considered as `pt` units.


<div class="meta-api-description">
How do I adjust the margin at the bottom of a PDF exported from a Kendo UI PropertyGrid? Adjust or specify the bottom margin spacing for PDF exports or printed output from a property grid or form, controlling the amount of space between the page content and the bottom edge of the page. This setting helps manage page layout, define footer distance, customize printable boundaries, and fine-tune the vertical spacing on generated PDF pages. Developers can set numeric values representing point units to ensure consistent bottom padding, control page formatting, enable precise layout adjustments for print-ready documents, and influence how content fits within physical or digital page constraints.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        pdf: {
            fileName: "PropertyGrid.pdf",
            margin: {
                bottom: 30
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### pdf.margin.left `Number|String` *(default: 0)*

The left margin. Numbers are considered as `pt` units.


<div class="meta-api-description">
How do I adjust the left margin in a PDF exported from a Kendo UI Property Grid? Set or adjust the left page margin, left indentation, or left padding for PDF exports of property grids, controlling page layout, whitespace, and content alignment on the left side of exported PDFs; configure left margin size using numeric values representing points to customize spacing, margin width, document formatting, or page boundary positioning when generating or printing PDFs from grids or tabular data.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        pdf: {
            fileName: "PropertyGrid.pdf",
            margin: {
                left: 25
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### pdf.margin.right `Number|String` *(default: 0)*

The right margin. Numbers are considered as `pt` units.


<div class="meta-api-description">
How to set the right margin size for PDF export in Kendo UI PropertyGrid? Adjust the right page margin size when exporting grid data or forms to PDF, controlling the gap or whitespace between content and the right edge of the page; specify the margin as a numeric value representing points, enabling configuration of page layout, spacing, and printable area boundaries for precise document formatting and export customization.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        pdf: {
            fileName: "PropertyGrid.pdf",
            margin: {
                right: 25
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### pdf.margin.top `Number|String` *(default: 0)*

The top margin. Numbers are considered as `pt` units.


<div class="meta-api-description">
How do I set the top margin for PDF exports from a Kendo UI PropertyGrid? Adjust or configure the top margin spacing for PDF exports of grid or property data, setting the distance from the top edge to control printable area, page layout, and header positioning when generating PDFs from property grids or tables; set numeric values to define top page padding, spacing, or margin in points to customize document formatting, header offset, and overall PDF page structure during export or print operations.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        pdf: {
            fileName: "PropertyGrid.pdf",
            margin: {
                top: 30
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### pdf.paperSize `String|Array` *(default: "auto")*

Specifies the paper size of the PDF document. when `auto` (default), the paper size is determined by the content.

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
How do I customize the paper size for PDF export in a Kendo UI PropertyGrid? Configure and control the page dimensions for PDF export from a property grid by setting custom paper sizes, including standard formats like A4 or A3, precise width and height values as numeric arrays in points, or dimension arrays with units such as millimeters, centimeters, inches, or points. Enable automatic sizing based on content or specify exact page size to align PDF output dimensions with on-screen content measured in pixels, supporting flexible, unit-based customization of printable area and document layout during export operations. Adjust and set export page size parameters to fit different printing standards, customize PDF layout, and ensure accurate scaling from pixels to physical units for professional PDF generation from tabular or form-like data representations.
</div>

#### Example - setting a custom paper size

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          paperSize: ["20mm", "20mm"]
        },
      });
    </script>

### pdf.proxyURL `String` *(default: null)*

The URL of the server side proxy which will stream the file to the end user. A proxy will be used when the browser is not capable of saving files locally. Such browsers are IE version 9 and earlier, and Safari. The developer is responsible for implementing the server-side proxy. The proxy will return the decoded file with the `Content-Disposition` header set to `attachment; filename="<fileName.pdf>"`.

The proxy will receive a POST request with the following parameters in the request body:

* `contentType`&mdash;The MIME type of the file.
* `base64`&mdash;The base-64 encoded file content.
* `fileName`&mdash;The file name, as requested by the caller.


<div class="meta-api-description">
How do I enable PDF downloads with streaming for Internet Explorer 9 using Kendo UI PropertyGrid? Configure server-side proxy URL to enable PDF downloads with streaming for browsers that cannot save files locally, such as Internet Explorer 9 and older versions or Safari; this setup supports setting or specifying a proxy endpoint that handles POST requests containing the base64-encoded PDF data, content MIME type, and filename, streaming the decoded PDF file back with proper content disposition headers to facilitate file download, thereby allowing control over download behavior, handling cross-browser compatibility for PDF export, managing secure transfer of PDF content from server to client, and enabling seamless file saving in restricted browser environments.
</div>

#### Example - setting the server proxy URL

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          proxyURL: "/save"
        },
      });
    </script>

### pdf.proxyTarget `String` *(default: "_self")*

A name or keyword which indicates where to display the document that was returned by the proxy. To display the document in a new window or iframe, the proxy will set the `Content-Disposition` header to `inline; filename="<fileName.pdf>"`.


<div class="meta-api-description">
How to configure Kendo UI PropertyGrid to display a PDF retrieved via proxy in a new browser tab? Configure how and where a PDF generated or retrieved via a proxy is shown, including options to open the document in a new browser tab, a separate window, or embedded directly within an iframe or inline frame on the page. Control embedding behavior, display location, and loading context by specifying targets such as named frames, keywords, or window names to influence how the PDF content is rendered or presented to users, enabling seamless integration of inline PDF viewing, external tab opening, or dynamic embedding in custom containers. Adjust settings to modify the browser’s handling of PDF files returned by proxy requests, controlling whether files load within the current interface, in new browser instances, or within specific frame targets, supporting workflows that require flexible document access, preview, and display options.
</div>

#### Example - opening the generated document in a new window

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
            forceProxy: true,
            proxyURL: "/save",
            proxyTarget: "_blank"
        },
      });
    </script>

### pdf.subject `String` *(default: null)*

Sets the subject of the PDF file.


<div class="meta-api-description">
How to set the subject metadata for PDFs exported from Kendo UI PropertyGrid? Configure, set, or specify the PDF document subject metadata embedded during PDF export from property grid components, enabling customization of the PDF Subject field for improved document identification, content description, indexing by search engines, and display in PDF viewers; control and customize the PDF file’s subject string to enhance metadata tagging, searchability, and classification when generating PDFs from user interface property editors or grids.
</div>

#### Example - setting the subject

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          subject: "Details"
        },
      });
    </script>

### pdf.title `String` *(default: null)*

Sets the title of the PDF file.


<div class="meta-api-description">
How do I change the title of a PDF generated from the Kendo UI PropertyGrid component? Configure or set the document title metadata for exported PDF files generated from the property grid component, enabling customization of the PDF file's title as displayed in PDF readers, file viewers, or document properties; specify, define, or control the PDF export title string to enhance identification, organization, searchability, or branding of the generated PDF output.
</div>

#### Example - setting the title

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        toolbar: ["pdf"],
        pdf: {
          title: "Information"
        },
      });
    </script>

### resizable `Boolean` *(default: true)*

When set to `true` the user will be able to resize columns via the context menu. When set to `false` the ContextMenu `Resize` command will not be available.


<div class="meta-api-description">
How to enable column resizing in Kendo UI PropertyGrid? Enable or disable the ability to adjust column widths dynamically through context menu options in a grid or property editor interface, allowing users to control whether columns can be interactively resized or fixed in size. This setting governs whether resizing commands are available in right-click menus, affecting if column size adjustments can be made on demand, tailored, locked, or prevented from manual changes. It supports use cases involving flexible layout customization, column width management, user-driven resizing toggling, and interface control over grid or property panel column dimensions via context menu actions.
</div>

#### Example - disable the Details/Info box for properties displayed in the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        width: 400,
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        resizable: false,
        items: [
            {field: "foo", description: "I am foo!"},
            {field: "baz", description: "I am baz!" }
        ]
      });
    </script>

### showDetails `Boolean` *(default: true)*

Use this configuration to disable the `ToggleDetails` command button on the toolbar and to prevent the rendering of the Details/Info box.


<div class="meta-api-description">
How do I hide the details panel in Kendo UI PropertyGrid? Control the visibility and functionality of the details panel and info box within the property grid interface, including enabling or disabling the details section, hiding or showing the toolbar toggle button for details, managing the display of additional property information, configuring whether the info area renders initially, and controlling user access to expand or collapse detailed views of properties during setup or runtime.
</div>

#### Example - disable the Details/Info box for properties displayed in the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        model: {
            foo: "bar",
            baz: 5
        },
        showDetails: false,
        items: [
            {field: "foo", description: "I am foo!"},
            {field: "baz", description: "I am baz!" }
        ]
      });
    </script>

### scrollable `Boolean` *(default: true)*

If set to `true`, the PropertyGrid will display a scrollbar when the total row height or width exceeds the PropertyGrid height or width. By default, scrolling is enabled.


<div class="meta-api-description">
How to enable automatic scrolling in Kendo UI property grid? Control the automatic appearance of vertical and horizontal scrollbars when the list of properties or rows exceeds the visible area, enabling or disabling scrolling behavior, overflow handling, and navigation within the grid of properties or settings panel. Adjust whether scrollbars appear dynamically as content grows beyond container size, ensuring users can scroll through long or wide collections of items in property tables or configuration panels, with options to toggle scrolling functionality, handle overflow layout, and maintain usability when many rows or columns are present.
</div>

#### Example - disable the scrolling for the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        scrollable: false,
        items: [
            {field: "foo", description: "I am foo!"},
            {field: "baz", description: "I am baz!" }
        ]
      });
    </script>

### toolbar `String|Function|Array|Object`

* If a `String` value is assigned to the `toolbar` configuration option, it will be treated as a single string template for the whole PropertyGrid toolbar and the string value will be passed as an argument to a [`kendo.template()`](/api/javascript/kendo/methods/template) function.
* If a `Function` value is assigned (it may be a `kendo.template()` function call or a generic function reference), then the return value of the function will be used to render the contents of the PropertyGrid toolbar.
* If an `Array` value is assigned, it will be treated as the list of commands which are displayed in the PropertyGrid toolbar. Commands can be custom or built-in. The supported built-in commands are:
  * `search`&mdash;Adds a Search input to the ToolBar of the PropertyGrid. Search is performed by property name.
  * `sort`&mdash;Adds a DropDownList with sorting options. Properties are sorted by property name.
  * `group`&mdash;Renders a button for toggling between List and Group layout.
  * `details`&mdash;Renders a button for toggling the Details/Info box.
  * `separator`&mdash;Renders a separator element.
  * `spacer`&mdash;Renders a spacer element.
  * `excel`&mdash;Exports the data in MS Excel format.
  * `pdf`&mdash;Exports the data in PDF format.
* If an `Object` value is assigned, it will propagate these properties to the underlying Toolbar:
  * `items` - an array of commands as explained above
  * `overflow` - an object that configures the overflow behavior of the toolbar. The same as [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) property


<div class="meta-api-description">
How to customize the top toolbar in Kendo UI property grid component? Customize and control the top toolbar interface of a property grid component by configuring templates, rendering functions, or arrays of command identifiers to include search inputs, sorting dropdowns, grouping toggles, details view buttons, separators, spacers, and export options like Excel or PDF. Enable flexible toolbar customization using string templates processed by template engines, functions returning custom renderings, or structured command arrays with built-in commands for filtering properties by name, changing layout views, or exporting data. Adjust toolbar elements to support developer needs for searching, sorting, grouping, detail toggles, separators, spacers, and file export features, as well as configuring overflow behavior and command delegation through nested options for comprehensive toolbar management and UI customization in property grid interfaces.
</div>

#### Example - set the ToolBar as an array of commands

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        toolbar: ["search", "spacer", "sort"],
        model: {
            foo: "bar",
            baz: 5
        },
        items: [
            {field: "foo", description: "I am foo!"},
            {field: "baz", description: "I am baz!" }
        ]
      });
    </script>

#### Example - set the ToolBar as a string template

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        toolbar: "<p>My string template in a paragraph.</p>",
        model: {
            foo: "bar",
            baz: 5
        },
        items: [
            {field: "foo", description: "I am foo!"},
            {field: "baz", description: "I am baz!" }
        ]
      });
    </script>

Apart from the built-in tools, the PropertyGrid fully exposes the [ToolBar.items API](/api/javascript/ui/toolbar/configuration/items). This way you can specify any custom tools in the component using the components available in the ToolBar itself. Note that all tools (commands) must have their name specified, as demonstrated in the next example:

#### Example - add split button to the ToolBar

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        columns: {
            fieldColumn: { width: 200 },
            valueColumn: { width: 250 }
        },
        toolbar: [
            "search",
            "spacer",
            "sort",
            {
                name: "splitbtn",
                type: "splitButton",
                text: "SplitButton",
                menuButtons: [
                    {text: "Option 1"},
                    {text: "Option 2"}]
            }],
        model: {
            foo: "bar",
            baz: 5
        },
        items: [
            {field: "foo", description: "I am foo!"},
            {field: "baz", description: "I am baz!" }
        ]
      });
    </script>

### toolbar.click `Function`

The `click` handler of the toolbar command. Used for custom toolbar commands.


<div class="meta-api-description">
How to set up custom event handlers for toolbar button clicks in Kendo UI PropertyGrid? Configure custom event handlers for toolbar button clicks within a property grid interface, enabling execution of specific actions such as triggering dialogs, navigation flows, data validation, dynamic updates to property values, or other custom behaviors upon toolbar command activation. Control how and when toolbar commands respond to user interaction by setting click handlers, defining custom logic that runs on button press events in UI toolbars, managing property editing workflows, and integrating custom responses for toolbar commands in flexible property editing environments.
</div>

#### Example - specifying the name of the command

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        toolbar: [
          "search",
          { name: "custom", click: function() { alert("custom"); } }
        ],
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

### toolbar.icon `String`

Specifies the icon's name that will be rendered inside the toolbar button. When you set this option, the PropertyGrid renders an additional `span` element inside the toolbar button which has a name set to the `option` value. This approach allows you to display an icon inside your custom toolbar commands.


<div class="meta-api-description">
How to display custom icons in property grid toolbar buttons? Control the display of icons within toolbar buttons of a property grid by specifying icon names or identifiers, enabling the integration of custom graphical elements or symbols in toolbar commands, configuring the appearance of toolbar buttons with visual icons, setting icon options to enhance toolbar command clarity, showing icons alongside text in toolbar buttons, customizing toolbar commands with graphical indicators, embedding icons dynamically inside toolbar elements, and toggling icon visibility to improve user interface intuitiveness and aesthetics in property editing toolbars.
</div>

#### Example - specifying the name of the command

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        toolbar: [{name: "custom", text: "About", icon: "info-circle", imageClass: "custom-info" }],
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

### toolbar.imageClass `String`

A class name that will be rendered inside the toolbar button. When you set this option, the PropertyGrid renders an additional `span` element inside the toolbar button which has a class name set to the `option` value. This approach allows you to display an icon inside your custom toolbar commands.


<div class="meta-api-description">
How to customize icons in PropertyGrid toolbar buttons with CSS class names? Configure toolbar button icons in property grids by specifying CSS class names that render font icons, background images, or custom styles inside the toolbar buttons. Enable adding visual elements to toolbar commands through setting class identifiers that insert styled span elements, allowing customization of button icons using icon fonts, CSS backgrounds, or bespoke visual designs for property grid toolbars. This supports enhancing interface controls with scalable vector icons or image-based icons by controlling style classes linked to toolbar buttons in property editing UIs.
</div>

#### Example - specifying the name of the command

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        toolbar: [{name: "custom", text: "About", icon: "info-circle", imageClass: "custom-info" }],
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

### toolbar.name `String`

The name of the toolbar command. Can be either a built-in ("search", "sort", "group" or "details") or a custom string. The `name` is output in the HTML as a value of the `data-command` attribute of the button.


<div class="meta-api-description">
How do I customize the toolbar buttons in Kendo UI PropertyGrid? Configure and control toolbar commands by specifying unique identifiers or built-in names like search, sort, group, or details to enable targeting, styling, event handling, or DOM manipulation of PropertyGrid toolbar buttons; set command names to customize toolbar actions, manage button behavior, or integrate custom commands through data-command attributes for interactive UI functionality and precise command control.
</div>

#### Example - specifying the name of the command

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        toolbar: [
          "search",
          { name: "custom", click: function() { alert("custom"); } }
        ],
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

### toolbar.text `String`

The text that is displayed by the command button. If not set, the PropertyGrid will use the [`name`](/api/javascript/ui/propertygrid#configuration-toolbar.name) option as the button text instead.


<div class="meta-api-description">
How to customize the button text in Kendo UI PropertyGrid toolbar? Set or customize the label, caption, or displayed text of the command button within the toolbar of the property grid interface, controlling what users see as the button name, title, or tooltip; modify, configure, or override the default button text that otherwise inherits from the property name or identifier to improve clarity, localization, or user interface consistency in your application’s property editing toolbar.
</div>

#### Example - specifying the text for the command button

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        toolbar: [
          { name: "custom", text: "My Command" }
        ],
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

### toolbar.items `Array`

A JavaScript array that contains the ToolBar's commands configuration.


<div class="meta-api-description">
How do I customize the toolbar in Kendo UI PropertyGrid? Customize and control the toolbar commands in the PropertyGrid by specifying, adding, removing, or reordering the command items through an array of configuration objects that define each toolbar button’s properties such as command name, options, event handlers, icons, and display text, enabling developers to configure toolbar actions, manage available commands, and tailor the user interface for editing properties efficiently and dynamically.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        toolbar: {
            items: [
                { name: "search" },
                { name: "sort" },
                { name: "custom", text: "Custom Action", icon: "k-icon k-i-gear" }
            ]
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### toolbar.items.click `Function`

The `click` handler of the toolbar command. Used for custom toolbar commands.


<div class="meta-api-description">
What event is triggered when a toolbar button in a Kendo UI PropertyGrid is clicked? Configure custom event handlers or callback functions that trigger when a toolbar button within a property grid or similar UI component is clicked, enabling execution of user-defined actions, intercepting or overriding default command behaviors, binding custom logic, updating state or component data, handling toolbar command activations, and integrating interactive toolbar controls with dynamic responses to user clicks or command invocations.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        toolbar: {
            items: [
                { 
                    name: "custom", 
                    text: "Custom Action",
                    click: function(e) {
                        console.log("Custom button clicked");
                        alert("Custom action executed!");
                    }
                }
            ]
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### toolbar.items.icon `String`

Specifies the icon's name that will be rendered inside the toolbar button. When you set this option, the PropertyGrid renders an additional `span` element inside the toolbar button which has a name set to the `option` value. This approach allows you to display an icon inside your custom toolbar commands.


<div class="meta-api-description">
How do I add icons to property grid toolbar buttons in Kendo UI for jQuery? Customize toolbar buttons with icons by specifying an icon name or identifier, enabling display of graphical symbols or visual indicators within toolbar commands. Configure buttons to include icons by setting an icon attribute or property, allowing embedding of visual elements like glyphs or symbols for clearer command recognition. Control appearance of toolbar items by providing icon names that insert corresponding visual icons inside custom buttons, supporting interface customization and enhancing user interaction through recognizable imagery. Enable icons on toolbar actions by linking icon identifiers to buttons, facilitating intuitive navigation and richer UI commands with graphic representations for various tool functionalities and custom controls.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        toolbar: {
            items: [
                { 
                    name: "custom", 
                    text: "Settings",
                    icon: "k-icon k-i-gear"
                }
            ]
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### toolbar.items.imageClass `String`

A class name that will be rendered inside the toolbar button. When you set this option, the PropertyGrid renders an additional `span` element inside the toolbar button which has a class name set to the `option` value. This approach allows you to display an icon inside your custom toolbar commands.


<div class="meta-api-description">
How do I customize the icons on a PropertyGrid toolbar button using CSS classes? Configure or set custom icons and icon fonts on toolbar buttons by specifying CSS class names to display images or symbols within toolbar commands; control button appearance by adding icon classes that insert styled span elements, enabling visual customization of property grid toolbars with custom command icons using CSS styling or font-based icons.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        toolbar: {
            items: [
                { 
                    name: "custom", 
                    text: "Action",
                    imageClass: "custom-icon"
                }
            ]
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### toolbar.items.name `String`

The name of the toolbar command. Can be either a built-in ("search", "sort", "group" or "details") or a custom string. The `name` is output in the HTML as a value of the `data-command` attribute of the button.


<div class="meta-api-description">
How do I customize the buttons in the PropertyGrid toolbar? Configure, define, or customize toolbar button actions by specifying command identifiers that control PropertyGrid toolbar functionality, including built-in commands like search, sort, group, or details, as well as custom action strings; these identifiers enable setting, enabling, or overriding button behavior and appear as data-command attributes for interaction handling in the toolbar interface.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        toolbar: {
            items: [
                { name: "search" },
                { name: "sort" },
                { name: "customAction", text: "Custom" }
            ]
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### toolbar.items.text `String`

The text that is displayed by the command button. If not set, the PropertyGrid will use the [`name`](/api/javascript/ui/propertygrid#configuration-toolbar.name) option as the button text instead.


<div class="meta-api-description">
How to customize the text on toolbar buttons in Kendo UI PropertyGrid? Configure or customize the label, caption, or displayed text on toolbar buttons within a property grid interface, controlling how command buttons are named or titled in toolbars, enabling setting or changing button titles or captions, managing toolbar button text appearance, defining or overriding default button labels that otherwise derive from button or command identifiers, adjusting button naming conventions for clarity or localization, and modifying or specifying the visible text users see on toolbar command controls.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        toolbar: {
            items: [
                { name: "search", text: "Find Properties" },
                { name: "sort", text: "Sort Items" },
                { name: "custom", text: "Custom Action" }
            ]
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### toolbar.overflow `Object`
Specifies [`Toolbar.overflow`](/api/javascript/ui/toolbar/configuration/overflow) configuration for the toolbar.


<div class="meta-api-description">
How do I control the behavior of toolbars in Kendo UI's PropertyGrid when there is not enough space to display all items? Control and customize the behavior of toolbars when there are more items than can fit in the visible area by configuring overflow handling options such as popup menus, wrapping, or collapsing toolbar items. Enable flexible toolbar layouts that adapt to limited space by setting overflow strategies, managing how extra or hidden buttons appear, whether as dropdown menus, wrapped lines, or other overflow patterns. Adjust toolbar item presentation to optimize user interface responsiveness and usability during initialization and runtime, ensuring that when toolbar content exceeds available width, it is handled through specified overflow techniques like popup lists, wrapping, or scrollable menus. Tailor toolbar overflow behavior to enhance UX by deciding if excess controls appear in a menu, wrap to new lines, or trigger alternative UI components for seamless access to all toolbar functions.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        toolbar: {
            items: [
                { name: "search" },
                { name: "sort" },
                { name: "group" }
            ],
            overflow: {
                mode: "scroll",
                scrollButtons: "auto",
                scrollButtonsPosition: "split",
                scrollDistance: 100
            }
        },
        model: {
            foo: "bar",
            baz: 5
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
What is the PropertyGrid.toolbar.overflow.mode property used for in Kendo UI? Control and configure how toolbar items behave when exceeding visible space in a property grid interface, including options to manage overflow by enabling scrolling horizontally to pan through extra items, grouping toolbar buttons into collapsible sections for organized access, shifting excess controls into dropdown menus to ensure accessibility, or disabling any overflow handling which might cause items to be clipped or hidden. Adjusting overflow strategies helps developers set visibility, accessibility, and interaction modes for toolbar elements, allowing options to scroll, collapse, list, or simply cut off overflowed toolbar buttons depending on user experience needs, responsiveness, or design preferences. This flexibility supports use cases where control visibility must be preserved, space constrained, or simplified with different user interface behaviors when toolbar space runs out.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        toolbar: {
            items: [
                { name: "search" },
                { name: "sort" },
                { name: "group" }
            ],
            overflow: {
                mode: "scroll"
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### toolbar.overflow.scrollButtons `String` *(default: "auto")*

Defines the visibility of scroll buttons when `mode` is `"scroll"`. The available options are:
- `"auto"` — Displays scroll buttons only when needed.
- `"hidden"` — Hides the scroll buttons at all times.
- `"visible"` — Always shows the scroll buttons.


<div class="meta-api-description">
How do I control the visibility of scroll buttons in a Kendo UI PropertyGrid's toolbar? Configure toolbar scroll button visibility and behavior for horizontal or vertical scrolling interfaces, controlling whether navigation arrows or scroll controls appear automatically when necessary, remain permanently visible for persistent toolbar navigation, or are hidden entirely to disable scroll button display. This setting enables toggling scroll arrows on toolbar components during scrollable modes, managing user interface elements related to scroll navigation buttons, consistent display of scroll controls, and customizing scroll button presence to improve accessibility and user interaction with overflowing toolbar content.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        toolbar: {
            items: [
                { name: "search" },
                { name: "sort" },
                { name: "group" }
            ],
            overflow: {
                mode: "scroll",
                scrollButtons: "visible"
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### toolbar.overflow.scrollButtonsPosition `String` *(default: "split")*

Defines the placement of scroll buttons. The available options are:
- `"split"` — Scroll buttons appear at both ends of the toolbar.
- `"start"` — Scroll buttons appear only at the start of the toolbar.
- `"end"` — Scroll buttons appear only at the end of the toolbar.


<div class="meta-api-description">
How do I customize the position of scroll buttons in a PropertyGrid toolbar? Configure the position and alignment of scroll buttons that appear when toolbar content exceeds visible space, enabling control over whether scroll arrows or navigation controls show up at the beginning, end, or both ends of a toolbar area; customize scrolling behavior in toolbars by setting the placement of overflow navigation buttons to start, end, or split across the toolbar edges to enhance user interface usability, navigation, and access to hidden toolbar items.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        toolbar: {
            items: [
                { name: "search" },
                { name: "sort" },
                { name: "group" }
            ],
            overflow: {
                mode: "scroll",
                scrollButtons: "visible",
                scrollButtonsPosition: "start"
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### toolbar.overflow.scrollDistance `Number` *(default: 50)*

Specifies the distance (in pixels) the toolbar scrolls when a scroll button is clicked.


<div class="meta-api-description">
How do I adjust the scroll speed when clicking overflow arrows in a Kendo UI PropertyGrid? Adjust the horizontal scroll amount or step size for toolbar overflow navigation in a property grid, setting the pixel distance the toolbar moves when clicking overflow arrows to control scrolling speed, pan increments, or navigation responsiveness; configure scrolling sensitivity, scroll step, button scroll distance, or overflow scroll speed to fine-tune how far the toolbar shifts with each click, enabling smooth, precise, or accelerated horizontal movement during toolbar overflow interactions.
</div>

#### Example

    <div id="propertyGrid"></div>
    <script>
    $("#propertyGrid").kendoPropertyGrid({
        toolbar: {
            items: [
                { name: "search" },
                { name: "sort" },
                { name: "group" }
            ],
            overflow: {
                mode: "scroll",
                scrollButtons: "visible",
                scrollDistance: 75
            }
        },
        model: {
            foo: "bar",
            baz: 5
        }
    });
    </script>

### width `Number`

Sets the width of the PropertyGrid. Numeric values are treated as pixels.


<div class="meta-api-description">
How do I set the width of a Kendo UI property grid? Adjust or define the horizontal dimension, size, or width of a property grid, panel, or settings interface to set fixed pixel widths or percentage-based, responsive widths for layout control, design customization, or dynamic resizing. Enable setting numeric values representing pixels or CSS units such as em, rem, %, vw, or px to manage how wide the interface appears within applications, forms, or UI components. Configure or control width during initialization, runtime adjustments, or responsive design scenarios to match container sizes, screen resolutions, or user preferences, ensuring consistent alignment and spacing in the user interface.
</div>

#### Example - set the width of the PropertyGrid

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

## Methods

### dataItem

Returns the data item to which the specified table row is bound.


<div class="meta-api-description">
How do I access the data associated with a specific row in Kendo UI for jQuery PropertyGrid? Accessing the underlying data or model linked to a specific table row, retrieving the bound record for inspection, reading or modifying field values, obtaining the data object for API interactions, extracting row-related information, referencing the data entity tied to a grid row, getting the current data context of a row, fetching the object associated with a particular entry in a grid, querying the row's data for further manipulation or display, and enabling developers to connect UI rows with their corresponding data source for dynamic updates and integration.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Returns

`kendo.data.TreeListModel`&mdash;The data item to which the specified table row is bound.

#### Example - getting the data item to which the first table row is bound

    <div id="propertyGrid"></div>
    <script>
        $("#propertyGrid").kendoPropertyGrid({
            model: {
                foo: "bar",
                baz: 5
            },
            width: 500
        });

        var component = $("#propertyGrid").data("kendoPropertyGrid");
        var data = component.dataItem("tbody>tr:eq(1)");
	      /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(data.value); // displays "bar"
    </script>

### edit

Switches the specified value cell in edit mode. Requires the [edit mode](/api/javascript/ui/propertygrid/configuration/editMode) to be enabled. Fires the [`beforeEdit`](/api/javascript/ui/propertygrid/events/beforeedit) and [`edit`](/api/javascript/ui/propertygrid/events/edit) events.


<div class="meta-api-description">
How do I programmatically start editing a field in a Kendo UI PropertyGrid? Trigger inline editing for a specific field or cell by programmatically switching it into editable mode, enabling direct value changes within the grid. Control or initiate cell editing when edit mode is enabled or activated, manage edit lifecycle events such as before editing starts or after editing begins, and handle user interactions for modifying properties on the fly. Configure, start, or programmatically enable editing of individual properties inside a grid interface to customize behavior or validate edits dynamically across different data fields.
</div>

#### Parameters

##### cell `jQuery`

The jQuery object which represents the table cell.

#### Example - switching the first value cell to edit mode

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });

    var component = $("#propertyGrid").data("kendoPropertyGrid");
    component.edit($("#propertyGrid td:eq(1)"));
    </script>

### model

Gets or sets the model to which the PropertyGrid is bound to.


<div class="meta-api-description">
How do I access the data object being edited in a Kendo UI PropertyGrid? Retrieve or assign the data object that the property grid displays and edits, allowing developers to access the current bound model for inspection, dynamically replace or update the data source to reflect changes in UI properties, bind new data sets for dynamic forms, control the underlying data context for property displays, switch models on the fly to refresh fields, and programmatically manage which data the property editor is synchronized with, supporting use cases like reading model values, rebinding to alternate data, or setting the model to update the interface automatically.
</div>

#### Parameters

##### model `Object`

The object to which the PropertyGrid will bind to.

##### items `Array`

An array of configuration options for the fields of the passed object. Refer to the [`items`](/api/javascript/ui/propertygrid/configuration/items) configuration option for further details.

#### Returns

`model`&mdash;The current state of the object to which the PropertyGrid is bound.

#### Example - get the model to which the PropertyGrid is bound

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });

    var component = $("#propertyGrid").data("kendoPropertyGrid");
    console.log(component.model())
    </script>

#### Example - set the model to which the PropertyGrid is bound

    <div id="propertyGrid"></div>
    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });

    var component = $("#propertyGrid").data("kendoPropertyGrid");
    component.model({
            title: "A Title",
            author: "John Doe",
            price: 15
        },[
            {field: "price", format: "{0:C}" }
        ])
    </script>

### resetState

Cancels any changes in the values of the object's properties. Resets the object to the initial state or the latest state set via the [`saveState`](/api/javascript/ui/propertygrid/methods/savestate) method.


<div class="meta-api-description">
How do I revert property changes in Kendo UI PropertyGrid? Discard changes, undo edits, and revert object properties to their original or previously saved values by resetting the state of a property grid or object editor. Restore initial configurations, cancel modifications, rollback runtime changes, reset the current object values to last saved snapshots, and reload default or stored states to ensure any overridden settings are cleared and the object returns to a stable, consistent state. Enable undo functionality, revert property changes, and clear all temporary edits by resetting the object's editable properties to either the factory defaults or the last saved checkpoint.
</div>

#### Example - reset to initial state

    <button id="btn">Reset state</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500,
        items: [
          {field:"foo", description:"foo property description"}
        ]
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");

        component.resetState();
      });
    </script>

### saveAsExcel

Initiates the Excel export. Also fires the [`excelExport`](/api/javascript/ui/propertygrid/events/excelexport) event.

> Calling this method may trigger the built-in browser popup blocker. To avoid that, always call it as a response to an end-user action (for example, a button click).


<div class="meta-api-description">
How to export property grid data as Excel file using Kendo UI for jQuery? export grid data to Excel spreadsheet file enable saving property grid contents as XLSX initiate Excel file download trigger event for customizing or canceling export control Excel export flow handle browser popup blocker restrictions ensure export function runs on user interaction like button click generate Excel reports from grid data convert property grid to downloadable Excel format activate Excel export method configure export behavior and file output
</div>

#### Example - manually initiate the Excel export

    <button id="export">Export to Excel</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500,
        items: [
          {field:"foo", description:"foo property description"}
        ]
      });

      $("#export").click(function(e) {
          var component = $("#propertyGrid").data("kendoPropertyGrid");
          component.saveAsExcel();
      });
    </script>

### saveAsPDF

Initiates the PDF export and returns a promise. Also triggers the [`pdfExport`](/api/javascript/ui/propertygrid/events/pdfexport) event.

> Calling this method may trip the built-in browser popup blocker. To avoid that, call this method as a response to an end-user action (for example, a button click).


<div class="meta-api-description">
How to export property grid data as a PDF in Kendo UI for jQuery? Export property grid data or configuration details as a PDF file while managing asynchronous operations through promises; initiate PDF generation, await or chain export completion, customize PDF content or metadata via events before saving, cancel export if needed, configure PDF output from property or data settings, handle browser popup blockers by triggering export in response to user interactions like button clicks, and control or enable export workflows for property editors or UI components to reliably save or download property-related information in portable document format.
</div>

#### Returns

`Promise`&mdash;A promise that will be resolved when the export completes. The same promise is available in the [`pdfExport`](/api/javascript/ui/propertygrid/events/pdfexport) event arguments.

#### Example - manually initiate the PDF export

    <button id="export">Export to PDF</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500,
        items: [
          {field:"foo", description:"foo property description"}
        ]
      });

      $("#export").click(function(e) {
          var component = $("#propertyGrid").data("kendoPropertyGrid");
          component.saveAsPDF();
      });
    </script>

### saveState

Updates the state of the object and clears all `dirty` flags. Calling the [`resetState`](/api/javascript/ui/propertygrid/methods/resetstate) method will revert any changes to that updated state.


<div class="meta-api-description">
How to save current property grid state using Kendo UI's PropertyGrid.saveState method? Save or persist the current configuration, settings, or data state of a property grid or form, capturing all user changes, edits, or customizations at a specific point in time to create a baseline snapshot; enable state preservation to clear unsaved change indicators or dirty flags and maintain an updated clean version that can be referenced, restored, or reset later to undo modifications or revert to the last saved setup, supporting workflows like checkpointing form inputs, saving editing progress, or managing undo/redo functionality across various user interactions and dynamic data environments.
</div>

#### Example - save state of the object

    <button id="btn">Save state</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500,
        items: [
          {field:"foo", description:"foo property description"}
        ]
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");

        component.saveState();
      });
    </script>

### selectItem

Gets or sets the table row which is selected.


<div class="meta-api-description">
How do I programmatically select an item in a Kendo UI PropertyGrid? Retrieve or update the current selected row in a property table, control which item is highlighted or active in the grid, programmatically set or clear the selection of a table row, access the current selection to read or manipulate it, switch active entries for user interface state management, handle selection changes by passing specific row references, manage focused or chosen rows within property list components, enable dynamic selection updates for interactive data tables, query the currently highlighted entry without arguments, and configure which property row appears as selected for improved UI control.
</div>

#### Parameters

##### row `Element|jQuery`

A DOM element or a jQuery object which represents the table row.

#### Returns

`jQuery`&mdash;The selected table row.

#### Example - selecting a table row

    <button id="btn">Highlight the second row</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");

        component.selectItem($("#propertyGrid tbody>tr:nth(1)"));
      });
    </script>

#### Example - getting the selected table row

    <button id="btn">Get selected row info</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");
        var row = component.selectItem();

        if(row.length > 0){
            var data = component.dataItem(row);
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(data.value);
        }
      });
    </script>

### toggleDetails

Toggles the Details/Info box, when enabled. See the [`showDetails`](/api/javascript/ui/propertygrid/configuration/showdetails) configuration option for details on enabling/disabling the functionality.


<div class="meta-api-description">
How to dynamically show/hide property details in Kendo UI PropertyGrid? Control or switch the visibility of the detailed information panel or info box in a property grid interface dynamically during runtime, enabling or disabling the display of extended property details, metadata, or additional info sections programmatically. This method supports toggling the expanded or collapsed state of the sidebar or detail pane that supplements the main property list, allowing developers to show, hide, or switch the details view on and off based on user actions, events, or application logic, provided that detailed view functionality is enabled through configuration settings. It is useful for managing interface complexity, improving user experience by collapsing or expanding property info, and integrating dynamic UI updates where property details need to be conditionally visible or hidden.
</div>

#### Example - toggle the expanded/collapsed state of an item

    <button id="btn">Toggle expanded/collapsed state</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        width: 500,
        items: [
          {field:"foo", description:"foo property description"}
        ]
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");

        component.toggleDetails();
      });
    </script>

### toggleGroup

Toggles the expanded or collapsed state of a group.


<div class="meta-api-description">
How do I programmatically expand or collapse groups in a Kendo UI PropertyGrid? Control or switch the visibility state of grouped sections within a property grid by programmatically expanding or collapsing them on demand, enabling dynamic toggling of group panels based on user actions, custom logic, or automated UI updates; configure group expansion states, trigger expand or collapse commands in code, manage hierarchical group visibility, and implement custom controls that open or close groups instantly after the interface loads, reflecting changes immediately in the component’s display or responding to interaction patterns without manual user input.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents a grouping row. A string is treated as a jQuery selector.

#### Example - toggle the expanded/collapsed state of an item

    <button id="btn">Toggle expanded/collapsed state of the first group</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            foo: "bar",
            baz: 5
        },
        items:[
          { field: "foo", group: "Group A" }
        ],
        width: 500
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");

        component.toggleGroup($("#propertyGrid .k-table-group-row.k-grouping-row:nth-child(1)"));
      });
    </script>

### toggleItem

Toggles the expanded or collapsed state of a row.


<div class="meta-api-description">
How do I programmatically open a specific item in a Kendo UI PropertyGrid? Control, switch, or change the expanded and collapsed states of individual rows within a property grid, programmatically opening or closing specific items to show or hide detailed properties, editors, or nested content. Enable automatic expansion, collapse, toggle, or state management of rows in user interface grids, dynamically managing visibility and layout of property entries, fine-tuning the UI presentation, and responding to user or code-driven interactions to adjust property item display.
</div>

#### Parameters

##### row `String|Element|jQuery`

A string, a DOM element, or a jQuery object which represents the table row. A string is treated as a jQuery selector.

#### Example - toggle the expanded/collapsed state of an item

    <button id="btn">Toggle expanded/collapsed state</button>
    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500
      });

      $("#btn").click(function(){
        var component = $("#propertyGrid").data("kendoPropertyGrid");

        component.toggleItem($("#propertyGrid tbody>tr:nth(0)"));
      });
    </script>

## Events

### beforeEdit

Fires when the user tries to edit a data item before the editor is created. Can be used for preventing the editing depending on custom logic. The event handler function context (available through the `this` keyword) will be set to the component instance. The event will be fired only when the PropertyGrid is editable.


<div class="meta-api-description">
How to prevent editing data fields in Kendo UI PropertyGrid? Intercept user attempts to modify or update data fields prior to editor activation, enabling control over edit permissions, conditional blocking, or validation by capturing input before any editing interface appears. This pre-edit event triggers when users try to change values in an editable grid or property list, supporting logic to allow, deny, or customize editing behavior dynamically, such as preventing edits based on user roles, current data states, or application rules. It facilitates hooking into the editing workflow before any text boxes, dropdowns, or input controls are created, granting the opportunity to cancel, modify, or log edit attempts programmatically. Prevent editing actions conditionally, implement custom guardrails on editable grids, and control user interactions with data fields ahead of any UI changes or editor initialization.
</div>

#### Event Data

##### e.model `kendo.data.Model`

The data item which will be edited.

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - subscribing to the beforeEdit event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        beforeEdit: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("beforeEdit");

          if (!e.model.field == "title") {
            e.preventDefault();
          }
        }
      });
    </script>

### cancel

Fires when the user closes the edit cell via the `Esc` key or when the `Reset` command from the ContextMenu is executed. The event handler function context (available through the `this` keyword) will be set to the component instance.


<div class="meta-api-description">
How to detect edit cancellation in Kendo UI PropertyGrid? Detect when users abort or cancel editing in a grid cell by capturing events triggered on pressing the Esc key or executing reset commands from context menus; monitor or handle edit cancellations, discarded changes, aborted modifications, undo operations, or user-initiated cancel actions within editable cells, enabling control over restoring previous values, rolling back edits, monitoring edit session termination, and accessing component methods or properties during these cancellation events.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit form container element.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked, prevents the `cancel` action. The table row remains in edit mode.

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - subscribing to the cancel event before initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        cancel: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("cancel");
        }
      });
    </script>

#### Example - subscribing to the cancel event after initialization

    <div id="propertyGrid"></div>

    <script>
      function cancel(e) {
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log("cancel");
      }

      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500
      });

        var component = $("#propertyGrid").data("kendoPropertyGrid");
        component.bind("cancel", cancel);
    </script>

### cellClose

Fires when the `incell` edit mode is used and the cell will be closed. The event is triggered after saving or canceling the changes but before the cell is closed. The event handler function context (available through the `this` keyword) will be set to the component instance.


<div class="meta-api-description">
How to handle save/cancel operations before cell closes in Kendo UI PropertyGrid? Capture or listen for events triggered just before a grid cell finishes editing in inline or incell edit modes, enabling detection of cell close actions after saving changes or canceling edits but prior to the actual cell closure. This event facilitates running final validation checks, updating user interface elements or application state based on the latest cell edits, handling cleanup tasks, committing data changes, intercepting save or cancel operations on grid cells, and reacting programmatically to cell edit completions within property grids or data tables.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object that represents the edit container element. For more information, refer to the [`edit` event arguments](/api/javascript/ui/propertygrid/events/edit).

##### e.model `kendo.data.Model`

The data item to which the table row is bound.

##### e.type `String`

The type of the cell close action.

The supported types are:

* `save`
* `cancel`&mdash;Triggered when the PropertyGrid keyboard navigation is enabled by `navigatable: true` and the `Esc` key is used for the `close` action of the cell.

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - subscribing to the cellClose event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        cellClose:  function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(e.type);
        }
      });

      var component = $("#propertyGrid").data("kendoPropertyGrid");
      component.edit($("#propertyGrid td:eq(2)"));
    </script>

### change

Fires when the user selects a table row in the PropertyGrid. The event handler function context (available through the `this` keyword) will be set to the component instance.


<div class="meta-api-description">
How do I detect when a user selects a different row in a Kendo UI PropertyGrid? Detecting and handling user selection changes in a property table or grid, triggering callbacks or event handlers whenever a different row is chosen, responding to user interactions with table rows or property items, managing events for row selection updates, executing custom functions on property item changes, capturing selection events in a property list or grid interface, enabling reactions to user clicks or navigation through rows, controlling behavior when a new property entry is selected, monitoring changes in the active or focused row within a grid component, and configuring listeners for user-driven row selection updates within interactive property tables.
</div>

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - getting the selected data item from the selected row

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        change: function(e) {
          var selectedRow = this.selectItem();
          var dataItem = this.dataItem(selectedRow);
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log(`field: ${dataItem.field}: value: ${dataItem.value}`);
        }
      });
    </script>

### collapse

Fires when an item is about to be collapsed. The event handler function context (available through the `this` keyword) will be set to the component instance.


<div class="meta-api-description">
How to prevent a property grid section from collapsing programmatically? Detect, respond to, or intercept when a collapsible item or section is about to close or fold in a property grid or settings panel; manage pre-collapse events to trigger custom code, update UI elements, prevent or modify collapsing behavior, or control dynamic interface adjustments before a section is hidden or minimized; listen for collapse triggers, handle user interactions or programmatic collapses, bind event handlers to execute logic prior to collapsing, and access component context to read or modify state during the collapse process.
</div>

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked, prevents the collapse action. The child table rows will not be hidden.

#### Example - subscribing to the collapse event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        collapse: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("collapse");
        }
      });
    </script>

### edit

Fires when the user edits a data item. The event handler function context (available through the `this` keyword) will be set to the component instance.


<div class="meta-api-description">
How do I handle value modifications in Kendo UI PropertyGrid with its edit event? Detect and respond to user changes in editable fields by capturing and handling value modification events, enabling execution of custom logic when property values are updated, such as running code after edits, tracking user interactions with data items, updating underlying data models, triggering validation routines, synchronizing or refreshing connected user interfaces, and hooking into change events to execute callbacks with access to the component instance context for dynamic and responsive behavior in property editing scenarios.
</div>

#### Event Data

##### e.container `jQuery`

The jQuery object which represents the container element. The container element contains the editing UI.

##### e.model `kendo.data.TreeListModel`

The data item which will be edited.

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - subscribing to the edit event before initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        edit: function(e) {
	        /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("edit");
        }
      });
    </script>

#### Example - subscribing to the edit event after initialization

    <div id="propertyGrid"></div>

    <script>
      function edit(e) {
      /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("edit");
        };

      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

      var component = $("#propertyGrid").data("kendoPropertyGrid");
      component.bind("edit", edit);
    </script>

### excelExport

Fires when the user clicks the **Export to Excel** toolbar button.


<div class="meta-api-description">
How do I customize Excel export in Kendo UI PropertyGrid? Capture or customize Excel export actions initiated from a property grid interface by handling the export event triggered when users click the export button, enabling developers to intercept, modify, override, or implement alternative workflows for generating, exporting, or downloading spreadsheet files, configuring export behavior, adding custom logic before or after export, controlling Excel file output, and integrating tailored export processes within UI components.
</div>

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

##### e.data `Array`

The array of data items that is used to create the Excel workbook.

##### e.workbook `Object`

The Excel [`workbook` configuration object](/api/javascript/ooxml/workbook#configuration). Used to initialize a `kendo.ooxml.Workbook` class. Modifications of the workbook will be reflected in the output Excel document.

##### e.preventDefault `Function`

If invoked, the PropertyGrid will not save the generated file.

#### Example - subscribing to the excelExport event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        excelExport: function(e) {
          e.workbook.fileName = "Details.xlsx";
        }
      });
      var component = $("#propertyGrid").data("kendoPropertyGrid");
      component.saveAsExcel();
    </script>

### expand

Fires when an item is about to be expanded. The event handler function context (available through the `this` keyword) will be set to the component instance.


<div class="meta-api-description">
How to handle expand event in Kendo UI PropertyGrid? Detect and handle the moment before a property grid item opens or expands, enabling pre-expansion actions like triggering updates, loading or fetching related data dynamically, intercepting or customizing the expansion behavior, responding to user interactions before the section unfolds, controlling or managing UI changes tied to expansion events, hooking into callbacks prior to panel or node expansion, and accessing component context for advanced manipulation or conditional logic when an expandable item is activated in a property list or settings panel.
</div>

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.preventDefault `Function`

If invoked, prevents the expand action. The child table rows will not be shown.

#### Example - subscribing to the expand event before initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        expand: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("expand");
        }
      });
    </script>

#### Example - subscribing to the expand event after initialization

    <div id="propertyGrid"></div>

    <script>
      function expand(e) {
      /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("expand");
        };

      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

      var component = $("#propertyGrid").data("kendoPropertyGrid");
      component.bind("expand", expand);
    </script>

### groupCollapse

Fires when a group of items is about to be collapsed. The event handler function context (available through the `this` keyword) will be set to the component instance.


<div class="meta-api-description">
What triggers when collapsing grouped items in Kendo UI PropertyGrid? Detect or handle when collapsible sections, grouped items, or categories within a property or settings panel are about to be collapsed or folded, enabling developers to run custom code, update user interfaces, synchronize state, trigger animations, log events, or modify behavior before or as a group of controls or properties is hidden or minimized in a UI component that organizes settings by groups or categories.
</div>

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

##### e.group `kendo.data.TreeListModel`

The group object associated with the group row.

##### e.preventDefault `Function`

If invoked, prevents the collapse action. The child table rows will not be hidden.

#### Example - subscribing to the collapse event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        groupCollapse: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("groupCollapse", e.group);
        }
      });
    </script>

### groupExpand

Fires when a group of items is about to be expanded. The event handler function context (available through the `this` keyword) will be set to the component instance.


<div class="meta-api-description">
How do I handle group expansion events in Kendo UI PropertyGrid? Detect, handle, or control when item groups open or expand in a grid or property list, enabling developers to intercept group expansion events to run custom code, load data dynamically, update UI elements, synchronize application state, or trigger side effects before or during the expansion of grouped content. This includes capturing group opening actions, managing asynchronous data fetches on expand, modifying group visibility, adjusting related interface states, and responding to user interactions or programmatic group expands within a nested, hierarchical, or categorized data view.
</div>

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

##### e.group `kendo.data.TreeListModel`

The group object associated with the group row.

##### e.preventDefault `Function`

If invoked, prevents the collapse action. The child table rows will not be hidden.

#### Example - subscribing to the collapse event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        groupExpand: function(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("groupExpand", e.group);
        }
      });
    </script>

### pdfExport

Fires when the user clicks the **Export to PDF** toolbar button.


<div class="meta-api-description">
How do I customize PDF export behavior in Kendo UI PropertyGrid? Capture and respond to user actions related to exporting data or content to PDF format by detecting clicks or triggers on export buttons or commands, enabling customization of export behavior, modification of export settings, execution of custom workflows, logging export events for auditing or analytics, handling export initiation, controlling UI updates during PDF generation, managing export event listeners, and facilitating integration with alternative or enhanced PDF creation processes within property grid or similar UI components.
</div>

#### Event Data

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

##### e.preventDefault `Function`

If invoked, the PropertyGrid will not save the generated file.

##### e.promise `Promise`

A promise that will be resolved when the export completes.

#### Example - subscribing to the pdfExport event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        pdfExport: function(e) {
	        /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("exporting PDF");
        }
      });
      var component = $("#propertyGrid").data("kendoPropertyGrid");
      component.saveAsPDF();
    </script>

### save

Fires when a data item is saved. The event handler function context (available through the `this` keyword) will be set to the component instance.


<div class="meta-api-description">
How to trigger custom actions when changes in PropertyGrid data items are saved? trigger custom actions or logic when changes in the PropertyGrid data items are saved, handle save events to persist modifications, update external data models, refresh user interfaces, or send notifications upon saving, listen for save triggers to execute code after data item changes are committed, respond to data save occurrences by running callbacks that synchronize data, control saving workflows by intercepting save operations, enable handling of save events to apply validation, logging, or additional updates, manage data persistence events within editable grids or forms, and access the component instance context during save event handling to invoke methods or update state dynamically.
</div>

#### Event Data

##### e.model `kendo.data.TreeListModel`

The data item to which the table row is bound.

##### e.container `jQuery`

The jQuery object which represents the current editor container element.

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - subscribing to the save event before initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        save: function(e){
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("save");
        }
      });
    </script>

#### Example - subscribing to the save event after initialization

    <div id="propertyGrid"></div>

    <script>
      function save(e) {
          /* The result can be observed in the DevTools(F12) console of the browser. */
          console.log("save");
        };

      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500
      });
    </script>

      var component = $("#propertyGrid").data("kendoPropertyGrid");
      component.bind("save", save);
    </script>

### columnResize

Fires when the user resizes a column via the `Resize` contextMenu command. The event handler function context (available through the `this` keyword) will be set to the component instance.


<div class="meta-api-description">
How to detect column width changes in Kendo UI PropertyGrid? Detect changes or adjustments to column widths in a property grid or data table when users drag or resize columns, enabling layout updates, saving custom column sizes, triggering UI refreshes, handling resize events for dynamic interfaces, responding to user-driven resizing actions, configuring column resizing behavior, listening for width change events, and managing column layout persistence after manual adjustments.
</div>

#### Event Data

##### e.column `Object`

A JavaScript object which represents the column configuration.

##### e.newWidth `Number`

The new column width.

##### e.oldWidth `Number`

The previous column width.

##### e.sender `kendo.ui.PropertyGrid`

The component instance which fired the event.

#### Example - subscribing to the columnResize event during initialization

    <div id="propertyGrid"></div>

    <script>
      $("#propertyGrid").kendoPropertyGrid({
        model: {
            details: {
                title: "Title",
                price: 15
            },
            foo: "bar",
            baz: 5
        },
        width: 500,
        columnResize: function(e) {
            /* The result can be observed in the DevTools(F12) console of the browser. */
            console.log(e.column[0].field, e.newWidth, e.oldWidth);
        }
      });
    </script>

