---
title: Local Binding
page_title: Local Binding
description: "Get started with the {{ site.product }} ListBox and learn how to bind the ListBox to local data."
slug: htmlhelpers_listbox_local_aspnetcore
position: 2
---

# Local Binding

The Telerik UI ListBox for {{ site.framework }} enables you to bind it to local arrays of data.

When you use complex data objects, use the `DataTextField` and `DataValueField` properties to notify the ListBox about your preferred binding behavior.

``` index.cshtml
    @(Html.Kendo().ListBox()
        .Name("optional")
        .Toolbar(toolbar =>
        {
            toolbar.Position(ListBoxToolbarPosition.Right);
            toolbar.Tools(tools => tools
                .MoveUp()
                .MoveDown()
                .TransferTo()
                .TransferFrom()
                .TransferAllTo()
                .TransferAllFrom()
                .Remove()
            );
        })
        .ConnectWith("selected")
        .BindTo(ViewBag.Attendees) // Bind the ListBox to a collection
    )

    @(Html.Kendo().ListBox()
        .Name("selected")
        .BindTo(new List<string>())
        .Selectable(ListBoxSelectable.Multiple)
    )
```
``` IndexController.cs
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using Kendo.Mvc.Examples.Models;
    using Microsoft.AspNetCore.Mvc;

    namespace Kendo.Mvc.Examples.Controllers
    {
        public partial class ListBoxController : BaseController
        {
            public IActionResult Index()
            {
                ViewBag.Attendees = new List<string>
                {
                    "Steven White",
                    "Nancy King",
                    "Nancy Davolio",
                    "Robert Davolio",
                    "Michael Leverling",
                    "Andrew Callahan",
                    "Michael Suyama"
                };

                return View();
            }
        }
    }
```

## See Also

* [Local Data Binding of the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/index)
* [Server-Side API](/api/listbox)
