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


<div class="meta-api-description">
How do I make Kendo UI MultiColumnComboBox adapt its layout to different screen sizes? Enable or disable automatic responsive layout adjustments for multi-column dropdowns to adapt rendering and layout based on screen size, container resizing, or device orientation changes; configure whether the component dynamically modifies columns, width, and presentation to optimize usability on smaller screens, mobile devices, or fluid containers by setting responsive behavior modes that control adaptive rendering, layout scaling, and element rearrangement for variable viewport environments and flexible UI contexts.
</div>

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        adaptiveMode: "auto",
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

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.


<div class="meta-api-description">
How to customize the title in Kendo UI's MultiColumnComboBox when it switches to a compact view? Configure the text shown as the header or title in the responsive or compact view of a multi-column combo box, enabling customization of the adaptive layout’s display string, setting or controlling the title label when the component dynamically switches to its mobile-friendly or condensed version, adjusting the displayed header in adaptive or collapsed modes, and defining the string used as the top label in narrow or small-screen presentations of multi-column dropdown selectors.
</div>

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        adaptiveMode: "auto",
        adaptiveTitle: "Select Item",
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

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.


<div class="meta-api-description">
How do I customize the subtitle in a Kendo UI MultiColumnComboBox for adaptive views? Configure or customize the subtitle text that appears when a multi-column dropdown or combo box switches to a compact, adaptive, or mobile-responsive view, enabling control over the caption or secondary label shown in collapsed or narrow layouts to improve clarity and user guidance. Adjust or set the displayed subtitle for responsive modes, adaptive interfaces, or smaller screen presentations, ensuring the caption fits condensed or simplified versions of multi-field selection components. This feature supports tailored messaging or prompts when the control shifts from full desktop views to adaptive, compact, or mobile formats.
</div>

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        adaptiveMode: "auto",
        adaptiveTitle: "Select Item",
        adaptiveSubtitle: "Choose from the list below",
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

### animation `Object`

Configures the opening and closing animations of the suggestion popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the suggestion popup will open and close instantly.


<div class="meta-api-description">
How can I customize the animation effects for the dropdown suggestions in my MultiColumnComboBox? Control and customize the opening and closing transitions of dropdown suggestion popups with options to enable, disable, or tailor animation effects for smoother or instant visual changes; configure transition timing, enable fade, slide, or other effects for multi-column dropdowns, or turn off all animations for immediate popup display without any opening or closing motions.
</div>

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

The animation played when the suggestion popup is closed. Configures the closing animation effects, duration, and other animation-related settings. By default, the popup closes with a simple fade-out effect. You can customize this behavior by specifying different effects and duration values.


<div class="meta-api-description">
How to configure closing animation effects in Kendo UI MultiColumnComboBox? Configure and customize the closing animations for dropdown suggestion popups including effects like fade-out, slide, or zoom, control animation duration, easing, timing, and transitions for smooth or rapid popup disappearance, set how suggestion lists collapse or hide after selection or dismissal, enable or disable closing animation effects, adjust visual feedback when closing multi-column dropdown menus, tailor user experience by modifying animation styles and speeds for popup closure, handle animation callbacks or triggers when hiding autocomplete or combo box suggestions, and optimize interactive UI responsiveness on popup close events.
</div>

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


