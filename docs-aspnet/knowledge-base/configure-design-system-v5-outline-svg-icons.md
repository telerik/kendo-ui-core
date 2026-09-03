---
title: How to configure Telerik Design System v5 outline SVG icons globally
description: "Configure Design System v5 outline SVG icons globally in Telerik UI for ASP.NET Core with Tag Helpers."
type: how-to
page_title: Configuring Telerik Design System v5 Outline SVG Icons Globally
slug: configure-design-system-v5-outline-svg-icons
tags: asp.net core, svg icons, tag helpers, design system
ticketid: 1717313
ticketed: true
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }}</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>2026.1.415</td>
 </tr>
</table>

## Description

This article explains how to configure Telerik Design System v5 outline SVG icons globally in a Telerik UI for ASP.NET Core application. It also shows how to render the icons where Tag Helpers are unavailable.

## Solution

### Configure v5 Outline SVG Icons Globally

Add the `kendo-svg-icons` script to the application layout. Place it after the Kendo UI scripts are available and before the application initializes Telerik components.

```Razor
<script src="https://cdn.jsdelivr.net/npm/@@progress/kendo-svg-icons@5.0.0/dist/index.min.js"></script>
<script>
    kendo.ui.svgIcons = window.KendoSVGIcons;
</script>
```

The assignment replaces the default SVG icon collection with the Design System v5 outline collection. Components that render SVG icons then use the v5 icons globally.

### Use the Icons with the Button

The following examples use the `menu` icon.

```HtmlHelper
@using Kendo.Mvc.UI

@(Html.Kendo().Button()
    .Name("menuButton")
    .Icon("menu")
    .FillMode(ButtonFillMode.Flat)
    .Content("Menu")
)
```

{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<kendo-button name="menuButton"
              icon="menu"
              fill-mode="ButtonFillMode.Flat">
    Menu
</kendo-button>
```
{% endif %}

### Render Icons Where Tag Helpers Are Unavailable

Use the `kendo.ui.icon` method in Kendo Templates, JavaScript, or plain HTML scenarios. Set the `type` option to `svg` when you want to explicitly request SVG rendering.

The following example renders the `x` icon inside a plain HTML button.

```HTML
<button class="k-button k-button-flat k-icon-button">
    <span id="drawerCloseIcon"></span>
</button>

<script>
    kendo.syncReady(function () {
        kendo.ui.icon($("#drawerCloseIcon"), { icon: "x", type: "svg" });
    });
</script>
```

When the global icon type is already SVG, you can omit the `type` option.

### Custom SVG Icons

To use a custom SVG icon, define an icon object with a `viewBox` and `content`, then add it to the `kendo.ui.svgIcons` collection before rendering it. Reference the collection key with the `icon` option of `kendo.ui.icon` or a component's `icon` configuration.

For the icon object format, refer to the [SVG Icons]({% slug svgicons_core_mvc %}) documentation.

## See Also

- [SVG Icons]({% slug svgicons_core_mvc %})
- [Providing Client-Side Resources]({% slug copyclientresources_aspnetmvc6_aspnetmvc %})
- [Button Icons]({% slug icons_button_aspnetcore %})