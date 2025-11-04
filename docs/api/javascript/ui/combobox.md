---
title: ComboBox
page_title: Configuration, methods and events of Kendo UI ComboBox
description: Learn to configure Kendo UI ComboBox widget, use the documentation guide to operate different types of methods and get familiar with all events, used in ComboBox UI widget.
res_type: api
component: combobox
---

# kendo.ui.ComboBox

Represents the Kendo UI ComboBox widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.


<div class="meta-api-description">
How do I enable adaptive rendering for my Kendo UI ComboBox control? Configure or control how dropdown selection components adjust their display and interaction patterns across various screen sizes, devices, or viewport dimensions. Enable responsive, adaptive rendering modes to automatically optimize the user interface for mobile, tablet, or desktop environments, or disable adaptive behavior to maintain a fixed layout regardless of device. Set options to have the component dynamically adapt presentation, sizing, or interaction style based on device characteristics, screen resolution, or window resizing, supporting seamless usability across multiple platforms and form factors. Control or toggle adaptive UI rendering behavior for combo box controls to enhance accessibility and responsiveness in different contexts and screen scenarios.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        adaptiveMode: "auto",
        dataSource: ["Item1", "Item2", "Item3"]
    });
    </script>

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.


<div class="meta-api-description">
How to customize the title in Kendo UI ComboBox adaptive view mode? Configure and set the text label or heading displayed in a dropdown menu or combo box when it switches to adaptive or responsive view modes, enabling control over how the title or placeholder appears across different screen sizes and layouts, including customizing the visible adaptive header, changing the displayed prompt, adjusting the title for mobile or compact views, and modifying the text that guides user selection in adaptive interfaces.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        adaptiveMode: "auto",
        adaptiveTitle: "Select an Item",
        dataSource: ["Item1", "Item2", "Item3"]
    });
    </script>

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.


<div class="meta-api-description">
How do I customize the subtitle in Kendo UI Combobox for adaptive display mode? Customize or set the subtitle text that appears in the adaptive or responsive display mode of a dropdown or combobox component, enabling control over the secondary text shown when the interface shifts to a compact, adaptive layout. Adjust or configure the subtitle string to provide contextual information, labels, or descriptions specifically optimized for adaptive or mobile views, enhancing usability in dynamic resizing or responsive UI scenarios. Use cases include defining alternative or concise subtitles for when the combobox adapts to different screen sizes or layouts, tailoring the displayed secondary text to improve clarity and user experience in adaptive interfaces.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        adaptiveMode: "auto",
        adaptiveTitle: "Choose Option",
        adaptiveSubtitle: "Please select from the list",
        dataSource: ["Option1", "Option2", "Option3"]
    });
    </script>

### animation `Object`

Configures the opening and closing animations of the suggestion popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the suggestion popup will open and close instantly.


<div class="meta-api-description">
How do I customize the animation of the Kendo UI ComboBox suggestion dropdown? Control and customize the opening and closing transitions of suggestion dropdowns, enabling smooth or instant popup animations for better user experience, performance optimization, or accessibility needs; adjust animation settings to enable, disable, or fine-tune dropdown reveal effects, fade-ins, slide-ins, or other visual behaviors when suggestion lists appear or disappear.
</div>

#### Example - disable open and close animations

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      animation: false
    });
    </script>

#### Example - configure the animation

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
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
How to disable closing animation in Kendo UI ComboBox? Control or customize the closing animation of a dropdown or popup, configure the effect, duration, or easing for the popup’s close transition, disable or enable closing animations, set smooth exit animations for overlays or combobox dropdowns, adjust or fine-tune how the popup visually disappears, modify animation settings on closure, toggle animation on and off for closing actions, specify animation parameters for closing states, manage visual feedback when combobox menus close, and tailor or remove exit effects to improve UI responsiveness or user experience.
</div>

#### Example - configure the close animation

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
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
How do I customize the closing animation effects of a Kendo UI ComboBox dropdown menu? Customize or configure the closing animations for dropdown or popup components, enabling you to set, control, or combine multiple visual effects like fade, slide, expand, or other built-in animation styles that play when a selection box or popup menu closes, allowing smooth transitioning, visual flair, or specific exit behaviors by specifying one or more effects separated by spaces and adjusting how the interface responds visually as dropdowns or combo boxes contract or disappear.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        animation: {
            close: {
                effects: "zoomOut",
            }
        },
        dataSource: ["Item1", "Item2", "Item3"]
    });
    </script>

### animation.close.duration `Number` *(default: 100)*

The duration of the close animation in milliseconds.


<div class="meta-api-description">
How can I adjust the close animation duration in a Kendo UI ComboBox dropdown list? Set or adjust the duration and timing of the popup closing animation in dropdowns or selection lists, controlling how long the fade-out or slide-up transition runs when the combo box or dropdown menu closes. Configure, customize, or fine-tune the speed, timing, or length of the close animation effect to create smooth, fast, slow, or delayed closures of dropdown popups, menus, or overlays. Manage animation speed for closing interactive UI elements, specifying close transition intervals in milliseconds to enhance user experience when hiding or collapsing combo box selections or dropdown lists.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        animation: {
            close: {
                effects: "zoomOut",
                duration: 500
            }
        },
        dataSource: ["Item1", "Item2", "Item3"]
    });
    </script>

### animation.open `Object`

The animation played when the suggestion popup is opened.


<div class="meta-api-description">
How can I customize the animation when opening the dropdown list in a Kendo UI ComboBox widget? Set or customize the opening animation for dropdown suggestion lists, including how the popup menu appears with transition effects like fade, slide, or zoom, controlling duration, easing, timing, or enabling smooth show/enter animations when the list expands. Configure visual effects for the ComboBox or autocomplete widget popup opening behavior to create seamless, dynamic transitions that enhance user interaction by defining animation styles, speed, and behavior when suggestion menus are triggered or become visible.
</div>

#### Example - configure the open animation

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
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
How can I customize the opening animation of the dropdown menu in a Kendo UI ComboBox? Control and customize the opening animation of dropdown menus by configuring visual effects that trigger when the selection list appears, including setting single or multiple animation styles simultaneously to enhance user interface transitions, applying predefined or combined animation identifiers to create smooth, dynamic dropdown opening behavior, adjusting how menus expand or reveal options with fluid motion effects, enabling or specifying animation sequences to improve the visual experience of expanding selection components.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        animation: {
            open: {
                effects: "zoomIn",
            }
        },
        dataSource: ["Item1", "Item2", "Item3"]
    });
    </script>

### animation.open.duration `Number` *(default: 200)*

The duration of the open animation in milliseconds.


<div class="meta-api-description">
How to adjust the dropdown open animation speed in Kendo UI ComboBox? Adjust or configure the dropdown open animation timing, control how fast or slow the opening effect plays, set the duration for dropdown reveal animations in milliseconds, customize the speed and length of the ComboBox or select list unfolding transition, enable fine-tuning of the opening animation interval for smoother or quicker dropdown appearance, define the animation length to match UI responsiveness preferences or performance needs, influence the time it takes for the list to expand, manage open transition speed for better user interaction feedback, specify animation time to slow down or speed up dropdown expansion during component initialization or runtime settings.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        animation: {
            open: {
                effects: "zoomIn",
                duration: 400
            }
        },
        dataSource: ["Item1", "Item2", "Item3"]
    });
    </script>

### autoBind `Boolean`*(default: true)*

Controls whether to bind the widget to the data source on initialization.


<div class="meta-api-description">
How does autoBind affect data loading in Kendo UI ComboBox? Configure whether a dropdown list or selection control automatically retrieves and displays its data when it first loads, enabling immediate population of items from the data source or deferring data fetching until manually triggered; manage initialization behavior to control if the data binds and renders at startup or waits for explicit commands, controlling automatic loading, binding, fetching, populating, or rendering of list entries upon component creation or initialization.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        autoBind: false
    });
    </script>

### autoWidth `Boolean`

If set to `true`, the widget automatically adjusts the width of the popup element and does not wrap up the item label.

> Note: Virtualized list doesn't support the auto-width functionality.


<div class="meta-api-description">
How to automatically adjust the width of a Kendo UI ComboBox dropdown menu? Enable dynamic sizing of dropdown or popup menus to automatically expand their width based on item text length, preventing label truncation or wrapping in selection lists, dropdown controls, or combo boxes. Configure auto-sizing or adaptive width for popup elements to ensure long labels are fully visible, improving readability and user experience in lists with variable-length items, while considering limitations such as incompatibility with virtualized or lazy-loaded list rendering. Set or control the behavior of dropdown widths to fit content automatically, enhancing UI flexibility and clarity without manual width adjustments.
</div>

