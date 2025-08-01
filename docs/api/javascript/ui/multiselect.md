---
title: MultiSelect
page_title: Configuration, methods and events of Kendo UI MultiSelect
res_type: api
component: multi-select
---

# kendo.ui.MultiSelect

Represents the Kendo UI MultiSelect widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### adaptiveMode `String`*(default: "none")*

Specifies the adaptive rendering of the component. The supported values are: `none` *(default)*, `auto`.


<div class="meta-api-description">
How do I enable adaptive rendering for a multi-select component in Kendo UI? Configure and control dynamic user interface adjustments for multi-selection components in responsive or space-constrained environments, enabling automatic adaptation or fixed rendering to optimize user experience on various screen sizes, devices, or container widths. Manage how selection lists or dropdowns resize, reflow, or transform to handle limited horizontal space, ensuring usability in mobile views, narrow panels, or embedded contexts. Enable or disable automatic UI behavior that adapts selection controls’ appearance and layout based on screen resolution, viewport constraints, or container resizing, providing flexible options for rendering multi-select inputs in adaptive, compact, or fixed modes. Adjust settings to govern responsiveness, layout shifts, or scaling of multi-selection controls in dynamic, flexible, or constrained layouts to maintain clarity and accessibility across different device form factors and window sizes.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option value="1">Item 1</option>
        <option value="2">Item 2</option>
        <option value="3">Item 3</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        adaptiveMode: "auto"
    });
    </script>

### adaptiveTitle `String`

Allows customization of the title's text in the adaptive view of the component.


<div class="meta-api-description">
How to customize the title in adaptive mode for a Kendo UI MultiSelect? Configure or customize the title text shown when a multi-select input switches to a responsive or mobile-friendly layout, enabling dynamic or context-sensitive labels for compact views, adaptive interfaces, or smaller screens. This setting lets you control, set, or override the displayed title in adaptive modes to enhance usability, clarity, and user experience on mobile devices or narrow viewports, supporting responsive design and flexible UI labeling for selection components.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option value="1">Item 1</option>
        <option value="2">Item 2</option>
        <option value="3">Item 3</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        adaptiveMode: "auto",
        adaptiveTitle: "Select Items"
    });
    </script>

### adaptiveSubtitle `String`

Allows customization of the subtitle's text in the adaptive view of the component.


<div class="meta-api-description">
How do I customize the subtitle in an adaptive layout for a Kendo UI MultiSelect component? Configure and customize the subtitle text that appears in responsive, adaptive, or compact layouts for multi-selection components, enabling dynamic control over the display of secondary information when the interface shifts to smaller or adaptive views. Set or adjust the subtitle shown in condensed or adaptive modes to improve user clarity, responsiveness, and UI flexibility across different screen sizes or layouts, allowing customization of the secondary label or text element visible during adaptive rendering or collapsed states in multi-select controls.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option value="1">Item 1</option>
        <option value="2">Item 2</option>
        <option value="3">Item 3</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        adaptiveMode: "auto",
        adaptiveTitle: "Select Items",
        adaptiveSubtitle: "Choose multiple options"
    });
    </script>

### animation `Boolean|Object`

Configures the opening and closing animations of the suggestion popup. Setting the `animation` option to `false` will disable the opening and closing animations. As a result the suggestion popup will open and close instantly.

`animation:true` is not a valid configuration.


<div class="meta-api-description">
How to enable animations for dropdown suggestions in Kendo UI MultiSelect? Configure or disable the transition effects for dropdown suggestion popups, controlling the visual opening and closing animations for autocomplete or multi-selection inputs, enabling smooth UI fades or slides or opting for instant, animation-free popup display and dismissal, toggling between animated transitions or snappy, immediate popup visibility without delays, managing user interface responsiveness and interaction feedback for suggestion lists in selection controls.
</div>

#### Example - disable open and close animations

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      animation: false
    });
    </script>

#### Example - configure the animation

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
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

The animation configuration for closing the suggestion popup. This object can contain properties such as `effects` and `duration` that define how the popup will close when it becomes hidden. The close animation is played when the user selects an item, clicks outside the widget, or when the popup is programmatically closed.


<div class="meta-api-description">
How do I customize the closing animation of a Kendo UI MultiSelect dropdown? Control and customize the closing animation of dropdown or suggestion popups by configuring effects, duration, and transition styles that determine how the interface hides or collapses when a selection is made, focus is lost, or the popup is dismissed via code. Enable smooth, fade, slide, or other animation types to enhance user experience during popup close events triggered by user actions or programmatic commands. Adjust timing, easing, and visual effects to fine-tune how multi-select menus or autocomplete suggestion lists vanish, ensuring consistent and appealing UI feedback for closing interactions.
</div>

#### Example - configure the close animation

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
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
How do I configure the close animation effects in Kendo UI MultiSelect? Configure or customize the closing transition effects for a multi-select dropdown or component by specifying one or multiple animation names to control how the interface closes or hides, enabling smooth or sequential closing visual effects, setting, changing, or adjusting the exit animations to enhance user experience during dismissal, controlling which fade, slide, zoom, or other closing effects run on component closure, defining custom or predefined close animation sequences for multi-select interactions, adjusting the way the element disappears or retracts when users finish selection or dismiss the dropdown, enabling fluid or combined animation effects to improve UI feedback on close events, and setting transition animations at initialization for tailored closing behavior.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      animation: {
       close: {
         effects: "fadeOut zoom:out"
       }
      }
    });
    </script>

### animation.close.duration `Number` *(default: 100)*

The duration of the close animation in milliseconds.


<div class="meta-api-description">
How can I adjust the animation duration for closing a Kendo UI MultiSelect dropdown? Adjust the time interval for closing animations to customize the speed, responsiveness, and smoothness of dropdown or selection components, allowing developers to set animation length in milliseconds, optimize user interface transitions, control how fast or slow close effects execute, and fine-tune the timing for enhanced UX during element closing or dismissal actions.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
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
How can I customize the animation effect when opening the suggestion dropdown in a Kendo UI MultiSelect? Control and customize the opening animation effect, transition style, and timing for suggestion dropdowns or popup menus in multi-select inputs, including settings to enable smooth entrance animations, tune animation duration, choose easing functions, and configure how suggestion lists appear when activated or toggled, allowing developers to set and refine popup display behaviors, visual effects on open, and dynamic entrance sequences for enhanced user interaction and presentation of selectable options.
</div>

#### Example - configure the open animation

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
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
How can I customize the opening animation effects for my Kendo UI MultiSelect dropdown? Configure the opening animations for dropdowns or popup elements by setting one or multiple visual effects like fade, slide, zoom, or combinations thereof to enhance user interface transitions when menus or selection lists appear, enabling control over entry animations, popup shows, or multi-effect opening sequences for better visual feedback and dynamic presentation during multi-select or similar interactive components.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      animation: {
       open: {
         effects: "fadeIn zoom:in"
       }
      }
    });
    </script>

### animation.open.duration `Number` *(default: 200)*

The duration of the open animation in milliseconds.


<div class="meta-api-description">
How can I adjust the opening animation duration for Kendo UI Multiselect dropdown? Adjust the length or speed of the dropdown or popup opening animation, set the duration in milliseconds to control how quickly the multi-selection list or popup appears, customize the transition time for opening effects, manage animation timing for smoother or faster dropdown reveals, tune perceived performance by speeding up or slowing down the open animation, configure how long the visual opening effect lasts, enable precise control over the duration of the popup’s reveal animation, modify or set the animation length to optimize UI responsiveness and user experience when the selection list expands or becomes visible.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      animation: {
       open: {
         duration: 600
       }
      }
    });
    </script>

### autoBind `Boolean`*(default: true)*

Controls whether to bind the widget to the data source on initialization.


<div class="meta-api-description">
How does Kendo UI's MultiSelect control auto-load its data when it initializes? Configure whether the multi-select component automatically loads and binds data from its source upon initialization or defers loading until user interaction, such as opening the dropdown or setting a value; control initial data fetching, reduce unnecessary remote requests on startup, enable lazy loading, manage when data is bound to optimize performance, and decide if data source binding happens immediately or is postponed for cases like filtering, searching, or dynamic data loading scenarios.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
        $("#multiselect").kendoMultiSelect({
          placeholder: "Select products...",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataBound: function(){
            //Alert will be displayed when the data is bound to the component
            alert('Data is bound')
          },
          autoBind: false,
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

### autoClose `Boolean`*(default: true)*

Controls whether to close the widget suggestion list on item selection.


<div class="meta-api-description">
How to control closing behavior of Kendo UI MultiSelect dropdown? Configure whether a dropdown or multi-select suggestion list closes automatically after choosing an option or remains open to allow multiple item selections, enabling control over selection behavior to either immediately dismiss the list upon picking an item or keep it visible for continuous adding of entries, useful for scenarios requiring quick selection of several values without reopening the list repeatedly, setting the auto-close behavior to true for single selection closure or false to keep suggestions open for bulk or multi-item picking, optimizing user interactions in selection components and form controls where managing the visibility of choice lists impacts usability and workflow efficiency.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        autoClose: false
    });
    </script>

### autoWidth `Boolean`

If set to `true`, the widget automatically adjusts the width of the popup element and does not wrap up the item label.

> Note: Virtualized list doesn't support the auto-width functionality.


<div class="meta-api-description">
How to make Kendo UI MultiSelect dropdown automatically adjust its width based on item labels? Control dynamic width adjustment for dropdowns to ensure item labels stay on a single line by enabling automatic resizing of the popup container, allowing the selection list to expand or contract based on content length; configure or toggle this feature for responsive width handling, auto-sizing the multi-select dropdown to fit label text without wrapping or truncation, while considering that virtualized lists may not support this automatic width behavior.
</div>

#### Example - enable autoWidth

    <select id="multiselect" style="width: 100px;"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      autoWidth: true,
      dataSource: {
        data: ["Short item", "An item with really, really long text"]
      }
    });
    </script>

### clearButton `Boolean` *(default: true)*

Unless this options is set to `false`, a button will appear when hovering the widget. Clicking that button will reset the widget's value and will trigger the change event.


