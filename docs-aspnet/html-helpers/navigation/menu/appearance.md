---
title: Appearance
page_title: Appearance
description: "Learn about the Telerik UI Menu HtmlHelper for {{ site.framework }} rendering and appearance."
components: ["menu"]
slug: appearance_menu
position: 2
---

# Appearance

The Menu renders as a `<ul>` element and expands horizontally by default.

If a horizontal Menu is wider than the total width of its root items, a blank space will remain visible on the right. To remove this space, use the CSS rules from the following example.

```CSS
    #menu-id /* For a specific Menu instance. */
    ,
    .k-menu-horizontal /* For all horizontal Menus. */
    {
       display: inline-block;
    }
```

In left-to-right layouts, shrinking the horizontal Menu will cause the border of the last root item to touch the right border of the Menu. The following example demonstrates how to remove the last item border.

```CSS
    #menu-id > .k-last /* For a specific Menu instance. */
    ,
    .k-menu-horizontal > .k-last /* For all horizontal Menus. */
    {
       border-width: 0;
    }
```

@[template](/_contentTemplates/components-rendering-section.md#components-rendering-section)

## See Also

* [Components Appearance Overview]({% slug components_rendering_overview %})
* [Server-Side API](/api/menu)
{% if site.core %}
* [Server-Side TagHelper API](/api/taghelpers/menu)
{% endif %}
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
