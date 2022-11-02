---
title: Component DOM Element References
page_title: Component DOM Element References - Working with Components 
description: "Get started with Kendo UI for jQuery and obtain a reference to the wrapper and element DOM elements provided by each the components."
previous_url: /framework/widgets/wrapper-element
slug: widgetwrapperandelement_references_gettingstarted
position: 1
---

# Component DOM Element Structure

All web Kendo UI components (widgets) keep references to the `element` and `wrapper` DOM objects and all hybrid Kendo UI components keep references to the `element` DOM object only.

* [`element`](/api/javascript/ui/widget#fields-element) is the object from which the component is initialized.

  Depending on the component, `element` can be visible (for example, in the AutoComplete, Calendar, and DatePicker), or hidden (for example, in the DropDownList and Upload). A reference to this element is also returned by the initialization statement.

  While obtaining a reference to the `element` of the component from the `widget` object is a relatively rare scenario, it is helpful when you want to avoid hardcoding IDs in jQuery selectors.

* [`wrapper`](/api/javascript/ui/widget#fields-wrapper) is the outermost object which is a part of the component.

  Depending on the component and scenario, `wrapper` might be the same as `element`. For example, if the Grid is initialized from a `<div>`, the two references match; if the Grid is initialized from a `<table>`, then `element` points to `<table>` while `wrapper` points to `<div>`.

  A reference to the component wrapper might be needed during DOM or CSS manipulations. For example, to hide a component, you need to hide the `wrapper`. Hiding the `element` might partially hide the component or not hide it at all. `wrapper` is also the most suitable HTML node for appending custom CSS classes.

The following example demonstrates how to use the `element` and `wrapper` references.

    <div id="myWindow">...window content...</div>
    <script>
        // Initialize the component which also returns the widget element.
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

* [Using Component Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Editing Components]({% slug kendoui_editing_gettingstarted %})
* [Destroying Components]({% slug destroywidgets_kendoui_gettingstarted %})
* [Creating Custom components]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Getting Up and Running with Kendo UI (Guide)]({% slug getting_started_installation_kendoui %})