<div class="meta-api-description">
How do I show/hide the clear button in a Kendo UI MultiSelect widget? Control the presence of a clear or reset button that appears when hovering over a multi-select input, allowing users to easily clear all selected options or reset the selection with a single click, which also triggers change or update events for reactive interfaces. Configure visibility to enable or disable this clear control for multi-selection widgets, improving user experience by providing an intuitive way to remove selected items, reset filters, or deselect choices in forms, dropdowns, or tag selectors. Adjust settings to show or hide this button dynamically, handle user interactions for clearing values, and integrate with event handlers that respond to selection changes.
</div>

#### Example - disable the clear button

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        clearButton: false
    });
    </script>

### dataSource `Object|Array|kendo.data.DataSource`

The data source of the widget which is used to display a list of values. Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing [kendo.data.DataSource](/api/javascript/data/datasource)
instance.

If the `dataSource` option is set to a JavaScript object or array the widget will initialize a new [kendo.data.DataSource](/api/javascript/data/datasource) instance using that value as data source configuration.

If the `dataSource` option is an existing [kendo.data.DataSource](/api/javascript/data/datasource) instance the widget will use that instance and will **not** initialize a new one.


<div class="meta-api-description">
How do I configure the data source for a Kendo UI MultiSelect component? Configure the component to load and manage selectable items from various origins including local JavaScript arrays, remote data endpoints, or pre-existing data source objects, enabling dynamic or static option lists; set, bind, or reuse data sources to control the values shown, whether initializing new data layers from raw arrays or JSON configurations, or integrating with existing data management instances for consistent state and performance.
</div>

#### Example - set dataSource as a JavaScript object

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: {
        data: ["One", "Two"]
      }
    });
    </script>

#### Example - set dataSource as a JavaScript array

    <select id="multiselect" multiple="multiple"></select>
    <script>
    var data = ["One", "Two"];
    $("#multiselect").kendoMultiSelect({
      dataSource: data
    });
    </script>

#### Example - set dataSource as an existing kendo.data.DataSource instance

    <select id="multiselect" multiple="multiple"></select>
    <script>
    var dataSource = new kendo.data.DataSource({
      transport: {
        read: {
          url: "https://demos.telerik.com/service/v2/core/products"
        }
      }
    });
    $("#multiselect").kendoMultiSelect({
      dataSource: dataSource,
      dataTextField: "ProductName",
      dataValueField: "ProductID"
    });
    </script>

### dataTextField `String`*(default: "")*

The field of the data item that provides the text content of the list items. The widget will filter the data source based on this field.

> **Important** When `dataTextField` is defined, the `dataValueField` option also should be set.


<div class="meta-api-description">
How do I configure the text field in a Kendo UI MultiSelect widget? Configure which data field provides the displayed label or visible text in a multi-selection dropdown or list, enabling searches, filtering, and typed input to match items based on that specific text property. This setting controls the text binding for each option shown in the list, allowing developers to specify and customize how user selections appear and how the component matches user input to data entries by setting the key field that represents the item label or name. It is essential to align this text field with the underlying value field for accurate data handling, search filtering, and user interface rendering in multi-select input controls.
</div>

#### Example - set the dataTextField

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
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

> **Important** When `dataValueField` is defined, the `dataTextField` option also should be set.


<div class="meta-api-description">
How do I specify the value field for selections in a Kendo UI MultiSelect control? Configure which field or key in your data items provides the actual value for selections, underlying data bindings, and form submissions in multi-select controls, enabling precise control over the identifier used when users pick options; this setting specifies the property name or attribute that represents the selected item's value, critical for syncing with data sources, managing selected IDs, and interpreting user choices programmatically.
</div>

#### Example - set the dataValueField

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataSource: [
            { Name: "Parent1", Id: 1 },
            { Name: "Parent2", Id: 2 }
        ],
        dataTextField: "Name",
        dataValueField: "Id"
    });
    </script>

### delay `Number`*(default: 200)*

Specifies the delay in milliseconds after which the MultiSelect will start filtering dataSource.


<div class="meta-api-description">
How can I configure the delay before filtering in Kendo UI MultiSelect? Control the interval or debounce time in milliseconds between user keystrokes and when filtering or searching begins to prevent immediate or rapid queries, allowing configuration of delay before triggering data source filtering, managing input wait time to avoid excessive or frequent remote requests, enabling adjustable pause or timeout after typing stops to optimize performance and reduce network load during multi-select filtering operations.
</div>

#### Example - set the delay

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        delay: 1000 // wait 1 second before filtering
    });
    </script>

### downArrow `Boolean`*(default: false)*

Configures MultiSelect to render a down arrow that opens and closes its popup.


<div class="meta-api-description">
How do I control the dropdown arrow in Kendo UI MultiSelect? Control the presence and behavior of a clickable dropdown arrow indicator that toggles the MultiSelect popup open and closed, enabling configuration of the visual affordance for expanding or collapsing the selection list, showing or hiding the down arrow icon as a user-friendly toggle element, managing how users interact with the dropdown trigger, and customizing the display of the toggle arrow to enhance usability and interface clarity in dropdown components.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        downArrow: true
    });
    </script>

### enable `Boolean`*(default: true)*

If set to `false` the widget will be disabled and will not allow user input. The widget is enabled by default and allows user input.


<div class="meta-api-description">
How to disable user input in Kendo UI MultiSelect? Control whether the multi-selection interface accepts user input, allowing you to enable or disable interaction with selection lists, dropdowns, or multi-choice controls. This setting manages if users can select, deselect, or modify options within multi-select components, supporting use cases where you need to lock input, make fields read-only, or temporarily prevent changes. Developers often seek to toggle interactivity, configure input availability, set disabled states for multi-choice selectors, or programmatically restrict user actions in selection UI elements. This property handles enabling, activating, or disabling user engagement and input acceptance for multi-option selection widgets.
</div>

#### Example - disable the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      enable: false
    });
    </script>

### enforceMinLength `Boolean` *(default: false)*

If set to `true` the widget will not show all items when the text of the search input cleared. By default the widget shows all items when the text of the search input is cleared. Works in conjunction with [minLength](/api/javascript/ui/multiselect#configuration-minLength).


<div class="meta-api-description">
What happens when I clear the search input in a multi-select filter with enforceMinLength set to true? Control whether clearing the search input in a multi-select filter retains the current filtered results or resets to displaying all available options, enabling configuration to prevent automatic reset and maintain the subset of items based on prior search criteria; useful for managing user experience when input is cleared to avoid losing the filtered list and allowing developers to enforce minimum input length behavior that keeps the existing filtered state instead of reverting to full lists.
</div>

#### Example - enforce minLength

    <select id="multiselect"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        placeholder: "Select products...",
        dataTextField: "ProductName",
        dataValueField: "ProductID",
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
        value: [
            { ProductName: "Chang", ProductID: 2 },
            { ProductName: "Uncle Bob's Organic Dried Pears", ProductID: 7 }
        ]
    });
    </script>

### fillMode `String`*(default: "solid")*

Sets a value controlling how the color is applied. Can also be set to the following string values:

- "none"
- "solid"
- "flat"
- "outline"


<div class="meta-api-description">
How to customize the appearance of selected items in Kendo UI MultiSelect? Configure how selected items and option chips display color by setting the visual fill style to solid, flat, outline, or none; adjust the fill appearance for highlighted selections, change chip backgrounds or borders, customize the look of chosen values, enable or disable color filling for multi-selection components, and control the styling of selected options in multi-select inputs for enhanced UI consistency and visual feedback.
</div>

#### Example - sets the fillMode

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      filter: "contains",
      fillMode: "flat"
    });
    </script>

### filter `String`*(default: "startswith")*

The filtering method used to determine the suggestions for the current value. Filtration is turned of by default, and can be performed over `string` values only (either the widget's data has to be an array of strings, or over the field, configured in the [`dataTextField`](/api/javascript/ui/multiselect#configuration-dataTextField) option).
The supported filter values are `startswith`, `endswith` and `contains`.


<div class="meta-api-description">
How do I configure Kendo UI MultiSelect to filter items as users type? Configure how dynamic search suggestions and item matching behave in a multi-select dropdown by enabling or disabling filtering methods such as starts with, ends with, or contains substring matching. Control whether the component filters data as the user types, targeting string values either from simple string lists or specific text fields within complex data objects. Enable flexible, case-insensitive searching, substring matching, prefix or suffix search patterns, and customize search behavior to improve auto-complete, item lookup, or selection filtering in dropdowns and list controls. Adjust data filtering logic to enhance user input matching experience by setting or toggling filtering strategies in multi-select interfaces.
</div>

#### Example - set the filter

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      filter: "contains"
    });
    </script>

### fixedGroupTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the fixed header group. By default the widget displays only the value of the current group.


<div class="meta-api-description">
How to customize group headers in Kendo UI MultiSelect dropdown? Customize and control how fixed header groups appear in multi-select dropdowns by defining custom templates or rendering logic that override default group header values, allowing developers to set, configure, or enable personalized group headers with HTML content, control fixed grouping visuals, tailor the display of grouped items, and create specific layouts or styles for fixed header presentations within multi-select components, enhancing user interface grouping behavior with flexible header customization options.
</div>

#### Example

    <select id="customers" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#customers").kendoMultiSelect({
                placeholder: "Select customers...",
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
              	fixedGroupTemplate: "Fixed header: #: data #",
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
How to customize the footer of Kendo UI Multiselect dropdown with a custom template? Customize the dropdown’s footer area by injecting personalized content, templates, or custom UI elements into the selection list, enabling developers to add dynamic summaries, action buttons, status messages, or informational panels within multi-select dropdowns. This feature supports setting custom footer renderings, defining layout and design details for footers, embedding components or data-bound elements at the bottom of dropdowns, and controlling footer display during initialization. It helps manage footer templates that access multi-select data and states for tailored user interfaces, supporting scenarios like showing selected item counts, bulk actions, or contextual hints in the dropdown footer area.
</div>

#### Parameters

##### instance `Object`

The widget instance.

#### Example - specify footerTemplate as a string

    <select id="customers" style="width: 400px;"></select>
    <script>
    $("#customers").kendoMultiSelect({
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
How to configure the input mode for a Kendo UI MultiSelect on mobile devices? Configure or set the on-screen keyboard type, virtual keyboard layout, input mode, or input method for text entry fields within a multi-select control on mobile or touch devices by specifying valid input mode values like text, numeric, decimal, telephone, email, URL, search, or none. Control and customize the keyboard behavior that appears when users type, enabling appropriate input patterns, keyboard variants, or device-specific keyboard layouts to optimize data entry experience. Adjust settings to enable or disable specialized mobile keyboards such as numeric pads, email keyboards, or search fields within multi-selection inputs for better usability and input accuracy on smartphones, tablets, or virtual keyboard environments.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option value="1">Item 1</option>
        <option value="2">Item 2</option>
        <option value="3">Item 3</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        inputMode: "email"
    });
    </script>


