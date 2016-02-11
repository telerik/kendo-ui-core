---
title: Widget DOM Elements
page_title: Widget DOM Elements  | Kendo UI Getting Started
description: "Learn how to obtain a reference to the Kendo UI widget wrapper and element."
previous_url: /framework/widgets/wrapper-element
slug: widgetwrapperandelement_references_gettingstarted
position: 1
---

# Widget DOM Elements

Each Kendo UI widget instance keeps references to two elements - `element` and `wrapper`. Hybrid Kendo UI widgets have an `element` reference only.

## References

### Element

The `element` is the element from which the widget is initialized. Depending on the widget, it may be visible, such as in the AutoComplete, Calendar, DatePicker and other, or hidden, such as in the DropDownList and Upload. A reference to this element is also returned by the initialization statement.

Also see the [`element`](/api/javascript/ui/widget#fields-element) section in the [widget API](/api/javascript/ui/widget).

### Wrapper

The `wrapper` is the outermost element, which is part of the widget. Depending on the widget and the exact scenario, the wrapper and the element may match. For example, if the Grid is initialized from a `<div>`, the two references match. But if the Grid is initialized from a `<table>`, then `element` points to the `<table>`, while `wrapper` points to the wrapper `<div>`.

Also see the [`wrapper`](/api/javascript/ui/widget#fields-wrapper) section in the [widget API](/api/javascript/ui/widget).

The example below demonstrates how to use the `element` and `wrapper` references.

###### Example

    <div id="myWindow">...window content...</div>
    <script>
        // initialize the widget, which also returns the widget element
        var winElement1 = $("#myWindow").kendoWindow( { /*...*/ } ); // returns div#myWindow as a jQuery object
        var winObject = $("#myWindow").data("kendoWindow");

        // other ways to get the widget element
        var winElement2 = $("#myWindow");
        var winElement3 = $("#myWindow").data("kendoWindow").element; // returns div#myWindow as a jQuery object
        var winElement4 = winObject.element;

        // get the wrapper
        var winWrapper1 = $("#myWindow").data("kendoWindow").wrapper; // returns div.k-window as a jQuery object
        var winWrapper2 = winObject.wrapper; // returns div.k-window as a jQuery object
    </script>

## Usage

A reference to the widget wrapper may be needed when doing DOM or CSS manipulations. For example, to hide a widget, you must hide the `wrapper`. Hiding the `element` may hide the widget partially or not hide it at all. The `wrapper` is also the most suitable HTML node for appending custom CSS classes.

Obtaining a reference to the widget `element` from the widget object is a relatively rare scenario, but may be helpful in some cases, especially when hardcoding IDs in jQuery selectors is not desired.

## See Also

Other articles on Kendo UI widget basics:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Set Data Attributes]({% slug dataattributes_configuration_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Destroy Widgets]({% slug destroywidgets_kendoui_gettingstarted %})
* [Create Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Editing Functionality]({% slug kendoui_editing_gettingstarted %})
