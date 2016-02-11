---
title: Widget
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

### destroy

Prepares the widget for safe removal from the DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

### one

Attaches a handler to an event. The handler is executed only once. Examples and more info can be found in the [one](/api/javascript/observable#methods-one) section of the
`kendo.Observable` API reference.

### setOptions

Allows changing the widget configuration after initialization. Depending on the widget, some properties may not be changed, e.g. ones that influence the widget's HTML output (such as Grid scrollability or columns).

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

Executes all handlers attached to the given event. More info can be found in the [trigger](/api/javascript/observable#methods-trigger) section of the
`kendo.Observable` API reference.

### unbind

Remove a previously attached event handler. More info can be found in the [unbind](/api/javascript/observable#methods-unbind) section of the
`kendo.Observable` API reference.

