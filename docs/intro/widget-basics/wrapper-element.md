---
title: Widget DOM Elements
page_title: Widget DOM Elements  | Kendo UI Getting Started
description: "Obtain a reference to the Kendo UI widget wrapper and element."
previous_url: /framework/widgets/wrapper-element
slug: widgetwrapperandelement_references_gettingstarted
position: 1
---

# Widget DOM Elements

Each Kendo UI widget instance keeps references to two elements&mdash;`element` and `wrapper`. The hybrid Kendo UI widgets have an `element` reference only.

## References

### Element

The `element` is the element from which the widget is initialized. Depending on the widget, it may be visible&mdash;as in the AutoComplete, Calendar, DatePicker and other&mdash;or hidden&mdash;as in the DropDownList and Upload. A reference to this element is also returned by the initialization statement.

For more information, see the [`element`](/api/javascript/ui/widget#fields-element) section in the [widget API](/api/javascript/ui/widget).

### Wrapper

The `wrapper` is the outermost element, which is a part of the widget. Depending on the widget and the exact scenario, the wrapper and the element might match. For example, if the Grid is initialized from a `<div>`, the two references match. But if the Grid is initialized from a `<table>`, then `element` points to the `<table>`, while `wrapper` points to the wrapper `<div>`.

For more information, see the [`wrapper`](/api/javascript/ui/widget#fields-wrapper) section in the [widget API](/api/javascript/ui/widget).

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

A reference to the widget wrapper might be needed when doing DOM or CSS manipulations. For example, to hide a widget, hide the `wrapper`. Hiding the `element` might partially hide the widget or not hide it at all. The `wrapper` is also the most suitable HTML node for appending custom CSS classes.

Obtaining a reference to the widget `element` from the widget object is a relatively rare scenario, but might be helpful in some cases, especially when hardcoding IDs in jQuery selectors is not desired.

## See Also

Other articles on Kendo UI widget basics:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets Using Markup]({% slug initialize_widgets_using_markup_installation %})
* [Set Data Attributes]({% slug dataattributes_configuration_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Destroy Widgets]({% slug destroywidgets_kendoui_gettingstarted %})
* [Edit Widgets]({% slug kendoui_editing_gettingstarted %})
* [Create Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [NuGet Packages]({% slug kendoui_nuget_packages %})
