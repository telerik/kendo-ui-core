---
title: SegmentedControl
page_title: jQuery SegmentedControl Documentation | Configuration, Methods, Events
description: Get started with code examples for the jQuery SegmentedControl by Kendo UI and learn how to use methods and which events to set once the widget detail is initialized.
res_type: api
component: segmentedcontrol
---

# kendo.ui.SegmentedControl

Represents the Kendo UI SegmentedControl widget. Inherits from [Widget](/api/javascript/ui/widget).

## Configuration

### enabled `Boolean` *(default: true)*

Configures whether the SegmentedControl will be enabled or disabled.


<div class="meta-api-description">
How do I enable or disable a Kendo UI SegmentedControl widget? Control the enabled or disabled state of the segmented control component during initialization, set the widget to inactive mode by toggling its enabled property. How can I make the SegmentedControl non-interactive?
</div>

#### Example - disable the widget

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      enabled: false,
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" }
      ]
    });
    </script>

### items `Array`  *(default: [])*

Configures the different buttons that will be rendered inside the SegmentedControl.


<div class="meta-api-description">
How do I configure the buttons or segments in a Kendo UI SegmentedControl? Define, set, or populate the list of selectable options, buttons displayed in the segmented control by providing an array of item objects, where each item specifies its label text, value, icon, and enabled state. Add, remove, or customize the individual segment buttons rendered in the component by configuring the items array during initialization, enabling developers to control the number of buttons, their labels, associated values, and visual appearance.
</div>

#### Example - set the items

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" }
      ]
    });
    </script>

### items.enabled `Boolean` *(default: true)*

Configures whether an individual button can be enabled or disabled.


<div class="meta-api-description">
How do I disable a specific button in a Kendo UI SegmentedControl? Control the enabled or disabled state of individual segment buttons independently, prevent specific options from being selected or clicked while leaving other segments interactive, toggle individual item availability within the segmented control, and configure per-item disabled state to restrict user interaction with certain segments while the rest of the widget remains functional.
</div>

#### Example - disable a specific item

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2", enabled: false },
        { text: "Option 3", value: "option3" }
      ]
    });
    </script>

### items.icon `String` *(default: null)*

Defines the name for an existing icon in a Kendo UI theme or SVG content. The icon is rendered inside the button.


<div class="meta-api-description">
How do I add an icon to a segment button in a Kendo UI SegmentedControl? Set or configure a visual icon for individual segment buttons by specifying an icon name from the Kendo UI icon set or providing SVG content, display icons alongside text labels in segmented control buttons, customize the visual representation of each segment with theme-compatible icons, and enhance the user interface by combining text and iconography within the segmented control items.
</div>

#### Example - set an icon for an item

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Settings", icon: "gear", value: "settings" },
        { text: "Home", icon: "home", value: "home" }
      ]
    });
    </script>

### items.iconClass `String` *(default: null)*

If set, value will be appended to the icon's element class attribute.


<div class="meta-api-description">
How do I add custom CSS classes to a segment button icon in a Kendo UI SegmentedControl? Customize the appearance of the icon rendered inside a segment button by appending additional CSS class names to the icon element, enabling developers to apply custom styling, override default icon styles, add animation classes, or integrate with external CSS frameworks for fine-grained control over icon presentation within the segmented control.
</div>

#### Example - set a custom icon class

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Settings", icon: "gear", value: "settings", iconClass: "customClass" },
        { text: "Home", icon: "home", value: "home" }
      ]
    });
    </script>

### items.text `String` *(default: null)*

If set, the text will be rendered as the button label.


<div class="meta-api-description">
How do I set the text label for a segment button in a Kendo UI SegmentedControl? Define or configure the visible text content displayed on each segment button by setting the text property of an item, control the label shown to users for each selectable option in the segmented control, and customize the display names of individual segments to provide meaningful labels that help users identify and choose between the available options.
</div>

#### Example - set the text of items

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" }
      ]
    });
    </script>

### items.value `String` *(default: null)*

Specifies the value that will act as an identifier for the button. Will be supplemented as a data-value attribute.


<div class="meta-api-description">
How do I set the value identifier for a segment button in a Kendo UI SegmentedControl? Assign a unique value to each segment button that acts as an identifier for programmatic selection, event handling, and data retrieval, configure the data-value attribute of segment buttons, use the value to programmatically select or identify specific segments, and retrieve the currently selected segment by its value through the select method.
</div>

#### Example - set the value of items

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" }
      ]
    });
    </script>

