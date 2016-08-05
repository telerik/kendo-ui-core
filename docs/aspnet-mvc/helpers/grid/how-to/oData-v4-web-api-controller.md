---
title: Use oData v4 with WebAPI Controller
page_title: Use oData v4 with WebAPI Controller | Kendo UI Grid HtmlHelper
description: "Configure the Kendo UI Grid to use the enum type for both displaying and editing."
slug: howto_useodata4webapicontroller_gridaspnetmvc
---

# Use oData v4 with WebAPI Controller

The example below demonstrates how to configure the `dataSource` to communicate with the WebAPI controller through the Odata 4 protocol.

Note that Odata v4 is not fully supported. Your activities when working with Dates are limited because WebAPI does not support the `DateTime` type anymore. When it comes to dates, WebAPI now uses the `DateTimeOffset` time as a main type. However, the `DateTimeOffet` requires the Model (that the dataSource creates) to keep information for both Date and Offset which is not possible with the current architecture of the DataSource and Model of Kendo UI.

To see the example on how to use oData v4 with the WebAPI controller, refer to [this project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/odata-v4-web-api-binding-wrappers).

## See Also

Other articles and how-to examples on the Kendo UI Grid HtmlHelper:

* [Overview of the Grid HtmlHelper]({% slug overview_uploadhelper_aspnetmvc %})
* [How to Bind the Grid to the SignalR Hub]({% slug howto_bindgridtosignalrhub_gridaspnetmv %})
* [How to Export Grid Data in PDF]({% slug howto_exportonpdf_gridaspnetmv %})
* [How to Export Grid Data to Excel]({% slug howto_exportgriddataasexceldocs_gridaspnetmv %})
* [How to Handle Unauthorized Requests with Ajax-Bound Grids]({% slug howto_handleunathorizedrequestsajaxbound_gridaspnetmv %})
* [How to Post Grid Selection to Server]({% slug howto_postselectiontoserver_gridaspnetmv %})
* [How to Preserve the Grid Server Toolbar Template after Using setOptions]({% slug howto_preserveservertemplateaftersetoptions_gridaspnetmv %})
* [How to Use the Sortable to Reorder Grid Rows]({% slug howto_usesortabletoreorder_gridaspnetmv %})

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder]({% slug howto_applycustomrowstylesbasedondata_gridaspnetmvc %}).
