---
title: Destroying Widgets
page_title: Destroying Widgets | Kendo UI Getting Started
description: "Destroy Kendo UI widgets."
previous_url: /framework/widgets/destroy
slug: destroywidgets_kendoui_gettingstarted
position: 4
---

# Destroying Widgets

Every Kendo UI widget features a `destroy` method.

## Overview

The `destroy` method of the Kendo UI widgets:

* Deletes the widget instance (client object). It is no longer accessible and all its event handlers stop working.
* Removes auto-generated HTML content, which is outside the widget&mdash;for example, detached popups and dropdowns. The main HTML of the widget remains intact and if needed, you have to manually remove it from the DOM. The Window widget is an exception because it represents a detached popup on its own.
* Destroys all child widgets with the help of the [`kendo.destroy()` method](/api/framework/kendo#methods-destroy).

## Options

It is possible for you to:
* [Destroy widgets manually](#destroy-widgets-manually).
* [Destroy widgets automatically](#destroy-widgets-automatically).
* [Destroy widgets that are created through the MVVM pattern](#destroy-widgets-created-through-mvvm).
* [Destroy multiple widgets](#destroy-multiple-widgets).

### Destroy Widgets Manually

You might need to manually destroy widgets in the following possible cases:

* The widget is no longer needed.
* The widget is placed inside a container, which will be updated through an Ajax request or DOM replacement. Destroying nested widgets in such cases is strongly recommended to prevent memory leaks or other unexpected side effects.
* The widget settings and behavior must be drastically changed, which cannot be achieved through the available API methods.

> **Important**
>
> Avoid creating a new widget instance from the leftovers of a destroyed widget. To initialize new widgets, use different, newly appended DOM elements. In some cases it is also possible to empty the widget container and initialize a new instance from the empty element.

The following example demonstrates how to destroy and remove a Kendo UI Grid widget.

###### Example

	<div id="grid"></div>

	<script>
		$("#grid").kendoGrid( { /* configuration */ } ); // create a Grid widget

		$("#grid").data("kendoGrid").destroy(); // destroy the Grid

        $("#grid").empty(); // empty the Grid content (inner HTML)
        // or
        $("#grid").remove(); // remove all Grid HTML
	</script>

<!--*-->
### Destroy Widgets Automatically

The Kendo UI widgets are destroyed automatically when the web page is unloaded.

### Destroy Widgets Created through MVVM

To properly destroy widgets [created declaratively]({% slug dataattributes_configuration_installation %}) through the [Kendo UI MVVM mechanism]({% slug overview_mvvmpattern_kendoui %}), first use the [`kendo.unbind()`](/api/javascript/kendo#methods-unbind) method to remove any MVVM bindings related to the widget, and then call [`kendo.destroy()`](/api/framework/kendo#methods-destroy) for the appropriate container, or the [`destroy()`](/api/javascript/ui/widget#methods-destroy) method of each widget inside this container.

### Destroy Multiple Widgets

In addition to destroying a particular Kendo UI widget, the Kendo UI framework provides a [`kendo.destroy()` method](/api/framework/kendo#methods-destroy), which can destroy multiple widgets that are placed inside a specific container.

## See Also

Other articles on Kendo UI widget basics:

* [Get Started with Kendo UI]({% slug getting_started_installation_kendoui %})
* [Kendo UI CDN Services]({% slug kendoui_cdn_services_installation %})
* [Include Only What You Need]({% slug include_only_what_you_need_kendoui_installation %})
* [JavaScript Prerequisites]({% slug javascript_prerequisites_kendoui_installation %})
* [Initialize Widgets Using jQuery Plug-Ins]({% slug initialize_widgets_using_jquery_plugins_installation %})
* [Initialize Widgets Using Markup]({% slug initialize_widgets_using_markup_installation %})
* [Access Widget DOM Elements: wrapper and element]({% slug widgetwrapperandelement_references_gettingstarted %})
* [Set Data Attributes]({% slug dataattributes_configuration_installation %})
* [Widget Methods and Events]({% slug widget_methodsand_events_kendoui_installation %})
* [Edit Widgets]({% slug kendoui_editing_gettingstarted %})
* [Create Custom Widgets]({% slug createcustomkendouiwidgets_gettingstarted %})
* [Bower Packages]({% slug kendoui_bower_packages_kendoui_installation %})
* [NuGet Packages]({% slug kendoui_nuget_packages %})
