---
title: Destroying Widgets
page_title: Destroying Widgets | Working with Widgets | Kendo UI for jQuery
description: "Get started with Kendo UI for jQuery and learn how to destroy the widgets."
previous_url: /framework/widgets/destroy
slug: destroywidgets_kendoui_gettingstarted
position: 6
---

# Destroying Widgets

All Kendo UI widgets provide a `destroy` method.

The `destroy` method:
* Deletes the widget instance (client object). As a result, the widget is no longer accessible and all its event handlers stop working.
* Removes auto-generated HTML content, which is outside the widget&mdash;for example, detached popups and dropdowns. The main HTML of the widget remains intact and if needed, you have to manually remove it from the DOM. The Window widget is an exception because it represents a detached popup on its own.
* Destroys all child widgets with the help of the [`kendo.destroy()` method](/api/framework/kendo#methods-destroy).

Kendo UI provides the following options for destroying widgets:
* [Destroying widgets manually](#destroying-widgets-manually)
* [Destroying widgets automatically](#destroying-widgets-automatically)
* [Destroying widgets that are created through the MVVM pattern](#destroying-mvvm-created-widgets)
* [Destroying multiple widgets](#destroying-multiple-widgets)

## Destroying Widgets Manually

You might need to manually destroy widgets in the following possible cases:
* The widget is no longer needed.
* The widget is placed inside a container, which will be updated through an Ajax request or DOM replacement. Destroying nested widgets in such cases is strongly recommended to prevent memory leaks or other unexpected side effects.
* The widget settings and behavior must be drastically changed, which cannot be achieved through the available API methods.

> Avoid creating a new widget instance from the leftovers of a destroyed widget. To initialize new widgets, use different, newly appended DOM elements. In some cases it is also possible to empty the widget container and initialize a new instance from the empty element.

The following example demonstrates how to destroy and remove a Kendo UI Grid widget.

	<div id="grid"></div>

	<script>
		$("#grid").kendoGrid( { /* configuration */ } ); // Create a Grid widget.

		$("#grid").data("kendoGrid").destroy(); // Destroy the Grid.

        $("#grid").empty(); // Empty the Grid content (inner HTML)
        // or
        $("#grid").remove(); // remove all Grid HTML.
	</script>

<!--*-->
## Destroying Widgets Automatically

The Kendo UI widgets are automatically destroyed when the web page is unloaded.

## Destroying MVVM-Created Widgets

To properly destroy widgets that were [declaratively created]({% slug mvvm_initialization_kendoui %}) through the [Kendo UI MVVM mechanism]({% slug overview_mvvmpattern_kendoui %}):

1. Use the [`kendo.unbind()`](/api/javascript/kendo/methods/unbind) method to remove any MVVM bindings related to the widget.
1. Call [`kendo.destroy()`](/api/javascript/kendo/methods/destroy) for the appropriate container, or the [`destroy()`](/api/javascript/ui/widget/methods/destroy) method of each widget inside this container.

## Destroying Multiple Widgets

In addition to destroying a particular Kendo UI widget, the Kendo UI framework provides a [`kendo.destroy()` method](/api/framework/kendo#methods-destroy), which can destroy multiple widgets that are placed inside a specific container.

## See Also

* [Creating Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Getting Up and Running with Kendo UI (Guide)]({% slug getting_started_installation_kendoui %})
