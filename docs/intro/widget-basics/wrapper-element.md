---
title: Widget DOM Element Structure
page_title: Widget DOM Element Structure | Working with Widgets | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery and obtain a reference to the wrapper and element DOM elements provided by each the widgets."
previous_url: /framework/widgets/wrapper-element
slug: widgetwrapperandelement_references_gettingstarted
position: 1
---

# Widget DOM Element Structure

All web Kendo UI widgets keep references to the `element` and `wrapper` DOM elements and all hybrid Kendo UI widgets keep references to the `element` DOM element only.

[`element`](/api/javascript/ui/widget#fields-element) is the element from which the widget is initialized. Depending on the widget, `element` can be visible (for example, in the AutoComplete, Calendar, and DatePicker), or hidden (for example, in the DropDownList and Upload). A reference to this element is also returned by the initialization statement. Obtaining a reference to the `element` of the widget from the widget object is a relatively rare scenario but might be helpful in specific cases especially when you want to avoid hardcoding IDs in jQuery selectors.

[`wrapper`](/api/javascript/ui/widget#fields-wrapper) is the outermost element which is a part of the widget. Depending on the widget and scenario, the `wrapper` might be the same as `element`. For example, if the Grid is initialized from a `<div>`, the two references match; if the Grid is initialized from a `<table>`, then `element` points to `<table>` while `wrapper` points to `<div>`. A reference to the widget wrapper might be needed during DOM or CSS manipulations. For example, to hide a widget, you need to hide the `wrapper`. Hiding the `element` might partially hide the widget or not hide it at all. `wrapper` is also the most suitable HTML node for appending custom CSS classes.

The following example demonstrates how to use the `element` and `wrapper` references.

    <div id="myWindow">...window content...</div>
    <script>
        // Initialize the widget which also returns the widget element.
        var winElement1 = $("#myWindow").kendoWindow( { /*...*/ } ); // Returns div#myWindow as a jQuery object.
        var winObject = $("#myWindow").data("kendoWindow");

        // Other ways to get the widget element.
        var winElement2 = $("#myWindow");
        var winElement3 = $("#myWindow").data("kendoWindow").element; // Returns div#myWindow as a jQuery object.
        var winElement4 = winObject.element;

        // Get the wrapper.
        var winWrapper1 = $("#myWindow").data("kendoWindow").wrapper; // Returns div.k-window as a jQuery object.
        var winWrapper2 = winObject.wrapper; // returns div.k-window as a jQuery object
    </script>

## See Also

* [Using Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Editing Widgets]({% slug kendoui_editing_gettingstarted %})
* [Destroying Widgets]({% slug destroywidgets_kendoui_gettingstarted %})
* [Creating Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Getting Up and Running with Kendo UI (Guide)]({% slug getting_started_installation_kendoui %})
