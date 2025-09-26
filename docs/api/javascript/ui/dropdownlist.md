---
title: DropDownList
page_title: Configuration, methods and events of Kendo UI DropDownList
description: "Learn how to control your DropDown UI widget's behavior to suit your needs: open, close, enable, disable the widget. Events data and code examples available."
res_type: api
component: dropdownlist
---

# kendo.ui.DropDownList

Represents the Kendo UI DropDownList widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.


<div class="meta-api-description">
Configure responsive behavior and rendering adjustments for dropdown lists to optimize display across various screen sizes and devices, enabling or disabling adaptive layouts that automatically switch between standard and mobile-friendly presentations. Control how the dropdown adapts its interface for improved usability on small screens, tablets, or desktops by setting modes that determine whether to use default fixed rendering or an automatic, flexible, and responsive design that adjusts dropdown appearance and interaction patterns dynamically. Adjust dropdown rendering settings to enable mobile compatibility, responsive design, screen-specific optimization, device-aware UI adaptation, and support for different viewport sizes to enhance user experience on phones, tablets, and desktops.
</div>

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: ["Option 1", "Option 2", "Option 3"],
        adaptiveMode: "auto"
    });
    </script>

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.


<div class="meta-api-description">
Customize, configure, or localize the header text displayed in the responsive or mobile popup layout of dropdown lists when adapting to smaller screens. Adjust the title shown in popup dialogs or adaptive views to match different languages, branding needs, or contextual prompts. Control or set the displayed title text that appears above dropdown menus in adaptive or mobile responsive modes, enabling dynamic header changes for better user experience in compact or mobile interfaces.
</div>

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: ["Small", "Medium", "Large"],
        adaptiveMode: "auto",
        adaptiveTitle: "Select Size"
    });
    </script>

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.


<div class="meta-api-description">
Configure or customize alternate subtitle text for dropdown menus on smaller or adaptive screen sizes, enabling dynamic, localized, or static helper text that adjusts based on the device or responsive layout, allowing context-sensitive subtitles in dropdown lists that adapt to different screen widths, mobile views, or compact interfaces.
</div>

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: ["Product A", "Product B", "Product C"],
        adaptiveMode: "auto",
        adaptiveTitle: "Select Product",
        adaptiveSubtitle: "Choose your preferred option"
    });
    </script>

### animation `Boolean|Object`

Configures the opening and closing animations of the suggestion popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the suggestion popup will open and close instantly.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
Control the behavior and effects when a dropdown or suggestion list appears and disappears by configuring animation settings that enable or disable opening and closing transitions. Adjust or disable animated popups to create instant display or hide effects for dropdown menus, suggestion lists, or autocomplete results, optimizing user interface responsiveness or visual feedback. Customize whether dropdown suggestions fade, slide, or appear without animation by toggling animation options, affecting the timing and style of how item lists open or close in input controls. Enable smooth opening and closing animations or turn off animations entirely to have immediate popup visibility changes for enhanced user experience or performance tuning. Manage animation effects related to interactive dropdown lists to control UI transition dynamics and responsiveness when suggestion popups toggle visibility.
</div>

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

The animation that is applied when the popup is closing.


<div class="meta-api-description">
Customize the closing behavior of dropdown menus by setting animations such as fade out, slide up, or expand shrink, including options to adjust timing like duration and delay, and easing effects for smooth transitions when the popup closes or hides. Configure how dropdown or popup elements disappear with flexible animation controls that manage the type of effect, speed, and animation curves during the closing sequence. Enable, set, or control exit animations for user interface dropdown popups, specifying visual effects and timing parameters to create dynamic or subtle hide transitions on menu closure. Adjust the closing animation parameters for dropdown components to define the style, speed, and smoothness of how the popup is dismissed or removed from view, perfect for creating customized UI interactions.
</div>

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


<div class="meta-api-description">
Configure and customize the closing animation effects for dropdown lists by specifying one or more visual transitions that trigger when the dropdown closes, enabling control over fade, slide, zoom, or other animation styles individually or combined using space-separated effect names, allowing developers to enhance user interface responsiveness and visual feedback by setting, enabling, or adjusting close animations for dropdown menus and select components.
</div>

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: ["Option 1", "Option 2", "Option 3"],
        animation: {
            close: {
                effects: "zoomOut"
            }
        }
    });
    </script>

### animation.close.duration `Number` *(default: 100)*

The duration of the close animation in milliseconds.


<div class="meta-api-description">
Adjust or configure the time length, speed, or duration of the dropdown menu closing animation or closing effect to control how fast or slow the dropdown list collapses or disappears, enabling customization of UI transition smoothness, animation timing, or closure responsiveness in milliseconds for better user experience and interface fluidity during dropdown close actions.
</div>

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: ["Red", "Blue", "Green"],
        animation: {
            close: {
                duration: 500
            }
        }
    });
    </script>

### animation.open `Object`

The animation played when the suggestion popup is opened.


<div class="meta-api-description">
Control, customize, or disable the opening animation effects for dropdown suggestion popups, including setting animation type, speed, easing curves, transition styles, and configuring how suggestion lists animate when they appear or expand. Adjust visual behaviors for dropdown menus, specify popup reveal timing, enable smooth fade-in or slide-in effects, and manage animation parameters for the initial display of selectable options in dropdown components.
</div>

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


<div class="meta-api-description">
Set or customize the opening animations for dropdown menus or popup lists by specifying one or multiple animation effects to control how the dropdown appears, enabling fade, slide, zoom, or other visual transitions on open. Configure, enable, or combine different animation styles for smooth or complex entrance effects, adjust timing or sequence of opening animations, and use keywords like animation open effects, dropdown opening transitions, popup animation control, multiple combined animations, and visual effect settings to fine-tune user interface dropdown behavior and enhance the user experience during dropdown expansion or popup display.
</div>

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: ["Morning", "Afternoon", "Evening"],
        animation: {
            open: {
                effects: "zoomIn"
            }
        }
    });
    </script>

### animation.open.duration `Number` *(default: 200)*

The duration of the open animation in milliseconds.


<div class="meta-api-description">
Adjust the length of the dropdown opening animation by setting the duration in milliseconds to speed up, slow down, or disable the transition effect when the list appears. Developers can configure how long the dropdown menu’s reveal animation runs, synchronize its timing with other interface motions, control the fade or slide duration when the menu expands, and fine-tune user experience by modifying the popup's open animation speed or turning it off entirely for instant display. This setting helps customize the timing of dropdown unfolding effects, tune UI responsiveness, and manage animation pace according to performance or design preferences.
</div>

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: ["Fast", "Medium", "Slow"],
        animation: {
            open: {
                duration: 800
            }
        }
    });
    </script>

### autoBind `Boolean`*(default: true)*

Controls whether to bind the widget to the data source on initialization.


<div class="meta-api-description">
Control the automatic loading and binding of data on initialization, enabling or disabling immediate data fetch for dropdown lists, select inputs, or combo boxes; configure whether the list synchronizes and populates its options right away or waits for manual triggers, deferred data fetching, or explicit refresh calls, useful for optimizing performance by preventing initial remote data requests, delaying population until user interaction or custom logic initiates data retrieval, and managing data sources dynamically during setup or runtime.
</div>

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        autoBind: false
    });
    </script>

### autoWidth `Boolean`

If set to `true`, the widget automatically adjusts the width of the popup element and does not wrap up the item label.

> Note: Virtualized list doesn't support the auto-width functionality.


<div class="meta-api-description">
Control or configure automatic resizing of dropdown menus so the popup width dynamically matches or fits the longest item label without wrapping text, enabling UI elements to adjust width based on content length or label size for better presentation; set or enable automatic width adjustment for dropdown or select components to prevent truncated or wrapped entries and ensure that popup lists expand horizontally to accommodate varying item lengths, though note this may not apply to virtualized lists where dynamic sizing is restricted.
</div>

#### Example - enable autoWidth

    <input id="dropdownlist" style="width: 100px;" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>

### cascadeFrom `String`

