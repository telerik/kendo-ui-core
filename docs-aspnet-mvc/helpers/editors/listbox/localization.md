---
title: Localization
page_title: Localization | Telerik UI ListBox HtmlHelper for ASP.NET MVC
description: "Get started with the Telerik UI ListBox HtmlHelper for ASP.NET MVC and learn about the localization options it supports."
slug: localization_listboxhelper_aspnetmvc
position: 6
---

# Localization

You can customize the `Messages()` for each toolbar command button of the ListBox.

These messages serve as tooltip text when the user hovers over the buttons.

    @(Html.Kendo().ListBox()
        .Name("listbox")
        .Toolbar(toolbar => toolbar.Tools(
            tools => tools
                .MoveUp()
                .MoveDown()
                .TransferTo()
                .TransferFrom()
                .TransferAllTo()
                .TransferAllFrom()
                .Remove()
        ))
        .Messages(messages => messages.Tools(tools => {
            tools.MoveUp("Up");
            tools.MoveDown("Down");
            tools.TransferTo("Move To");
            tools.TransferFrom("Move From");
            tools.Remove("Delete");
        }))
    )

## See Also

* [RTL Support by the ListBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/listbox/right-to-left-support)
* [Server-Side API](/api/listbox)
