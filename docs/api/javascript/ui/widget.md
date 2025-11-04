---
title: Widget
res_type: api
---

# kendo.ui.Widget

Base class of all Kendo UI widgets. Inherits from [Observable](/api/javascript/observable).

## Fields

### element `jQuery`

The element, from which the widget is initialized. Depending on the widget, it may be visible, such as in the AutoComplete, Calendar, DatePicker, inline Editor and others, or hidden, such as in the DropDownList, classic Editor and Upload. A reference to this element is also returned by the initialization statement.

See [Widget DOM Elements](/intro/widget-basics/wrapper-element) for more information.


<div class="meta-api-description">
How do I access the underlying HTML element of a Kendo UI date picker widget? Retrieve or access the original DOM node, root element, or wrapper tied to a UI component instance to enable direct manipulation, querying, or binding of events after widget setup; configure or interact with the source HTML element underlying controls like date pickers, dropdowns, autocomplete inputs, editors, or upload elements, whether they render as visible or hidden nodes, for tasks such as attaching listeners, changing attributes, triggering updates, or customizing behavior at the base element level.
</div>

#### Example

    <div id="myWindow">...window content...</div>
    <script>
        // initialize the widget, which also returns the widget element
        var winElement1 = $("#myWindow").kendoWindow( { /*...*/ } ); // returns div#myWindow as a jQuery object
        var winObject = $("#myWindow").data("kendoWindow");

        // other ways to get the widget element
        var winElement2 = $("#myWindow");
        var winElement3 = $("#myWindow").data("kendoWindow").element;
        var winElement4 = winObject.element;
    </script>

### wrapper `jQuery`

The outermost element, which is part of the widget. Depending on the widget and the exact scenario, the wrapper and the element may match. For example, if the Grid is initialized from a `<div>`, the two references match. But if the Grid is initialized from a `<table>`, then element points to the `<table>`, while wrapper points to the wrapper `<div>`.

See [Widget DOM Elements](/intro/widget-basics/wrapper-element) for more information.


<div class="meta-api-description">
How to access the outer container element of a Kendo UI widget after it's been rendered? Access or reference the outermost container element or wrapper around a UI component to inspect, manipulate, or interact with the component’s main DOM node after it has been rendered or initialized. This outer wrapper element can be used to control styling, event handling, or layout adjustments and may differ from the core element depending on the initialization context, such as when a component is initialized from different HTML tags. Developers often need to get, set, or query the parent container of a widget or control for tasks like customizing appearance, managing event propagation, or performing dynamic DOM operations on the component’s surrounding element or container node.
</div>

#### Example

    <div id="myWindow">...window content...</div>
    <script>
        // initialize the widget
        $("#myWindow").kendoWindow( { /*...*/ } );

        // get the wrapper
        var winWrapper = $("#myWindow").data("kendoWindow").wrapper; // returns div.k-window as a jQuery object
    </script>

## Methods

### bind

Attaches a handler to an event. Examples and more info can be found in the [bind](/api/javascript/observable#bind) section of the `kendo.Observable` API reference.


<div class="meta-api-description">
How do I add event listeners to a Kendo UI widget? Connect or register event listeners, handlers, or callbacks to user interface elements to respond to specific widget event triggers, monitor interaction data, intercept or modify default event processing, handle multiple event subscriptions on the same UI component, receive access to the originating component’s state and event payload, set up reactive programming patterns, enable dynamic responses to user actions or system events, and control event propagation and behavior through custom functions tied to event names.
</div>

#### Example

    <div id="button"></div>
    <script>
    $("#button").kendoButton({
        click: function() {
            console.log("Button clicked");
        }
    });
    
    var widget = $("#button").data("kendoButton");
    widget.bind("click", function(e) {
        console.log("Additional click handler attached via bind");
    });
    </script>

### destroy

Prepares the widget for safe removal from the DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.


<div class="meta-api-description">
What happens when I call widget.destroy in Kendo UI for jQuery? Remove and clean up interactive UI components by detaching event listeners, clearing data attributes to prevent memory leaks, and recursively disposing of nested child widgets or components to fully release resources and avoid residual references. Enable safe component teardown or destruction in web interfaces by stopping internal event handling, unbinding jQuery data, and triggering cleanup routines for all nested elements, ensuring optimized DOM manipulation and resource management during dynamic UI updates or widget lifecycle termination.
</div>

#### Example

    <div id="dialog"></div>
    <script>
    $("#dialog").kendoDialog({
        title: "Sample Dialog",
        content: "This dialog will be destroyed"
    });
    
    var widget = $("#dialog").data("kendoDialog");
    
    // Later, when you need to remove the widget
    widget.destroy();
    $("#dialog").remove(); // Remove the DOM element
    </script>

### one

Attaches a handler to an event. The handler is executed only once. Examples and more info can be found in the [one](/api/javascript/observable/methods/one) section of the
`kendo.Observable` API reference.


<div class="meta-api-description">
How do I attach an event handler that triggers only once in Kendo UI for jQuery? configure single-use event handlers that trigger only once on the first event occurrence, set callbacks that automatically detach after running to prevent repeated execution, bind one-time listeners on components or widgets for actions that should happen just once without manual removal, enable event handlers that fire a single time and then unregister themselves for efficient event management, implement single-invocation event binding to handle unique or initial events without lingering listeners or memory leaks, control execution of event callbacks with automatic unbinding after the initial trigger to streamline event-driven behavior, attach handlers that respond to the next emitted event exactly once, support one-off event response mechanisms for interactions or state changes that occur a single time during component lifecycle.
</div>

#### Example

    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
        dataSource: [
            { id: 1, name: "John" },
            { id: 2, name: "Jane" }
        ],
        columns: [
            { field: "name", title: "Name" }
        ]
    });
    
    var widget = $("#grid").data("kendoGrid");
    widget.one("dataBound", function(e) {
        console.log("Grid data bound - this handler will only execute once");
    });
    
    // Trigger data binding multiple times - handler only runs once
    widget.dataSource.read();
    widget.dataSource.read();
    </script>