### label `String|Function|Object` *(default: null)*

Adds a label before the input. If the input has no `id` attribute, a generated `id` will be assigned. The `string` and the `function` parameters are setting the inner HTML of the label.


<div class="meta-api-description">
How do I set a custom label for my Kendo UI MultiSelect input field? Set or configure descriptive text displayed before a multi-select input field, enabling the use of plain strings or dynamic functions to define the label content, associate accessible labels with form elements by linking labels to input IDs automatically or manually, customize or control multi-select input labeling for clarity and usability, provide headings or explanatory text for selection fields, handle scenarios where input elements may lack explicit identifiers by generating or assigning IDs to ensure proper label referencing and accessibility compliance.
</div>

#### Example - create a label from a string

    <select id="customers"></select>
    <script>
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Customers"
            },
            group: { field: "Country" }
        },
      label: "Customers"
    });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <select id="customers"></select>
    <script>
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Customers"
            },
            group: { field: "Country" }
        },
      label: function() {
          return "Customers";
      }
    });
    </script>

### label.content `String|Function` *(default: "")*

Sets the inner HTML of the label.


<div class="meta-api-description">
How do I customize the label of a Kendo UI MultiSelect control to include icons or styled text? Customize the label of a multi-select control by specifying HTML content that can include icons, styled text, rich formatting, or custom markup for enhanced appearance and branding. Configure the inner HTML of the label element to embed visual elements or complex layouts, enabling control over label content presentation, icon inclusion, formatted labels, and tailored interfaces in dropdown or selection components. Adjust the label’s markup string during initialization to display images, symbols, or styled HTML within multi-select labels, supporting advanced UI customization, dynamic label rendering, and rich visual representation in selection inputs.
</div>

#### Example - create a label from a string

    <select id="customers"></select>
    <script>
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Customers"
            },
            group: { field: "Country" }
        },
        label: { content: "Customers" }
    });
    </script>

The function context (available through the keyword `this`) will be set to the widget instance.

#### Example - create a label from a function

    <select id="customers"></select>
    <script>
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Customers"
            },
            group: { field: "Country" }
        },
      label: {
        content: function() {
            return "Customers";
        }
      }
    });
    </script>

### label.floating `Boolean` *(default: false)*

If set to `true`, the widget will be wrapped in a container that will allow the floating label functionality.

> **Important:** The [value](/api/javascript/ui/multiselect/methods/value) method **does not trigger** the `focusout` event of the input.
This can affect the floating label functionality.
To overcome this behavior, manually invoke the `refresh` method of the Floating Label: `$("#multiselect").data("kendoMultiColumnComboBox").label.floatingLabel.refresh();`


<div class="meta-api-description">
How to enable floating label for multi-select input in Kendo UI jQuery? Configure floating label functionality for multi-select inputs by enabling or disabling dynamic label positioning that moves the label above the field on focus or value selection; control, set, or toggle floating label behavior during initialization to enhance user interface clarity, ensure label visibility when interacting with multi-select dropdowns, and manage container wrapping for proper display. Address issues with programmatic value changes not triggering focus events by refreshing or updating the floating label state manually to maintain synchronized label position. This covers setup for floating placeholder labels, floating captions, dynamic label animation, focus behavior with multi-select controls, and manual refresh methods to fix label alignment or visibility when values change programmatically.
</div>

#### Example

    <select id="customers"></select>
    <script>
    $("#customers").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Customers"
            },
            group: { field: "Country" }
        },
        label: {
            content: "Customers",
            floating: true
        }
    });
    </script>


### groupTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the groups. By default the widget displays only the value of the group.


<div class="meta-api-description">
How do I customize the display of group headers in a Kendo UI MultiSelect dropdown? Customize how group headers and grouped items appear in a multi-select dropdown by defining custom templates to control the display of grouped data, enabling tailored presentation of group labels, headers, and aggregated items. Adjust or override default group rendering behavior to show detailed content, formatted group headings, or specific layouts within grouped selections. Configure group display templates, set custom views for grouped elements, control styling and content arrangement for groups, and enable rich, dynamic rendering of grouped options in multi-select interfaces.
</div>

#### Example

    <select id="customers" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#customers").kendoMultiSelect({
                placeholder: "Select customers...",
                dataTextField: "ContactName",
                dataValueField: "CustomerID",
              	groupTemplate: "Group template: #: data #",
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
How can I adjust the height of a Kendo UI multiselect dropdown to show more options? Adjust the vertical size or visible area of a dropdown or suggestion list to control how many options or suggestions are displayed at once before requiring scroll, customize the popup or overlay height in pixels or units to show more or fewer items, set or configure the maximum visible suggestions in autocomplete, multiselect, or dropdown components, manage the scrollable area height for selection popups, influence the number of visible choices to optimize user experience by enlarging or shrinking the dropdown suggestion box.
</div>

#### Example - set the height

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      height: 500
    });
    </script>

### highlightFirst `Boolean`*(default: true)*

If set to `true` the first suggestion will be automatically highlighted.


<div class="meta-api-description">
How to auto-select the first option in Kendo UI MultiSelect dropdown? Control whether the initial option in a multi-select dropdown or suggestion list is automatically highlighted, preselected, or focused to enable faster navigation and selection using keyboard arrows, tab key, mouse hover, or click, supporting quick access to the top or default suggestion without manual user interaction, enhancing usability and accessibility by setting the first item as active by default or requiring user-driven selection for multi-choice inputs, autocomplete components, or filtering interfaces.
</div>

#### Example - set highlightFirst

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      highlightFirst: false
    });
    </script>

### ignoreCase `Boolean`*(default: true)*

If set to `false` case-sensitive search will be performed to find suggestions. The widget performs case-insensitive searching by default.


<div class="meta-api-description">
What is the effect of setting ignoreCase to true in a Kendo UI MultiSelect control? Control whether the input matching and suggestion filtering for multiple selection supports case-sensitive or case-insensitive searches, enabling configuration of text input comparison to respect or ignore letter casing during autocomplete, dropdown filtering, or item searching in multi-select controls, allowing developers to toggle between strict case matching and flexible case-insensitive lookup to customize user experience when typing or searching for options.
</div>

#### Example - disable case-insensitive suggestions

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      ignoreCase: false
    });
    </script>

### messages `Object`

The text messages displayed in the widget. Use this option to customize or localize the messages.


<div class="meta-api-description">
How do I customize the messages in a Kendo UI MultiSelect? Customize, configure, and localize displayed text, labels, prompts, and messages within a multi-selection interface to enable tailored user feedback, adapt to different languages or locales, set custom wording for selection instructions, placeholders, error notifications, and informational text, and control how all user-facing strings appear in multi-select dropdowns, pickers, or lists for enhanced user experience and internationalization support.
</div>

#### Example - customize MultiSelect messages

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
      $("#multiselect").kendoMultiSelect({
        messages: {
          clear: "clear!",
          noData: "There is no data!"
        }
      });
    </script>

### messages.clear `String` *(default: "clear")*

The text message when hovering the input clear button.


<div class="meta-api-description">
How do I customize the tooltip text for clearing selected items in a Kendo UI MultiSelect widget? Set or customize the tooltip text, hover label, or accessible description for the clear or reset button in multi-selection input fields, enabling localization, internationalization, user-friendly messaging, and customized prompts for clearing selected items in dropdowns or multi-select controls.
</div>

#### Example - customize clear message

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
      $("#multiselect").kendoMultiSelect({
        messages: {
          clear: "clear!"
        }
      });
    </script>

### messages.deleteTag `String` *(default: "delete")*

The text message shown when hovering delete icon in a selected tag.


<div class="meta-api-description">
How can I customize the tooltip for removing selected items in a Kendo UI MultiSelect? Customize or translate the tooltip text that appears when hovering over the icon to remove a selected item or tag in a multi-selection interface, enabling control over the message shown for deleting tags, modifying the hover prompt for tag removal buttons, adjusting localized labels for removing selected entries, configuring accessible descriptions for clearing chosen tags, setting custom hints or tooltips for delete actions in multi-select components, and tailoring the text displayed when users hover over the tag deletion icon.
</div>

#### Example - customize deleteTag message

    <input id="multiselect" style="width: 400px;" />
    <script>
        $("#multiselect").kendoMultiSelect({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            messages: {
                deleteTag: "delete!"
            }
        });
    </script>

### messages.downArrow `String` *(default: "select")*

Specifies the text that will be used for the MultiSelect `downArrow` title attribute.


<div class="meta-api-description">
How to customize the tooltip for the down arrow in a Kendo UI MultiSelect control? Set, customize, or localize the tooltip text, title attribute, or accessible label for the down arrow icon in multi-selection controls, enabling better screen reader support, user guidance, and user interface clarity for different languages, accessibility needs, or user experience enhancements related to dropdown toggles or expand/collapse arrows.
</div>

#### Example

    <input id="multiselect" style="width: 400px;" />
    <script>
        $("#multiselect").kendoMultiSelect({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            messages: {
                downArrow: "custom!"
            }
        });
    </script>

### messages.noData `String` *(default: "No data found.")*

The text message shown in the noDataTemplate when no data is available in the widget drop-down.


<div class="meta-api-description">
How do I change the text displayed when a Kendo UI MultiSelect is empty? Configure the text or message displayed when a multi-select dropdown list is empty or contains no options, enabling customization of empty state prompts, alerts, or notifications for scenarios where no data, no results, or zero items are available to select, supporting cases like search with no matches, filtered empty lists, or dynamic option loading with no entries to present.
</div>

#### Example - customize noData message

    <select id="multiselect" multiple="multiple"></select>
    <script>
      $("#multiselect").kendoMultiSelect({
        messages: {
          noData: "There is no data!"
        }
      });
    </script>

### messages.singleTag `String` *(default: "item(s) selected")*

The text message shown in the single TagMode tag.


<div class="meta-api-description">
How do I customize the text label for a single selected item in a Kendo UI MultiSelect component? Configure or customize the text label displayed when using single tag mode in a multi-selection component, control how the single selected item is represented or shown as a tag, set or change the message text for the lone tag visible in multi-select dropdowns, adjust or enable personalized messaging for the single selected element display, and define the wording or string that appears for a single tag in tag-based multiple selection interfaces.
</div>

