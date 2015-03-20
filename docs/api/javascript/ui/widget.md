---
title: Widget
---

# kendo.ui.Widget

Base class of all Kendo UI widgets. Inherits from [Observable](/api/javascript/observable).

## Methods

### bind

Attaches a handler to an event. Examples and more info can be found in the [bind](/api/framework/observable#bind) section of the `kendo.Observable` API reference.

### destroy

Prepares the widget for safe removal from the DOM. Detaches all event handlers and removes `jQuery.data` attributes to avoid memory leaks. Calls destroy method of any child Kendo widgets.

### one

Attaches a handler to an event. The handler is executed only once. Examples and more info can be found in the [one](/api/framework/observable#one) section of the
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

Executes all handlers attached to the given event. More info can be found in the [trigger](/api/framework/observable#trigger) section of the
`kendo.Observable` API reference.

### unbind

Remove a previously attached event handler. More info can be found in the [unbind](/api/framework/observable#unbind) section of the
`kendo.Observable` API reference.

