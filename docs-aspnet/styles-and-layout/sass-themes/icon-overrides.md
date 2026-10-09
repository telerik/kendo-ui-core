---
title: Icon Overrides
page_title: Icon Overrides - Styles and Layout
description: "Learn how to override Telerik UI icons globally or per component with the fluent SetIcons API in ASP.NET."
components: ["general"]
slug: icon_overrides_aspnetmvc6_aspnetmvc
position: 9
---

# Icon Overrides

As of the R3 2026 release, {{ site.product }} supports overriding icons rendered by components through the fluent `SetIcons` configuration API. The overrides replace icons both on the server (for components that render HTML on the server, such as Menu, Grid, PanelBar, and ContextMenu) and on the client (for components that create icons dynamically via JavaScript). The feature works with both SVG icons and Font icons, regardless of the configured `IconType`.

## Configuring Icon Overrides

Icon names are normalized before they are matched, so both kebab-case (`chevron-right`) and PascalCase (`ChevronRight`) names are accepted. Using kebab-case is recommended for consistency. Component scopes use the `TelerikComponents` enum. The `Global` and `Component` methods can be chained within one `SetIcons` call.

Render the icon overrides in the layout so they are registered before the widgets initialize:

```Razor
@Html.Kendo().OverrideIcons()
```

{% if site.core %}
```C#
using Kendo.Mvc;
using Telerik.SvgIcons;

services.AddKendo(options =>
{
    options.SetIcons(icons => icons
        .Global(global => global
            .Override("chevron-right", "arrow-end-right"))
        .Component(TelerikComponents.ContextMenu, component => component
            .Override("chevron-right", SVGIcons.CaretAltRight)
            .Override(SVGIcons.ChevronDown.Name, SVGIcons.CaretAltDown)));
});
```
{% else %}
```C#
using Kendo.Mvc;
using Kendo.Mvc.Infrastructure;
using Telerik.SvgIcons;

KendoMvc.Setup(options =>
{
    options.SetIcons(icons => icons
        .Global(global => global
            .Override("chevron-right", "arrow-end-right"))
        .Component(TelerikComponents.ContextMenu, component => component
            .Override("chevron-right", SVGIcons.CaretAltRight)
            .Override(SVGIcons.ChevronDown.Name, SVGIcons.CaretAltDown)));
});
```
{% endif %}

The `Override` method accepts either a string or an `ISvgIcon` object. Use an `ISvgIcon` object to provide a completely custom SVG icon:

{% if site.core %}
```C#
using Telerik.SvgIcons;

services.AddKendo(options =>
{
    options.SetIcons(icons => icons
        .Global(global => global
            .Override("chevron-right", SVGIcons.CaretAltRight)
            .Override(SVGIcons.ChevronDown.Name, SVGIcons.CaretAltDown)));
});
```
{% else %}
```C#
using Kendo.Mvc.Infrastructure;
using Telerik.SvgIcons;

KendoMvc.Setup(options =>
{
    options.SetIcons(icons => icons
        .Global(global => global
            .Override("chevron-right", SVGIcons.CaretAltRight)
            .Override(SVGIcons.ChevronDown.Name, SVGIcons.CaretAltDown)));
});
```
{% endif %}

## See Also

* [SVG Icons]({% slug svgicons_core_mvc %})
* [Font Icons]({% slug webfonticons_aspnetmvc6_aspnetmvc %})