#### Example - customize singleTag message

    <input id="multiselect" style="width: 400px;" />
    <script>
        $("#multiselect").kendoMultiSelect({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            messages: {
                singleTag: "item(s) selected!",
            },
            tagMode: "single"
        });
    </script>

### minLength `Number`*(default: 1)*

The minimum number of characters the user must type before a search is performed. Set to a higher value if the search could match a lot of items.
A zero value means that a request will be made as soon as the user focuses the widget.

> Widget will initiate a request when input value is cleared. If you would like to prevent this behavior please check the [filtering](/api/javascript/ui/multiselect/events/filtering) event for more details.


<div class="meta-api-description">
How do I configure Kendo UI MultiSelect to start filtering only after a minimum number of characters are typed? Configure the minimum number of characters required to start filtering or searching in a multi-select input, controlling when search requests trigger based on user keystrokes, managing behavior for empty or cleared inputs, and adjusting thresholds to optimize performance or limit matches in dropdown lists, enabling fine-tuning of search initiation on focus, character entry, and input clearing events to handle scenarios with large datasets or prevent unnecessary queries.
</div>

#### Example - set minLength

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      minLength: 3
    });
    </script>

### maxSelectedItems `Number`*(default: null)*

 Defines the limit of the selected items. If set to null widget will not limit number of the selected items.


<div class="meta-api-description">
How can I limit the number of items that can be selected in a Kendo UI multiselect dropdown? Set or configure the maximum number of selectable options in a multi-selection interface, limit or remove limits on how many items can be picked simultaneously, control selection count constraints for dropdowns or lists that support multiple selections, enable maximum item selection thresholds, define selection caps or unlimited multi-select behavior, restrict or allow an unlimited number of chosen entries, manage or set upper bounds on user-selected elements in multi-selection components, adjust or disable limits on the quantity of selected items, specify the maximum allowed selections for checkboxes or multi-select inputs.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
        <option>Item3</option>
        <option>Item4</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
        maxSelectedItems: 3 //only three or less items could be selected
    });
    </script>

### noDataTemplate `String|Function|Boolean` *(default: true)*

The [template](/api/javascript/kendo/methods/template) used to render the "no data" template, which will be displayed if no results are found or the underlying data source is empty.
The noData template receives the widget itself as a part of the data argument. The template will be evaluated on every widget data bound.

> **Important** The popup will open when 'noDataTemplate' is defined


<div class="meta-api-description">
How to customize the display when no items match in a Kendo UI MultiSelect dropdown? Customize the display for empty states or no matching results in multi-select dropdowns by configuring a custom message, placeholder, or user interface that appears when the list is empty or a search yields zero hits; enable, set, or define templates and layouts to show alternative content such as notices, alerts, or fallback UI components when no data items or search matches exist, controlling how users are informed when options are unavailable or filtered out, including dynamic rendering based on the current component state during data binding and controlling popup behavior in these no-result scenarios.
</div>

#### Example - specify noDataTemplate as a string

    <select id="multiselect"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      noDataTemplate: 'No Data!'
    });
    </script>

### placeholder `String`*(default: "")*

The hint displayed by the widget when it is empty. Not set by default.


<div class="meta-api-description">
How to set the placeholder text in a Kendo UI MultiSelect? Configure or set the text prompt displayed inside a multi-selection input when no items are selected, enabling placeholder hints, empty-state messages, or guidance text such as "Select items" that help users understand what to do before making selections; control, customize, or change this hint text to improve form usability and provide clear instructions in dropdowns, multi-select fields, or input controls that support multiple choices.
</div>

#### Example - specify placeholder option

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      placeholder: "Select..."
    });
    </script>

#### Example - specify placeholder as HTML attribute

    <select id="multiselect" data-placeholder="Select..." multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>

    <script>
    $("#multiselect").kendoMultiSelect();
    </script>

### popup `Object`

The options that will be used for the popup initialization. For more details about the available options
refer to [Popup](/api/javascript/ui/popup) documentation.


<div class="meta-api-description">
How to customize the animation of a popup in a Kendo UI MultiSelect control? Control and customize the initialization and behavior of a dropdown or overlay popup for multi-selection inputs by configuring options related to positioning, animation effects, DOM attachment points, and visibility triggers. Adjust settings to manage how the popup appears, moves, or animates when users interact with multi-select fields, including specifying container elements, enabling or disabling animations, setting popup alignment or placement, and fine-tuning interactive overlay behavior. This configuration allows developers to set or modify how selection lists or dropdown panels open and respond to user actions in multi-select controls, tailoring the popup’s lifecycle, rendering context, and display effects.
</div>

#### Example - append the popup to a specific element

    <div id="container">
        <select id="multiselect"></select>
    </div>
    <script>
    $("#multiselect").kendoMultiSelect({
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
How do I control the location of the dropdown in a Kendo UI MultiSelect? Control the location where the dropdown or popup menu appears by specifying a container element using a selector, enabling precise placement inside a particular DOM parent to handle stacking order, overflow behavior, or alignment issues; configure where the popup attaches for custom positioning, embedding, or layout purposes, managing how and where the selection list renders relative to other page elements and ensuring proper visibility and interaction within complex UI structures.
</div>

#### Example - append the popup to a specific element

    <div id="container">
        <select id="multiselect"></select>
    </div>
    <script>
    $("#multiselect").kendoMultiSelect({
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
How do I customize the position of the popup in a Kendo UI MultiSelect widget? Control the placement and alignment of a multi-select dropdown or popup relative to its anchor element by configuring vertical and horizontal origin points; set the popup position using combined vertical options like top, center, or bottom alongside horizontal choices such as left, center, or right to precisely align the popup where it should appear on screen, enabling adjustments of dropdown or overlay coordinates based on anchor reference, alignment preferences, or interface layout needs for dynamic user interface behavior.
</div>

#### Example - append the popup to a specific element

    <div id="container">
        <select id="multiselect"></select>
    </div>
    <script>
    $("#multiselect").kendoMultiSelect({
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
How do I customize the position of the popup in a Kendo UI MultiSelect widget? Control and customize the placement and alignment of dropdown or popup elements by specifying how the popup anchors to a reference point using vertical and horizontal positioning keywords like top, bottom, center, left, right, or combinations such as bottom left or center right. Configure the popup’s origin relative to the input field or target element to ensure precise alignment, anchoring, or overlay behavior in user interfaces. This setting supports flexible positioning strategies for tooltips, menus, or selection lists, enabling developers to set popup coordinates, adjust placement dynamically, or align overlays for different screen sizes and layouts by defining vertical then horizontal attachment points.
</div>

#### Example - append the popup to a specific element

    <div id="container">
        <select id="multiselect"></select>
    </div>
    <script>
    $("#multiselect").kendoMultiSelect({
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

### headerTemplate `String|Function`

Specifies a static HTML content, which will be rendered as a header of the popup element.

> **Important** The header content **should be wrapped** with a HTML tag if it contains more than one element. This is applicable also when header content is just a string/text.

> **Important** Widget does not pass a model data to the header template. Use this option only with static HTML.


<div class="meta-api-description">
How do I customize the header in a Kendo UI MultiSelect dropdown popup? Configure a static, customizable header section for dropdown or popup multi-selection interfaces by embedding fixed HTML content that appears at the top of the selection panel; this feature supports adding plain text or wrapped HTML elements as a non-dynamic header without binding or data context, enabling developers to set, embed, or control consistent header layouts, titles, or branding elements within multi-select dropdown popups without involving reactive data or templates.
</div>

#### Example - specify headerTemplate as a string

    <select id="multiselect"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      headerTemplate: '<div><h2>Fruits</h2></div>'
    });
    </script>

### itemTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the items in the popup list.


<div class="meta-api-description">
How can I customize the appearance of individual items in a Kendo UI MultiSelect dropdown? Customize the appearance and layout of each selectable option in a multi-select dropdown by defining custom templates that control how list items are rendered, including the ability to use HTML markup, bind data fields dynamically, apply template functions or string templates for individual items, and tailor the item display style to match specific UI requirements, style preferences, or complex data presentations within the dropdown list.
</div>

#### Example - specify template as a function

    <select id="multiselect" multiple="multiple"></select>
    <script id="itemTemplate" type="text/x-kendo-template">
      <span> 
        #: name #
      </span>
    </script>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      itemTemplate: kendo.template($("#itemTemplate").html())
    });
    </script>

#### Example - specify template as a string

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      itemTemplate: '<span>#: name #</span>'
    });
    </script>

### prefixOptions `Object`

The configuration for the prefix adornment of the component.


<div class="meta-api-description">
How do I customize the prefix label in a Kendo UI MultiSelect widget? Configure or set a static label, icon, or custom prefix content that appears before the input area within a multi-selection interface, enabling control over prefix appearance, styling, attributes, and behavior for consistent UI adornment. Enable or customize a fixed prefix element that prepends selected items or input fields in multi-select dropdowns, supporting options for icons, text labels, or any custom components to enhance user interface clarity and provide contextual cues. Control and modify the initial visual adornment or prefix content displayed in multi-select inputs, including setting attributes, styles, or interactive behavior, ideal for branding, status display, or input guidance.
</div>

#### Example - specify prefix adornment configuration

    <input id="prefix" />
    <script>
        $("#prefix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        });
    </script>

### prefixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content


<div class="meta-api-description">
How can I customize the icon shown in a Kendo UI MultiSelect's prefix area? Configure or customize the prefix icon displayed in a multi-select component by specifying either a predefined theme icon name or embedding custom SVG markup; control the visual indicator shown before selected options using built-in icon sets or raw SVG content to set, change, or override the prefix area symbol, enabling tailored iconography for dropdown selections, multi-choice inputs, and user interface prefixes in multi-select elements.
</div>

#### Example - specify prefix adornment icon

    <input id="prefix" />
    <script>
        $("#prefix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            prefixOptions: {
                icon: "search"
            }
        })
    </script>

### prefixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the prefix adornment of the component.


<div class="meta-api-description">
How do I customize the prefix element in Kendo UI MultiSelect? Control and configure the prefix element displayed before user input and selected options in multi-select components, enabling customization of the prefix appearance through HTML templates, custom rendering functions, or markup generators to tailor visual adornments and inline elements preceding selections or inputs, supporting flexible templating for enhanced UI presentation in dropdowns and multi-selection fields.
</div>

#### Example - specify prefix adornment template

    <input id="prefix" />
    <script>
        $("#prefix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        })
    </script>

### prefixOptions.separator `Boolean` *(default: true)*

If set to `false`, the prefix adornment will not have a separator.


<div class="meta-api-description">
How do I remove the separator between prefix labels and selected items in a Kendo UI MultiSelect? Configure the display of a visual divider or delimiter between prefix labels and selected items in multi-select inputs, enabling or disabling the separator element that divides prefix content from chosen values; set this option to control whether a distinct separator line, character, or symbol appears alongside or between prefix adornments and selections, affecting how users visually distinguish preset tags, badges, or indicators from the user-selected options within dropdowns, lists, or input fields.
</div>

#### Example - specify prefix adornment separator

    <input id="prefix" />
    <script>
        $("#prefix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            prefixOptions: {
                template: () => `${kendo.ui.icon("search")}`,
                separator: false
            }
        })
    </script>

