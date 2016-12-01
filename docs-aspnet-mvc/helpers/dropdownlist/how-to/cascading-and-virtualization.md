---
title: Cascade DropDownLists with Enabled Virtualization
page_title: Cascade DropDownLists with Enabled Virtualization | Kendo UI DropDownList HtmlHelper
description: "Cascade DropDownLists and enable virtualization in ASP.NET MVC applications."
slug: howto_cascadeddlenabledvirtualization_ddlaspnetmvc
---

# Cascade DropDownLists with Enabled Virtualization

The demo below demonstrates how to cascade DropDownList widgets and still virtualize the data. The implementation is simple, because in the case of virtualization a custom data source configuration is used. It enables the usage of the `DataSourceRequest` and `ToDataSourceResult` methods, which internally parse all filter and page expression information, and apply it directly to the data.

To see the example, refer to the GitHub repo on how to [cascade the DropDownList with enabled virtualization](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/dropdownlist/KendoDropDownListCascadingAndVirtualization).

## See Also

Other articles and how-to examples on the Kendo UI DropDownList HtmlHelper:

* [Overview of the DropDownList HtmlHelper]({% slug overview_dropdownlisthelper_aspnetmvc %})
* [DropDownListBuilder API Reference](/api/Kendo.Mvc.UI.Fluent/DropDownListBuilder)

For more runnable examples on the Kendo UI DropDownLists in ASP.NET MVC applications, browse its [**How To** documentation folder]({% slug howto_handlecascadingddlsingrid_ddlaspnetmvc %}).