### layoutMode `String` *(default: "compact")*

Specifies the layout mode of the SegmentedControl.
- `compact` - Each segment width is determined by its content.
- `stretch` - Expands to fill the width of its container and all segments are equal width.

<div class="meta-api-description">
How do I make a Kendo UI SegmentedControl stretch to fill its container? Control the layout behavior of the segmented control by switching between compact and stretch modes, configure equal-width segments that fill the container, set the segmented control to auto-size buttons based on their content, toggle between content-driven and container-driven width allocation for segments, and determine whether segments have equal widths or variable widths based on their label length.
</div>

#### Example - set stretch layout mode

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      layoutMode: "stretch",
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" }
      ]
    });
    </script>

### selectedValue `String` *(default: null)*

The selected value of the component. Must match the value of one of the items.

<div class="meta-api-description">
How do I set the initially selected segment in a Kendo UI SegmentedControl? Configure the default selected button or option during initialization by specifying the value of the item that should be pre-selected, control which segment appears active when the widget first renders, set the starting selection state of the segmented control, and define the initially highlighted option that corresponds to a specific item value.
</div>

#### Example - set the selected value

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      selectedValue: "option2",
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" },
        { text: "Option 3", value: "option3" }
      ]
    });
    </script>

### size `String` *(default: undefined)*

Controls the size of the different buttons. When `undefined` (the default), the theme controls the size. Can also be set to the following string values:

- "small"
- "medium"
- "large"

<div class="meta-api-description">
How do I change the size of a Kendo UI SegmentedControl? Configure the overall size of the segmented control buttons by setting the size property to small, medium, or large, adjust the visual scale of segments to match the surrounding UI density, control button padding and font sizing within the segmented control, and choose between compact and spacious segment button dimensions to fit different layout requirements.
</div>

#### Example - set a large size

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      size: "large",
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" }
      ]
    });
    </script>

## Methods

### destroy

Prepares the widget for safe removal from DOM. Detaches all event handlers and removes jQuery.data attributes to avoid memory leaks.


<div class="meta-api-description">
How do I properly remove or clean up a Kendo UI SegmentedControl widget? Destroy the segmented control instance to release memory, unbind event handlers, remove DOM references, and clean up jQuery data attributes before removing the element from the page, ensuring no memory leaks or ghost event handlers persist after the widget is no longer needed.
</div>

#### Example - destroy the widget

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" }
      ]
    });
    var segmentedControl = $("#segmentedControl").data("kendoSegmentedControl");
    segmentedControl.destroy();
    </script>

### enable

Enables or disables the widget.


<div class="meta-api-description">
How do I programmatically enable or disable a Kendo UI SegmentedControl after initialization? Toggle the interactive state of the segmented control at runtime, dynamically enable or disable the entire widget based on application logic, prevent user interaction by disabling the control, re-enable a previously disabled segmented control, and manage the availability of the widget for user selection after it has been created.
</div>

#### Parameters

##### enable `Boolean`

If set to `false`, the widget will be disabled. If set to `true`, the widget will be enabled. If omitted, the widget will be enabled.

#### Example - disable the widget

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" }
      ]
    });
    var segmentedControl = $("#segmentedControl").data("kendoSegmentedControl");
    segmentedControl.enable(false);
    </script>

### focus

Focuses the SegmentedControl if no argument is provided. Or focuses on a specific item if an item index or jQuery element is supplemented.


<div class="meta-api-description">
How do I programmatically focus a Kendo UI SegmentedControl or a specific segment button? Set keyboard focus to the segmented control widget or to a specific button within it by index or jQuery reference, move focus to a particular segment for keyboard navigation, programmatically activate focus indicators on specific items, and manage focus state for accessibility and keyboard interaction scenarios.
</div>

#### Parameters

##### item `Number|jQuery` *(optional)*

The index of the item to focus, or a jQuery object representing the button element. If omitted, focuses the first enabled button.

#### Example - focus a specific item by index

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" },
        { text: "Option 3", value: "option3" }
      ]
    });
    var segmentedControl = $("#segmentedControl").data("kendoSegmentedControl");
    segmentedControl.focus(1);
    </script>

### item

Gets the item DOM element by index.


<div class="meta-api-description">
How do I get a specific segment button element by its index in a Kendo UI SegmentedControl? Retrieve the DOM element of a particular segment button by its zero-based index position, access individual button elements for custom manipulation or inspection, get a jQuery reference to a specific segment within the control for programmatic styling or attribute reading.
</div>

#### Parameters

##### index `Number`