### suffixOptions `Object`

The configuration for the suffix adornment of the component.


<div class="meta-api-description">
How to customize suffix elements in Kendo UI MultiSelect widget? Control and customize the display and behavior of suffix elements following input fields by setting icons, text labels, templates, styles, click event handlers, and dynamic bindings for suffix adornments. Enable configuring suffix content appearance, interaction responses, visual styling, update mechanisms, and template-driven or programmatic suffix customization for multi-selection inputs or input components requiring post-input decorations and functional suffix elements. Adjust suffix adornment properties to define how they appear and respond, including user clicks or data-bound updates, allowing flexible suffix integration and control over trailing input decorations and their behavior.
</div>

#### Example - specify suffix adornment configuration

    <input id="suffix" />
    <script>
        $("#suffix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        });
    </script>

### suffixOptions.icon `String`

Defines the name for an existing icon in a Kendo UI theme or SVG content


<div class="meta-api-description">
How can I customize the icon that appears after selected items in a Kendo UI MultiSelect? Control or customize the trailing icon or visual indicator that appears after selected items in a multi-select input field, enabling configuration of the suffix icon using predefined icon names from Kendo UI themes or by providing custom SVG content to display unique or branded graphics as the suffix, allowing developers to set, change, or override the icon that appears at the end of selected options for clearer user interface cues or enhanced design consistency.
</div>

#### Example - specify suffix adornment icon

    <input id="suffix" />
    <script>
        $("#suffix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            suffixOptions: {
                icon: "search"
            }
        })
    </script>

### suffixOptions.template `String|Function`

The [template](/api/javascript/kendo/methods/template) for the suffix adornment of the component.


<div class="meta-api-description">
How do I customize the suffix display in Kendo UI MultiSelect dropdowns? Customize or set the suffix decoration, icon, or adornment in a multi-select input by specifying a rendering template, with options to define this template as a string, a function, or a template ID. Enable control over how extra visual elements or suffix indicators appear in multi-selection dropdowns, allowing advanced customization of the suffix display, formatting, or layout using Kendo UI templates or user-defined rendering logic, useful for styling, adding icons, labels, or contextual content after selected items. Adjust, configure, or override the default suffix rendering approach to fit custom user interface needs, such as adding badges, counters, or interactive elements after the selected options in the multi-select component.
</div>

#### Example - specify suffix adornment template

    <input id="suffix" />
    <script>
        $("#suffix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`
            }
        })
    </script>

### suffixOptions.separator `Boolean` *(default: true)*

If set to `false`, the suffix adornment will not have a separator.


<div class="meta-api-description">
How do I customize the separator in Kendo UI's MultiSelect component? Control, enable, disable, or customize the visual divider, separator line, or spacing between the input field and the suffix or adornment in multi-select components, including toggling the presence of the separator or gap, adjusting how suffix elements are visually separated, managing the border or spacing that appears before suffix icons or labels, and configuring whether a distinct dividing line or empty space appears before suffix options or adornments within selectable inputs.
</div>

#### Example - specify suffix adornment separator

    <input id="suffix" />
    <script>
        $("#suffix").kendoMultiSelect({
            label: "MultiSelect",
            dataTextField: "text",
            dataValueField: "value",
            dataSource: {
                    data:  [
                            { text: "Apples", value: "1" },
                            { text: "Oranges", value: "2" }
                    ]
            },
            suffixOptions: {
                template: () => `${kendo.ui.icon("search")}`,
                separator: false
            }
        })
    </script>

### tagTemplate `String|Function`

The [template](/api/javascript/kendo/methods/template) used to render the tags.


<div class="meta-api-description">
How do I customize the appearance of selected items in a Kendo UI MultiSelect component? Control and customize the appearance and layout of selected items as tags in multi-selection components by defining templates that render tags with custom HTML, styling, and dynamic content based on item data fields; configure, adjust, or override default tag displays in multi-select inputs to incorporate personalized formatting, labels, icons, or additional information for each chosen item, enabling flexible tag presentation that suits various user interface designs and interaction patterns for selected values in list or dropdown selections.
</div>

#### Template Data for the 'multiple' [tagMode](/api/javascript/ui/multiselect#configuration-tagMode)

##### data `Object`

The dataitem that corresponds to the selected value.

#### Template Data for the 'single' [tagMode](/api/javascript/ui/multiselect#configuration-tagMode)

##### data.values `Array`

A list of the selected values.

##### data.dataItems `Array`

A list of the selected data items.

##### data.currentTotal `Array`

The current dataSource total value. If it is server filtered, it will show the current length of the [view](/api/javascript/data/datasource/methods/view).

##### data.maxTotal `Array`

The maximum total value of the dataSource. Unlike the `currentTotal`, this value will keep the maximum reached total value.
Usable when the tag shows the total of the available items.

#### Example - specify template as a function

    <select id="multiselect" multiple="multiple"></select>
    <script id="tagTemplate" type="text/x-kendo-template">
      <span>
        <img src="/img/#: id #.png" alt="#: name #" />
        #: name #
      </span>
    </script>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      tagTemplate: kendo.template($("#tagTemplate").html())
    });
    </script>

#### Example - specify template as a string

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      tagTemplate: '<span><img src="/img/#: id #.png" alt="#: name #" />#: name #</span>'
    });
    </script>

#### Example - specify a template displaying the number of the selected values

    <select id="multiselect" multiple="multiple"></select>
    <script id="tagTemplate" type="text/x-kendo-template">
        # if (values.length < 3) { #
            # for (var idx = 0; idx < values.length; idx++) { #
                #:values[idx]#
                # if (idx < values.length - 1) {#, # } #
            # } #
        # } else { #
           #:values.length# out of #:maxTotal#
        # } #
    </script>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { id: 1, name: "Apples" },
        { id: 2, name: "Oranges" },
        { id: 2, name: "Bananas" }
      ],
      dataTextField: "name",
      dataValueField: "id",
      tagTemplate: kendo.template($("#tagTemplate").html()),
      tagMode: "single"
    });
    </script>

### tagMode `String`*(default: "multiple")*

The mode used to render the selected tags. The available modes are:
- `multiple` - renders a tag for every selected value
- `single` - renders only one tag that shows the number of the selected values

> Every tagMode has a specific `tagTemplate` value. If you would like to control the content of the rendered tags,
set a custom a [tagTemplate](/api/javascript/ui/multiselect#configuration-tagTemplate) value.


<div class="meta-api-description">
How do I configure Kendo UI MultiSelect to display multiple selected items as separate tags? Configure how multiple selected items appear as tags in a multi-select input, choosing between showing individual tags for each selected option or a single consolidated summary tag that indicates the total number of selections. Options include displaying multiple separate tags representing each chosen value or a single tag summarizing the count of all selections. Control tag appearance by setting modes to customize whether every selection is individually tagged or summarized, and use customizable tag templates to define the content and layout of these tags for enhanced display flexibility and user interface clarity. Adjust rendering behavior to enable detailed selection views or concise aggregated tags, depending on preference for tag management and visual presentation in selection components.
</div>

#### Example - set the tagMode

    <input id="multiselect" style="width: 400px;" />
    <script>
        $("#multiselect").kendoMultiSelect({
            dataSource: [
                { id: 1, name: "Apples" },
                { id: 2, name: "Oranges" },
                { id: 3, name: "Bananas" }
            ],
            dataTextField: "name",
            dataValueField: "id",
            tagMode: "single"
        });
    </script>

### value `Array`*(default: [])*

 Define the value of the widget


<div class="meta-api-description">
How to set default selected items in Kendo UI MultiSelect? Control and access the current selected items in a multi-selection interface, including initializing the component with predefined choices, updating the selection dynamically through code, binding or syncing selected options with forms or data models, retrieving the list of chosen elements, managing selection state programmatically, setting or getting selected values in multiple-choice scenarios, configuring default selections, handling arrays or collections of selected items, and enabling interaction with selection data for user input processing or UI updates.
</div>

#### Example


    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
         dataSource: ["Item1", "Item2", "Item3", "Item4"],
         value: ["Item2", "Item3"]
    });
    </script>

> **Important:** Define a list of data items if widget is not initially bound

#### Example

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        autoBind: false,
        dataTextField: "productName",
        dataValueField: "productId",
        value: [{ productName: "Item 1", productId: "1" }, { productName: "Item 2", productId: "2" }]
    });
    </script>

### valuePrimitive `Boolean`*(default: false)*

Specifies the [value binding](/framework/mvvm/bindings/value) behavior for the widget. If set to true, the View-Model field will be updated with the selected item value field. If set to false, the View-Model field will be updated with the selected item.


<div class="meta-api-description">
How do I configure Kendo UI MultiSelect to update its value with either primitive values like IDs or full selected objects? Configure how selected options are represented in your data binding by setting whether the value updates use primitive values like IDs or the full selected objects, enabling precise control over how selections from dropdowns or multi-choice inputs are stored, whether you want the bound data model to hold simple identifiers, keys, or the entire selected item details, facilitating synchronization between UI selections and data layers, and supporting use cases that require either lightweight value updates or complete object references for multi-selection components.
</div>

