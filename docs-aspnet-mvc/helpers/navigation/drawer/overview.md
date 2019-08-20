---
title: Overview
page_title: Drawer | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Kendo UI Drawer HtmlHelper for ASP.NET MVC"
slug: htmlhelpers_drawer_aspnetmvc
position: 1
---

# Drawer HtmlHelper Overview

The Drawer HtmlHelper extension is a server-side wrapper for the [Kendo UI Drawer](https://demos.telerik.com/kendo-ui/drawer/index) widget.

It allows you to configure the Kendo UI Drawer widget from server-side code. The Draweris a dismissible panel used for navigation in responsive web applications or for changing a content of a section in the page.

## Interaction

The drawer widget has two modes of interaction - `overlay`(*default*) and `push` and two positions - `left`(*default*) and `right` which determine the side from which the drawer will appear. It has gesture support and also features `mini` mode which makes the drawer always partly visible and allows the user to reveal its full content either with a gesture or by calling the `show()` method of the widget.

## Display Modes

### Overlay Mode

The `overlay` mode is not associated with any content. The drawer appears on top of the page contents from the side which is configured in the [`Position()`](/api/drawer) method. To show the drawer either swipe or drag with mouse or call the [`show()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer/methods/show) method of the widget. The drawer closes on click/tap of any of the options or on the overlay.

### Push Mode

The `push` mode is associated with specific page content and the element from which the widget is initialized should wrap that content. When the drawer opens it will push that content to the side. It is designed for wider screens (desktop/tablet). To show the drawer either swipe or drag with mouse or call the [`show()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer/methods/show) method of the widget. The drawer closes on click/tap of any of the options or on the associated content.

The height of the widget is determined by the higher content of the two - the template of the widget or the wrapped content it is associated with. The [`MinHeight()`](/api/drawer) method can be used to prevent the content from changing its height as the user toggles the drawer options.

### Mini Mode

The `Mini()` option can be used with both `overlay` and `push` modes by adding a the `Mini()` method. If set to true, the always visible portion of the Drawer will take up the default width of `50px` and the main template. If the `Mini()` configurator is used, the `Width()` and `Template()`/`TemplateId()` can also be changed.

    .Mini(m=>m.Width(500).TemplateId("mini-template"))

## Templates

To distinguish the items within the template when the user interacts with the drawer, add the `data-role="drawer-item"` attribute to each item HTML template. If you wish to add a separator between the drawer items use the `data-role="drawer-separator"` attribute.

The Kendo UI Drawer widget has two configurable templates - the main `Template()` method of the widget and the `Mini(m=>m.Template("<div>Mini Template</div>"))`.

Icons can be added with a span with class `k-icon` combined with the desired [web font icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web#list-of-font-icons) class. To ensure that the icons and text have sufficient padding wrap the item template text in a span with class `k-item-text`.

 Template

    @"<ul>
        <li data-role='drawer-item'>
          <span class='k-icon k-i-eye'></span>
          <span class='k-item-text'>See More</span>
        </li>
    </ul>"

## Basic Usage

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

## Get the Drawer Instance

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

* [UI for ASP.NET MVC API Reference of the Drawer](/api/drawer)
* [JavaScript API Reference of the Drawer](https://docs.telerik.com/kendo-ui/api/javascript/ui/drawer)
* [UI for ASP.NET MVC Demos of the Drawer](https://demos.telerik.com/aspnet-mvc/drawer/index)
