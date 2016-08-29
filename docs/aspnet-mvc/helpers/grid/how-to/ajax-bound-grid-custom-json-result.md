---
title: Use Custom JsonResult with Ajax-Bound Grids
page_title: Use Custom JsonResult with Ajax-Bound Grids | Kendo UI Grid HtmlHelper
description: "Create a custom JSON result to change the default JSON serializer."
slug: howto_usecustomjsonresultajaxbound_gridaspnetmvc
---

# Use Custom JsonResult with Ajax-Bound Grids

The example below demonstrates how to use a custom JSON serializer for the controller and for the server-bound data of the widget. For the controller, this is achieved by overriding the `Json` method. For the widgets, this is achieved through the registration (with the DI) of a custom `IJavaScriptInitializer` implementation on the application `start` event.

To see the example on how to use a custom `JsonResult` with an Ajax-bound Grid, refer to [this project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/ajax-bound-grid-custom-json-result).

## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [GridBuilder API Reference](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/AutoCompleteBuilder)

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder]({% slug howto_applycustomrowstylesbasedondata_gridaspnetmvc %}).