<div class="meta-api-description">
How can I customize the closing animation effects in Kendo UI MultiColumnComboBox? Control and customize the closing animation effects for dropdowns or combo boxes by specifying one or multiple animation types such as fade, slide, or other transition effects to enhance the visual closing behavior. Configure how the component smoothly exits or hides with various animation sequences by setting effect names, enabling dynamic and visually appealing close transitions, adjusting or combining multiple animations to tailor the user interface interactions during the close action of list or combo box elements.
</div>

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        animation: {
            close: {
                effects: "fadeOut slideUp"
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

### animation.close.duration `Number` *(default: 100)*

The duration of the close animation in milliseconds.


<div class="meta-api-description">
How can I adjust the close animation duration of my MultiColumnComboBox widget? Control and customize the duration of the dropdown close animation timing in milliseconds for a multi-column combo box or similar UI component, enabling you to speed up, slow down, set, adjust, configure, or fine-tune how fast the popup or menu hides or closes. Manage animation close speed, transition length, timing, and delay to create smooth or rapid hide effects, allowing developers to tailor the closing motion for enhanced user experience and responsive interface behavior.
</div>

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        animation: {
            close: {
                duration: 500
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

### animation.open `Object`

The animation played when the suggestion popup is opened.


<div class="meta-api-description">
How can I customize the animation effect when opening the suggestion dropdown in a Kendo UI MultiColumnComboBox? Configure and customize the opening animation effects for suggestion dropdowns in multi-column combo boxes, including settings to enable, disable, or adjust the popup appearance, transition style, duration, easing methods, and visual entrance behavior when suggestion lists are triggered, allowing control over how dropdown suggestions animate into view across various user interface interactions and scenarios.
</div>

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


<div class="meta-api-description">
How do I customize the animation effects for opening the dropdown in a Kendo UI MultiColumnComboBox? Configure and customize dropdown opening animations by specifying one or more visual effects such as fade, slide, or other transition styles to enhance the MultiColumnComboBox user experience; control how the dropdown appears with combined or individual animations, set animation sequences, enable smooth or dynamic opening effects, and adjust the animation behavior for dropdown menus with multiple columns by defining effect names separated by spaces, enabling tailored visual feedback for interactive combo box controls.
</div>

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        animation: {
            open: {
                effects: "fadeIn slideDown"
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

### animation.open.duration `Number` *(default: 200)*

The duration of the open animation in milliseconds.


<div class="meta-api-description">
How to set the animation duration for opening the dropdown in a Kendo UI MultiColumnComboBox? Control and customize the duration of the dropdown opening animation to enhance user interface responsiveness and fluidity, specifying the speed at which multi-column selection lists smoothly appear. Adjust or configure how quickly the dropdown menu expands or unfolds by setting the animation timing in milliseconds, enabling fine-tuning of UI behavior for better visual feedback during selection. Optimize how the combo box transitions into view, balancing between faster instant display or slower, elegant opening sequences to match application style and user experience preferences. Enable or set the exact length of the open animation effect on multi-column dropdown components to influence perceived performance and usability when expanding list options.
</div>

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        animation: {
            open: {
                duration: 600
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

### autoBind `Boolean`*(default: true)*

Controls whether to bind the widget to the data source on initialization.


<div class="meta-api-description">
How do I configure Kendo UI MultiColumnComboBox to load data automatically on initialization? Configure whether the control loads and binds data automatically on initialization or waits for manual trigger, enabling delayed data fetching, lazy loading, or conditional data binding in dropdowns with multiple columns, allowing developers to manage when and how the data source connects to the UI, control initial data retrieval, optimize performance by preventing eager loading, and customize when to populate options programmatically or via user interaction.
</div>

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


<div class="meta-api-description">
How do I link two MultiColumnComboBox controls for cascading relationships in Kendo UI? Configure dependent dropdowns by linking one multi-column combo box to another using cascading relationships, enabling dynamic filtering where the child combo box automatically updates its options based on the selection made in the parent control. Control data dependencies between multiple combo boxes, set hierarchical filters for cascading dropdowns, and establish linked lists where selecting a value in one box influences the available choices in another. Enable interconnected combo boxes that respond interactively to user input, synchronize selections across related components, and implement cascading data-driven filtering by referencing parent selections for seamless dependent data presentation.
</div>

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


<div class="meta-api-description">
How do I enable dependent dropdowns in Kendo UI MultiColumnComboBox using the cascadeFromField property? Configure dependent dropdowns by specifying a parent field to filter child options dynamically, enabling cascading selections, linked filters, dynamic option population, and data source restriction based on another field’s value; control which parent field filters the child list for synchronized lookups, conditional option loading, or hierarchical data entry scenarios to create responsive, interconnected dropdown menus that update based on prior selections and support advanced relational filtering setups.
</div>

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


<div class="meta-api-description">
How do I link a MultiColumnComboBox to filter data based on its parent field's value in Kendo UI? Control cascading data filtering by linking a child dropdown or multi-column combo box to a specific parent field's value, enabling dynamic filtering based on the parent's selected data; configure which parent field to pull for filtering or default to the parent's main value to create dependent dropdowns, filtered lists, or linked selection widgets that update automatically according to the parent record's current field, supporting scenarios like chained dropdowns, hierarchical data filtering, and context-sensitive data presentation.
</div>

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


<div class="meta-api-description">
How to control cascading behavior in linked MultiColumnComboBox when entering custom values? Control cascading behavior in linked multi-column dropdowns when entering custom or typed-in values in the parent field, enabling or disabling child dropdown updates based on user-defined input rather than only predefined selections; configure whether child lists refresh dynamically or remain inactive when the parent’s value is manually typed, supporting scenarios with custom entries, dependent dropdown updates, conditional filtering, and managing child field responsiveness tied to parent custom input changes, while considering linkage through matching data fields or unset cascade parameters in complex data-driven UI components.
</div>

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


<div class="meta-api-description">
How do I customize the columns in a Kendo UI MultiColumnComboBox? Set or customize the dropdown table layout by specifying which data fields, headers, titles, widths, formats, templates, and display options appear in each column of a multi-column selection list. Control, define, or configure the visible columns, their order, formatting, and presentation within a complex dropdown menu to tailor the data view, optimize user selection experience, and manage how bound data is rendered or formatted inside a multi-field combo box interface. Adjust column settings during initialization to enable precise control over headings, widths, text templates, and display behavior for multi-field dropdown lists with customizable columns.
</div>

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


<div class="meta-api-description">
How to specify the data field for each column in a Kendo UI MultiColumnComboBox? Set or configure the data field, property name, or key that links a specific column to the corresponding data source attribute, enabling control over which data value, object property, or field appears in that column within multi-column dropdowns or combo boxes. Manage binding between columns and data item fields, specifying the exact property or attribute name from the source data objects or records to display, filter, or sort by in complex lists, tables, or selector controls with multiple data columns. Customize, assign, or map column content dynamically by indicating which source property each column represents, supporting scenarios like showing user names, IDs, dates, or other structured data fields in combo box columns.
</div>

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


<div class="meta-api-description">
How do I customize the column headers in a Kendo UI MultiColumnComboBox? Set or customize the header text, label, or title for individual columns in a multi-column dropdown or combo box to define and display specific column names, captions, or headings that describe the data shown in each column. Configure or control the visible header labels for columns during setup or dynamically adjust the column titles to improve clarity, user interface organization, and data categorization within multi-column list controls or dropdown menus.
</div>

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


<div class="meta-api-description">
How to customize cell rendering in Kendo UI MultiColumnComboBox dropdown lists? Configure custom cell rendering in multi-column dropdown lists by defining templates using HTML markup, Kendo template strings, or callback functions that generate dynamic content for each column’s cells. Enable formatting, injecting HTML, binding data fields from the dropdown’s rows, and customizing how individual cells display with flexible templates to control layout and appearance in multi-column combo boxes. Set, customize, or control cell templates to tailor column rendering, apply conditional formatting, or embed complex markup and dynamic values in dropdown cells for better visualization and user interaction.
</div>

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


<div class="meta-api-description">
How do I customize the column headers in a Kendo UI MultiColumnComboBox? Customize the column headers in a multi-column dropdown by controlling header layout with templates that can include HTML, icons, dynamic data, or custom content using template strings, functions, or references; configure header appearance, content formatting, and visual elements to tailor each column’s header dynamically, enabling flexible presentation and enhanced user interface design for multi-column selection components.
</div>

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


<div class="meta-api-description">
How to set fixed column widths in Kendo UI MultiColumnComboBox? Adjust or configure the width, size, or pixel dimensions of columns in a multi-column dropdown or combo box to control layout, formatting, and appearance when displaying lists or tables with multiple fields. Set fixed or dynamic column widths to optimize space, improve readability, customize multi-field selection components, or create responsive interfaces that require specifying exact pixel sizes or proportional sizing for columns inside combo boxes or list controls. This is useful for developers needing precise control over column sizing when binding data sources, designing UI elements with multiple columns, or managing column layout and spacing in dropdown menus or multi-column selectors.
</div>

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


<div class="meta-api-description">
How can I enable or disable the clear button in a Kendo UI MultiColumnComboBox? Enable or disable a hover-activated clear button that appears within a multi-column dropdown to quickly reset or clear the selected item or value; this control manages showing a clickable icon that removes the current selection, refreshes the input to empty, and fires change or update events, providing an easy way for users to clear their choices or input without manually deleting text, configurable to show or hide based on developer preference for selection clearing functionality.
</div>

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


<div class="meta-api-description">
How to configure the data source for a MultiColumnComboBox? Configure, connect, or bind the dropdown list values to various data inputs including JavaScript arrays, objects, or pre-existing data source instances; enable populating multiple columns by setting the data source to raw arrays, structured objects, or external data provider instances, ensuring flexible integration whether supplying fresh datasets or leveraging already initialized data sources for dynamic list content in multi-column dropdown components.
</div>

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
          url: "https://demos.telerik.com/service/v2/core/products"
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


<div class="meta-api-description">
What is the purpose of setting the dataTextField property in a MultiColumnComboBox? Specify or configure the field from the data source that provides the display text for entries in a multi-column dropdown or combo box, enabling filtering and search operations based on that text value; control which property of data items is shown as the visible label in selection lists, bind filtering and search queries to this particular data field, and pair this text field configuration with corresponding value fields to ensure proper data binding and user-friendly display in searchable, filterable dropdown components.
</div>

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


<div class="meta-api-description">
What is the dataValueField property used for in a Kendo UI MultiColumnComboBox? Configure which data field acts as the key or identifier representing the selected item’s underlying value in a multi-column dropdown, enabling precise control over the bound value used in forms, data binding, selection logic, or submission processes. This setting specifies the unique value field or ID from the data source used internally or for integrations, often paired with the displayed text field to differentiate what the user sees from what the app processes. Adjusting the value field supports scenarios like retrieving item keys, linking to database IDs, managing selection states, or customizing how selections map to backend data structures and form variables.
</div>

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


<div class="meta-api-description">
How do I configure the delay before triggering search in a Kendo UI MultiColumnComboBox? Adjust the input pause duration or debounce interval before triggering search, lookup, or filter actions in a multi-column dropdown or combo box component; configure how long the system waits after user typing stops to initiate dynamic suggestions, typeahead results, or popup displays, effectively managing input throttling, reducing excessive server calls, smoothing rapid keystrokes, controlling request frequency, and enhancing UI responsiveness and performance during data filtering or autocomplete operations.
</div>

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


<div class="meta-api-description">
How do I set the width of the dropdown menu in a MultiColumnComboBox? Set or control the width of dropdown menus, adjust popup list size, define fixed pixel widths for dropdowns, customize how wide selection lists appear, configure the horizontal span of multi-column combo boxes, specify exact numeric width for dropdown panels, enable precise sizing of popup lists, manage dropdown menu dimensions, determine the visual width of combo box lists, and tailor the open dropdown box size to fit content or design requirements.
</div>

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


<div class="meta-api-description">
How do I disable user interaction in a Kendo UI MultiColumnComboBox? Control whether a multi-column combo box or dropdown allows user interaction, input, editing, or selection, enabling or disabling the component’s ability to accept keyboard or mouse input, toggle user edits, block or permit typing, and manage interactivity for forms, UI elements, or dynamic selection lists, including options to set the input to readonly, locked, inactive, or enabled states for flexible user control over data entry and selection behaviors.
</div>

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


<div class="meta-api-description">
How do I prevent the MultiColumnComboBox from showing all items when searching for less than a certain number of characters? Control search input behavior to require a minimum number of characters before filtering results, ensuring the dropdown list only updates or displays matches after reaching a specified length; configure to prevent showing the entire item list when clearing or deleting search text, enforce input thresholds to limit premature or empty searches, enable continuous filtering based on character count, set conditions to avoid resetting or expanding the selection list excessively, and manage dynamic search responsiveness by requiring a minimum input length before results appear or update in multi-column dropdowns.
</div>

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
            type: "odata-v4",
            serverFiltering: true,
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/odata/Products",
                }
            }
        },
        columns: [
          { field: "ProductName" },
          { field: "ProductID" }
        ]
    });
    </script>

### fillMode `String`*(default: undefined)*

Sets a value controlling how the color is applied. When `undefined` (the default), the theme controls the default fill mode. Can also be set to the following string values:

- "solid"
- "flat"
- "outline"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I customize the color fill style in a Kendo UI MultiColumnComboBox? Configure the visual styling of color fills for dropdown items and interface elements with options to apply no fill, solid colors, flat fills, or outlined borders, enabling control over how color rendering and appearance are managed in multi-column combo boxes or similar selection controls. Adjust color application modes for item backgrounds, borders, and highlights by setting fill styles that affect overall UI aesthetics and user interaction feedback, including disabling fills, displaying fully solid fills, applying flat color fields, or outlining items for emphasis or clarity in lists and dropdown menus.
</div>

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


<div class="meta-api-description">
How to configure filtering modes in Kendo UI MultiColumnComboBox? Configure filtering modes to control how suggestions are matched and displayed based on the current input value, enabling search behaviors like matching entries that start with, end with, or contain specific substrings. Adjust settings to enable or disable filtering for string-based data sources or specific text fields within data arrays, allowing precise control over dynamic suggestion narrowing, autocomplete filtering, substring matching, prefix matching, and suffix matching. This setting controls search behavior in dropdowns or combo boxes with multi-column data, focusing on textual matching patterns such as starts with, ends with, or contains to refine user input results automatically.
</div>

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


<div class="meta-api-description">
How do I configure multi-field filtering in a Kendo UI MultiColumnComboBox? Specify and configure which data fields or columns to include for filtering and searching within a multi-column dropdown or combo box, enabling multi-field search, column-specific filtering, dynamic filtering criteria setup, and targeted data matching across several attributes or properties simultaneously to refine selection results based on multiple searchable columns or fields in complex datasets.
</div>

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


<div class="meta-api-description">
How to customize the group headers in Kendo UI MultiColumnComboBox? Customize and control the rendering of sticky or fixed group headers in a multi-column dropdown or combo box, enabling configuration of group header templates, setting custom labels, injecting HTML markup, displaying additional information beyond default group values, and tailoring how grouped items are presented during scrolling or selection. This feature supports modifying the appearance and content of group headers that remain visible, allowing developers to enable personalized group title displays, enhance UI clarity with rich formatting, configure fixed or persistent group indicators, and adjust grouping visuals for complex data lists or categorized dropdowns.
</div>

#### Example

    <input id="customers" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#customers").kendoMultiColumnComboBox({
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                fixedGroupTemplate: "Fixed group: #:data#",
                height: 400,
                dataSource: {
                    transport: {
                        read: "https://demos.telerik.com/service/v2/core/Customers"
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


<div class="meta-api-description">
How do I customize the footer of the MultiColumnComboBox dropdown list in Kendo UI for jQuery? Customize the dropdown footer by configuring a custom template to control the content and layout shown at the bottom of multi-column dropdown lists, enabling dynamic HTML or template-based rendering for summaries, actions, or additional information. This can be set during initialization or updated dynamically, allowing developers to define flexible footer sections that integrate component data context, support template syntax for binding or referencing internal fields, and enhance user interfaces with tailored footer content, summaries, buttons, or messages below dropdown items in complex combo box or select controls.
</div>

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


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


<div class="meta-api-description">
How do I customize the on-screen keyboard in Kendo UI MultiColumnComboBox? Configure the virtual keyboard type displayed when entering text by setting the input mode or inputmethod for keyboard control, including options like numeric, email, search, or text input types; control which on-screen keyboard or input method editor appears when the input field gains focus, enabling customization of input behavior and improving user experience on touch devices and virtual keyboards within multi-column dropdown or combo box inputs.
</div>

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        inputMode: "numeric",
        dataTextField: "text",
        dataValueField: "value",
        dataSource: [
            { text: "Item 1", value: "1" },
            { text: "Item 2", value: "2" }
        ],
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the input. If the input has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
How to customize the label in a Kendo UI MultiColumnComboBox? Set or customize the descriptive text or caption displayed before a multi-column dropdown input to improve accessibility, form labeling, and user guidance by specifying the label content as a plain string or dynamic function that controls the label’s displayed HTML; configure identifiers automatically assigned to synchronize labels with inputs, enabling setting, enabling, controlling, or customizing input captions, form labels, accessible text, descriptive headings, or prompts for multi-column selection fields in various user interfaces.
</div>

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


<div class="meta-api-description">
How to customize the content of a MultiColumnComboBox label in Kendo UI for jQuery? Customize or set the displayed label content for a multi-column combo box by providing HTML strings, enabling rich, formatted text, inline markup, or dynamic updates to the label. This supports configuring, binding, or altering the label's inner content with custom HTML elements, styles, or templates to control how the label appears in dropdowns or selection controls. Use this to define personalized, styled labels with embedded tags, react to data changes, or implement interactive label formatting within combo box interfaces.
</div>

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


<div class="meta-api-description">
How to enable floating labels in Kendo UI MultiColumnComboBox? Enable or configure floating label UI behavior for input elements where the label dynamically shifts position when the input is focused or contains a value, allowing users to set, toggle, or control floating labels that wrap the input field for clearer form interactions, visual feedback, and enhanced UX; this feature supports managing label animations, syncing label states with input focus or value changes, handling edge cases where programmatic value changes do not emit focus or blur events, and requires explicit refresh calls to update the floating label display when input values change without user interaction, ensuring consistent label positioning and visibility across form states and dynamic input updates.
</div>

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


<div class="meta-api-description">
How to customize group header appearance in Kendo UI MultiColumnComboBox? Control and customize the rendering of group headers in multi-column dropdowns by specifying custom templates or layouts for grouped items, enabling the display of personalized content, HTML structures, or styled text for each group label. Configure how group headings appear within grouped list components, set unique designs beyond default group values, and tailor the visual presentation of grouped data sections in combo boxes or select inputs by defining custom group header templates. Adjust group header appearance with custom formatting, templates, or dynamic content to enhance the user interface of hierarchical or categorized dropdown selections.
</div>

#### Example

    <input id="customers" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#customers").kendoMultiColumnComboBox({
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                groupTemplate: "Group: #:data#",
                height: 400,
                dataSource: {
                    transport: {
                        read: "https://demos.telerik.com/service/v2/core/Customers"
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


<div class="meta-api-description">
How do I set the height of the popup in a Kendo UI MultiColumnComboBox? Adjust or configure the vertical dimension, height, or popup size of a multi-column dropdown suggestion list, control the visible area or maximum number of rows shown in the autocomplete or combo box popup, set or limit the suggestion box height in pixels to manage scrolling or visibility of options, specify the pixel height for the dropdown menu to optimize user interface layout or appearance, define how tall the dropdown list appears when showing multiple columns of selectable items in a combo box component.
</div>

#### Example - set the height

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      height: 500
    });
    </script>

### highlightFirst `Boolean`*(default: true)*

If set to `true` the first suggestion will be automatically highlighted.


<div class="meta-api-description">
How to automatically select and highlight the first item in a Kendo UI MultiColumnComboBox dropdown? Enable or disable automatic preselection and visual highlighting of the initial dropdown suggestion in multi-column combo boxes to control keyboard navigation, focus management, default item emphasis, and user interaction behavior. Configure whether the first item in the suggestions list is automatically selected or left unhighlighted for streamlined input, keyboard accessibility, or manual selection workflows. Adjust settings to manage initial focus states, improve usability by spotlighting default options, and customize dropdown focus behavior according to interface needs.
</div>

#### Example - set highlightFirst

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      highlightFirst: false
    });
    </script>

### ignoreCase `Boolean`*(default: true)*

If set to `false` case-sensitive search will be performed to find suggestions. The widget performs case-insensitive searching by default.


<div class="meta-api-description">
What is the effect of setting `ignoreCase` to true in a MultiColumnComboBox? Enable or disable case sensitivity for filtering and matching text input in dropdowns or combo boxes, controlling whether search queries should treat uppercase and lowercase letters as equivalent or distinct. Configure case-insensitive or case-sensitive comparison methods to influence how user input matches against list items, suggestions, or options, affecting autocomplete behavior, search filtering, and text matching precision. Adjust settings to control whether searches ignore letter casing in user interfaces that display multiple columns, enabling more flexible or strict input matching scenarios across various dropdown and selection components.
</div>

#### Example - disable case-insensitive suggestions

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
      ignoreCase: false
    });
    </script>

### index `Number`*(default: -1)*

The index of the initially selected item. The index is `0` based.


<div class="meta-api-description">
How do I preselect an item in a Kendo UI MultiColumnComboBox by index? Control the default selected item by specifying the zero-based position or numeric index to preselect an entry when initializing a multi-column dropdown or combo box, setting which option appears highlighted or chosen first, configuring initial selection state, enabling default choice setup, presetting the active item on load, and defining which list element is active by default in multi-column selection controls and combo box interfaces.
</div>

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


<div class="meta-api-description">
How do I customize error messages in Kendo UI MultiColumnComboBox? Adjust, customize, configure, or localize the user interface text, labels, prompts, and messages displayed in combo boxes with multiple columns, enabling the setting or overriding of default strings, phrases, or UI wording to fit different languages, dialects, or application-specific terminology, including translations, custom prompts, error messages, placeholders, and other textual elements within multi-column selection dropdowns.
</div>

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


<div class="meta-api-description">
How do I customize the tooltip for the clear button in a Kendo UI MultiColumnComboBox? Customize or localize the tooltip text displayed on the clear input button of a multi-column dropdown or combobox, enabling control over the hover message that appears when users move their cursor over the clear/reset icon. Set, change, or translate the clear button's tooltip for better user guidance, accessibility, or multilingual support in combo boxes with multiple columns, ensuring the hover prompt matches different languages, phrasing preferences, or UI conventions in searchable dropdown inputs with clear/reset functionality.
</div>

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


<div class="meta-api-description">
How do I customize the message when there's no data in a Kendo UI MultiColumnComboBox dropdown? Display or customize the message shown in a dropdown or list interface when no matching items, entries, or data rows are available to select or show in multi-column or complex combo boxes, enabling personalized or localized placeholders, alerts, or empty state notifications for users searching or filtering data with no results found, empty lists, or unavailable content situations in dropdown controls or autocomplete widgets.
</div>

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


<div class="meta-api-description">
What is the minimum number of characters required to trigger autocomplete in a Kendo UI MultiColumnComboBox? Set or configure the minimum number of characters required before initiating a search or filtering results in a multi-column dropdown or combo box, controlling when autocomplete, typeahead, or incremental search begins based on user input length. Adjust this threshold to delay or optimize search queries for large datasets, prevent excessive backend calls or UI updates, and fine-tune when suggestions or filtered lists appear as users type. This setting helps manage performance and user experience by specifying how many characters must be entered before triggering data fetching or filtering logic in searchable dropdown components.
</div>

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


<div class="meta-api-description">
How do I customize the "no results found" message in a Kendo UI MultiColumnComboBox? Configure custom messages, markup, or templates to display when a dropdown, searchable list, or combo box returns no matching items or the data source is empty, enabling tailored "no results found" feedback or placeholders. Enable or set fallback UI content that replaces typical empty state views in multi-column selection components or autocomplete controls, using string templates, functions, or dynamic rendering methods to customize the empty state. Control how the interface responds and what is shown when queries yield zero matches, supporting empty data templates that trigger the result popup with alternative content, messaging, or custom layouts that appear on empty searches or when data is missing. Customize the no-data feedback experience in multi-column combo boxes, autocomplete fields, or filterable dropdowns by defining a reusable template or function for displaying personalized empty results, empty list indicators, or user-friendly prompts when no options are available.
</div>

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


<div class="meta-api-description">
How to customize the placeholder text in Kendo UI MultiColumnComboBox? Set or customize the placeholder text, hint, or prompt shown inside an empty multi-column combo box or dropdown input to guide users before selection, including configuring default placeholder content, updating the temporary instructional text dynamically, displaying example values or input suggestions, and controlling what appears in the input area when no option is selected or typed.
</div>

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


<div class="meta-api-description">
How to customize the dropdown panel animation in a Kendo UI MultiColumnComboBox? Control and customize the dropdown panel or popup window for a multi-column combobox including its opening and closing animations, overlay container placement, size adjustments, positioning relative to the input field, and behavior upon creation or user interaction; configure popup appearance, alignment, animation effects, containment element, and responsive display attributes to tailor how the popup list of selectable items is presented and behaves within the user interface, enabling flexible management of dropdown rendering, visibility triggers, and styling through detailed option settings.
</div>

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


<div class="meta-api-description">
How can I customize where my Kendo UI MultiColumnComboBox dropdown appears on the page? Control or configure the insertion point of dropdown popups by specifying a container element through a CSS or jQuery selector to append or render the popup dynamically in the DOM, enabling customization of where multi-column dropdown menus or combo box lists appear on the page, managing popup placement to avoid layout issues, setting a specific parent element for rendering the popup to handle z-index, overflow, or positioning concerns, directing where menus or overlay panels attach to the document structure for better control over popup behavior and appearance in complex layouts.
</div>

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


<div class="meta-api-description">
How do I position the dropdown popup of a MultiColumnComboBox? Control and configure the dropdown popup’s positioning and alignment relative to its anchor element by specifying vertical and horizontal anchor points using combined "y x" coordinates, enabling precise placement and attachment of the popup such as top-left, bottom-center, center-right, or any mix of vertical (top, center, bottom) and horizontal (left, center, right) origins for customized dropdown alignment, anchoring, attachment, and spatial control of multi-column selection popups.
</div>

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


<div class="meta-api-description">
How can I precisely position a dropdown menu in relation to its trigger element using Kendo UI's MultiColumnComboBox? Configure precise popup alignment by setting the vertical and horizontal attachment points between the dropdown menu and its anchor element, enabling control over popup positioning such as top, bottom, or center vertically, and left, center, or right horizontally. Adjust how the popup appears relative to the trigger element by defining coordinate pairs or keywords for vertical alignment including top, center, and bottom, combined with horizontal placement options like left, center, and right, to achieve exact overlay or adjacent display. Enable fine-tuned position control for dropdown or autocomplete popups by specifying anchor attachment points using space-separated vertical and horizontal values, allowing developers to set popup origin alignment for consistent UI layouts, responsive designs, and custom dropdown placements. This supports tailored interaction patterns where the popup can open above, below, or aligned with the anchor horizontally and vertically, facilitating complex interface requirements and avoiding clipping or overflow issues. Ideal for configuring popup attachment, dropdown positioning, menu placement, overlay alignment, and managing how floating panels appear in relation to anchor components.
</div>

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


<div class="meta-api-description">
How to customize the visual prefix in a Kendo UI MultiColumnComboBox? Set or customize a visual prefix, adornment, or leading element displayed before the input field in a multi-column combo box, enabling control over its icon, text label, template design, styling, or interactive behavior; configure how the prefix appears, what content it shows, how it responds to user actions, and how it integrates with the input to enhance user interface clarity, branding, or input context.
</div>

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
        ],
        prefixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      });
    </script>

### prefixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content


<div class="meta-api-description">
How can I add an icon to the input field of a MultiColumnComboBox? Set or customize a leading icon for input fields by configuring a prefix icon using either predefined theme icon names or custom SVG markup, enabling the display of icons before text input in dropdowns or combo boxes; control icon appearance to enhance UI elements in multi-column selection components, support icon prefixes for better user interaction, and integrate scalable vector icons to visually augment input controls with flexible icon sources.
</div>

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
        ],
        prefixOptions: {
          icon: "search"
        }
      })
    </script>

### prefixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the prefix adornment of the component.


<div class="meta-api-description">
How do I customize the prefix element in a Kendo UI MultiColumnComboBox? Customize or configure the prefix element, static content, or adornment displayed before the input field by defining HTML templates, template strings, or rendering functions to control how the MultiColumnComboBox prefix appears; set, modify, or provide custom markup or templating for the prefix area on component initialization to enable tailored prefixes, icons, symbols, or labels that precede user input, facilitating visual customization, branding, or UI enhancements for the input prefix section.
</div>

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
        ],
        prefixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      })
    </script>

### prefixOptions.separator `Boolean` *(default: true)*

If set to `false`, the prefix adornment will not have a separator.


<div class="meta-api-description">
How do I remove the separator line between prefix adornment and input field in Kendo UI MultiColumnComboBox? Adjust and configure the visual boundary or dividing line appearing between the prefix adornment and the input field within multi-column dropdowns or combo boxes, enabling toggling, showing, hiding, or removing the separator line or divider after prefix elements, controlling how prefixes visually separate from user input, customizing user interface styling related to prefix delimiters or spacing in combo inputs, managing the display of separator characters or lines that segment prefix decorations from text input areas, and setting flags or options to enable or disable these prefix-to-input separators for clearer interaction and visual distinction in combo box components.
</div>

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
        ],
        prefixOptions: {
          template: () => `${kendo.ui.icon("search")}`,
          separator: false
        }
      })
    </script>