### resize

Readjusts the layout of the widget. For more information, refer to the article on [responsive web design](/styles-and-layout/using-kendo-in-responsive-web-pages).


<div class="meta-api-description">
How to programmatically adjust Kendo UI widget dimensions after container resizing? Trigger layout recalculation and resizing to update component dimensions, rearrange child elements, and refresh responsive visuals after dynamic content changes, container resizing, DOM updates, showing or hiding elements, or CSS modifications. Enable programmatic adjustment of widget measurements and layout without full reinitialization, ensuring accurate rendering and alignment during UI updates, responsive design scenarios, and container visibility toggling. This method helps you control and enforce immediate layout correction and element repositioning in response to any runtime changes affecting component size or structure.
</div>

#### Example

    <div id="chart" style="height: 300px;"></div>
    <script>
    $("#chart").kendoChart({
        title: {
            text: "Sample Chart"
        },
        series: [{
            type: "column",
            data: [10, 20, 30, 40]
        }]
    });
    
    var widget = $("#chart").data("kendoChart");
    
    // Resize the chart when container size changes
    $(window).resize(function() {
        widget.resize();
    });
    
    // Force resize after changing container size
    $("#chart").width(800);
    widget.resize();
    </script>

### setOptions

Allows changing the widget configuration after initialization. Depending on the widget, some properties may not be changed, and the method's implementation varies for each widget.

> In some cases, the `setOptions` method can recreate and rebind the widget instance. Calling `setOptions` in an event handler or the respective widget is not recommended and can cause an endless loop or a JavaScript error.


<div class="meta-api-description">
How to update Kendo UI widget settings dynamically after initialization? Change or update widget settings, adjust component configuration dynamically, modify runtime options, alter parameters after initialization, reconfigure widget behavior on the fly, set or reset configuration properties, apply new options to existing widgets, control component properties during execution, dynamically enable or disable features, configure or override component settings without reloading, update UI widget options programmatically, manage widget customization after creation, avoid infinite loops when changing settings in event handlers, handle components that may recreate or rebind upon option changes.
</div>

#### Parameters

##### newOptions `Object`

The options to be changed or added.

#### Example - use setOptions to change the maximum value of a NumericTextBox

    <input type="number" id="ntb" value="1" />

    <script>

    $(function(){
        $("#ntb").kendoNumericTextBox({
            max: 5
        });

        // ...

        $("#ntb").data("kendoNumericTextBox").setOptions({
            max: 10
        });
    });

    </script>

### trigger

Executes all handlers attached to the given event. More info can be found in the [trigger](/api/javascript/observable/methods/trigger) section of the
`kendo.Observable` API reference.


<div class="meta-api-description">
How can I programmatically trigger events on a Kendo UI widget? Invoke or fire events programmatically to execute all event handlers registered for a specific event on a widget or component, enabling manual triggering of event callbacks, simulating user interactions, calling bound event listeners, and controlling event flow by firing or dispatching events through code without direct user input, useful for testing, automation, or custom event sequencing within user interface elements.
</div>

#### Example

    <div id="slider"></div>
    <script>
    $("#slider").kendoSlider({
        min: 0,
        max: 100,
        value: 50,
        change: function(e) {
            console.log("Slider value changed to: " + e.value);
        }
    });
    
    var widget = $("#slider").data("kendoSlider");
    
    // Manually trigger the change event
    widget.trigger("change", { value: widget.value() });
    
    // Trigger custom event
    widget.bind("customEvent", function(e) {
        console.log("Custom event triggered with data: " + e.data);
    });
    widget.trigger("customEvent", { data: "test data" });
    </script>

### unbind

Remove a previously attached event handler. More info can be found in the [unbind](/api/javascript/observable/methods/unbind) section of the
`kendo.Observable` API reference.


<div class="meta-api-description">
How do I remove event handlers from Kendo UI widgets? Stop or remove event handlers from UI components by detaching or unsubscribing event listeners, disable widget reactions to specific events, control or cancel event callbacks previously attached, manage event binding lifecycle by unregistering handlers, dynamically turn off event responses to prevent code execution on certain triggers, handle unsubscription from observable events, and manipulate event-driven behaviors by disabling or unbinding functions tied to widget events.
</div>

#### Example

    <div id="textbox"></div>
    <script>
    $("#textbox").kendoTextBox({
        change: function(e) {
            console.log("Original change handler");
        }
    });
    
    var widget = $("#textbox").data("kendoTextBox");
    
    // Add additional handler
    var customHandler = function(e) {
        console.log("Custom change handler");
    };
    widget.bind("change", customHandler);
    
    // Remove the custom handler
    widget.unbind("change", customHandler);
    
    // Remove all change handlers
    widget.unbind("change");
    </script>
