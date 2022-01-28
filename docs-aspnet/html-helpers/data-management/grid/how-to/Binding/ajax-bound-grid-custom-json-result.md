---
title: Use Custom JsonResult with Ajax-Bound Grids
page_title: Use Custom JsonResult with Ajax-Bound Grids
description: "Create a custom JSON result to change the default JSON serializer."
previous_url: /helpers/data-management/grid/how-to/Binding/ajax-bound-grid-custom-json-result
slug: howto_usecustomjsonresultajaxbound_gridaspnetmvc
---

# Use Custom JsonResult with Ajax-Bound Grids

This example demonstrates how to use a custom JSON serializer for the controller and for the server-bound data of the widget.

For the controller, this is achieved by overriding the `Json` method. For the widgets, this is achieved through the registration (with the ID) of a custom `IJavaScriptInitializer` implementation on the application `start` event.

To see the example, refer to the project on how to [use a custom `JsonResult` with an Ajax-bound Grid](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/ajax-bound-grid-custom-json-result).

## See Also

* [Overview of the Grid HtmlHelper]({% slug htmlhelpers_grid_aspnetcore_overview %})
* [GridBuilder API Reference](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/GridBuilder)