### rounded `String`*(default: undefined)*

Sets a value controlling the border radius. When `undefined` (the default), the theme controls the default border radius. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "full"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I customize the corner curvature of dropdown inputs in a MultiColumnComboBox using numeric values or semantic presets? Adjust the corner curvature or border radius of dropdown inputs using numeric values or semantic presets like none, small, medium, large, and full to customize the roundness of combo box corners, control UI styling consistency, configure border shape, enable rounded edges, set corner radius for form elements, and modify the appearance of multi-column selection lists with flexible corner styling options.
</div>

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

### size `String`*(default: undefined)*

Sets a value controlling size of the component. When `undefined` (the default), the theme controls the default size. Can also be set to the following string values:

- "small"
- "medium"
- "large"

> The `"none"` value is deprecated. Use custom CSS instead.


<div class="meta-api-description">
How do I adjust the size of a Kendo UI MultiColumnComboBox? Adjust the component’s overall dimensions, visual scale, and spacing by setting size options such as small, medium, large, or none, enabling control over the appearance, padding, and layout density of multi-column dropdowns, combo boxes, or selection lists to optimize interface compactness, readability, and user experience across various design needs or responsive layouts.
</div>

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


<div class="meta-api-description">
How to customize the trailing elements in Kendo UI MultiColumnComboBox input fields? Customize and control trailing elements for input fields by adding suffixes like icons, badges, buttons, or interactive controls at the end of dropdown or combobox inputs. Enable configuration of suffix content, appearance, actions, and accessibility features to tailor the user interface with trailing adornments that enhance input components’ functionality and visual style. Set or modify trailing decorations during initialization to attach additional interactive or informative elements that appear after the main input text, supporting use cases such as inline actions, status indicators, or supplemental icons in multi-column dropdown menus or combo boxes.
</div>

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
        ],
        suffixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      });
    </script>

### suffixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content


<div class="meta-api-description">
How do I change the default suffix icon in a Kendo UI MultiColumnComboBox? Set or customize the suffix icon shown in a multi-column combo box input by specifying an icon source, including predefined theme icon names or custom inline SVG content, enabling replacement or addition of the default suffix symbol; control, configure, or change the suffix visual element with either built-in theme glyphs or personalized SVG icons to enhance component appearance, support icon rendering, and tailor UI elements for selection inputs with flexible icon options and suffix decoration.
</div>

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
        ],
        suffixOptions: {
          icon: "search"
        }
      })
    </script>

### suffixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the suffix adornment of the component.


<div class="meta-api-description">
How can I customize the suffix area in Kendo UI MultiColumnComboBox? Customize the suffix area of a multi-column dropdown by configuring templates that control rendering of icons, badges, formatted text, or dynamic content bound to data. Enable custom suffix displays, set suffix adornments with templates, and integrate complex markup or visual elements after dropdown items. Control how suffix regions appear in combo boxes using flexible templating for enhanced UI, including badges, indicators, or specialized icons. Use suffix templates to embed styled content or data-driven suffix components adjacent to multi-column selections for a tailored user experience.
</div>

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
        ],
        suffixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      })
    </script>

### suffixOptions.separator `Boolean` *(default: true)*

If set to `false`, the suffix adornment will not have a separator.


<div class="meta-api-description">
How do I customize the separator line in Kendo UI's MultiColumnComboBox? Customize the appearance of the dividing line or separator between the main input field and the suffix or trailing element in dropdown inputs or combo boxes, enabling you to show or hide the visual boundary that separates the input area from suffix icons, labels, or adornments. Configure whether to display a visual divider or remove it to create seamless integration of suffix elements, enhancing visual grouping, UI clarity, or compactness. Control, enable, disable, set, or adjust the separator line between input text and trailing adornments to refine design and user interface layout in combo box components that support multiple columns or suffix indicators.
</div>

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
        ],
        suffixOptions: {
          template: () => `${kendo.ui.icon("search")}`,
          separator: false
        }
      })
    </script>

### suggest `Boolean`*(default: false)*

If set to `true` the widget will automatically use the first suggestion as its value.


<div class="meta-api-description">
How to enable auto-suggest in Kendo UI MultiColumnComboBox? Enable automatic selection and filling of the first matching suggestion in a multi-column dropdown or combo box, allowing the input to auto-complete or auto-fill based on the top matched item from a list while typing. Configure the component to dynamically suggest and pre-fill the best or first possible option, facilitating quick selection, search-as-you-type behavior, or predictive text input by automatically setting the earliest matching suggestion as the current value. This setting helps control whether the UI preselects, auto-suggests, or auto-populates the initial best match to speed up user input and streamline data entry in multi-column selector controls.
</div>

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