#### Example - enable autoWidth

    <input id="combobox" style="width: 100px;" />
    <script>
    $("#combobox").kendoComboBox({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>

### cascadeFrom `String`

Use it to set the Id of the parent ComboBox widget.
[Help topic showing how cascading functionality works](/web/combobox/cascading)


<div class="meta-api-description">
How to link dropdowns in Kendo UI so that one filters the options of another? Configure a dropdown to dynamically filter its list of options based on the selection made in another parent dropdown by linking their identifiers, enabling dependent or cascading dropdown behavior where choosing a value in one control automatically updates the available choices in the connected control, supporting scenarios like hierarchical filtering, linked selections, or context-sensitive item lists that respond to related input fields.
</div>

#### Example

    <input id="parent" />
    <input id="child" />
    <script>
    $("#parent").kendoComboBox({
        dataTextField: "parentName",
        dataValueField: "parentId",
        dataSource: [
            { parentName: "Parent1", parentId: 1 },
            { parentName: "Parent2", parentId: 2 }
        ]
    });

    $("#child").kendoComboBox({
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

Defines the field to be used to filter the data source. If not defined, it is set to a field with the same name as the [parent's dataValueField option](/api/javascript/ui/combobox/configuration/datavaluefield).
[Help topic showing how cascading functionality works](/web/combobox/cascading)

 > Note: As the dataItems of the dataSource inherit from the kendo.ObservableObject class and this class has a method named [parent](/api/javascript/data/observableobject/methods/parent), setting the cascadeFromField to a field named "parent" is not supported.


<div class="meta-api-description">
How do I configure cascading dropdown behavior in a Kendo UI ComboBox? Configure cascading dropdown behavior by setting the field used to filter child ComboBox options based on a related parent field, enabling dependent filtering or linked selection scenarios where the available choices dynamically update according to another component’s selected value or data source property; control the filtering field by specifying a custom field name to link data sources, implement hierarchical or master-detail dropdown relationships, enable dynamic option lists that react to user input in a related control, and avoid conflicts with reserved field names like "parent" to ensure proper cascading functionality in linked dropdown menus.
</div>

#### Example

    <input id="parent" />
    <input id="child" />
    <script>
    $("#parent").kendoComboBox({
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [
            { name: "Parent1", id: 1 },
            { name: "Parent2", id: 2 }
        ]
    });

    $("#child").kendoComboBox({
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

Defines the parent field to be used to retain value from. This value will be used further to filter the dataSource. If not defined the value from the [parent's dataValueField will be used](/api/javascript/ui/combobox/configuration/datavaluefield).


<div class="meta-api-description">
How do I set up cascading relationships in Kendo UI ComboBox using the cascadeFromParentField property? Set or configure the field from a parent control whose selected value should be retained and used to filter the child dropdown data dynamically, enabling cascading relationships between controls by controlling which parent field drives the data source filtering; this involves specifying the linking field to maintain selection context, syncing dependent dropdown lists, filtering options based on parent choices, or defining which parent attribute influences cascading behavior when nested selection controls are connected.
</div>

#### Example

    <input id="parent" />
    <input id="child" />
    <script>
    $("#parent").kendoComboBox({
        dataTextField: "name",
        dataValueField: "id",
        dataSource: [
            { name: "Parent1", id: 123, cascadeId: 1 },
            { name: "Parent2", id: 234, cascadeId: 2 }
        ]
    });

    $("#child").kendoComboBox({
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

Applicable to a parent ComboBox in a cascading scenario. If set to `true` cascading will be triggered upon custom input in the parent widget. When set to `false` (default) the child will not cascade and it will be disabled upon setting custom input in the parent ComboBox. Cascade on custom values works only when `cascadeFromParentField` is not set for the child combo, or it points to the `dataValueField` of the parent.


<div class="meta-api-description">
How do I enable cascading in Kendo UI ComboBox when a custom value is typed? Control whether selecting or manually typing a custom value in a parent dropdown triggers automatic filtering, updating, or cascading of dependent child dropdowns or combo boxes, enabling dynamic child list refreshes based on user-entered input rather than only predefined selections, supporting scenarios where child options adapt to parent custom entries, allowing configurations to enable or disable child updates upon custom parent values, handling cascading behavior when custom input is provided instead of standard selection, managing dependent field changes or data bindings that react to manual parent input, configuring reactive dropdowns that adjust child choices based on typed or programmatically set parent values, and supporting conditional child enabling or disabling triggered by parent custom input states.
</div>

#### Example

    <p><em>Hint: type `p3` in the parent ComboBox input</em></p>
    <input id="parent" />
    <input id="child" />
    <script>
    $("#parent").kendoComboBox({
        dataTextField: "name",
        dataValueField: "id",
        cascadeOnCustomValue: true,
        dataSource: [
            { name: "Parent1", id: "p1" },
            { name: "Parent2", id: "p2" }
        ]
    });

    $("#child").kendoComboBox({
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

### clearButton `Boolean` *(default: true)*

Unless this options is set to `false`, a button will appear when hovering the widget. Clicking that button will reset the widget's value and will trigger the change event.


<div class="meta-api-description">
How do I enable the clear button in Kendo UI ComboBox? Control the presence and behavior of a clear or reset button inside dropdown input components to enable users to quickly erase selected or entered values, toggle visibility of the reset icon on hover, manage user interactions that trigger value clearing, reset input fields with a single click, configure the option to enable or disable quick clearing functionality, handle events fired upon clearing selections, and customize how users can easily remove or reset their choices within searchable or selectable combo boxes.
</div>

#### Example - disable the clear button

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        clearButton: false
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used to display a list of values. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
How to set data source for a ComboBox control in Kendo UI for jQuery? Bind, connect, or set the data source for a ComboBox control using arrays, objects, or data source instances, enabling dynamic or static lists for dropdown selection. Configure or assign collections, JavaScript objects, or pre-existing data source entities for seamless integration with ComboBox components, supporting both raw data and reusable data sources for efficient loading and updating. Control list items by providing data arrays, JSON objects, or kendo.data.DataSource instances to populate, refresh, or synchronize dropdown entries, facilitating flexible binding patterns in UI dropdowns and autocomplete inputs. Adjust or initialize the underlying data collection for ComboBoxes by linking data objects or data source references, optimizing list management and user selection workflows across scenarios requiring dynamic data binding or static list setups.
</div>

#### Example - set dataSource as a JavaScript object

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <input id="combobox" />
    <script>
    var data = ["One", "Two"];
    $("#combobox").kendoComboBox({
      dataSource: data
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <input id="combobox" />
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/products"
        }
      }
    });
    $("#combobox").kendoComboBox({
      dataSource: dataSource,
      dataTextField: "ProductName",
      dataValueField: "ProductID"
    });
    </script>

### dataTextField `String`*(default: "")*

The field of the data item that provides the text content of the list items. The widget will filter the data source based on this field.

> **Important** When `dataTextField` is defined, the`dataValueField` option also should be set.


<div class="meta-api-description">
How do I configure the display text for items in a Kendo UI ComboBox? Specify or configure the field name from your data source that determines the visible label or display text for each item in a dropdown or selection list, enabling filtering and searching of items based on the text content shown to users; control which data property populates the text shown in a combo box or select input and influence how the list filters results by matching user input against this display field, often paired with a separate value field for selections.
</div>

#### Example - set the dataTextField

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
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

> **Important** When `dataValueField` is defined, the`dataTextField` option also should be set.


<div class="meta-api-description">
How do I specify the value field in a Kendo UI ComboBox? Specify the key or field name from your data objects to use as the underlying value for selection when binding a dropdown or combo box to an array of complex items, enabling mapping between displayed text and the actual value bound behind the scenes. Configure which property acts as the unique identifier or value holder—such as an ID, key, or code—allowing you to control how the control’s value corresponds to your data model separately from the visible labels, ensuring precise value binding and retrieval. This enables scenarios where the visible item label differs from the data value submitted or stored, supporting dynamic, object-based data binding and flexible selection handling in forms and UI components. Ideal for developers looking to set, customize, or override the bound value field in list controls, dropdowns, or input combos with data-source objects containing multiple properties.
</div>

#### Example - set the dataValueField

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        dataSource: [
            { Name: "Parent1", Id: 1 },
            { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id"
    });
    </script>

### delay `Number`*(default: 200)*

The delay in milliseconds between a keystroke and when the widget displays the popup.


<div class="meta-api-description">
How can I slow down the Kendo UI ComboBox's autocomplete suggestions from popping up immediately after each keystroke? Set or adjust the latency interval in milliseconds between a user input keystroke and the display of the suggestion dropdown or popup, enabling control over how fast autocomplete or dropdown options appear while typing. This timing or debounce setting helps manage the responsiveness and throttles rapid input events or remote data fetches, allowing configuration of autocomplete delay, popup show speed, typeahead responsiveness, and input throttling to optimize user experience and performance under fast or slow typing conditions.
</div>

#### Example - set the delay

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      delay: 500
    });
    </script>

### enable `Boolean`*(default: true)*

If set to `false` the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.


<div class="meta-api-description">
How do I disable user interaction in a Kendo UI ComboBox? Control whether the dropdown input is active or inactive, allowing you to enable or disable user interaction, typing, selection, or editing within the combo box component. Toggle the input field’s responsiveness to accept text entry, restrict user modifications, block focus and clicks, or set the input to read-only mode. Manage the component’s interactive state to either allow selection from options and manual input or completely prevent any user input and interaction for scenarios requiring disabled or inactive dropdown input.
</div>

#### Example - disable the widget

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      enable: false
    });
    </script>

### enforceMinLength `Boolean` *(default: false)*

If set to `true` the widget will not show all items when the text of the search input cleared. By default the widget shows all items when the text of the search input is cleared. Works in conjunction with [minLength](/api/javascript/ui/combobox#configuration-minLength).


<div class="meta-api-description">
How do I prevent Kendo UI Combobox from showing all options when the input is empty? Control whether the searchable dropdown restricts showing all options when the input is empty by enforcing a minimum input length before suggestions appear, preventing automatic display of the full item list when the search box is cleared, enabling configuration to require users to type a certain number of characters before results are shown, setting thresholds for search activation, disabling default behavior that reveals all items on blank input, and managing when the dropdown populates results based on input length constraints.
</div>

#### Example - enforce minLength

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
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
How do I customize the appearance of my ComboBox's dropdown input and list selections? Adjust the color application style for dropdown inputs and list selections by configuring fill options such as solid, flat, outline, or none to customize the visual appearance of combo box elements, enabling control over background fill, border styling, and overall component highlighting during user interaction, selection display, or list item rendering.
</div>

#### Example - sets the fillMode

    <input id="combobox"/>
    <script>
      $("#combobox").kendoComboBox({
        dataSource: [
          { id: 1, name: "Apples" },
          { id: 2, name: "Oranges" }
        ],
        dataTextField: "name",
        dataValueField: "id",
        fillMode: "flat"
      });
    </script>

### filter `String`*(default: "none")*

The filtering method used to determine the suggestions for the current value. Filtration is turned off by default, and can be performed over `string` values only (either the widget's data has to be an array of strings, or over the field, configured in the [`dataTextField`](/api/javascript/ui/combobox#configuration-dataTextField) option).
The supported filter values are `startswith`, `endswith` and `contains`.


<div class="meta-api-description">
How to configure the ComboBox to filter suggestions that start with, end with, or contain the typed text? Control and customize how suggestion filtering works for dropdown or autocomplete input fields by enabling string matching with options to set the filter behavior to match entries that start with, end with, or contain the typed text, allowing flexible search algorithms and configurability for data sources that offer string arrays or specific text fields, with filtering disabled by default and focused on refining results dynamically as users type to improve user experience in selection components supporting prefix, suffix, or substring matching models.
</div>

#### Example - set the filter

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      filter: "contains"
    });
    </script>

### fixedGroupTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the fixed header group. By default the widget displays only the value of the current group.


<div class="meta-api-description">
How to customize the appearance of fixed group headers in a Kendo UI ComboBox? Customize and control the appearance of a fixed header or group label within dropdown menus or combo boxes by defining custom templates that can include group names, item counts, icons, or other HTML content. Enable rendering of fixed header sections in selection lists with personalized layouts, alter default displays showing only current group values, and configure how grouped data headings are presented in dropdown interfaces to enhance usability, clarity, and branding. Adjust the fixed group header rendering during setup to tailor the visual grouping experience, including complex templating scenarios for better UI presentation and developer control over group headings inside combo box or select components.
</div>

#### Example

    <input id="customers" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#customers").kendoComboBox({
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                fixedGroupTemplate: "Fixed group: #:data#",
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
How do I customize the footer in a Kendo UI for jQuery ComboBox? Customize and control the footer section display in dropdown or select input components by defining a dynamic template or render function that adjusts the content shown at the bottom area; enable flexible footer customization by accessing internal component data such as selected value and data source to create personalized messages, status indicators, summaries, or controls within the footer region, allowing developers to set, configure, and optimize how the footer appears based on real-time component state and available options.
</div>

#### Parameters

##### instance `Object`

The widget instance.

#### Example - specify footerTemplate as a string

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      footerTemplate: 'Total <strong>#: instance.dataSource.total() #</strong> items found'
    });
    </script>


### inputMode `String`*(default: "text")*

Specifies the [`inputmode` attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) of the inner `<input />` element. It is used to specify the type of on-screen keyboard that should be displayed when the user focuses the input.


<div class="meta-api-description">
How do I configure the on-screen keyboard layout for a Kendo UI ComboBox? Set or configure the type of on-screen keyboard or virtual keyboard layout that appears when users focus the input field inside a combo box, enabling control over keyboard modes such as numeric keypad, decimal numbers, telephone keypad, email entry, URL input, search keyboard, or standard text input to optimize user input experience and improve form usability. Adjusting input mode or input type cues touchscreen and mobile devices to display specialized keyboards that match expected data formats, allowing developers to enforce input constraints, facilitate faster typing, and enhance user interaction by specifying the desired input pattern or keyboard behavior within combo box inputs.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        inputMode: "numeric",
        dataSource: ["1", "2", "3", "4", "5"]
    });
    </script>

### label `String|Function|Object` *(default: null)*

Adds a label before the input. If the input has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
How do I set the accessible label for a Kendo UI ComboBox input field? Set or customize the accessible label text displayed before the ComboBox input field using a string or dynamic function to define label content, enabling control over the descriptive label for screen readers and user interfaces; automatically manages input identification by generating or associating element IDs to link labels with inputs, supporting accessibility, form labeling, input labeling customization, and ARIA compliant label assignment for dropdown or autocomplete controls.
</div>

#### Example - create a label from a string

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
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

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
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
How can I customize the label content of a Kendo UI ComboBox dropdown? Set or customize the label content of a dropdown or selection box using HTML markup to include text, icons, inline elements, or styled components, enabling rich, formatted labels for selection controls; configure, modify, or control how labels are rendered with embedded HTML during initialization to create custom, enhanced, or visually distinct dropdown labels.
</div>

#### Example - create a label from a string

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
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

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
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

> **Important:** The [value](/api/javascript/ui/combobox/methods/value) method **does not trigger** the `focusout` event of the input.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#combobox").data("kendoComboBox").label.floatingLabel.refresh();`


<div class="meta-api-description">
How to enable floating label in Kendo UI ComboBox? Control whether the input label floats above the field when a value is entered or collapses when empty by enabling or disabling floating label behavior, allowing configuration of dynamic label placement that moves or shrinks based on user input or programmatic changes; manage floating labels that automatically shift position on focus or value changes, support visual cues for selected versus empty states, and handle manual refresh triggers to maintain synchronization with input changes after programmatic value setting, enabling consistent label animation and state updates for combo box or dropdown components with interactive floating or inline labels.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
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
How do I customize the appearance of grouped headers in a Kendo UI ComboBox? Control and customize the appearance of grouped headers in dropdown selections by defining custom templates that render group titles and structure when data is organized into groups or categories, enabling tailored display of grouped options, styling group headers, formatting group labels, and applying custom HTML or UI elements to distinguish grouped items within dropdown lists, select menus, or combobox controls that support data grouping and hierarchical organization.
</div>

#### Example

    <input id="customers" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#customers").kendoComboBox({
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
                groupTemplate: "Group: #:data#",
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
How do I set the height of the dropdown list in Kendo UI ComboBox? Adjust or set the vertical size of the dropdown suggestion list to control how many options are visible at once, allowing customization of the popup height in pixels to limit visible items and enable scrolling when there are more suggestions than fit in the designated space; configure, modify, or constrain the popup container’s height to optimize user interface space and improve usability for large or dynamic suggestion sets.
</div>

#### Example - set the height

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      height: 500
    });
    </script>

