---
title: Destroying Helpers
page_title: Destroying Widgets
description: "Get started with Telerik UI for ASP.NET Core and learn how to destroy the HTML and Tag Helpers."
slug: destroyhelpers_core
position: 4
permalink: /getting-started/helper-basics/destroy
---

# Destroying Helpers

The client objects of all Telerik UI for ASP.NET Core helpers provide a `destroy` method.

The `destroy` method:
* Deletes the helper instance (client object). As a result, the instance is no longer accessible and all its event handlers stop working.
* Removes auto-generated HTML content, which is outside the helper&mdash;for example, detached popups and dropdowns. The main HTML of the helper remains intact and if needed, you have to manually remove it from the DOM. The Window helper is an exception because it represents a detached popup on its own.
* Destroys all child helpers with the help of the [`kendo.destroy()` method](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/destroy).

Telerik UI for ASP.NET Core provides the following options for destroying helpers:
* [Destroying helpers manually](#destroying-helpers-manually)
* [Destroying helpers automatically](#destroying-helpers-automatically)
* [Destroying multiple helpers](#destroying-multiple-helpers)

## Destroying Helpers Manually

You might need to manually destroy helpers in the following possible cases:
* The helper is no longer needed.
* The helper is placed inside a container, which will be updated through an Ajax request or DOM replacement. Destroying nested helper in such cases is strongly recommended to prevent memory leaks or other unexpected side effects.
* The helper settings and behavior must be drastically changed, which cannot be achieved through the available API methods.

The following example demonstrates how to destroy and remove a Grid helper.

	<script>
		$(document).ready(function () {
			$("#grid").data("kendoGrid").destroy(); // Get a reference to an existing Grid instance and destroy the Grid.

			$("#grid").empty(); // Empty the Grid content (inner HTML)
			// or
			$("#grid").remove(); // remove all Grid HTML.
		});
	</script>

## Destroying Helpers Automatically

The Telerik UI for ASP.NET Core helpers are automatically destroyed when the web page is unloaded.

## Destroying Multiple Helpers

In addition to destroying a particular Telerik UI for ASP.NET Core helper, the Kendo UI framework provides a [`kendo.destroy()` method](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/destroy), which can destroy multiple UI for ASP.NET helpers or Kendo UI widgets that are placed inside a specific container.

## See Also

* [First Steps on Visual Studio for Windows (Online Guide)]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [First Steps on Visual Studio for Mac (Online Guide)]({% slug gettingstarted_firststeps_vsmac %})
* [First Steps with CLI (Online Guide)]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