Use it to set the Id of the parent DropDownList widget.
[Help topic showing how cascading functionality works](/web/dropdownlist/cascading)


<div class="meta-api-description">
Configure dependent dropdown menus by linking one dropdown list to another so that the child dropdown dynamically filters or updates its options based on the selected value of the parent dropdown, enabling cascaded or hierarchical selections, connected dropdowns, updated dropdown items driven by another dropdown’s choice, linked dropdown lists for step-by-step filtering, setting up dropdown dependencies where one dropdown controls the available options of another, enabling chained dropdown behavior where child menus react to parent menu selections, controlling dropdown content based on preceding dropdown inputs, and setting relationship identifiers to establish the data flow between related dropdown components for synchronized option updates.
</div>

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

Defines the field to be used to filter the data source. If not defined the [parent's dataValueField option will be used](/api/javascript/ui/dropdownlist/configuration/datavaluefield).
[Help topic showing how cascading functionality works](/web/dropdownlist/cascading)


<div class="meta-api-description">
Configure a child dropdown list to dynamically filter its options based on a specific field that corresponds to the selected value in the parent dropdown, enabling cascading selections where the child list updates according to the parent’s choice. This setting lets you specify which data field or key is used for filtering the child’s data source, overriding default behavior where the parent's selected value field is used. Control dependent dropdowns by linking child lists to parent selections through customizable fields, supporting scenarios such as hierarchical filtering, dynamic option loading, and related data selection in forms or user interfaces. Adjust or enable field-based filtering between dropdowns to create connected, context-aware dropdown chains that respond to user input across multiple related lists.
</div>

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

### cascadeFromParentField `String`

Defines the parent field to be used to retain value from. This value will be used further to filter the dataSource. If not defined the value from the [parent's dataValueField will be used](/api/javascript/ui/dropdownlist/configuration/datavaluefield).


<div class="meta-api-description">
Configure which parent field value to inherit and apply as a filter when populating the dropdown list, enabling dependent dropdown functionality by controlling how data is filtered based on the selected parent field’s value. Set or specify the field used to cascade values from the parent control for dynamic filtering and synchronizing dropdown options, allowing control over which parent property influences the child dropdown’s data source for scenarios like linked selections, chained dropdowns, or context-aware filtering. Enable or customize the propagation of parent field values to drive dropdown list contents, supporting flexible filtering logic based on a chosen parent field key rather than default behaviors.
</div>

#### Example

    <input id="parent" />
    <input id="child" />
    <script>
    $("#parent").kendoDropDownList({
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [
            { name: "Parent1", id: 123, cascadeId: 1 },
            { name: "Parent2", id: 234, cascadeId: 2 }
        ]
    });

    $("#child").kendoDropDownList({
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

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used to display a list of values. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
Configure the control to populate its dropdown options by binding to various data inputs such as local JavaScript arrays, remote data endpoints, or reusable data source instances to manage and display dynamic lists of values; enable connection to predefined data collections, utilize data source configurations, or link shared data models for synchronized data handling, supporting scenarios where you want to set, update, or reuse existing data feeds or initialize new data sources on the fly for flexible, data-driven dropdown lists.
</div>

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
          url: "https://demos.telerik.com/service/v2/core/products"
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

> When `dataTextField` is defined, the `dataValueField` option also should be set.


<div class="meta-api-description">
Configure which data field is shown as the visible label or text for items in a dropdown or select list, enabling user-friendly display of options and controlling how the list filters or searches through entries based on readable names or labels. This setting determines the property used as the display value in dropdown menus, comboboxes, or list controls and is essential for filtering functionality that matches user input against item captions or text fields rather than underlying IDs or values. It helps in customizing the user interface to show meaningful, human-readable option names while supporting search, autocomplete, and filter features on those displayed labels within data-bound or dynamic dropdown components.
</div>

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

> When `dataValueField` is defined, the `dataTextField` option also should be set.


<div class="meta-api-description">
Configure which underlying data field supplies the selected value for a dropdown or list widget, enabling control over the key or identifier used when an item is chosen; this setting works in conjunction with the display text field to bind the correct value for selection, making it possible to map user choices to specific data keys, IDs, or value properties from a data source, support value extraction, and integrate with forms or data models where the selected value differs from the visible label.
</div>

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

 Specifies the delay in milliseconds before the search-text typed by the end user is sent for filtering.


<div class="meta-api-description">
Adjust the input debounce timing to control how fast typed characters trigger filtering or search updates in dropdown lists, configuring delays to throttle rapid keystrokes, optimize performance during remote data fetching, manage server load by postponing filter execution, and fine-tune responsiveness between immediate filtering and delayed search initiation to improve user experience and efficiency when users enter text for dynamic filtering.
</div>

#### Example - set the delay

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        filter: true,
        delay: 1000 // wait 1 second before filtering with the user input
    });
    </script>

### enable `Boolean`*(default: true)*

If set to `false` the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.


<div class="meta-api-description">
Configure the ability to activate or deactivate user interaction with dropdown menus, control whether a selection list responds to clicks or keyboard input, toggle enabling or disabling input acceptance in dropdown controls, set dropdown interactivity to allow or block user selections, manage whether a dropdown list is active or inactive, enable or disable dropdown input to prevent or permit choosing options, adjust dropdown responsiveness for accepting user commands or locking the selection interface, switch dropdown components between enabled and disabled states to control user engagement, control dropdown accessibility by turning input acceptance on or off, and set dropdown menus to either accept input from users or be non-interactive for interface restrictions.
</div>

#### Example - disable the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      enable: false
    });
    </script>

### enforceMinLength `Boolean` *(default: false)*

If set to `true` the widget will not show all items when the text of the search input cleared. By default the widget shows all items when the text of the search input is cleared. Works in conjunction with [minLength](/api/javascript/ui/dropdownlist#configuration-minLength).


<div class="meta-api-description">
Configure how the dropdown list behaves when the search input is cleared, controlling whether all items show or the list stays empty. Enable or disable the display of full search results after clearing the input field, preventing automatic expansion to the entire item set. Adjust settings to restrict or allow dropdown population on empty search terms, enforcing minimum input length rules and controlling when the item list is visible or hidden after clearing the search. Manage visibility of list items when no characters are entered, refining search result behavior to show partial, full, or no listings based on clear input conditions.
</div>

#### Example - enforce minLength

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        filter: "startswith",
        autoBind: false,
        minLength: 3,
        enforceMinLength: true,
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        dataSource: {
            type: "odata-v4",
            serverFiltering: true,
            transport: {
                read: {
                    url: "https://demos.telerik.com/service/v2/odata/Products",
                }
            }
        }
    });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "none"
- "solid"
- "flat"
- "outline"


<div class="meta-api-description">
Control and customize the color styling of dropdown components by setting how the fill is applied to backgrounds, borders, or interactive states, including options like no fill, solid color fills, flat shading styles, or outlined borders. Enable developers to configure visual appearance modes such as transparent backgrounds, fully colored areas, minimalistic flat designs, or distinct outlines to suit UI theming, branding, or accessibility needs. Adjust fill behavior to define the dropdown’s color presence, whether for hover effects, default states, or active selections, supporting flexible styling setups and varied user interface aesthetics. Set and modify fill styles to control how colors layer or display within dropdown lists for consistent, customizable component design and user experience refinement.
</div>

#### Example - sets the fillMode

    <select id="dropdown">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
      $("#dropdown").kendoDropDownList({
        filter: "contains",
        fillMode: "flat"
      });
    </script>

### filter `String`*(default: "none")*

The filtering method used to determine the suggestions for the current value. Filtration is turned off by default, and can be performed over `string` values only (either the widget's data has to be an array of strings, or over the field, configured in the [`dataTextField`](/api/javascript/ui/dropdownlist#configuration-dataTextField) option).
The supported filter values are `startswith`, `endswith` and `contains`.


<div class="meta-api-description">
Adjust how suggestions are filtered dynamically as users enter text, enabling different matching modes like starting with, ending with, or containing specific substrings; configure filtering to work exclusively on string values within datasets, either simple arrays of strings or specific text fields, with options to activate or disable string-only filtering for more precise or broad search results during input.
</div>

#### Example - set the filter

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: ["Chai", "Chang", "Tofu"],
      filter: "contains"
    });
    </script>