#### Example - specify that the View-Model field should be updated with the selected item value

  <div id="container">
    <select id="multiselect" multiple="multiple"
            data-bind="value: selectedProductId, source: products"></select>

    <div>
      <h4>Selected Product IDs:</h4>
      <div data-bind="text: selectedProductIdText"></div>
    </div>
  </div>

  <script>
    $("#multiselect").kendoMultiSelect({
      valuePrimitive: true,
      dataTextField: "name",
      dataValueField: "id"
    });

    var viewModel = kendo.observable({
      selectedProductId: [],
      selectedProductIdText: function () {
        return this.get("selectedProductId").join(", ");
      },
      products: [
        { id: 1, name: "Coffee" },
        { id: 2, name: "Tea" },
        { id: 3, name: "Juice" }
      ]
    });

    kendo.bind($("#container"), viewModel);
  </script>

### virtual `Boolean|Object`*(default: false)*

Enables the virtualization feature of the widget. The configuration can be set on an object, which contains two properties - `itemHeight` and `valueMapper`.

For detailed information, refer to the [article on virtualization]({% slug virtualization_kendoui_combobox_widget %}).


<div class="meta-api-description">
How do I optimize large list performance in Kendo UI MultiSelect inputs? Optimize large list performance and fast scrolling in multiselect inputs by enabling virtual rendering, which supports efficient display of extensive or remote datasets through lazy loading and dynamic item virtualization. Configure virtualization by setting per-item height for accurate scroll calculations and mapping item values to their indexes to handle remote or asynchronous data sources seamlessly. Control smooth scrolling and rendering efficiency for massive dropdown lists or multi-option selectors by adjusting virtualization settings that balance rendering speed and resource usage, ideal for handling thousands of entries with minimal impact on UI responsiveness and interaction. Improve large-scale multi-select dropdown handling by enabling virtual scroll features that allow configuring item dimension and value-to-index mapping to ensure fast data loading, reduced rendering overhead, and optimized user experience during selection from voluminous or remote data sets.
</div>

#### Example - MultiSelect with a virtualized list

    <select id="orders" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#orders").kendoMultiSelect({
                placeholder: "Select addresses...",
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                height: 520,
                virtual: {
                    itemHeight: 26,
                    valueMapper: function(options) {
                        $.ajax({
                            url: "https://demos.telerik.com/service/v2/core/Orders/ValueMapper",
                            type: "GET",
                            data: convertValues(options.value),
                            success: function (data) {
                                options.success(data);
                            }
                        })
                    }
                },
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

#### Example - MultiSelect widget with a declarative virtualization configuration

    <div class="demo-section k-header">
        <h4>Search for shipping name</h4>
        <select id="orders" style="width: 400px"
               data-role="multiselect"
               data-bind="value: order, source: source"
               data-text-field="ShipName"
               data-value-field="OrderID"
               data-filter="contains"
               data-virtual="{itemHeight:26,valueMapper:orderValueMapper}"
               data-height="520"
                ></select>
    </div>

    <script>
        $(document).ready(function() {
            var model = kendo.observable({
                    order: [10548],
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

### virtual.itemHeight `Number`*(default: null)*

Specifies the height of the virtual item. All items in the virtualized list **must** have the same height.
If the developer does not specify one, the framework will automatically set `itemHeight` based on the current theme and font size.


<div class="meta-api-description">
How to set uniform height for items in Kendo UI MultiSelect virtual list? Adjust or set the uniform height of each item in a virtualized multi-select list to optimize scrolling performance, control item rendering size, customize virtual list layout, define consistent row height for dynamic or fixed content, enable smooth virtualization, manage item spacing in large datasets, override automatic height calculation based on theme or font, and configure how tall each selectable option appears for accurate rendering and precise scroll positioning in virtual scrolling environments.
</div>

#### Example - MultiSelect with a virtualized list

    <select id="orders" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#orders").kendoMultiSelect({
                placeholder: "Select addresses...",
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                height: 520,
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

### virtual.mapValueTo `String`*(default: "index")*

The changes introduced with the Kendo UI R3 2016 release enable you to determine if the `valueMapper` must resolve a *value to an `index`* or a *value to a `dataItem`*. This is configured through the `mapValueTo` option that accepts two possible values - `"index"` or `"dataItem"`. By default, the `mapValueTo` is set to `"index"`, which does not affect the current behavior of the virtualization process.

For more information, refer to the [article on virtualization]({% slug virtualization_kendoui_combobox_widget %}#value-mapping).


<div class="meta-api-description">
How does Kendo UI's MultiSelect virtual mapping process handle selected values in a list? Configure how virtualization processes and resolves selected entries by controlling whether selected values are matched and mapped by their index position or by the actual data item object. This setting lets you enable or specify the mapping mode for virtualized multi-selection lists, choosing between mapping values based on their numerical indexes or their underlying data objects to influence selection resolution and data binding behavior during virtual scrolling or lazy loading. Adjust whether virtualized components interpret selection via data indices or direct data item references, enabling precise control over how selections correspond to displayed or loaded dataset entries in virtual selection controls.
</div>

#### Example

    <select id="multiselect"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
        dataTextField: "ContactName",
        dataValueField: "CustomerID",
        virtual: {
            itemHeight: 26,
            mapValueTo: "dataItem"
        },
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Customers"
            },
            pageSize: 80
        }
    });
    </script>

### virtual.valueMapper `Function`*(default: null)*

The widget calls the `valueMapper` function when the widget receives a value, that is not fetched from the remote server yet.
The widget will pass the selected value(s) in the `valueMapper` function. In turn, the `valueMapper` implementation should return the **respective data item(s) index/indices**.
> **Important**
>
> As of the Kendo UI R3 2016 release, the implementation of the `valueMapper` function is optional. It is required only if the widget contains an initial value or if the `value` method is used.


<div class="meta-api-description">
How do I map selected values to item indexes in Kendo UI MultiSelect with virtual scrolling? Enable mapping of selected values to their corresponding item indexes or positions when using virtual scrolling or remote data loading in multi-select components, supporting scenarios where initial values or programmatically set selections reference items not yet loaded or fetched. This functionality helps translate external or asynchronous value identifiers into the internal collection indexes required for proper selection display and interaction, covering use cases like setting initial selections before data retrieval, synchronizing values in lazy-loaded lists, resolving values from remote APIs, handling virtualized datasets, and ensuring correct correspondence between raw values and rendered items. It supports configuring custom logic to translate single or multiple selected values into one or multiple item indexes, facilitating accurate state management and user interactions in environments with dynamic, partial, or delayed item data availability.
</div>

#### Example - MultiSelect with a virtualized list

    <select id="orders" style="width: 400px;"></select>
    <script>
        $(document).ready(function() {
            $("#orders").kendoMultiSelect({
                placeholder: "Select addresses...",
                dataTextField: "ShipName",
                dataValueField: "OrderID",
                height: 520,
                virtual: {
                    itemHeight: 26,
                    valueMapper: function(options) {
                        $.ajax({
                            url: "https://demos.telerik.com/service/v2/core/Orders/ValueMapper",
                            type: "GET",
                            data: convertValues(options.value),
                            success: function (data) {
                                options.success(data);
                            }
                        })
                    }
                },
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

### readonly `Boolean`*(default: "false")*

If set to `true`, the widget will be readonly and will not allow user input. The widget is not readonly be default and allow user input.


<div class="meta-api-description">
How can I make my Kendo UI MultiSelect dropdown read-only so users can't select or edit items? Control the component’s interaction mode to display selected options without allowing modifications by enabling read-only state, disable user input or editing within multi-select dropdowns, lock selections to prevent changes while still showing chosen values, set the field as non-editable for view-only purposes, restrict selection updates, and configure the interface to show selected items without enabling input or alterations.
</div>

#### Example - make the widget readonly

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      readonly: true
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
How to set rounded corners for Kendo UI multiselect dropdowns? Adjust the border radius or corner roundness for multi-selection dropdowns or lists, enabling control over rounded edges with numeric values or preset keywords like none, small, medium, large, or full. Customize the curvature of selection boxes or chips to create subtle or pronounced round corners, stylize dropdowns with smooth versus sharp edges, and configure how rounded the interface elements appear for improved UI aesthetics and user experience. Set or modify the roundness level during setup to influence the corner radius shape for multi-select inputs, allowing flexibility in visual design through radius scaling or token-based rounding options.
</div>

#### Example - sets the rounded value

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
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
How do I adjust the size of a Kendo UI MultiSelect component? Adjust the overall dimensions, spacing, padding, and visual density of a multi-selection input to customize its compactness or spaciousness, setting the component's size or scale to small, medium, large, or none to control how much screen area it occupies and how condensed or expanded the selection items appear for better usability and interface fit.
</div>

#### Example - sets a size

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      size: "large"
    });
    </script>

## Fields

### dataSource `kendo.data.DataSource`

The [data source](/api/javascript/data/datasource) of the widget. Configured via the [dataSource](/api/javascript/ui/multiselect/configuration/datasource) option.

> Changes of the data source will be reflected in the widget.

> **Important:** Assigning a new data source would have no effect. Use the [setDataSource](/api/javascript/ui/multiselect/methods/setdatasource) method instead.


<div class="meta-api-description">
How to interact with data in Kendo UI MultiSelect component? Access and interact with the underlying collection or list feeding items into a multi-selection interface, enabling retrieval of current data entries, monitoring or subscribing to changes and updates in real time, managing or querying the data set bound to the component, inspecting the live data provider to synchronize UI elements with the data state, controlling or reacting to updates from data streams powering selection options, handling initial and ongoing data inputs without replacing the entire source directly but through designated update methods, configuring and accessing the source of selectable choices for dynamic filtering, loading, or populating items, and responding programmatically to data modifications affecting the selectable options displayed.
</div>

#### Example - add a data item to the data source

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [
        { name: "Apples" },
        { name: "Oranges" }
      ],
      dataTextField: "name",
      dataValueField: "name"
    });
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.dataSource.add({ name: "Appricot" });
    multiselect.search("A");
    </script>

### input `jQuery`
A jQuery object of the visible input element, where the user types.


<div class="meta-api-description">
How do I programmatically focus on the input field of a Kendo UI MultiSelect component? Access and control the text input area within a multi-select interface by programmatically retrieving the input element as a jQuery object to enable focusing, reading or setting user input, attaching event listeners for keyboard or input events, measuring or adjusting the input field’s width dynamically, and manipulating the cursor position or text selection for custom behavior after the component is initialized, supporting scenarios such as custom autocomplete logic, input validation, interactive user feedback, or dynamic UI adjustments tied to the typing area.
</div>

#### Example - get input element

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var input = multiselect.input;
    </script>

### options `Object`
An object, which holds the options of the widget.


<div class="meta-api-description">
How can I dynamically change the available choices in a Kendo UI Multiselect? Access, retrieve, modify, update, or configure the selectable items and their settings dynamically within a multi-select interface component at runtime, including reading option lists, changing available choices, adjusting option properties, controlling selection data sources, and managing selectable entries programmatically through object properties tied to options handling and dynamic option management in multi-selection controls.
</div>

#### Example - get options of the widget

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var options = multiselect.options;
    </script>

### list `jQuery`
A jQuery object of the drop-down list element.


<div class="meta-api-description">
How can I access and manipulate the multi-select dropdown list in Kendo UI for jQuery? control and interact with the multi-select dropdown list element, enabling developers to access the list container for attaching event listeners, querying or modifying DOM elements within the dropdown, measuring its size and position, updating classes, attributes, or content dynamically, and applying jQuery methods to customize behavior or appearance after component initialization; useful for customizing dropdown interaction, styling, event handling, and real-time content updates in multi-select user interface elements.
</div>

#### Example - get list element

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var list = multiselect.list;
    </script>

### ul `jQuery`
A jQuery object of the `ul` element, which holds the available options.


<div class="meta-api-description">
How do I access the options list in a Kendo MultiSelect component? Access or modify the options list container for multi-select components by retrieving the unordered list element that holds all selectable items, enabling developers to query list entries, add or remove options, apply or change CSS styling, attach event listeners, measure element size or position, and manipulate the DOM structure dynamically through common methods like finding list items, appending elements, or customizing behaviors in multi-selection user interfaces after component initialization.
</div>

#### Example - get ul element

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var ul = multiselect.ul;
    </script>

### tagList `jQuery`
A jQuery object of the `ul` element, which holds the selected tags.


<div class="meta-api-description">
How to access and manipulate the list of selected tags in a Kendo UI MultiSelect component? Access and control the list element that contains all selected tags or items in a multi-selection interface, enabling queries, dynamic additions or removals of tag elements, direct manipulation of the container holding the tags, customization of tag styling or structure, retrieving or updating the HTML elements representing chosen options, working with the underlying DOM node or jQuery object representing the tag collection for user selections, managing the ordered list of selected entries, and performing programmatic updates or inspections on the tag display area within multi-select components.
</div>

#### Example - get tagList element

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    var tagList = multiselect.tagList;
    </script>

## Methods

### close

Closes the widget popup.


<div class="meta-api-description">
How do I programmatically close the dropdown list in a Kendo UI Multiselect? Control hiding or dismissing the dropdown list or popup programmatically to close or collapse the open selection menu in a multi-select interface, enabling the ability to close the options panel after user selection, events, or automated actions by invoking methods to close, hide, dismiss, or collapse the visible options list of a multi-select component from code.
</div>

#### Example - close the suggestion popup

    <select id="multiselect" multiple="multiple">
        <option>Apples</option>
        <option>Oranges</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    // Search for items starting with "A" - will open the suggestion popup and show "Apples"
    multiselect.search("A");
    // Close the suggestion popup
    multiselect.close();
    </script>

### dataItems

Returns list of raw data records corresponding to the selected items.


<div class="meta-api-description">
How do I retrieve all selected data items from a Kendo UI MultiSelect component? Retrieve the full set of selected raw data records from a multi-selection input component, accessing original data objects or primitive values as configured, enabling you to inspect, compare, serialize, or update chosen items, extract complete item details from user selections, fetch underlying source entries for processing or submission, obtain the active selection dataset for validation or manipulation, and handle multiple selected values by pulling their complete data representations for transformations or business logic.
</div>

#### Returns

`Array` The raw data records. Returns empty array ([]) if no selected options

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    // get data items for the selected options.
    var dataItem = multiselect.dataItems();
    </script>

### destroy

Prepares the **MultiSelect** for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

> **Important:** This method does not remove the MultiSelect element from DOM.


<div class="meta-api-description">
How do I properly clean up a Kendo UI MultiSelect component before removing it from the DOM? clean up and dispose of multi-select components by detaching event listeners, removing associated data and attributes, preventing memory leaks, invoking destruction routines for nested or child widgets, safely preparing multi-select controls for removal without deleting the actual DOM element, managing widget lifecycle teardown, enabling proper resource release and cleanup in dynamic UI scenarios, controlling removal of event bindings and data caching, ensuring garbage collection readiness for multi-select elements, and finalizing widget shutdown processes to maintain application performance and stability.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How to disable user interaction in Kendo UI MultiSelect dropdown list? Activate or deactivate the interactive functionality of the dropdown list to allow or block user input, selection changes, typing, or opening the menu at runtime. Control whether users can interact with the multi-selection input field or if it remains disabled, ignoring clicks, keyboard input, and dropdown toggling. Enable or disable the component dynamically to manage user engagement, lock or unlock selection capabilities, and prevent or allow modifications to chosen items within the multi-select control.
</div>

#### Parameters

##### enable `Boolean`

If set to `true` the widget will be enabled. If set to `false` the widget will be disabled.

#### Example - enable the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      enable: false
    });
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.enable(true);
    </script>