### highlightFirst `Boolean`*(default: true)*

If set to `true` the first suggestion will be automatically highlighted.


<div class="meta-api-description">
How do I make the first item in my Kendo UI ComboBox dropdown list automatically focused or highlighted? Control whether the first item in a dropdown or autocomplete list is automatically focused or emphasized when suggestions appear, enhancing keyboard navigation, typeahead selection, and quick item picking by pre-selecting the top option. This setting affects how initial suggestion highlighting, automatic focus, and default selection behave, useful for improving accessibility, streamlining user input, and speeding up interaction with combo boxes, select lists, or autocomplete fields by enabling or disabling instant focus on the first available choice.
</div>

#### Example - set highlightFirst

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      highlightFirst: false
    });
    </script>

### ignoreCase `Boolean`*(default: true)*

If set to `false` case-sensitive search will be performed to find suggestions. The widget performs case-insensitive searching by default.


<div class="meta-api-description">
How do I configure case sensitivity for Kendo UI ComboBox suggestions? Configure text matching sensitivity for dropdown suggestions and search functionality by enabling or disabling case sensitivity, allowing control over whether letter casing affects autocomplete filtering, lookup behavior, and search results within selection lists, dropdown menus, or input combos. Adjust this setting to toggle between case-insensitive matching that ignores uppercase and lowercase differences or case-sensitive matching that distinguishes exact letter case during filtering, suggestion generation, and user input evaluation in search and selection components.
</div>

#### Example - disable case-insensitive suggestions

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      ignoreCase: false
    });
    </script>

### index `Number`*(default: -1)*

The index of the initially selected item. The index is `0` based.


<div class="meta-api-description">
How do I programmatically select an item in Kendo UI ComboBox control by its index? Configure or set the starting selected position of a dropdown or combobox control by specifying a zero-based numeric index, such as selecting the first or nth item to appear initially highlighted or chosen when the interface loads or resets, enabling default selections, pre-selection of items, programmatic control over which option is active on initialization, or controlling user interface state by index rather than value or text, useful for automating form defaults, presets, or dynamically setting the chosen entry in lists and selection controls.
</div>

#### Example - select second item

    <input id="combobox" />
    <script>
    var items = [{ text: "Item 1", value: "1" }, { text: "Item 2", value: "2" }];
    $("#combobox").kendoComboBox({
        dataTextField: "text",
        dataValueField: "value",
        dataSource: items,
        index: 1
    });
    </script>

### messages `Object`

The text messages displayed in the widget. Use this option to customize or localize the messages.


<div class="meta-api-description">
How do I customize the messages displayed in a Kendo UI ComboBox dropdown selector? Customize, localize, or configure text labels, prompts, placeholders, and messages displayed in dropdown selectors, combo inputs, or select controls by setting or overriding default strings for user interface elements, enabling multilingual support, adjusting feedback or hint texts, and tailoring displayed content within combo boxes or similar input widgets to match specific language, terminology, or user experience requirements.
</div>

#### Example - customize ComboBox messages

    <input id="combobox" />
    <script>
      var items = [{ text: "Item 1", value: "1" }, { text: "Item 2", value: "2" }];
      $("#combobox").kendoComboBox({
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
How do I customize the tooltip text for the clear button in a Kendo UI ComboBox? Configure the tooltip text or hover message displayed on the clear or reset button within a dropdown input, customize the localized prompt or hint shown when users hover over the ComboBox’s clear control, set or change the descriptive label for the clear action tooltip, enable support for different languages by adjusting the text displayed on the clear button’s mouseover tooltip, control accessibility and user guidance by defining the hover message text for clearing input selections in dropdown fields.
</div>

#### Example - customize clear message

    <input id="combobox" />
    <script>
      var items = [{ text: "Item 1", value: "1" }, { text: "Item 2", value: "2" }];
      $("#combobox").kendoComboBox({
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
How to customize the message when a ComboBox is empty? Customize or translate the message displayed when a dropdown or selection list is empty, including localizing or setting placeholder text for no available options, handling situations with no items to show, configuring empty state prompts in dropdown menus or combo boxes, modifying default no-data messages for better user feedback when lists are empty, controlling the text users see when there are no results or entries in selectable lists.
</div>

#### Example - customize noData message

    <input id="combobox" />
    <script>
      $("#combobox").kendoComboBox({
        dataSource: [],
        messages: {
          noData: "There is no data!"
        }
      });
    </script>

### minLength `Number`*(default: 1)*

The minimum number of characters the user must type before a search is performed. Set to higher value than `1` if the search could match a lot of items.

> Widget will initiate a request when input value is cleared. If you would like to prevent this behavior please check the [filtering](/api/javascript/ui/combobox/events/filtering) event for more details.


<div class="meta-api-description">
How do I set a minimum character count for filtering in Kendo UI ComboBox? Set the minimum number of characters required to trigger filtering or search operations in a dropdown input, control when autocomplete or suggestions start appearing, configure how many letters must be typed before results show to optimize performance and reduce unnecessary queries, adjust threshold to limit search matches for large datasets, enforce a typing length limit before lookup begins, manage input debounce behavior based on character count, avoid premature or excessive data fetching by specifying a minimum input length, and customize search initiation timing to improve user experience and efficiency in filtering matching entries.
</div>

#### Example - set minLength

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      minLength: 3
    });
    </script>

### noDataTemplate `String|Function|Boolean` *(default: true)*

The [template](/api/javascript/kendo/methods/template) used to render the "no data" template, which will be displayed if no results are found or the underlying data source is empty.
The noData template receives the widget itself as a part of the data argument. The template will be evaluated on every widget data bound.

> **Important** The popup will open when 'noDataTemplate' is defined


<div class="meta-api-description">
How to customize the message shown when a Kendo UI ComboBox has no available items or results? Customize the display content or message that appears when a dropdown list or selection box has no available items or results, enabling control over what users see if the data source is empty, no matches are found, or filtering returns zero entries. This feature supports defining custom templates or placeholders for empty states, allowing developers to set how to handle and present situations with no data, including showing informative messages, alternative UI elements, or fallback content when a combo box, select input, or similar control has no results to display. It also includes behavior where the dropdown panel or popup opens automatically when this empty-state template is applied, ensuring empty results are visually communicated. This is useful for scenarios involving search filters, dynamic data loading, zero-match conditions, or handling empty data sets in user interface components designed for selection from lists.
</div>

#### Example - specify noDataTemplate as a string

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [],
      dataTextField: "name",
      dataValueField: "id",
      noDataTemplate: 'No Data!'
    });
    </script>