### filterTitle `String`

When filtering is enabled, allows custom title to be defined for the filter input element.


<div class="meta-api-description">
Customize the tooltip or title text displayed on the filter input field to enhance accessibility and user experience during filtering interactions, enabling developers to set, configure, or override the default filter input title attribute for clarity, assistive technology compatibility, and better guidance when searching or narrowing down dropdown list options with filtering enabled.
</div>

#### Example - set the filter

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: ["Chai", "Chang", "Tofu"],
      filter: "contains",
      filterTitle: "custom title"
    });
    </script>

### fixedGroupTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the fixed header group. By default the widget displays only the value of the current group.


<div class="meta-api-description">
Customize or configure a fixed group header rendering in dropdown or list components to display persistent group titles or summaries, enable setting up templates that define how grouped data headers appear, control the fixed header content with HTML, data bindings, or conditional logic, render static group labels that remain visible while scrolling through grouped lists, and override default behavior to show more than just the current group value using customizable header templates and dynamic markup for grouped items.
</div>

#### Example

    <input id="customers" style="width: 400px" />
    <script>
        let encode = kendo.htmlEncode;
        $(document).ready(function() {
            $("#customers").kendoDropDownList({
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                fixedGroupTemplate: (data) => `Fixed group: ${encode(data)}`,
                height: 400,
                dataSource: {
                    transport: {
                        read: "https://demos.telerik.com/service/v2/core/Customers"
                    },
                    group: { field: "Country" }
                }
            });
        });
    </script>

### footerTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the footer template. The footer template receives the widget itself as a part of the data argument. Use the widget fields directly in the template.


<div class="meta-api-description">
Customize the dropdown popup footer by defining a tailored template that allows embedding dynamic content, accessing component properties, and controlling footer layout or styling; this enables developers to set, configure, or render personalized footer elements within dropdown lists, supporting advanced customization options such as adding buttons, texts, or other UI components inside the dropdown’s bottom area, and integrating component state or data seamlessly into the footer region.
</div>

#### Parameters

##### instance `Object`

The widget instance.

#### Example - specify footerTemplate as a string

    <input id="dropdownlist" />
    <script>
    let encode = kendo.htmlEncode;
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      footerTemplate: ({ instance }) => `Total <strong>${encode(instance.dataSource.total())}</strong> items found`
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the input. If the input has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
Configure and display a descriptive text label linked to a dropdown input element for improved accessibility and user interaction, enabling you to set or customize the visible label using a string value or a dynamic function that defines the label content. Control the association between the label and the dropdown input by automatically generating or using an existing identifier for proper HTML for-attribute linkage, ensuring screen readers and form controls are properly connected. Set, customize, or update labels for selection controls, dropdown menus, or combo boxes in forms, enhancing usability, accessibility compliance, and user-friendly interfaces with customizable label content and automatic ID management.
</div>

#### Example - create a label from a string

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
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

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
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
Configure and customize the label's inner HTML content to include icons, links, styled text, or any custom markup, enabling control over the dropdown label’s appearance and formatting with full HTML support rather than plain text; set, modify, or update the label content dynamically to create rich, interactive, visually enhanced dropdown labels.
</div>

#### Example - create a label from a string

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
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

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
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

> **Important:** The [value](/api/javascript/ui/dropdownlist/methods/value) method **does not trigger** the `focusout` event of the input.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#dropdownlist").data("kendoDropDownList").label.floatingLabel.refresh();`


<div class="meta-api-description">
Configure floating label behavior, enable or disable floating placeholder labels, toggle label animation and wrapping for dropdown inputs, control how labels float above the field on focus or value entry, manage floating and placeholder interactions, set floating label visibility for dropdown lists, optimize label positioning during input changes, refresh or update floating labels programmatically to maintain correct visual floating states after value changes, and adjust label floating effects without altering other dropdown configurations.
</div>

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
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
Customize the rendering and appearance of group headers and labels in dropdown lists by defining templates that control how grouped items are displayed, enabling formatting, styling, or adding rich content to group labels with options to override default text-only group value displays, configure custom group layouts, or enhance grouped selections with personalized templates for improved user interfaces and presentation in dropdown menus.
</div>

#### Example

    <input id="customers" style="width: 400px" />
    <script>
        let encode = kendo.htmlEncode;
        $(document).ready(function() {
            $("#customers").kendoDropDownList({
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                groupTemplate: (data) => `Group: ${encode(data)}`,
                height: 400,
                dataSource: {
                    transport: {
                        read: "https://demos.telerik.com/service/v2/core/Customers"
                    },
                    group: { field: "Country" }
                }
            });
        });
    </script>

### height `Number`*(default: 200)*

The height of the suggestion popup in pixels. The default value is 200 pixels.


<div class="meta-api-description">
Adjust or configure the maximum vertical size of dropdown suggestion lists, control popup height in pixels to set how tall the list of options or autocomplete suggestions appears, enable scrollbars when content exceeds this height, customize the visible area for dropdown menus, set popup or overlay height limits, determine when scrolling activates for overflowing dropdown items, specify fixed or dynamic maximum heights, manage popup sizing for better visibility of selectable entries, and fine-tune vertical dimension settings for dropdown suggestion boxes to enhance user interface behavior and usability.
</div>

#### Example - set the height

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataTextField: "ProductName",
      dataValueField: "ProductID",
	  height: 500,
      dataSource: {
        transport: {
          read: {
            url: "https://demos.telerik.com/service/v2/core/Products",
          }
        }
      }
    });
    </script>

### ignoreCase `Boolean`*(default: true)*

If set to `false` case-sensitive search will be performed to find suggestions. The widget performs case-insensitive searching by default.


<div class="meta-api-description">
Configure search sensitivity to letter casing for dropdown input matching, enabling case-insensitive or case-sensitive filtering of user text entries. Toggle whether the dropdown list matches entries regardless of uppercase or lowercase differences, control if input searches distinguish between capital and small letters, set to ignore or respect letter case during suggestion filtering, enable or disable case-aware search behavior to refine or broaden matching results, adjust dropdown matching rules to support strict or flexible casing, support user searches that require exact case matches or accommodate varied capitalization styles in dropdown selections.
</div>

#### Example - disable case-insensitive suggestions

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      ignoreCase: false
    });
    </script>

### index `Number`*(default: 0)*

The index of the initially selected item. The index is `0` based.


<div class="meta-api-description">
Set or configure the initial selected item in a dropdown menu by specifying its zero-based position or index to control which option appears as the default choice on load. Enable preselection of dropdown options by defining the starting selection via numeric position, useful for setting default selected values, pre-chosen items, initial highlighted options, or default indexes in selection lists. Adjust the dropdown’s initial selected state programmatically, control default highlighted entries, or specify the starting picked item in menus, dropdowns, or selection components by setting the index value corresponding to the option’s position.
</div>

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

### messages `Object`

The text messages displayed in the widget. Use this option to customize or localize the messages.


<div class="meta-api-description">
Customize, configure, or localize the displayed text and labels within dropdown lists, menus, or selection controls by setting or overriding message content, prompt text, placeholder strings, error messages, and informational hints to suit different languages, regions, or application contexts, enabling full control over user interface wording, translations, and text customization for dropdown components.
</div>

#### Example - customize DropDownList messages

    <input id="dropdownlist" />
    <script>
      var items = [{ text: "Item 1", value: "1" }, { text: "Item 2", value: "2" }];
      $("#dropdownlist").kendoDropDownList({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: items,
        index: 1,
        messages: {
          noData: "There is no data!"
        }
      });
    </script>

### messages.noData `String` *(default: "No data found.")*

The text message shown in the noDataTemplate when no data is available in the widget drop-down.


