---
title: Destroy Widgets
page_title: Destroy Widgets | Kendo UI Getting Started
description: "Destroy Kendo UI widgets."
previous_url: /framework/widgets/destroy
slug: destroywidgets_kendoui_gettingstarted
position: 4
---

# Destroy Widgets

## Overview

Every Kendo UI widget has a `destroy` method which:

1. Deletes the widget instance (client object). It is no longer accessible and all its event handlers stop working.
1. Removes auto-generated HTML content, which is **outside** the widget, e.g. detached popups, dropdowns, etc. The main widget HTML remains intact and if needed, it should be removed from the DOM manually.
The Window widget is an exception, as it represents a detached popup on its own.
1. Destroys all child widgets with the help of [`kendo.destroy()` method](/api/framework/kendo#methods-destroy).

## Destroy Widgets

### Destroy a Widget Manually

You may wish to manually destroy widgets in several possible cases:

* The widget is no longer needed.
* The widget is placed inside a container, which will be updated via an Ajax request or DOM replacement. Destroying nested widgets in such cases is strongly recommended to prevent memory leaks or other unexpected side effects.
* The widget settings and behavior must be drastically changed, which cannot be achieved via available API methods.

> **Important**
>
> Creating a new widget instance from the leftovers of a destroyed widget might work, but is not recommended. Initialize new widgets from different, such as newly appended, DOM elements. In some cases it is also possible to empty the widget container and initialize a new instance from the empty element.

The example below demonstrates how to destroy and remove a Kendo UI Grid widget.

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
### Destroy a Widget Automatically

Kendo UI widgets are destroyed automatically when the web page is unloaded.

### Destroy Multiple Widgets

In addition to destroying a particular Kendo UI widget, the Kendo UI framework provides a [`kendo.destroy()` method](/api/framework/kendo#methods-destroy), which can destroy multiple widgets, which are placed inside a given container.

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