### placeholder `String`*(default: "")*

The hint displayed by the widget when it is empty. Not set by default.


<div class="meta-api-description">
How do I set the placeholder text in a Kendo UI ComboBox? Set or customize the temporary hint text or prompt displayed inside a dropdown input field when no option is selected, enabling guidance and instruction for users before any input is made, often called placeholder, prompt, watermark, or ghost text; control the subtle instructional message that appears grayed out or faintly inside the input area to improve usability, clarifying expected input or suggesting possible choices in combo boxes or select inputs, typically shown when the field is empty or unfocused.
</div>

#### Example - specify placeholder option

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      placeholder: "Select..."
    });
    </script>

#### Example - specify placeholder as HTML attribute

    <input id="combobox" placeholder="Select..." />

    <script>
    $("#combobox").kendoComboBox({
        dataSource: ["Item1", "Item2"]
    });
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.


<div class="meta-api-description">
How to customize the popup menu behavior of Kendo UI ComboBox? Configure the dropdown or popup menu behavior of a selection component, including how to set popup positioning, alignment, attachment points like appendTo, animation effects, size dimensions, collision handling, and display options for improved visual control; customize popup appearance, placement, interaction patterns, and container elements to control how options appear and adapt within various layouts or scrolling contexts, enabling flexible dropdown menus, overlays, or modal popups with full control over appearance and placement parameters.
</div>

