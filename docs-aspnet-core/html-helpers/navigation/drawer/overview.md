---
title: Overview
page_title: Drawer Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI Drawer HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_drawer_aspnetcore
position: 1
---

# Drawer HtmlHelper Overview

The Telerik UI Drawer HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Drawer widget.

The Drawer is a dismissible panel used for navigation in responsive web applications or for changing a content of a section in the page.

* [Demo page for the Drawer](https://demos.telerik.com/aspnet-core/drawer/index)

## Initializing the Drawer

The following example demonstrates how to define the Drawer by using the Drawer HtmlHelper.

```Razor
    @(Html.Kendo().Drawer()
        .Name("drawer")
        .Template(@"<ul>
                <li data-role='drawer-item'>First Item</li>
                <li data-role='drawer-separator'></li>
                <li data-role='drawer-item'>Second Item</li>
                <li data-role='drawer-item' class='k-state-selected'>Third Item</li>
            </ul>")
        .Mode("push")
        .Position("left")
        .SwipeToOpen(true)
        .Content(@"<div style='height: 200px;'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error accusantium odit, optio nulla maiores quo neque fugit debitis dignissimos incidunt maxime?</div>")
    )
```

## Functionality and Features

* [Display modes]({% slug displaymodes_drawer_aspnetcore %})
* [Interaction modes]({% slug interactionmodes_drawer_aspnetcore %})
* [Templates]({% slug templates_drawer_aspnetcore %})

## Referencing Existing Instances

The following example demonstrates the basic configuration of the Drawer HtmlHelper and how to get the Drawer instance.

```Razor
    @(Html.Kendo().Drawer()
        .Name("drawer")
        .Template(@"<ul>
                <li data-role='drawer-item'>First Item</li>
                <li data-role='drawer-separator'></li>
                <li data-role='drawer-item'>Second Item</li>
            </ul>")
        .Content(@"<div style='height: 200px;'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Error accusantium odit, optio nulla maiores quo neque fugit debitis dignissimos incidunt maxime?</div>")
    )

    <script type="text/javascript">
        $(function () {
            // The Name() of the Drawer is used to get its client-side instance.
            var drawer = $("#drawer").data("kendoDrawer");
            console.log(drawer);
        });
    </script>
```

## See Also

* [Basic Usage of the Drawer HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/drawer)
* [Using the API of the Drawer HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/drawer/api)
* [Server-Side API](/api/drawer)