<div class="meta-api-description">
How does Kendo UI MultiColumnComboBox handle user-entered custom text synchronization with selected value? Control whether user-entered custom text in a multi-column combo box synchronizes automatically with the selected value, enabling configurations to set typed input as the current selection or maintain the input without updating the selection; adjust settings to either apply typed custom entries as chosen values or preserve the text independently while clearing any existing selection, addressing scenarios of input binding, form value synchronization, editable dropdown behavior, and dynamic selection updates in user interfaces.
</div>

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


<div class="meta-api-description">
How can I customize the header content in a Kendo UI MultiColumnComboBox dropdown? Configure or customize the popup header content for a multi-column dropdown by setting static HTML markup to define a fixed header template, allowing insertion of plain text or multiple HTML elements wrapped inside a single container tag for consistent rendering. Control how the header displays above the list items in dropdowns without dynamic data binding or template models, enabling fixed headers for columns or labels using raw HTML structures. Adjust or set static header layouts for multi-column combo boxes where the header is not dynamically generated but rather specified as constant content, suitable for scenarios requiring custom headers with text or multiple elements inside a single wrapper tag to ensure proper formatting and appearance.
</div>

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


<div class="meta-api-description">
How to set default text in Kendo UI MultiColumnComboBox before data loading? Set or configure the initial visible input text in a dropdown or combo box before data loading or binding occurs, enabling preset placeholder or default strings when results are not yet fetched, useful for showing a specific value or prompt during asynchronous data retrieval or delayed population, allowing control over the displayed input content prior to data binding, and supporting scenarios where you want to predefine or inject default input text in multi-column dropdowns or autocomplete components before the actual list data becomes available.
</div>

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


<div class="meta-api-description">
How do I access or update the selected item in a Kendo UI MultiColumnComboBox? Accessing or modifying the selected item in a multi-column dropdown list, retrieving or assigning the chosen option programmatically for forms, data binding, or dynamic updates, controlling which item is active or highlighted within a complex list control featuring multiple fields per entry, setting or reading the current selection value in a searchable or filterable combo box with columns, synchronizing selection states between UI components and underlying data models, initializing or updating the chosen element in a grid-like dropdown interface to reflect user input or application logic changes.
</div>

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


<div class="meta-api-description">
How to configure the MultiColumnComboBox in Kendo UI for jQuery to send the selected item's raw value instead of its entire object? Configure selection binding behavior to determine whether the underlying model or state receives the primitive value or the entire selected item object from a multi-column dropdown component, enabling control over how initial null values and subsequent user choices update the data model, whether you want just the raw selection key or the full detailed record assigned, supporting scenarios where you need either simplified scalar assignments or complex object references from user selections in forms or data-bound interfaces.
</div>

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


<div class="meta-api-description">
How do I optimize performance in Kendo UI's MultiColumnComboBox when dealing with large datasets? Optimize rendering large datasets and enhance performance using virtual scrolling techniques by configuring item height and custom value mapping for seamless component virtualization; control efficient loading, reduce lag, enable dynamic rendering, and implement scalable list virtualization to handle thousands of entries while maintaining smooth scrolling, improved memory usage, and faster response times in dropdowns or multi-column selectors.
</div>

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        virtual: true,
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            transport: {
                read: function(options) {
                    // simulate large dataset
                    var data = [];
                    for(var i = 0; i < 10000; i++) {
                        data.push({ text: "Item " + i, value: i });
                    }
                    options.success(data);
                }
            }
        },
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
    });
    </script>

### virtual.itemHeight `Number`*(default: null)*

Specifies the height of the virtual item. All items in the virtualized list **must** have the same height.
If the developer does not specify one, the framework will automatically set `itemHeight` based on the current theme and font size.


<div class="meta-api-description">
What is the itemHeight property in Kendo UI MultiColumnComboBox for? Configure or specify a fixed height for each item or row in a virtualized dropdown or list to ensure accurate measurement, consistent rendering, smooth scrolling, and proper recycling of elements in large datasets; set or adjust the uniform item row height to optimize performance when displaying multiple columns or combo box entries, with the option to rely on automatic height calculation based on theme and font size if no explicit height is provided, enabling predictable virtualization behavior and correct visual alignment across all list items in dynamic or data-heavy user interfaces.
</div>

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        virtual: {
            itemHeight: 40
        },
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            transport: {
                read: function(options) {
                    // simulate large dataset
                    var data = [];
                    for(var i = 0; i < 10000; i++) {
                        data.push({ text: "Item " + i, value: i });
                    }
                    options.success(data);
                }
            }
        },
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
    });
    </script>

### virtual.mapValueTo `String`*(default: "index")*

The changes introduced with the Kendo UI R3 2016 release enable you to determine if the `valueMapper` must resolve a *value to an `index`* or a *value to a `dataItem`*. This is configured through the `mapValueTo` option that accepts two possible values - `"index"` or `"dataItem"`. By default, the `mapValueTo` is set to `"index"`, which does not affect the current behavior of the virtualization process.