### focus

Focuses the widget.


<div class="meta-api-description">
How do I programmatically set focus on the multi-select input field in Kendo UI for jQuery? Set or trigger keyboard input focus programmatically on the multi-select input field to enable user interaction, keyboard navigation, accessibility features, or visual focus indicators. Control or configure focus setting via a method call to direct input readiness, manage focus states after component initialization, respond to user events, or enhance UI accessibility and keyboard control for multi-select dropdowns or selection lists. Enable keyboard-driven selection, focus management, or automated focus shifting for multi-select interfaces using scripting or event handlers.
</div>

#### Example - focus the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.focus();
    </script>

### items

Obtains an Array of the DOM elements, which correspond to the data items from the Kendo UI DataSource [view](/api/javascript/data/datasource/methods/view).


<div class="meta-api-description">
How do I get a reference to the HTML elements of items in a Kendo MultiSelect? Access or obtain the list of currently rendered HTML elements representing the displayed data entries in a multi-select dropdown or list component, enabling inspection, modification, custom styling, event listener attachment, size measurement, or direct DOM manipulation of the visible items corresponding to the active data source or filtered view; retrieve an array or collection of element nodes that map to the user-visible or active set of data items, useful for dynamically controlling, enhancing, or interacting with the visual representation of multi-select options in real time.
</div>

#### Returns

`Array` The currently rendered dropdown list items (`<li>` elements).

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    var multiselect = $("#multiselect").kendoMultiSelect().data("kendoMultiSelect");
    
    // Get the items
    var items = multiselect.items();
    console.log(items);
    </script>

### open

Opens the popup.


<div class="meta-api-description">
How can I programmatically open the selection menu in a Kendo UI MultiSelect dropdown? invoke method to programmatically display or reveal a selectable options list, trigger popup visibility for a multi-select dropdown, automatically open the selection menu or suggestion panel without user clicks, control the display of list items through code, initiate opening sequence after loading data or responding to app events, activate the multi-select interface to show available choices, command the component to expose selectable entries dynamically, enable opening the dropdown or popup programmatically to enhance user interaction flow or custom UI behaviors.
</div>

#### Example

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.open();
    </script>

### readonly

Toggles the readonly state of the widget. When the widget is readonly it doesn't allow user input.

> There is a difference between disabled and readonly mode. The value of a disabled widget is **not** posted as part of a `form` whereas the value of a readonly widget is posted.


<div class="meta-api-description">
How do I make my Kendo UI MultiSelect read-only? Control enabling or disabling read-only mode for multi-select inputs to prevent user changes while keeping the selected values included in form submissions; configure whether the component accepts user input or restricts modification without disabling it entirely, ensuring the values remain posted with the form, unlike disabled inputs that block submission of their values; set, toggle, or enforce a read-only state to allow viewing but not editing of multiple selections in forms, enabling scenarios where selection is fixed but must still be sent with form data during submission.
</div>

#### Parameters

##### readonly `Boolean`

If set to `true` the widget will not allow user input. If set to `false` the widget will allow user input.

#### Example - make the widget readonly

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.readonly(true);
    </script>

### refresh

Refresh the popup by rendering all items again.


<div class="meta-api-description">
How do I refresh the dropdown list in Kendo UI MultiSelect after updating its data source? Redraw or re-render the dropdown list dynamically to update the visible items, refresh the selection state, reset or reload the popup contents, force the UI to regenerate item elements after data or template changes, synchronize the dropdown display with the latest data source, control the refresh behavior when programmatically modifying the list or selections, update the multi-select popup immediately to show current options, trigger a UI update on demand to ensure the dropdown matches the underlying data, and maintain consistency between the visual list and internal state by refreshing the rendered elements.
</div>

#### Example - refresh the popup items

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    multiselect.refresh();
    </script>

### search

Searches the data source for the provided value and displays any matches as suggestions.


<div class="meta-api-description">
How to trigger a search in a Kendo UI Multiselect control? Control programmatic searching within a multi-select input by triggering searches that query and filter the data source for matching items, enabling dynamic population or refresh of suggestions, autocomplete behaviors, and filtering of available options based on user input or external calls; this functionality supports invoking search operations to display relevant matches, open suggestion lists, and customize lookups within multi-select components using various search methods, filtering strategies, and query controls.
</div>

#### Parameters

##### word `String`

The filter value.

#### Example - search the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    multiselect.search("Item1");
    </script>

### setDataSource

Sets the dataSource of an existing MultiSelect and rebinds it.


<div class="meta-api-description">
How do I dynamically update the list of items in a Kendo UI MultiSelect dropdown? Configure, update, or replace the list of selectable items in a multi-select dropdown or tag input by setting a new data source dynamically, reloading or refreshing the displayed options instantly whenever the underlying data array, object, or data source instance changes, enabling real-time updates, rebinding data collections, modifying available choices, controlling the source of items shown, resetting the control’s content, or programmatically changing the options for user selection.
</div>

#### Parameters

##### dataSource `kendo.data.DataSource`

#### Example

    <select id="multiselect" multiple="multiple"></select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataSource: [ "Apples", "Oranges" ]
    });
    var dataSource = new kendo.data.DataSource({
      data: [ "Bananas", "Cherries" ]
    });
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.setDataSource(dataSource);
    </script>

### toggle

Opens or closes the widget popup.


