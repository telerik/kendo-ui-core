---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Drawer HtmlHelper for {{ site.framework }}."
previous_url: /helpers/navigation/drawer/overview
slug: htmlhelpers_drawer_aspnetcore
position: 1
---

# Drawer HtmlHelper Overview

The Telerik UI Drawer HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Drawer widget.

The Drawer is a dismissible panel used for navigation in responsive web applications or for changing a content of a section in the page.

* [Demo page for the Drawer](https://demos.telerik.com/{{ site.platform }}/drawer/index)

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

The following example demonstrates how to get the Drawer instance.

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

* [Basic Usage of the Drawer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/drawer)
* [Using the API of the Drawer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/drawer/api)
* [Server-Side API](/api/drawer)