For more information, refer to the [article on virtualization]({% slug virtualization_kendoui_combobox_widget %}#value-mapping).


<div class="meta-api-description">
How does the Kendo UI MultiColumnComboBox handle virtualization value mapping? Configure how virtualization maps selected values in a multi-column combo box control by setting whether the value resolution uses the item’s index position or the actual data object, enabling customization of the value-to-item association during virtual scrolling or lazy loading scenarios. Control or switch between mapping values to data indexes versus mapping directly to data items or objects, influencing how the combo box handles virtualization and value lookup for performance optimization and data binding. Adjust the way virtualized selection, value matching, or value resolution occurs by selecting either positional index mapping or mapping to the exact data entry, affecting search, filtering, and rendering within large datasets. Enable or set virtualization value mapping modes to control how selected values correspond to underlying data during on-demand loading or virtual rendering inside multi-column dropdown components.
</div>

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox({
        virtual: {
            mapValueTo: "dataItem",
            valueMapper: function(options) {
                // implement value mapping logic
                options.success([]);
            }
        },
        dataTextField: "text",
        dataValueField: "value",
        dataSource: {
            transport: {
                read: function(options) {
                    // simulate large dataset
                    var data = [];
                    for(var i = 0; i < 10000; i++) {
                        data.push({ text: "Item " + i, value: i });
                    }
                    options.success(data);
                }
            }
        },
        columns: [
            { field: "text", title: "Text" },
            { field: "value", title: "Value" }
        ]
    });
    </script>

### virtual.valueMapper `Function`*(default: null)*

The widget calls the `valueMapper` function when the widget receives a value, that is not fetched from the remote server yet.
The widget will pass the selected value(s) in the `valueMapper` function. In turn, the valueMapper implementation should return the **respective data item(s) index/indices**.

> **Important**
>
> As of the Kendo UI R3 2016 release, the implementation of the `valueMapper` function is optional. It is required only if the widget contains an initial value or if the `value` method is used.


<div class="meta-api-description">
How do I map selected values to their corresponding data indexes in a Kendo UI MultiColumnComboBox with virtualization? Configure custom mapping of selected values to corresponding data indexes during virtualization or remote data fetching, enabling synchronization of initial or programmatically set values with unloaded data items; implement functions to match incoming keys or selected entries to their positions within remote datasets, supporting scenarios where values are not locally available and must be resolved dynamically through index lookup or server-side mapping in combo box components handling large, virtualized data sources.
</div>

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
                            url: "https://demos.telerik.com/service/v2/core/Orders/ValueMapper",
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
                    type: "odata-v4",
                    transport: {
                        read: "https://demos.telerik.com/service/v2/odata/Orders"
                    },
                    pageSize: 80,
                    serverPaging: true,
                    serverFiltering: true
                }
            });
        });

        function convertValues(value) {
            var data = {};

            value = Array.isArray(value) ? value : [value];

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
                type: "odata-v4",
                transport: {
                  read: "https://demos.telerik.com/service/v2/odata/Orders"
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
              url: "https://demos.telerik.com/service/v2/core/Orders/ValueMapper",
              type: "GET",
              data: convertValues(options.value),
              success: function (data) {
                options.success(data);
              }
            })
        }

        function convertValues(value) {
            var data = {};

            value = Array.isArray(value) ? value : [value];

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


<div class="meta-api-description">
How do I access and bind data to a Kendo UI MultiColumnComboBox? Access, bind, or monitor the active data collection connected to a multi-column combo box component, including the current dataset whether sourced from a local array, remote API, or data source object instance; track real-time updates and changes within the existing data without swapping the entire source object, enabling synchronization with the UI, observing underlying data for filtering, sorting, or display purposes, and controlling data binding states dynamically while noting that replacing the entire collection requires a dedicated method rather than direct assignment.
</div>

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


<div class="meta-api-description">
How do I access the input field in a Kendo UI MultiColumnComboBox? Access and manipulate the visible editable text field within a multi-column dropdown or combo box control, enabling direct interaction with the input element to read or update its value, attach or handle events like focus or change, control cursor selection or text attributes, and integrate with jQuery methods for dynamic UI behavior after component setup.
</div>

#### Example - get input element

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox();

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    var input = multicolumncombobox.input;
    </script>

### options `Object`
An object, which holds the options of the widget.


<div class="meta-api-description">
How to configure data source for Kendo UI MultiColumnComboBox? Configure or retrieve the current settings and parameters of a multi-column dropdown selector, including data sources, column definitions, display templates, filtering criteria, popup positioning, rendering options, and user interaction controls. Enable dynamic customization, access or update the data binding, control visual structure and layout, adjust filtering behavior, and manipulate popup or dropdown appearance and interactivity on the fly, supporting programmatic inspection and runtime modification of all available component features and display options within a composite selection interface.
</div>

#### Example - get options of the widget

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox();

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    var options = multicolumncombobox.options;
    </script>

### list `jQuery`
A jQuery object of the drop-down list element.


<div class="meta-api-description">
How can I customize the dropdown list of my Kendo UI MultiColumnComboBox? Retrieve or manipulate the drop-down list element as a jQuery object to customize or control the multi-column combo box options, enabling event handling, DOM queries or modifications, styling adjustments, focus and keyboard management, dimension measurement, and seamless integration with third-party plugins or custom behaviors after initialization.
</div>

#### Example - get list element

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox();

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    var list = multicolumncombobox.list;
    </script>

### ul `jQuery`
A jQuery object of the `ul` element, which holds the available options.


<div class="meta-api-description">
How do I manipulate the dropdown list in a Kendo UI MultiColumnComboBox? Access or manipulate the list container element that holds all selectable options in a multi-column dropdown, enabling direct queries, dynamic updates, attaching event listeners, scrolling control, measurement of list dimensions, and applying custom styles or attributes to the options display area; useful for customizing behavior, enhancing interaction, or modifying the dropdown’s options panel through scripting or styling in a jQuery-compatible way.
</div>

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


<div class="meta-api-description">
How do I programmatically close the dropdown menu in a Kendo UI MultiColumnComboBox? Trigger closing or dismissing the dropdown menu, programmatically hide the popup or overlay, end user interaction with list items, control the visibility of multi-column dropdowns, close combo boxes after selection or cancellation, terminate open popup state, manage dropdown closing dynamically during navigation or data updates, disable or hide the popup programmatically, collapse expanded component lists, and reset or finalize the combo box state by closing its popup through code execution.
</div>

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


<div class="meta-api-description">
How do I access data for a specific row in Kendo UI MultiColumnComboBox? Access the underlying data object or model entry tied to a specific row index or the current selected item in a multi-column dropdown component, enabling retrieval of data records for display, editing, or manipulation; retrieve data by row position or based on the active selection index to extract fields, properties, or entire objects for programmatic use, dynamic rendering, or conditional logic related to list items or selected entries in the combo box.
</div>

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


<div class="meta-api-description">
What happens when I call destroy on a MultiColumnComboBox widget? Clean up and safely remove all event listeners, data attributes, and nested child components tied to a MultiColumnComboBox instance to prevent memory leaks and free up resources before eliminating or detaching the widget from the DOM. This operation fully disposes the component’s internal state, including child widgets, unregisters event handlers, clears associated jQuery data, and prepares the component for garbage collection without physically removing its DOM element, enabling developers to manage lifecycle events, avoid memory bloat, and perform controlled teardown or dynamic UI updates.
</div>

#### Example

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox();
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How to programmatically disable dropdown opening in a Kendo UI MultiColumnComboBox? Activate or deactivate the interactive state of a multi-column combo box control to control user access and input capabilities, allowing you to set or unset whether the dropdown can be opened, items can be selected, or the component responds to user interactions, enabling dynamic control over form validation, input handling, or UI state changes in your application at runtime.
</div>

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


<div class="meta-api-description">
How do I programmatically focus the MultiColumnComboBox dropdown input in jQuery? Set or programmatically move keyboard focus to the dropdown input to enable user interaction, activate keyboard navigation, or handle accessibility requirements by focusing the component’s primary input field; control focus on the multi-column selection control through code to ensure it receives input attention, trigger focus events, or prepare for user typing and selection without manual clicks.
</div>

#### Example - focus the widget

    <input id="multicolumncombobox" />
    <script>
    $("#multicolumncombobox").kendoMultiColumnComboBox();
    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");
    multicolumncombobox.focus();
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource/methods/view).


<div class="meta-api-description">
How do I access the current list items in a Kendo UI MultiColumnComboBox? Access or get the array of current rendered DOM elements representing the displayed data entries in a multi-column dropdown or combo box, reflecting all applied filters, sorting, and paging, so you can manipulate, measure, or bind event handlers to the visible rows or items; retrieve the live set of list elements corresponding to the underlying data source view for purposes like customization, interaction enhancement, or dynamic updates in UI components showing tabular or hierarchical dropdown data.
</div>

#### Returns

`Array` The currently rendered dropdown list items (`<li>` elements).

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

    var multicolumncombobox = $("#multicolumncombobox").data("kendoMultiColumnComboBox");

    // get the list items
    var items = multicolumncombobox.items();
    console.log(items.length); // outputs the number of items
    </script>

### open

Opens the popup.


<div class="meta-api-description">
How do I programmatically open the dropdown list in a Kendo UI MultiColumnComboBox? Programmatically trigger, display, or show the dropdown list or options popup for a multi-column combobox or dropdown control without user clicking, enabling developers to open, activate, or reveal the selection list on demand such as after initialization, via button clicks, focus events, or custom logic, allowing control over when the option menu or popup is presented in a UI component to facilitate automated or dynamic dropdown display.
</div>

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


<div class="meta-api-description">
How to make Kendo UI MultiColumnComboBox read-only but still submit its value with form? Control whether users can edit or type input into a multi-column dropdown or combo box while keeping its selected value intact and included in form submissions, toggling read-only mode on or off at runtime to prevent modifications but still send the value with forms, distinguishing from disabled state where input is blocked and value excluded; configure, enable, set, or disable the read-only state dynamically to manage user interaction, input prevention, form data integrity, and readonly versus disabled behavior in complex UI components with multiple columns.
</div>

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


