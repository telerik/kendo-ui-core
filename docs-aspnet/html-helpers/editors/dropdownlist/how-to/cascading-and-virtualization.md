---
title: Cascade DropDownLists with Enabled Virtualization
page_title: Cascade DropDownLists with Enabled Virtualization
description: "Cascade DropDownLists and enable virtualization in ASP.NET MVC applications."
previous_url: /helpers/editors/dropdownlist/how-to/cascading-and-virtualization
slug: howto_cascadeddlenabledvirtualization_ddlaspnetmvc
position: 0
---

# Cascade DropDownLists with Enabled Virtualization

To implement cascading DropDownLists and still virtualize the data requires you to use a custom data source configuration.

It enables the usage of the `DataSourceRequest` and `ToDataSourceResult` methods, which internally parse all filter and page expression information, and apply it directly to the data.

To see the example, refer to the project on how to [cascade the DropDownList with enabled virtualization](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/dropdownlist/KendoDropDownListCascadingAndVirtualization).

## See Also

* [DropDownListBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/DropDownListBuilder)
* [DropDownList Server-Side API](/api/dropdownlist)
