---
title: Use OData v4 with WebAPI Controller
page_title: Use OData v4 with WebAPI Controller | Kendo UI Grid HtmlHelper
description: "Configure the Kendo UI Grid to use the enum type for both displaying and editing in ASP.NET MVC applications."
slug: howto_useodata4webapicontroller_gridaspnetmvc
---

# Use OData v4 with WebAPI Controller

OData v4 is not fully supported and the approaches to work with Dates are limited because WebAPI does not support the `DateTime` type any more. Instead, WebAPI now uses the `DateTimeOffset` time as a main type when it comes to dates.

However, the `DateTimeOffet` requires the Model (that the dataSource creates) to keep information for both Date and Offset, which is not possible with the current architecture of the DataSource and Model of Kendo UI.

To see the example on how to configure the `dataSource` to communicate with the WebAPI controller through the OData 4 protocol, refer to [this project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/odata-v4-web-api-binding-wrappers).

## See Also

* [Overview of the Grid HtmlHelper]({% slug overview_gridhelper_aspnetmvc %})
* [GridBuilder API Reference](/api/Kendo.Mvc.UI.Fluent/GridBuilder)

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder]({% slug howto_applycustomrowstylesbasedondata_gridaspnetmvc %}).