<div class="meta-api-description">
How to refresh dropdown list in Kendo MultiColumnComboBox after data modifications? Trigger an update to reload or refresh the dropdown list so the displayed items, templates, or data bindings reflect the latest changes; force rerendering of all rows, rebuild the popup content dynamically, sync the dropdown with current data sources, reapply templates, reset visuals, refresh list elements, and ensure the multi-column combo box popup shows the most up-to-date information after data modifications or UI updates.
</div>

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


<div class="meta-api-description">
How do I enable programmatic search in a Kendo UI MultiColumnComboBox? Configure programmatic search, filter, or autocomplete in a multi-column dropdown component by triggering lookup and suggestion rendering based on user input or given values, enabling typeahead or dynamic filtering of list items from the configured data source, opening dropdown suggestions that match the search term, controlling how entries are matched and displayed for rapid selection and input assistance in interfaces requiring multi-field lookup or advanced filtering scenarios.
</div>

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


<div class="meta-api-description">
How do I programmatically select an item in a Kendo UI MultiColumnComboBox? Retrieve or set the selected item or index in a multi-column dropdown list, enabling control over the current choice by specifying an item, index, or conditional predicate; supports selecting options programmatically and updating the displayed text and internal value, though predicate-based selection is limited when virtualization is active due to partial data views. This method does not automatically fetch data if the list is unbound or lazy-loaded and does not trigger change events, so manual event firing may be needed to synchronize view models or bindings. Useful for configuring, enabling, or controlling the selected entry in complex dropdowns with multiple columns, supporting precise item selection, updating display values, and handling scenarios involving virtualization, deferred data loading, or reactive UI updates.
</div>

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


<div class="meta-api-description">
How do I update the items in a Kendo MultiColumnComboBox? Configure or update the dropdown list by setting a new data source using an array, data source instance, or configuration object to refresh, reload, or replace the underlying items dynamically; this triggers immediate rebinding, updates displayed values, applies sorting and filtering rules from the updated data set, and ensures the multi-column dropdown reflects the latest data changes for responsive, programmable control over the displayed list content and filtering behavior.
</div>

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


<div class="meta-api-description">
How can I programmatically set the input value in a Kendo UI MultiColumnComboBox? Programmatically set or update the input value of a multi-column dropdown or autocomplete field and visually highlight or select the text for quick replacement, editing, or copying by using a method to input, suggest, or autofill values dynamically after initialization; control the displayed text focus and selection for enhanced keyboard navigation, user interaction, or automated value setting in combobox or input components.
</div>

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


<div class="meta-api-description">
How to dynamically set the visible text of a Kendo UI MultiColumnComboBox dropdown? Get or set the visible text of a multi-column dropdown that allows selecting items by matching displayed text or entering custom, unmatched values; configure or update the displayed string dynamically while controlling whether the selection binds automatically to the data source, handle cases where no matching item exists by treating the input as free text, manage text changes programmatically without triggering automatic change events that affect model-view bindings, and manually fire change events when synchronization with data models or event listeners is needed.
</div>

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


<div class="meta-api-description">
How can I programmatically open or close the dropdown list in a Kendo UI MultiColumnComboBox? Programmatically open or close a dropdown list, show or hide the popup panel, toggle visibility of a multi-column selector, control dropdown state through code, manage combo box popup display based on custom triggers, enable or disable the popup from scripts, handle focus or keyboard events to display or conceal the list, dynamically set dropdown visibility without user clicks, switch the popup panel open or closed in response to application logic, and manipulate the display of multi-column combo boxes via method calls.
</div>

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


<div class="meta-api-description">
How do I programmatically retrieve the selected value in a Kendo UI MultiColumnComboBox control? Programmatically retrieve or assign the current selection of a multi-column combo box control by getting or setting its value directly, with support for pre-fetching data when unbound and automatically clearing any active filters to restore the full data set for accurate selection updates; this method updates the value silently without triggering change events or model bindings, so manual event triggering is often required to notify observers or MVVM frameworks, enabling developers to control, configure, set, update, or manipulate the selected item, choice, or data entry within multi-column dropdown components with precision across diverse usage scenarios.
</div>

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


<div class="meta-api-description">
How do I detect when a user selects an item in a MultiColumnComboBox control using jQuery Kendo UI? Detect and respond to user-driven selection or input updates in a multi-column dropdown interface by capturing interactive value changes triggered by direct user actions, such as selecting or modifying choices, including updates cascaded from parent controls; track only user-initiated modifications, ignoring programmatic or API-driven alterations, to enable dynamic reactions to real-time user input, configure change listeners or handlers focused on genuine user edits, and manage event handling within the context of the component instance to synchronize UI responses, form validations, or related behaviors based on when users actively alter the selected values in complex dropdown collections.
</div>

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


<div class="meta-api-description">
How do I handle the close event of Kendo UI MultiColumnComboBox? Detect when a multi-column combo box dropdown or popup closes, enabling you to handle events triggered by the overlay or dropdown hiding, perform cleanup tasks, update component state, track user interactions or analytics, respond to close actions, and access component methods or properties during the event to synchronize UI changes or reset values after the list or menu is dismissed.
</div>

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


<div class="meta-api-description">
How do I execute custom logic after the MultiColumnComboBox has finished loading its data? Trigger actions or execute custom logic after the dropdown completes loading, binding, or refreshing data from its data source, enabling dynamic updates to the user interface, setting focus on specific items, manipulating the rendered elements, or responding when the list of options is fully populated and displayed. Detect when data is fully loaded and rendered to programmatically update components, run callbacks on data load, control element focus post-refresh, or perform DOM changes after rebinding or refreshing list items. Use event-driven responses to changes in the data set, such as after fetching, loading new data, or re-rendering the visible options in a multi-column dropdown or combo box interface.
</div>

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


<div class="meta-api-description">
How to customize filtering in Kendo UI MultiColumnComboBox? Capture and customize how filtering operates when searching or narrowing down items in a multi-column dropdown by intercepting events triggered before data filtering begins; control or modify search terms, filter predicates, and matching logic dynamically, apply custom filtering algorithms, adjust or cancel automatic filtering processes, respond to user input changes or filter parameter updates, and access the component instance to manage filter context, enabling advanced control over which items are displayed during dropdown filtering or autocomplete queries.
</div>

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


<div class="meta-api-description">
How can I detect when the dropdown menu is opened in a Kendo UI MultiColumnComboBox? Detect when the dropdown or popup menu is triggered or opened in a multicolumn combo box to execute custom code for automatic input focus, initializing data fetching or loading, updating UI state, managing layout changes, or responding to user interactions when the selection list becomes visible, enabling event-driven control tied to the component instance for dynamic interface adjustments and behavior tracking as soon as the list expands or the user activates the dropdown panel.
</div>

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


<div class="meta-api-description">
How do I detect when a user selects an item from a Kendo UI MultiColumnComboBox? Detect and handle user item selection actions from a multi-column dropdown or combo box, capturing events triggered by mouse clicks, touch taps, or keyboard navigation when a user picks an option from the list; enable responding to those selections by executing custom logic like updating interfaces, retrieving the chosen value, or initiating follow-up processes, while noting that automatic or programmatic changes to the selected item do not trigger this event detection or callback.
</div>

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


<div class="meta-api-description">
How do I handle changes in a MultiColumnComboBox when its selection or input value updates? Handle changes when a selection or input value updates in a multi-column dropdown or combo box component, triggering events to synchronize dependent user interface elements, refresh data models, run validation checks, cascade updates to linked controls, propagate selected values, or execute custom logic on value changes caused by user interaction or programmatic API calls, enabling dynamic data loading and coordinated UI behavior.
</div>

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