<div class="meta-api-description">
Customize or configure the message, text, or label displayed when a dropdown or selection list is empty, contains no available options, or has zero items to show, including setting placeholder text, empty state messages, or notifications that inform users there are no results, no data, or no entries available in the list or dropdown control.
</div>

#### Example - customize noData message

    <input id="dropdownlist" />
    <script>
      $("#dropdownlist").kendoDropDownList({
        dataSource: [],
        messages: {
          noData: "There is no data!"
        }
      });
    </script>

### minLength `Number`*(default: 1)*

The minimum number of characters the user must type before a filter is performed. Set to higher value than `1` if the search could match a lot of items.

> Widget will initiate a request when input value is cleared. If you would like to prevent this behavior please check the [filtering](/api/javascript/ui/dropdownlist/events/filtering) event for more details.


<div class="meta-api-description">
Set the minimum number of characters needed to begin filtering or searching within a dropdown or autocomplete input, controlling when the component starts to perform queries or filtering to reduce unnecessary network calls, limit excessive results, and improve performance by specifying how many user-typed characters trigger the search action; useful for optimizing searches with large datasets, controlling autocomplete behavior, adjusting input thresholds, and managing when filtering begins as users type or clear input fields.
</div>

#### Example - set minLength

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: ["Chai", "Chang", "Tofu"],
      filter: "contains",
      minLength: 3
    });
    </script>

### noDataTemplate `String|Function|Boolean` *(default: true)*

The [template](/api/javascript/kendo/methods/template) used to render the "no data" template, which will be displayed if no results are found or the underlying data source is empty.
The noData template receives the widget itself as a part of the data argument. The template will be evaluated on every widget data bound.

> **Important** The popup will open when 'noDataTemplate' is defined


<div class="meta-api-description">
Customize the display when no items are found in dropdown menus or when the data source is empty by configuring an empty-state template that shows custom messages, alternative content, or placeholders. Enable or set a specific template to render when searches yield no results or the list has no data, allowing control over user feedback during filtering or empty datasets. Support flexible content injection into dropdowns for handling zero-result scenarios by defining templates that receive context for dynamic rendering each time data updates, ensuring the dropdown’s popup opens appropriately when no matching data exists.
</div>

#### Example - specify noDataTemplate as a string

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [],
      dataTextField: "name",
      dataValueField: "id",
      noDataTemplate: 'No Data!'
    });
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.


<div class="meta-api-description">
Customize, configure, or set the floating dropdown options list, control popup behavior and appearance, enable advanced dropdown menu settings, modify or override default popup initialization, adjust popup display properties, manage dropdown list presentation and interaction, tailor the expandable options panel, define popup content and features, customize dropdown popup styling and functionality, and enhance user interface dropdown menus with adjustable popup parameters.
</div>

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


<div class="meta-api-description">
Configure the placement of dropdown menus or popup overlays by specifying the container or parent element to append to, control where the dropdown popup is inserted within the DOM tree, set or change the attachment point using CSS selectors, manage popup positioning and stacking order by choosing the appropriate container element, avoid clipping or overflow issues by appending to custom elements, adjust the rendering context and z-index layering by controlling the popup’s DOM parent, define where overlays or floating elements mount to improve layout or styling, set the popup’s container dynamically to ensure proper visibility and interaction, customize overlay placement relative to the dropdown trigger, and control how popup elements integrate within complex component hierarchies or scrollable containers.
</div>

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
Configure the popup alignment and positioning for dropdown menus by setting horizontal and vertical anchor points such as top, center, bottom, left, and right to control where the popup appears relative to the dropdown trigger. Adjust and set popup origin coordinates using space-separated vertical and horizontal values for precise placement including options like top left, center center, bottom right, or any combination to customize how dropdown lists open and appear in the interface. Enable popup placement control to align menus dynamically with the dropdown button, allowing developers to position the dropdown overlay or popup window based on anchors for better UI alignment, dropdown responsiveness, and user experience customization.
</div>

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


<div class="meta-api-description">
Set or adjust the placement and alignment of dropdown menus or popup elements relative to their anchor or trigger points by specifying vertical and horizontal attachment positions such as top, bottom, center, left, or right. Configure how a popup or dropdown list aligns with its anchor origin to control where the popup appears on the screen, enabling precise positioning for user interface elements or tooltip-like components. Enable customization of popup placement behavior by defining coordinates or points of attachment for better alignment, control popup orientation in dropdown controls by adjusting vertical and horizontal alignment options, and manage the spatial relation between trigger elements and their attached popups to suit different layout or design needs.
</div>

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
        position: "top center"
      }
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

### optionLabel `String | Object`*(default: "")*

 Define the text of the default empty item. If the value is an object, then the widget will use it as a valid data item.
 Note that the optionLabel will not be available if the widget is empty.

> * If `optionLabel` is an object, it needs to have at least `dataValueField` and `dataTextField` properties. Otherwise, widget will show `undefined`.
Note that the very same optionLabel object will be passed to the [valueTemplate](/api/javascript/ui/dropdownlist/configuration/valuetemplate). **You need to ensure that all required by the valueTemplate properties are present
in the optionLabel object**.
> * Since Q1 2015 (2015.1.318), the option label is rendered as a separate header template. The benefits of this change are:
- the widget's value will be empty string even when `dataValueField` and `dataTextField` options are equal or not defined
- the widget will not throw an exception when a custom item template is used and `optionLabel` is string
- option label has a separate template, that gives more freedom for customization
> * [Not relevant after Q1 2015] Widget's value will be equal to the `optionLabel` if the `dataValueField` and `dataTextField` options are equal or not defined


<div class="meta-api-description">
Set or configure the default placeholder text, empty selection label, or initial default value displayed in a dropdown list before user input or data binding, including the ability to provide a simple string placeholder or a complex data object with specific value and text fields, enabling the control to show a selectable empty item, default option, or introductory prompt in menus, controls, or forms. This includes scenarios where developers need to customize the empty state label for dropdowns, supply a default data entry when binding collections, avoid undefined display by ensuring necessary properties in the placeholder object, customize the empty option's template separately from data items, control initial dropdown display when no selection is made, and handle cases where the dropdown must gracefully handle empty or initial default entries with or without advanced templates or mixed data types.
</div>

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

The [template](/api/javascript/kendo/methods/template) used to render the option label. Use optionLabelTemplate if you want to customize the markup of the optionLabel.

> * [optionLabel](/api/javascript/ui/dropdownlist/configuration/optionlabel) has to be defined for the optionLabelTemplate to take effect.
> * Define the [optionLabel](/api/javascript/ui/dropdownlist/configuration/optionlabel) as **object** if complex template structure is used


<div class="meta-api-description">
Control and customize the placeholder option’s displayed label in dropdown lists by configuring templates that define the markup, HTML structure, bindings, and layout for the option label. Enable or set advanced option label formatting using template-based rendering, especially for complex object structures or custom HTML output within placeholder entries. These customizations allow you to define how the default or empty selection is presented, adjust the visual and data binding aspects of option labels, and tailor the dropdown’s initial or null selection text dynamically using template-driven approaches when an option label is specified.
</div>

#### Example - specify the optionLabelTemplate as a string
    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: [
          { productName: "Product 1", productId: 1 },
          { productName: "Product 2", productId: 2 },
          { productName: "Product 3", productId: 3 },
          { productName: "Product 4", productId: 4 }
        ],
        dataTextField: "productName",
        dataValueField: "productId",
        optionLabel: "-- Please select --",
        optionLabelTemplate:'<span style="color:red">-- Please select --</span>'
    });
    </script>

### readonly `Boolean`*(default: "false")*

If set to `true`, the widget will be readonly and will not allow user input. The widget is not readonly be default and allow user input.


<div class="meta-api-description">
Control whether a dropdown field or select menu permits user typing or modification by enabling a read-only mode that disables input editing, locks selection to preset options, prevents users from altering or entering new values, restricts interaction to selection only, and enforces a non-editable state for dropdown lists or combo boxes, useful for scenarios requiring fixed choices without allowing typing or custom input from users.
</div>