#### Example - append the popup to a specific element

    <div id="container">
        <input id="combobox" />
    </div>
    <script>
    $("#combobox").kendoComboBox({
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
How to specify the container for the ComboBox popup element using the appendTo property? Set or configure the target container for rendering or appending the dropdown, overlay, or popup element to control positioning, visibility, and overflow behavior within the document structure. This can be a CSS selector, jQuery element, or DOM node to specify where the popup or overlay attaches, enabling management of stacking context, z-index, scroll boundaries, and dynamic placement inside containers such as body, specific divs, modals, or custom wrappers during initialization or runtime. Adjust placement to fix clipping, positioning issues, or overflow constraints in dropdowns, combo boxes, or similar UI components.
</div>

#### Example - append the popup to a specific element

    <div id="container">
        <input id="combobox" />
    </div>
    <script>
    $("#combobox").kendoComboBox({
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
How do I customize the position of a ComboBox popup in Kendo UI for jQuery? Control or customize the alignment and positioning of a dropdown, tooltip, or popup relative to its anchor or trigger point by specifying vertical and horizontal origin settings; configure vertical alignment options such as top, center, or bottom and horizontal alignment options like left, center, or right to precisely set where the popup appears in relation to the associated element; adjust or set the popup’s anchor point origin using space-separated vertical and horizontal values to manage overlay placement for dropdown menus, popups, or floating elements.
</div>

#### Example - append the popup to a specific element

    <div id="container">
        <input id="combobox" />
    </div>
    <script>
    $("#combobox").kendoComboBox({
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
How do I set the position of the popup in a Kendo UI ComboBox? Control and configure where a dropdown or popup menu attaches relative to its trigger element, specifying vertical and horizontal alignment points such as top, bottom, center, left, right, or combinations like bottom left or top right to set popup positioning, anchoring menus precisely to anchors, adjusting overlay placement, aligning dropdowns, popups, or menus in user interfaces, and managing popup anchor origins to customize the attachment point for responsive, adaptive, or fixed positioning in UI components.
</div>

#### Example - append the popup to a specific element

    <div id="container">
        <input id="combobox" />
    </div>
    <script>
    $("#combobox").kendoComboBox({
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

### prefixOptions `Object`

The configuration for the prefix adornment of the component.


<div class="meta-api-description">
How to customize the input field in Kendo UI ComboBox with a prefix element that includes icons and templates? Customize the input field with a configurable prefix element that can include text, icons, templates, or custom content to appear before user input. Enable setting or controlling prefix adornments in dropdown inputs to enhance UI consistency, accessibility with ARIA attributes, and styling through CSS classes. Manage prefix templates and attributes for ComboBox inputs to display helpful indicators, labels, or symbols at the start of the input area, supporting initialization configurations and dynamic appearance adjustments. Tailor the prefix section to fit branding or functional needs, ensuring it integrates seamlessly with the component design and user interaction patterns.
</div>

#### Example - specify prefix adornment template

    <input id="prefix" />
    <script>
      $("#prefix").kendoComboBox({
        label: "Combobox",
        dataSource: [1, 2],
        prefixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      });
    </script>

### prefixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content.


<div class="meta-api-description">
How do I add an icon to the beginning of a Kendo UI ComboBox input field? Add or customize a leading icon inside an input field as a prefix symbol, configuring a visual indicator or decorative element before the user’s text entry. Set or enable a small icon at the start of a dropdown or input control, specifying either a predefined theme symbol name or custom SVG graphics to enhance UI clarity or branding presence. Control the appearance of a prefix icon in combo boxes or input selectors, enabling icon replacement, decoration, or signal integration before typed values, supporting flexible icon injection for enhanced user interface design and interaction cues.
</div>

#### Example - specify prefix adornment icon

    <input id="prefix" />
    <script>
      $("#prefix").kendoComboBox({
        label: "Combobox",
        dataSource: [1, 2],
        prefixOptions: {
          icon: "search"
        }
      })
    </script>

### prefixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the prefix adornment of the component.


<div class="meta-api-description">
How do I customize the prefix in a Kendo UI ComboBox using a template? Configure custom HTML templates or dynamic interpolated content to appear before the input field, enabling the display of icons, labels, or any formatted prefix inside the combobox input area using template syntax. Control and customize the prefix adornment by defining how content such as images, text, or interactive elements render as a leading visual or informational cue within the input box. Enable flexible prefix customization for combobox inputs, allowing developers to set, embed, or inject templated content ahead of user input for enriched UI elements, prefix decorations, or branding inside the component.
</div>

#### Example - specify prefix adornment template

    <input id="prefix" />
    <script>
      $("#prefix").kendoComboBox({
        label: "Combobox",
        dataSource: [1, 2],
        prefixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      })
    </script>

### prefixOptions.separator `Boolean` *(default: true)*

If set to `false`, the prefix adornment will not have a separator.


<div class="meta-api-description">
How to remove the dividing line between prefix element and input area in Kendo UI ComboBox? Configure the input field to show or hide a dividing line between an added prefix element and the main input area, enabling control over whether a visual separator or divider appears to distinguish prefix content from user input. Adjust the setting to remove or display the line that separates the prefix adornment from the text box, supporting more compact layouts or clearer separation as needed. This setting affects how the prefix decoration is visually separated, allowing developers to enable, disable, toggle, or customize the presence of a boundary or line before the input area for cleaner design or tighter spacing in combo box fields with prefixes.
</div>

#### Example - specify prefix adornment separator

    <input id="prefix" />
    <script>
      $("#prefix").kendoComboBox({
        label: "Combobox",
        dataSource: [1, 2],
        prefixOptions: {
          template: () => `${kendo.ui.icon("search")}`,
          separator: false
        }
      })
    </script>

### readonly `Boolean`*(default: "false")*

If set to `true`, the widget will be readonly and will not allow user input. The widget is not readonly be default and allow user input.


<div class="meta-api-description">
How do I make Kendo UI ComboBox input field read-only? Control whether the input field is locked to prevent user edits, making the selection box display-only and disabling text entry or modifications while still showing the selected option. Enable or set the component to read-only mode to restrict manual typing, configure it to allow only selection from predefined items without allowing custom input, and use this feature when you want to enforce fixed, uneditable values in dropdowns or selection controls. Adjust this setting during component setup to create non-editable combo boxes that accept no user text input but display chosen values clearly.
</div>

#### Example - make the widget readonly

    <input id="combobox" />
    <script>
        $("#combobox").kendoComboBox({
          readonly: true,
          dataSource: [
            { id: 1, name: "Apples" },
            { id: 2, name: "Oranges" }
          ],
          dataTextField: "name",
          dataValueField: "id",
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
How do I customize the corner roundness of a Kendo UI ComboBox dropdown menu? Control and customize the curvature of dropdown menus by adjusting corner roundness, border radius, or CSS radius settings to achieve sharp, slightly rounded, moderately curved, heavily rounded, or fully pill-shaped edges, enabling developers to set or configure the radius using exact values or predefined options like none, small, medium, large, and full for shaping dropdown lists, select menus, or combo box components with varied corner styles and appearance.
</div>

#### Example - sets the rounded value

    <input id="combobox"/>
    <script>
      $("#combobox").kendoComboBox({
        dataSource: [
          { id: 1, name: "Apples" },
          { id: 2, name: "Oranges" }
        ],
        dataTextField: "name",
        dataValueField: "id",
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
How can I adjust the size of the input field in a Kendo UI ComboBox? Control and customize the visual dimensions and layout of dropdown input fields by configuring sizing options to render smaller, medium, larger, or standard input elements, affecting overall spacing, font scaling, and input height for compact, regular, or expanded user interface designs. This enables setting or adjusting the input component’s size appearance for different screen real estate needs, accessibility preferences, or design consistency by toggling between size categories like small, medium, large, or disabling sizing adjustments entirely.
</div>

#### Example - sets a size

    <input id="combobox"/>
    <script>
      $("#combobox").kendoComboBox({
        dataSource: [
          { id: 1, name: "Apples" },
          { id: 2, name: "Oranges" }
        ],
        dataTextField: "name",
        dataValueField: "id",
        size: "large"
      });
    </script>

### suffixOptions `Object`

The configuration for the suffix adornment of the component.


<div class="meta-api-description">
How to customize the suffix element in a Kendo UI ComboBox? Set or control a trailing suffix element after input text in a dropdown or ComboBox, including customizing content, templates, styling classes, accessibility tags, click events, visibility toggles, interaction behavior, and appearance options to enhance user interface and user experience with flexible suffix adornments and event handling.
</div>

#### Example - specify suffix adornment template

    <input id="suffix" />
    <script>
      $("#suffix").kendoComboBox({
        label: "Combobox",
        dataSource: [1, 2],
        suffixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      });
    </script>

### suffixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content.


<div class="meta-api-description">
How do I set an icon at the end of a Kendo UI for jQuery ComboBox dropdown input field? Configure, customize, or set a visual suffix icon, symbol, or inline SVG graphic at the end of a dropdown input field or ComboBox control to enhance UI clarity. Enable showing, changing, or replacing the trailing icon using theme-based icons or custom SVG elements for better visual cues, user guidance, or branding. Control which icon appears after the input text by defining icon names from prebuilt theme libraries or injecting direct SVG content to tailor the suffix display, improve dropdown recognition, or signal status or action hints. Adjust the icon appearance dynamically or on initialization to match design requirements, accessibility needs, or user interaction states within selection components.
</div>

#### Example - specify suffix adornment icon

    <input id="autocomplete" />
    <script>
      $("#suffix").kendoComboBox({
        label: "Combobox",
        dataSource: [1, 2],
        suffixOptions: {
          icon: "search"
        }
      })
    </script>

### suffixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the suffix adornment of the component.


<div class="meta-api-description">
How to customize the suffix template in Kendo UI ComboBox? Configure or customize the rendering of a dropdown input’s suffix element, allowing control over the suffix adornment with custom templates, icons, HTML, or dynamic content. Enable setting or defining a suffix template for combo boxes that supports template strings or functions to bind data, render conditional UI components, or display custom visuals within the suffix area. Users can control how suffix decorations appear by providing custom render logic, including dynamic updates, icon integration, or HTML markup, to tailor the suffix presentation in dropdown or combo box inputs.
</div>

#### Example - specify suffix adornment template

    <input id="suffix" />
    <script>
      $("#suffix").kendoComboBox({
        label: "Combobox",
        dataSource: [1, 2],
        suffixOptions: {
          template: () => `${kendo.ui.icon("search")}`
        }
      })
    </script>

### suffixOptions.separator `Boolean` *(default: true)*

If set to `false`, the suffix adornment will not have a separator.


<div class="meta-api-description">
How to hide the separator line in Kendo UI ComboBox dropdown? Control the visibility of a dividing line or separator preceding the suffix element in a dropdown or combobox input, enabling developers to toggle on or off the visual split between the main input content and appended suffix icons, text, or adornments. Adjust settings to show or hide the separator line that appears before the suffix area in user interface input controls, affecting the clarity, spacing, and separation of appended suffix elements in combo boxes or similar select inputs. Enable or disable the visual divider between the input field and its suffix accessories to customize input component styling, user interface clarity, or accessibility presentation without affecting the suffix content itself.
</div>

#### Example - specify suffix adornment separator

    <input id="suffix" />
    <script>
      $("#suffix").kendoComboBox({
        label: "Combobox",
        dataSource: [1, 2],
        suffixOptions: {
          template: () => `${kendo.ui.icon("search")}`,
          separator: false
        }
      })
    </script>

### suggest `Boolean`*(default: false)*

If set to `true` the widget will automatically use the first suggestion as its value.


<div class="meta-api-description">
How do I enable auto-acceptance of top autocomplete result in Kendo UI ComboBox while typing? Configure automatic selection or auto-acceptance of the top autocomplete result while typing, enabling typeahead or predictive input behavior that commits the first matching option instantly; control whether the input auto-fills with the initial suggestion, supporting scenarios requiring immediate selection of the best match, facilitating seamless auto-complete, predictive text, or instant suggestion acceptance during user input.
</div>

#### Example - enable automatic suggestion

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      suggest: true
    });
    </script>

### syncValueAndText `Boolean`*(default: true)*

When set to `true` the widget will automatically set selected value to the typed custom text. Set the option to `false` to
clear the selected value but keep the custom text.


<div class="meta-api-description">
How does Kendo UI's ComboBox syncValueAndText property handle user-typed input when selecting options? Control the synchronization between the text input and the selected value in a dropdown field where users can type or pick options, enabling automatic matching of the selection to custom typed entries or keeping typed text while clearing selection. Configure whether the component updates its chosen value as users enter custom strings or retains typed input independently from selections, allowing for dynamic input handling, custom value retention, or clearing selections based on user editing. Adjust this setting to enable seamless integration of typed input with chosen selections, manage when to preserve user-typed text without binding it to a selected choice, and handle scenarios involving both automatic matching and independent text entry in combo box or autocomplete inputs.
</div>

#### Example - disable automatic sync between value and text

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      syncValueAndText: true
    });
    </script>

### headerTemplate `String|Function`

Specifies a static HTML content, which will be rendered as a header of the popup element.

> **Important** The header content **should be wrapped** with a HTML tag if it contains more than one element. This is applicable also when header content is just a string/text.

> **Important** Widget does not pass a model data to the header template. Use this option only with static HTML.


<div class="meta-api-description">
How to customize the header content in a Kendo UI ComboBox dropdown popup? Configure and customize the dropdown popup header content with static HTML markup, including plain text, custom titles, promotional banners, or complex header layouts wrapped in a single HTML tag, enabling control over the ComboBox popup’s header appearance without dynamic data binding, supporting static header templates, fixed header sections, custom HTML structures above the list, and header text or markup customization for enhanced user interface presentation.
</div>

#### Example - specify headerTemplate as a string

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
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
How to customize dropdown list items in Kendo UI ComboBox? Configure and customize dropdown list items with flexible templates that enable custom rendering of each entry by embedding HTML, binding multiple data fields, formatting values, or combining text and other content dynamically. Control how items appear in selectable lists by setting up personalized layouts, interactive markup, or rich visual representations beyond default single-field text display, perfect for tailoring list presentations, applying complex data bindings, or enhancing user interface item appearance in dropdown controls.
</div>

#### Example - specify template as a function

    <input id="combobox" />
    <script id="template" type="text/x-kendo-template">
      <span>
        <img src="https://demos.telerik.com/kendo-ui/content/web/treeview/folder.png" alt="#: name #" style="vertical-align: middle;"/>#: name #
      </span>
    </script>
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      template: kendo.template($("#template").html())
    });
    </script>

#### Example - specify template as a string

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      template: '<span><img src="https://demos.telerik.com/kendo-ui/content/web/treeview/folder.png" alt="#: name #" style="vertical-align: middle;"/>#: name #</span>'
    });
    </script>

### text `String`*(default: "")*

The text of the widget used when the `autoBind` is set to `false`.


<div class="meta-api-description">
How to set default text in Kendo UI ComboBox before data loads? Control the default or placeholder text shown in a dropdown or selection box before any data loads or binds, enabling you to configure initial display values, set custom labels, or show prompts when data fetching is delayed or deferred, manage what users see before options populate, and customize the visible text in cases where automatic data binding is disabled or postponed at startup.
</div>

#### Example - specify text of the widget

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
         autoBind: false,
         text: "Chai"
    });
    </script>

### value `String`*(default: "")*

The value of the widget.


<div class="meta-api-description">
How do I access the selected value in Kendo UI Combobox? Retrieve or assign the current selection or text input in a dropdown list or combo box, allowing you to programmatically get the chosen item, update the selection, bind form data to user input, persist user choices across sessions, or capture typed entries. Control and access the active value displayed in the control, whether selecting from predefined options or handling user-typed input, enabling dynamic form interactions, data synchronization, or automated updates to the selected content.
</div>

#### Example - specify value of the widget

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
         dataSource: ["Item1", "Item2"],
         value: "Item1"
    });
    </script>

### valuePrimitive `Boolean`*(default: false)*

Specifies the [value binding](/framework/mvvm/bindings/value) behavior for the widget when the initial model value is null. If set to true, the View-Model field will be updated with the selected item value field. If set to false, the View-Model field will be updated with the selected item.


<div class="meta-api-description">
How does Kendo UI's ComboBox handle binding to a data model when selecting an item? Set or configure whether the selected item in a dropdown control updates the data model with its primitive value or the full object, enabling precise control over binding behavior when the initial value is null, accommodating scenarios where you want the model to store a simple scalar like an ID or string instead of the whole item, allowing developers to choose between writing compact primitive data or complex objects back to the application state, and managing how selection changes propagate to the bound View-Model for seamless integration and data consistency across user interfaces.
</div>

#### Example - specify that the View-Model field should be updated with the selected item value

    <input id="combobox" data-bind="value: selectedProductId, source: products" />

    <script>
    $("#combobox").kendoComboBox({
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

    kendo.bind($("#combobox"), viewModel);
    </script>

### virtual `Boolean|Object`*(default: false)*

Enables the virtualization feature of the widget. The configuration can be set on an object, which contains two properties - `itemHeight` and `valueMapper`.

For detailed information, refer to the [article on virtualization]({% slug virtualization_kendoui_combobox_widget %}).


<div class="meta-api-description">
How do I enable virtual scrolling in Kendo UI ComboBox to handle large datasets? Enable or configure virtual scrolling and virtualization for drop-down lists or combo boxes to efficiently handle large or remote datasets by controlling item height, mapping values to data indexes, supporting asynchronous data resolution, improving rendering performance, managing large collections without loading all items at once, setting up virtualization options during initialization, optimizing for remote or lazy-loaded data sources, and customizing how values correspond to displayed list entries for better scalability and smooth scrolling experience in selection components.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        virtual: true,
        height: 320,
        dataSource: {
            type: "odata-v4",
            pageSize: 10,
            transport: {
                read: "https://demos.telerik.com/service/v2/odata/Orders"
            },
            serverPaging: true,
            serverFiltering: true,
        },
        dataTextField: "ShipName",
        dataValueField: "OrderID"
    });
    </script>

