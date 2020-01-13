---
title: Templates
page_title: Templates
description: "Use the available templates of the Telerik UI Drawer TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: templates_drawer_aspnetcoretaghelper
position: 4
---

# Templates

To distinguish the items within the template when the user interacts with the Drawer, add the `data-role="drawer-item"` attribute to each item HTML template.

If you wish to add a separator between the drawer items use the `data-role="drawer-separator"` attribute.

The Drawer provides the following configurable templates:
* The main `Template()` method.
* The `Mini(m=>m.Template("<div>Mini Template</div>"))` template.

You can add icons with a span with the `k-icon` class combined with the desired [Kendo UI for jQuery web font icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web#list-of-font-icons) class. To ensure that the icons and text have a sufficient padding, wrap the item template text in a span with class `k-item-text`.

     <kendo-drawer
        name="drawer"
        template="<ul><li data-role='drawer-item'><span class='k-icon k-i-eye'></span><span class='k-item-text'>See More</span></li></ul>"
        mode="push"
        position="left"
        min-height="330">
        <content>
            <h1 class="my-content">Swipe or drag me to the right <span class="k-icon k-i-arrow-chevron-right"></span></h1>
        </content>
     </kendo-drawer>

## See Also

* [Server-Side API](/api/drawer)
