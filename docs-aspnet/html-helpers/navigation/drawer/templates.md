---
title: Templates
page_title: Templates
description: "Use the available templates of the Telerik UI Drawer HtmlHelper for {{ site.framework }}."
previous_url: /helpers/navigation/drawer/templates
slug: templates_drawer_aspnetcore
position: 4
---

# Templates

To distinguish the items within the template when the user interacts with the Drawer, add the `data-role="drawer-item"` attribute to each item HTML template.

To add a separator between the Drawer items, use the `data-role="drawer-separator"` attribute.

The Drawer provides the following configurable templates:
* The main `Template()` method.
* The `Mini(m=>m.Template("<div>Mini Template</div>"))` template.

You can add icons with a span with the `k-icon` class combined with the desired [Kendo UI for jQuery web font icon](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web#list-of-font-icons) class. To ensure that the icons and text have a sufficient padding, wrap the item template text in a span with class `k-item-text`.

    @"<ul>
        <li data-role='drawer-item'>
          <span class='k-icon k-i-eye'></span>
          <span class='k-item-text'>See More</span>
        </li>
    </ul>"

## See Also

* [Server-Side API](/api/drawer)