### virtual.itemHeight `Number`*(default: null)*

Specifies the height of the virtual item. All items in the virtualized list **must** have the same height.
If the developer does not specify one, the framework will automatically set `itemHeight` based on the current theme and font size.


<div class="meta-api-description">
How do I set a fixed height for items in a virtualized ComboBox list? Set or configure the fixed height for each item in a virtualized scrolling list to optimize rendering and ensure smooth performance when displaying large datasets in dropdowns, lists, or ComboBox components; essential for controlling item sizing consistently across all list entries to prevent layout issues or scrolling glitches, especially when items must share uniform height for accurate virtualization calculations, with options to specify, adjust, or override automatic height detection based on theme or font metrics during component setup or runtime configuration.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        virtual: {
            itemHeight: 30
        },
        height: 320,
        dataSource: {
            type: "odata-v4",
            pageSize: 10,
            transport: {
                read: "https://demos.telerik.com/service/v2/odata/Orders"
            },
            serverPaging: true,
            serverFiltering: true,
        },
        dataTextField: "ShipName",
        dataValueField: "OrderID"
    });
    </script>

### virtual.mapValueTo `String`*(default: "index")*

The changes introduced with the Kendo UI R3 2016 release enable you to determine if the `valueMapper` must resolve a *value to an `index`* or a *value to a `dataItem`*. This is configured through the `mapValueTo` option that accepts two possible values - `"index"` or `"dataItem"`. By default, the `mapValueTo` is set to `"index"`, which does not affect the current behavior of the virtualization process.

For more information, refer to the [article on virtualization]({% slug virtualization_kendoui_combobox_widget %}#value-mapping).


<div class="meta-api-description">
How to map selected values in Kendo UI ComboBox with virtualization? Control the mapping of selected values in a combo box with virtualization by configuring whether the value mapping resolves to an item’s index position or the actual data object, enabling precise behavior for virtualized selection handling, customizing how values correspond to data items or their indexes during scrolling or filtering, adjusting value resolution methods for performance optimization and user interaction, supporting scenarios where you need to map selections to either underlying data entries or their array indices, influence virtualization logic for correct display and selection syncing, and set mapping modes to align with application data structures and virtual rendering requirements.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        virtual: {
            itemHeight: 26,
            mapValueTo: "dataItem",
            valueMapper: function(options) {
                // Implementation for dataItem mapping
                options.success(options.value);
            }
        },
        height: 320,
        dataSource: {
            type: "odata-v4",
            pageSize: 10,
            transport: {
                read: "https://demos.telerik.com/service/v2/odata/Orders"
            },
            serverPaging: true,
            serverFiltering: true,
        },
        dataTextField: "ShipName",
        dataValueField: "OrderID"
    });
    </script>

### virtual.valueMapper `Function`*(default: null)*

The widget calls the `valueMapper` function when the widget receives a value, that is not fetched from the remote server yet.
The widget will pass the selected value(s) in the `valueMapper` function. In turn, the valueMapper implementation should return the **respective data item(s) index/indices**.

> **Important**
>
> As of the Kendo UI R3 2016 release, the implementation of the `valueMapper` function is optional. It is required only if the widget contains an initial value or if the `value` method is used.


<div class="meta-api-description">
How to map preselected values in Kendo UI ComboBox with remote data? Handle and translate incoming or preselected values that are not yet loaded or fetched from remote data sources by mapping them to corresponding item indices, enabling selection and display in virtualized or large dataset ComboBoxes; configure custom functions to map external or initial values, resolve unmatched entries, link values with data item indexes for proper rendering, support asynchronous data loading scenarios, maintain accurate value-to-index binding for virtualization, and integrate seamless dynamic value resolution when initializing or updating selections in dropdowns with remote or virtualized data sets.
</div>

#### Example - ComboBox widget with a virtualized list

    <input id="orders" style="width: 400px" />
    <script>
        $(document).ready(function() {
            $("#orders").kendoComboBox({
                template: '<span class="order-id">#= OrderID #</span> #= ShipName #, #= ShipCountry #',
                dataTextField: "ShipName",
                dataValueField: "OrderID",
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

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

#### Example - ComboBox widget with declarative virtualization config

    <div class="demo-section k-header">
        <h4>Search for shipping name</h4>
        <input id="orders" style="width: 400px"
               data-role="combobox"
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

            value = $.isArray(value) ? value : [value];

            for (var idx = 0; idx < value.length; idx++) {
                data["values[" + idx + "]"] = value[idx];
            }

            return data;
        }
    </script>

## Fields

### dataSource `kendo.data.DataSource`

The [data source](/api/javascript/data/datasource) of the widget. Configured via the [dataSource](/api/javascript/ui/combobox/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> **Important:** Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/combobox/methods/setdatasource) method instead.


<div class="meta-api-description">
How do I access the data source in Kendo UI ComboBox? Retrieve, access, or inspect the underlying data collection bound to a dropdown or combo box component to read, query, filter, or observe changes in the list of options; control or monitor the source dataset linked to the selection component and understand how updates or modifications to the existing data affect the displayed items, while noting that replacing the entire dataset requires a specific method to update and refresh the component’s entries rather than direct reassignment of the data structure.
</div>

#### Example - add a data item to the data source
    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [
        { name: "Apples" },
        { name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "name"
    });
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.dataSource.add({ name: "Appricot" });
    combobox.search("A");
    </script>

### input `jQuery`
A jQuery object of the visible input element, where the user types.


<div class="meta-api-description">
How do I access and manipulate the input field of a Kendo UI ComboBox element? Access or control the visible text input area inside a combo box element, enabling reading or setting the typed value, binding event listeners like keydown, input, or focus, manipulating cursor selection, applying CSS styles or attributes, and performing direct DOM operations on the user-editable field that captures input. This visible input element reference supports programmatic interaction, custom event handling, and dynamic value updates within combo boxes, allowing developers to efficiently monitor, modify, or enhance user text entry behaviors such as autocomplete, validation, or styling in frontend interfaces.
</div>

#### Example - get input element

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox();

    var combobox = $("#combobox").data("kendoComboBox");

    var input = combobox.input;
    </script>

### options `Object`
An object, which holds the options of the widget.


<div class="meta-api-description">
How do I dynamically update the options of a Kendo UI ComboBox widget? Access and modify the runtime configuration settings of a dropdown component that supports dynamic option lists, including controlling data sources, updating values, placeholders, event handlers, templates, and other UI or behavior settings programmatically without requiring component reload or reinitialization; this facilitates adjusting dropdown choices, binding or rebinding data arrays, customizing appearance and interaction templates, changing default selections, and managing event listeners on the fly within the running instance.
</div>

#### Example - get options of the widget

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox();

    var combobox = $("#combobox").data("kendoComboBox");

    var options = combobox.options;
    </script>

### list `jQuery`
A jQuery object of the drop-down list element.


<div class="meta-api-description">
How do I manipulate the dropdown list in Kendo UI ComboBox? Access, control, and manipulate the dropdown list element of a combo box using a jQuery-based reference to the underlying DOM structure, enabling developers to attach event listeners, modify or query list items, update classes and styles dynamically, measure dimensions for layout adjustments, and perform direct DOM interactions such as adding, removing, or altering elements within the dropdown menu after the component is initialized.
</div>

#### Example - get list element

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox();

    var combobox = $("#combobox").data("kendoComboBox");

    var list = combobox.list;
    </script>

### ul `jQuery`
A jQuery object of the `ul` element, which holds the available options.


<div class="meta-api-description">
How to access the underlying dropdown list in Kendo UI combobox? Access and control the underlying unordered list element that contains all selectable options in a dropdown or combobox interface, enabling dynamic manipulation such as adding or removing list items, attaching or detaching event listeners, measuring or changing its position and dimensions, applying custom CSS classes or inline styles, and performing direct DOM operations or queries to customize behavior, appearance, or interaction with the options list in user interface components.
</div>

#### Example - get ul element

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox();

    var combobox = $("#combobox").data("kendoComboBox");

    var ul = combobox.ul;
    </script>

## Methods

### close

Closes the widget popup.


<div class="meta-api-description">
How can I programmatically close the dropdown list of a Kendo UI ComboBox? Trigger hiding or dismissing the dropdown menu or suggestion list of a combobox programmatically, control popup visibility by closing the combobox list after making a selection, keyboard navigation, or external actions, enable developers to set or enforce closing the combobox suggestions dynamically through code, programmatically collapse or retract the suggestion dropdown to manage user interface states or interactions, control the closing behavior of the combobox suggestion panel via method calls after initialization to enhance UI responsiveness and interaction flow.
</div>

#### Example - close the suggestion popup

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });
    var combobox = $("#combobox").data("kendoComboBox");
    // Search for items starting with "A" - will open the suggestion popup and show "Apples"
    combobox.search("A");
    // Close the suggestion popup
    combobox.close();
    </script>

### dataItem

Returns the data item at the specified index. If the index is not specified, the selected index will be used.


<div class="meta-api-description">
How do I access the underlying data object associated with a specific item in Kendo UI ComboBox widget? Retrieve the data object or model record linked to a specific item or the current selection within a dropdown or combo box widget by providing the item’s position index or by using the current selection automatically; extract underlying data entries from the bound data source, access specific records by zero-based index, read fields tied to the displayed entries, synchronize UI selection with external state or application logic, inspect or manipulate the original data model behind visible list items, get the data item tied to a selection, data binding, or item position for integration, updating, or advanced data handling in dropdown menus, list selectors, or combo box controls.
</div>

#### Parameters

##### index `Number` *(optional)*

The zero-based index of the data record.

#### Returns

`Object` The raw data record. Returns *undefined* if no data.

#### Example

    <input id="combobox" />
    <script>

    $("#combobox").kendoComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    var combobox = $("#combobox").data("kendoComboBox");

    // get the dataItem corresponding to the selectedIndex. Result can be seen in the browser console.
    var dataItem = combobox.dataItem();
    console.log(dataItem.name);

    // get the dataItem corresponding to the passed index. Result can be seen in the browser console.
    dataItem = combobox.dataItem(0);
    console.log(dataItem.name);
    </script>

### destroy

Prepares the **ComboBox** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the ComboBox element from DOM.


<div class="meta-api-description">
How do I properly dispose of a Kendo UI ComboBox widget to prevent memory leaks? Release or clean up a dropdown or combobox widget by disabling event listeners, clearing data attributes, and breaking internal references to prevent memory leaks, including recursively destroying any nested or child Kendo UI components initialized within it, without removing the element from the document object model or altering the visible UI structure, enabling safe disposal and resource management of interactive selection controls in dynamic web applications.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox();
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How do I programmatically enable or disable user interaction with a Kendo UI ComboBox? Activate or deactivate user interaction with a dropdown input to allow or block selection and typing, set the component to accept or ignore keyboard and mouse input, toggle its editable or read-only state, control focus availability in forms, enable dynamic enabling or disabling based on validation rules or application conditions, programmatically switch between active and inactive states to manage user input acceptance, modify the widget’s responsiveness to clicks and key presses, adjust interactive behavior for conditional UI flows, and control whether users can change the selected value or if the input is locked for display only.
</div>

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      enable: false
    });
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.enable(true);
    </script>