The zero-based index of the item.

#### Returns

`jQuery` the item found at the specified index.

#### Example - get the second item

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" }
      ]
    });
    var segmentedControl = $("#segmentedControl").data("kendoSegmentedControl");
    var secondItem = segmentedControl.item(1);
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(secondItem.attr("data-value"));
    </script>

### items

Gets the DOM elements of all items in a jQuery collection.


<div class="meta-api-description">
How do I get all segment button elements from a Kendo UI SegmentedControl? Retrieve a jQuery collection of all button DOM elements rendered inside the segmented control, access the full set of segment buttons for iteration, inspection, or custom manipulation, and get references to all items in the widget for programmatic operations such as counting segments or applying batch changes.
</div>

#### Returns

`jQuery` the items in the SegmentedControl.

#### Example - get all items

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" },
        { text: "Option 3", value: "option3" }
      ]
    });
    var segmentedControl = $("#segmentedControl").data("kendoSegmentedControl");
    var allItems = segmentedControl.items();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(allItems.length);
    </script>

### select

Gets or sets the selected value. If called without arguments, returns the currently selected value. If called with a value, selects the item with the matching value.


<div class="meta-api-description">
How do I get or set the selected value in a Kendo UI SegmentedControl? Programmatically select a specific segment by its value, retrieve the currently active or selected option, change the selection state at runtime, read the selected item value for form submission, and control which segment appears as selected through the API. How do I check which segment is currently selected?
</div>

#### Parameters

##### value `String` *(optional)*

The value of the item to select. If omitted, the method returns the currently selected value.

#### Returns

`String` the selected value when used as a getter.

#### Example - select an item

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      selectedValue: "option1",
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" }
      ]
    });
    var segmentedControl = $("#segmentedControl").data("kendoSegmentedControl");
    segmentedControl.select("option2");
    </script>

#### Example - get the selected value

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      selectedValue: "option1",
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" }
      ]
    });
    var segmentedControl = $("#segmentedControl").data("kendoSegmentedControl");
    var selected = segmentedControl.select();
	/* The result can be observed in the DevTools(F12) console of the browser. */
    console.log(selected);
    </script>

### setOptions

Redraws the widget with the new options. Accepts the same configuration options as the widget constructor.


<div class="meta-api-description">
How do I redraw or reconfigure a Kendo UI SegmentedControl after initialization? Change the widget configuration dynamically at runtime by providing new options, update the items, layout mode, size, or selected value without destroying and recreating the widget, refresh the segmented control appearance and behavior by applying a new set of configuration options programmatically.
</div>

#### Parameters

##### options `Object`

The new configuration options.

#### Example - change the items and layout mode

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" }
      ]
    });
    var segmentedControl = $("#segmentedControl").data("kendoSegmentedControl");
    segmentedControl.setOptions({
      layoutMode: "stretch",
      items: [
        { text: "Alpha", value: "alpha" },
        { text: "Beta", value: "beta" }
      ],
      selectedValue: "beta"
    });
    </script>

## Events

### change

Fires when the user changes a button selection in the SegmentedControl.

The event handler function context (available via the `this` keyword) will be set to the widget instance.


<div class="meta-api-description">
How do I handle selection changes in a Kendo UI SegmentedControl? Respond to user interactions when a different segment is selected, bind event handlers to detect when the active option changes, execute custom logic when the user clicks or activates a different segment button, intercept and optionally prevent selection changes, access the newly selected value and item data in the event handler, and take actions based on which segment the user chose.
</div>

#### Event Data

##### e.item `Object`

The item data object of the selected button.

##### e.value `String`

The value of the selected button.

##### e.preventDefault `Function`

If invoked, prevents the selection change.

##### e.sender `kendo.ui.SegmentedControl`

The widget instance which fired the event.

#### Example - subscribe to the "change" event during initialization

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" },
        { text: "Option 3", value: "option3" }
      ],
      change: function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.value);
      }
    });
    </script>

#### Example - subscribe to the "change" event after initialization

    <div id="segmentedControl"></div>
    <script>
    $("#segmentedControl").kendoSegmentedControl({
      items: [
        { text: "Option 1", value: "option1" },
        { text: "Option 2", value: "option2" },
        { text: "Option 3", value: "option3" }
      ]
    });
    var segmentedControl = $("#segmentedControl").data("kendoSegmentedControl");
    segmentedControl.bind("change", function(e) {
	/* The result can be observed in the DevTools(F12) console of the browser. */
        console.log(e.item);
    });
    </script>
