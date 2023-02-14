---
title: Destroying Components
page_title: Destroying Components - Working with Components 
description: "Get started with Kendo UI for jQuery and learn how to destroy the components."
previous_url: /framework/widgets/destroy
slug: destroywidgets_kendoui_gettingstarted
position: 6
---

# Destroying Components

All Kendo UI components (widgets) provide a `destroy` method.

The `destroy` method:
* Deletes the component instance (client object). As a result, the component is no longer accessible and all its event handlers stop working.
* Removes auto-generated HTML content, which is outside the component&mdash;for example, detached popups and dropdowns. The main HTML of the component remains intact and if needed, you have to manually remove it from the DOM. The Window component is an exception because it represents a detached popup on its own.
* Destroys all child components with the help of the [`kendo.destroy()` method](/api/framework/kendo#methods-destroy).

Kendo UI provides the following options for destroying components:
* [Destroying components manually](#destroying-components-manually)
* [Destroying components automatically](#destroying-components-automatically)
* [Destroying components that are created through the MVVM pattern](#destroying-mvvm-created-components)
* [Destroying multiple components](#destroying-multiple-components)

## Destroying Components Manually

You might need to manually destroy components in the following possible cases:
* The component is no longer needed.
* The component is placed inside a container, which will be updated through an Ajax request or DOM replacement. Destroying nested components in such cases is strongly recommended to prevent memory leaks or other unexpected side effects.
* The component settings and behavior must be drastically changed, which cannot be achieved through the available API methods.

> Avoid creating a new component instance from the leftovers of a destroyed component. To initialize new components, use different, newly appended DOM elements. In some cases it is also possible to empty the component container and initialize a new instance from the empty element.

The following example demonstrates how to destroy and remove a Kendo UI Grid component.

	<div id="grid"></div>

	<script>
		$("#grid").kendoGrid( { /* configuration */ } ); // Create a Grid component.

		$("#grid").data("kendoGrid").destroy(); // Destroy the Grid.

        $("#grid").empty(); // Empty the Grid content (inner HTML)
        // or
        $("#grid").remove(); // remove all Grid HTML.
	</script>

<!--*-->
## Destroying Components Automatically

The Kendo UI components are automatically destroyed when the web page is unloaded.

## Destroying MVVM-Created Components

To properly destroy components that were [declaratively created]({% slug mvvm_initialization_kendoui %}) through the [Kendo UI MVVM mechanism]({% slug overview_mvvmpattern_kendoui %}):

1. Use the [`kendo.unbind()`](/api/javascript/kendo/methods/unbind) method to remove any MVVM bindings related to the component.
1. Call [`kendo.destroy()`](/api/javascript/kendo/methods/destroy) for the appropriate container, or the [`destroy()`](/api/javascript/ui/widget/methods/destroy) method of each component inside this container.

## Destroying Multiple Components

In addition to destroying a particular Kendo UI component, the Kendo UI framework provides a [`kendo.destroy()` method](/api/framework/kendo#methods-destroy), which can destroy multiple components that are placed inside a specific container.

## See Also

* [Creating Custom Components]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Getting Up and Running with Kendo UI (Guide)]({% slug getting_started_installation_kendoui %})