### focus

Focuses the widget.


<div class="meta-api-description">
How do I focus on the dropdown input of a Kendo UI ComboBox? Set or control keyboard focus on the dropdown input to enable typing, keyboard navigation, or programmatic interaction; move input caret to the combo box field to initiate user input, trigger accessible focus handling for screen readers, manage focus state after component load, or shift focus from other elements to this field for seamless navigation and immediate editing within forms or interactive UI elements.
</div>

#### Example - focus the widget

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox();
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.focus();
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource/methods/view).


<div class="meta-api-description">
How to access individual DOM nodes of items in Kendo UI ComboBox dropdown? Retrieve or access the list of visual item elements shown in a dropdown or combo box interface, obtaining an array of individual DOM nodes corresponding to the current filtered or displayed data entries, enabling you to inspect, control, manipulate, or bind event listeners to specific item elements, correlate UI elements with data indexes from the underlying data source or data view, and programmatically handle or customize the presentation and behavior of each selectable option within the widget.
</div>

#### Returns

`Array` The currently rendered dropdown list items (`<li>` elements).

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
        dataSource: ["Item1", "Item2", "Item3"]
    });
    
    var combobox = $("#combobox").data("kendoComboBox");
    var items = combobox.items();
    
    /* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(items); // [li, li, li...]
    </script>

### open

Opens the popup.


<div class="meta-api-description">
How can I programmatically show the dropdown list of a Kendo UI combobox? Programmatically show or reveal the dropdown list or popup menu of selectable items for a combobox or select input by triggering the open or expand action, enabling developers to control the visibility of option lists, force the dropdown to appear, simulate user clicks to display choices, programmatically toggle the selection panel, initiate filtering or search combined with opening, or manage dropdown states such as open, close, or toggle through code without user interaction.
</div>

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    var combobox = $("#combobox").data("kendoComboBox");
    combobox.open();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.


<div class="meta-api-description">
How to lock selected value in Kendo UI ComboBox but still allow form submission? Control the ability to make the ComboBox input editable or locked to prevent changes while still allowing the selected value to be included in form submissions, set the input as read-only to block user typing and modifications without disabling the field entirely, toggle between editable and non-editable states where the field remains active and submits data but does not accept direct user edits, configure the ComboBox to allow selection locking, enable or disable typing in the input while preserving current selections, manage form input behavior to include values from non-editable dropdowns, switch the input between read-only mode for preventing changes but maintaining data integrity versus completely disabling the control which excludes values from forms.
</div>

#### Parameters

##### readonly `Boolean`

If set to `true` the widget will not allow user input. If set to `false` the widget will allow user input.

#### Example - make the widget readonly

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox();
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.readonly(true);
    </script>

### refresh

Refresh the popup by rendering all items again.


<div class="meta-api-description">
How do I update the Kendo UI ComboBox dropdown list after modifying its data source? Update or reload the dropdown list to immediately reflect changes in the data source or item templates, ensuring the items displayed match the current data and formatting. Refresh or re-render the popup list dynamically after modifying data or custom content, forcing the list to rebuild and display the latest items, useful when data updates, template changes, or programmatic adjustments alter the visible options in the dropdown. Control and trigger the list items to redraw or reload on demand to synchronize UI with underlying data changes or template modifications.
</div>

#### Example - refresh the popup items

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    var combobox = $("#combobox").data("kendoComboBox");

    combobox.refresh();
    </script>

### search

Searches the data source for the provided value and displays any matches as suggestions.


<div class="meta-api-description">
How do I use the `ComboBox.search` method to filter dropdown items as users type? Programmatic search functionality to query the ComboBox data source for matching values, enabling autocomplete suggestions, dynamic filtering of dropdown items, real-time lookup by terms, keyword matching within bound datasets, interactive search triggers, and filtered list population based on user input or external commands. This supports use cases like incremental search, selective display of options based on partial entries, automated retrieval of relevant items, and on-demand combobox filtering via code or user actions.
</div>

#### Parameters

##### word `String`

The filter value.

#### Example - search the widget

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    var combobox = $("#combobox").data("kendoComboBox");

    combobox.search("App");
    </script>

### select

Gets or sets the selected item. Selects the item provided as an argument and updates the value and text of the widget.

> **Important:** If the widget is not bound (e.g. `autoBind` is set to `false`), the `select` method will **not** pre-fetch the data before continuing with the selection and value setting (unlike the [value](/api/javascript/ui/combobox/methods/value) method), and no item will be selected.

> **Important:** When **virtualization** is enabled, the method **does not support** selection with a *function predicate*. The predicate function looks only
in the current datasource view, which represents only the active range/page. Hence it will not work properly.

> **Important:** This method **does not trigger** [change](/api/javascript/ui/combobox/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });

    var combobox = $("#combobox").data("kendoComboBox");
    combobox.select(0);
    combobox.trigger("change");
    </script>


<div class="meta-api-description">
How can I programmatically set the selected item in a Kendo UI ComboBox control? Choose, set, or get the current selection in a dropdown list or combo box control, enabling developers to programmatically assign or retrieve the selected item, update the displayed text and underlying value, and control the selection state without triggering change events. This selection method works without pre-fetching data when autoloading is off, supports direct item selection by value or index but does not inherently trigger model or UI change notifications, requiring manual event dispatch for reactive bindings. When virtualization or paging limits data scope, selection by predicate functions applies only to the currently loaded subset, so filtering or function-based selection may be constrained. Common tasks include updating UI selections, synchronizing model data to UI, setting initial dropdown values, handling selection programmatically, and managing selection in both synchronous and virtualized data scenarios.
</div>

#### Parameters

##### li `jQuery | Number | Function`

A string, DOM element or jQuery object which represents the item to be selected. A string is treated as a jQuery selector.
A number representing the index of the item or function predicate which returns the correct data item.

#### Returns

`Number` The index of the selected item, if called with no parameters. If a custom value is entered, the returned selected index is `-1`.

`undefined` If called with a parameter as a setter.

#### Example - select item based on jQuery object

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id"
    });

    var combobox = $("#combobox").data("kendoComboBox");

    combobox.select(combobox.ul.children().eq(0));
    </script>

#### Example - select item based on index

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id"
    });

    var combobox = $("#combobox").data("kendoComboBox");

    combobox.select(1);
    </script>

#### Example - select item based on function predicate

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id"
    });

    var combobox = $("#combobox").data("kendoComboBox");

    combobox.select(function(dataItem) {
        return dataItem.name === "Apples";
    });
    </script>

#### Example - get selected index of the widget

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      index: 1
    });

    var combobox = $("#combobox").data("kendoComboBox");

    var selectedIndex = combobox.select();
    </script>

### setDataSource

Sets the dataSource of an existing ComboBox and rebinds it.


<div class="meta-api-description">
How to dynamically update the items in a Kendo UI ComboBox at runtime? Replace or update the list of selectable items dynamically in a dropdown or combo box control by configuring or setting a new data collection, array, remote dataset, or existing data source instance at runtime, triggering the component to refresh its displayed options, reload items, reset filtering or search states, and update current selections automatically to reflect the latest underlying data without requiring component reconstruction or manual refresh.
</div>

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });
    var dataSource = new kendo.data.DataSource({
      data: [ "Bananas", "Cherries" ]
    });
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.setDataSource(dataSource);
    </script>

### suggest

Sets the value of the widget to the specified argument and visually selects the text.


<div class="meta-api-description">
How do I automatically fill in input values for my Kendo UI ComboBox dropdown? Automatically fill, update, or replace the input value programmatically in a dropdown or autocomplete field while highlighting or selecting the suggested text for quick user confirmation or modification; enable type-ahead hints, pre-populate entries, control text selection and cursor placement, simulate user input suggestions, and manage visual feedback for suggested completions in combo boxes or similar input components.
</div>

#### Parameters

##### value `String`

Characters to force a suggestion.

#### Example

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.suggest("Apples");
    </script>

### text

Gets or sets the text of the ComboBox. Widget will select the item with same text. If
there are no matches then the text will be considered as a custom value of the widget.

> **Important:** When the `autoBind` option is set to *false*, the widget will update only the selected text. The widget will stay **unbound**.

> **Important:** This method **does not trigger** [change](/api/javascript/ui/combobox/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });

    var combobox = $("#combobox").data("kendoComboBox");
    combobox.text("Apples");
    combobox.trigger("change");
    </script>


<div class="meta-api-description">
How to dynamically set the displayed text in a Kendo UI ComboBox? Configure or retrieve the input text of a dropdown or combo box control to select an item by its visible label or enter a custom value when no matching entries exist; setting the text updates the selection if an exact match is found, otherwise it treats the input as a new, unlisted value. Access the current displayed text for reading user input or programmatically changing it without automatically triggering change events, which may require manually firing event handlers to synchronize data models or bindings. Manage user input, dynamic selection, custom entries, and maintain consistency between UI and underlying data, especially when auto-binding is disabled or MVVM frameworks require explicit event notifications. This enables fine-grained control over displayed text, programmatic selection by text, custom input handling, and manual update flows for combo box or autocomplete widgets.
</div>

#### Parameters

##### text `String`

The text to set.

#### Returns

`String` The text of the ComboBox.

#### Example - set text of the widget

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });

    var combobox = $("#combobox").data("kendoComboBox");

    combobox.text("Apples");
    </script>

### toggle

Opens or closes the widget popup.


<div class="meta-api-description">
How do I programmatically toggle the dropdown menu visibility of a Kendo UI ComboBox? Control the dropdown menu visibility by programmatically opening or closing the ComboBox popup with a method that toggles the current state, enabling seamless switching between showing and hiding the list or dropdown interface. This functionality supports dynamic UI updates for expanding or collapsing the option list, useful for developers needing to enable, disable, or flip the dropdown display on user interaction or custom triggers, ensuring immediate visibility changes without manual user input. Whether you want to programmatically show the options, hide the selection list, or alternate the popup’s open state, this toggle approach provides an efficient way to manage the ComboBox popup visibility through code.
</div>

#### Parameters

##### toggle `Boolean` *(optional)*

Defines the whether to open/close the drop-down list.

#### Example - set text of the widget

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });

    var combobox = $("#combobox").data("kendoComboBox");

    combobox.toggle();
    </script>

### value

Gets or sets the value of the ComboBox.

> **Important:** If the widget is not bound, value method will pre-fetch the data before continue with the value setting.

> **Important:** The widget will **clear the applied filter** if a new value is set. Thus it ensures that the original/whole data set is available for selection.

> **Important:** This method **does not trigger** [change](/api/javascript/ui/combobox/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior trigerring the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });

    var combobox = $("#combobox").data("kendoComboBox");
    combobox.value("Apples");
    combobox.trigger("change");
    </script>


<div class="meta-api-description">
How to programmatically set the value of a Kendo UI ComboBox? Retrieve or assign the current selection or input of a dropdown list programmatically, including reading or setting the chosen value directly within a combo box or similar widget. This method supports automatic data loading if the underlying list is not yet populated, ensuring the full dataset is available when updating the selection and clearing any active filters to reset the visible options. Note that changing this value programmatically does not automatically fire change or update events affecting model bindings or reactive frameworks, so manual event triggering may be required to synchronize state or invoke change handlers. Control the displayed value, enable pre-fetching of data on demand, reset filters during value assignment, and manage interaction with MVVM or event-driven binding mechanisms for dynamic UI components.
</div>

#### Parameters

##### value `String`

The value to set.

#### Returns

`String` The value of the ComboBox.

#### Example - set value of the widget

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });

    var combobox = $("#combobox").data("kendoComboBox");

    combobox.value("Oranges");
    </script>

## Events

### change

Fired when the value of the widget is changed by the user. As of 2015 Q3 SP1 cascading widget will trigger change event when its value is changed due to parent update.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.
> **Important:** The event is not fired when the value of the widget is changed programmatically. If you need to handle changes made by API, wire the [cascade](/api/javascript/ui/combobox/events/cascade) event.


<div class="meta-api-description">
How do I detect when the user changes the selected option in a Kendo UI ComboBox? Detect and respond to user-driven modifications in dropdown or autocomplete inputs, capturing changes triggered by typing, selecting with mouse or keyboard, or navigating options; track updates from dependent or cascading dropdowns that alter values based on parent selections; distinguish between user interaction changes and programmatic value settings, ensuring handlers execute only on user-initiated edits while separate events manage API or code-driven updates; enable event listeners to monitor, handle, or react dynamically whenever the displayed or selected option changes due to interaction within combo box components or cascading lists.
</div>

#### Event Data

##### e.sender `kendo.ui.ComboBox`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ],
      change: function(e) {
        var value = this.value();
        // Use the value of the widget
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <input id="combobox" />
    <script>
    function combobox_change(e) {
      var value = this.value();
      // Use the value of the widget
    }
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.bind("change", combobox_change);
    </script>

### close

Fired when the popup of the widget is closed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to trigger an action when Kendo UI ComboBox dropdown closes? Trigger actions or execute code when the dropdown menu or popup closes, enabling detection of when a selection box collapses or hides, so you can update interface elements, restore keyboard or mouse focus, perform cleanup tasks, handle UI state changes after closing, respond to dismissal or cancellation of dropdown lists, manage focus restoration after closing popups, or run functions upon hiding of selection menus. This event fires upon closing combo boxes or select dropdowns, allowing reaction to user interactions that dismiss the options list or conclude selection processes within interactive dropdown components.
</div>

#### Event Data

##### e.sender `kendo.ui.ComboBox`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ],
      close: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <input id="combobox" />
    <script>
    function combobox_close(e) {
      // handle the event
    }
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.bind("close", combobox_close);
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
What triggers when ComboBox data is loaded? Trigger actions or execute custom code once the dropdown or autocomplete options finish loading and binding from the data source, enabling you to control UI updates, refresh item lists, set default or dynamic selections, customize displayed entries, or adjust component state immediately after data retrieval. This event fires right after data is loaded into the selection list, allowing developers to run post-load logic, synchronize UI elements, or manipulate items programmatically with access to the dropdown instance context for invoking methods and altering properties at runtime. Ideal for scenarios where you need to respond to data population, refresh displays, or implement dynamic behaviors after item fetching or data binding completes in combo box or autocomplete controls.
</div>

#### Event Data

##### e.sender `kendo.ui.ComboBox`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ],
      dataBound: function(e) {
          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <input id="combobox" />
    <script>
    function combobox_dataBound(e) {
      // handle the event
    }
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.bind("dataBound", combobox_dataBound);
    </script>

### filtering

Fired when the widget is about to filter the data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to customize search input for Kendo UI ComboBox dropdown control? Enable dynamic interception and customization of search or filter input for drop-down or selection controls before querying data, allowing inspection and modification of the typed or programmatically set filter value, implementation of custom matching logic, input validation, and adjustment of filter behavior triggered by user keystrokes, API calls, or external events. This event-driven filtering control supports real-time filter processing, personalized search algorithms, conditional data fetching, and fine-tuning of filtering operations in interactive combo boxes or searchable lists, providing hooks for overriding default search patterns, controlling debounce timing, or adapting to complex filter criteria based on user input or application state.
</div>

#### Event Data

##### e.sender `kendo.ui.ComboBox`

The widget instance which fired the event.

##### e.filter `Object`

The filter descriptor that will be used to filter the data source.

> The data source filters the data items client-side unless the [data source serverFiltering](/api/javascript/data/datasource/configuration/serverfiltering) option is set to `true`.

#### Example - subscribe to the "filtering" event during initialization

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
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

    <input id="combobox" />
    <script>
    function combobox_filtering(e) {
      //get filter descriptor
      var filter = e.filter;

      // handle the event
    }
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ],
      filter: "startswith"
    });
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.bind("filtering", combobox_filtering);
    </script>

#### Example - prevent filtering event when filter value is empty

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ],
      filter: "startswith",
      filtering: function(e) {
          var filter = e.filter;

          if (filter && !filter.value) {
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
How to detect when the Kendo UI ComboBox dropdown list is shown? Detect triggering of dropdown visibility when the selection list expands or collapses, capturing user interactions like clicks or keyboard actions that open the popup menu. Monitor when the dropdown becomes active to update interface elements, synchronize application state, enable custom logic execution on popup display, or respond to control focus changes. Capture events signaling the opening of the list for dynamic data loading, conditional rendering, or user-driven activation, with access to the control instance for invoking methods or querying current properties to align UI behavior with user engagement.
</div>

#### Event Data

##### e.sender `kendo.ui.ComboBox`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ],
      open: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <input id="combobox" />
    <script>
    function combobox_open(e) {
      // handle the event
    }
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.bind("open", combobox_open);
    </script>

### select

Fired when an item from the popup is selected by the user either with mouse/tap or with keyboard navigation.

> **Important:** The event is not fired when an item is selected programmatically.


<div class="meta-api-description">
How to detect when a user selects an item in a Kendo UI ComboBox? Trigger custom code or respond dynamically when an end user picks or highlights an option from a dropdown menu or combo list using mouse clicks, taps, arrow keys, or pressing Enter, enabling detection of user-driven selection changes. Capture selection events to control UI updates, execute callbacks, handle chosen values, and manage user interaction with list items in real time. This event enables listening for manual item selection from popup lists but excludes programmatic or code-driven changes, focusing on direct user input for dropdown or combobox choices, supporting interactive selection handling and responsive interface behavior.
</div>

#### Event Data

##### e.dataItem `Object`

The data item instance of the selected item.

##### e.item `jQuery`

The jQuery object which represents the selected item.

##### e.preventDefault `Function`

If invoked prevents the select action. The widget will retain the previous selected item.

##### e.sender `kendo.ui.ComboBox`

The widget instance which fired the event.

#### Example - subscribe to the "select" event during initialization

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ],
      select: function(e) {
        var item = e.item;
        var text = item.text();
        // Use the selected item or its text
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <input id="combobox" />
    <script>
    function combobox_select(e) {
      var item = e.item;
      var text = item.text();
      // Use the selected item or its text
    }
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.bind("select", combobox_select);
    </script>

#### Example - prevent the item selection

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
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
How to handle changes in Kendo UI ComboBox selection programmatically? Detect and respond to any changes in a dropdown or combo box selection, including user input through typing, mouse clicks, keyboard navigation, or programmatic updates via API calls; capture events triggered by modifying the selected value to synchronize data models, update related fields, perform validations, or execute side effects in the user interface immediately after the selection changes or is set, enabling reactive handling of both manual and automated value modifications in form controls.
</div>

#### Event Data

##### e.sender `kendo.ui.ComboBox`

The widget instance which fired the event.

#### Example - subscribe to the "cascade" event during initialization

    <input id="combobox" />
    <script>
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ],
      cascade: function() {
        // Handle the event
      }
    });
    </script>

#### Example - subscribe to the "cascade" event after initialization

    <input id="combobox" />
    <script>
    function combobox_cascade(e) {
        // Handle the event
    }
    $("#combobox").kendoComboBox({
      dataSource: [ "Apples", "Oranges" ]
    });
    var combobox = $("#combobox").data("kendoComboBox");
    combobox.bind("cascade", combobox_cascade);
    </script>