#### Example - make the widget readonly

    <input id="dropdownlist" />
    <script>
       $("#dropdownlist").kendoDropDownList({
          readonly: true,
          dataSource: [
            { productName: "Product 1", productId: 1 },
            { productName: "Product 2", productId: 2 },
            { productName: "Product 3", productId: 3 },
            { productName: "Product 4", productId: 4 }
          ],
          dataTextField: "productName",
          dataValueField: "productId",
          optionLabel: "-- Please select --",
          optionLabelTemplate:'<span style="color:red">-- Please select --</span>'
      });
    </script>

### rounded `String`*(default: "medium")*

Sets a value controlling the border radius. Can also be set to the following string values:

- "none"
- "small"
- "medium"
- "large"
- "full"


<div class="meta-api-description">
Control and customize the corner curvature or border radius of dropdown lists by setting values to adjust how rounded or sharp the edges appear, including options for no rounding, subtle rounding, moderate or significant curve sizes, and fully rounded corners; configure the radius to influence the visual style, user interface softness, touch-friendly zones, component aesthetics, and user experience by fine-tuning or enabling preset roundness levels to match different design themes or accessibility needs in selection menus and dropdown elements.
</div>

#### Example - sets the rounded value

    <select id="dropdown">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
      $("#dropdown").kendoDropDownList({
        filter: "contains",
        rounded: "large"
      });
    </script>

### size `String`*(default: "medium")*

Sets a value controlling size of the component. Can also be set to the following string values:

- "small"
- "medium"
- "large"
- "none"


<div class="meta-api-description">
Adjust visual dimensions, height, spacing, and compactness of dropdown menus, list selectors, or combo boxes by setting size options such as small, medium, large, or none to control the overall display scale and user interface density; customize how many items show at once, modify dropdown height, set list compactness, and control the vertical space for better usability and layout consistency in various UI scenarios.
</div>

#### Example - sets a size

    <select id="dropdown">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
      $("#dropdown").kendoDropDownList({
        filter: "contains",
        size: "large"
      });
    </script>

### headerTemplate `String|Function`

Specifies a static HTML content, which will be rendered as a header of the popup element.

> * The header content **must be wrapped** with a HTML tag if it contains more than one element. This is applicable also when header content is just a string/text.
> * Widget does not pass model data to the header template. Use the header template only with static HTML (only presentation elements and not functionality like data bound inputs or fields).


<div class="meta-api-description">
Control or customize the static HTML content displayed as a non-interactive header above dropdown list items, enabling insertion of titles, separators, labels, or informational text that remain fixed and do not bind to dynamic data or model state, with the ability to set custom markup or presentation-only elements wrapped in a single container when including multiple elements or text, ensuring a distinct static header area without data binding, model dependencies, or interactive input controls for enhanced UI presentation atop dropdown menus.
</div>

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

The [template](/api/javascript/kendo/methods/template) used to render the items. By default the widget displays only the text of the data item (configured via `dataTextField`).


<div class="meta-api-description">
Customize dropdown items with flexible templates to control the rendering of list entries inside selection components, enabling the use of HTML markup, data bindings, expression templates, or formatting rules to tailor the display of each item’s content, including support for binding multiple fields, incorporating dynamic data, and overriding default text presentations. Configure or define custom templates to format dropdown list items beyond the default text-only view, allowing developers to shape item appearance, inject styles, and combine data fields for complex UI layouts within dropdown menus. Adjust, set, or enable custom markup templates for dropdown list items, leveraging template expressions and data binding capabilities to create personalized item rendering, rich formatting, and interactive content inside selectable lists in UI components.
</div>

#### Example - specify template as a string literal

    <input id="dropdownlist" />
    <script>
    let encode = kendo.htmlEncode;
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      template: ({ id, name }) => `<span>${name}</span>`
    });
    </script>

### valueTemplate `String|Function`

The [valueTemplate](/api/javascript/kendo/methods/template) used to render the selected value. By default the widget displays only the text of the data item (configured via `dataTextField`).


<div class="meta-api-description">
Customize the display output of the currently selected item in a dropdown by defining how its value is rendered using template syntax, enabling developers to control the selected item's appearance with formatted text, images, icons, or multiple data fields. This feature supports configurable markup expressions to modify the value shown in the dropdown input or selection area beyond the default plain text presentation, allowing for rich, dynamic rendering of selected data including combining fields, inserting HTML elements, or applying conditional formatting to better match UI requirements or design preferences. It addresses scenarios such as customizing selected item display, enhancing dropdown visuals with icons or images alongside text, and tailoring user interface feedback by setting templates that control the selected value's markup structure.
</div>

#### Example - specify template as a string literal

    <input id="dropdownlist" />
    <script>
    let encode = kendo.htmlEncode;
    $("#dropdownlist").kendoDropDownList({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      valueTemplate: ({ name }) => `<strong>${encode(name)}</strong>`
    });
    </script>

### text `String`*(default: "")*

The text of the widget used when the `autoBind` is set to `false`.


<div class="meta-api-description">
Set or customize the initial visible label, placeholder, or default displayed text in a dropdown before data loads or binds, especially when automatic data fetching is disabled, allowing control over what users see first such as preselected values, prompt messages, or manual loading indicators in dropdown lists, combo boxes, or select inputs.
</div>

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


<div class="meta-api-description">
Access or modify the currently selected option in a dropdown menu, retrieve or assign the chosen item programmatically, bind the selection to data models or forms, control which value is active or highlighted in a selection list, update or read user choices dynamically, set default or initial selections, handle changes to the selected item, synchronize selection state with application data, and manipulate dropdown picks through code or user input.
</div>

#### Example - specify value of the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
         dataSource: ["Item1", "Item2"],
         value: "Item1"
    });
    </script>

### valuePrimitive `Boolean`*(default: false)*

Specifies the [value binding](/framework/mvvm/bindings/value) behavior for the widget when the initial model value is null. If set to `true`, the View-Model field will be updated with the primitive value of the selected item's field (defined in the dataValueField option).if set to `false`, the View-Model field will be updated with the selected item - the entire non-primitive object.



<div class="meta-api-description">
Configure how the dropdown selection binds to the data model when the initial value is null, controlling whether the bound value is the primitive field value like an ID or key, or the entire selected object representing the complete item. Enable or disable updating the model with just the raw primitive identifier from the chosen dropdown item versus setting the full data object, useful for scenarios involving simple value binding or complex object data binding. Control whether the dropdown’s selection reflects a basic scalar value such as a string or number, or the full composite item with multiple fields when synchronizing with the underlying view model or form state. Select binding modes that determine if the model updates with the primitive property of the selected option or the entire object, impacting data flow and change detection in UI forms or data-driven components. Adjust value binding strategies for dropdown inputs where initial model values are empty or null, ensuring consistent handling of primitive versus rich object bindings to suit different application architectures and developer preferences.
</div>

#### Example - specify that the View-Model field should be updated with the selected item value

    <div id="example">
      <div>Change the value of the dropdowns and observe the logged value in the console.</div>
      <br/>

      <select id="dropdownPrimitive" data-bind="value: selectedProductId, source: products" >
      </select>

      <select id="dropdown" data-bind="value: selectedProduct, source: products" >
      </select>
    </div>
    <script>
    $("#dropdownPrimitive").kendoDropDownList({
      valuePrimitive: true,
      dataTextField: "name",
      dataValueField: "id",
      optionLabel: "Select product..."
    });

    $("#dropdown").kendoDropDownList({
      valuePrimitive: false,
      dataTextField: "name",
      dataValueField: "id",
      optionLabel: "Select product..."
    });

    var viewModel = kendo.observable({
      selectedProductId: null,
      selectedProduct: null,
      products: [
        { id: 1, name: "Coffee" },
        { id: 2, name: "Tea" },
        { id: 3, name: "Juice" }
      ]
    });

    viewModel.bind("change", function(ev) {
      //result when the second item is selected in the $("#dropdownPrimitive") DropDownList: value: {"id":2,"name":"Tea"}
      //result when the second item is selected in the $("#dropdown") DropDownList: value: 2

      if (ev.field === "selectedProduct") {
        console.log("value: " + JSON.stringify(this.get(ev.field)));
      } else if (ev.field === "selectedProductId") {
        console.log("value: " + this.get(ev.field));
      }
    });

    kendo.bind($("#example"), viewModel);
    </script>

