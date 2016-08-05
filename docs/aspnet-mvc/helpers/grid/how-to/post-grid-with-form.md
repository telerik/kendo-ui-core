---
title: Post Grid Data with Form
page_title: Post Grid Data with Form | Kendo UI Grid HtmlHelper
description: "Configure the Kendo UI Grid to use the enum type for both displaying and editing."
slug: howto_postgriddatawithform_gridaspnetmv
---

# Post Grid Data with Form

The example below demonstrates how to submit the Grid data items as part of an `Html.Form`.

There are three known limitations:
* All items in the Grid are submitted no matter if they are updated or not.
* Only the items from the current page are submitted.
* Server operations must be disabled&mdash;`ServerOperation(false)`.

To see the example, refer to [this project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/grid/post-grid-with-form).

## See Also

Other articles and how-to examples on the Kendo UI Grid HtmlHelper:

* [Overview of the Grid HtmlHelper]({% slug overview_uploadhelper_aspnetmvc %})
* [How to Apply Custom Row Styles Based on Model Data]({% slug howto_applycustomrrowstylesmodeldata_gridaspnetmv %})
* [How to Bind the Grid to DataTable]({% slug howto_bindgridtodatatable_gridaspnetmvc %})
* [How to Bind the Grid to the SignalR Hub]({% slug howto_bindgridtosignalrhub_gridaspnetmv %})
* [How to Export Grid Data in PDF]({% slug howto_exportonpdf_gridaspnetmv %})
* [How to Export Grid Data to CSV Files]({% slug howto_exportgriddatacsvfile_gridaspnetmv %})
* [How to Export Grid Data to Excel]({% slug howto_exportgriddataasexceldocs_gridaspnetmv %})
* [How to Use the Sortable to Reorder Grid Rows]({% slug howto_usesortabletoreorder_gridaspnetmv %})
* [How to Use UTC on Both Client and Server]({% slug howto_useutctimeonclientandserver_gridaspnetmv %})

For more runnable examples on the Kendo UI Grid in ASP.NET MVC applications, browse its [**How To** documentation folder]({% slug howto_applycustomrowstylesbasedondata_gridaspnetmvc %}).
