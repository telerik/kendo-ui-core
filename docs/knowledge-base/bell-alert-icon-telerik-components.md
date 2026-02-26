---
title: Creating a Bell Alert Icon Using Telerik Components
description: Learn how to create a bell alert icon using Telerik components with Kendo icons and the Badge component.
type: how-to
page_title: How to Make a Bell Alert Icon with Telerik Components
meta_title: How to Make a Bell Alert Icon with Telerik Components
slug: bell-alert-icon-telerik-components
tags: asp.net core, icon, badge, kendo ui, styling
res_type: kb
ticketid: 1710173
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>UI for ASP.NET Core</td>
</tr>
<tr>
<td>Version</td>
<td>2026.1.212</td>
</tr>
</tbody>
</table>

## Description

I want to create a bell alert icon using Telerik components instead of using custom SVG code. I would like to know if there is an easy way to achieve this using Kendo UI features.

This knowledge base article also answers the following questions:
- How can I design a notification bell icon with Telerik components?
- How to use Kendo Badge for creating alert icons?
- How to apply Kendo icons in UI for ASP.NET Core?

## Solution

To create a bell alert icon using Telerik components, use the Kendo UI Badge component along with Kendo icons:

1. Add a `div` container for the icon and badge.
2. Use the Kendo UI `Badge` component for the notification count.
3. Apply the Kendo icon with the `bell` icon class.
4. Style the elements for proper positioning.

Use the following example:

```html
<div id="HeaderMenu">
    <span id="icon"></span>

    @(Html.Kendo().Badge()
        .Name("bellIconBadge")
        .Position(BadgePosition.Edge)
        .Rounded(Rounded.Full)
        .Text("0")
    )
</div>

<script>
    kendo.ui.icon($("#icon"), { icon: 'bell' });
</script>

<style>
    #HeaderMenu {
        position: relative;
        display: inline-block;
    }
    
    #icon {
        display: inline-block;
        font-size: 30px;
    }
    
    #bellIconBadge {
        position: absolute;
        top: -6px;
        right: -16px;
    }
</style>
```

### Explanation:
- The `BadgePosition.Edge` positions the badge relative to the icon.
- The `Rounded.Full` option ensures a circular badge appearance.
- The `kendo.ui.icon` method applies the Kendo `bell` icon.

A runnable example is available in this [REPL demo](https://netcorerepl.telerik.com/mKYmGyFT438hDa9025).

## See Also

- [Kendo UI Badge Overview](https://www.telerik.com/aspnet-core-ui/documentation/html-helpers/layout/badge/overview)
- [SVG Icons Documentation](https://www.telerik.com/aspnet-core-ui/documentation/styles-and-layout/sass-themes/svg-icons)
- [UI for ASP.NET Core Examples](https://demos.telerik.com/aspnet-core/)
