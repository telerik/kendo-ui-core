---
title: Overview
page_title: Data Binding
description: "Get started with the {{ site.product }} ListBox and learn how to bind the ListBox to local or remote data."
previous_url: /helpers/editors/listbox/data-binding
slug: htmlhelpers_listbox_databinding_aspnetcore
position: 1
---

# Data Binding Overview

By default, the Telerik UI ListBox for {{ site.framework }} automatically binds to data.

Immediately after the ListBox loads, the [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) sends a query and the data is loaded to the helper. To disable this behavior, set the `AutoBind` option of the ListBox to `false`.

```
    @(Html.Kendo().ListBox()
        .Name("optional")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .DataSource(source => source
            .Read(read => read.Action("GetCustomers", "ListBox"))
        )
        .TemplateId("customer-item-template")
        .Draggable(draggable => draggable.Placeholder("customPlaceholder"))
        .DropSources("selected")
        .ConnectWith("selected")
        .AutoBind(false) // Prevent data binding during the initialization of the widget
        .Toolbar(toolbar =>
        {
            toolbar.Position(ListBoxToolbarPosition.Right);
            toolbar.Tools(tools => tools
                .TransferTo()
                .Remove());
        })
        .BindTo(new List<CustomerViewModel>())
    )
```

For more information about binding the ListBox to data, refer to the articles on:
* [Local data binding]({% slug htmlhelpers_listbox_local_aspnetcore %})
* [Remote data binding]({% slug htmlhelpers_listbox_remote_aspnetcore %})

## See Also

* [Basic Usage of the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/index)
* [Server-Side API](/api/listbox)
