---
title: Localization
page_title: ListBox Localization
description: "Get started with the Telerik UI ListBox HtmlHelper for {{ site.framework }} and learn about the localization options it supports."
previous_url: /helpers/editors/listbox/globalization/localization
slug: htmlhelpers_listbox_localization_aspnetcore
position: 2
---

# Localization

You can customize the `Messages()` for each toolbar command button of the ListBox.

These messages serve as tooltip text when the user hovers over the buttons.

```
    @(Html.Kendo().ListBox()
        .Name("optional")
        .DataTextField("ContactName")
        .DataValueField("CustomerID")
        .DataSource(source => source
            .Read(read => read.Action("GetCustomers", "ListBox"))
        )
        .Messages(m=>m.Tools(tools=>
            {
                tools.MoveUp("Promote");
                tools.MoveDown("Demote");
                tools.Remove("Remove Employee");
                tools.TransferTo("Transfer To");
                tools.TransferAllTo("Transfer All To");
                tools.TransferFrom("Transfer From");
                tools.TransferAllFrom("Transfer All From");
            })
        )
        .TemplateId("customer-item-template")
        .Draggable(draggable => draggable.Placeholder("customPlaceholder"))
        .DropSources("selected")
        .ConnectWith("selected")
        .Selectable(ListBoxSelectable.Single)
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

## See Also

* [RTL Support by the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/right-to-left-support)
* [Server-Side API](/api/listbox)
