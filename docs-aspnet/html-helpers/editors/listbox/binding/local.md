---
title: Local Binding
page_title: Local Binding
description: "Get started with the {{ site.product }} ListBox and learn how to bind the ListBox to local data."
slug: htmlhelpers_listbox_local_aspnetcore
position: 2
---

# Local Binding

The Telerik UI ListBox for {{ site.framework }} enables you to bind it to local data.

When you use complex data objects, use the `DataTextField` and `DataValueField` properties to notify the ListBox about your preferred binding behavior.

```HtmlHelper
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
        .BindTo(new List<SelectListItem>())
        .Selectable(ListBoxSelectable.Multiple)
    )
```
{% if site.core %}
```TagHelper

    @{
        var tools = new string[] { "moveUp", "moveDown", "transferTo", "transferFrom", "transferAllTo", "transferAllFrom", "remove" };
        var selectedItems = new List<SelectListItem>();
    }

    <kendo-listbox name="optional"
                    connect-with="selected"
                    bind-to="@ViewBag.Attendees">
            <toolbar position="ListBoxToolbarPosition.Right"
                        tools="tools"/>
    </kendo-listbox>
    <kendo-listbox name="selected"
                    bind-to="selectedItems"
                    selectable="ListBoxSelectable.Multiple">
    </kendo-listbox>
```
{% endif %}
```IndexController.cs
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
                ViewBag.Attendees = new List<SelectListItem>
                {
                    new SelectListItem(){ Value = "1", Text = "Steven White" },
                    new SelectListItem(){ Value = "2", Text = "Nancy King" },
                    new SelectListItem(){ Value = "3", Text = "Nancy Davolio" },
                    new SelectListItem(){ Value = "4", Text = "Michael Leverling" },
                    new SelectListItem(){ Value = "5", Text = "Andrew Callahan" },
                    new SelectListItem(){ Value = "6", Text = "Michael Suyama" }
                };

                return View();
            }
        }
    }
```

## See Also

* [Local Data Binding of the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/index)
* [Server-Side API](/api/listbox)
