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