### virtual `Boolean|Object`*(default: false)*

Enables the virtualization feature of the widget. The configuration can be set on an object, which contains two properties - `itemHeight` and `valueMapper`.

For detailed information, refer to the [article on virtualization]({% slug virtualization_kendoui_combobox_widget %}).


<div class="meta-api-description">
Optimize rendering performance and enable smooth, efficient scrolling for dropdown lists with large datasets by configuring virtualized item rendering that dynamically loads only visible entries. Control how many items display at once and improve responsiveness by setting parameters like individual item height and mapping values to dataset indices for precise virtualization. Enhance dropdown usability with scalable, performance-focused virtual scrolling techniques that reduce rendering overhead, support dynamic data fetching, and enable fast navigation through potentially thousands of options without lag or delay. Adjust virtual scrolling behavior by defining item dimensions and custom lookup functions to improve rendering efficiency and user experience in extensive dropdown menus.
</div>

#### Example

    <input id="dropdownlist" />
    <script>
      $("#dropdownlist").kendoDropDownList({
          dataTextField: "ShipName",
          dataValueField: "OrderID",
          virtual: {
              itemHeight: 26,
              valueMapper: function(options) {
              $.ajax({
                  url: "https://demos.telerik.com/service/v2/core/Orders/ValueMapper",
                  type: "GET",
                  success: function (data) {
                    console.log(data);
                  }
                })
              }
          },
          height: 320,
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
    </script>

### virtual.itemHeight `Number`*(default: null)*

Specifies the height of the virtual item. All items in the virtualized list **must** have the same height.
If the developer does not specify one, the framework will automatically set `itemHeight` based on the current theme and font size.


<div class="meta-api-description">
Set, configure, or control the fixed height of each item in a virtualized dropdown or select list to ensure accurate scrolling, smooth virtualization, consistent layout, and predictable rendering of list elements. Adjusting the uniform item size is essential for proper calculation of visible items, scroll behavior, and dynamic loading in long lists or dropdown menus. This height setting impacts how virtual scrolling engines calculate viewport occupancy and element positioning, enabling developers to customize or override default sizing derived from fonts, themes, or styles when tuning performance or appearance of dropdown lists with many entries.
</div>

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataTextField: "ShipName",
        dataValueField: "OrderID",
        virtual: {
            itemHeight: 30
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
    </script>

### virtual.mapValueTo `String`*(default: "index")*

The changes introduced with the Kendo UI R3 2016 release enable you to determine if the `valueMapper` must resolve a *value to an `index`* or a *value to a `dataItem`*. This is configured through the `mapValueTo` option that accepts two possible values - `"index"` or `"dataItem"`. By default, the `mapValueTo` is set to `"index"`, which does not affect the current behavior of the virtualization process.

For more information, refer to the [article on virtualization]({% slug virtualization_kendoui_combobox_widget %}#value-mapping).


<div class="meta-api-description">
Control how virtualization maps a selected value by configuring whether the value-to-item mapping returns the corresponding data index or the complete data object, enabling options to set, switch, or customize value lookup behavior during virtualized rendering in dropdowns, lists, or combo boxes, with support for choosing between position-based indexing or full data item matching for accurate selection handling, lookup, and data binding optimization in virtual scrolling or large dataset navigation scenarios.
</div>

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        virtual: {
            itemHeight: 26,
            mapValueTo: "dataItem"
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
    </script>

### virtual.valueMapper `Function`*(default: null)*

The widget calls the `valueMapper` function when the widget receives a value, that is not fetched from the remote server yet.
The widget will pass the selected value(s) in the `valueMapper` function. In turn, the valueMapper implementation should return the **respective data item(s) index/indices**.
> **Important**
>
> As of the Kendo UI R3 2016 release, the implementation of the `valueMapper` function is optional. It is required only if the widget contains an initial value or if the `value` method is used.


<div class="meta-api-description">
Map selected item values to their corresponding data indexes when using virtual scrolling, lazy loading, or remote data fetching in dropdown components; enable integration with asynchronous or paged data sources by providing a function that translates chosen value(s) into their position(s) within the data set for correct display and resolution, supporting scenarios with preselected values, programmatic value setting, or initial loading without fully loaded data; handle cases where values are not locally available by implementing a mapper function that associates keys to their remote indices, ensuring seamless virtualization, lazy rendering, and value synchronization in dropdown lists or combo boxes.
</div>

#### Example - DropDownList widget with a virtualized list

    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoDropDownList({
                template: ({ OrderID, ShipName, ShipCountry }) => `<span class="order-id">${OrderID}</span> ${ShipName}, ${ShipCountry}`,
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                filter: "contains",
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
                type: "odata-v4",
                transport: {
                  read: "https://demos.telerik.com/service/v2/core/odata/Orders"
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

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

## Fields

### dataSource `kendo.data.DataSource`

The [data source](/api/javascript/data/datasource) of the widget. configured via the [datasource](/api/javascript/ui/dropdownlist/configuration/datasource) option.

> * Changes of the data source will be reflected in the widget.
> * Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/dropdownlist/methods/setdatasource) method instead.


<div class="meta-api-description">
Retrieve, access, or inspect the current data source object used by a dropdown list component to bind or react to the list items displayed dynamically, including reading runtime data updates or observing changes to the bound dataset. Developers looking to view, monitor, or interact with the underlying collection, array, or data structure feeding the dropdown can leverage this to inspect the live data source linked at initialization or after state changes; note that updating the data source directly won’t modify the items shown, so programmatic control via methods to reset or configure data bindings is recommended. This enables integration scenarios like fetching, filtering, syncing, or validating the data driving the component’s rendered options and dynamically responding to data mutations within dropdown lists or similar UI elements.
</div>

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


<div class="meta-api-description">
Access or modify the selectable text container element within a dropdown widget, enabling retrieval, styling, measuring dimensions, or attaching event handlers to the display area that shows the chosen option. This includes targeting the specific inline element that renders the selected label, allowing dynamic interaction with the displayed content after component setup, such as reading current selection text, applying custom CSS, tracking size changes, or hooking user interactions on the visible selection display inside dropdown menus.
</div>

#### Example - modify span element

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

    var span = dropdownlist.span;

    span.css("background-color", "red");
    </script>

### filterInput `jQuery`
A jQuery object of the filter input element, where the user types.

> Available only if the filtering is enabled.


<div class="meta-api-description">
Access, control, or modify the text input element where users type filter queries in a dropdown list, enabling reading or setting the filter text value, attaching event listeners for input changes, programmatic focusing on the filter field, or dynamically manipulating the filter’s input element behavior and appearance. This covers scenarios like retrieving filtering text, updating or clearing filter content, responding to user keystrokes or focus events on the filter input, and customizing or interacting with the filtering textbox component in dropdown selection interfaces. It applies when filtering is activated and enables fine-grained control over the filter input’s jQuery-bound element used for filtering dropdown options based on user input.
</div>

#### Example - get input element

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      filter:"startswith",
      dataSource:["Chai", "Chang","Tofu"]
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    var filterInput = dropdownlist.filterInput;
    </script>

### options `Object`
An object, which holds the information about the configuration options of the widget.


<div class="meta-api-description">
Access and modify runtime configuration settings of a dropdown list through a configuration object containing all option names and their current values, enabling developers to read, update, control, debug, or serialize the dropdown’s behavior and appearance dynamically during execution, adjust initialization parameters on the fly, programmatically tweak individual settings, inspect current configurations, or extract the component’s state for persistence or analysis.
</div>

#### Example - get options of the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList();

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    var options = dropdownlist.options;
    console.log(options) //open the console to see the options object
    </script>

### list `jQuery`
A jQuery object of the drop-down list element.


<div class="meta-api-description">
Access and control the rendered dropdown list element as a jQuery object to programmatically inspect, modify, or interact with the items and container; perform DOM manipulations such as attaching event listeners, dynamically adjusting size or dimensions, adding or removing CSS classes, traversing child elements, and customizing behavior after component initialization; useful for developers needing direct access to the dropdown’s inner list for styling, event handling, measurements, or runtime modifications.
</div>

#### Example - get list element

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList();

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");

    var list = dropdownlist.list;
    </script>

### ul `jQuery`
A jQuery object of the `ul` element, which holds the available options.


<div class="meta-api-description">
Access and manipulate the underlying unordered list element of a dropdown menu, enabling you to query, modify, or customize the list of options through DOM access and event handling. This capability supports attaching event listeners, dynamically updating list items, changing classes or styles, measuring list dimensions, and performing direct manipulation of option elements after the dropdown has been initialized. Use this for fine-grained control over dropdown contents, interactive behaviors, real-time updates, or custom styling of the selection list in web interfaces.
</div>

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


<div class="meta-api-description">
Programmatically closing a dropdown or select menu, collapsing an open list, controlling the visibility of popup lists, dismissing selection menus on demand, toggling dropdown menus via code, handling keyboard shortcuts to close option lists, managing dropdown states externally, automating closing behavior after initialization, triggering dropdown dismissal from custom event handlers, and integrating external controls to shut dropdown popups.
</div>

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


<div class="meta-api-description">
Access or retrieve the original data object, record, or model linked to a dropdown list item by index or the currently selected entry, enabling you to obtain the underlying dataset, bound data, or data source record associated with a specific dropdown option for use in custom logic, data manipulation, or dynamic UI updates.
</div>

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

> This method does not remove the DropDownList element from DOM.


<div class="meta-api-description">
clean up and teardown dropdown components by unbinding event handlers, removing data attributes to avoid memory leaks, safely disposing of nested or child UI elements, releasing resources tied to dropdown lists, performing proper component lifecycle cleanup without removing DOM elements, disabling and detaching event listeners from dropdown widgets, managing memory by clearing internal data and event bindings, ensuring child controls also release resources during destruction, and preparing dropdown components for removal or reinitialization while keeping the DOM element intact.
</div>

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList();
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.destroy();
    </script>

### focus

Focuses the widget.


<div class="meta-api-description">
Set or trigger keyboard focus programmatically on the dropdown input field to enable user interaction, keyboard navigation, accessibility support for screen readers, and focus control without opening the dropdown menu or altering the selected value, useful for improving form usability, managing focus state in scripts, or initiating input readiness in dynamic web applications.
</div>

#### Example - focus the widget

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList();
    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.focus();
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource/methods/view).


<div class="meta-api-description">
Retrieve, access, or manipulate the rendered list elements of a dropdown or select component by obtaining an ordered array of DOM nodes corresponding to the data source items, enabling operations such as modifying classes, measuring element dimensions, linking visual elements to underlying data entries, or performing lookups and updates based on data item positions within the current view or dataset.
</div>

#### Returns

`Array` The currently rendered dropdown list items (`<li>` elements).

#### Example

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
        dataSource: ["Tea", "Coffee", "Water"]
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    var items = dropdownlist.items();
    console.log(items); // logs the li elements
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
Control the interactive state of a dropdown or select input by programmatically enabling or disabling user actions, toggling between active and inactive modes to allow or prevent selection changes and popup openings, set or unset the component’s enabled state dynamically, manage focus behavior and input availability through boolean parameters, configure the dropdown to be responsive or locked down to restrict user interaction, switch the control’s readiness for input and menu display, and adjust accessibility by enabling or disabling the underlying input field and associated popup functionality.
</div>

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


<div class="meta-api-description">
Trigger programmatic opening of a dropdown menu, activate or show the list of selectable items, expand the options overlay, simulate user interaction to display choices, enable keyboard-driven opening of dropdown lists, automatically reveal suggestion panels or option menus, control focus and navigation when presenting a selection list, set dropdown visibility for user input, and dynamically display the item list to allow selection without manual clicks.
</div>

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


<div class="meta-api-description">
Control whether a dropdown list input can be edited or set to read-only mode programmatically to enable or disable user modifications, toggle between interactive and locked states, restrict user input, prevent changing the selected value, enforce non-editable behavior, disable editing on the fly, set the control to readonly for validation or UI logic purposes, and dynamically switch between editable and readonly modes during runtime based on user roles, application state, or input requirements.
</div>

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


<div class="meta-api-description">
Trigger an immediate redraw or re-rendering of the dropdown menu’s popup list to update and refresh all visible items, ensuring the display matches the current data source, item templates, selections, or any changes in item state; this method helps control the visual update of dropdown contents after dynamic data modifications, programmatic value changes, or UI template adjustments to force the popup UI to repaint and show the latest information accurately.
</div>

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

If the DropDownList filter is enabled, the method searches and filters the results available in the drop-down. If no filter is configured for the widget it selects the first item, which starts with the provided value.


<div class="meta-api-description">
Find, filter, or locate items within a dropdown list by specifying a search term or value, enabling dynamic item matching, filtering visible options based on text input, triggering automatic selection of the first matching entry when filtering is off, performing programmatic lookups, configuring search-driven navigation, controlling how options are filtered or highlighted, handling partial or prefix matches, and supporting interactive or automated methods to scan and select dropdown entries according to user input or predefined criteria.
</div>

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

> * If the widget is not bound (e.g. `autoBind` is set to `false`), the `select` method will **not** pre-fetch the data before continuing with the selection and value setting (unlike the [value](/api/javascript/ui/dropdownlist/methods/value) method), and no item will be selected.
> * The numeric argument indicates the item index in the dropdown, not in the dataSource. If an [`optionLabel`](/api/javascript/ui/dropdownlist/configuration/optionlabel) is used, the dropdown item index can be obtained by incrementing the respective dataSource item index by 1.
> * When **virtualization** is enabled, the method **does not support** selection with a *function predicate*. The predicate function looks only
in the current datasource view, which represents only the active range/page. Hence it will not work properly.
> * This method **does not trigger** [change](/api/javascript/ui/dropdownlist/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.select(1);
    dropdownlist.trigger("change");
    </script>


<div class="meta-api-description">
Set or retrieve the currently selected item in a dropdown list programmatically by index or by a matching function within the in-memory list; configure selection to update the visible value and displayed text without automatically fetching data when unbound or when autoBind is false; control or query the chosen dropdown option using numeric indices adjusted for placeholder or option labels; handle selection changes without triggering automatic change events, enabling manual event firing to update models or bindings; support dynamic selection for paged or virtualized data scenarios with limitations on function-based matching; manipulate dropdown selections in UI widgets by specifying item position or conditions to seamlessly reflect and control the displayed choice in data-driven or static dropdown lists.
</div>

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


<div class="meta-api-description">
Change or update the list items dynamically, reload the dropdown with new data, bind fresh data arrays or data source objects, reset or replace options at runtime, refresh the dropdown choices programmatically, modify the displayed selection set, apply new configurations or data structures to the dropdown, reinitialize the data binding with updated collections, control the source of dropdown entries on the fly, and ensure the dropdown reflects latest data changes and selections instantly.
</div>

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


<div class="meta-api-description">
Configure, retrieve, or update the visible displayed text within a dropdown input field independently of its underlying value, enabling programmatic control to get the current shown label, set or change the displayed text dynamically, prefill the input for user guidance, clear the visible text, or synchronize what users see with external data or application state. This method supports accessing or modifying the user-facing string that appears in the dropdown box, distinct from selection values, facilitating flexible UI updates, display customization, and interaction handling in dropdown components.
</div>

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


<div class="meta-api-description">
Toggle the dropdown menu visibility programmatically to open or close the list dynamically based on its current state, enabling control over showing or hiding the popup as if clicked by the user; this method lets you trigger dropdown expansion or collapse through code, manage interactive dropdown behavior, simulate user toggling actions, and implement conditional display of the dropdown options in your application interface.
</div>

#### Parameters

##### toggle `Boolean` *(optional)*

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

> * If the widget is not bound (e.g. `autoBind` is set to `false`), the `value` method will pre-fetch the data before continuing with the value setting.
**This does not apply when MVVM binding is used.**
> * The widget will **clear the applied filter** if a new value is set. Thus it ensures that the original/whole data set is available for selection.
> * This method **does not trigger** [change](/api/javascript/ui/dropdownlist/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ]
    });

    var dropdownlist = $("#dropdownlist").data("kendoDropDownList");
    dropdownlist.value("Apples");
    dropdownlist.trigger("change");
    </script>


<div class="meta-api-description">
Retrieve or assign the current selection in a dropdown by setting or getting its underlying value, control the selected item programmatically using its associated value identifier, handle cases when no matching value exists by defaulting to item text, support preloading data automatically when the dropdown is not yet bound or manually setting value without triggering change events, manage scenarios to clear any active filters upon changing the selection to restore the full dataset, enable synchronization or workaround of model updates by manually firing change events, and provide flexible programmatic control for developers to configure, update, synchronize, or query dropdown selections dynamically in various UI binding contexts.
</div>

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

#### Example - set value of the widget bound to remote data

    <input id="products" style="width: 100%" />
    <script>
        $("#products").kendoDropDownList({
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            dataSource: {
                transport: {
                    read: {
                        url: "https://demos.telerik.com/service/v2/core/Products"
                    }
               }
            }
        });

        var dropdownlist = $("#products").data("kendoDropDownList");
        dropdownlist.value(2);
    </script>

#### Example - set the value of the widget when `autobind` is set to `false`

    <input id="products" style="width: 100%" />
    <script>
      $("#products").kendoDropDownList({
        dataTextField: "ProductName",
        dataValueField: "ProductID",
        autoBind: false,
        dataSource: {
          transport: {
            read: {
              url: "https://demos.telerik.com/service/v2/core/Products"
            }
          }
        }
      });

      /* Log the data length before using the DropDownList value method */
      /* The result can be observed in the DevTools(F12) console of the browser. */

      console.log($("#products").data("kendoDropDownList").dataSource.data())

      $("#products").data("kendoDropDownList").value(2);
      setTimeout(function(){
        /* Log the data after setting the DropDownList value */
        /* The result can be observed in the DevTools(F12) console of the browser. */
        console.log($("#products").data("kendoDropDownList").dataSource.data())
      }, 500)
    </script>

## Events

### change

Fired when the value of the widget is changed by the user. As of 2015 Q3 SP1 cascading widget will trigger change event when its value is changed due to parent update.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

> The event is not fired when the value of the widget is changed programmatically. If you need to handle changes made by API, wire the [cascade](/api/javascript/ui/dropdownlist/events/cascade) event.


<div class="meta-api-description">
Detect when a user selects or changes an option in a dropdown list by capturing user-initiated selection events that trigger only on manual interactions, including cases where a dropdown updates automatically due to a related parent dropdown change, distinguishing these from programmatic or API-driven value updates; handle real-time reaction to dropdown choice changes, configure event handlers to respond specifically to user input, track cascading changes affecting dependent dropdowns, and differentiate between direct user selection and indirect or code-driven modifications for precise control and dynamic UI updates.
</div>

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


<div class="meta-api-description">
Detect when dropdown menu or list closes to trigger actions like cleanup tasks, restoring focus to input elements, updating interface components after selection or dismissal, logging user interactions or analytics, handling both user-initiated and programmatic closing events, setting callbacks for when popup or overlay containing options disappears, responding to loss of dropdown visibility in UI, executing functions upon dropdown close events, and managing state changes linked to dropdown closure through event handlers bound to the component instance context.
</div>

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


<div class="meta-api-description">
Trigger functions or execute code right after a dropdown or select list finishes loading data from its source, enabling immediate updates to the user interface, modifying or inspecting the loaded items, controlling selection states, dynamically adjusting options, firing subsequent data requests or refreshes, and managing focus or keyboard interactions once the dataset is fully bound and rendered. This event empowers developers to hook into the moment when a list control has completed fetching and displaying its data, facilitating real-time UI adjustments, validation, conditional rendering, or state synchronization in response to the loading process completing.
</div>

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


<div class="meta-api-description">
Customize and control the process of filtering items within dropdown or list components by handling events triggered before the filter criteria apply, enabling inspection and modification of the search text, adjusting filter parameters dynamically, intercepting or canceling filter operations, triggering side effects like loading indicators or asynchronous data fetching, responding to user input changes or search queries in real-time, configuring how filtering interacts with local or remote data sources, and integrating custom logic to refine displayed options based on user actions or application state, with access to component context for advanced manipulation and responsiveness.
</div>

#### Event Data

##### e.sender `kendo.ui.DropDownList`

The widget instance which fired the event.

##### e.filter `Object`

The filter descriptor that will be used to filter the data source.

> The data source filters the data items client-side unless the [data source serverFiltering](/api/javascript/data/datasource/configuration/serverfiltering) option is set to `true`.

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


<div class="meta-api-description">
Detect when a dropdown menu, list popup, or selection panel opens to trigger custom callbacks, run user-defined functions, set input focus programmatically, adjust UI layouts dynamically, execute analytics or event tracking, or implement side effects upon the dropdown becoming visible. Capture user interactions when the list or options menu expands, respond to open state changes, and bind event handlers that activate on popup activation, ensuring responsive control over dropdown visibility events for UI updates, focus management, or telemetry integration.
</div>

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

> * The event is not fired when an item is selected programmatically.
> * Since version Q1 2015 (2015.1.318), the [option label has been moved outside the item list DOM collection]({% slug breakingchanges2015_kendoui %}#kendo-ui-2015-q1). As a result, `jQuery.index()` can no longer be used to reliably detect if the option label is the selected dropdown item. A more appropriate approach would be to check if the selected dataItem value is an empty string, and/or check if the selected dateItem's text is equal to the `optionLabel` string.
>   *  `e.sender.dataItem(e.item)[e.sender.options.dataValueField] == ""`
>   *  `e.sender.dataItem(e.item)[e.sender.options.dataTextField] == e.sender.options.optionLabel`


<div class="meta-api-description">
Capture and handle user item selection events triggered by clicking, tapping, or keyboard navigation within dropdown lists, enabling detection and response to user choices, reading selected values or data items, updating interfaces dynamically, and executing related actions upon manual selection while excluding programmatic changes; manage selection change notifications, monitor chosen dropdown options, identify selected indices or values, and differentiate between option labels and actual data entries by verifying empty or matching text fields, accommodating common developer tasks like event binding, selection tracking, UI refreshing, and selection-driven logic in interactive dropdown components.
</div>

#### Event Data

##### e.dataItem `Object`

The data item instance of the selected item.

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

#### Example - prevent the item selection

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ],
      select: function(e) {
        //call preventDefault() to prevent the selection
        e.preventDefault();
      }
    });
    </script>

### cascade

Fired when the value of the widget is changed via API or user interaction.


<div class="meta-api-description">
Detect and handle changes in dropdown selection including user clicks or programmatic updates to trigger dependent UI refreshes, input validation, state synchronization, or dynamic data loading; configure event listeners to respond to value changes for cascading effects like updating related controls, syncing application state, reacting to selection updates, and executing custom logic when dropdown options change either by API calls or user interaction.
</div>

#### Event Data

##### e.sender `kendo.ui.DropDownList`

The widget instance which fired the event.

#### Example - subscribe to the "cascade" event during initialization

    <input id="dropdownlist" />
    <script>
    $("#dropdownlist").kendoDropDownList({
      dataSource: [ "Apples", "Oranges" ],
      cascade: function() {
        // Handle the event
      }
    });
    </script>

#### Example - subscribe to the "cascade" event after initialization

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