<div class="meta-api-description">
How can I programmatically show or hide the dropdown list in a Kendo MultiSelect input? Control the dropdown visibility of a multi-select input by programmatically opening or closing the selection popup using a toggle method that switches the popup state between visible and hidden, enabling dynamic show or hide actions triggered by custom buttons, keyboard shortcuts, conditional logic, or code events to manage the multi-select list display predictably and interactively through software commands or user interface integrations.
</div>

#### Parameters

##### toggle `Boolean` *(optional)*

Defines the whether to open/close the drop-down list.

#### Example - set text of the widget

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    multiselect.toggle();
    </script>

### value

Gets or sets the value of the MultiSelect.

> **Important:** If there are no items, the value method will pre-fetch the data before continue with the value setting.

> **Important:** The widget will **clear the applied filter** if a new value is set. Thus it ensures that the original/whole data set is available for selection.

> **Important:** This method **does not trigger** [change](/api/javascript/ui/multiselect/events/change) event.
This could affect [MVVM value binding](/framework/mvvm/bindings/value). The model bound to the widget will not be updated.
You can overcome this behavior by triggering the `change` event manually using [trigger("change")](/api/javascript/observable/methods/trigger) method.

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    multiselect.value("Item1");
    multiselect.trigger("change");
    </script>


<div class="meta-api-description">
How do I update selected items in a Kendo UI MultiSelect dropdown? Retrieve or set selected options in a multi-selection dropdown using a method that accepts no arguments to get current selections or a single string or array to update chosen values, supporting both single and multiple item management. This selection control handles underlying data fetching automatically if items are absent, resets any active filters when new selections are applied to ensure the full dataset is visible for accurate selection, and does not emit automatic change events when updating values programmatically, which may require manual triggering of change events to synchronize model-view bindings or frameworks using two-way data binding. Common scenarios include configuring or controlling selected items dynamically, managing selection state through code, and ensuring UI and data model consistency across filtering and user interactions in components supporting multiple value selections.
</div>

#### Parameters

##### value `Array|String`

The value to set. A *String* value or an *Array of strings* is accepted. To clear the value, pass an empty array.

#### Returns

`Array` The value of the MultiSelect.

#### Example - set value

    <select id="multiselect" multiple="multiple">
        <option value="1">Item1</option>
        <option value="2">Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    // get the value of the multiselect.
    var value = multiselect.value();

    // set the value of the multiselect.
    multiselect.value(["1", "2"]); //select items which have value respectively "1" and "2"
    </script>

> If initial items are lost in attempt to set new values, probably the widget is filtered by the end user, but no value has been selected. You will need to remove applied filter, before calling value method

#### Example - remove applied filter before set the value

    <select id="multiselect" multiple="multiple">
        <option value="1">Item1</option>
        <option value="2">Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect();

    var multiselect = $("#multiselect").data("kendoMultiSelect");

    //clear filter
    multiselect.dataSource.filter({});

    //set value
    multiselect.value(["1", "2"]);
    </script>

## Events

### change

Fired when the value of the widget is changed by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.

> **Important:** The event is not fired when the value of the widget is changed from code.


<div class="meta-api-description">
How do I detect user-initiated selection changes in a Kendo UI MultiSelect widget? Capture and handle user-initiated selection updates in multi-select dropdowns or lists by monitoring change events triggered when choices are made or altered interactively; implement reactive UI updates, state synchronization, dynamic validation, or logic execution in response to user modifications of selected items while excluding programmatic or code-driven value changes, ensuring event handlers operate within the component’s context for seamless integration and responsive interaction tracking in applications where detecting manual selection shifts is essential.
</div>

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      change: function(e) {
        var value = this.value();
        // Use the value of the widget
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_change(e) {
      var value = this.value();
      // Use the value of the widget
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("change", multiselect_change);
    </script>

### close

Fired when the popup of the widget is closed.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
What event is triggered when the dropdown menu in Kendo UI MultiSelect closes? Detect and handle the closing of dropdown menus or popups in multi-select components to trigger actions like cleaning up resources, updating the user interface, managing focus restoration, or running custom logic after the selection panel is dismissed. Listen for or attach event handlers to respond when selection lists, dropdowns, or popups close, enabling control over what happens immediately after the multi-select interface is hidden or dismissed. Capture popup close events to manage UI states, reset visual elements, or perform tasks on close interactions from dropdowns, selection overlays, or modal dismissal in multi-select controls.
</div>

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "close" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      close: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "close" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_close(e) {
      // handle the event
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("close", multiselect_close);
    </script>

### dataBound

Fired when the widget is bound to data from its data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to handle data after it's loaded in Kendo UI MultiSelect control? Trigger actions or execute custom code immediately after a multi-selection control completes loading and rendering data from its source, enabling developers to handle post-data-load scenarios such as updating the user interface, refreshing or presetting selected items, reapplying templates, managing dependent data fetches, or synchronizing state upon data availability; this event fires when the component finishes binding data and provides access to the control instance for configuring behaviors, adjusting selections, or performing UI refreshes right after data is fully loaded and displayed.
</div>

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "dataBound" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      dataBound: function(e) {
          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "dataBound" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_dataBound(e) {
      // handle the event
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("dataBound", multiselect_dataBound);
    </script>

### filtering

Fired when the widget is about to filter the data source.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I control the data filtering process in a Kendo UI MultiSelect? Control, customize, or intercept the data filtering process before executing searches in a multi-selection component by handling events triggered when filter input is processed, allowing inspection and modification of filter text, query parameters, or application of custom filtering logic on user input in real time, enabling developers to dynamically adjust or optimize data queries, update filters programmatically, and integrate conditional or advanced search criteria during multi-select dropdown interactions.
</div>

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

##### e.filter `Object`

The filter descriptor that will be used to filter the data source.

> The data source filters the data items client-side unless the [data source serverFiltering](/api/javascript/data/datasource/configuration/serverfiltering) option is set to `true`.

#### Example - subscribe to the "filtering" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      filter: "startswith",
      filtering: function(e) {
          //get filter descriptor
          var filter = e.filter;

          // handle the event
      }
    });
    </script>

#### Example - subscribe to the "filtering" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_filtering(e) {
      //get filter descriptor
      var filter = e.filter;

      // handle the event
    }
    $("#multiselect").kendoMultiSelect({
      filter: "startswith"
    });
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("filtering", multiselect_filtering);
    </script>

#### Example - prevent filtering event when filter value is empty

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      filter: "startswith",
      filtering: function(e) {
          var filter = e.filter;

          if (!filter.value) {
            //prevent filtering if the filter does not have value
            e.preventDefault();
          }
      }
    });
    </script>

### open

Fired when the popup of the widget is opened by the user.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How to detect when Kendo UI MultiSelect dropdown opens? Detect when a dropdown or popup menu expands or opens in a multi-selection UI component to trigger custom logic such as updating the interface, setting focus, logging analytics, or running scripts right after the selection list becomes visible due to user interaction; capture and respond to events signaling that the popup is displayed, enabling control over post-open behaviors, UI state changes, or dynamic content adjustments associated with opening multi-select dropdowns or selection panels.
</div>

#### Event Data

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "open" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      open: function(e) {
        // handle the event
      }
    });
    </script>

#### Example - subscribe to the "open" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_open(e) {
      // handle the event
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("open", multiselect_open);
    </script>

### select

Fired when an item from the popup is selected by the user.

> **Important:** The event is not fired when an item is selected programmatically.


<div class="meta-api-description">
How can I detect when a user selects an option in a Kendo UI MultiSelect widget? Detect when a user picks or clicks an option from a dropdown or list, capturing selection actions triggered by mouse, touch, or keyboard input to instantly execute custom code or responses on user interaction, while ignoring programmatic changes; listen for user-driven choice events, selection updates, item clicks, or keyboard navigation to handle input selection dynamically in multi-select or dropdown components.
</div>

#### Event Data

##### e.dataItem `Object`

The data item instance of the selected item.

##### e.item `jQuery`

The jQuery object which represents the selected item.

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "select" event during initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      select: function(e) {
        var item = e.item;
        var text = item.text();
        // Use the selected item or its text
      }
    });
    </script>

#### Example - subscribe to the "select" event after initialization

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_select(e) {
      var item = e.item;
      var text = item.text();
      // Use the selected item or its text
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("select", multiselect_select);
    </script>

#### Example - prevent the item selection

    <select id="multiselect" multiple="multiple">
        <option>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      select: function(e) {
        //call preventDefault() to prevent the selection
        e.preventDefault();
      }
    });
    </script>

### deselect

Fired when an item is deselected or tag is removed.

> **Important:** The event is not fired when an item is deselected programmatically.


<div class="meta-api-description">
How can I handle user-initiated deselection in a Kendo UI MultiSelect widget? Detect and handle events triggered when a user removes or unselects items in a multi-selection interface, such as clicking to deselect options or removing tags, enabling developers to capture user-initiated unselection actions, update the user interface, synchronize or manage selection state changes, trigger side effects or callbacks specifically on manual deselection, distinguish between user-triggered and programmatic changes, and respond dynamically to changes in selected items for improved interactivity and state management in multi-select components.
</div>

#### Event Data

##### e.dataItem `Object`

The data item instance of the deselected item/tag.

##### e.item `jQuery`

The jQuery object which represents the deselected item or removed tag element.

##### e.sender `kendo.ui.MultiSelect`

The widget instance which fired the event.

#### Example - subscribe to the "deselect" event during initialization

    <select id="multiselect" multiple="multiple">
        <option selected>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      deselect: function(e) {
        var dataItem = e.dataItem;
        var item = e.item;
        // Use the deselected data item or jQuery item
      }
    });
    </script>

#### Example - subscribe to the "deselect" event after initialization

    <select id="multiselect" multiple="multiple">
        <option selected>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    function multiselect_deselect(e) {
        var dataItem = e.dataItem;
        var item = e.item;
        // Use the deselected data item or jQuery item
    }
    $("#multiselect").kendoMultiSelect();
    var multiselect = $("#multiselect").data("kendoMultiSelect");
    multiselect.bind("deselect", multiselect_deselect);
    </script>

#### Example - prevent the deselection action

    <select id="multiselect" multiple="multiple">
        <option selected>Item1</option>
        <option>Item2</option>
    </select>
    <script>
    $("#multiselect").kendoMultiSelect({
      deselect: function(e) {
        // Call preventDefault() to prevent the deselection
        e.preventDefault();
      }
    });
    </script>
